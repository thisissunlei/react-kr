import React,{Component} from 'react';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import './index.less';

export default class Button extends Component{


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		style:React.PropTypes.object,
		type:React.PropTypes.string,
		label:React.PropTypes.string,
	}


	render(){

		const {type,label,...other} = this.props;


		const labelStyles ={
			paddingLeft:8,
			paddingRight:8,
		}

		if(type == 'link'){
			return (
				<FlatButton label={label} primary={true} style={{minWidth:30}}  labelStyle={labelStyles} {...other} />
			);
		}

		if(type == 'button'){
			return (
				<RaisedButton label={label} style={{minWidth:30}}  labelStyle={labelStyles} {...other} />
			);
		}

		if(type == 'submit'){
			return (
				<RaisedButton label={label} style={{minWidth:30}} type="submit" labelStyle={labelStyles} {...other} />
			);
		}

		return (
				<RaisedButton label={label} style={{minWidth:30}}  labelStyle={labelStyles} {...other} />
		);
	}
}





