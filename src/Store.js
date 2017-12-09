import {createStore} from 'redux';
import {ModifierDeckFactory} from './config/modifiers';
import Immutable from 'immutable';

export const Actions = {
   chooseScenario: (payload) => ({ type: 'CHOOSE_SCENARIO', payload }),
   shuffleModifierDeck: (payload) => ({ type: 'SHUFFLE_MODIFIER_DECK', payload}),
   drawModifierCards: (payload) => ({ type: 'DRAW_MODIFIER_CARDS', ...payload}),
};

const initialState = Immutable.fromJS({
    scenario: 5,
    modifierDeck: ModifierDeckFactory(),
    drawnModifiers: Immutable.List([]),
    modifierDiscard: Immutable.List([])
});

const shuffleModifierDeckReduction = (state) => {
    const newDeck = state
        .get('modifierDeck')
        .concat(state.get('drawnModifiers'))
        .concat(state.get('modifierDiscard'))
        .sortBy(Math.random);

    return state.set('modifierDeck', newDeck)
        .set('drawnModifiers', Immutable.List([]))
        .set('modifierDiscard', Immutable.List([]));
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SHUFFLE_MODIFIER_DECK':
            return shuffleModifierDeckReduction(state);
        case 'DRAW_MODIFIER_CARDS':
            let newState = state;
            const numberOfCards = action.numberOfCards || 1;

            // Shuffle the modifier deck automatically if we drew a shuffle card
            if( newState.get('drawnModifiers').find((card) => { return card.shuffle;})) {
                newState = shuffleModifierDeckReduction(newState);
            }

            const newDiscard = newState.get('modifierDiscard').concat(newState.get('drawnModifiers'));
            newState = newState.set('drawnModifiers', Immutable.List([]));
            for(let i = 0; i < numberOfCards ; i++ ) {
                const newDrawnModifiers = newState.get('drawnModifiers').push(newState.get('modifierDeck').last());
                const newModifierDeck = newState.get('modifierDeck').pop();

                newState = newState.set('drawnModifiers', newDrawnModifiers).set('modifierDeck', newModifierDeck);
            }

            return newState.set('modifierDiscard', newDiscard);
        default:
            return state;
    }
}

export const Store = () => createStore(reducer, initialState);
export default Store;