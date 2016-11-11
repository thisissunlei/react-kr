import React,{Component} from 'react';

import Checkbox from 'material-ui/Checkbox';

export default class KrCheckbox extends React.Component{


	static displayName = 'KrCheckbox';
	
	static PropTypes = {
		checked:React.PropTypes.bool,
		onCheck:React.PropTypes.func,

	}

	render(){

		let {checked,onCheck} = this.props;

		return (
			<input type="checkbox" onClick={onCheck} checked={checked}/>
		);
	}
}






