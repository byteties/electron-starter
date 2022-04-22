"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// import * as remote from '@electron/remote';
// const remoteMain = remote.require("@electron/remote/main");
// remoteMain.initialize();
const SET_ANSWER = 'set-answer';
const SEND_TITLE_CHILD = 'send-title-child';
const TRIGGER_CLOSE = 'trigger-close';
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
electron_1.ipcRenderer.on(TRIGGER_CLOSE, (event) => {
    console.log('------------ 0');
    // const window = remote.getCurrentWindow()
    // console.log('------------')
    // console.log(window)
});
