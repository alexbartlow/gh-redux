import { Immutable } from "../ComponentDeps";
import ModifierDeck from './ModifierDeck';

class ApplicationState extends Immutable.Record({scenario: 0, modifiers: new ModifierDeck()}) {
  scenario: number;
  modifiers: ModifierDeck;

  updateModifiers(updater: (m: ModifierDeck) => ModifierDeck) {}
}

export = ApplicationState;