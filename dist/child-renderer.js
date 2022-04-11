"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.ipcRenderer.on('set-title-child', (event, title) => {
    const text = document.getElementById('question');
    if (text) {
        text.innerText = title;
    }
});
const sendButton = document.getElementById('send');
sendButton === null || sendButton === void 0 ? void 0 : sendButton.addEventListener('click', () => {
    const answer = document.getElementById('answer').value;
    electron_1.ipcRenderer.send('send-answer', answer);
});
