import React from 'react';

import './index.less';

export default class Grid extends React.Component {


	render() {

		let {children,className} = this.props;


		return (

			<div className="grid"> 
				{this.props.children}
			</div>
		);

	}


}





