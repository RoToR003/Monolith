import {describe, expect, it} from 'vitest';
import {finiteMediaDuration, mediaPlaybackTime} from '@helpers/mediaPlaybackTime';
import toHHMMSS from '@helpers/string/toHHMMSS';

describe('finite media timers for newly recorded round videos', () => {
  it.each([NaN, Infinity, -Infinity, 0, -2, undefined])('uses document duration for %s media duration', (duration) => {
    const time = mediaPlaybackTime({duration, currentTime: 2}, 8);
    expect(time).toEqual({duration: 8, remaining: 6, progress: 0.25});
    expect(toHHMMSS(time.remaining, false)).not.toMatch(/NaN|Infinity/);
  });

  it('uses real media metadata once it becomes available', () => {
    expect(mediaPlaybackTime({duration: 4.5, currentTime: 1.5}, 8)).toEqual({duration: 4.5, remaining: 3, progress: 1 / 3});
  });

  it.each([NaN, Infinity, -1])('does not propagate invalid current time %s', (currentTime) => {
    expect(mediaPlaybackTime({duration: 8, currentTime})).toEqual({duration: 8, remaining: 8, progress: 0});
  });

  it('clamps progress and remaining time at the end', () => {
    expect(mediaPlaybackTime({duration: 8, currentTime: 10})).toEqual({duration: 8, remaining: 0, progress: 1});
  });

  it('returns safe zeroes if neither media nor document duration is known', () => {
    expect(mediaPlaybackTime({duration: Infinity, currentTime: NaN}, NaN)).toEqual({duration: 0, remaining: 0, progress: 0});
    expect(finiteMediaDuration(undefined)).toBe(0);
  });
});
