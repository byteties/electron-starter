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
const axios_1 = __importDefault(require("axios"));
const path = __importStar(require("path"));
const constants_1 = require("./constants");
const createWindow = () => {
    const mainWindow = new electron_1.BrowserWindow({
        width: constants_1.MAIN_WIDTH,
        height: constants_1.MAIN_HEIGHT,
        webPreferences: {
            preload: path.join(__dirname, '../dist/preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    electron_1.ipcMain.on(constants_1.SEND_ANSWER, (event, value) => {
        mainWindow.webContents.send(constants_1.SET_ANSWER, value);
    });
    mainWindow.loadFile('../index.html');
    // mainWindow.webContents.openDevTools()
};
const childEvent = (win, triggerEvent, sendEvent) => {
    electron_1.ipcMain.on(triggerEvent, (event, value) => __awaiter(void 0, void 0, void 0, function* () {
        if (Number.isInteger(Number(value))) {
            const res = yield axios_1.default.get(`${constants_1.BASE_URL}/answer/${value}`);
            value = res.data;
        }
        win.loadFile('../child.html').then(() => {
            win.webContents.send(sendEvent, value);
        });
        win.show();
    }));
};
const createChildWindow = () => {
    const childWindow = new electron_1.BrowserWindow({
        width: constants_1.CHILD_WIDTH,
        height: constants_1.CHILD_HEIGHT,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
    childWindow.hide();
    childWindow.webContents.openDevTools();
    childEvent(childWindow, constants_1.SEND_TITLE_CHILD, constants_1.SET_TITLE_CHILD);
    childEvent(childWindow, `${constants_1.SHOW_ANSWER}1`, constants_1.SET_TITLE_CHILD);
    childEvent(childWindow, `${constants_1.SHOW_ANSWER}2`, constants_1.SET_TITLE_CHILD);
    childEvent(childWindow, `${constants_1.SHOW_ANSWER}3`, constants_1.SET_TITLE_CHILD);
};
electron_1.app.whenReady().then(() => {
    createWindow();
    createChildWindow();
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
