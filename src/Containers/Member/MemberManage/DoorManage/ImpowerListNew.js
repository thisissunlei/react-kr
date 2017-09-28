
import React, { PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm} from 'redux-form';
import {Actions,Store} from 'kr/Redux';

import './index.less';
import {Tabs, Tab } from 'material-ui/Tabs';
import {
	Grid,
	Row,
	Button,
	Notify,
  	ListGroup,
  	ListGroupItem,
	Message,
	Table,
	TableHeader,
	TableHeaderColumn,
	TableBody,
	TableFooter,
	TableRow,
	TableRowColumn,
	Tooltip,
} from 'kr-ui';
import {Http,ShallowEqual} from 'kr/Utils';
import SearchImpowerListForm from "./SearchImpowerListForm";


export default class FinishUploadImgForm extends React.Component{
	constructor(props) {
	    super(props);
	    this.detail = this.props.detail;
	    this.state = {
	      value: 'a',
	      sucNum : 0,
	      errNum :0,
	      success : '',
	      failed : '',
	      rightfontColor : false,
	      leftfontColor : true,
	      responseItems:[],
	      devices : [],
	      floor : '',
	      doorCode:'',
	      initDevices:[]
	    };
	}
	componentDidMount(){
		let _this = this;
		let params={
			id : _this.detail.id,
			communityId : _this.detail.communityId
		}
		this.getList(params);
	}


	getList=(params)=>{
		let _this = this;
		Http.request('doorCustomerDevice',params).then(function(response){
			var responseP = response;
	      	
	      	var devicesT = []
	      	for(var i=0;i<responseP.length;i++){

	      		
	      			
      			if(responseP[i].checked){
      				devicesT.push({
      					deviceId: responseP[i].id,
      					isIotDevice: responseP[i].iotDevice
      				})

      			}
	      		
	      	}
	      	_this.setState({

	      		responseItems : response,
	      		devices : devicesT,
	      		initDevices : devicesT

	      	})
	      }).catch(function(err){
	        Notify.show([{
	          message: err.message,
	          type: 'danger',
	        }])
	     });

	}

	getListSearch=(params)=>{
		let _this = this;
		Http.request('doorCustomerDevice',params).then(function(response){
			var responseP = response;
	      	
	      	var devicesT = []
	      	for(var i=0;i<responseP.length;i++){
      			if(responseP[i].checked){
      				devicesT.push({
      					deviceId: responseP[i].id,
      					isIotDevice: responseP[i].iotDevice
      				})

      			}
	      	}
	      	_this.setState({
	      		responseItems : response,
	      	})
	      }).catch(function(err){
	        Notify.show([{
	          message: err.message,
	          type: 'danger',
	        }])
	     });

	}

	onActive=()=>{
		this.setState({
			leftfontColor : !this.state.leftfontColor,
			rightfontColor : !this.state.rightfontColor
		})
	}



	selectInput=(item)=>{
		item.checked = !item.checked;
		let _this =this;
		var newSelecetId = {
			deviceId:item.id,
			isIotDevice : item.iotDevice
		}

		let newArr = _this.state.initDevices;
		console.log("newArr",newArr);
		// 被选中
		if(item.checked){
			if(newArr.length==0){
				newArr.push(newSelecetId);
			}else{
				var copyNum = 0;
				for(var i=0;i<newArr.length;i++){
					if(ShallowEqual(newSelecetId,newArr[i])){
						copyNum++;
					}
				}
				if(copyNum==0){
					newArr.push(newSelecetId);
				}
			}
		//不被选中，剔除
		}else{
			for(var i=0;i<newArr.length;i++){
				var ishave;
				if(ShallowEqual(newSelecetId,newArr[i])){
					ishave = i;
					newArr.splice(i,1);
				}
			}
		}
		_this.setState({
			devices : newArr
		})
	}

	// 渲染Input
	renderInputs=(item)=>{


		let _this = this;

		if(item.checked){

			return(
				<input type='checkbox' onChange={_this.selectInput.bind(this,item)} checked="checked"/>
			)

		}else{
			return(
				<input type='checkbox' onChange={_this.selectInput.bind(this,item)}/>
			)
		}

	}

