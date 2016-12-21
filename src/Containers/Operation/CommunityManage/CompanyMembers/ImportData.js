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
import $ from 'jquery';

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
	Notify,
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
			progress: 0,
			file:[],
			fileName:''
		}
	}
	test=()=>{
		let _this = this;
    	var form = new FormData();
		form.append('file', this.state.file);
		form.append('companyId', '45');

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {

				Message.success("上传文件成功");
            	_this.onCancel(); 
            	_this.onSubmit();
				} else {
            	_this.onCancel(); 
					Message.error('上传文件失败');
				}
			}
		};

		xhr.onerror = function(e) {
			console.error(xhr.statusText);
		};
		xhr.open('POST', 'http://optest02.krspace.cn/api/krspace-finance-web/member/member-excel', true);
		xhr.responseType = 'json';
		xhr.send(form);

  }

	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	onSubmit=()=>{
		const {onSubmit} = this.props;
		onSubmit && onSubmit();
	}
	onLoadDemo=()=>{
		const {onLoadDemo} = this.props;
		onLoadDemo && onLoadDemo();
	}
	importFile=()=>{
		// console.log('importFile');
	}
	onTokenSuccess=(form)=> {
		this.setState({
			form
		});
	}

	onChange=(event)=> {

		var _this = this;
		let fileName = event.target.files[0].name;
		let arr = event.target.files[0].name.split('.');
		let type = arr[arr.length-1];
		if(type != 'xls' && type != 'xlsx'){
			Message.error('上传文件类型不对，请选择.xls或.xlsx');
			return ;
		}
		_this.setState({
			fileName,
			file:event.target.files[0]
		})


	}





	render() {
		let {fileName} = this.state;


		return (
			<form  name='import'>
				<div>
					<span className='import-logo icon-excel' onClick={this.importFile}></span>
					
					<input type="hidden" name="companyId" value="45"  />

					<span className='import-font'><span className="chooce">请选择上传文件</span><input type="file" name="file" className='chooce-file' onChange={this.onChange}/></span>
					{fileName?<span className='file-name'>{fileName}</span>:''}
					<span className='load-demo icon-template' onClick={this.onLoadDemo}>下载excel模板</span>
				</div>
				<Grid style={{marginBottom:20}}>
					<Row>
						<ListGroup>
							<ListGroupItem style={{width:'47%',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定导入" type="button" width={90} height={34} onClick={this.test}/></ListGroupItem>
							<ListGroupItem style={{width:'47%',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} width={90} height={34}/> </ListGroupItem>
						</ListGroup>
					  </Row>
				</Grid>
				</form>
)
	}
}
