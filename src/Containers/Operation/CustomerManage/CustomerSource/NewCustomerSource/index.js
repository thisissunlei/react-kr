
import React, {Component, PropTypes} from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import {
	reduxForm,
	formValueSelector,
	initialize,
	change,
	FieldArray
} from 'redux-form';


import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
	Message,
} from 'kr-ui';
import './index.less';
<<<<<<< HEAD
import {Http} from 'kr/Utils';
var isName = true;
var isChildName = [];
var isCode = true;
var isChildCode = [];
var isRequire = [];
class NewCustomerSource extends Component{
=======
 class NewCustomerSource extends Component{
>>>>>>> master
	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		this.state={
			typeValue:this.props.typeValue,
		}
	}
	componentDidMount() {
<<<<<<< HEAD
		Store.dispatch(change('newCustomerSource','enabled',"true"));
=======
		Store.dispatch(change('newCustomerSource','enabled',0));
>>>>>>> master
	}
	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

    onSubmit = (values) =>{
        let {onSubmit} = this.props;
        onSubmit && onSubmit(values);
    }
<<<<<<< HEAD
	//监听name发生变化
	nameChange = (data,index) =>{
		
		var value = {id : '',name : data}
		
		if(data != '' && index != 'no'){
			isRequire[index] = true;
		}else if(data === '' && index != 'no'){
			isRequire[index] = false;
		}
		

		Http.request('check-name-source',value).then(function(response) {
			if(index=="no" && response.code == "-1"){
				isName = false;
			}
			if(index=="no" && response.code == "1"){
				isName = true;
			}
			if(index != "no" && response.code == "-1"){
				isChildName[index]=false;
			}
			if(index != "no" && response.code == "1"){
				isChildName[index]=true;
			}
		}).catch(function(err) {
			
		});
	}
	//监听code发生变化
	codeChange = (data,index) => {
		var value = {id : '',name : data}
		if(data === '' && index != 'no'){
			isRequire[index] = true;
		}
		Http.request('check-name-source',value).then(function(response) {
			if(index=="no" && response.code == "-1"){
				isCode = false;
			}
			if(index=="no" && response.code == "1"){
				isCode = true;
			}
			if(index != "no" && response.code == "-1"){
				isChildCode[index]=false;
			}
			if(index != "no" && response.code == "1"){
				isChildCode[index]=true;
			}
		}).catch(function(err) {
			
		});
	}
	//
	orderNumChange = (data,index) =>{
		if(data === '' && index != undefined){
			isRequire[index] = true;
		}
	}

