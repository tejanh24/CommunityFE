import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../containers.css';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <span>Bots &copy; 2019 Mouritech.</span>
        <span className="ml-auto">Powered by <a href="https://www.mouritech.com/" target="_blank" >Mouritech (P) Ltd</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
