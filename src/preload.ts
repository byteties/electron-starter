import { ipcRenderer } from "electron";
import { QUESTION_DIV,QUESTION_LIST } from './constants'
import getQuestion from "./libs/getQuestion";

window.addEventListener('DOMContentLoaded', async() => {
  const divQuestion = document.getElementById(QUESTION_DIV)
  const question = await getQuestion()
  const ul = document.createElement(QUESTION_LIST);
  
  if(question){
    for(let i=0;i < question.length; i++){
      const { id,event,value} = question[i]
      const li = document.createElement("li");
      li.setAttribute("id", id);
      li?.addEventListener('click', () => {
        ipcRenderer.send(event,i)
      });
      li.appendChild(document.createTextNode(value));
      ul.appendChild(li);
    }
    divQuestion?.appendChild(ul)
  }
})