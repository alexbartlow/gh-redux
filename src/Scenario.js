import {rx, React, PropTypes, Actions } from './ComponentDeps';
import { Row, Grid, Col} from 'react-bootstrap';
import ModifierDeck from "./models/ModifierDeck";
import ApplicationState from './models/ApplicationState';

export default rx(class extends React.PureComponent {
  static propTypes = {
    scenario: PropTypes.number.isRequired,
    modifiers: PropTypes.instanceOf(ModifierDeck),
    drawOne: PropTypes.func.isRequired,
    drawTwo: PropTypes.func.isRequired,
    shuffleCards: PropTypes.func.isRequired
  };

  static mapStateToProps(/** @type {ApplicationState} */ state, ownProps) {
    return {
      scenario: state.scenario,
      modifiers: state.modifiers
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
      <Grid>
        <Row>
          <Col xs={6}>
            Scenario: {this.props.scenario}
          </Col>
          <Col xs={6}>
            <button className="btn btn-default" onClick={this.props.drawOne } value='Draw Card'>
              Draw One
            </button>
            <button className="btn btn-default" onClick={this.props.drawTwo } value='Draw Card'>
              Draw Two
            </button>
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
          </Col>
        </Row>
        <Row>
          Monster 1
        </Row>
      </Grid>
    );
  }
});
