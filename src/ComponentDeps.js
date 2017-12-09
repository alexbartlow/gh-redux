import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import { Actions } from './Store';

const rx = (component) => {
  return connect(
    component.mapStateToProps,
    component.mapDispatchToProps
  )(component);
}

export {
  rx,
  React,
  PropTypes,
  Immutable,
  Actions
};
