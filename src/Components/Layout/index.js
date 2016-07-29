import React, {Component, PropTypes} from 'react';

import Header from '../header/index';

import '../global/icons.less';
import './layout.less';

export default class Layout  extends Component {

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    router: PropTypes.object
  };

  static getChildContext = function() {
    return {
        router: this.context.router
    };
  };

  render() {

    const {
      location,
      children,
    } = this.props;

    const router = this.context.router;

    return (
		<div>
		<span class="icon-home"></span>
		haha
		<Header/>
		{ children }
		</div>
    );
  }
}


