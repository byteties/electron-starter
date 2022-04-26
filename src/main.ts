import { app,BrowserWindow,ipcMain } from "electron";
import { initialize, enable as enableRemote } from "@electron/remote/main";
import * as path from "path";
import getAnswer from "./libs/getAnswer";
import { QUESTION_HEIGHT,QUESTION_WIDTH,ANSWER_WIN_WIDTH,ANSWER_WIN_HEIGHT,
  SEND_ANSWER,SET_ANSWER,SEND_TITLE_ANSWER_WIN,
  SHOW_ANSWER,SET_TITLE_ANSWER_WIN,TRIGGER_CLOSE_ANSWER_WINDOW,AUTO_CLOSE_TIMEOUT_MILLISECOND } from './constants'

initialize()

const createQuestionWindow = ():BrowserWindow => {
  const questionWindow: BrowserWindow = new BrowserWindow({
    width: QUESTION_WIDTH,
    height: QUESTION_HEIGHT,
    webPreferences: {
      preload: path.join(__dirname, '../dist/preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  questionWindow.loadFile('../index.html')
  questionWindow.webContents.openDevTools()
  return questionWindow
}

const sendTextToQuestionWindow = (win: BrowserWindow):void =>{
  ipcMain.on(SEND_TITLE_ANSWER_WIN, (event,text:string) => {
    win.loadFile('../child.html').then(() => {
      win.webContents.send(SET_TITLE_ANSWER_WIN,text)
    })
    win.show()
  })
}

const showAndAutoHideAnswerWindow = async (answerWindow: BrowserWindow):Promise<void> => {
  ipcMain.on(SHOW_ANSWER, async (event,index:string) => {
    const answer = await getAnswer(index)
    answerWindow.loadFile('../answer.html').then(() => {
      if(answer?.isApiSuccess){
        answerWindow.webContents.send(SET_TITLE_ANSWER_WIN,answer.date)
      }
    })
    answerWindow.show()

    setTimeout(()=>{
      answerWindow.webContents.send(TRIGGER_CLOSE_ANSWER_WINDOW)
    },AUTO_CLOSE_TIMEOUT_MILLISECOND)
  })
}

const createAnswerWindow = ():BrowserWindow =>{
  const answerWindow: BrowserWindow = new BrowserWindow({
    width: ANSWER_WIN_WIDTH,
    height: ANSWER_WIN_HEIGHT,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  })
  answerWindow.hide()
  answerWindow.webContents.openDevTools()

  return answerWindow
}

app.whenReady().then(async () => {
  const questionWindow:BrowserWindow = createQuestionWindow()
  
  ipcMain.on(SEND_ANSWER, (event,answer:string) => {
    questionWindow.webContents.send(SET_ANSWER,answer)
  })

  const answerWindow:BrowserWindow = createAnswerWindow()

  enableRemote(answerWindow.webContents);

  await sendTextToQuestionWindow(answerWindow)
  await showAndAutoHideAnswerWindow(answerWindow)

  app.on('activate', ()=> {
    if (BrowserWindow.getAllWindows().length === 0) createQuestionWindow()
  })
})

app.on('window-all-closed', ()=> {
  if (process.platform !== 'darwin') app.quit()
})

