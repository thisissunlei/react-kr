import React from 'react';
import { Field, reduxForm } from 'redux-form';

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

import './index.less';


export default class KrField extends React.Component {

	PropTypes = {
		type: React.PropTypes.string,
		name: React.PropTypes.string,
		label: React.PropTypes.string,
		component: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		grid:React.PropTypes.number,
		value:React.PropTypes.value
	}

	render() {

		let {grid=1,className,children,component,type,requireLabel,label,value,...other} = this.props;

		let WrapStyles = {
			width:(grid*100)+'%'
		}

		if(component ==='input' || component === 'text'){
			return (
				<Field {...this.props} component={InputComponent}  style={WrapStyles}/>
			);
		}

		if(component ==='file'){
			return (
				<Field {...this.props} component={FileUploadComponent}  style={WrapStyles}/>
			);
		}

		if(component ==='searchPersonel'){
			return (
				<Field {...this.props} component={SearchPersonelComponent}  style={WrapStyles} {...other}/>
			);
		}

		if(component ==='search'){
			return (
				<Field {...this.props} component={SearchPersonelComponent}  style={WrapStyles} {...other}/>
			);
		}

		if(component === 'labelText' || type=='labelText'){

			return (
				<LabelTextComponent {...this.props} style={WrapStyles}/>
			);
		}

		if(component === 'textarea'){
			return (
				<Field {...this.props} component={TextareaComponent} style={WrapStyles}/>
			);
		}

		if(component === 'select' || type=='select'){
			return (
				<Field {...this.props} component={SelectComponent} style={WrapStyles}>
				{children}
				</Field>
			);
		}



		if(component === 'radio' || type=='radio'){
			return (
				<Field {...this.props} component={RadioComponent}  style={WrapStyles}/>
			);
		}

		if(component === 'date' || type=='date'){

			return (
				<Field {...this.props} component={DateComponent}  style={WrapStyles}/>
			);

		}

		if(component === 'group' || type=='group'){
			return (
				<GroupComponent {...this.props}/>
			);
		}

		if(!component || component === 'input'){
			return (
				<Field {...this.props} component={InputComponent}  style={WrapStyles}/>
			);
		}

		return (
			<Field {...this.props} component={InputComponent}  style={WrapStyles}/>
		);

	}
}



