import { Injectable } from '@nestjs/common';
import { EmailHandler } from './chain-of-responsability/EmailHandler';
import { Handler } from './chain-of-responsability/Handler';
import { LogInDBHandler } from './chain-of-responsability/LogInDBHandler';
import { SendHandler } from './chain-of-responsability/SendHandler';
import { SMSHandler } from './chain-of-responsability/SMSHandler';

@Injectable()
export class AppService {
  private Notification(handler: Handler) {
    const resultObj = {
      LogInDB: '',
      SMS: '',
      Email: '',
      Send: '',
    };
    const options = ['LogInDB', 'SMS', 'Email', 'Send'];
    for (const option of options) {
      const result = handler.handle(option);
      if (result) {
        resultObj[option] = result;
      } else {
        resultObj[option] = ` Not include ${option}`;
      }
    }
    return resultObj;
  }

  notifySMS() {
    const logInDBHandler = new LogInDBHandler();
    const sMSHandler = new SMSHandler();
    const sendHandler = new SendHandler();

    logInDBHandler.setNext(sMSHandler).setNext(sendHandler);
    return this.Notification(logInDBHandler);
  }
  notifyEmail() {
    const logInDBHandler = new LogInDBHandler();
    const emailHandler = new EmailHandler();
    const sendHandler = new SendHandler();

    logInDBHandler.setNext(emailHandler).setNext(sendHandler);
    return this.Notification(logInDBHandler);
  }

  noitfyAll() {
    const logInDBHandler = new LogInDBHandler();
    const sMSHandler = new SMSHandler();
    const emailHandler = new EmailHandler();
    const sendHandler = new SendHandler();

    logInDBHandler
      .setNext(sMSHandler)
      .setNext(emailHandler)
      .setNext(sendHandler);
    return this.Notification(logInDBHandler);
  }
}
