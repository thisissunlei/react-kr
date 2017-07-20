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
		console.log("adasd","PPPPPPP")
		this.setState({
			isDialog:true,
		})
		
	}
	//
	dlogSwidch = () =>{
		this.setState({
			isDialog:false,
		})
	}
	onSelect = (data) =>{
		console.log(data,"KKKKKKKK");
		this.dlogSwidch();
	}

	render(){
		const {isDialog} = this.state;
		let {input,prompt, label,notifys, type, meta: { touched, error } ,requireLabel,onChange,onBlur,onFocus,disabled,placeholder,style,inline,simple,heightStyle,autoFocus,...other} = this.props;

			if(type === 'hidden'){
				return (
					<div>
						<Input {...input} type="hidden"/>
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
				 <div>tree</div>
				 <Input  onClick = {this.onFocus} {...inputProps}/>
				 {touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				 <Dialog
					title="删除职务"
					onClose={this.dlogSwidch}
					open={isDialog}
					
					contentStyle ={{ width: '444px'}}
				 >
					<TreeDialog onSelect = {this.onSelect}/>
				</Dialog>
			 </WrapComponent>
		 );
	 }
 }