	selectAll=(item)=>{
		let  deviceList = this.state.responseItems;
		let OriginArr = this.state.initDevices;
		var newItemsData = this.state.responseItems;
		let newArrEmpty = [];
		// 将每个IDpush进devices
		for(var i=0;i<deviceList.length;i++){
			// 需要去除的
			newArrEmpty.push({
						deviceId:deviceList[i].id,
						isIotDevice : deviceList[i].iotDevice
					});
		}
		if(item.target.checked){
			
			var newArr = OriginArr.concat(newArrEmpty);

			// 去重
			var EArr = [newArr[0]];

			for(var i=1;i<newArr.length;i++){

				var num = 0;
				
				for(var j=0;j<EArr.length;j++){
					if(ShallowEqual(EArr[j],newArr[i])){
						num++
					}
				}
				if(num==0){
					EArr.push(newArr[i])
				}
			}
			
			for(var i=0;i<newItemsData.length;i++){
				newItemsData[i].checked = true;
			}
			this.setState({
				devices:EArr,
				responseItems : newItemsData
			})
		}else{
			
			var EmptyArr = [];
			for(var i =0;i<OriginArr.length;i++){
				for(var j=0;j<newArrEmpty.length;j++){
					
					if(ShallowEqual(OriginArr[i],newArrEmpty[j])){

						OriginArr.splice(i,1);
					}

				}
			}
			
			for(var i=0;i<newItemsData.length;i++){
				newItemsData[i].checked = false;
			}
			this.setState({
				devices:OriginArr,
				responseItems:newItemsData
			})
		}

	}


