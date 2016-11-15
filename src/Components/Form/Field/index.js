import React from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';

import Notify from '../../Notify';


import Promise from 'promise-polyfill';

import ReactSelect from 'react-select';
import 'react-select/dist/react-select.css';

import InputComponent from './InputComponent';
import DateComponent from './DateComponent';
import RadioComponent from './RadioComponent';
import SelectComponent from './SelectComponent';
import TextareaComponent from './TextareaComponent';
import FileUploadComponent from './FileUploadComponent';
import SearchPersonelComponent from './SearchPersonelComponent';
import LabelTextComponent from './LabelTextComponent';
import GroupComponent from './GroupComponent';


export default class KrField extends React.Component {

	static defaultProps = {
		left: 0,
		right: 0,
		colorStyle:'true'
	}

	static PropTypes = {
		type: React.PropTypes.string,
		name: React.PropTypes.string,
		label: React.PropTypes.string,
		component: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		grid: React.PropTypes.number,
		value: React.PropTypes.string,
		inline: React.PropTypes.bool,
		search: React.PropTypes.bool,
		left: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		right: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
	    //colorStyle:React.PropTypes.string,
	}

	render() {

		let {
			style,
			left,
			right,
			grid = 1,
			className,
			children,
			inline,
			component,
			type,
			requireLabel,
			label,
			value,
			search,
			//colorStyle,
			...other
		} = this.props;


		let WrapStyles = Object.assign({}, {
			width: (grid * 100) + '%',
			paddingLeft: left,
			paddingRight: right
		}, style);

		if (component === 'input' || component === 'text') {
			return (
				<Field {...this.props} component={InputComponent}  style={WrapStyles}/>
			);
		}

		if (component === 'file') {
			return (
				<Field {...this.props} component={FileUploadComponent}  style={WrapStyles} {...other}/>
			);
		}

		if (component === 'searchPersonel') {
			return (
				<Field {...this.props} component={SearchPersonelComponent}  style={WrapStyles} {...other}/>
			);
		}

		if (component === 'search') {
			return (
				<Field {...this.props} component={SearchPersonelComponent}  style={WrapStyles} {...other}/>
			);
		}

		if (component === 'labelText' || type == 'labelText') {
			return (
				<LabelTextComponent {...this.props} style={WrapStyles} />
			);
		}

		if (component === 'textarea') {
			return (
				<Field {...this.props} component={TextareaComponent} style={WrapStyles}/>
			);
		}

		if (component === 'select' || type == 'select') {
			return (
				<Field {...this.props} component={SelectComponent} style={WrapStyles}>
				{children}
				</Field>
			);
		}

		if (component === 'radio' || type == 'radio') {
			return (
				<Field {...this.props} component={RadioComponent}  style={WrapStyles}/>
			);
		}

		if (component === 'date' || type == 'date') {
			return (
				<Field {...this.props} component={DateComponent}  style={WrapStyles}/>
			);
		}

		if (component === 'group' || type == 'group') {
			return (
				<GroupComponent {...this.props} style={WrapStyles}/>
			);
		}

		if (!component || component === 'input') {
			return (
				<Field {...this.props} component={InputComponent}  style={WrapStyles}/>
			);
		}

		return (
			<Field {...this.props} component={InputComponent}  style={WrapStyles}/>
		);

	}
}