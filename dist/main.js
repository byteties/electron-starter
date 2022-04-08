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
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
const createWindow = () => {
    const mainWindow = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, '../dist/preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            // enableRemoteModule: true,
        }
    });
    // ipcMain.on('send-ans', (event,value:any) => {
    //   mainWindow.webContents.send('set-answer',value.answer)
    // })
    mainWindow.loadFile('../index.html');
    mainWindow.webContents.openDevTools();
};
electron_1.app.whenReady().then(() => {
    createWindow();
    const childWindow = new electron_1.BrowserWindow({
        width: 1000,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            // enableRemoteModule: true,
        }
    });
    childWindow.hide();
    // ipcMain.on('send-title-child', (event,value:any) => {
    //   childWindow.loadFile('../child.html').then(() => {
    //     childWindow.webContents.send('set-title-child',value.title)
    //   })
    //   childWindow.show()
    childWindow.webContents.openDevTools();
    // })
    for (let i = 0; i < 3; i++) {
        electron_1.ipcMain.on(`show-answer-${i + 1}`, (event, value) => {
            childWindow.loadFile('../child.html').then(() => {
                childWindow.webContents.send('set-title-child', value);
            });
            childWindow.show();
        });
    }
    electron_1.app.on('activate', function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', function () {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
