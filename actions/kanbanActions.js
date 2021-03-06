export const ADD_ALL_CARDS = 'ADD_ALL_CARDS';
export const MOVE_CARDS = 'MOVE_CARDS';
export const DELETE_CARDS = 'DELETE_CARDS';
export const NEW_CARD = 'NEW_CARD';

export const newCard = (data) => {
  return {
    type: NEW_CARD,
    data,
  }
}


export const addAllCards = (data) => {
  return {
    type: ADD_ALL_CARDS,
    data,
  }
}

export const moveCards = (data) => {
  return {
    type: MOVE_CARDS,
    data: data
  }
}

export const deleteCard = (id) => {
  return {
    type: DELETE_CARDS,
    id
  }
}