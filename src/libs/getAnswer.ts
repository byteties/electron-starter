import axios from 'axios'
import { BASE_URL } from '../constants'

const getAnswer = async(value:string) =>{
  try{
    if(Number.isInteger(Number(value))){
      const res = await axios.get(`${BASE_URL}/answer/${value}`)
      return res.data
    }
    return null
  }catch(e){
    console.error('Error',e)
    return null
  }
}

export default getAnswer
