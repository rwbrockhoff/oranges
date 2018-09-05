const initialState = {
    user: {},
    room: '',
    scores: [],
    judge: false,
    aCard: [],
    aCards: [],
    sCards: [],
    qCard: []
}

const STOREQCARD = 'STOREQCARD';
const ADD_ROOM = "ADD_ROOM";

export const storeQCard = (card) => ({
  type: STOREQCARD,
  payload: card
})

export const addRoom = (room) => ({
  type: ADD_ROOM,
  payload: room
})


export default (state = initialState, action) => {
  switch (action.type) {

    case ADD_ROOM:
      const {room} = action.payload
      return Object.assign({}, state, {room})

  default:
    return state
  }
}
