import React, { Component, PropTypes } from 'react';
import {
	Field,
	FieldArray,
	reduxForm
} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	KrField,
	Row,
	Col,
	Button,
	Notify,
	IframeContent,
	KrDate,
	DotTitle,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	Paper,
	CircleStyle,
	Tooltip,
	Message,
	Grid,
	DrawerBtn,
	DrawerTitle

} from 'kr-ui';
import {Http} from "kr/Utils";
import {
	componentType,
	btnType
} from './config'
class FromsConfig extends Component {
	constructor(props, context) {
		super(props, context);
		this.state={
			
		}
	}
	onCancel = () =>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	onSubmit = (values) =>{
		let params = Object.assign({},values);
		const {onSubmit} = this.props;
		onSubmit && onSubmit(params)
	}
	//渲染所有表单
	renderFields = () => {
		let {detail} = this.props;
	
		var fields = detail.map((item,index)=>{
			if(item.isMain){
				return this.mainRender(item.fields,item.lineNum);
			}else{
				return this.detailRender(item.fields,item.lineNum);
			}	
		})
		return fields;
	}	


	//主表渲染
	mainRender = (fields,lineNum) =>{
		var num = fields.lineNum
		var mainFied = fields.map((item,index)=>{
			var type = componentType[item.compType];
			
			switch (type)
			{
				case 'radio':
					this.radioRender(item,type,lineNum);
					break;
				case 'BUTTON_BROWES':
					this.btnFieldRender(item,lineNum);
					break;
				default:
					this.universalRender(item,type,lineNum);
			}
			
		})
		return mainFied;
	}
	
	//单选按钮
	radioRender = (item,type,lineNum) =>{
		return (
			<KrField grid={1/lineNum} label={item.label} name={item.name} component="group">
				<KrField name={item.name} label="是" type={type} value="YES" />
				<KrField name={item.name} label="否" type={type} value="NO" />
			</KrField>
		)
	}
	//一般的表单渲染
	universalRender = (item,type,lineNum) =>{
		return (
			<KrField 
				name = {item.name}
				requireLabel = {item.required}
				inline={false}
				label={item.label}
				grid={1/lineNum}
				component={type}
			/>
		)
	}
	//浏览按钮渲染
	btnFieldRender = (item,lineNum) =>{
		var setting = item.setting;
		var type = btnType(setting.wsradio);
		this.universalRender(item,type,lineNum);
	}	
	//明细表选人
	detailRender = () =>{
		
	}

	
	render(){
		const {handleSubmit} = this.props;

		return (
			
			<form className="m-newMerchants" style={{paddingLeft:9}} onSubmit={handleSubmit(this.onSubmit)}>
				<DrawerTitle title = "注册地址编辑" onCancel = {this.onCancel}/>
				
				{/* <FieldArray name="fromsConfig" component={this.renderFields} text="123"/> */}
				{this.renderFields()}
				
				<DrawerBtn onSubmit = {this.onSubmit} onCancel = {this.onCancel}/>	
			</form>
		);
	}
}
export default reduxForm({
	form: 'FromsConfig'
})(FromsConfig);
