
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import isRight from "./images/isRight.svg";
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
	      leftfontColor : true
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
	// 导出Excle表格
	onExport=(values)=>{
		let ids = [];
		if (values.length != 0) {
			values.map((item, value) => {
				ids.push(item.id)
			});
		}
		ids = String(ids);
		var url = `/api/krspace-finance-web/member/member-list-excel?ids=${ids}`
		window.location.href = url;
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
	exportData=()=>{
		console.log("导出");
		window.location.href=`/api-th/krspace-finance-web/community/sysDeviceDefinition/upload-data-excel`
		
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
					          <div style={{borderRight:"solid 1px #dfdfdf",borderLeft:"solid 1px #dfdfdf"}} 
					          	className="upload-img-victory">
					            <Table
					            	onProcessData={(state)=>{
              							return state;
              						}}
					            	pagination = {false}
					            	displayCheckbox={false}
					            >
									<TableHeader >
										<TableHeaderColumn style={{fontSize:14}}>社区</TableHeaderColumn>
										<TableHeaderColumn style={{fontSize:14}}>门编号</TableHeaderColumn>
										<TableHeaderColumn style={{fontSize:14}}>智能硬件ID</TableHeaderColumn>
									</TableHeader>
									<TableBody style={{position:'inherit'}}>
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
					          	<div onClick={this.exportData} style={{fontSize:14,color:"#499ef1",marginTop:10}}>导出数据</div>
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
					          	<div style={{borderRight:"solid 1px #dfdfdf",borderLeft:"solid 1px #dfdfdf"}} 
					          		className="upload-img-victory">
						          	<Table 
						          	exportSwitch={true}
					            	pagination = {false}
					            	displayCheckbox = {false}
						          	>
										<TableHeader >
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
									
								</div>
								<div onClick={this.exportData} style={{fontSize:14,color:"#499ef1",marginTop:10}}>导出数据</div>
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
// export default FinishUploadImgForm = reduxForm({
// 	form: 'FinishUploadImgForm',
	// validate,
	// enableReinitialize: true,
	// keepDirtyOnReinitialize: true,
// })(FinishUploadImgForm);
