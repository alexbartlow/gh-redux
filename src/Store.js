// @ts-check
import {createStore} from 'redux';
import {ModifierDeckFactory} from './config/modifiers';
import Immutable from 'immutable';
import ModifierDeck from "./models/ModifierDeck";
import ApplicationState from "./models/ApplicationState";

export const Actions = {
   chooseScenario: (payload) => ({ type: 'scenario/pick', payload }),
   shuffleModifierDeck: (payload) => ({ type: 'modifier/shuffle', payload}),
   drawModifierCards: (payload) => ({ type: 'modifier/draw', ...payload}),
};


/**
 * @param {ApplicationState} state 
 * @param {Object} action 
 */
const reducer = (state = new ApplicationState(), action) => {
  switch(action.type) {
    case 'modifier/shuffle':
      return state.updateModifiers((m) => m.shuffleDeck() );
    case 'modifier/draw':
      return state.updateModifiers((m) => m.drawCards(action.numberOfCards));
    default:
      return state;
  }
}

export const Store = () => createStore(reducer, new ApplicationState());
export default Store;