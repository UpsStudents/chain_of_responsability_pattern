import { AbstractHandler } from './AbstractHandler';

export class SMSHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'SMS') {
      return `Formatting message to SMS.`;
    }
    return super.handle(request);
  }
}
