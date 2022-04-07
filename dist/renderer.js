"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const setButton = document.getElementById('set');
setButton === null || setButton === void 0 ? void 0 : setButton.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    electron_1.ipcRenderer.send('send-title-child', { title });
});
electron_1.ipcRenderer.on('set-answer', (event, title) => {
    const text = document.getElementById('answer');
    if (text) {
        text.innerText = title;
    }
});
