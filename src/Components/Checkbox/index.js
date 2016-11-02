import React,{Component} from 'react';

import Checkbox from 'material-ui/Checkbox';

export default class KrCheckbox extends React.Component{


	static PropTypes = {
		checked:React.PropTypes.bool,

	}

	render(){

		let {checked} = this.props;

		return (
			<Checkbox {...this.props}/>
		);
	}
}






