import {describe, expect, it, vi} from 'vitest';
import finalizeRoundVideo, {RoundVideoElement} from '@components/chat/bubbleParts/finalizeRoundVideo';
import type {Message} from '@layer';

function message(mid: number, docId: number) {
  return {_: 'message', mid, peerId: '123', pFlags: {}, media: {_: 'messageMediaDocument', document: {_: 'document', id: docId}}} as unknown as Message.message;
}

describe('newly sent round-video player binding', () => {
  it('binds the final message/document before the deferred player starts', () => {
    const element = document.createElement('div') as RoundVideoElement;
    const temporary = message(-1, -1), sent = message(27, 999);
    element.message = temporary;
    element.dataset.mid = '-1';
    element.dataset.isOutgoing = '1';
    const startedWith: Message.message[] = [];
    element.onLoad = vi.fn(() => startedWith.push(element.message));

    finalizeRoundVideo(element, sent);

    expect(startedWith).toEqual([sent]);
    expect(element.message).not.toBe(temporary);
    expect(element.dataset.mid).toBe('27');
    expect(element.dataset.peerId).toBe('123');
    expect(element.dataset.isOutgoing).toBeUndefined();
    expect(element.onLoad).toHaveBeenCalledWith(true);
  });

  it('also updates identity when no deferred callback is mounted', () => {
    const element = document.createElement('div') as RoundVideoElement;
    const sent = message(28, 1000);
    expect(() => finalizeRoundVideo(element, sent)).not.toThrow();
    expect(element.message).toBe(sent);
  });
});
