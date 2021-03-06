import React from 'react';
import {reduxForm,change,initialize,reset} from 'redux-form';
import {Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
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
	Notify,
	DrawerTitle
} from 'kr-ui';

import {
	observer
} from 'mobx-react';

import State from './State';

import './index.less';
import DictionaryConfigs from 'kr/Configs/dictionary';

@observer
class NewCreateForm extends React.Component{
	constructor(props){
		super(props);

		this.state={
			beginDate:'',
			endDate:'',
			beginTime:'',
			endTime:'',
			//类型
			isStatic:false
		}
	}
	componentWillMount() {
		Store.dispatch(change('NewCreateForm','dataType',"STATIC"));
		Store.dispatch(change('NewCreateForm','itemListStr',[]));
	}
	arrDel=(arr)=>{
      	let tmp = [];
	    for(var i in arr){
			if(tmp.indexOf(arr[i])==-1){
				tmp.push(arr[i])
			}
		}
		if(tmp.length<arr.length){
			return true;
		}
		return false;
	}
	onSubmit=(value)=>{
	    if(value.dataType=='STATIC'){
		let labelArr = [];
		let valueArr = [];
		let orderNumArr = [];
		let labelNone = false;
		let valueNone = false;
		let orderNumNone = false;
		let tableNone = false;
		let orderNumMessage = '';
		if(!value.itemListStr || !value.itemListStr.length){
			Notify.show([{
				message: '请添加字典项',
				type: 'danger',
			}]);
			return;
		}

		let tableVlaue = value.itemListStr;
		value.itemListStr.map((item)=>{
			if(!item){
				tableNone = true;
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
			var reg = /^[1-9]\d*|0$/;
			 if(item.orderNum!=0 && !item.orderNum){
				orderNumNone = true;
				orderNumMessage = '请填写排序号';
				return false;
			} else if(!reg.test(item.orderNum) && item.orderNum!=''){
				orderNumMessage = "排序号为非负整数";
				orderNumNone = true;
				return false;
			}else {
				return item.orderNum+''
			}
		})
		if(orderNumNone){
			Notify.show([{
				message: orderNumMessage,
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
		let orderNumRang=false;
		orderNumArray.map(item=>{
			if(!item || isNaN(item)){
				orderNumType=true;
			}
			if(item && item>99){
				orderNumRang = true
			}
		})
		if(orderNumType){
			Notify.show([{
				message: '排序号只能为数字',
				type: 'danger',
			}]);
			return;
		}
		if(orderNumRang){
			Notify.show([{
				message: '排序号只能为两位数字',
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

	   }

		State.newCreateDict(value);
	}
	onCancel=()=>{
		State.openCreate = false;
	}
	changeName=(e)=>{
		State.checkName(e);
		console.log('---changeName----',e)
	}
	changeCode=(e)=>{
		State.checkCode(e);

		console.log('---changeCode----',e)
	}

	chooseStick=(e)=>{
		if(e.value=='STATIC'){
			this.setState({
				isStatic:false
			})
		}else{
			this.setState({
				isStatic:true
			})
		}
	}


	render(){
		const { handleSubmit} = this.props;
		let {isStatic}=this.state;
		
		// 对应功能选项
		return (
			<div className="new-create-activity">
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<div className="title-box">
                		<DrawerTitle title ="新建公共字典" onCancel = {this.onCancel}/>

					</div>
					<div className="detail-info">
								<KrField grid={1/2} name="dictName" type="text" label="字典名称" requireLabel={true} style={{width:252,zIndex:11}} onBlur={this.changeName}/>
								<KrField grid={1/2} name="dictCode" type="text" left={50} label="字典编码" requireLabel={true} style={{width:252}} onBlur={this.changeCode}/>
								<KrField grid={1/2} style={{width:262}} name="dataType" component="group" label="字典类型"  requireLabel={true}>
									<KrField name="dataType" label="静态" type="radio" value='STATIC' style={{marginTop:10}} onClick={this.chooseStick}/>
									<KrField name="dataType" label="动态" type="radio" value='DYNAMIC' style={{marginTop:10}} onClick={this.chooseStick}/>
				              	</KrField>
								<KrField grid={1} name="descr" 
								 type="textarea" component="textarea"maxSize={100}
								label="描述"/>
								
					</div>
					{!isStatic&&<div style={{marginLeft:28,marginBottom:40}}>
					 <TabelEdit 
					 	name = "itemListStr" 
						toolbar = {true}
						checkbox = {true}

						
					 >
						 <FRow name = "label"  type = "tableEdit"  label = "选项文字" />
						 <FRow name = "value" type = "tableEdit" label = "选项值" />
						 <FRow name = "orderNum" type = "tableEdit" label = "排序号" />
						 <FRow name = "isDefault" type = "checkBox" label = "是否默认" />
					 </TabelEdit>
					</div>}

					{isStatic&&<div style={{marginLeft:22,marginBottom:20,marginTop:-10}}>
					    <KrField 
						  grid={1/2} 
						  name="dataSource" 
						  component="select" 
						  label="公共字典编码" 
						  options={State.asynicData}
						  style={{width:252,zIndex:11}}/>
					</div>}

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

export default NewCreateForm = reduxForm({
	form: 'NewCreateForm',
	validate,
})(NewCreateForm);
