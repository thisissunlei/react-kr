
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

		var upgradeTime = values.upgradeDate.substr(0,10)+" "+values.upgradeTime;
		var  upgradTimestamp = new Date(upgradeTime).getTime();
		
		if(!State.uploadedInfo.url){
			Message.error("升级包地址有误，请重新上传");
			return;
		}
		var params = {
				upgradeType : values.upgradeType,
				url : State.uploadedInfo.url,
				version :values.version,
				versionCode : values.versionCode,
				upgradeTime : upgradTimestamp
			}


		State.NewCreateUpgrade(params);
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
					
					<KrField grid={1/2} 
						name="version" 
						type="text" 
						label="版本名称" 
						style={{width:'252px',margin:'0 35px 5px 0'}}
						requireLabel={true} 

					/>
					
					<Grid >
									<Row>
										<ListGroup>
											<ListGroupItem style={{width:262,padding:0}}>
												<KrField 
													grid={1/2} 
													name="versionCode" 
													type="text" 
													label="版本编码" 
													requireLabel={false} 
													style={{width:'252px'}}
												/>
											</ListGroupItem>
											<ListGroupItem style={{marginTop:32,padding:0,marginRight:25}}></ListGroupItem>
											<ListGroupItem style={{width:262,textAlign:'left'}}>
												<KrField
													name="upgradeDate"
													component="date"
													style={{width:170}}
													requireLabel={true}
													label='升级时间'
													onChange = {this.beginDateChange}
												/>
												<KrField
													name="upgradeTime"
													component="selectTime"
													style={{width:80,marginTop:14,zIndex:10}}
													onChange = {this.beginTimeChange}
													/>
											</ListGroupItem>
										</ListGroup>
									</Row>
								</Grid>
					<p className="upgrade-tip-text">注意：提交之前请确保已经上传升级包</p>
					<p className="upgrade-tip-text-time">考虑到网络原因，尽量不要选距当前时间太近的升级时间</p>
					
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
	
	if(!values.version || /^\s+$/.test(values.version)){
		errors.version = '版本名称为必填项';
	}else if(values.version.length>20){
		errors.version = '版本名称最多20个字符';
	}
	
	if(values.versionCode &&!numberNotZero.test(values.versionCode)){
		errors.versionCode = '版本编码必须为正整数';
	}
	if(!values.upgradeDate||!values.upgradeTime){
		errors.upgradeDate = '请完整选择升级时间';
	}else{
		var upgradeTime = values.upgradeDate.substr(0,10)+" "+values.upgradeTime;
		var upgradTimestamp = new Date(upgradeTime).getTime();
		var nowTime = new Date().getTime();
		if(nowTime+200>upgradTimestamp){
			errors.upgradeDate = '升级时间只能是未来时间';
		}
	}
	
	return errors;
}
export default NewCreateUpgradeForm= reduxForm({
	form: 'NewCreateUpgradeForm',
	validate,
})(NewCreateUpgradeForm);
