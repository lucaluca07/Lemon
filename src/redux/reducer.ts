const initialState = {};

interface ActionType {
  type: string;
  payload?: any;
}

function reducer (state = initialState, action: ActionType) {
  switch (action.type) {

    default:
      return state;
  }
}

export default reducer;
