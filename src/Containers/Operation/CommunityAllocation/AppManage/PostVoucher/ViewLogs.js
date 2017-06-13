import React from 'react';
import {
	Http
} from "kr/Utils";
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ListGroup,
	KrDate,
	ListGroupItem,
	SearchForms,
	ButtonGroup,
	CircleStyleTwo
} from 'kr-ui';
import {
	reduxForm,
	initialize,
	change
} from 'redux-form';
import './index.less';


class ViewLogs extends React.Component {

	static PropTypes = {
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			infoList:[],
			ownFlag: true,
			status:1,
		}
	}

	componentDidMount() {
		var _this = this;
		var id = this.props.detail.id
		Http.request('topic-detail', {
			id: id
		}, {}).then(function(response) {
			_this.setState({infoList: response})
		}).catch(function(err) {});
	}
	onCancel = () => {
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	changeCheck=()=>{
		this.setState({
			ownFlag:!this.state.ownFlag,
		})
	}
	onSelect=(item)=>{

	}
	//处理提交
	handleSubmit=(form)=>{
		let {
			itemDetail,
			status,
		} = this.state;
		let {
			detail,
			onSubmit
		} = this.props;
			
		var _this = this;
		Http.request('topic-handle', {}, {
			// content:,
			// id:detail.id,
			// status:status,
			// time:,
		}).then(function(response) {
			Message.success('处理成功');
			onSubmit && onSubmit();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	render() {

		let {
			totalCountMoney,
			payment,
			accountList,
			mainbillInfo,
			showName,
			customerId,
			infoList,
			topInfoList,
			ownFlag,
		} = this.state;
		return (
			<div className="u-audit-add  u-audit-edit">
				<KrField
							style={{width:260}}
							name="author"
							inline={false}
							type="text"
							component="labelText"
							label="发帖人"
							value={infoList.systemName}
					/>
				<KrField
						style={{width:260,marginLeft:25}}
						name="payName"
						inline={false}
						component="labelText"
						label="举报类型"
						value={infoList.sourceName}
				/>
				<KrField
						style={{width:260}}
						component="labelText"
						inline={false}
						label="举报人"
						value={infoList.operateType}

				/>
				<KrField
						style={{width:260,marginLeft:25}}
						component="labelText"
						inline={false}
						label="帖子内容"
						value={infoList.batchNum}
				/>
			<form onSubmit={handleSubmit(this.handleSubmit)} style={{marginTop:50}}>
				<KrField
						style={{width:260}}
						name="payAccount"
						inline={false}
						component="select"
						label="处罚"
						options={infoList.operater}
						onChange={this.onSelect}
				/>
				<input 		
						  type="checkbox"  
						  value={ownFlag?'1':'0'} 
						  name="status"
						  checked="checked"
						  onChange={this.changeCheck()}
				/>删除帖子
				<KrField
						style={{width:260}}
						component="input"
						inline={true}
						name="time"
				/>
				</form>
			</div>
			

		);
	}
}
export default ViewLogs = reduxForm({
	form: 'ViewLogs',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(ViewLogs);