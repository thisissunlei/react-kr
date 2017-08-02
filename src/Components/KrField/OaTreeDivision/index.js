import React from 'react';

import WrapComponent from '../WrapComponent';
import Input from '../../Input';
import Message from '../../Message'
import {stopSubmit,submit,blur,stopAsyncValidation,touch} from 'redux-form';

import './index.less';
import Dialog from '../../Dialog'
// import mockData from './Data.json';
import DivisionDialog from './DivisionDialog/index';

export default class OaTreeDivision extends React.Component{

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
			data:[{
				orgName:"请选择"
			}],
			oneOpen:true,
			other:'',
		}
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
		if( data[0].orgName == "" ){
			
				Message.error("请选择分部");
			
			
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

        let echoList = null;
		let textData = [];
		if(oneOpen && valueText && valueText[0].orgName){
			textData = [].concat(valueText); 
			 
		}else{
			textData = [].concat(data);
		}
		echoList = [].concat(textData);
		var text = '';
		for(let i=0 ;i<textData.length;i++){
			if(i==0){
				text+= textData[i].orgName;

			}else{
				text+= ","+textData[i].orgName;
			}
		}
		let inputstyle = {};
		if(other.checkable){
			inputstyle = {
				overflow: "hidden",
				textOverflow:"ellipsis",
				whiteSpace: "nowrap",
			}
		}

		 return (
			 <WrapComponent {...wrapProps}>
				 
				 <Input onClick = {this.onFocus} {...inputProps} style = {{display:"none"}}/>
				 <div className = "oa-imulation-input " style = {inputstyle} onClick = {this.onFocus}>{text}</div>
				 {touched && error && <div className="error-wrap"> <span>{error}</span> </div> }
				 <div className = "select-tree">

				 <Dialog
					title={dialogTitle}
					onClose={this.dlogSwidch}
					open={isDialog}
					noMaxHeight = {true}
					contentStyle ={{ width: '653px',height:'580px',position:'fixed',left: "50%",marginLeft:'-345px'}}
				 >
					<DivisionDialog {...other} 
					treeType = {this.props.treeType}
					echoList = {echoList}
					ajaxUrlName = {ajaxUrlName} 
					onSelect = {this.onSelect} 
					onSubmit = {this.onSubmit} 
					onCancel = {this.onCancel}
					/>
				</Dialog>
				</div>
			 </WrapComponent>
		 );
	 }
 }
