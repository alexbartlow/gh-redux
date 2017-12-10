import Immutable from 'immutable';

const proto = Immutable.Record({
  deck: Immutable.List([]),
  drawn: Immutable.List([]),
  discard: Immutable.List([])
});

export default class ModifierDeck extends proto {
  shuffleDeck() {
    const newDeck = this.deck
      .concat(this.drawn)
      .concat(this.discard)
      .sortBy(Math.random);

    return new ModifierDeck({deck: newDeck});
  }

  drawCards(draws = 1) {
    // If there are any cards marked shuffle, shuffle the deck first
    if(this.drawn.find((card) => { return card.shuffle; })) {
      return this.shuffleDeck().drawCards(draws);
    }

    // Move the drawn to the discard, and draw new cards off the top of the deck
    return this
      .set('discard', this.discard.concat(this.drawn))
      .set('drawn', this.deck.slice(-draws))
      .set('deck', this.deck.splice(-draws, draws));
  }
}
