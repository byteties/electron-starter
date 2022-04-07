"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.ipcRenderer.on('set-title-child', (title) => {
    const text = document.getElementById('question');
    if (text) {
        text.innerText = title;
    }
});
