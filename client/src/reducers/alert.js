// REDUCER - a function that interacts with the store - returns an object
// Describes how the action transforms the state into the next state

import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

const alertReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== payload);
    default:
      return state;
  }
}

export default alertReducer;