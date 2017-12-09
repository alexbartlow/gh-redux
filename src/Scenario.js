import {rx, React, PropTypes, Immutable, Actions } from './ComponentDeps';
import { Grid, Col} from 'react-bootstrap';

export default rx(class extends React.PureComponent {
  static propTypes = {
    scenario: PropTypes.number.isRequired,
    revealedCards: PropTypes.instanceOf(Immutable.List).isRequired,
    deckSize: PropTypes.number.isRequired,
    drawOne: PropTypes.func.isRequired,
    drawTwo: PropTypes.func.isRequired,
    shuffleCards: PropTypes.func.isRequired
  };

  static mapStateToProps(state, ownProps) {
    return {
      scenario: state.get("scenario"),
      revealedCards: state.get("drawnModifiers"),
      deckSize: state.get('modifierDeck').size
    }
  }

  static mapDispatchToProps(dispatch) {
    return {
      drawOne:      () => { dispatch(Actions.drawModifierCards({ numberOfCards: 1 })); },
      drawTwo:      () => { dispatch(Actions.drawModifierCards({ numberOfCards: 2 })); },
      shuffleCards: () => { dispatch(Actions.shuffleModifierDeck({})); }
    }
  }

  render () {
    return (
      <Grid>
        <Col xs={6}>
          Scenario: {this.props.scenario}
        </Col>
        <Col xs={6}>
          <button onClick={this.props.drawOne } value='Draw Card'>
            Draw One
          </button>
          <button onClick={this.props.drawTwo } value='Draw Card'>
            Draw Two
          </button>
          <button onClick={this.props.shuffleCards} value='Shuffle Cards'>
            Shuffle Cards
          </button>

          Deck size: {this.props.deckSize}

          Revealed Cards:

          <ul>
            { this.props.revealedCards.map((card, i) => (
              <li key={i}>{ card.type }</li>
            ))}
          </ul>
        </Col>
      </Grid>
    );
  }
});
