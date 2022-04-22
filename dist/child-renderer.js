"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const SEND_ANSWER = 'send-answer';
const SET_TITLE_ANSWER_WIN = 'set-title-answer';
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
