import React, {

	PropTypes
} from 'react';
import {
	reduxForm,
	formValueSelector,
	initialize,
	FieldArray
} from 'redux-form';
import {
	Actions,
	Store,
	connect
} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
	Checkbox,
	DrawerTitle,
	Dialog
} from 'kr-ui';
import {Chip} from 'material-ui'
import {Http} from 'kr/Utils';
import './index.less'
import BindCommunity from '../BindCommunity';
const renderField = ({ input, label, placeholder, meta: { touched, error }}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input}  placeholder={label||placeholder}/>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
)
//社区亮点-亮点
const renderBrights = ({ fields, meta: { touched, error }}) => {

	if(!fields.length){
		fields.push({});
	}

		 var krStyle={};
			krStyle={
				width:228,
				marginLeft:18,
				marginRight:3,
		 }
	return (
			<ul style={{padding:0,margin:0}}>
			{fields.map((brightsStr, index) =>
			<li key={index} style={{width:600,listStyle:'none'}}>
				<KrField
					style={krStyle}
					grid={1 / 2}
					name={`${brightsStr}`.accountNum}
					type="text"
					component={renderField}
					label={index ? '' : '银行账户'}
					placeholder='银行账户'
					requireLabel={index ? false : true}
				/>
				<KrField
					style={krStyle}
					grid={1 / 2}
					name={`${brightsStr}`.bankAddress}
					type="text"
					component={renderField}
					label={index ? '' : '开户行地址'}
					placeholder='开户行地址'
					requireLabel={index ? false : true}
				/>
				<span onClick={() => fields.insert(index+1)} className='addBtn' style={index?{marginTop:17}:{marginTop:32}}></span>
				<span
					className='minusBtn'
					onClick={() => fields.remove(index)}/>
			</li>
		)}
	</ul>

 )
}
class EditDetailForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			chipData : props.detail.community||[],
			isBindCommunitys : false,
			readyData:{},
			detail:{},
			id : ''
		}
		this.styles = {
		 chip: {
			 margin: 4,
		 },
		 wrapper: {
			 display: 'flex',
			 flexWrap: 'wrap',
		 },
	 };
	 this.getEditReadyData();
	}

	componentDidMount() {

	}
	cmtIdData = () =>{
		let {chipData} = this.state;
		var arr = chipData.map(function(item,index){
			return item.id;
		})
		return arr;
	}
	onSubmit = (values) => {

		const {detail} = this.state;
		const {onSubmit} = this.props;
		let data = Object.assign({}, values);
		data.cmtId =this.cmtIdData();
		data.id = detail.id;

		var _this = this;
		console.log(values,"?????")
		Http.request('editFnaCorporation',{},data).then(function(response) {
			onSubmit && onSubmit();
			_this.onCancel();


		}).catch(function(err) {

		});


	}

	onCancel = () => {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();

	}
	bindCommunityClose = () =>{
		let {isBindCommunity} = this.state;
		this.setState({
			isBindCommunity: !isBindCommunity,
		})
	}
	//绑定的社区提交
	checkedSubmit = (data) =>{
		var _this = this;
		var chipData = [].concat(data);
		this.setState({
			chipData:chipData,
		})
	}
	//绑定社区打开
	bindClick = () =>{
		this.bindCommunityClose();
	}
	//生成样式
	renderChip(data) {
		return (
		<Chip
			key={data.id}

			onRequestDelete={() => this.handleRequestDelete(data)}
			style={this.styles.chip}
		>
			{data.name}
		</Chip>
		);
	}
	//删除方法
	handleRequestDelete = (data) => {
		this.chipData = this.state.chipData;
		const chipToDelete = this.chipData.map((chip) => chip.id).indexOf(data.id);
		this.chipData.splice(chipToDelete, 1);
		this.setState({chipData: this.chipData});
	};
	//编辑准备数据
	getEditReadyData = () =>{
		let self = this;
		Http.request('getWeChatAndAlipay').then(function(response) {
			self.setState({
				readyData:response
			})
		}).catch(function(err) {

		});


	}
	componentWillReceiveProps(nextProps){
		console.log("nextProps",nextProps && nextProps.detail && nextProps.detail.id)
		if(nextProps && nextProps.detail && nextProps.detail.id ){
			this.setState({
				chipData : nextProps.detail.community,
				detail:nextProps.detail,
				id:nextProps.detail.id
			})
			// this.props.dispacth(detail.cachetUrl)

		}
	}
	deleteInfoPicDefaultValue = () =>{
		var data = Object.assign({},this.props.detail);
		data.cachetUrl = '';
		this.setState({
			detail:data
		})
	}
	componentWillUnmount(){
		this.setState({
			detail:{}
		})
	}

	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset,
		} = this.props;
		const {
			existing,
			chipData,
			jsonData,
			readyData,
			detail,
			id
		} = this.state;
		let host = "http://"+window.location.host;
		return (
			<form className = 'edit-detail-form' onSubmit={handleSubmit(this.onSubmit)} style={{padding:" 35px 45px 45px 45px"}}>
				<div className="title">
					<DrawerTitle title ='编辑出租方' onCancel = {this.onCancel}/>
				</div>
				<div className="cheek">
						<div className="titleBar">
							<span className="order-number">1</span>
							<span className="wire"></span>
							<label className="small-title">基本信息</label>
						</div>
						<div className="small-cheek">
								<KrField grid={1/2} label="出租方名称"  name="corName" style={{width:262,marginLeft:15}} component="input" requireLabel={true}/>
								<KrField grid={1/2} label="注册地址" name="corAddress" style={{width:262,marginLeft:15}} component="input" requireLabel={true}/>
								<KrField grid={1/2} label="是否启用" name="enableflag" style={{width:262,marginLeft:15,marginRight:13}} component="group" requireLabel={true}>
		              <KrField name="enableflag" label="是" type="radio" value="true" style={{marginTop:5,display:'inline-block',width:84}}/>
		             	<KrField name="enableflag" label="否" type="radio" value="false"  style={{marginTop:5,display:'inline-block',width:53}}/>
		            </KrField>
								<div className='remaskInfo'><KrField grid={1} label="备注" name="corDesc" style={{marginLeft:15,marginTop:10,marginBottom:10}} heightStyle={{height:"70px",width:'543px'}}  component="textarea"  maxSize={100} requireLabel={false} placeholder='请输入备注' lengthClass='cus-textarea'/></div>

								<KrField
									name="cachetUrl"
									component="newuploadImage"
									innerstyle={{width:200,height:200,padding:10}}
									photoSize={'497*497'}
									pictureFormat={'JPG,PNG,GIF'}
									pictureMemory={'200'}
									requestURI = {host+'/api/krspace-finance-web/activity/upload-pic'}
									label="公章"
									deviation = {"50*50"}
									inline={false}
									isInit = {true}
									defaultValue={detail.cachetUrl}
									onDeleteImg ={this.deleteInfoPicDefaultValue}

								/>

								<div className="middle-round"></div>
						</div>

						<div className="titleBar">
							<span className="order-number">2</span>
							<span className="wire"></span>
							<label className="small-title">账号信息</label>
						</div>
						<div className="small-cheek" style={{paddingBottom:0}}>

								<KrField grid={1/2} label="支付宝账户" value = {readyData && readyData.aipayAccount}  name="mail" inline = {false} style={{width:262,marginLeft:15}} component="labelText" requireLabel={true}/>
								<KrField grid={1/2} label="微信账户"  value = {readyData && readyData.weixinAccount} name="wechat" inline = {false} style={{width:262,marginLeft:15}} component="labelText" requireLabel={true}/>
								<FieldArray name="bankAccount" component={renderBrights}/>

						</div>
						<div className="titleBar">
							<span className="order-number">3</span>
							<span className="wire"></span>
							<label className="small-title">社区信息</label>
						</div>
						<div className="small-cheek" style={{paddingBottom:0}}>
							<div style={this.styles.wrapper}>
								{this.state.chipData.length !=0 && this.state.chipData.map(this.renderChip,this)}
							</div>
							<span onClick = {this.bindClick}
								style = {{
										display:'inline-block',
										margin:4,
										background:"#499df1",
										borderRadius: '4px',
										padding:" 5px 10px 5px 5px",
										color: "#fff",
										cursor: "pointer"
									}}
							>+绑定社区</span>

						</div>
						<div className="end-round"></div>
				</div>
				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>

								<div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit"/></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>

			<Dialog
					title="绑定社区"
					open={this.state.isBindCommunity}
					onClose={this.bindCommunityClose}
					contentStyle={{width:687,height:450,overflow:'scroll'}}
       		>
          		<BindCommunity
				  	cmtId = {detail.id}
				  	jsonData = {jsonData}
					onCancel = {this.bindCommunityClose}
					checkedSubmit = {this.checkedSubmit}
					existing = {chipData}
				/>
		    </Dialog>

			</form>
		);
	}
}


