import React from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';

import Notify from '../Notify';


import Promise from 'promise-polyfill';

import InputComponent from './InputComponent';
import DateComponent from './DateComponent';
import RadioComponent from './RadioComponent';
import SelectComponent from './SelectComponent';
import TextareaComponent from './TextareaComponent';
import FileUploadComponent from './FileUploadComponent';
import SearchPersonelComponent from './SearchPersonelComponent';
import SearchListComponent from './SearchListComponent';
import SearchLeaderComponent from './SearchLeaderComponent';
import SearchIntendCommunity from './SearchIntendCommunity';
import SearchSignCommunity from './SearchSignCommunity';

import SearchBelongCommunity from './SearchBelongCommunity';
import LabelTextComponent from './LabelTextComponent';
import GroupComponent from './GroupComponent';
import CityComponent from './CityComponent';
import TreeComponent from './TreeComponent';
import SearchCompanyComponent from './SearchCompanyComponent';
import EditLabelTextComponent from './EditLabelTextComponent';
import GroupCheckboxComponent from './GroupCheckboxComponent';
import DoorCardComponent from './DoorCardComponent';
import UploadImageComponent from './UploadImageComponent';

export default class KrField extends React.Component {

	static defaultProps = {
		left: 0,
		right: 0,
	}

	static propTypes = {
		type: React.PropTypes.string,
		name: React.PropTypes.string,
		label: React.PropTypes.string,
		component: React.PropTypes.string,
		disabled: React.PropTypes.bool,
		grid: React.PropTypes.number,
		// value: React.PropTypes.string,
		inline: React.PropTypes.bool,
		search: React.PropTypes.bool,
		left: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		right: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
	    colorStyle:React.PropTypes.object,
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
			colorStyle,
			heightStyle,
			lengthClass,
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

		if (component === 'labelText' || type == 'labelText') {
			return (
				<LabelTextComponent {...this.props} style={WrapStyles} colorStyle={colorStyle}/>
			);
		}

		if (component === 'groupCheckbox') {
			return (
					<Field {...this.props} component={GroupCheckboxComponent}  style={WrapStyles}/>
			);
		}


		if (component === 'editLabelText' || type == 'editLabelText') {
			return (
				<EditLabelTextComponent {...this.props} style={WrapStyles} colorStyle={colorStyle}/>
			);
		}


		if (component === 'file') {
			return (
				<Field {...this.props} component={FileUploadComponent}  style={WrapStyles} {...other}/>
			);
		}

		if (component === 'doorCard') {
			return (
				<Field {...this.props} component={DoorCardComponent}  style={WrapStyles} {...other}/>
			);
		}
		if (component === 'uploadImage') {
			return (
				<Field {...this.props} component={UploadImageComponent}  style={WrapStyles} {...other}/>
			);
		}

		if (component === 'searchPersonel') {
			return (
				<Field {...this.props} component={SearchPersonelComponent}  style={WrapStyles} {...other}/>
			);
		}
		if (component === 'SearchList') {
			return (
				<Field {...this.props} component={SearchListComponent}  style={WrapStyles} {...other}/>
			);
		}

		if (component === 'searchCommunity') {
			return (

				<Field {...this.props} component={SearchBelongCommunity}  style={WrapStyles} {...other}/>
			);
		}
       
       if (component === 'searchLeader') {
			return (

				<Field {...this.props} component={SearchLeaderComponent}  style={WrapStyles} {...other}/>
			);
		}

		if (component === 'searchIntend') {
			return (

				<Field {...this.props} component={SearchIntendCommunity}  style={WrapStyles} {...other}/>
			);
		}

		if (component === 'searchSign') {
			return (

				<Field {...this.props} component={SearchSignCommunity}  style={WrapStyles} {...other}/>
			);
		}



		if (component === 'searchCompany') {
			return (
				<Field {...this.props} component={SearchCompanyComponent}  style={WrapStyles} {...other}/>
			);
		}

		if (component === 'search') {
			return (
				<Field {...this.props} component={SearchPersonelComponent}  style={WrapStyles} {...other}/>
			);
		}


		if (component === 'city' || type == 'city') {
			return (
				<Field {...this.props} component={CityComponent} style={WrapStyles}/>
			);
		}

		if (component === 'tree' || type == 'tree') {

			return (
				<Field  {...this.props} component={TreeComponent}  style={WrapStyles}/>
			);
		}

		if (component === 'textarea') {
			return (
				<Field {...this.props} component={TextareaComponent} style={WrapStyles} heightStyle={heightStyle} lengthClass={lengthClass}/>
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
