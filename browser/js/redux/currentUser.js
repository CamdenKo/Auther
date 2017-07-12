import axios from 'axios';

/* Action */
const SET = 'SET_CURRENT_USER'
const QUIT = 'QUIT_CURRENT_USER'

/*Action Creator*/
export const set = user => ({type: SET, user})
export const quit = () => ({type: QUIT})

/*Reducer*/
export default function reducer (currentUser = {}, action) {
  switch (action.type) {
    case SET:
      return action.user;
    case QUIT:
        return {}
    default:
      return currentUser
  }
}

/*Thunk*/
export const setUser = (email, password) => dispatch => {
  axios.post(`/api/login`, {email, password})
  .then(res => dispatch(set(res.data)))
  .catch(err => console.error(`Logging in user with email ${email} failed`, err));
}