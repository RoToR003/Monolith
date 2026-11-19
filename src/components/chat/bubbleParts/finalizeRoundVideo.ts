import type {Message} from '@layer';

export type RoundVideoElement = HTMLElement & {
  message?: Message.message;
  onLoad?: (sent?: boolean) => void;
};

// The deferred player reads element.message, NOT data-mid. Updating only the
// dataset leaves a just-sent video bound to its optimistic document/temp ID
// until the chat is reopened, even though the server acknowledged the upload.
export default function finalizeRoundVideo(element: RoundVideoElement, message: Message.message) {
  element.message = message;
  element.dataset.mid = String(message.mid);
  element.dataset.peerId = String(message.peerId);
  delete element.dataset.isOutgoing;
  element.onLoad?.(true);
}
