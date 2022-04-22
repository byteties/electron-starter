import { ipcRenderer } from "electron";
import { QUESTION_DIV,QUESTION_LIST } from './constants'
import getQuestions from "./libs/getQuestions";

window.addEventListener('DOMContentLoaded', async() => {
  const divQuestion = document.getElementById(QUESTION_DIV)
  const questions = await getQuestions()
  const ul = document.createElement(QUESTION_LIST);
  
  if(questions){
    for(let i=0;i < questions.length; i++){
      const { id,event,value} = questions[i]
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