import Immutable from 'immutable';

export declare class ModifierDeck {

  constructor(Object) ;

  deck: Immutable.List<Object>;
  drawn: Immutable.List<Object>;
  discard: Immutable.List<Object>;

  shuffleDeck(): ModifierDeck;
  drawCards(draws: number): ModifierDeck;

}

export = ModifierDeck;