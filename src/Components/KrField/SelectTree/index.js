import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../Input';
import Message from '../../Message'
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
			},
			oneOpen:true,
			other:'',
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
		let {treeType} = this.props;
		if( data.orgName == "" ){
			if(treeType == "department"){
				Message.error("请选择部门");
			}else{
				Message.error("请选择直接上级");
			}
			
			
			return ;
		}
		let {input,onChange} = this.props;
		input.onChange(data);
		this.dlogSwidch();
		this.setState({
			data,
			oneOpen:false,
		})
		onChange && onChange(data);
		

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
	 componentWillReceiveProps (nextProps) {
        if (nextProps.valueText) {
           this.setState({
			   other:new Date()
		   })
        }
    }

	render(){

		const {isDialog,data,oneOpen} = this.state;

		const {ajaxUrlName,valueText} = this.props;

		let {
            input,
            prompt,
            label,
            notifys, 
            type, 
            meta: { touched, error } ,
            requireLabel,
            onChange,
            onBlur,
            onFocus,
            disabled,
            placeholder,
            style,
            inline,
            simple,
            heightStyle,
            autoFocus,
			params,
            ...other
        } = this.props;

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

        var dialogTitle = label || '组件';

        dialogTitle = "选择" + dialogTitle;

		console.log(this.props.params,"222222-----")
		 return (
			 <WrapComponent {...wrapProps}>
				 
				 <Input value = { data && data.orgName} onClick = {this.onFocus} {...inputProps} style = {{display:"none"}}/>
				 <div className = "oa-imulation-input " onClick = {this.onFocus}>{(oneOpen && valueText)? valueText : data.orgName  }</div>
				 {touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				 <div className = "select-tree">

				 <Dialog
					title={dialogTitle}
					onClose={this.dlogSwidch}
					open={isDialog}
					contentStyle ={{ width: '690px',height:'590px',position:'fixed',left: "50%",marginLeft:'-345px'}}
				 >
					<TreeDialog  params = {params}  treeType = {this.props.treeType} ajaxUrlName = {ajaxUrlName} onSelect = {this.onSelect} onSubmit = {this.onSubmit} onCancel = {this.onCancel}/>
				</Dialog>
				</div>
			 </WrapComponent>
		 );
	 }
 }
