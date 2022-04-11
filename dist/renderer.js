"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const SET_ANSWER = 'set-answer';
const SEND_TITLE_CHILD = 'send-title-child';
const SHOW_ANSWER = 'show-answer-';
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
for (let i = 0; i < 3; i++) {
    const textElement = document.getElementById(`question-${i + 1}`);
    let answer = '';
    if (i === 0) {
        answer = 'Heaven';
    }
    else if (i === 1) {
        answer = 'Earth';
    }
    else if (i === 2) {
        answer = 'Heart';
    }
    else {
        answer = '';
    }
    textElement === null || textElement === void 0 ? void 0 : textElement.addEventListener('click', () => {
        electron_1.ipcRenderer.send(`${SHOW_ANSWER}${i + 1}`, answer);
    });
}
