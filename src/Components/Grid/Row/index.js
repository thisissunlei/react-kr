import React from 'react';

import '../index.less';

export default  class Row extends React.Component {


	render() {

		let {children} = this.props;

		return (


			<div className="row"> 
				{children}
			</div>

		);

	}


}





