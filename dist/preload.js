"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const constants_1 = require("./constants");
const getQuestions_1 = __importDefault(require("./libs/getQuestions"));
window.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    const divQuestion = document.getElementById(constants_1.QUESTION_DIV);
    const questions = yield (0, getQuestions_1.default)();
    const ul = document.createElement(constants_1.QUESTION_LIST);
    if (questions) {
        for (let i = 0; i < questions.length; i++) {
            const { id, event, value } = questions[i];
            const li = document.createElement("li");
            li.setAttribute("id", id);
            li === null || li === void 0 ? void 0 : li.addEventListener('click', () => {
                electron_1.ipcRenderer.send(event, i);
            });
            li.appendChild(document.createTextNode(value));
            ul.appendChild(li);
        }
        divQuestion === null || divQuestion === void 0 ? void 0 : divQuestion.appendChild(ul);
    }
}));
