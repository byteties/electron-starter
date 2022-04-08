import { ipcRenderer } from "electron";


// ipcRenderer.on('set-title-child',(event,title:any)=>{
//     const text = document.getElementById('question')
//     if(text){
//         text.innerText = title
//     }
// })

// const sendButton = document.getElementById('send')

// sendButton?.addEventListener('click', () => {
//     const answer = (<HTMLInputElement>document.getElementById('answer')).value
//     ipcRenderer.send('send-ans',{answer})
// });

ipcRenderer.on('set-title-child',(event,text:any)=>{
    const textElement = document.getElementById('answer')
    if(textElement){
        textElement.innerText = 'Answer : '+text
    }
})