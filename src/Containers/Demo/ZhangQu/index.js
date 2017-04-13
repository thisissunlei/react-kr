import React, {Component, PropTypes} from 'react';

import TreeAll from './TreeAll.json';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
	SnackTip,
	ListGroup,
	ListGroupItem,
	Dialog
} from 'kr-ui';

import {
  observer,
  inject
} from 'mobx-react';


import {reduxForm,Field}  from 'kr/Utils/ReduxForm';


 class Demo extends Component{

	constructor(props){
		super(props);
		this.state={
			requestURI:'/api/krspace-finance-web/community/sysDeviceDefinition/upload-pic',
			initailPoint :'北京',
			treeAll :TreeAll
		}	
	}

	componentWillMount() {

	}

	componentDidMount(){

		const {$form} = this.props;

		var values = {
					username:'yyyyaa',
					textarea:'bbbb'
		}
		$form.initialize(values);
	}

	onSubmit = (values)=>{
		Debug.log("======>values",values);
	}

	onClick = ()=>{
		const {$form} = this.props;
		$form.submit();
	}

	change=(form)=>{
		const {$form} = this.props;
		Debug.log("form",form);
		$form.change('editLabelText',form);
	}

	onReset = ()=>{
		const {$form} = this.props;
		$form.reset();
	}

	selectOldUser=(value)=>{
		const {$form} = this.props;
		$form.change('SearchList',value);
	}
	changeSearch=(value)=>{
		const {$form} = this.props;
		$form.change('search',value);
	}
	cityValue=(value)=>{
		const {$form} = this.props;
		$form.change('city',value);
	}
	chooseYes=(value)=>{
		Debug.log("value------>",value)
		const {$form} = this.props;
		$form.change('radio',value);
	}
	chooseNo=(value)=>{
		const {$form} = this.props;
		$form.change('radio',value);
	}

	render(){
		let {treeAll} = this.state;
		const {handleSubmit} = this.props;
		return (
			<div>
				<form onSubmit={handleSubmit(this.onSubmit)}>

					<KrField label="input" type="input" component="input" name="input" mobx={true} />
					<KrField label="用户名称" type="text" component="textarea" name="textarea" mobx={true} />
					<KrField label="uploadImageList" component="uploadImageList" name="uploadImageList" mobx={true} />
					<KrField label="searchCustomer" component="searchCustomer" name="searchCustomer" mobx={true} />
					<KrField label="select"  component="select" name="select" options={[{label:'ddd',value:'yy'}]} mobx={true} />
					<KrField label="editor"  component="editor"  name="editor" mobx={true}  />
					{/*<KrField label="groupCheckbox" component="groupCheckbox"  name="groupCheckbox"  defaultValue=={[{label:'ddd',value:'yy'}]} />*/}
					<KrField label="editLabelText"  component="editLabelText"  name="editLabelText" save={this.change} mobx={true}/>
					<KrField label="file"  component="file"  name="file" mobx={true}/>
					<KrField label="doorCard"  component="doorCard"  name="doorCard" mobx={true}/>
					{/*上传图片有问题*/}

					<KrField
			              		label="电脑端轮播图newuploadImage"
			              		name="newuploadImage"
								component="newuploadImage"
								innerstyle={{width:524,height:159,padding:10}}
								photoSize={'1920*520'}
								pictureFormat={'JPG,PNG,GIF'}
								pictureMemory={'500'}
								requestURI = {this.state.requestURI}
								inline={false}
								mobx={true}
							/>
					<KrField label="searchPayment"  component="searchPayment"  name="searchPayment" mobx={true}/>
					<KrField label="searchMainbill"  component="searchMainbill"  name="searchMainbill" mobx={true} customerId='1'/>
					{/*社区-------------咋全是社区啊*/}
					<KrField label="searchCommunitys"  component="searchCommunitys"  name="searchCommunitys" mobx={true} />
					<KrField label="searchCorporation"  component="searchCorporation"  name="searchCorporation" mobx={true} />
					<KrField label="searchPersonel"  component="searchPersonel"  name="searchPersonel" mobx={true} />
					<KrField label="selectTime"  component="selectTime"  name="selectTime" mobx={true} />
					<KrField label="SearchList"  component="SearchList"  name="SearchList" mobx={true} onSubmit={this.selectOldUser}/>
					{/*社区-------------咋全是社区啊*/}
					<KrField label="searchCommunity"  component="searchCommunity"  name="searchCommunity" mobx={true} />
					<KrField label="searchLeader"  component="searchLeader"  name="searchLeader" mobx={true} />
					{/*社区-------------咋全是社区啊*/}
					<KrField label="searchIntend"  component="searchIntend"  name="searchIntend" mobx={true} />
					{/*社区-------------咋全是社区啊*/}
					<KrField label="searchSign"  component="searchSign"  name="searchSign" mobx={true} />
					<KrField label="searchCompany"  component="searchCompany"  name="searchCompany" mobx={true} />
					{/*后台出错*/}
					<KrField label="searchCity"  component="searchCity"  name="searchCity" mobx={true} />
					{/*后台出错*/}
					<KrField label="searchSource"  component="searchSource"  name="searchSource" mobx={true} />
					{/*后台出错*/}
					<KrField label="searchSourceAdd"  component="searchSourceAdd"  name="searchSourceAdd" mobx={true} />
					<KrField label="companyName"  component="companyName"  name="companyName" mobx={true} />
					<KrField label="search填写1"  component="search"  name="search" mobx={true} onChange={this.changeSearch}/>
					<KrField label="city"  component="city"  name="city" mobx={true} onSubmit={this.cityValue}/>
					<KrField label="tree"  component="tree"  name="tree" mobx={true} treeAll={treeAll}/>
					<KrField label="textarea"  component="textarea"  name="textarea" mobx={true} />
   					{/*有问题*/}
   					<KrField grid={1/2} component="group"  name="enableflag"  label="是否启用" requireLabel={true} mobx={true}>
						<KrField name="enableflag" grid={1/2} label="是" component="radio" type="radio" mobx={true} value="yes" />
						<KrField name="enableflag" grid={1/2} label="否" component="radio" type="radio"  mobx={true} value="no" />
              		</KrField>
					<KrField name="date"  component="date" type="date" mobx={true} />
					{/*<KrField name="mapField"
						component="mapnew"
						placeholder="例如：中关村创业大街2号楼3层"
						style={{width:242,height:36}}
						mapStyle={{width:500,height:300}}
						initailPoint ={this.state.initailPoint}
						mobx={true}
					/>*/}


					



					<Button type="submit" label="提交"/>
					<Button type="button" label="暂存" onClick={this.onClick}/>
					<Button type="button" label="重置" onClick={this.onReset}/>

				</form>

		</div>
	 );

		}

}


const validate = (values)=>{
	Debug.log("values校验",values);
	const errors = {};


	if(!values.input){
		errors.input = '请输入input'
	}
	if(!values.textarea){
		errors.textarea = '请输入textarea'
	}
	if(!values.uploadImageList){
		errors.uploadImageList = '请输入uploadImageList'
	}
	if(!values.searchCustomer){
		errors.searchCustomer = '请输入searchCustomer'
	}
	

	return errors;

}

export default reduxForm({
	form:'dForm',
	validate,
})(Demo);
