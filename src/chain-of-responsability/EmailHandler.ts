import { AbstractHandler } from './AbstractHandler';

export class EmailHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'Email') {
      return `Formatting message to Email.`;
    }
    return super.handle(request);
  }
}
