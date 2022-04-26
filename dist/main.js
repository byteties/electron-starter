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
const main_1 = require("@electron/remote/main");
const path = __importStar(require("path"));
const getAnswer_1 = __importDefault(require("./libs/getAnswer"));
const constants_1 = require("./constants");
(0, main_1.initialize)();
const createQuestionWindow = () => {
    const questionWindow = new electron_1.BrowserWindow({
        width: constants_1.QUESTION_WIDTH,
        height: constants_1.QUESTION_HEIGHT,
        webPreferences: {
            preload: path.join(__dirname, '../dist/preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    questionWindow.loadFile('../index.html');
    questionWindow.webContents.openDevTools();
    return questionWindow;
};
const sendTextToQuestionWindow = (win) => {
    electron_1.ipcMain.on(constants_1.SEND_TITLE_ANSWER_WIN, (event, text) => {
        win.loadFile('../child.html').then(() => {
            win.webContents.send(constants_1.SET_TITLE_ANSWER_WIN, text);
        });
        win.show();
    });
};
const showAndAutoHideAnswerWindow = (answerWindow) => __awaiter(void 0, void 0, void 0, function* () {
    electron_1.ipcMain.on(constants_1.SHOW_ANSWER, (event, index) => __awaiter(void 0, void 0, void 0, function* () {
        const answer = yield (0, getAnswer_1.default)(index);
        answerWindow.loadFile('../answer.html').then(() => {
            if (answer === null || answer === void 0 ? void 0 : answer.isApiSuccess) {
                answerWindow.webContents.send(constants_1.SET_TITLE_ANSWER_WIN, answer.date);
            }
        });
        answerWindow.show();
        setTimeout(() => {
            answerWindow.webContents.send(constants_1.TRIGGER_CLOSE_ANSWER_WINDOW);
        }, constants_1.AUTO_CLOSE_TIMEOUT_MILLISECOND);
    }));
});
const createAnswerWindow = () => {
    const answerWindow = new electron_1.BrowserWindow({
        width: constants_1.ANSWER_WIN_WIDTH,
        height: constants_1.ANSWER_WIN_HEIGHT,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    answerWindow.hide();
    answerWindow.webContents.openDevTools();
    return answerWindow;
};
electron_1.app.whenReady().then(() => __awaiter(void 0, void 0, void 0, function* () {
    const questionWindow = createQuestionWindow();
    electron_1.ipcMain.on(constants_1.SEND_ANSWER, (event, answer) => {
        questionWindow.webContents.send(constants_1.SET_ANSWER, answer);
    });
    const answerWindow = createAnswerWindow();
    (0, main_1.enable)(answerWindow.webContents);
    yield sendTextToQuestionWindow(answerWindow);
    yield showAndAutoHideAnswerWindow(answerWindow);
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createQuestionWindow();
    });
}));
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
