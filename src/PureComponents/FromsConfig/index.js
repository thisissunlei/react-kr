import React, { Component, PropTypes } from 'react';
import {
	Field,
	FieldArray,
	reduxForm,
	initialize,
	change
} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Message,
	DrawerBtn,
	DrawerTitle,
	TabelEdit,
	FRow,
	Notify
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
var isOk=false;
class FromsConfig extends Component {
	constructor(props, context) {
		super(props, context);
		let {detail} =props;
		inspectionData = [].concat(detail);
		this.detailNames=[];
		this.MainInit=false;
		this.detailInit=false;
	}
    
	onCancel = () =>{
		const {onCancel} = this.props;
		isOk = false;
		onCancel && onCancel();
	}
	
	//主表首次不提示
	mainTip=(params)=>{
		var _this=this;
		this.MainInit=false;
		if(inspectionData&&!isOk){
			inspectionData.map((item,index)=>{
				if(item.isMain){
					item.fields&&item.fields.map((items,indexs)=>{
						if (items.required && !params[items.name] && params[items.name]!==0){
							Notify.show([{
								message:`${items.label}不能为空`,
								type: 'danger',
							}]);
							_this.MainInit=true;
						}
					})
				}
			})
		}
	}
    
	//明细表提示
	detailTip=(params)=>{
		var tableName=[];
		var fields=[];
		this.detailInit=false;
        for(var i=0;i<this.detailNames.length;i++){
			tableName.push(this.detailNames[i].item.tableName);
			fields=[].concat(this.detailNames[i].item.fields);
		}
		tableName.map((item,index)=>{
			if(params[item]){
				params[item].map((items,indexs)=>{
					if(!items||JSON.stringify(items) == "{}"){
						Notify.show([{
							message:'请填写明细表数据',
							type: 'danger',
						}]);
						this.detailInit=true;
					}else{
						fields.map((it,ind)=>{
							if(it.required&&!items[it.name]){
								Notify.show([{
									message:`${it.label}为必填项`,
									type: 'danger',
								}]);
								this.detailInit=true;	
							}
						})
					}
				})
			}
		})
	}
    
	//提交代码
	onSubmit = (values) =>{
		let params = Object.assign({},values);
		this.mainTip(params);
		this.detailTip(params);
		if(this.MainInit||this.detailInit){
			return ;
		}
		delete params.c_time;
		delete params.u_time;
		const {onSubmit} = this.props;
		isOk = false;
		onSubmit && onSubmit(params)
	}
	//渲染所有表单
	renderFields = () => {
		let {detail} = this.props;
			detail = detail||[];
			this.detailNames=[];
			inspectionData = [].concat(detail);			
		var fields = detail.map((item,index)=>{
			if(item.isMain){
				return this.mainRender(item.fields,item.lineNum);
			}else{
				this.detailNames.push({item:item});
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
		let {responseData}=this.props;
		var grid = 1/lineNum;
		if (item.wholeLine){
			grid = 1
		}
		if (type == "searchSelect"){
		}
		
		var params = {
			searchKey: item.searchKey || '',
			sourceOrgin: item.sourceOrgin || '',
			sourceType: item.sourceType || '',
			fieldId: item.id
		}

		var editHeight={};
		var maxLength = 200;

		if(item.setting){
			var seeting =JSON.parse(item.setting);
			editHeight =seeting;
			if (seeting.wstext){
				maxLength = seeting.wstext;
			}
		}
		//item.editable  是否编辑

		if(item.display){
			return (
				<KrField
					name={item.name}
					left={15}
					right={15} 
					requireLabel={item.required}
					inline={false}
					label={item.label}
					grid={grid}
					isStore={true}
					selectUrl= 'template-search-list'
					component={type}
					params={params}
					onlyRead={!item.editable}
					editHeight={editHeight}
					maxSize={maxLength}
					value={responseData?responseData[item.name]:''}
				/>
			)
		}else {
			return ;
		}
	}
	//浏览按钮渲染
	btnFieldRender = (item,lineNum) =>{
		var setting = item.setting;
		var jsData={};
		if(setting){
			jsData=JSON.parse(setting);
		}
		var type = btnType[jsData.wsradio];
		return this.universalRender(item,type,lineNum);
		
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
		
	}

	componentWillUnmount(){
		inspectionData = [];
	}
	
	render(){
		const {handleSubmit,title,introData} = this.props;
		

		return (
			
			<form className="m-newMerchants" style={{paddingLeft:9}} onSubmit={handleSubmit(this.onSubmit)}>
				<DrawerTitle title ={title||"新建"} onCancel = {this.onCancel}/>
				<div style = {{marginTop:30}}>
				
				{introData &&<div style={{width:'100%',padding:'0px 15px',boxSizing:'border-box'}}>
					<div className='m-form-intro'>
						<div className='intro-pic'>
						<div></div>
						<span>填表说明：</span>
						</div>
						<div className='intro-text'>{introData}</div>
					</div>
			    </div>}
				{this.renderFields()}
				</div>
				<DrawerBtn onSubmit = {this.onSubmit} onCancel = {this.onCancel}/>	
			</form>
		);
	}
}



const validate = values => {
		let errors = {};
		let detailMessage = '';
		if(inspectionData.length!=0){
			isOk=true;
		}
		inspectionData.map((item, index) => {
			if (item.isMain) {
				errors = mainCheck(item.fields, values,true);
			}else {
				detailMessage = detailCheck(item, values);
				if(detailMessage){
					Notify.show([{
						message: detailMessage,
						type: 'danger',
					}]);
				}
				
			}
		})
		// errors.name = new Date();
		return errors
}
export default reduxForm({
	form: 'FromsConfig',
	validate
})(FromsConfig);
