
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';

import {
	Message,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
} from 'kr-ui';

import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer


class BtnBox extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			
		}
	}
	
	

	onCancle=()=>{
		let {onCancle} = this.props;
		onCancle && onCancle();
	}

	getDoorPassWord=()=>{
		State.showOpretion=false
		State.getPassword();
	}

	//升级
	upgrade=(thisP,value,itemData)=>{
		State.showOpretion=false
		this.upgradeDialogFun();
	}

	//控制升级窗口是否显示
	upgradeDialogFun=()=>{
		State.upgradeDialog = !State.upgradeDialog;
	}

	//点击清空缓存
	clearCache=()=>{
		
		State.showOpretion=false
		State.openClearCached = !State.openClearCached;

	}



	//点击断开重连
	connectAgain=()=>{
		State.showOpretion=false
		State.openConnectAgian = !State.openConnectAgian;

	}


	openDoorInline=()=>{
		State.showOpretion=false
		State.openDoorOnlineAction();
	}

	deviceCache=()=>{
		State.showOpretion=false;
		let _this =this;
		var urlParamsT = {
							deviceId:State.itemDetail.deviceId,
							lastCardNo:'',
							limit:50,
						}
		Http.request('getEquipmentCacheURL',urlParamsT).then(function(response) {
				
			_this.openEquipmentCacheFun();

		}).catch(function(err) {
			Message.error(err.message);
		});
		

	}

	openEquipmentCacheFun=()=>{
		State.openEquipmentCache = !State.openEquipmentCache;
	}
	


	//刷新H5页面
	freshH5=()=>{
		State.showOpretion=false;
		State.openFreshHTMLDialog = !State.openFreshHTMLDialog;

	}


	//恢复设备出厂设置
	resetEquipmentOrigin=()=>{
		State.showOpretion=false;
		State.resetEquipmentDialog = !State.resetEquipmentDialog;
	}



	//获取管理员密码
	getManagerPsd=()=>{
		State.showOpretion=false;
		this.openManagePsdFun();
	}

	//管理员密码出口
	openManagePsdFun=()=>{
		State.openManagePsd = !State.openManagePsd;
	}

	

	//重启APP
	restartAPP=()=>{
		console.log("重启APP");
		State.showOpretion=false
		State.openRestartAPPDialog = !State.openRestartAPPDialog;
	}


	//重启设备系统
	restartSystems=()=>{
		// console.log("重启设备系统");
		State.openRestartSystemsDialog=!State.openRestartSystemsDialog;
		State.showOpretion=false

	}

	synchronizingPsw=()=>{
		State.showOpretion=false;
		State.synchronizingPswDialog = true;
	}





	
	
	
	render(){
		var params = State.EquipmentPassword+'';
		console.log("params",params);

		return(
			<div style={{paddingTop:30}}>
			            	<Grid style={{marginBottom:'4px'}}>
			            		<Row style={{marginBottom:30,paddingLeft:10}}>
				                    <ListGroup>
				                    	
				                      	<ListGroupItem style={{textAlign:'right',padding:0,paddingRight:50}}>
				                        	<Button  label="清空设备缓存" type="button" onClick={this.clearCache} cancle={true}  style={{width:115}}/>
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'left',padding:0,paddingRight:50}}>
				                        	<Button  label="查看设备缓存" type="button"  cancle={true} onTouchTap={this.deviceCache} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'left',padding:0,paddingRight:50}}>
				                        	<Button  label="刷新H5" type="button"  cancle={true} onTouchTap={this.freshH5} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'left',padding:0}}>
				                        	<Button  label="同步口令" type="button"  cancle={true} onTouchTap={this.synchronizingPsw} style={{width:115}}/>
				                      	</ListGroupItem>
				                    </ListGroup>
			                  	</Row>
			                  	<Row style={{marginBottom:30,paddingLeft:10}}>
				                    <ListGroup>
				                    	<ListGroupItem style={{textAlign:'left',padding:0,paddingRight:50}}>
				                        	<Button  label="断开重连" type="button"  cancle={true} onTouchTap={this.connectAgain} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'right',padding:0,paddingRight:50}}>
				                        	<Button  label="远程开门" type="button" onClick={this.openDoorInline} cancle={true} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'left',padding:0,paddingRight:50}}>
				                        	<Button  label="获取口令" type="button"  cancle={true} onTouchTap={this.getDoorPassWord} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'right',padding:0}}>
				                        	<Button  label="获取管理员密码" type="button" onClick={this.getManagerPsd} cancle={true} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	
				                    </ListGroup>
			                  	</Row>
			                  	<Row style={{marginBottom:30,paddingLeft:10}}>
				                    <ListGroup>
				                      	
				                      	<ListGroupItem style={{textAlign:'left',padding:0,paddingRight:50}}>
				                        	<Button  label="重启设备APP" type="button"  cancle={true} onTouchTap={this.restartAPP} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'left',padding:0,paddingRight:50}}>
				                        	<Button  label="重启设备系统" type="button"  cancle={true} onTouchTap={this.restartSystems} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'left',padding:0,paddingRight:50}}>
				                        	<Button  label="恢复设备出厂设置" type="button"  cancle={true} onTouchTap={this.resetEquipmentOrigin} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	<ListGroupItem style={{textAlign:'left',padding:0}}>
				                        	<Button  label="升级" type="button"  cancle={true} onTouchTap={this.upgrade} style={{width:115}}/>
				                      	</ListGroupItem>
				                      	
				                    </ListGroup>
			                  	</Row>
			                  	<Row>
				                    <ListGroup>
				                      <ListGroupItem style={{width:650,textAlign:'center',padding:0}}>
				                        <Button  label="关闭" type="button"   onTouchTap={this.onCancle} style={{width:115}}/>
				                      </ListGroupItem>
				                    </ListGroup>
				                </Row>
			                </Grid>
			          </div>
		);
	}
}
const validate = values=>{
	const errors={};
	// if(!values.communityId){
	// 	errors.communityId = '社区名称为必填项';
	// }
	return errors;
}
export default BtnBox = reduxForm({
	form: 'BtnBox',
	validate,
})(BtnBox);
