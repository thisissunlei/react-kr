import {Link} from 'react-router';

import React, {Component, PropTypes} from 'react';

import './index.less';


export default class Header extends Component {

  render() {
    const {
      location,
      children,
    } = this.props;

    const router = this.context.router;

    return (
		<div className="c-header">
		<div className="container">
		<ul className="navs">
				<li><Link to="/"><img src="https://sta.36krcnd.com/common-module/common-header/images/logo.png" width="60" height="40"/></Link></li>

				<li><Link to="/company/list">创投资讯</Link></li>
				<li><Link to="/company/list">7*24h资讯</Link></li>
				<li><Link to="/company/list">股权投资</Link></li>
				<li><Link to="/company/list">融资</Link></li>
				<li><Link to="/company/list">我是创业者</Link></li>
				<li><Link to="/company/list">我是投资人</Link></li>
				<li><Link to="/company/list">发现</Link></li>
		</ul>

		</div>
		</div>
    );
  }

}





