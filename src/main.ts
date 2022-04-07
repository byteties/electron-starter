// Object.defineProperty(exports, "__esModule", { value: true });
import { app, BrowserWindow,ipcMain } from "electron";
import * as path from "path";

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '../dist/preload.js')
    }
  })

  ipcMain.on('send-title-child', (value) => {
    const childWindow = new BrowserWindow({
      width: 500,
      height: 500
    })
    childWindow.loadFile('../child.html')
    childWindow.show()
    childWindow.webContents.send('set-title-child',value)
  })

  mainWindow.loadFile('../index.html')
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

