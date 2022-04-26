import { ipcRenderer } from "electron";
import * as remote from '@electron/remote'

const SEND_ANSWER = 'send-answer'
const SET_TITLE_ANSWER_WIN = 'set-title-answer'
const TRIGGER_CLOSE = 'trigger-close'

ipcRenderer.on(SET_TITLE_ANSWER_WIN,(event,title:string)=>{
    const text = document.getElementById('question')
    if(text){
        text.innerText = title
    }
})

const sendButton = document.getElementById('send')

sendButton?.addEventListener('click', () => {
    const answer = (<HTMLInputElement>document.getElementById('answer')).value
    ipcRenderer.send(SEND_ANSWER,answer)
});

ipcRenderer.on(TRIGGER_CLOSE,(event)=>{
    remote.getCurrentWindow().hide();
})