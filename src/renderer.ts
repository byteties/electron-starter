
import { ipcRenderer } from 'electron'

// const setButton = document.getElementById('set')

// setButton?.addEventListener('click', () => {
//     const title = (<HTMLInputElement>document.getElementById('title')).value
//     ipcRenderer.send('send-title-child',{title})
// });

// ipcRenderer.on('set-answer',(event,answer:any)=>{
//     const text = document.getElementById('answer')
//     if(text){
//         text.innerText = `Answer :${answer}`
//     }
// })

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
        ipcRenderer.send(`show-answer-${i+1}`,answer)
    });
}