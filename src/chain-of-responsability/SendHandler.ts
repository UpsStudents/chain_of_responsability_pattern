import { AbstractHandler } from './AbstractHandler';

export class SendHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'Send') {
      return `Sending message.`;
    }
    return super.handle(request);
  }
}
