import { ipcRenderer } from "electron";

ipcRenderer.on('set-title-child',(title:any)=>{
    const text = document.getElementById('question')
    if(text){
        text.innerText = title
    }
})
