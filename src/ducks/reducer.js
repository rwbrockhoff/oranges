const initialState = {
    user: {},
    scores: [],
    judge: false,
    aCard: [],
    aCards: [],
    sCards: [],
    qCard: {}
}

export default (state = initialState, action) => {
  switch (action.type) {

  case typeName:
    return { ...state }

  default:
    return state
  }
}
