import React from 'react';
import {Field} from 'redux-form';
import MobxForm from 'kr/Utils/MobxForm';

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
import SearchBelongCityComponent from './SearchBelongCityComponent';
import SearchCustomerSourceComponent from './SearchCustomerSourceComponent';
import SearchSourceAddComponent from './SearchSourceAddComponent';
import SearchSignBillTypeComponent from './SearchSignBillTypeComponent';
import SearchSignCompanyName from './SearchSignCompanyName';

import SearchBelongCommunity from './SearchBelongCommunity';
import SearchCompanyName from "./SearchCompanyName";
import LabelTextComponent from './LabelTextComponent';
import GroupComponent from './GroupComponent';
import CityComponent from './CityComponent';
import TreeComponent from './TreeComponent';
import SearchCompanyComponent from './SearchCompanyComponent';
import EditLabelTextComponent from './EditLabelTextComponent';
import GroupCheckboxComponent from './GroupCheckboxComponent';
import DoorCardComponent from './DoorCardComponent';
import UploadImageComponent from './UploadImageComponent';

import NewUploadImageComponent from './NewUploadImageComponent';

import MapComponentNew from './MapComponentNew';

import EditorComponent from './EditorComponent';

import UploadImageListComponent from './UploadImageListComponent';
import SelectTimeComponent from './SelectTimeComponent';
import SearchCorporation from './SearchCorporation';
import SearchCommunitys from './SearchCommunitys';
import SearchCommunityList from './SearchCommunityList';
import searchCommunityManage from './SearchCommunity';
import SearchCustomer from './SearchCustomer';
import SearchMainbill from './SearchMainbill';
import SearchPayment from './SearchPayment';
import SearchPayAccount from './SearchPayAccount';

import SearchOrderCommunity from './SearchOrderCommunity';
import ActivityCommunityList from './ActivityCommunityList';


class FieldRevert extends React.Component {

		static propTypes = {
			mobx:React.PropTypes.bool,
		}

		static contextTypes =  {
			isMobx: React.PropTypes.bool,
		}

		constructor(props,context){
			super(props,context);
		}

