import { Action } from 'redux';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

export function increment() {
  return { type: INCREMENT };
}

export function decrement() {
  return { type: DECREMENT };
}

function counter(state = 0, action: Action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
}

export default counter;
