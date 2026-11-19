import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';

const mocks = vi.hoisted(() => ({getStream: vi.fn(), enumerateDevices: vi.fn()}));
vi.mock('@lib/calls/helpers/getStream', () => ({default: mocks.getStream}));
vi.mock('@environment/userAgent', () => ({IS_SAFARI: false, IS_APPLE_MOBILE: false}));
import NativeVideoRecorder from '@helpers/videoRecorder/nativeVideoRecorder';

function track(kind: 'audio' | 'video', deviceId: string, facingMode?: string) {
  const value = Object.assign(new EventTarget(), {kind, readyState: 'live', getSettings: () => ({deviceId, facingMode}), stop: vi.fn()});
  value.stop.mockImplementation(() => value.readyState = 'ended');
  return value as unknown as MediaStreamTrack;
}

function stream(initial: MediaStreamTrack[]) {
  let tracks = [...initial];
  return {
    getTracks: () => [...tracks],
    getVideoTracks: () => tracks.filter((t) => t.kind === 'video'),
    getAudioTracks: () => tracks.filter((t) => t.kind === 'audio'),
    addTrack: (track: MediaStreamTrack) => tracks.push(track),
    removeTrack: (track: MediaStreamTrack) => tracks = tracks.filter((t) => t !== track)
  } as unknown as MediaStream;
}

function subject() {
  const front = track('video', 'front', 'user'), mic = track('audio', 'mic');
  const raw = stream([front, mic]);
  const recorder = new NativeVideoRecorder({videoDeviceId: 'front'});
  const internal = recorder as any;
  recorder.stream = raw;
  recorder.state = 'recording';
  internal.drawVideo = {srcObject: raw, play: vi.fn().mockResolvedValue(undefined), pause: vi.fn()};
  internal.mediaRecorder = {state: 'recording', stop: vi.fn()};
  const encoder = internal.mediaRecorder;
  const canvasTrack = track('video', 'canvas');
  internal.canvasStream = stream([canvasTrack]);
  internal.acquisition = {promise: Promise.resolve(raw), dispose: () => raw.getTracks().forEach((track) => track.stop())};
  return {recorder, internal, front, mic, raw, encoder, canvasTrack};
}

beforeEach(() => {
  vi.resetAllMocks();
  mocks.enumerateDevices.mockResolvedValue([]);
  vi.stubGlobal('navigator', {mediaDevices: {enumerateDevices: mocks.enumerateDevices}});
});
afterEach(() => vi.unstubAllGlobals());

