// GPL-3.0-only. Local/live MediaRecorder blobs can expose NaN/Infinity until
// metadata is available. Use Telegram's document duration without ever putting
// a non-finite value into a timer or progress ring.
export function finiteMediaDuration(duration: number, fallback = 0): number {
  if(Number.isFinite(duration) && duration > 0) return duration;
  return Number.isFinite(fallback) && fallback > 0 ? fallback : 0;
}

export function mediaPlaybackTime(media: Pick<HTMLMediaElement, 'duration' | 'currentTime'>, fallback = 0) {
  const duration = finiteMediaDuration(media.duration, fallback);
  const currentTime = Number.isFinite(media.currentTime) && media.currentTime > 0 ? media.currentTime : 0;
  return {
    duration,
    remaining: Math.max(0, duration - currentTime),
    progress: duration ? Math.min(1, currentTime / duration) : 0
  };
}
