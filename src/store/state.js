import Feelings from './feelings.js'



const state = {
    user: JSON.parse(localStorage.getItem('user')) ||'',
    access_token: JSON.parse(localStorage.getItem('access_token')) ||'',
    baseFeelings: Feelings.feelings,
    userMemories: JSON.parse(localStorage.getItem('userMemories')) || [],
    userFoods: JSON.parse(localStorage.getItem('userFoods')) || [],
    userTags: JSON.parse(localStorage.getItem('userTags')) || [],
  }

export default state