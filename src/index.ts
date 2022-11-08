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

const logInDBHandler = new LogInDBHandler();
const sMSHandler = new SMSHandler();
const emailHandler = new EmailHandler();
const sendHandler = new SendHandler();


if(logInDBFlag){
    handlerIni = logInDBHandler;
}

if(smsFlag){
    if(handlerIni === null){
        handlerIni = sMSHandler
    }else{
        handlerIni.setNext(sMSHandler);
    }
}

if(emailFlag){
    if(handlerIni === null){
        handlerIni = emailHandler
    }else{
        handlerIni.setNext(emailHandler);
    }
}

if(sendFlag){
    if(handlerIni === null){
        handlerIni = sendHandler
    }else{
        handlerIni.setNext(sendHandler);
    }
}

console.log('subchain: email > sms > send\n');
if(handlerIni !== null){
    Notification(handlerIni);
}