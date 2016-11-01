import { List } from 'immutable';
import { ADD_ALL_CARDS, MOVE_CARDS, DELETE_CARDS } from '../actions/kanbanActions';

const initialState = List();

const kanbanPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALL_CARDS:
      return List(action.data);

    case MOVE_CARDS:
      let indexToUpdate = state.findIndex(card => {
        return card.id === action.data.id;
      });
      return state.update( indexToUpdate, (card) =>{

      let cardCopy = JSON.parse(JSON.stringify(card));
      cardCopy.Status = action.data.status;
      return cardCopy;
      })

    case DELETE_CARDS:
      let cardToDelete = state.findIndex(card => {
        return card.id === action.id;
      })
      return state.delete( cardToDelete)

    default:
      return state;
  }
}

export default kanbanPageReducer;