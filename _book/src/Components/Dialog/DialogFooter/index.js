import React from 'react';

export default class DialogFooter extends React.Component {

	static displayName = 'DialogFooter';

	static propTypes = {
	    children:React.PropTypes.node
	}


	render() {

		const { children ,style} = this.props;

		return (
				<div className="dialog-footer" ref="dialogFooter" >
						{children}
			   </div>
		);

	}
}
