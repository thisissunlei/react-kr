
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';

import './index.less';

import UpgradePlupload from './UpgradePlupload';

import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
	Message,
} from 'kr-ui';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

class NewCreateUpgradeForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			upgradeTypeOptions:[]
		}
	}
	onCancel=()=>{
		State.openNewCreateUpgrade = false;
	}

	// 新增设备定义
	onSubmit=(values)=>{
		State.NewCreateUpgrade(values);
		State.openNewCreateUpgrade = false;
		
	}
	render(){
		const { error, handleSubmit, reset} = this.props;
		return(
			<div style={{padding:'20px 0 0 55px'}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<UpgradePlupload/>
					<KrField 
						name="floor" 
						component="select" 
						name="upgradeType" 
						label="升级类型" 
						options = {State.upgradeTypeOptions}
						style={{width:'252px',margin:'0 35px 5px 0'}}
						requireLabel={true} 

					/>
					{/*<KrField 
											grid={1/2} 
											name="url" 
											type="text" 
											label="升级包地址" 
											style={{width:'252px'}}
											requireLabel={true} 
					
										/>*/}
					<KrField grid={1/2} 
						name="version" 
						type="text" 
						label="版本信息" 
						style={{width:'252px',margin:'0 35px 5px 0'}}
						requireLabel={true} 

					/>
					<KrField 
						grid={1/2} 
						name="versionCode" 
						type="text" 
						label="版本编码" 
						requireLabel={false} 
						style={{width:'252px'}}
					/>
					<p className="upgrade-tip-text">注意：提交之前请确保已经上传升级包</p>
					
					<Grid>
						<Row style={{textAlign:'center',marginLeft:'-40px'}}>
							<ListGroup >
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:30}}>
									<Button  label="提交" type="submit"/>
								</ListGroupItem>
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:3}}>
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} />
								</ListGroupItem>
							</ListGroup>					
						</Row>
					</Grid>
				</form>
			</div>
		);
	}
}
const validate = values=>{
	const errors={};
	let numberNotZero=/^[0-9]*[1-9][0-9]*$/;
	if(!values.upgradeType){
		errors.upgradeType = '升级类型为必填项';
	}
	if(!values.url){
		errors.url = '升级包地址为必填项';
	}
	if(!values.version || /^\s+$/.test(values.version)){
		errors.version = '版本信息为必填项';
	}else if(values.version.length>20){
		errors.version = '版本信息最多20个字符';
	}
	
	if(values.versionCode &&!numberNotZero.test(values.versionCode)){
		errors.versionCode = '升级信息ID必须为正整数';
	}
	
	return errors;
}
export default NewCreateUpgradeForm= reduxForm({
	form: 'NewCreateUpgradeForm',
	validate,
})(NewCreateUpgradeForm);
