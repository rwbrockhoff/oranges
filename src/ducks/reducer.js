const initialState = {
    user: {},
    scores: [],
    judge: false,
    aCard: [],
    aCards: [],
    sCards: [],
    qCard: []
}

const STOREQCARD = 'STOREQCARD';

export const storeQCard = (card) => ({
  type: STOREQCARD,
  payload: card
})


export default (state = initialState, action) => {
  switch (action.type) {

  case STOREQCARD:
    return Object.assign({}, state, {qCard: action.payload})

  default:
    return state
  }
}
