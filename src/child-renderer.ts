import { ipcRenderer } from "electron";

const SEND_ANSWER = 'send-answer'
const SET_TITLE_CHILD = 'set-title-child'

ipcRenderer.on(SET_TITLE_CHILD,(event,title:string)=>{
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
