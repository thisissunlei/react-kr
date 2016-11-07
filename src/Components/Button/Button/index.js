import React, {
	Component
} from 'react';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import './index.less';

export default class Button extends Component {
	static defaultProps = {
		cancle:false,
		width:80,
		height:30
	}

	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		style: React.PropTypes.object,
		type: React.PropTypes.string,
		label: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		backgroundColor: React.PropTypes.string,
		labelColor: React.PropTypes.string,
		cancle:React.PropTypes.bool,
		width:React.PropTypes.number,
		height:React.PropTypes.number,
	}


	constructor(props) {
		super(props);

	}


	render() {

		let {
			type,
			label,
			disabled,
			backgroundColor,
			labelColor,
			cancle,
			width,
			height,
			...other
		} = this.props;
		if(cancle){
			backgroundColor = '#fff';
			labelColor = '#499df1';
		}
		let defaultStyle = {
			minWidth:30,
			width:width || 80,
			height:height || 30,
			// boxShadow: "0 2px 3px #b4cde6",
			// border:'1px solid #499df1',
			// borderRadius:4,
		};
		let divStyle = {
			boxShadow: "0 2px 3px #b4cde6",
			border:'1px solid #499df1',
			borderRadius:4,
		}
		let labelStyle={
			padding:0,
		}


		if (type == 'link') {

			if (disabled) {
				delete other.href;
			}

			return (
				<div className="ui-button">
					<FlatButton backgroundColor={backgroundColor} labelColor={labelColor} label={label} primary={true} style={{minWidth:30}}  {...other}  />
				</div>
			);
		}

		if (type == 'button') {

			return (
				<div className="ui-button" style={divStyle}>
					<RaisedButton backgroundColor={backgroundColor || "#499df1"} labelStyle={labelStyle} labelColor={labelColor || "#fff"} style={defaultStyle} label={label}   {...other} />
				</div>
			);
		}

		if (type == 'operation') {
			return (
				<div className="ui-button" >
					<span {...other} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>{label}</span>
				</div>

			);
		}

		if (type == 'submit') {

			return (
				<div className="ui-button" style={divStyle}>
					<RaisedButton backgroundColor={backgroundColor || "#499df1"} labelStyle={labelStyle} labelColor={labelColor || "#fff"} label={label} style={defaultStyle}  type="submit"  {...other}/>
				</div>
			);
		}



		return (
			<div className="ui-button" >
					<RaisedButton backgroundColor="#499df1"  label={label} labelStyle={labelStyle} labelColor="#fff" style={defaultStyle}{...other}/>
			</div>

		);
	}
}