import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
vi.mock('@components/progressRing', () => ({default: () => null}));
import {createVideoRecordingPanel} from '@components/chat/recording/videoRecordingPanel';

beforeEach(() => {
  vi.useFakeTimers();
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => {});
  vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
});
afterEach(() => {vi.restoreAllMocks();vi.useRealTimers();});

describe('round-video camera control', () => {
  it('is available during recording only when multiple cameras exist', () => {
    const onSwitch = vi.fn();
    const panel = createVideoRecordingPanel(false, onSwitch);
    document.body.append(panel.element);
    const button = panel.element.querySelector('button');
    panel.setMode('recording');
    expect(button.hidden).toBe(true);
    panel.setCanSwitchCamera(true);
    expect(button.hidden).toBe(false);
    expect(button.getAttribute('aria-label')).toBe('Змінити камеру');
    button.click();expect(onSwitch).toHaveBeenCalledOnce();
    panel.setMode('paused');expect(button.hidden).toBe(true);
    panel.destroy();
  });

  it('blocks repeated taps while switching and clears state on reset', () => {
    const onSwitch = vi.fn();
    const panel = createVideoRecordingPanel(false, onSwitch);
    document.body.append(panel.element);
    const button = panel.element.querySelector('button');
    panel.setMode('recording');panel.setCanSwitchCamera(true);panel.setSwitchingCamera(true);
    expect(button.disabled).toBe(true);button.click();expect(onSwitch).not.toHaveBeenCalled();
    panel.reset();expect(button.hidden).toBe(true);expect(button.disabled).toBe(false);
    panel.destroy();
  });

  it('leaves both preview axes to one responsive CSS diameter instead of fixed inline width/height', () => {
    const panel = createVideoRecordingPanel();
    const circle = panel.element.querySelector<HTMLElement>('.video-recording-circle');
    expect(circle.style.width).toBe('');expect(circle.style.height).toBe('');
    expect(circle.style.getPropertyValue('--video-recording-size')).toBe('360px');
    panel.destroy();
  });

  it('does not mirror the rear-camera preview', () => {
    const panel = createVideoRecordingPanel();
    panel.startLivePreview({} as MediaStream, false);
    expect(panel.element.classList.contains('video-recording-stage--rear-camera')).toBe(true);
    panel.startLivePreview({} as MediaStream, true);
    expect(panel.element.classList.contains('video-recording-stage--rear-camera')).toBe(false);
    panel.destroy();
  });
});