	// 渲染Tab
	renderTab=()=>{
		let _this =this;
		const styles = {
		  headline: {
		    fontSize: 24,
		    paddingTop: 16,
		    marginBottom: 12,
		    fontWeight: 400,
		  },
		};
		let {responseItems} = this.state;
		let dom = responseItems.map(function(item,index){

												
			return(
				<TableRow displayCheckbox={false} key={index}>
						<TableRowColumn>
						{

							_this.renderInputs(item)
						}


						</TableRowColumn>

						<TableRowColumn>

							{
								!item.doorCode?<span>-</span>:<div style={{paddingTop:5}} className='financeDetail-hover'><span style={{display:"inline-block",width:"100%",overflow:"hidden",textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.doorCode}</span><Tooltip offsetTop={5} place='top'>{item.doorCode}</Tooltip></div>
							}

						</TableRowColumn>
						<TableRowColumn style={{overflow:"hidden"}}>

							{
								!item.doorType?<span>-</span>:<span>{item.doorType}</span>
							}
						</TableRowColumn>
						<TableRowColumn style={{overflow:"hidden"}}>

							{
								!item.roomName?<span>-</span>:<span>{item.roomName}</span>
							}
						</TableRowColumn>
						<TableRowColumn style={{overflow:"hidden"}}>

							{
								!item.floor?<span>-</span>:<span>{item.floor}</span>
							}
						</TableRowColumn>
						<TableRowColumn >
							{
								!item.hardwareId?<span>-</span>:<div style={{paddingTop:5}} className='financeDetail-hover'><span style={{display:"inline-block",width:"100%",overflow:"hidden",textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.hardwareId}</span><Tooltip offsetTop={5} place='top'>{item.hardwareId}</Tooltip></div>

							}
						</TableRowColumn>
				</TableRow>
			)
		})

		return dom;

	}

	// 关闭窗口
	closeImpoerList=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}

	// 确认授权
	impowerToCustomer=()=>{
		let _this =this;
		var devicesT =this.state.devices;
		if(devicesT.length>1){
			// 数组去重
			var n = [devicesT[0]];
			for(var i = 1; i < devicesT.length; i++) {
				var num = 0
				for(var j=0;j<n.length;j++){
					if(ShallowEqual(devicesT[i],n[j])){
						num++
					}
				}
				if(num==0){
					n.push(devicesT[i]);
				}
			}
		}else{
			var n =[];
		}
		
		var params = {
			id:_this.detail.id,
			deviceIds:JSON.stringify(devicesT)
		}

		this.setState({
			initDevices:params.deviceIds,
			devices : params.deviceIds
		})

 
		Http.request('doorCustomerGrant',{},params).then(function(response){
		      	_this.closeImpoerList();
		      	Message.success("操作成功");

	    }).catch(function(err){
	        Notify.show([{
	          message: err.message,
	          type: 'danger',
	        }])
	    });
	}


	onChangeFloor=(floorParam)=>{
		this.setState({
			floor: floorParam
		})
		let _this = this;
		let params={
			id : _this.detail.id,
			communityId : _this.detail.communityId,
			floor : floorParam,
			doorCode: _this.state.doorCode
		}
		this.getListSearch(params);
	}

	onSearchDoorCode=(doorCodeParams)=>{
		this.setState({
			doorCode: doorCodeParams
		})
		let _this = this;
		let params={
			id : _this.detail.id,
			communityId : _this.detail.communityId,
			floor : _this.state.floor,
			doorCode:   doorCodeParams
		}
		this.getListSearch(params);

	}

	render(){

		let {sucNum,errNum,success,failed,rightfontColor,leftfontColor}=this.state;

		return (
			<div className="upload-img-outer-box" style={{padding:30,height:"100%",boxSizing:"border-box"}}>
				<SearchImpowerListForm 
					detail={this.detail} 
					onChangeFloor={this.onChangeFloor}
					onSearchDoorCode={this.onSearchDoorCode}
				/>
				<div className="upload-img-box" style={{padding:"0 30px",height:"90%"}}>

					<div className="upload-img-body" style={{width:"100%",height:"90%"}}>

					    <div style={{height:"100%",marginTop:20,border:" solid 1px #dfdfdf"}} className="upload-img-victory">
				            <div  style={{height:"100%",overflow:"scroll",}} className="impower-list">
					            <Table
					            	onProcessData={(state)=>{
              							return state;
              						}}

					            	pagination = {false}
					            	displayCheckbox={false}
					            	style={{margin:0}}
					            	displayCheckbox={false}

					            >
									<TableHeader style={{borderTop:"none"}}>


										<TableHeaderColumn style={{fontSize:14,width:"5%"}}>
											<input type='checkbox' onChange={this.selectAll.bind(this)} />

										</TableHeaderColumn>
										<TableHeaderColumn style={{fontSize:14,width:"20%"}}>屏幕展示标题</TableHeaderColumn>
										<TableHeaderColumn style={{fontSize:14,width:"15%"}}>类型</TableHeaderColumn>
										<TableHeaderColumn style={{fontSize:14,width:"18%"}}>平面图位置</TableHeaderColumn>
										<TableHeaderColumn style={{fontSize:14,width:"9%"}}>楼层</TableHeaderColumn>
										<TableHeaderColumn style={{fontSize:14,width:"32%"}}>智能硬件ID</TableHeaderColumn>
									</TableHeader>
									<TableBody style={{position:'inherit'}}>
										{
											this.renderTab()
										}
									</TableBody>
									<TableFooter></TableFooter>
								</Table>

				          	</div>

						</div>

					</div>
					<div className="upload-img-footer">

						<Grid style={{marginTop:31,marginBottom:'4px'}}>
									<Row>
										<ListGroup>
											<ListGroupItem style={{width:"50%",textAlign:'right',padding:0,paddingRight:15}}>
												
												<Button  label="授权" type="submit" onClick={this.impowerToCustomer}/>

												
											</ListGroupItem>
											<ListGroupItem style={{width:171,textAlign:'left',padding:0,paddingLeft:15}}>
												<Button  label="取消" type="button"  cancle={true} onTouchTap={this.closeImpoerList} />
											</ListGroupItem>
										</ListGroup>
									</Row>
								</Grid>

					</div>
				</div>
			</div>
		);
	}
}
