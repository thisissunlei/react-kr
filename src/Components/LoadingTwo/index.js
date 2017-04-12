import React from 'react';

import './index.less';

export default class LoadingTwo extends React.Component {

	static displayName = 'LoadingTwo';

	render() {

		return (
			<div className="spinner2">
			  <div className="rect1"></div>
			  <div className="rect2"></div>
			  <div className="rect3"></div>
			  <div className="rect4"></div>
			  <div className="rect5"></div>
			</div>
		);
	}
}
