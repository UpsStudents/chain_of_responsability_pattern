"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AbstractHandler = /** @class */ (function () {
    function AbstractHandler() {
    }
    AbstractHandler.prototype.setNext = function (handler) {
        this.nextHandler = handler;
        return handler;
    };
    AbstractHandler.prototype.handle = function (request) {
        if (this.nextHandler) {
            return this.nextHandler.handle(request);
        }
        return null;
    };
    return AbstractHandler;
}());
var LogInDBHandler = /** @class */ (function (_super) {
    __extends(LogInDBHandler, _super);
    function LogInDBHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogInDBHandler.prototype.handle = function (request) {
        if (request === 'LogInDB') {
            return "Saving log on DB.";
        }
        return _super.prototype.handle.call(this, request);
    };
    return LogInDBHandler;
}(AbstractHandler));
var SMSHandler = /** @class */ (function (_super) {
    __extends(SMSHandler, _super);
    function SMSHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SMSHandler.prototype.handle = function (request) {
        if (request === 'SMS') {
            return "Formatting message to SMS.";
        }
        return _super.prototype.handle.call(this, request);
    };
    return SMSHandler;
}(AbstractHandler));
var EmailHandler = /** @class */ (function (_super) {
    __extends(EmailHandler, _super);
    function EmailHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailHandler.prototype.handle = function (request) {
        if (request === 'Email') {
            return "Formatting message to Email.";
        }
        return _super.prototype.handle.call(this, request);
    };
    return EmailHandler;
}(AbstractHandler));
var SendHandler = /** @class */ (function (_super) {
    __extends(SendHandler, _super);
    function SendHandler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SendHandler.prototype.handle = function (request) {
        if (request === 'Send') {
            return "Sending message.";
        }
        return _super.prototype.handle.call(this, request);
    };
    return SendHandler;
}(AbstractHandler));
function Notification(handler) {
    var options = ['LogInDB', 'SMS', 'Email', 'Send'];
    for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
        var option = options_1[_i];
        var result = handler.handle(option);
        if (result) {
            console.log("  ".concat(result));
        }
        else {
            console.log(" No handler for ".concat(option));
        }
    }
}
var logInDBFlag = true;
var smsFlag = true;
var emailFlag = true;
var sendFlag = true;
var handlerIni = null;
if (logInDBFlag) {
    handlerIni = new LogInDBHandler();
}
if (smsFlag) {
    if (handlerIni === null) {
        handlerIni = new SMSHandler();
    }
    else {
        handlerIni = handlerIni.setNext(new SMSHandler());
    }
}
if (emailFlag) {
    if (handlerIni === null) {
        handlerIni = new EmailHandler();
    }
    else {
        handlerIni = handlerIni.setNext(new EmailHandler());
    }
}
if (sendFlag) {
    if (handlerIni === null) {
        handlerIni = new SendHandler();
    }
    else {
        handlerIni = handlerIni.setNext(new SendHandler());
    }
}
console.log('subchain: email > sms > send\n');
if (handlerIni !== null) {
    Notification(handlerIni);
}
