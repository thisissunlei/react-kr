import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {KrField,Grid,Row,Button,ListGroup,ListGroupItem,Loading,Table,TableHeader,TableHeaderColumn,TableBody
	,TableRow,TableRowColumn,TableFooter,Tooltip,Message,Dialog} from 'kr-ui';
import {
	Toggle
}from 'material-ui';
import './index.less';
import {Http} from 'kr/Utils';

import State from './State';
import {
	observer
} from 'mobx-react';
@ observer
export default class EquipmentSearch extends React.Component{
	constructor(props){
		super(props);
		this.state={
			searchEquipmentList:[],
			showLoading : false
		}
	}

	componentDidMount(){

		
		this.getUnusedEquipmentFun({},"noAlertMsg");
	}

	getUnusedEquipmentFun =(param,str)=>{
		
		
		let _this = this;
		let {serialNo} = this.props;
		let paramOld = {parentSerialNo : serialNo,forceRefresh : false};
		let newParam = Object.assign(paramOld,param);
		Http.request('findNewSonEquipment', newParam).then(function(response) {
			_this.setState({
				searchEquipmentList : response.items,
				showLoading : false
			})

			if(Object.keys(param).length !== 0){
				if(str == "alertMsg"){
					if(param.forceRefresh){
						Message.warntimeout("强制刷新成功",'success');
					}else{
						Message.warntimeout("刷新成功",'success');
						
					}
				}
				
			}
			
		}).catch(function(err) {
			Message.warntimeout("刷新成功",'error');
			
			_this.setState({
				showLoading : false
			})
		});
	}
	


	closeDialog=()=>{
		State.openSearchEquipment= false;
	}


	addEquipmentFun=(thisParams,item)=>{
		let {registEquipment} = this.props;
		registEquipment && registEquipment(thisParams.deviceId);
	}


	//发现设备列表强制删除
	deleteEquipmentFun=(thisP)=>{
		let {serialNo} =this.props;
		let _this =this;
		var urlParams = {serialNo : thisP.serialNo}
		Http.request('deleteFindSonEquipment',{},urlParams).then(function(response) {
			
			Message.warntimeout("强制删除设备成功",'success');
			var param = {date:new Date()}
			_this.getUnusedEquipmentFun(param,"noAlertMsg");
			

		}).catch(function(err) {
			Message.warntimeout(err.message,'error');
		});
	}


	//注册设备
	registEquipmentFun=(thisP)=>{
		
		let _this =this;
		var urlParams = {serialNo : thisP.serialNo}
		Http.request('regesterSonEquipment',{},urlParams).then(function(response) {

			Message.warntimeout("注册设备成功",'success');
			State.freshPageReturn();
			var param = {date:new Date()}
			_this.getUnusedEquipmentFun(param,"noAlertMsg");

			_this.setState({
				itemDetail : response
			},function(){
				State.openEditDialog = true;
				let {registeEquipment} = _this.props;
				registeEquipment && registeEquipment(response);
			})

		}).catch(function(err) {
			Message.warntimeout(err.message,'error');
		});
	}

	deviceTypeOptionsReturn=(param)=>{
		var deviceOptions = [
			{
				label : "开关",value : "SWITCHER"
			},{
				label : "空调",value : "AIR_CONDITION"
			},{
				label : "空气质量仪",value : "AIR_SENSOR"
			},{
				label : "温湿度计",value : "HUMITURE_SENSOR"
			},{
				label : "人体感应器",value : "BODY_SENSOR"
			}
		]
		for (var i=0;i<deviceOptions.length;i++){
			if(param == deviceOptions[i].value){
				return  deviceOptions[i].label
			}
		}
	
		
	}

	renderTableBody=(searchEquipmentList)=>{
		let _this = this;
		var search_equipment_list = searchEquipmentList;
		var DOM_list = search_equipment_list.map(function(item,index){
			return(
				<div className="table-item" key={index}>
					<div  className="table-item-index">{item.localNo}</div>
					<div  className="table-item-index">{
						_this.deviceTypeOptionsReturn(item.deviceType)
					}</div>
					<div className="table-item-index"> 
						<div  className="table-item-last" onClick={_this.registEquipmentFun.bind(this,item)}>注册设备</div>
						<div  className="table-item-last" onClick={_this.deleteEquipmentFun.bind(this,item)}>强制删除</div>
					</div>
				</div>
			)
		});
		return DOM_list;
	}
	freshPage=()=>{
		var param = {date: new Date(),forceRefresh:false}
		this.getUnusedEquipmentFun(param,"alertMsg")
	}

	forceRefresh=()=>{
		this.setState({
			showLoading :true 
		})
		this.openForceFreshDialogFun();
		var param = {date: new Date(),forceRefresh:true}
		this.getUnusedEquipmentFun(param,"alertMsg")
	}

	openForceFreshDialogFun=()=>{
		State.openForceFreshDialog = ! State.openForceFreshDialog
	}

	render(){
		let {searchEquipmentList,showLoading} = this.state;
		return (
			<div className="find-son-equipment-box">

				{showLoading &&<div className="loading-box">
					<Loading/>
				</div>}
				<div style={{padding:"30px 0 0 50px"}}>
					<img src={require("./images/closeIMG.svg")} className="close-dialog" onClick={this.closeDialog}/>
				</div>
				<div className="son-equipment-btn-box-find">
					<div className="btn" onClick={this.freshPage}>刷新</div>
					<div className="btn" onClick={this.openForceFreshDialogFun}>强制刷新</div>
				</div>

				<div className="detail-list-equipment  find-son-equipment">
					
				
			        <div className="table-box">
			        	<div className="table-header-find-son">
			        		<div className="header-item">局部编号</div>
			        		<div className="header-item">设备类型</div>
			        		<div className="header-item">操作</div>
			        	</div>
			        	<div className="table-body">
			        		{
			        			this.renderTableBody(searchEquipmentList)
			        		}
			        	</div>
			        </div>
				</div>
				<div className="btn-div">
					<Button label="关闭" onTouchTap={this.closeDialog}/>
				</div>
				<Dialog
			          title="强制刷新确定"
			          open={State.openForceFreshDialog}
			          onClose={this.openForceFreshDialogFun}
			          contentStyle={{width:443,height:236}}
			        >
			          <div style={{marginTop:45}}>
			            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>强制刷新会导致子设备上报信息较慢，确定刷新吗？</p>
			            <Grid style={{marginTop:60,marginBottom:'4px'}}>
			                  <Row>
			                    <ListGroup>
			                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
			                        <Button  label="确定" type="submit" onClick={this.forceRefresh} />
			                      </ListGroupItem>
			                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
			                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.openForceFreshDialogFun} />
			                      </ListGroupItem>
			                    </ListGroup>
			                  </Row>
			                </Grid>
			          </div>
			        </Dialog>
				
		  	</div>
		);
	}
}











