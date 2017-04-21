import React from 'react';
import {
	observer,
	inject
} from 'mobx-react';

module.exports =  function (initializeConfigs){


	return function(WrapComponent) {


		class Form extends React.Component {

			static displayName = "Form";

			static propTypes = {
				$form:React.PropTypes.object.isRequired,
			}

			static childContextTypes = {
				getFieldValue: React.PropTypes.func.isRequired,
				getField: React.PropTypes.func.isRequired,
				getFieldError: React.PropTypes.func.isRequired,
				registerField: React.PropTypes.func.isRequired,
				unregisterField: React.PropTypes.func.isRequired,
				onChange: React.PropTypes.func.isRequired,
				onBlur: React.PropTypes.func.isRequired,
				onFocus: React.PropTypes.func.isRequired,
				isMobx: React.PropTypes.bool.isRequired,
			}

			getChildContext() {

				return {
					getFieldValue:this.getFieldValue,
					registerField:this.registerField,
					unregisterField:this.unregisterField,
					getFieldError:this.getFieldError,
					getField:this.getField,
					onChange:this.onChange,
					onBlur:this.onBlur,
					onFocus:this.onFocus,
					isMobx:true
				};
			}

			getField = (fieldName)=>{
				const {$form} = this.props;
				return $form.getField(fieldName);
			}


			getFieldError = (fieldName)=>{
				const {$form} = this.props;
				return $form.getFieldError(fieldName);
			}

			unregisterField = (fieldName)=>{
				const {$form} = this.props;
				$form.unregisterField(fieldName,type);
			}

			registerField = (fieldName,type)=>{
				const {$form} = this.props;
				$form.registerField(fieldName,type);
			}

			getFieldValue = (fieldName)=>{
				const {$form} = this.props;
				return $form.getFieldValue(fieldName);
			}

			constructor(props,context){
				super(props,context);
			}


			onChange =(fieldName,fieldValue)=>{
				const {$form} = this.props;
				$form.change(fieldName,fieldValue);
				this.validate();
			}

			validate = ()=>{
				const {$form} = this.props;
				$form.validate();
			}


			handleSubmit = (onSubmit)=>{

				const {$form} = this.props;

				$form.setSubmitCallback(onSubmit);

				return function(event){
					event.preventDefault();
					$form.submit();
				}

			}

			onFocus = (fieldName)=>{
				this.touch(fieldName);
			}

			touch = (fieldName)=>{
				const {$form} = this.props;
				$form.touch(fieldName);
			}

			onBlur = (fieldName)=>{
				this.touch(fieldName);
				this.validate();
			}


			render(){

				const {
					pristine,
					submitting,
					$form,
					...otherProps
				} = this.props;


				const props = {
					handleSubmit:this.handleSubmit,
					pristine,
					submitting,
					$form,
				};

				return <WrapComponent {...props}  {...otherProps}/>
			}

		}

		@inject("FormModel")
		@observer

		class FormConnect extends React.Component {

			constructor(props){
				super(props);
				this.$form = props.FormModel.getForm(initializeConfigs.form);
				this.$form.setValidateCallback(initializeConfigs.validate);
			}

			render(){

				const {...otherProps} = this.props;

				const $form = this.$form;

				const formProps = {
					values:$form.values,
					fields:$form.fields,
					registeredFields:$form.registeredFields,
					syncErrors:$form.syncErrors,
					$form,
				}

				return <Form {...formProps} {...otherProps}/>

			}

		}


		return FormConnect;

	}

}
