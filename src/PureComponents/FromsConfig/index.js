import React, { Component, PropTypes } from 'react';
import {
	Field,
	FieldArray,
	reduxForm,
	initialize
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
	DrawerTitle,
	TabelEdit,
	FRow,
} from 'kr-ui';
import {Http} from "kr/Utils";
import {
	componentType,
	btnType
} from './config';
import './index.less';
var inspectionData = [];//检验数据
class FromsConfig extends Component {
	constructor(props, context) {
		super(props, context);
		let {detail} =props;
		inspectionData = [].concat(detail);
		
	}
	onCancel = () =>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	//提交代码
	onSubmit = (values) =>{
		let params = Object.assign({},values);
		const {onSubmit} = this.props;
		onSubmit && onSubmit(params)
	}
	//渲染所有表单
	renderFields = () => {
		let {detail} = this.props;
			detail = detail||[];
		var fields = detail.map((item,index)=>{
			if(item.isMain){
				return this.mainRender(item.fields,item.lineNum);
			}else{
				return this.detailRender(item);
				// return '';
			}	
		})
		return fields;
	}	
	//主表渲染
	mainRender = (fields,lineNum) =>{
		var num = fields.lineNum||[];
		var mainFied = fields.map((item,index)=>{
			var type = componentType[item.compType];
			switch (type)
			{
				case 'radio':
					return this.radioRender(item,type,lineNum);
					break;
				case 'BUTTON_BROWES':
					return this.btnFieldRender(item,lineNum);
					break;
				default:
					return this.universalRender(item,type,lineNum);
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
		var grid = 1/lineNum;
		if (item.wholeLine){
			grid = 1
		}
		if(item.display){
			return (
				<KrField
					name={item.name}
					requireLabel={item.required}
					inline={false}
					label={item.label}
					grid={grid}
					isStore={true}
					component={type}
				/>
			)
		}else {
			return ;
		}
	}
	//浏览按钮渲染
	btnFieldRender = (item,lineNum) =>{
		var setting = item.setting;
		var type = btnType[setting.wsradio];
		this.universalRender(item,type,lineNum);
	}	
	//明细表选人
	detailRender = (item) =>{
		
		var details = []
		item.fields.map((item)=>{
			if (item.display){
				details.push(
					<FRow name={item.name} type={componentType[item.compType]} label={item.label} />
				)
			}
		})
		return(
			<TabelEdit
				name={item.tableName}
				toolbar={true}
				checkbox={true}
			>
				{details}
			</TabelEdit>
		)
		
	}
	componentDidMount () {
		let {detail} = this.props;
		inspectionData = detail;

	}
	
	
	render(){
		const {handleSubmit} = this.props;

		return (
			
			<form className="m-newMerchants" style={{paddingLeft:9}} onSubmit={handleSubmit(this.onSubmit)}>
				<DrawerTitle title = "注册地址编辑" onCancel = {this.onCancel}/>
				<div style = {{marginTop:30}}>
					{this.renderFields()}
				</div>
				<DrawerBtn onSubmit = {this.onSubmit} onCancel = {this.onCancel}/>	
			</form>
		);
	}
}
const validate = values => {

	const errors = {};
	inspectionData.map((item, index) => {
		if (item.isMain) {
			mainCheck(item.fields);
		}
	})
	return errors
}
function mainCheck(params,values) {
	var obj = {};
	params.map((item,index)=>{
		let setting = item.setting;
		let name = values[item.name];
		switch (item.compType) {
			case 'TEXT_TEXT':
				return textCheck(item, name);
				break;
			case 'TEXT_INTEGER':
				return integerCheck(item, name);
				break;
			case 'TEXT_FLOAT':
				return floatCheck(item, name);
				break;
			case 'TEXT_MONEY_TRANSFER':
				return transferCheck(item, name);
				break;
			case 'TEXT_MONEY_QUARTILE':
				return quartileCheck(item, name);
				break;
			default:
				return otherCheck(item, name);
		}
		
	})
}
//文本类型
function textCheck(params,name) {
	let text = '';
	if (params.required){
		if(!name && name!==0){
			text = `${params.label}必填`
			return text;
		}
	}
	if (name && name > params.setting.wstext) {
		text = `${params.label}最长为${params.setting.wstext}`
		return text;
	}
	
}
//整型
function integerCheck(params,name) {
	let num=/^-?\\d+$/;
	let text = '';
	if (params.required){
		if(!name && name!==0){
			text = `${params.label}必填`
			return text;
		}
	}
	if (name && !num.test(name)) {
		text = '请填写整数'
		return text;
	}
}
//浮点数
function floatCheck(params,name) {
	let text = '';
	if (params.required){
		if(!name && name!==0){
			text = `${params.label}必填`
			return text;
		}
	}
	if (name && (name.toString().split(".")[1].length)!=params.setting.wsfloat) {
		text = `${params.label}小数位数为${params.setting.wsfloat}`
		return text;
	}
}

//金额转换
function transferCheck(params,name) {
	let text = '';
	if (params.required){
		if(!name && name!==0){
			text = `${params.label}必填`
			return text;
		}
	}
	if (name && (name.toString().split(".")[1].length)!=params.setting.wsfloat) {
		text = `${params.label}小数位数为${params.setting.wsfloat}`
		return text;
	}
}

//金额千分位
function quartileCheck(params,name) {
	let text = '';
	if (params.required){
		if(!name && name!==0){
			text = `${params.label}必填`
			return text;
		}
	}
	if (name && (name.toString().split(".")[1].length)!=params.setting.wsfloat) {
		text = `${params.label}小数位数为${params.setting.wsfloat}`
		return text;
	}
}

//其他情况
function otherCheck(params,name) {
	let text = '';
	if (params.required) {
		if (!name && name !== 0) {
			text = `${params.label}必填`
			return text;
		}
	}	
}

export default reduxForm({
	form: 'FromsConfig',
	validate
})(FromsConfig);
