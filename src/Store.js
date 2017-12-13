import {createStore} from 'redux';
import {ModifierDeckFactory} from './config/modifiers';
import Immutable from 'immutable';
import MonsterGroup from './models/MonsterGroup';
import ModifierDeck from "./models/ModifierDeck";
import { MonsterDecks, MonsterDeckDefinitions } from "./config/cards";
import randomid from 'random-id';

export const Actions = {
   chooseScenario: (payload) => ({ type: 'scenario/pick', payload }),
   shuffleModifierDeck: (payload) => ({ type: 'modifier/shuffle', payload}),
   drawModifierCards: (payload) => ({ type: 'modifier/draw', ...payload}),
};

const initialState = Immutable.fromJS({
  scenario: 5,
  modifiers: new ModifierDeck({deck: ModifierDeckFactory()}),
  monsterGroups: Immutable.List([
    new MonsterGroup({name: 'Bandit Guard', level: 1})
    , new MonsterGroup({name: 'Bandit Archer', level: 2})
  ])
});

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'modifier/shuffle':
      return state
        .updateIn(['modifiers'], (m) => m.shuffleDeck());
    case 'modifier/draw':
      return state
        .updateIn(['modifiers'], (m) => m.drawCards(action.numberOfCards || 1));
    default:
      return state;
  }
}

export const Store = () => createStore(reducer, initialState);
export default Store;