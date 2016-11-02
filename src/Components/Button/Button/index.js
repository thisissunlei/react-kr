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
			...other
		} = this.props;


		if (type == 'link') {

			if (disabled) {
				delete other.href;
			}

			return (
				<div className="ui-button">
					<FlatButton label={label} primary={true} style={{minWidth:30}} backgroundColor={backgroundColor} {...other}  />
				</div>
			);
		}

		if (type == 'button') {

			return (
				<div className="ui-button">
					<RaisedButton label={label} style={{minWidth:30}} backgroundColor={backgroundColor} {...other} />
				</div>
			);
		}

		if (type == 'operation') {
			return (
				<div className="ui-button">
					<span {...other} style={{color:'#328ECC',marginLeft:'5px',cursor:'pointer'}}>{label}</span>
				</div>

			);
		}

		if (type == 'submit') {

			return (
				<div className="ui-button">
					<RaisedButton label={label} style={{minWidth:30}} backgroundColor={backgroundColor} type="submit"  {...other}/>
				</div>
			);
		}



		return (
			<div className="ui-button">
					<RaisedButton label={label} style={{minWidth:30}} backgroundColor={backgroundColor} {...other}/>
			</div>

		);
	}
}