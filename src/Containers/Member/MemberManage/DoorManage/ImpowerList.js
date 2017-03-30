
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';

import './index.less';
import {Tabs, Tab } from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
  	ListGroup,
  	ListGroupItem,
	SearchForm,
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
export default class FinishUploadImgForm extends Component{
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
	      selectedIds:[],
	      totleNum : 0
	    };
	}
	componentDidMount(){
		let _this = this;
		let listParams = {
			id : _this.detail.id,
			communityId : _this.detail.communityId
		}
		Store.dispatch(Actions.callAPI('doorCustomerDevice',listParams))
	      .then(function(response){
	      	var totleNum =0;
	      	var componentSelected =[];
	      	for(var i=0;i<response.length;i++){

	      		for(var j =0;j<response[i].deviceList.length;j++){
	      			totleNum++;
	      			if(response[i].deviceList[j].checked){

	      				componentSelected.push(response[i].deviceList[j].id);
	      			}
	      		}
	      	}
	      	console.log("totleNum",totleNum);

	      	_this.setState({
	      		optionsFloor : response,
	      		selectedIds : componentSelected,
	      		totleNum: totleNum,
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
		var newSelecetId = item.id;
		let newArr = _this.state.selectedIds;
		// 被选中
		if(item.checked){
			if(newArr.length==0){
				newArr.push(newSelecetId);
			}else{
				var copyNum = 0;
				for(var i=0;i<newArr.length;i++){
					if(newSelecetId == newArr[i]){
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
				if(newSelecetId == newArr[i]){
					ishave = i;
					newArr.splice(i,1);
				}
			}
		}
		
		_this.setState({
			selectedIds : newArr
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
			// 将每个IDpush进selectedId  办理yuan sh
			
			for(var i=0;i<item.deviceList.length;i++){
				
				item.deviceList[i].checked = true;
				
				newArrEmpty.push(item.deviceList[i].id);
			}
			
			let OriginArr = this.state.selectedIds;
			var newArr = OriginArr.concat(newArrEmpty);
			
			// 去重
			var EArr = [];
			EArr.push(newArr[0]);
			
			for(var i=1;i<newArr.length;i++){
				
				if(EArr.indexOf(newArr[i])==-1){
					EArr.push(newArr[i])
				}
			}
			
			this.setState({
				selectedIds:EArr
			})
		}else{
			let newArrEmpty = [];
			// 将每个IDpush进selectedId  办理yuan sh
			
			for(var i=0;i<item.deviceList.length;i++){
				console.log("item.deviceList[i]",item.deviceList[i]);
				item.deviceList[i].checked = false;
				// 需要去除的
				newArrEmpty.push(item.deviceList[i].id);
			}
			
			let OriginArr = this.state.selectedIds;
			var EmptyArr = [];
			console.log("OriginArr",OriginArr,'newArrEmpty',newArrEmpty);
			for(var i =0;i<OriginArr.length;i++){
				for(var j=0;j<newArrEmpty.length;j++){
					console.log("i",OriginArr[i],"j",newArrEmpty[j]);
					if(OriginArr[i] ==newArrEmpty[j] ){

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
				selectedIds:OriginArr
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
						            <div  style={{height:328,overflow:"scroll",}}>	
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
		var deviceId =this.state.selectedIds;
		
		// 数组去重
		var n = []; 
		n.push(deviceId[0]);
		for(var i = 1; i < deviceId.length; i++) { 
		
			if (deviceId.indexOf(deviceId[i]) == i) n.push(deviceId[i]); 
		} 

		let ids = {deviceIds:n,id:this.detail.id}
		Store.dispatch(Actions.callAPI('doorCustomerGrant',{},ids))
	    .then(function(response){ 	
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
		console.log("this.state.totleNum",this.state.totleNum);
		return (
			<div className="upload-img-outer-box">
				<div className="upload-img-box">
					
					<div className="upload-img-body" style={{width:"100%"}}>
						
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

						<Grid style={{marginTop:30,marginBottom:'4px'}}>
									<Row>
										<ListGroup>
											<ListGroupItem style={{width:171,textAlign:'right',padding:0,paddingRight:15}}>
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
