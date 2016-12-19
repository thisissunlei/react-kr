import React, {
	Component,
	PropTypes
} from 'react';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';

import {
	Actions,
	Store,
	connect
} from 'kr/Redux';


import {
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Message,
	Button,
	KrDate,
	DotTitle,
	ButtonGroup,
	Paper,
	ListGroup,
	ListGroupItem
} from 'kr-ui';

export default class CancleLeader extends Component {
	static propTypes = {
		initialValues:React.PropTypes.object,
		communityOptions:React.PropTypes.array,
		orderTypeOptions:React.PropTypes.array,
	}

	constructor(props, context) {
		super(props, context);
		this.state = {
			isInit: true,
			form: {},
			files: [],
			isUploading: false,
			progress: 0
		}
	}
	onTokenError=()=> {
		// Notify.show([{
		// 	message: '初始化上传文件失败',
		// 	type: 'danger',
		// }]);
		Message.error('初始化上传文件失败');
	}
	onError=(message)=> {
		// message = message || '上传文件失败';
		// Notify.show([{
		// 	message: message,
		// 	type: 'danger',
		// }]);
		Message.error('上传文件失败');

		this.setState({
			progress: 0,
			isUploading: false
		});
	}
	onSuccess=(response)=> {
		response = Object.assign({}, response);

		let {
			form
		} = this.state;

		let fileUrl = `/krspace_oa_web/doc/docFile/downFile?sourceservicetoken=${form.sourceservicetoken}&operater=${form.operater}&fileId=${response.id}`;

		response.fileUrl = fileUrl;
		response.fileName = response.filename;

		let {
			input,
			onChange
		} = this.props;
		let {
			files
		} = this.state;

		files.unshift(response);

		console.log('files', files);
		this.setState({
			files,
			progress: 0,
			isUploading: false
		});


		// Notify.show([{
		// 	message: '上传文件成功',
		// 	type: 'success',
		// }]);
		Message.success("上传文件成功");
		onChange && onChange(files);
	}


	onSubmit=(form)=>{
		form.companyId = 45;
		console.log('form',form);

		Store.dispatch(Actions.callAPI('importMemberExcel',{},form)).then(function(response) {
			_this.importData();
			// Notify.show([{
			// 	message: '设置成功',
			// 	type: 'success',
			// }]);
			Message.success('设置成功');

			// window.setTimeout(function() {
			// 	window.location.href = "./#/operation/customerManage/" + params.customerId + "/order/" + params.orderId + "/agreement/admit/" + response.contractId + "/detail";
			// }, 0);

		}).catch(function(err) {
			// Notify.show([{
			// 	message: err.message,
			// 	type: 'danger',
			// }]);
			Message.error(err.message);
		});
		// console.log('onSubmit',form);
		// const {onSubmit} = this.props;
		// onSubmit && onSubmit(form);
	}
	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	onLoadDemo=()=>{
		const {onLoadDemo} = this.props;
		onLoadDemo && onLoadDemo();
	}
	importFile=()=>{
		console.log('importFile');
	}
	onTokenSuccess=(form)=> {
		this.setState({
			form
		});
	}

	onChange=(event)=> {

		var _this = this;


		let file = event.target.files[0];
		console.log('file-----', file)
		Store.dispatch(change('cancleLeader', 'file', file));

		if (!file) {
			console.log('[[[[[[');
			return;
		}
	}





	render() {
		let {handleSubmit} = this.props;



		return (
			<form onSubmit={handleSubmit(this.onSubmit)} encType= "mutipart/form-data">
				<KrField grid={1/2}  name="file" type="hidden" component="input" />
				<div>
					<span className='import-logo icon-excel' onClick={this.importFile}></span>
					<input type="file" name="file" onChange={this.onChange} />

					<span className='import-font' onClick={this.importFile}>请选择上传文件</span>
					<span className='load-demo icon-template' onClick={this.onLoadDemo}>下载excel模板</span>
				</div>
				<Grid style={{marginBottom:20}}>
					<Row>
						<ListGroup>
							<ListGroupItem style={{width:'47%',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定导入" type="submit" width={90} height={34}/></ListGroupItem>
							<ListGroupItem style={{width:'47%',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} width={90} height={34}/> </ListGroupItem>
						</ListGroup>
					  </Row>
				</Grid>
				</form>
)
	}
}
CancleLeader = reduxForm({
	form: 'cancleLeader',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(CancleLeader);
