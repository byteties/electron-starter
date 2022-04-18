import axios from 'axios'
import { BASE_URL,SHOW_ANSWER } from '../constants'

const getQuestion = async() =>{
  try{
    const res = await axios.get(`${BASE_URL}/questions/`)
    const data = []
    for(let i=0; i< res.data.length; i++){
      data.push({
        id:`question-${i+1}`,
        event: `${SHOW_ANSWER}${i+1}`,
        value: res.data[i]
      })
    }
    return data
  }catch(e){
    console.error('Error',e)
    return null
  }
}

export default getQuestion
