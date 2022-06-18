import Feelings from './feelings.js'
import FakeFoods from './fakeFood.js'
import Questions from './questions.js'


const state = {
  // user data facilitators start
  user: JSON.parse(localStorage.getItem('user')) || '',
  access_token: JSON.parse(localStorage.getItem('access_token')) || '',
  baseFeelings: Feelings.feelings,
  userMemories: JSON.parse(localStorage.getItem('userMemories')) || [],
  userFoods: JSON.parse(localStorage.getItem('userFoods')) || FakeFoods.foods,
  userTags: JSON.parse(localStorage.getItem('userTags')) || [],
  // ui/component flow facilitators start
  selectedMemory: null,
  questions: Questions.questions
}

export default state