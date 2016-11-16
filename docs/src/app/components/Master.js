import React, {Component, PropTypes} from 'react';

import {AppBar} from 'new-ui';

class Master extends Component {

  static propTypes = {
    children: PropTypes.node,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  render() {

    const {
      children,
    } = this.props;

    return (
      <div>
        <AppBar title="docs"/>
        { children }
      </div>
    );
  }
}

export default Master;
