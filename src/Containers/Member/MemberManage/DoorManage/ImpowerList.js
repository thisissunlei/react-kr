
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';

import './index.less';
import {Tabs, Tab} from 'material-ui/Tabs';
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
} from 'kr-ui';
export default class FinishUploadImgForm extends Component{
	constructor(props) {
	    super(props);
	    this.state = {
	      value: 'a',
	      sucNum : 0,
	      errNum :0,
	      success : '',
	      failed : '',
	      rightfontColor : false,
	      leftfontColor : true,
	      
	    };
	}
	componentDidMount(){
		let _this = this;
		Store.dispatch(Actions.callAPI('getSuccedOrErrData',""))
	      .then(function(response){
	      	
	      	_this.setState({
	      		success : response.success,
	      		failed : response.failed,
	      		sucNum : response.success.length,
	      		errNum : response.failed.length
	      	})
	      }).catch(function(err){
	        Notify.show([{
	          message: err.message,
	          type: 'danger',
	        }])
	     });
	}
	closeUploadImg=()=>{
		let {closeUploadImg} = this.props;
		closeUploadImg && closeUploadImg();
	}
	onActive=()=>{
		this.setState({
			leftfontColor : !this.state.leftfontColor,
			rightfontColor : !this.state.rightfontColor
		})
	}
	renderTab=()=>{
		let optionsFloor = [{label:"2楼",value:["name1","name2"]},{label:"1楼",value:["1","2"]}];

		let list = optionsFloor.map((item,index)=>{
			// let itemValue = item.value;
			// console.log("itemValue",itemValue);
			return(
				<Tab className="upload-img-tab" label={item.label} value="a" style={{fontSize:14,fontWeight: "normal",color:"#499ef1",background:"#fff"}} onActive={this.onActive}>
					          	<div style={{height:328,marginTop:20,border:" solid 1px #dfdfdf"}} className="upload-img-victory">
						            <div  style={{height:328,overflow:"scroll",}}>	
							            <Table
							            	onProcessData={(state)=>{
		              							return state;
		              						}}
							            	pagination = {false}
							            	displayCheckbox={true}
							            	style={{margin:0}}
							            >
											<TableHeader style={{borderTop:"none"}}>
												<TableHeaderColumn style={{fontSize:14}}>社区</TableHeaderColumn>
												<TableHeaderColumn style={{fontSize:14}}>门编号</TableHeaderColumn>
												<TableHeaderColumn style={{fontSize:14}}>智能硬件ID</TableHeaderColumn>
											</TableHeader>
											<TableBody style={{position:'inherit'}} 
							            	>
												{
													item.value.map((item,index)=>{
														return(
															<TableRow displayCheckbox={false} key={index}>

																	<TableRowColumn><span>{item.communityName}</span></TableRowColumn>
																	<TableRowColumn><span>{item.deviceCode}</span></TableRowColumn>
																	<TableRowColumn><span>{item.hardwareId}</span></TableRowColumn>	
																	
															</TableRow>
														)
													})

												}	
											</TableBody>
											<TableFooter></TableFooter>
										</Table>
										
						          	</div>

						          	
									<div onClick={this.exportData} style={{fontSize:14,color:"#499ef1",marginTop:10,width:56,cursor: "pointer"}}>导出数据</div>

								</div>
					          	
					          	<Grid style={{marginTop:30,marginBottom:'4px'}}>
									<Row>
										<ListGroup>
											<ListGroupItem style={{width:255,textAlign:'right',padding:0,paddingRight:15}}>
												<Button  label="确定" type="submit" onClick={this.closeUploadImg}/>
											</ListGroupItem>
											<ListGroupItem style={{width:'171px',textAlign:'left',padding:0,paddingLeft:15}}>
												<Button  label="取消" type="button"  cancle={true} onTouchTap={this.closeUploadImg} />
											</ListGroupItem>
										</ListGroup>					
									</Row>
								</Grid>
								
					        </Tab>
			)
		})	
		return list;	
	}
	render(){
		
		let {sucNum,errNum,success,failed,rightfontColor,leftfontColor}=this.state;
		return (
			<div className="upload-img-outer-box">
				<div className="upload-img-box">
					
					<div className="upload-img-body" style={{width:"100%"}}>
						{
							this.renderTab()
						}
						{/*<Tabs
					        failed={this.state.failed}
					        
					        inkBarStyle = {{background:"#499ef1"}}
					    >
					    
					        <Tab className="upload-img-tab" label='成功设备' value="a" style={{fontSize:14,fontWeight: "normal",color:leftfontColor?"#499ef1":"#333333",background:"#fff"}} onActive={this.onActive}>
					          	<div style={{height:328,marginTop:20,border:" solid 1px #dfdfdf"}} className="upload-img-victory">
						            <div  style={{height:328,overflow:"scroll",}}>	
							            <Table
							            	onProcessData={(state)=>{
		              							return state;
		              						}}
							            	pagination = {false}
							            	displayCheckbox={false}
							            	style={{margin:0}}
							            >
											<TableHeader style={{borderTop:"none"}}>
												<TableHeaderColumn style={{fontSize:14}}>社区</TableHeaderColumn>
												<TableHeaderColumn style={{fontSize:14}}>门编号</TableHeaderColumn>
												<TableHeaderColumn style={{fontSize:14}}>智能硬件ID</TableHeaderColumn>
											</TableHeader>
											<TableBody style={{position:'inherit'}} 
							            	>
												{
													success && success.map((item,index)=>{
														return(
															<TableRow displayCheckbox={false} key={index}>

																	<TableRowColumn><span>{item.communityName}</span></TableRowColumn>
																	<TableRowColumn><span>{item.deviceCode}</span></TableRowColumn>
																	<TableRowColumn><span>{item.hardwareId}</span></TableRowColumn>	
																	
															</TableRow>
															)
													})
												}	
											</TableBody>
											<TableFooter></TableFooter>
										</Table>
										
						          	</div>

						          	
									<div onClick={this.exportData} style={{fontSize:14,color:"#499ef1",marginTop:10,width:56,cursor: "pointer"}}>导出数据</div>

								</div>
					          	
					          	<Grid style={{marginTop:30,marginBottom:'4px'}}>
									<Row>
										<ListGroup>
											<ListGroupItem style={{width:255,textAlign:'right',padding:0,paddingRight:15}}>
												<Button  label="确定" type="submit" onClick={this.closeUploadImg}/>
											</ListGroupItem>
											<ListGroupItem style={{width:'171px',textAlign:'left',padding:0,paddingLeft:15}}>
												<Button  label="取消" type="button"  cancle={true} onTouchTap={this.closeUploadImg} />
											</ListGroupItem>
										</ListGroup>					
									</Row>
								</Grid>
								
					        </Tab>
					        <Tab label='失败设备' value="b" style={{fontSize:14,fontWeight: "normal",color:rightfontColor?"#499ef1":"#333333",background:"#fff"}} onActive={this.onActive}>
					          	<div style={{height:334,marginTop:20,border:" solid 1px #dfdfdf"}} className="upload-img-victory">
						            <div style={{height:334,overflow:"scroll"}}> 
							          	<Table 
							          	exportSwitch={true}
						            	pagination = {false}
						            	displayCheckbox = {false}
						            	style={{margin:0}}
							          	>
											<TableHeader style={{borderTop:"none"}}>
												<TableHeaderColumn style={{fontSize:14}}>门编号</TableHeaderColumn>
												<TableHeaderColumn style={{fontSize:14}}>类型</TableHeaderColumn>
												<TableHeaderColumn style={{fontSize:14}}>平面图位置</TableHeaderColumn>
												<TableHeaderColumn style={{fontSize:14}}>硬件智能ID</TableHeaderColumn>
											</TableHeader>
											<TableBody style={{position:'inherit'}}>
												
												{
													failed && failed.map((item,index)=>{
														return(
															<TableRow displayCheckbox={false} key={index}>
																	<TableRowColumn><span>{item.communityName}</span></TableRowColumn>
																	<TableRowColumn><span>{item.deviceCode}</span></TableRowColumn>
																	<TableRowColumn><span>{item.hardwareId}</span></TableRowColumn>
																	
															</TableRow>
															)
													})
												}
											</TableBody>
											<TableFooter></TableFooter>
										</Table>
										
									</div>
						        </div>
						        
					          	<Grid style={{marginTop:30,marginBottom:'4px'}}>
									<Row>
										<ListGroup>
											<ListGroupItem style={{width:255,textAlign:'right',padding:0,paddingRight:15}}>
												<Button  label="确定" type="submit" onClick={this.closeUploadImg} />
											</ListGroupItem>
											<ListGroupItem style={{width:'171px',textAlign:'left',padding:0,paddingLeft:15}}>
												<Button  label="取消" type="button"  cancle={true} onTouchTap={this.closeUploadImg} />
											</ListGroupItem>
										</ListGroup>					
									</Row>
								</Grid>
					        </Tab>
					    </Tabs>
					    */}
					</div>
					<div className="upload-img-footer"></div>
				</div>
			</div>
		);
	}
}

