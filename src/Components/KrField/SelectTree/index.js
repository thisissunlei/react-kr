import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../Input';

import {stopSubmit,submit,blur,stopAsyncValidation,touch} from 'redux-form';

import './index.less';
import Dialog from '../../Dialog'
import mockData from './Data.json';
import TreeDialog from './TreeDialog/index';
export default class SelectTree extends React.Component{

	static propTypes = {
		inline:React.PropTypes.bool,
		simple:React.PropTypes.bool,
		heightStyle:React.PropTypes.object,
		maxLength:React.PropTypes.number,
		autoFocus:React.PropTypes.bool,
	}

	constructor(props,context){
		super(props,context)
		this.state = {
			isDialog:false,
			data:{
				orgName:"请选择"
			}
		}
	}

	onChange = (value)=>{

		// let {input} = this.props;
		// input.onChange(value);
		// const {onChange} = this.props;
		// onChange && onChange(value,input)
	}

	onBlur=(value)=>{
		// let {input} = this.props;
		// input.onBlur(value);
		// const {onBlur} = this.props;
		// onBlur && onBlur(value)
	}

	onFocus=(value)=>{
		
		this.setState({
			isDialog:true,
		})
		
	}
	onCancel = () =>{
		this.dlogSwidch();
	}
	onSubmit = (data) =>{
		console.log(this.state.data,">>>>>>");
		if( data.orgName == "" ){
			return ;
		}
		let {input} = this.props;
		input.onChange(data);
		this.dlogSwidch();
		this.setState({
			data
		})
	}

	dlogSwidch = () =>{
		this.setState({
			isDialog:false,
		})
	}
	onSelect = (data) =>{
		
		let {input,onChange} = this.props;
		// var value = (item && item.value) || '';
		// input.onChange({});
		
		// onChange && onChange(item);
		
	}

	render(){
		const {isDialog,data} = this.state;
		let {input,prompt, label,notifys, type, meta: { touched, error } ,requireLabel,onChange,onBlur,onFocus,disabled,placeholder,style,inline,simple,heightStyle,autoFocus,...other} = this.props;

			if(type === 'hidden'){
				return (
					<div>
						<Input {...input}  type="hidden"/>
					</div>
				);
			}
			let placeholderText=placeholder||label;
			let className = '';

			if(touched && error){
				className = 'error-input';
			}
			if(prompt){
				placeholderText="";
			}

			var wrapProps = {
				label,
				requireLabel,
				inline,
				simple,
				notifys,
				wrapStyle:style,
			};

			var inputProps = {
				 ...input,
				 type,
				placeholder:placeholderText,
				disabled,
			 className,
			 style:heightStyle,
			 onChange:this.onChange,
			//  onBlur:this.onBlur,
			//  onFocus:this.onFocus,
			 ...other,
			 autoFocus,
		 }

		 return (
			 <WrapComponent {...wrapProps}>
				 
				 <Input value = { data && data.orgName} onClick = {this.onFocus} {...inputProps} style = {{display:"none"}}/>
				 <div className = "oa-imulation-input " onClick = {this.onFocus}>{data && data.orgName}</div>
				 {touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				 <div className = "select-tree">

				 
				 <Dialog
					title="人员"
					onClose={this.dlogSwidch}
					open={isDialog}
					contentStyle ={{ width: '690px',height:'590px'}}
				 >
					<TreeDialog onSelect = {this.onSelect} onSubmit = {this.onSubmit} onCancel = {this.onCancel}/>
				</Dialog>
				</div>
			 </WrapComponent>
		 );
	 }
 }
