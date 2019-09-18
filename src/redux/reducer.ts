const initialState = {};

interface actionType {
  type: string;
  payload?: any;
}

function reducer (state = initialState, action: actionType) {
  switch (action.type) {

    default:
      return state;
  }
}

export default reducer;