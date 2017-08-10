
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
	      optionsFloor:[],
	      totleNum : 0,
	      devices : []
	    };
	}
	componentDidMount(){
		let _this = this;
		let listParams = {
			id : _this.detail.id,
			communityId : _this.detail.communityId
		}
		Http.request('doorCustomerDevice',listParams).then(function(response){
	      	
			var responseP = response;
	      	var totleNum =0;
	      	var devicesT = []
	      	for(var i=0;i<responseP.length;i++){

	      		for(var j =0;j<responseP[i].deviceList.length;j++){
	      			totleNum++;
	      			if(responseP[i].deviceList[j].checked){

	      				devicesT.push({
	      					deviceId: responseP[i].deviceList[j].id,
	      					isIotDevice: responseP[i].deviceList[j].isIotDevice
	      				})

	      			}
	      		}
	      	}
	      	_this.setState({
	      		optionsFloor : response,
	      		totleNum: totleNum,
	      		devices : devicesT
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
			isIotDevice : item.isIotDevice
		}

		let newArr = _this.state.devices;
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

	selectAll=(item,e)=>{

		if(e.target.checked){
			let newArrEmpty = [];
			// 将每个IDpush进devices

			for(var i=0;i<item.deviceList.length;i++){

				item.deviceList[i].checked = true;

				newArrEmpty.push({

							deviceId:item.deviceList[i].id,
							isIotDevice : item.deviceList[i].isIotDevice
						
						});
			}

			let OriginArr = this.state.devices;
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

			


			this.setState({
				devices:EArr
			})
		}else{
			let newArrEmpty = [];
			// 将每个IDpush进devices

			for(var i=0;i<item.deviceList.length;i++){
				item.deviceList[i].checked = false;
				// 需要去除的
				newArrEmpty.push({
							deviceId:item.deviceList[i].id,
							isIotDevice : item.deviceList[i].isIotDevice
						});
			}

			let OriginArr = this.state.devices;
			var EmptyArr = [];
			for(var i =0;i<OriginArr.length;i++){
				for(var j=0;j<newArrEmpty.length;j++){
					if(ShallowEqual(OriginArr[i],newArrEmpty[j])){

						EmptyArr.push(i);
					}

				}
			}

			EmptyArr.sort(function(a,b){
				return b-a
			});
			for(var p=0;p<EmptyArr.length;p++){
				OriginArr.splice(EmptyArr[p],1);
			}
			this.setState({
				devices:OriginArr
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
		let {optionsFloor} = this.state;

		let a = optionsFloor.map(function(item,index){

				return(
				<Tab className="upload-img-tab" label={`${item.floorNum}楼(${item.deviceCount})`} key={index} value="a" style={{fontSize:14,fontWeight: "normal",color:"#333333",background:"#fff"}} >
						<div style={{height:328,marginTop:20,border:" solid 1px #dfdfdf"}} className="upload-img-victory">
						            <div  style={{height:328,overflow:"scroll",}} className="impower-list">
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


												<TableHeaderColumn style={{fontSize:14}}>
													<input type='checkbox' onChange={_this.selectAll.bind(_this,item)} />

												</TableHeaderColumn>
												<TableHeaderColumn style={{fontSize:14}}>门编号</TableHeaderColumn>
												<TableHeaderColumn style={{fontSize:14}}>类型</TableHeaderColumn>
												<TableHeaderColumn style={{fontSize:14}}>平面图位置</TableHeaderColumn>
												<TableHeaderColumn style={{fontSize:14}}>智能硬件ID</TableHeaderColumn>
											</TableHeader>
											<TableBody style={{position:'inherit'}}
							            	>
												{
													item.deviceList && item.deviceList.map((item,index)=>{
														return(
															<TableRow displayCheckbox={false} key={index}>
																	<TableRowColumn>
																	{

																		_this.renderInputs(item)
																	}


																	</TableRowColumn>

																	<TableRowColumn>

																		{
																			!item.doorCode?<span>-</span>:<div style={{paddingTop:5}} className='financeDetail-hover'><span style={{display:"inline-block",width:100,overflow:"hidden",textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.doorCode}</span><Tooltip offsetTop={5} place='top'>{item.doorCode}</Tooltip></div>
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
																	<TableRowColumn >
																		{
																			!item.hardwareId?<span>-</span>:<div style={{paddingTop:5}} className='financeDetail-hover'><span style={{display:"inline-block",width:"100%",overflow:"hidden",textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.hardwareId}</span><Tooltip offsetTop={5} place='top'>{item.hardwareId}</Tooltip></div>

																		}
																	</TableRowColumn>

															</TableRow>
															)
													})
												}
											</TableBody>
											<TableFooter></TableFooter>
										</Table>

						          	</div>

								</div>
				</Tab>
				)
			})

			return a;

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
		

		let ids = {deviceIds:n,id:this.detail.id}
		Http.request('doorCustomerGrant',{},ids).then(function(response){
		      	_this.closeImpoerList();
		      	Message.success("操作成功");

	    }).catch(function(err){
	        Notify.show([{
	          message: err.message,
	          type: 'danger',
	        }])
	    });
	}

	render(){

		let {sucNum,errNum,success,failed,rightfontColor,leftfontColor,totleNum}=this.state;
		return (
			<div className="upload-img-outer-box">
				<div className="upload-img-box">

					<div className="upload-img-body" style={{width:"100%",height: 387}}>

						<Tabs
					        failed={this.state.failed}

					        inkBarStyle = {{background:"#499ef1"}}
					    >
						    {
								this.renderTab()
							}

					    </Tabs>

					</div>
					<div className="upload-img-footer">

						<Grid style={{marginTop:31,marginBottom:'4px'}}>
									<Row>
										<ListGroup>
											<ListGroupItem style={{width:"50%",textAlign:'right',padding:0,paddingRight:15}}>
												{
													this.state.totleNum==0?<div className="button-myself">授权</div>:<Button  label="授权" type="submit" onClick={this.impowerToCustomer}/>

												}
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
