import {rx, React, PropTypes, Actions } from './ComponentDeps';
import { Row, Grid, Col } from 'react-bootstrap';
import Immutable from 'immutable';

export default rx(class extends React.PureComponent {
  static propTypes = {
    monster_name: PropTypes.string.isRequired,
    deck: PropTypes.any,
    instances: PropTypes.instanceOf(Immutable.List)
  };

  static mapStateToProps(state, ownProps) {
  
  }
});

