"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const SET_ANSWER = 'set-answer';
const SEND_TITLE_CHILD = 'send-title-child';
const setButton = document.getElementById('set');
setButton === null || setButton === void 0 ? void 0 : setButton.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    electron_1.ipcRenderer.send(SEND_TITLE_CHILD, title);
});
electron_1.ipcRenderer.on(SET_ANSWER, (event, answer) => {
    const text = document.getElementById('answer');
    if (text) {
        text.innerText = `Answer :${answer}`;
    }
});
