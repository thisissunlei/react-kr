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
	DrawerTitle,
	ButtonGroup,
	Checkbox,
	Dialog
} from 'kr-ui';
import {Chip} from 'material-ui'
import {Http,DateFormat} from 'kr/Utils';
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
			chipData : State.itemData.cmts,
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
		Store.dispatch(initialize('newCreateForm', State.itemData));

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
			<span style={{marginRight:15}}>{data.name}</span>
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
		return (
			<form className = 'edit-detail-form' onSubmit={handleSubmit(this.onSubmit)} style={{padding:" 35px 45px 45px 45px"}}>
				<div className="title">
                    <DrawerTitle title ="查看" onCancel = {this.onCancel}/>
				</div>
				<div className="cheek">
						<div className="titleBar">
							<span className="order-number">1</span>
							<span className="wire"></span>
							<label className="small-title">基本信息</label>
						</div>
						<div className="small-cheek">
							<KrField component="labelText" grid={1/2} inline={false} right={60} label="同步月份:" value={DateFormat(State.itemData.syncDate,'yyyy/mm')} defaultValue="无" requireBlue={true}/>
							<KrField component="labelText" grid={1/2} inline={false} left={60} label="同步系统:" value={State.itemData.syncSystemName} defaultValue="无" requireBlue={true}/>
							<KrField component="labelText" grid={1/2} inline={false} right={60} label="同步主体:" value={State.itemData.syncMainPartName} defaultValue="无" requireBlue={true}/>
								<div className='remaskInfo' style={{marginTop:20}}>
									<KrField grid={1} label="备注" inline={false} name="remark"  component="labelText" requireLabel={false} value={State.itemData.remark} defaultValue="无" />
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

						</div>
						<div className="end-round"></div>
				</div>
				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>

								<Button  label="取消" type="button"  onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>


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