		render(){

			const {isMobx} = this.context;

			if(isMobx){
				return <MobxForm.Field {...this.props} />;
			}

			return <Field  {...this.props} />;

		}
	}

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
			inline: React.PropTypes.bool,
			search: React.PropTypes.bool,
			left: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
			right: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
			colorStyle: React.PropTypes.object,
		}


		constructor(props,context){
			super(props,context);

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
					<FieldRevert {...this.props} component={InputComponent}  style={WrapStyles}/>
				);
			}

			if (component === 'labelText' || type == 'labelText') {
				return (
					<LabelTextComponent {...this.props} style={WrapStyles} colorStyle={colorStyle}/>
				);
			}

			if (component === 'editor') {
				return (
					<FieldRevert {...this.props} component={EditorComponent}  style={WrapStyles}/>
				);
			}

			if (component === 'groupCheckbox') {
				return (
					<FieldRevert {...this.props} component={GroupCheckboxComponent}  style={WrapStyles}/>
				);
			}


			if (component === 'editLabelText' || type == 'editLabelText') {
				return (
					<EditLabelTextComponent {...this.props} style={WrapStyles} colorStyle={colorStyle}/>
				);
			}


			if (component === 'file') {
				return (
					<FieldRevert {...this.props} component={FileUploadComponent}  style={WrapStyles} {...other}/>
				);
			}

			if (component === 'doorCard') {
				return (
					<FieldRevert {...this.props} component={DoorCardComponent}  style={WrapStyles} {...other}/>
				);
			}
			if (component === 'activity') {
				return (
					<FieldRevert {...this.props} component={ActivityCommunityList}  style={WrapStyles} {...other}/>
				);
			}
			if (component === 'uploadImage') {
				return (
					<FieldRevert {...this.props} component={UploadImageComponent}  style={WrapStyles} {...other}/>
				);
			}
			if (component === 'newuploadImage') {
				return (
					<FieldRevert {...this.props} component={NewUploadImageComponent}  style={WrapStyles} {...other}/>
				);
			}


			if (component === 'uploadImageList') {
				return (
					<FieldRevert {...this.props} component={UploadImageListComponent}  style={WrapStyles} {...other}/>
				);
			}

			if (component === 'searchPayment') {
				return (
					<FieldRevert {...this.props} component={SearchPayment}  style={WrapStyles} {...other}/>
				)
			}
			if (component === 'searchCustomer') {
				return (
					<FieldRevert {...this.props} component={SearchCustomer}  style={WrapStyles} {...other}/>
				)
			}
			if (component === 'searchMainbill') {
				return (
					<FieldRevert {...this.props} component={SearchMainbill}  style={WrapStyles} {...other}/>
				)
			}
			if (component === 'searchCommunitys') {
				return (
					<FieldRevert {...this.props} component={SearchCommunitys}  style={WrapStyles} {...other}/>
				)
			}
			if (component === 'searchCommunityList') {
				return (
					<FieldRevert {...this.props} component={SearchCommunityList}  style={WrapStyles} {...other}/>
				)
			}
			if (component === 'searchCorporation') {
				return (
					<FieldRevert {...this.props} component={SearchCorporation}  style={WrapStyles} {...other}/>
				)
			}


			if (component === 'searchPersonel') {
				return (
					<FieldRevert {...this.props} component={SearchPersonelComponent}  style={WrapStyles} {...other}/>
				);
			}

			if (component === 'selectTime') {
				return (
					<FieldRevert {...this.props} component={SelectTimeComponent}  style={WrapStyles} {...other}/>
				);
			}

			if (component === 'SearchList') {
				return (
					<FieldRevert {...this.props} component={SearchListComponent}  style={WrapStyles} {...other}/>
				);
			}

			if (component === 'searchCommunity') {
				return (

					<FieldRevert {...this.props} component={SearchBelongCommunity}  style={WrapStyles} {...other}/>
				);
			}



			if (component === 'searchCommunityManage') {
				return (
					<Field {...this.props} component={searchCommunityManage}  style={WrapStyles} {...other}/>
				)
			}


			if (component === 'searchLeader') {

				return (

					<FieldRevert {...this.props} component={SearchLeaderComponent}  style={WrapStyles} {...other}/>
				);
			}

			if (component === 'searchIntend') {
				return (

					<FieldRevert {...this.props} component={SearchIntendCommunity}  style={WrapStyles} {...other}/>
				);
			}

			if (component === 'searchSign') {
				return (
					<FieldRevert {...this.props} component={SearchSignCommunity}  style={WrapStyles} {...other}/>
	 		 );
	 	 }

       if (component === 'searchSignBill') {
			return (

				<Field {...this.props} component={SearchSignBillTypeComponent}  style={WrapStyles} {...other}/>
			);
		}

         if (component === 'searchSignCompany') {
			return (

				<Field {...this.props} component={SearchSignCompanyName}  style={WrapStyles} {...other}/>
			);
		}

			if (component === 'searchOrder') {
			 return (

				 <Field {...this.props} component={SearchOrderCommunity}  style={WrapStyles} {...other}/>
			 );
			}







			if (component === 'searchCompany') {
				return (
					<FieldRevert {...this.props} component={SearchCompanyComponent}  style={WrapStyles} {...other}/>
				);
			}

			if (component === 'searchCity') {
				return (
					<FieldRevert {...this.props} component={SearchBelongCityComponent}  style={WrapStyles} {...other}/>
				);
			}

			if (component === 'searchSource') {
				return (
					<FieldRevert {...this.props} component={SearchCustomerSourceComponent}  style={WrapStyles} {...other}/>
				);
			}

			if (component === 'searchSourceAdd') {
				return (
					<FieldRevert {...this.props} component={SearchSourceAddComponent}  style={WrapStyles} {...other}/>
				);
			}

			if (component === 'companyName') {
				return (
					<FieldRevert {...this.props} component={SearchCompanyName}  style={WrapStyles} {...other}/>
				);
			}

			if (component === 'search') {
				return (
					<FieldRevert {...this.props} component={SearchPersonelComponent}  style={WrapStyles} {...other}/>
				);
			}


			if (component === 'city' || type == 'city') {
				return (
					<FieldRevert {...this.props} component={CityComponent} style={WrapStyles}/>
				);
			}

			if (component === 'tree' || type == 'tree') {

				return (
					<FieldRevert  {...this.props} component={TreeComponent}  style={WrapStyles}/>
				);
			}

			if (component === 'textarea') {
				return (
					<FieldRevert {...this.props} component={TextareaComponent} style={WrapStyles} heightStyle={heightStyle} lengthClass={lengthClass}/>
				);
			}

			if (component === 'select' || type == 'select') {
				return (
					<FieldRevert {...this.props} component={SelectComponent} style={WrapStyles}>
						{children}
					</FieldRevert>
				);
			}

			if (component === 'radio' || type == 'radio') {
				return (
					<FieldRevert {...this.props} component={RadioComponent}  style={WrapStyles}/>
				);
			}

			if (component === 'date' || type == 'date') {
				return (
					<FieldRevert {...this.props} component={DateComponent}  style={WrapStyles}/>
				);
			}

			if (component === 'group' || type == 'group') {
				return (
					<GroupComponent {...this.props} style={WrapStyles}/>
				);
			}

			if (component === 'mapnew' ) {
				return (
					<FieldRevert  {...this.props} component={MapComponentNew} style={WrapStyles}/>
				);
			}

			if (!component || component === 'input') {
				return (
					<FieldRevert {...this.props} component={InputComponent}  style={WrapStyles}/>
				);
			}

			return (
				<FieldRevert {...this.props} component={InputComponent}  style={WrapStyles}/>
			);

		}
	}