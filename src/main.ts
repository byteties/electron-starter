import { app, BrowserWindow,ipcMain,ipcRenderer } from "electron";
import * as path from "path";

const createWindow =()=> {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../dist/preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })

  // ipcMain.on('send-ans', (event,value:any) => {
  //   mainWindow.webContents.send('set-answer',value.answer)
  // })

  mainWindow.loadFile('../index.html')
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
  const childWindow = new BrowserWindow({
    width: 1000,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  })
  childWindow.hide()

  // ipcMain.on('send-title-child', (event,value:any) => {
  //   childWindow.loadFile('../child.html').then(() => {
  //     childWindow.webContents.send('set-title-child',value.title)
  //   })
  //   childWindow.show()
    childWindow.webContents.openDevTools()
  // })


  for (let i = 0; i < 3; i++) {
    ipcMain.on(`show-answer-${i+1}`, (event,value:any) => {
        childWindow.loadFile('../child.html').then(() => {
          childWindow.webContents.send('set-title-child',value)
        })
        childWindow.show()
    })
  }
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

