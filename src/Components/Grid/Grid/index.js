import React from 'react';

import './index.less';

export default class Grid extends React.Component {


	render() {

		let {children,className,style} = this.props;


		return (

			<div className="grid" style={style}> 
				{this.props.children}
			</div>
		);

	}


}





