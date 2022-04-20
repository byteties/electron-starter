import { app, BrowserWindow,ipcMain,webContents } from "electron";
import * as path from "path";
import getAnswer from "./libs/getAnswer";
import { MAIN_HEIGHT,MAIN_WIDTH,CHILD_HEIGHT,CHILD_WIDTH,
  SEND_ANSWER,SET_ANSWER,SEND_TITLE_CHILD,
  SHOW_ANSWER,SET_TITLE_CHILD } from './constants'

const createWindow = ()=> {
  const mainWindow = new BrowserWindow({
    width: MAIN_WIDTH,
    height: MAIN_HEIGHT,
    webPreferences: {
      preload: path.join(__dirname, '../dist/preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  ipcMain.on(SEND_ANSWER, (event,value:string) => {
    mainWindow.webContents.send(SET_ANSWER,value)
  })

  mainWindow.loadFile('../index.html')
  mainWindow.webContents.openDevTools()
}

const sendTextToMain = (win: BrowserWindow) =>{
  ipcMain.on(SEND_TITLE_CHILD, async (event,value:string) => {
    win.loadFile('../child.html').then(() => {
      win.webContents.send(SET_TITLE_CHILD,value)
    })
    win.show()
  })
}

const showAnswer = async (win: BrowserWindow) => {
  ipcMain.on(SHOW_ANSWER, async (event,value:string) => {
    const newValue = await getAnswer(value)
    win.loadFile('../child.html').then(() => {
      if(newValue){
        win.webContents.send(SET_TITLE_CHILD,newValue)
      }
    })
    win.show()
  })
}


const createChildWindow = async() =>{
  const childWindow = new BrowserWindow({
    width: CHILD_WIDTH,
    height: CHILD_HEIGHT,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  childWindow.hide()
  childWindow.webContents.openDevTools()

  await sendTextToMain(childWindow)
  await showAnswer(childWindow)
}

app.whenReady().then(async () => {
  await createWindow()
  createChildWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

