import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../Input';

import {stopSubmit,submit,blur,stopAsyncValidation,touch} from 'redux-form';

import './index.less';
import Dialog from '../../Dialog'

import SwitchDialog from './SwitchDialog/index';
import MultiSwitchDialog from './MultiSwitchDialog/index';
export default class SwitchSlide extends React.Component{

	static propTypes = {
		inline:React.PropTypes.bool,
		simple:React.PropTypes.bool,
		heightStyle:React.PropTypes.object,
		maxLength:React.PropTypes.number,
		autoFocus:React.PropTypes.bool,
		multiSwitch:React.PropTypes.bool,
	}

	constructor(props,context){

		super(props,context)

		this.state = {
			isDialog:false,
			data:{
				label:"请选择"
			},
			valueText:props.valueText,
		}

	}
   


    componentWillReceiveProps(nextProps){
		let {oneOpen}=this.state;
		let {label} = this.props;

        if(nextProps.valueText!==this.state.valueText){
			
		    this.setState({
				valueText:nextProps.valueText
			})
	    }
	}

	componentDidMount(){


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
		const multSwitch = this.props.multiSwitch;
		if(multiSwitch){
			if( !data || !data[0].label ){
				return ;
			}
			
			let {input} = this.props;
			input.onChange(data);
			var valueText = [];
			if(data.length){
				data.map((item,index)=>{
					valueText.push(item.label)
				})
			}
			valueText = valueText.join(",");
			console.log("valueText",valueText);
			this.setState({
				data,
				valueText:valueText || '请输入'
			})			
		}else{
			if( !data || !data.label ){
				return ;
			}
			
			let {input} = this.props;
			input.onChange(data);
			this.setState({
				data,
				valueText:data.label
			})
		}
		
		this.dlogSwidch();
	}

	dlogSwidch = () =>{
		this.setState({
			isDialog:false,
		})
	}
	render(){

		const {
            isDialog,
            listRender,
            data,
            oneOpen,
			valueText
        } = this.state;

		const {
            leftData,
            control,
			multiSwitch
        } = this.props;

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
			//联动清空
			isClear,
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
			
			 ...other,
			 autoFocus,
		 }


        var dialogTitle = label || '组件';
        dialogTitle = "选择" + dialogTitle;
		 return (
			 <WrapComponent {...wrapProps}>
				 
				 <Input value = { data && data.orgName} onClick = {this.onFocus} {...inputProps} style = {{display:"none"}}/>
					<div className = "oa-imulation-input "  onClick = {this.onFocus}>{valueText}</div>
				 {touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				 <div className = "select-tree">

				 
				 <Dialog
					title={dialogTitle}
					onClose={this.dlogSwidch}
					open={isDialog}
					noMaxHeight = {true}
					contentStyle ={{ width: '510px',height:'590px'}}
				 >
				 	{
						 multiSwitch
						 ? 
						 <MultiSwitchDialog  
							leftData = {leftData}
							control={control}
							onSelect = {this.onSelect} 
							onSubmit = {this.onSubmit} 
							onCancel = {this.onCancel}
						/>
						:
						<SwitchDialog  
							leftData = {leftData}
							control={control}
							onSelect = {this.onSelect} 
							onSubmit = {this.onSubmit} 
							onCancel = {this.onCancel}
						/>
					 }
					
				</Dialog>
				</div>
			 </WrapComponent>
		 );
	 }
 }
