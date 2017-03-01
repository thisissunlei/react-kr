import React, {
	Component
} from 'react';

import ReactDOM from 'react-dom';

export default class DialogFooter extends Component {

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
