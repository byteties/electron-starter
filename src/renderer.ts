
import { ipcRenderer } from 'electron'
import axios from 'axios'

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

// axios.get(`${BASE_URL}/questions`)
//   .then((res)=> {
    // for(let i=0; i< res.data.length; i++){
    //     const textElement = document.getElementById(`question-${i+1}`)
    //     if(textElement){
    //         textElement.innerText = res.data[i]
    //     }
    //     textElement?.addEventListener('click', () => {
    //         ipcRenderer.send(`${SHOW_ANSWER}${i+1}`,i)
    //     });
    // }
//   })