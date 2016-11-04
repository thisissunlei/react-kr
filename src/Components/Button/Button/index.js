import React, {
	Component
} from 'react';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import './index.less';

export default class Button extends Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		style: React.PropTypes.object,
		type: React.PropTypes.string,
		label: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		backgroundColor: React.PropTypes.string,
		labelColor: React.PropTypes.string,
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
			...other
		} = this.props;

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
				<div className="ui-button">
					<RaisedButton backgroundColor={backgroundColor || "#499df1"} labelColor={labelColor || "#fff"}  label={label} style={{minWidth:30}}  {...other} />
				</div>
			);
		}

		if (type == 'operation') {
			return (
				<div className="ui-button">
					<span {...other} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>{label}</span>
				</div>

			);
		}

		if (type == 'submit') {

			return (
				<div className="ui-button">
					<RaisedButton backgroundColor={backgroundColor || "#499df1"} labelColor={labelColor || "#fff"} label={label} style={{minWidth:30}}  type="submit"  {...other}/>
				</div>
			);
		}



		return (
			<div className="ui-button">
					<RaisedButton backgroundColor="#499df1" label={label} style={{minWidth:30}}  labelColor="#fff" {...other}/>
			</div>

		);
	}
}