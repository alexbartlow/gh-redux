import Immutable from 'immutable';
import { MonsterDecks, MonsterDeckDefinitions } from '../config/cards';
import { MonsterStats } from '../config/monster_stats';
import randomID from 'random-id';

export const MonsterInstance = Immutable.Record({
  id: 0
  , type: "normal"
  , hp: 8
});

export const MonsterDeck = Immutable.Record({
  drawPile: Immutable.List([])
  , drawn: []
  , discardPile: Immutable.List([])
});

const proto = Immutable.Record({
  name: "string"
  , level: 0
  , instances: Immutable.List([])
  , deck: new MonsterDeck()
  , normalStats: {}
  , eliteStats: {}
})

export default class MonsterGroup extends proto {
  constructor({name, level}) {
    const deckClass = MonsterDecks[name].class;
    const deckDefinition = MonsterDeckDefinitions.find(
      (deck) => ( deck.class === deckClass )
    ).cards

    const levelDefinition = MonsterStats.monsters[name].level.find(
      (block) => ( block.level = level)
    )

    super({
      name: name
      , level: level
      , instances: Immutable.List([])
      , deck: new MonsterDeck({
        drawPile: Immutable.List(deckDefinition).sortBy(Math.random),
        drawn: [],
        discardPile: Immutable.List([])
      })
      , normalStats: levelDefinition.normal
      , eliteStats: levelDefinition.elite
    })
  }

  spawnNormal() {
    return this.set('instances', this.instances.push({
      id: randomID()
      , type: 'normal'
      , hp: this.normalStats.health
    }))
  }

  spawnElite() {
    return this.updateIn(['instances'], (i) => (i.push({
      id: randomID()
      , type: 'normal'
      , hp: this.eliteStats.health
    })))
  }
}
