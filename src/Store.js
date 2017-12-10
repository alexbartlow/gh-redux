import {createStore} from 'redux';
import {ModifierDeckFactory} from './config/modifiers';
import Immutable from 'immutable';
import ModifierDeck from "./models/ModifierDeck";

export const Actions = {
   chooseScenario: (payload) => ({ type: 'scenario/pick', payload }),
   shuffleModifierDeck: (payload) => ({ type: 'modifier/shuffle', payload}),
   drawModifierCards: (payload) => ({ type: 'modifier/draw', ...payload}),
};

const initialState = Immutable.fromJS({
  scenario: 5,
  modifiers: new ModifierDeck({deck: ModifierDeckFactory()})
});

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'modifier/shuffle':
      return state.set('modifiers', state.get('modifiers').shuffleDeck());
    case 'modifier/draw':
      return state.set('modifiers', state.get('modifiers').drawCards(action.numberOfCards || 1));
    default:
      return state;
  }
}

export const Store = () => createStore(reducer, initialState);
export default Store;