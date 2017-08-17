import React, {

	PropTypes
} from 'react';
import {
	reduxForm,
	formValueSelector,
	initialize,
	FieldArray,
	change
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
	Dialog
} from 'kr-ui';
import {Chip} from 'material-ui'
import {Http} from 'kr/Utils';
import State from './State';
import './index.less';
import {
	observer
} from 'mobx-react';
import BindCommunity from './BindCommunity';

@observer
class NewCreateForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			chipData : [],
			isBindCommunitys : false,
			readyData:{}
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
	getEditReadyData = () =>{
		let self = this;
		Http.request('getWeChatAndAlipay').then(function(response) {
			self.setState({
				readyData:response
			})
		}).catch(function(err) {

		});
	}
	cmtIdData = () =>{
		let {chipData} = this.state;
		var arr = chipData.map(function(item,index){
			return item.id;
		})
		return arr;
	}
	onSubmit = (values) => {
		let data = Object.assign({}, values);
		data.cmtIds =this.cmtIdData();
		console.log('=============',data)
		const {onSubmit} = this.props;
		var _this = this;
		Http.request('get-tongbu-submit', {}, data).then(function(response) {
			onSubmit && onSubmit();
			_this.onCancel();


		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
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

	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset,
			detail
		} = this.props;
		const {
			existing,
			chipData,
			jsonData,
			readyData
		} = this.state;
		let host = "http://"+window.location.host;
		console.log("http://"+window.location.host);
		return (
			<form className = 'edit-detail-form' onSubmit={handleSubmit(this.onSubmit)} style={{padding:" 35px 45px 45px 45px"}}>
				<div className="title">
						<div><span className="new-icon"></span><label className="title-text">查看</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
				<div className="cheek">
						<div className="titleBar">
							<span className="order-number">1</span>
							<span className="wire"></span>
							<label className="small-title">基本信息</label>
						</div>
						<div className="small-cheek">
								<KrField grid={1/2} label="同步月份"  name="syncDate" style={{width:262,marginLeft:15}} component="date" requireLabel={true}/>
								<KrField grid={1/2} label="同步系统" name="syncSystem" style={{width:262,marginLeft:15}} component="select" requireLabel={true} options={State.syncSystem}/>
								<KrField grid={1/2} label="同步主体" name="syncMainPart" style={{width:262,marginLeft:15}} component="select" requireLabel={true} options={State.syncMainPartType}/>
								<div className='remaskInfo'>
									<KrField grid={1} label="备注" name="remark" style={{marginLeft:15,marginTop:10,marginBottom:10}} heightStyle={{height:"70px",width:'543px'}}  component="textarea"  maxSize={100} requireLabel={false} placeholder='请输入备注' lengthClass='cus-textarea'/>
								</div>

								<div className="middle-round"></div>
						</div>

						<div className="titleBar">
							<span className="order-number">2</span>
							<span className="wire"></span>
							<label className="small-title">社区信息</label>
						</div>
						<div className="small-cheek" style={{paddingBottom:0}}>
							<div style={this.styles.wrapper}>
								{this.state.chipData.map(this.renderChip,this)}
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
	


	return errors
}

export default reduxForm({
	form: 'newCreateForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(NewCreateForm);
