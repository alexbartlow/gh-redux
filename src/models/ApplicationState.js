import Immutable from 'immutable';
import ModifierDeck from './ModifierDeck';
import { ModifierDeckFactory } from '../config/modifiers';

class ApplicationState extends Immutable.Record({
  scenario: 0,
  modifiers: new ModifierDeck({deck: ModifierDeckFactory()}),
  monsterGroups: Immutable.List([])
}) {
  updateModifiers(updater) {
    return this.update('modifiers', updater);
  }
}

export default ApplicationState;