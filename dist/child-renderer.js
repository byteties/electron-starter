"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const remote = __importStar(require("@electron/remote"));
const SEND_ANSWER = 'send-answer';
const SET_TITLE_ANSWER_WIN = 'set-title-answer';
const TRIGGER_CLOSE = 'trigger-close';
electron_1.ipcRenderer.on(SET_TITLE_ANSWER_WIN, (event, title) => {
    const text = document.getElementById('question');
    if (text) {
        text.innerText = title;
    }
});
const sendButton = document.getElementById('send');
sendButton === null || sendButton === void 0 ? void 0 : sendButton.addEventListener('click', () => {
    const answer = document.getElementById('answer').value;
    electron_1.ipcRenderer.send(SEND_ANSWER, answer);
});
electron_1.ipcRenderer.on(TRIGGER_CLOSE, (event) => {
    remote.getCurrentWindow().hide();
});
