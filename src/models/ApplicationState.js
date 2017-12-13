import Immutable from 'immutable';
import ModifierDeck from './ModifierDeck';
import { ModifierDeckFactory } from '../config/modifiers';

const proto = Immutable.Record({
  scenario: 0,
  modifiers: new ModifierDeck({deck: ModifierDeckFactory()})
});

class ApplicationState extends Immutable.Record({
  scenario: 0,
  modifiers: new ModifierDeck({deck: ModifierDeckFactory()})
}) {
  updateModifiers(updater) {
    return this.update('modifiers', updater);
  }
}

export default ApplicationState;