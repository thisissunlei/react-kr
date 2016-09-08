import React from 'react';

import './index.less';

export default class Col extends React.Component {

	/*
	PropTypes = {
		xs: React.PropTypes.number,
		sm: React.PropTypes.number,
		md: React.PropTypes.number,
		lg: React.PropTypes.number,
		xsHidden: React.PropTypes.bool,
		smHidden: React.PropTypes.bool,
		mdHidden: React.PropTypes.bool,
		lgHidden: React.PropTypes.bool,
		xsOffset: React.PropTypes.number,
		smOffset: React.PropTypes.number,
		mdOffset: React.PropTypes.number,
		lgOffset: React.PropTypes.number,
		xsPush: React.PropTypes.number,
		smPush: React.PropTypes.number,
		mdPush: React.PropTypes.number,
		lgPush: React.PropTypes.number,
		xsPull: React.PropTypes.number,
		smPull: React.PropTypes.number,
		mdPull: React.PropTypes.number,
		lgPull: React.PropTypes.number,
	};
	*/


	render() {

		let {children,className} = this.props;


		return (

			<div className={"col-md-6"}> 
				{this.props.children}
			</div>
		);

	}


}


