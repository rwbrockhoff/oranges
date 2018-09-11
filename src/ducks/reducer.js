const initialState = {
  users: [],
  room: '',
  scores: [],
  aCard: [],
  aCards: [],
  sCards: [],
  qCard: [],
  readyPlayers: [],
  user: {}
}

const STOREQCARD = 'STOREQCARD';
const STOREACARD = 'STOREACARD'
const ADD_ROOM = "ADD_ROOM";
const ADD_PLAYER = "ADD_PLAYER";
const STOREUSER = 'STOREUSER';
const READYPLAYER = 'READYPLAYER';
const SETJUDGE = 'SETJUDGE';
const UPDATEJUDGE = 'UPDATEJUDGE';
const UPDATEQCARD = 'UPDATEQCARD';

export const storeQCard = (card) => ({
type: STOREQCARD,
payload: card
})

export const storeACard = (card) => ({
type: STOREACARD,
payload: card
})


export const addRoom = (room) => ({
type: ADD_ROOM,
payload: room
})

export const addPlayer = (players) => ({
type: ADD_PLAYER,
payload: players
})

export const storeUser = (user) => ({
type: STOREUSER,
payload: user
})

export const readyPlayer = (player) => ({
type: READYPLAYER,
payload: player
})

export const setJudge = (users) => ({
type: SETJUDGE,
payload: users
})

export const updateJudge = (user) => ({
type: UPDATEJUDGE,
payload: user
})

export const updateQCard = (card) => ({
type: UPDATEQCARD,
payload: card
})




export default (state = initialState, action) => {
switch (action.type) {

  case ADD_ROOM:
    const {room} = action.payload
    return Object.assign({}, state, {room})

  case STOREQCARD:
    return Object.assign({}, state, {qCard: action.payload})

  case STOREACARD:
    return Object.assign({}, state, {aCards: action.payload})

  case ADD_PLAYER:
    return Object.assign({},state,{users: action.payload})
  
    case STOREUSER:
    return Object.assign({},state,{user: action.payload})
    
    case READYPLAYER:
    return Object.assign({},state,{readyPlayers: action.payload})

    case SETJUDGE:
    return Object.assign({}, state, {users: action.payload})

    case UPDATEJUDGE:
    return Object.assign({}, state, {user: action.payload})

    case UPDATEQCARD:
    return Object.assign({}, state, {qCard: action.payload})

default:
  return state
}
}
