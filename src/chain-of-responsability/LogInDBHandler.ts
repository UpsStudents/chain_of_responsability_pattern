import { AbstractHandler } from './AbstractHandler';

export class LogInDBHandler extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'LogInDB') {
      return `Saving log on DB.`;
    }
    return super.handle(request);
  }
}
