 interface Handler {
    setNext(handler: Handler): Handler;

    handle(request: string): string | null;
}


abstract class AbstractHandler implements Handler
{
    private nextHandler: Handler | undefined;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public handle(request: string): string | null{
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }

        return null;
    }
}

class LogInDBHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request === 'LogInDB') {
            return `Saving log on DB.`;
        }
        return super.handle(request);

    }
}

class SMSHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request === 'SMS') {
            return `Formatting message to SMS.`;
        }
        return super.handle(request);
    }
}

class EmailHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request === 'Email') {
            return `Formatting message to Email.`;
        }
        return super.handle(request);
    }
}

class SendHandler extends AbstractHandler {
    public handle(request: string): string | null {
        if (request === 'Send') {
            return `Sending message.`;
        }
        return super.handle(request);
    }
}

function Notification(handler: Handler) {
    const options = ['LogInDB', 'SMS', 'Email', 'Send'];
    for (const option of options) {
        const result = handler.handle(option);
        if (result) {
            console.log(`  ${result}`);
        } else {
            console.log(` No handler for ${option}`);
        }
    }
}

const logInDBFlag = true;
const smsFlag = true;
const emailFlag = true;
const sendFlag = true;

let handlerIni = null;

if(logInDBFlag){
    handlerIni = new LogInDBHandler();
}

if(smsFlag){
    if(handlerIni === null){
        handlerIni = new SMSHandler();
    }else{
        handlerIni = handlerIni.setNext(new SMSHandler());
    }
}

if(emailFlag){
    if(handlerIni === null){
        handlerIni = new EmailHandler();
    }else{
        handlerIni = handlerIni.setNext(new EmailHandler());
    }
}

if(sendFlag){
    if(handlerIni === null){
        handlerIni = new SendHandler();
    }else{
        handlerIni = handlerIni.setNext(new SendHandler());
    }
}

console.log('subchain: email > sms > send\n');
if(handlerIni !== null){
    Notification(handlerIni);
}