describe('round-video camera switching', () => {
  it('switches front to rear without replacing/stopping the microphone or canvas encoder track', async() => {
    const s = subject(), rear = track('video', 'back', 'environment');
    mocks.getStream.mockResolvedValueOnce(stream([rear]));
    expect(await s.recorder.switchCamera()).toBe(true);
    expect(mocks.getStream).toHaveBeenCalledWith(expect.objectContaining({video: expect.objectContaining({facingMode: {exact: 'environment'}}), audio: false}), undefined);
    expect(s.front.stop).toHaveBeenCalledOnce();
    expect(s.raw.getVideoTracks()).toEqual([rear]);
    expect(s.raw.getAudioTracks()).toEqual([s.mic]);
    expect(s.mic.stop).not.toHaveBeenCalled();
    expect(s.canvasTrack.stop).not.toHaveBeenCalled();
    expect(s.encoder.stop).not.toHaveBeenCalled();
    expect(s.recorder.facingMode).toBe('environment');
    expect(s.internal.config.videoDeviceId).toBeUndefined();
  });

  it('switches rear back to front using the actual active facing mode', async() => {
    const s = subject(), rear = track('video', 'back', 'environment'), front = track('video', 'front', 'user');
    mocks.getStream.mockResolvedValueOnce(stream([rear])).mockResolvedValueOnce(stream([front]));
    await s.recorder.switchCamera();
    await s.recorder.switchCamera();
    expect(mocks.getStream.mock.calls[1][0].video.facingMode).toEqual({exact: 'user'});
    expect(s.raw.getVideoTracks()).toEqual([front]);
    expect(s.mic.stop).not.toHaveBeenCalled();
  });

  it('restores the previous camera if the requested one cannot be opened', async() => {
    const s = subject(), restored = track('video', 'front', 'user');
    const error = new DOMException('Camera unavailable', 'NotReadableError');
    mocks.getStream.mockRejectedValueOnce(error).mockResolvedValueOnce(stream([restored]));
    await expect(s.recorder.switchCamera()).rejects.toBe(error);
    expect(mocks.getStream.mock.calls[1][0]).toEqual(expect.objectContaining({audio: false, video: expect.objectContaining({deviceId: {exact: 'front'}})}));
    expect(s.raw.getVideoTracks()).toEqual([restored]);
    expect(s.mic.stop).not.toHaveBeenCalled();
  });

  it('disposes a camera that resolves after recording/chat teardown', async() => {
    const s = subject(), rear = track('video', 'back', 'environment');
    let resolve: (stream: MediaStream) => void;
    mocks.getStream.mockReturnValueOnce(new Promise<MediaStream>((r) => resolve = r));
    const switching = s.recorder.switchCamera();
    await Promise.resolve();await Promise.resolve();
    s.recorder.releaseStream();
    resolve(stream([rear]));
    expect(await switching).toBe(false);
    expect(rear.stop).toHaveBeenCalled();
    expect(s.mic.stop).toHaveBeenCalled();
    expect(s.recorder.stream).toBeUndefined();
  });

  it('does not attach a new camera after stop, even during the preview fade', async() => {
    const s = subject(), rear = track('video', 'back', 'environment');
    let resolve: (stream: MediaStream) => void;
    mocks.getStream.mockReturnValueOnce(new Promise<MediaStream>((r) => resolve = r));
    const switching = s.recorder.switchCamera();
    await Promise.resolve();await Promise.resolve();
    s.recorder.stop();
    resolve(stream([rear]));
    expect(await switching).toBe(false);
    expect(rear.stop).toHaveBeenCalled();
    expect(s.raw.getVideoTracks()).toEqual([]);
    s.recorder.releaseStream();
  });

  it('ignores duplicate taps while a switch is pending', async() => {
    const s = subject();let resolve: (stream: MediaStream) => void;
    mocks.getStream.mockReturnValueOnce(new Promise<MediaStream>((r) => resolve = r));
    const first = s.recorder.switchCamera();
    expect(await s.recorder.switchCamera()).toBe(false);
    await Promise.resolve();await Promise.resolve();
    resolve(stream([track('video', 'back', 'environment')]));
    expect(await first).toBe(true);
    expect(mocks.getStream).toHaveBeenCalledOnce();
  });

  it.each(['inactive', 'paused'] as const)('does not start a switch while %s', async(state) => {
    const s = subject();s.recorder.state = state;
    expect(await s.recorder.switchCamera()).toBe(false);
    expect(mocks.getStream).not.toHaveBeenCalled();
    expect(s.front.stop).not.toHaveBeenCalled();
  });

  it('requests the main rear device exactly instead of letting facingMode choose telephoto', async() => {
    const s = subject(), main = track('video', 'main', 'environment');
    mocks.enumerateDevices.mockResolvedValue([
      {kind: 'videoinput', deviceId: 'tele', label: 'Back telephoto 3x'},
      {kind: 'videoinput', deviceId: 'main', label: 'Back main camera 1x'},
      {kind: 'videoinput', deviceId: 'front', label: 'Front camera'}
    ]);
    mocks.getStream.mockResolvedValueOnce(stream([main]));
    expect(await s.recorder.switchCamera()).toBe(true);
    expect(mocks.getStream.mock.calls[0][0].video.deviceId).toEqual({exact: 'main'});
    expect(s.raw.getVideoTracks()).toEqual([main]);
    expect(s.mic.stop).not.toHaveBeenCalled();
  });

  it('returns to the original front ID after switching even when another selfie camera exists', async() => {
    const s = subject();
    mocks.enumerateDevices.mockResolvedValue([
      {kind: 'videoinput', deviceId: 'front-wide', label: 'Front camera wide'},
      {kind: 'videoinput', deviceId: 'main', label: 'Back main'},
      {kind: 'videoinput', deviceId: 'front', label: 'Front camera'}
    ]);
    mocks.getStream.mockResolvedValueOnce(stream([track('video', 'main', 'environment')]))
    .mockResolvedValueOnce(stream([track('video', 'front', 'user')]));
    await s.recorder.switchCamera();await s.recorder.switchCamera();
    expect(mocks.getStream.mock.calls[1][0].video.deviceId).toEqual({exact: 'front'});
  });

  it('does not silently accept a different lens if the exact-device acquisition falls back', async() => {
    const s = subject(), wrong = track('video', 'tele', 'environment'), restored = track('video', 'front', 'user');
    mocks.enumerateDevices.mockResolvedValue([{kind: 'videoinput', deviceId: 'main', label: 'Back main'}]);
    mocks.getStream.mockResolvedValueOnce(stream([wrong])).mockResolvedValueOnce(stream([restored]));
    await expect(s.recorder.switchCamera()).rejects.toThrow('selected camera');
    expect(wrong.stop).toHaveBeenCalled();
    expect(s.raw.getVideoTracks()).toEqual([restored]);
    expect(s.mic.stop).not.toHaveBeenCalled();
  });

  it('keeps known front identity even if enumeration becomes unavailable on the return switch', async() => {
    const s = subject();
    mocks.getStream.mockResolvedValueOnce(stream([track('video', 'back', 'environment')]))
    .mockResolvedValueOnce(stream([track('video', 'front', 'user')]));
    await s.recorder.switchCamera();
    mocks.enumerateDevices.mockRejectedValueOnce(new Error('Enumeration unavailable'));
    await s.recorder.switchCamera();
    expect(mocks.getStream.mock.calls[1][0].video.deviceId).toEqual({exact: 'front'});
  });

  it('does not acquire any new camera after teardown during device enumeration', async() => {
    const s = subject();let resolve: (devices: MediaDeviceInfo[]) => void;
    mocks.enumerateDevices.mockReturnValueOnce(new Promise<MediaDeviceInfo[]>((r) => resolve = r));
    const pending = s.recorder.switchCamera();s.recorder.releaseStream();resolve([]);
    expect(await pending).toBe(false);
    expect(mocks.getStream).not.toHaveBeenCalled();
    expect(s.mic.stop).toHaveBeenCalled();
  });

  it('shows capability only when more than one camera is enumerated', async() => {
    const recorder = new NativeVideoRecorder();
    mocks.enumerateDevices.mockResolvedValueOnce([{kind: 'videoinput'}, {kind: 'audioinput'}]);
    expect(await recorder.hasMultipleCameras()).toBe(false);
    mocks.enumerateDevices.mockResolvedValueOnce([{kind: 'videoinput'}, {kind: 'videoinput'}]);
    expect(await recorder.hasMultipleCameras()).toBe(true);
    mocks.enumerateDevices.mockRejectedValueOnce(new Error('Device enumeration unavailable'));
    expect(await recorder.hasMultipleCameras()).toBe(false);
  });
});
