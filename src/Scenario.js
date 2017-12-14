import {rx, React, PropTypes, Actions } from './ComponentDeps';
import { Row, Grid, Col} from 'react-bootstrap';
import ModifierDeck from "./models/ModifierDeck";
<<<<<<< HEAD
import Immutable from 'immutable';

const MonsterGroup = rx(class extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string
    , group: PropTypes.instanceOf(Immutable.Record).isRequired
  }

  static mapStateToProps(state, ownProps) {
    return {
      name: ownProps.name
      , group: state.get('monsterGroups').find((group) => (group.name === ownProps.name))
    }
  }

  render() {
    return (
      <div className="monsterGroup">
        <h2>{this.props.group.name} - {this.props.group.level}</h2>
        <ul>
          {this.props.group.deck.drawPile.map((card, i) => (
            <li key={i}><pre>{JSON.stringify(card)}</pre></li>
          ))}
        </ul>
      </div>
    )
  }
});
=======
import ApplicationState from './models/ApplicationState';
>>>>>>> 8c60774eaa271f6c8457efd2528a362535af4e87

export default rx(class extends React.PureComponent {
  static propTypes = {
    scenario: PropTypes.number.isRequired,
    modifiers: PropTypes.instanceOf(ModifierDeck),
    monsterGroups: PropTypes.instanceOf(Immutable.List).isRequired,
    drawOne: PropTypes.func.isRequired,
    drawTwo: PropTypes.func.isRequired,
    shuffleCards: PropTypes.func.isRequired
  };

  static mapStateToProps(/** @type {ApplicationState} */ state, ownProps) {
    return {
      scenario: state.scenario,
      modifiers: state.modifiers,
      monsterGroups: state.monsterGroups
    }
  }

  static mapDispatchToProps(dispatch) {
    return {
      drawOne:      () => { dispatch(Actions.drawModifierCards({ numberOfCards: 1 })); },
      drawTwo:      () => { dispatch(Actions.drawModifierCards({ numberOfCards: 2 })); },
      shuffleCards: () => { dispatch(Actions.shuffleModifierDeck({})); }
    }
  }

  componentDidUpdate() {
    setTimeout(() => {
      Array.prototype.forEach.call(document.getElementsByClassName("Modifiers--card"), (card) => {
        card.className += " flipped";
      });
    }, 0.1);
  }

  render () {
    return (
      <div id="scenario">
        <Grid>
          <Row>
            <Col xs={2}>
              Scenario: {this.props.scenario}
            </Col>
            <Col xs={2}>
              <button className="btn btn-default" onClick={this.props.drawOne } value='Draw Card'>
                Draw One
              </button>
              <button className="btn btn-default" onClick={this.props.drawTwo } value='Draw Card'>
                Draw Two
              </button>
            </Col>
            <Col xs={6}>
              <div className="Modifiers--drawn">
                { this.props.modifiers.drawn.map((card, i) => (
                  <div key={Math.random()} className="Modifiers--card">
                    <div className="Modifiers--flipper">
                      <div className="Modifiers--card-front">
                        <img src={card.image} alt={card.type}/>
                      </div>
                      <div className="Modifiers--card-back">
                        <img src="images/attack_mod_back.jpg"/>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="Modifiers--stack">
                <div className="Modifiers--card-back static">
                  <img src="images/attack_mod_back.jpg"/>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
        <Grid>
          { this.props.monsterGroups.map((monster, i) => (
            <MonsterGroup group={monster} name={monster.name} key={i}/>
          ))}
        </Grid>
      </div>
    );
  }
});

