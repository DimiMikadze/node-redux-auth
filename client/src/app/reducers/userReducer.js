import {
  FETCH_USERS,
} from '../actions/types/index';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_USERS:
      return { list: action.payload, ...state };
  }

  return state;
}