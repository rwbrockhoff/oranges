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
const STOREACARD = 'STOREACARD';

export const storeQCard = (card) => ({
  type: STOREQCARD,
  payload: card
})

export const storeACard = (card) => ({
  type: STOREACARD,
  payload: card
})



export default (state = initialState, action) => {
  switch (action.type) {

  case STOREQCARD:
    return Object.assign({}, state, {qCard: action.payload})

  case STOREACARD:
    return Object.assign({}, state, {aCards: action.payload})

  default:
    return state
  }
}
