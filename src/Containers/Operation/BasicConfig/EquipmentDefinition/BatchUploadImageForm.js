import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	UploadImage,
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
	Dialog,
	Notify
} from 'kr-ui';
import "./index.less";
class BatchUploadImageForm extends Component{
	constructor(props,context){
		super(props,context);
		this.state={
			picUrl:'',
			selectedCommunitys:[],
			batchUploadNum :false,
			openSchedule : false,
			submitValues : '',
			submitNum : 0,
			innerBoxWidth :0,
			uploadedNum:0,
			totalNum:0,
			submitValuesParams:{},
			requestURI:"postEquipmentImg",
			communitys: []
		}
	}
	// 首次加载获取社区列表
	componentDidMount(){
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	closeBatchUpload=()=>{
		let {closeBatchUpload}=this.props;
		closeBatchUpload && closeBatchUpload();
	}
	openFinishTable=()=>{
		const {openFinishTable}=this.props;
		openFinishTable && openFinishTable();
	}
	
	// 提交(获取总共上传社区个数)
	onSubmit=(values)=>{
		let _this =this;
		if(!values.uploadImage){
			const {tipOpen} = this.props;
			tipOpen && tipOpen();
			return
		};
		if(!values.communitys){
			const {tipCommunityOpen} = this.props;
			tipCommunityOpen && tipCommunityOpen();
			return
		};
		this.setState({
			submitValuesParams : values,
			selectedCommunitys : values.communitys,
			picUrl : values.uploadImage
		})
		_this.getRealEquipment(values);
	}
	// 获取真实设备数
	getRealEquipment=(values)=>{
		let _this =this;
		let valuesParams = {
			deviceId:values.communitys
		}
		Store.dispatch(Actions.callAPI('getEquipmentNum',{},valuesParams))
	      .then(function(response){
	      	if(response.length == 0){
	      		const {seleletZero} = _this.props;
	      		seleletZero && seleletZero();
	      		return;
	      	}
	      	_this.setState({
	      		submitCommunitys : response,
	      		submitNum : response.length,
	      		totalNum : response.length
	      	},function(){
	      		this.openBatchUploadNum();
	      	})

	      }).catch(function(err){
	        Notify.show([{
	          message: err.message,
	          type: 'danger',
	        }])
	    });
	    
	}
	// 是否打开确定上传窗口
	openBatchUploadNum=()=>{
		this.setState({
			batchUploadNum : !this.state.batchUploadNum
		})
	}
	// 关闭进度条
	closeSchedule=()=>{
		this.setState({
			openSchedule : false
		})
	}
	// 是否打开进度条
	openScheduleDiv=()=>{
		this.setState({
			openSchedule : !this.state.openSchedule
		})
	}
	// 确定开始上传
	confirmSubmit=()=>{
		let _this = this;
		_this.openBatchUploadNum();
		let sendRealEquipment = {
			deviceId : _this.state.selectedCommunitys,
			picUrl : _this.state.picUrl
		}
	    Store.dispatch(Actions.callAPI('oploadImgToEquipment',{},sendRealEquipment))
	      .then(function(response){
	      }).catch(function(err){
	        Notify.show([{
	          message: err.message,
	          type: 'danger',
	        }])
	    });
	    _this.openBatchUploadNum();
	    _this.openScheduleDiv();
		var timer = setInterval(function(){
			Store.dispatch(Actions.callAPI('getPushImgRes',""))
			.then(function(response){
				response = response.split("|");
				_this.setState({
					innerBoxWidth : Number((response[0]/response[1])*298),
					uploadedNum:response[0],
					totalNum:response[1]
				})
				if(response[0] == response[1]){
					_this.setState({
						openSchedule : false
					});
					
					window.clearInterval(timer);
					timer = null;
					if(timer == null){
						_this.closeSchedule();
						_this.closeBatchUpload();
						_this.openFinishTable();
					}
				}
			})
		},300);
	}
	render(){
		let {communitys}=this.state;
		const {handleSubmit,detail}=this.props;
		return(
			
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<KrField name="uploadImage" 
						component="uploadImage" 
						style={{marginTop:10}} 
						photoSize={'212*136'} 
						pictureFormat={'JPG'} 
						pictureMemory={'32K'}
						requestURI = {this.state.requestURI}
					/>
					<KrField name="communitys" 
						options={communitys} 
						component="doorCard" 
						defaultValue={communitys}
						getList={this.getList}
					/>
					<Grid style={{marginTop:25,marginBottom:'4px'}}>
						<Row>
							<ListGroup>
								<ListGroupItem style={{width:'305px',textAlign:'right',padding:0,paddingRight:15}}>
									<Button  label="开始上传" type="submit"/>
								</ListGroupItem>
								<ListGroupItem style={{width:'254px',textAlign:'left',padding:0,paddingLeft:15}}>
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} />
								</ListGroupItem>
							</ListGroup>					
						</Row>
					</Grid>
					<Dialog
			          title="提示"
			          open={this.state.batchUploadNum}
			          onClose={this.openBatchUploadNum}
			          contentStyle={{width:443,height:237,position:"absolute",left:"123",top:"43%"}}
		        	>
			        	<div style={{marginTop:45}}>
			        		<p style={{fontSize:14,color:"#333333",textAlign:"center"}}>本次将上传{this.state.submitNum}台大门门禁设备，确定上传图片？</p>
			        		<Grid style={{marginTop:60,marginBottom:'4px'}}>
								<Row>
									<ListGroup>
										<ListGroupItem style={{width:'171px',textAlign:'right',padding:0,paddingRight:15}}>
											<Button  label="确定" type="button" onClick={this.confirmSubmit}/>
										</ListGroupItem>
										<ListGroupItem style={{width:'171px',textAlign:'left',padding:0,paddingLeft:15}}>
											<Button  label="取消" type="button"  cancle={true} onTouchTap={this.openBatchUploadNum} />
										</ListGroupItem>
									</ListGroup>					
								</Row>
							</Grid>
			        	</div>
			        </Dialog>
			        <div className="uploadImageNum" style={{display:this.state.openSchedule?"block":"none"}}>
			        	<div className="uploadImageNumBox" >
			        		<p className="uploadImageProgress" >{this.state.uploadedNum}/{this.state.totalNum}上传中...</p>
				        	<div className="uploadImageProgressBar">
				        		<div className="uploadImageProgressBarIndex" style={{width:this.state.innerBoxWidth}}></div>
				        	</div>
			        	</div>
			        </div>
				</form>
			
		);
	}
}
export default BatchUploadImageForm = reduxForm({
	form: 'BatchUploadImageForm',
	// validate,
})(BatchUploadImageForm);



