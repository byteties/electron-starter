
import { ipcRenderer } from 'electron'

const SET_ANSWER = 'set-answer'
const SEND_TITLE_CHILD = 'send-title-child'
const SHOW_ANSWER = 'show-answer-'

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

for (let i = 0; i < 3; i++) {
    const textElement = document.getElementById(`question-${i+1}`)
    let answer = ''
    if(i === 0){
        answer = 'Heaven'
    } else if (i === 1){
        answer = 'Earth'
    } else if (i === 2){
        answer = 'Heart'
    } else {
        answer = ''
    }
    textElement?.addEventListener('click', () => {
        ipcRenderer.send(`${SHOW_ANSWER}${i+1}`,answer)
    });
}