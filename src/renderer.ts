
import { ipcRenderer } from 'electron'

const SET_ANSWER = 'set-answer'
const SEND_TITLE_CHILD = 'send-title-child'

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