const validate = values => {

	const errors = {}

	if (!values.corName) {
		errors.corName = '请填写出租方名称';
	}else if(values.corName.length >50){
		errors.corName = '出租方名称最多填写50字';
	}
	if (!values.corAddress) {
		errors.corAddress = '请填写详细地址';
	}else if(values.corAddress.length>200){
		errors.corAddress = '最多可填写200字';
	}
	if(!values.enableflag){
		errors.enableflag = '是否选择为必填'
	}
	 if (!values.bankAccount || !values.bankAccount.length) {
          errors.bankAccount = { _error: 'At least one member must be entered' }
        } else {
          let membersArrayErrors = []
          values.bankAccount.forEach((porTypes, memberIndex) => {

			// if (porTypes) {
			// 	porTypes.accountNum = porTypes.accountNum.toString().replace(/[ /d]/g, '');
			// 	porTypes.bankAddress = porTypes.bankAddress.toString().replace(/[ /d]/g, '');
			// }


			let memberErrors = {};
			// if (!porTypes.accountNum) {
			// 	memberErrors.accountNum = '请填写银行账户'

			// }
			// if (!porTypes.bankAddress) {
			// 	memberErrors.bankAddress = '请填写开户行地址'
			// }
			membersArrayErrors[memberIndex] = memberErrors
          })
        if(membersArrayErrors.length) {
          errors.bankAccount = membersArrayErrors
        }
      }

	return errors
}

export default reduxForm({
	form: 'editDetailForm',
	initialValues: {
		enableflag: 'ENABLE'
	},
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(EditDetailForm);
