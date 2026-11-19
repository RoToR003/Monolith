import {describe, expect, it} from 'vitest';
import preferredCamera, {CameraDevice, describeCamera} from '@helpers/videoRecorder/preferredCamera';

const camera = (deviceId: string, label: string, facingMode?: 'user' | 'environment'): CameraDevice => ({deviceId, label, facingMode});
const rear = (deviceId: string, label: string) => camera(deviceId, label, 'environment');

describe('round-video primary lens selection', () => {
  it('prefers a labelled main rear lens even when the telephoto is enumerated first', () => {
    const devices = [rear('tele', 'Back telephoto 3x'), rear('ultra', 'Back ultra wide'), rear('main', 'Back main camera 1x')];
    expect(preferredCamera(devices, 'environment')?.deviceId).toBe('main');
  });
  it('does not confuse ultrawide with the primary wide camera', () => {
    expect(preferredCamera([rear('ultra', 'Back UltraWide'), rear('wide', 'Back Wide Camera')], 'environment')?.deviceId).toBe('wide');
  });
  it('prefers Android primary rear camera zero over additional numbered lenses', () => {
    expect(preferredCamera([rear('aux', 'camera2 4, facing back'), rear('main', 'camera2 0, facing back')], 'environment')?.deviceId).toBe('main');
  });
  it('keeps browser default-first order when rear lens names are indistinguishable', () => {
    expect(preferredCamera([rear('first', 'Back Camera'), rear('second', 'Back Camera')], 'environment')?.deviceId).toBe('first');
  });
  it('returns to the known front camera instead of guessing from enumeration order', () => {
    expect(preferredCamera([camera('other', 'Front camera', 'user'), camera('original', 'Front camera', 'user')], 'user', {preferredDeviceId: 'original'})?.deviceId).toBe('original');
  });
  it('honours a remembered lens only while it remains present and matches the requested side', () => {
    const devices = [rear('main', 'Back main'), camera('front', 'Front camera', 'user')];
    expect(preferredCamera(devices, 'environment', {preferredDeviceId: 'front'})?.deviceId).toBe('main');
    expect(preferredCamera(devices, 'environment', {preferredDeviceId: 'gone'})?.deviceId).toBe('main');
  });
  it('excludes the active and known opposite camera when labels are unavailable', () => {
    const devices = [camera('front', ''), camera('back', '')];
    expect(preferredCamera(devices, 'environment', {currentDeviceId: 'front', oppositeDeviceId: 'front'})?.deviceId).toBe('back');
  });
  it('does not choose a front camera just because its label says primary', () => {
    expect(preferredCamera([camera('front', 'Main Front', 'user'), rear('rear', 'Back')], 'environment')?.deviceId).toBe('rear');
  });
  it('leaves facing-mode fallback to the caller when no target camera is identifiable', () => {
    expect(preferredCamera([camera('front', 'Front', 'user')], 'environment')).toBeUndefined();
  });
  it('uses InputDeviceInfo facing capabilities before localized or misleading labels', () => {
    expect(describeCamera({deviceId: 'id', label: 'Front camera', getCapabilities: () => ({facingMode: ['environment']})} as unknown as MediaDeviceInfo).facingMode).toBe('environment');
  });
  it('recognises common browser labels without requiring InputDeviceInfo capabilities', () => {
    expect(describeCamera({deviceId: 'a', label: 'camera2 0, facing back'} as MediaDeviceInfo).facingMode).toBe('environment');
    expect(describeCamera({deviceId: 'b', label: 'Фронтальна камера'} as MediaDeviceInfo).facingMode).toBe('user');
  });
  it('survives unavailable capabilities and does not invent a direction for an unnamed camera', () => {
    expect(describeCamera({deviceId: 'id', label: '', getCapabilities: () => {throw new Error('Unavailable');}} as unknown as MediaDeviceInfo).facingMode).toBeUndefined();
  });
});
