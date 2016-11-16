import React from 'react';

import AppBar from 'material-ui/AppBar';

export default class KrAppBar extends React.Component {

	render() {

		let {children,className,style} = this.props;

		return (
        <AppBar {...this.props} />
		);

	}

}
