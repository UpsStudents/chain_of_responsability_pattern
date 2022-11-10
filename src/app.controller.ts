import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('sms-notify')
  @Render('notify')
  smsNotify() {
    return this.appService.notifySMS();
  }

  @Get('email-notify')
  @Render('notify')
  emailNotify() {
    return this.appService.notifyEmail();
  }

  @Get('notify-all')
  @Render('notify')
  notifyAll() {
    return this.appService.noitfyAll();
  }

  @Get()
  @Render('index')
  index() {
    return {};
  }
}