	renderField = ({ input, label, placeholder, meta: { touched, error }}) => (
		<div>
			<label>{label}</label>
			<div>
			<input {...input}  placeholder={label||placeholder}/>
			{touched && error && <span>{error}</span>}
			</div>
		</div>
	)
	renderBrights = ({ fields, meta: { touched, error }}) => {
		const self = this;
		var krStyle={};
		var nameArr = [];
		var codeArr = [];
		var requireArr = [];
		krStyle={width:228,marginLeft:18,marginRight:3,}
			
	   var brights = fields.map(function(brightsStr, index){
		   		if(!isChildName[index]){
					nameArr.push(false);
				}else{
					nameArr.push(true);
				}
				if(isChildCode[index]){
					codeArr.push(false);
				}else{
					codeArr.push(true);
				}
				if(isRequire[index]){
					requireArr.push(true);
				}else{
					requireArr.push(false);
				}
				
				return (<li key={index} style={{width:600,listStyle:'none'}}>
						<KrField
							style={{width:190,marginLeft:18,marginRight:3,}}
							grid={1/3}
							name={`${brightsStr}.name`}
=======

	renderField = ({ input, label, placeholder, meta: { touched, error }}) => (
	<div>
		<label>{label}</label>
		<div>
		<input {...input}  placeholder={label||placeholder}/>
		{touched && error && <span>{error}</span>}
		</div>
	</div>
)
	renderBrights = ({ fields, meta: { touched, error }}) => {
		const self = this;
		 var krStyle={};
			krStyle={width:228,marginLeft:18,marginRight:3,}
			return (
					<ul style={{padding:0,margin:0}}>
					<div style = {{marginLeft:20,marginBottom:20}}>
						<Button  label="添加子项" onTouchTap={() => fields.unshift()} />
					</div>	
					{fields.map((brightsStr, index) =>
					<li key={index} style={{width:600,listStyle:'none'}}>
						<KrField
							style={{width:190,marginLeft:18,marginRight:3,}}
							grid={1/3}
							name={`${brightsStr.name}`}
>>>>>>> master
							type="text"
							component={self.renderField}
							label={index?'':'子项名称'}
							placeholder='子项名称'
<<<<<<< HEAD
							onChange = {(data) =>{
								
								self.nameChange(data,index);
							}} 
							
						/>
						<KrField
							style={{width:225,marginLeft:0,marginRight:3,}}
							grid={1/3}
							name={`${brightsStr}.code`}
=======
							
						/>
						
						
						<KrField
							style={{width:225,marginLeft:0,marginRight:3,}}
							grid={1/3}
							name={`${brightsStr.orderNum}`}
>>>>>>> master
							type="text"
							component={self.renderField}
							label={index?'':'子项编码'}
							placeholder='子项编码'
<<<<<<< HEAD
							onChange = {(data) =>{
								self.nameChange(data,index)
							}} 
=======
>>>>>>> master
						/>
						<KrField
							style={{width:90,marginLeft:0,marginRight:3,}}
							grid={1/3}
<<<<<<< HEAD
							name={`${brightsStr}.orderNum`}
=======
							name={`${brightsStr.code}`}
>>>>>>> master
							type="text"
							component={self.renderField}
							label={index?'':'子项顺序'}
							placeholder='子项顺序'
<<<<<<< HEAD
							onChange = { (data) =>{
								self.orderNumChange(data,index)
							}} 
=======
>>>>>>> master
						/>
						<span
							className='minusBtn'
							style={!index ? {marginTop:32,marginLeft:8}:{marginTop:16,marginLeft:8}}
<<<<<<< HEAD
							onClick={() => {
								fields.remove(index)
								isRequire.splice(index,1);
								isChildCode.splice(index,1);
								isChildName.splice(index,1);
							}}
						/>
					</li>)
	   		})
			isChildName = [].concat(nameArr);
			isChildCode = [].concat(codeArr);
			isRequire = [].concat(requireArr);
			return (
			<ul style={{padding:0,margin:0}}>
				<div style = {{marginLeft:20,marginBottom:20}}>
					<Button  label="添加子项" onTouchTap={() => {
							fields.unshift();
							isRequire.unshift(false);
							isChildCode.unshift(true);
							isChildName.unshift(true);
						}} />
				</div>	
				{brights}
=======
							onClick={() => fields.remove(index)}/>
					</li>
				)}
				
>>>>>>> master
			</ul>

		)
	}
	render(){
		const { handleSubmit,select} = this.props;
		const {typeValue} = this.state;
		let fieldStyle = {width:262,marginLeft:28}
		return (

			<form className = 'edit-source-from' onSubmit={handleSubmit(this.onSubmit)} style={{padding:" 35px 45px 45px 45px"}}>
				<div className="title">
						<div><span className="new-icon"></span><label className="title-text">新建客户来源</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
				<div className="cheek">
						<div className="titleBar">
							<span className="order-number">1</span>
							<span className="wire"></span>
							<label className="small-title">基本信息</label>
						</div>
						<div className="small-cheek">
							<KrField 
								grid={1/2} label="来源名称"  
								name="name" 
								style={{width:262,marginLeft:15}} 
								component="input" 
								requireLabel={true}
<<<<<<< HEAD
								onChange = {this.nameChange.bind(this,"no")}
							/>
							<KrField 
								grid={1/2} label="来源编码"  
								name="code" 
								style={{width:262,marginLeft:15}} 
								component="input" 
								requireLabel={true}
								onChange = {this.codeChange.bind(this,"no")}
=======
							/>
							<KrField 
								grid={1/2} 
								label="佣金比例" 
								name="brokerage" 
								style={{width:262,marginLeft:15}} 
								component="input" 
								requireLabel={true}
>>>>>>> master
							/>
							<KrField 
								grid={1/2} 
								label="来源顺序" 
								name="orderNum" 
								style={{width:262,marginLeft:15}} 
								component="input" 
								requireLabel={true}
							/>
							<KrField 
								grid={1/2} 
<<<<<<< HEAD
								label="佣金比例" 
								name="brokerage" 
								style={{width:262,marginLeft:15}} 
								component="input" 
								requireLabel={true}
							/>
							<KrField 
								grid={1/2} 
=======
>>>>>>> master
								label="全员开放" 
								name="enabled" 
								style={{width:262,marginLeft:15,marginRight:13}} 
								component="group" 
								requireLabel={true}
							>
								<KrField 
									name="enabled" 
									label="是" 
									type="radio" 
<<<<<<< HEAD
									value="true" 
=======
									value="ENABLE" 
>>>>>>> master
									style={{marginTop:5,display:'inline-block',width:84}}
								/>
								<KrField 
									name="enabled" 
									label="否" 
									type="radio" 
<<<<<<< HEAD
									value="false"  
=======
									value="DISENABLE"  
>>>>>>> master
									style={{marginTop:5,display:'inline-block',width:53}}
								/>
							</KrField>
							<div className="middle-round"></div>
						</div>

						<div className="titleBar">
							<span className="order-number">2</span>
							<span className="wire"></span>
							<label className="small-title">自来源信息</label>
						</div>
						<div className="small-cheek" style={{paddingBottom:0}}>

							<FieldArray name="subListStr" component={this.renderBrights}/>

						</div>
						
						<div className="end-round"></div>
				</div>
				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>

								<div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit"/></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
			</form>
		);
	}
}
const validate = values =>{

	const errors = {};
<<<<<<< HEAD
	if(!values.name){
		errors.name = '来源名称必填';
	}else if(values.name.length > 20){
		errors.name = "来源名称最多20个文字";
	}else if(!isName){
		errors.name = "来源名称已存在";
	}

	if(!values.code){
		errors.code = '来源编码必填';
	}else if(values.code.length > 30){
		errors.code = "来源名称最多30个字符";
	}else if(!isCode){
		errors.code = "来源编码已存在"
	}


	if(!values.brokerage){
		errors.brokerage = '拥金比例为必填项';
	}else if(!values.brokerage){
		errors.brokerage = ''
	}
	if (!values.subListStr || !values.subListStr.length) {
          errors.subListStr = { _error: 'At least one member must be entered' }
        } else {
          let membersArrayErrors = []

          values.subListStr.forEach((porTypes, memberIndex) => {

            let memberErrors ={};
			if(!porTypes){
				return ;
			}
			if (isRequire[memberIndex] && !porTypes.name){
              memberErrors.name = '该子项名称必填';
			}
			if (isRequire[memberIndex] && !porTypes.code){
              memberErrors.code = '该子项编码必填';
			}
			if (isRequire[memberIndex] && !porTypes.orderNum){
              memberErrors.orderNum = '该子项排序必填';
			}
            if (!isChildName[memberIndex]){
              memberErrors.name = '该子项名称已存在';
            }
			if (!isChildCode[memberIndex]){
              memberErrors.code = '该子项编码已存在';
            }
			if (porTypes.name && porTypes.name.length > 20){
				memberErrors.name = '子项名称最多20个字';
			}	
			if (porTypes.code && porTypes.code.length > 30){
				memberErrors.code = '子项编码最多30个字符';
			}
			membersArrayErrors[memberIndex] = memberErrors
          })

        if(membersArrayErrors.length) {
          errors.subListStr = membersArrayErrors
=======
	
	if (!values.bankAccount || !values.bankAccount.length) {
          errors.bankAccount = { _error: 'At least one member must be entered' }
        } else {
          let membersArrayErrors = []
          values.bankAccount.forEach((porTypes, memberIndex) => {

            let memberErrors = '';
			if(porTypes){
				porTypes = porTypes.toString().replace(/[ /d]/g, '');
			}
			if (!porTypes){
              memberErrors = '请填写银行账户'

			}
            if (porTypes&& (isNaN(porTypes.toString().trim()) || porTypes.toString().trim().length >=30)) {
              memberErrors = '银行卡号必须为数字，且最长为30个数字'

            }
			membersArrayErrors[memberIndex] = memberErrors
          })
        if(membersArrayErrors.length) {
          errors.bankAccount = membersArrayErrors
>>>>>>> master
        }
      }
	return errors;
}
export default reduxForm({ form: 'newCustomerSource',validate})(NewCustomerSource);
