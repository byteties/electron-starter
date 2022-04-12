"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const axios_1 = __importDefault(require("axios"));
const SET_ANSWER = 'set-answer';
const SEND_TITLE_CHILD = 'send-title-child';
const SHOW_ANSWER = 'show-answer-';
const BASE_URL = 'http://localhost:8000';
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
axios_1.default.get(`${BASE_URL}/questions`)
    .then((res) => {
    for (let i = 0; i < res.data.length; i++) {
        const textElement = document.getElementById(`question-${i + 1}`);
        if (textElement) {
            textElement.innerText = res.data[i];
        }
        textElement === null || textElement === void 0 ? void 0 : textElement.addEventListener('click', () => {
            electron_1.ipcRenderer.send(`${SHOW_ANSWER}${i + 1}`, i);
        });
    }
});
