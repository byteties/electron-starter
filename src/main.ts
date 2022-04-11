import { app, BrowserWindow,ipcMain } from "electron";
import * as path from "path";
import { MAIN_HEIGHT,MAIN_WIDTH,CHILD_HEIGHT,CHILD_WIDTH,SEND_ANSWER,SET_ANSWER,SEND_TITLE_CHILD,SHOW_ANSWER,SET_TITLE_ANSWER } from './constants'

const createWindow =()=> {
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

const createChildWindow = () =>{
  const childWindow = new BrowserWindow({
    width: CHILD_WIDTH,
    height: CHILD_HEIGHT,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  childWindow.hide()

  ipcMain.on(SEND_TITLE_CHILD, (event,value:string) => {
    childWindow.loadFile('../child.html').then(() => {
      childWindow.webContents.send(SET_TITLE_ANSWER,value)
    })
    childWindow.show()
    childWindow.webContents.openDevTools()
  })

  for (let i = 0; i < 3; i++) {
    ipcMain.on(`${SHOW_ANSWER}${i+1}`, (event,value:string) => {
        childWindow.loadFile('../child.html').then(() => {
          childWindow.webContents.send(SET_TITLE_ANSWER,value)
        })
        childWindow.show()
    })
  }
}

app.whenReady().then(() => {
  createWindow()
  createChildWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

