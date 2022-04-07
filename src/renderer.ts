
import { ipcRenderer } from 'electron'

const setButton = document.getElementById('set')

setButton?.addEventListener('click', () => {
    const title = (<HTMLInputElement>document.getElementById('title')).value
    ipcRenderer.send('send-title-child',title)
});

