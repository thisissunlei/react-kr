
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import isRight from "./images/isRight.svg";
import happy from "./images/happy.svg";
import sad from "./images/sad.svg";
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
	      successZero : false,
	      failedZero : false
	    };
	}
	componentDidMount(){
		let _this = this;
		Store.dispatch(Actions.callAPI('getSuccedOrErrData',""))
	      .then(function(response){
	      	if(response.success.length<1){
	      		_this.setState({
	      			successZero : true
	      		})
	      	}
	      	if(response.failed.length<1){
	      		_this.setState({
	      			failedZero : true
	      		})
	      	}
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
	// 导出excle表格
	exportData=()=>{
		window.location.href=`/api/krspace-finance-web/community/sysDeviceDefinition/upload-data-excel`
	}
	render(){
		let {sucNum,errNum,success,failed,rightfontColor,leftfontColor}=this.state;
		return (
			<div className="upload-img-outer-box">
				<div className="upload-img-box">
					<div className="upload-img-title">
						<img className="upload-img-right" src={isRight}/>
						<span className="upload-img-tip">{sucNum+errNum}台设备图片上传完成</span>
					</div>
					<div className="upload-img-body">
						<Tabs
					        failed={this.state.failed}
					        
					        inkBarStyle = {{background:"#499ef1"}}
					    >
					        <Tab className="upload-img-tab" label={`成功设备（ ${sucNum} ）`} value="a" style={{fontSize:14,fontWeight: "normal",color:leftfontColor?"#499ef1":"#333333",background:"#fff"}} onActive={this.onActive}>
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
										<div 
											style={{display:this.state.successZero?"block":"none",textAlign:"center",height:137,paddingTop:120,}}
										>

											<img className="upload-img-right" src={sad} style={{width:20,verticalAlign:"top"}}/>
											<span style={{color:"#333"}}>很遗憾,一张照片也没传上……</span>
										</div>
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
					        <Tab label={`失败设备（ ${errNum} ）`} value="b" style={{fontSize:14,fontWeight: "normal",color:rightfontColor?"#499ef1":"#333333",background:"#fff"}} onActive={this.onActive}>
					          	<div style={{height:334,marginTop:20,border:" solid 1px #dfdfdf"}} className="upload-img-victory">
						            <div style={{height:334,overflow:"scroll"}}> 
							          	<Table 
							          	exportSwitch={true}
						            	pagination = {false}
						            	displayCheckbox = {false}
						            	style={{margin:0}}
							          	>
											<TableHeader style={{borderTop:"none"}}>
												<TableHeaderColumn style={{fontSize:14}}>社区门编号</TableHeaderColumn>
												<TableHeaderColumn style={{fontSize:14}}>门编号</TableHeaderColumn>
												<TableHeaderColumn style={{fontSize:14}}>智能硬件ID</TableHeaderColumn>
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
										<div 
											style={{display:this.state.failedZero?"block":"none",textAlign:"center",height:137,paddingTop:120,}}
										>
											<img className="upload-img-right" src={happy} style={{width:20,verticalAlign:"top"}}/>
											<span style={{color:"#333"}}>恭喜您，所有照片都上传成功了</span>
										</div>
									</div>
									
										
									<div onClick={this.exportData} style={{fontSize:14,color:"#499ef1",marginTop:10,width:56,cursor: "pointer"}}>导出数据</div>

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
					</div>
					<div className="upload-img-footer"></div>
				</div>
			</div>
		);
	}
}

