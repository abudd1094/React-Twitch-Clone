import { SIGN_IN, SIGN_OUT } from '../actions/types';


const INITIAL_STATE = {
  isSignedIn: null,
  userId: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload }; // update state as new object to include user ID and flip the isSignedIn boolean
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null }; // update state to remove user ID and flip boolean
    default:
      return state;
  }
};