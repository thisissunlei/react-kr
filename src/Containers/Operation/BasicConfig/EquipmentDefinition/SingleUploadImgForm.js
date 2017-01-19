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
	Notify,
	Message,
} from 'kr-ui';
import "./index.less";
class SingleUploadImgDefinitionForm extends Component{
	constructor(props,context){
		super(props,context);
		this.detail = this.props.detail;
		this.state={
			picUrl:'',
			selectedCommunitys:[],
			batchUploadNum :false,
			openSchedule : false,
			submitValues : '',
			// submitNum : 11,
			innerBoxWidth :0,
			uploadedNum:0,
			totalNum:0,
			submitValuesParams:{},
			requestURI:"postEquipmentImg",
			itemDetail:''
			
		}
	}
	//首次加载，只执行一次
	componentWillMount() {
		console.log("首次加载",this.detail)
	}
	componentDidMount(){
		this.getBasicData(this.detail);
		console.log("this.detail",this.detail);
		// this.setState({
		// 	itemDetail
		// })
		// let _this = this;
		// Store.dispatch(Actions.callAPI('getCommunityEquipment',""))
	 //      .then(function(response){
	 //      	console.log("response设备列表",response);
	 //      	// _this.setState({
	 //      	// 	communitys : response.items
	 //      	// })
	 //      }).catch(function(err){
	 //        Notify.show([{
	 //          message: err.message,
	 //          type: 'danger',
	 //        }])
	 //    });
	}
	getBasicData=(detail)=>{
		console.log()
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	// 提交(获取总共上传社区个数)
	onSubmit=(values)=>{
		console.log("this.detail.hardwareId",this.detail.hardwareId);
		console.log("this.state",this.state);
		console.log("values单个上传",values);
		let _this =this;
		if(!values.uploadImage){
			const {tipOpen} = this.props;
			tipOpen && tipOpen();
			return;
		};
		this.setState({
			submitValuesParams : values,
			picUrl : values.uploadImage
		})
		let valuesParams = {
			deviceId : this.detail.hardwareId,
			picUrl : values.uploadImage
		}
		console.log("valuesParams",valuesParams);
		// 向指定社区推送图片
		Store.dispatch(Actions.callAPI('oploadImgToEquipment',{},valuesParams))
	      .then(function(response){
	      	// console.log("response上传单张图片",response);
	      	Message.success("上传图片成功");
	      	const {openSingleUploadDialog} = _this.props;
	      	openSingleUploadDialog && openSingleUploadDialog();
	      	_this.setState({
	      		submitCommunitys : response,
	      		submitNum : response.length
	      	})
	      }).catch(function(err){
	      	Message.error(err.message);
	      	const {openSingleUploadDialog} = _this.props;
	      	openSingleUploadDialog && openSingleUploadDialog();
	    });
		// Store.dispatch(Actions.callAPI('getMemberBasicData',submitParams)).then(function(response){
		// 	console.log("response",response);
		// 	var arrarSubmitN = values.communitys.split(','); 
		// 	this.setState({
		// 		submitNum : arrarSubmitN.length,
		// 		submitValues: values.communitys,
		// 	})
		// })
		this.openBatchUploadNum();
	}
	// 是否打开确定上传窗口
	openBatchUploadNum=()=>{
		this.setState({
			batchUploadNum : !this.state.batchUploadNum
		})
	}
	// 确定开始上传
	confirmSubmit=()=>{
		// let values = {
		// 	deviceId:this.state.submitValuesParams.communitys,
		// 	picUrl : this.state.submitValuesParams.uploadImage
		// }
		// Store.dispatch(Actions.callAPI('oploadImgToEquipment',{},values)).then(function(response){
		// 	console.log("response上传",response);
		// })
		let _this = this;
		console.log("_this",_this);
		var submitParams = this.state.submitValues;
		this.openBatchUploadNum();
		// var timer = setInterval(function(){
		// 	console.log("+++++")
		// 	// 此处请求数据
		// 	Store.dispatch(Actions.callAPI('getMemberBasicData',submitParams)).then(function(response){
		// 		var response = "2|3";
		// 		response = respons.split("|");
		// 		_this.setState({
		// 			uploadedNum : response[0],
		// 			totalNum  : response[1],
		// 			innerBoxWidth : (response[0]/response[1])*300
		// 		})
		// 	})
		// 全部上传完成
		// 	if(this.state.uploadedNum == this.state.totalNum){
			// 	window.clearInterval(timer);
			// 	_this.openBatchUploadNum();
			// }
			// const {finishUpload} = _this.props;
			// finishUpload && finishUpload();
		// },10000000);
		
		this.setState({
			openSchedule : !_this.state.openSchedule
		})
	}
	render(){
		// console.log("是否打开提示窗口",this.state.batchUploadNum);
		// let {communitys}=this.state;
		const {handleSubmit}=this.props;
		return(
			<div>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					<KrField name="uploadImage" 
						component="uploadImage" 
						style={{marginTop:10}} 
						photoSize={'212*136'} 
						pictureFormat={'JPG'} 
						pictureMemory={'32K'}
						requestURI = {this.state.requestURI}
					/>
					<Grid style={{marginTop:25,marginBottom:'4px'}}>
						<Row>
							<ListGroup>
								<ListGroupItem style={{width:'171px',textAlign:'right',padding:0,paddingRight:15}}>
									<Button  label="开始上传" type="submit"/>
								</ListGroupItem>
								<ListGroupItem style={{width:'171px',textAlign:'left',padding:0,paddingLeft:15}}>
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
// const validate = values=>{
// 	const errors={};
// 	if(!values.communityName){
// 		errors.communityName = '社区名称为必填项';
// 	}
// 	if(!values.floor){
// 		errors.floor = '楼层为必填项';
// 	}
// 	if(!values.showTitle){
// 		errors.showTitle = '展示标题为必填项';
// 	}
// 	return errors;
// }
export default SingleUploadImgDefinitionForm = reduxForm({
	form: 'SingleUploadImgDefinitionForm',
	// validate,
})(SingleUploadImgDefinitionForm);