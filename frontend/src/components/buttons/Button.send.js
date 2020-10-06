import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ButtonSend extends Component {
  static propTypes = {
    inWait: PropTypes.bool.isRequired,
  };
   
   render() {
    return (
      <button type="submit" disabled={this.props.state === 'wait' ? true: false}>
        {this.props.state === 'wait' ? 'enviando...': this.props.textDefault}
      </button>
    );
  }
}
