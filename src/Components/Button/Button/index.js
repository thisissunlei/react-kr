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
		disabled:React.PropTypes.bool,
	}


	render(){

		const {type,label,disabled,...other} = this.props;


		const labelStyles ={
			paddingLeft:13,
			paddingRight:13,
		}

		if(type == 'link'){

			if(disabled){
				delete  other.href;
			}

			return (
				<FlatButton label={label} primary={true} style={{minWidth:30}}  labelStyle={labelStyles} {...other} />
			);
		}

		if(type == 'button'){
			return (
				<RaisedButton label={label} style={{minWidth:30}}  labelStyle={labelStyles} {...other} />
			);
		}

		if(type == 'operation'){
			return (
				<span {...other} style={{color:'#328ECC',marginLeft:'5px',cursor:'pointer'}}>{label}</span>
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






