import React from 'react';
import Title  from 'react-title-component';

export default class TitleList extends React.Component {

	static displayName = 'TitleComponent';

	constructor(props){
		super(props);
	}

	render() {

		var {value} = this.props;

		return ( <Title render={value}/>);

	}

}
