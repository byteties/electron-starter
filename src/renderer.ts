
import { ipcRenderer } from 'electron'
// import * as remote from '@electron/remote';
// const remoteMain = remote.require("@electron/remote/main");
// remoteMain.initialize();

const SET_ANSWER = 'set-answer'
const SEND_TITLE_CHILD = 'send-title-child'
const TRIGGER_CLOSE = 'trigger-close'

const setButton = document.getElementById('set')

setButton?.addEventListener('click', () => {
    const title = (<HTMLInputElement>document.getElementById('title')).value
    ipcRenderer.send(SEND_TITLE_CHILD,title)
});

ipcRenderer.on(SET_ANSWER,(event,answer:string)=>{
    const text = document.getElementById('answer')
    if(text){
        text.innerText = `Answer :${answer}`
    }
})


ipcRenderer.on(TRIGGER_CLOSE,(event)=>{
    console.log('------------ 0')
    // const window = remote.getCurrentWindow()
    // console.log('------------')
    // console.log(window)
})