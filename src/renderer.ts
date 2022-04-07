
import { ipcRenderer } from 'electron'

const setButton = document.getElementById('set')

setButton?.addEventListener('click', () => {
    const title = (<HTMLInputElement>document.getElementById('title')).value
    ipcRenderer.send('send-title-child',{title})
});

ipcRenderer.on('set-answer',(event,title:any)=>{
    const text = document.getElementById('answer')
    if(text){
        text.innerText = title
    }
})