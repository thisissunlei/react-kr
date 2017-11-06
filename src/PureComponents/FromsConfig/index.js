import React, { Component, PropTypes } from 'react';
import {
	Field,
	FieldArray,
	reduxForm,
	initialize
} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Message,
	DrawerBtn,
	DrawerTitle,
	TabelEdit,
	FRow,
} from 'kr-ui';
import {Http} from "kr/Utils";
import {
	componentType,
	btnType,
	detailCheck,
	mainCheck
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

	let errors = {};
	inspectionData.map((item, index) => {
		if (item.isMain) {
			errors = Object.assign(errors, mainCheck(item.fields, values));
		}else {
			detailCheck(item, values);
		}
	})
	return errors
}
export default reduxForm({
	form: 'FromsConfig',
	validate
})(FromsConfig);
