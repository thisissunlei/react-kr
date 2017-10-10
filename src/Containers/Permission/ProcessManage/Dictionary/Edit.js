import React from 'react';
import {reduxForm,change,initialize,reset} from 'redux-form';
import {Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {
	toJS
} from 'mobx';
import {
	KrField,
	Grid,
	Row,
	Button,
	Message,
	ListGroup,
	ListGroupItem,
	TabelEdit,
	FRow,
	Notify
} from 'kr-ui';

import {
	observer
} from 'mobx-react';

import State from './State';

import './index.less';

@observer
class EditForm extends React.Component{
	constructor(props){
		super(props);

		this.state={
			beginDate:'',
			endDate:'',
			beginTime:'',
			endTime:''
		}
	}
	componentDidMount() {
		Store.dispatch(initialize('EditForm',State.data));
		Store.dispatch(change('EditForm','items',toJS(State.data.items)));

	}
	componentWillReceiveProps(nextProps) {
	}
	onSubmit=(value)=>{
		let labelArr = [];
		let valueArr = [];
		let orderNumArr = [];
		let labelNone = false;
		let valueNone = false;
		let orderNumNone = false;
		let tableNone = false;
		value.itemListStr = value.items;
		
		
		let tableVlaue = value.itemListStr;
		if(!value.items.length){
			Notify.show([{
				message: '请添加字典项',
				type: 'danger',
			}]);
			return;
		}
		tableVlaue.map(item=>{
			if(!item){
				tableNone=true;
			}
		})

		if(tableNone){
			Notify.show([{
				message: '字典选项内容请填写完整',
				type: 'danger',
			}]);
			return;
		}

		let labelArray = value.itemListStr.map((item)=>{
			if(item.label){
				return item.label
			}else{
				labelNone = true;
				return false;
			}
		})
		let valueArray = value.itemListStr.map((item)=>{
			if(item.value){
				return item.value
			}else{
				valueNone = true;
				return false;
			}
		})
		let orderNumArray = value.itemListStr.map((item)=>{
			if(item.orderNum){
				return item.orderNum+''
			}else{
				orderNumNone = true;
				return false;
			}
		})
		if(orderNumNone){
			Notify.show([{
				message: '请填写排序号',
				type: 'danger',
			}]);
			return;
		}
		if(valueNone){
			Notify.show([{
				message: '请填写选项值',
				type: 'danger',
			}]);
			return;
		}
		if(labelNone){
			Notify.show([{
				message: '请填写选项文字',
				type: 'danger',
			}]);
			return;
		}
		let tmp = [];
		let tmp1 = [];
		let tmp2 = [];
		let orderNumCop=false;
		let valueCop=false;
		let labelCop=false;
		let labelLegth = false;
		let valueLegth = false;
		let orderLegth = false;
		for(var i in orderNumArray){
			if(orderNumArray[i].length>2){
				orderLegth = true
			}
			if(tmp.indexOf(orderNumArray[i])!=-1){
				orderNumCop = true;
			}
			if(tmp.indexOf(orderNumArray[i])==-1){
				tmp.push(orderNumArray[i])
			}
			
		}
		for(var i in valueArray){
			if(valueArray[i].length>3){
				valueLegth = true
			}
			if(tmp1.indexOf(valueArray[i])!=-1){
				valueCop = true;
			}
			if(tmp1.indexOf(valueArray[i])==-1){
				tmp1.push(valueArray[i])
			}
			
		}
		for(var i in labelArray){
			if(labelArray[i].length>20){
				labelLegth = true;
			}
			if(tmp2.indexOf(labelArray[i])!=-1){
				labelCop = true;
			}
			if(tmp2.indexOf(labelArray[i])==-1){
				tmp2.push(labelArray[i])
			}
		}
		if(orderLegth){
			Notify.show([{
				message: '排序号不可超过两位',
				type: 'danger',
			}]);
			return;
		}
		if(labelLegth){
			Notify.show([{
				message: '选项文字不可超过20',
				type: 'danger',
			}]);
			return;
		}
		if(valueLegth){
			Notify.show([{
				message: '选项值不可超过三位',
				type: 'danger',
			}]);
			return;
		}
		if(orderNumCop){
			Notify.show([{
				message: '排序号不可重复',
				type: 'danger',
			}]);
			return;
		}
		if(valueCop){
			Notify.show([{
				message: '选项值不可重复',
				type: 'danger',
			}]);
			return;
		}
		if(labelCop){
			Notify.show([{
				message: '选项文字不可重复',
				type: 'danger',
			}]);
			return;
		}
		let orderNumType=false;
		orderNumArray.map(item=>{
			if(!item || isNaN(item)){
				orderNumType=true;
			}
		})
		if(orderNumType){
			Notify.show([{
				message: '排序号只能为数字',
				type: 'danger',
			}]);
			return;
		}
		value.itemListStr = value.itemListStr.map((item)=>{
			if(!item.isDefault){
				item.isDefault = false;
			}
			return item;

		});

		console.log('是否有空值',orderNumNone,valueNone,labelNone)
		console.log('table数组',orderNumArray,valueArray,labelArray)
		console.log('是否有重复的值',orderNumCop,valueCop,labelCop)
		// State.newCreateDict(value);
		State.editDict(value)
	}
	onCancel=()=>{
		State.closeAll();
	}

	changeName=(e)=>{
		State.checkName(e);
	}
	changeCode=(e)=>{
		State.checkCode(e);
	}

	render(){
		const { handleSubmit} = this.props;
		// 对应功能选项
		return (
			<div className="new-create-activity">
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<div className="title-box">
						<img src={require('./images/activity.svg')} className="title-img"/>
						<span className="title-text">编辑公共字典</span>
						<span className="close-page" onClick={this.onCancel}>
							<img src={require('./images/closeIMG.svg')} className="close-page-img" />
						</span>
					</div>
					<div className="detail-info">
								<KrField grid={1/2} name="dictName" type="text" label="字典名称" requireLabel={true} style={{width:252,zIndex:11}} onBlur={this.changeName}/>
								<KrField grid={1/2} name="dictCode" type="text" left={50} label="字典编码" requireLabel={true} style={{width:252}} onBlur={this.changeCode}/>
								<KrField grid={1} name="dataType" component="group" label="字典类型"  requireLabel={true}>
									<KrField name="dataType" grid={1/2} label="静态" type="radio" value='STATIC' style={{marginTop:10,display:"inline-block"}} onClick={this.chooseStick}/>
				              	</KrField>
								<KrField grid={1} name="descr" 
								 type="textarea" component="textarea"maxSize={100}
								label="描述"/>
								
					</div>
					<div style={{marginLeft:28,marginBottom:40}}>
					 <TabelEdit 
					 	name = "items" 
						toolbar = {true}
						checkbox = {true}
						
					 >
						 <FRow name = "label"  type = "tableEdit"  label = "选项文字" />
						 <FRow name = "value" type = "tableEdit" label = "选项值" />
						 <FRow name = "orderNum" type = "tableEdit" label = "排序号" />
						 <FRow name = "isDefault" type = "checkBox" label = "是否默认" />
					 </TabelEdit>
					</div>
					<Grid style={{paddingBottom:50}}>
						<Row>
						<ListGroup>
							<ListGroupItem style={{width:'47%',textAlign:'right',paddingRight:15}}>
								<Button  label="确定" type="submit" />
							</ListGroupItem>
							<ListGroupItem style={{width:'47%',textAlign:'left'}}>
								<Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel} />
							</ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>

				</form>
		  	</div>
		);
	}
}
const validate = values => {

	let errors = {};
	if(!values.dictName){
		errors.dictName = '请填写字典名称'
	}
	if(!values.dictCode){
		errors.dictCode = '请填写字典编码'
	}
	
	return errors
}

export default EditForm = reduxForm({
	form: 'EditForm',
	validate,
})(EditForm);
