import axios from 'axios'
import { BASE_URL } from '../constants'

interface Answer {
  date: string;
  isApiSuccess: boolean
}

const getAnswer = async(value:string): Promise<Answer | null> =>{
  try{
    let answer:Answer
    if(Number.isInteger(Number(value))){
      const res = await axios.get(`${BASE_URL}/answer/${value}`)
      answer = {
        date:res.data,
        isApiSuccess: true
      }
      return answer
    }
    answer = {
      date: value,
      isApiSuccess: false
    }
    return answer
  }catch(e){
    console.error('Error',e)
    return null
  }
}

export default getAnswer
