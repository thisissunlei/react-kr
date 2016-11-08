import React from 'react';

import '../index.less';

export default  class Row extends React.Component {

	static displayName = 'Row';
	
	render() {

		let {children,className,style} = this.props;

		return (


			<div className="row" style={style}> 
				{children}
			</div>

		);

	}


}





