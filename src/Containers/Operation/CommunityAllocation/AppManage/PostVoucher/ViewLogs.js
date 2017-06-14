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

	constructor(props, context) {
		super(props, context);
		this.state = {
			infoList:[],
			ownFlag: true,
			status:1,
			timeFlag:false,
			punish:[{
				label:'永久禁言(禁止发帖与回复)',
				value:'1'
			},{
				label:'禁言(禁止发帖与回复)一段时间',
				value:'2'
			},{
				label:'不禁言',
				value:'3'
			}]
		};
		this.getInfo();
	}

	componentDidMount() {
		var _this = this;
		setTimeout(function() {
			_this.getInfo();
		}, 0)
	}
	getInfo = ()=>{
		var _this = this;
		var id = this.props.detail.id
		Http.request('topic-detail', {
			id: id
		}, {}).then(function(response) {
			_this.setState({infoList: response.items})
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
		if(item.value=='2'){
			this.setState({
				timeFlag:true,
			})
		}
	 }
	renderContentImg=()=>{
		let {
			infoList,
		} = this.state;
		infoList.imgUrl.map((item,index) => {
			return (
				<div className="content-img" style={{backgroundImage:`${item.imgUrl}`}}>

				</div>
			)	
		})
	}
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
		const {
				error,
				handleSubmit,
				pristine,
				reset
		} = this.props;
		let {
			infoList,
			ownFlag,
			punish,
			timeFlag
		} = this.state;
		console.log(infoList);
		return (
			<div className="g-create-group">
				<div className="u-create-title">
						<div><span className="u-create-icon"></span><label className="title-text">编辑群组</label></div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
							<KrField
							style={{width:520}}
							inline={false}
							type="text"
							component="labelText"
							label="发帖人"
							value={infoList.author}
					/>
				<KrField
						style={{width:520}}
						inline={false}
						component="labelText"
						label="举报类型"
						value={infoList.type}
				/>
				<KrField
						style={{width:520}}
						component="labelText"
						inline={false}
						label="举报人"
						value={infoList.name}

				/>
				<KrField
						style={{width:520}}
						component="labelText"
						inline={false}
						label="帖子内容"
				/>
				<div className="post-content">
					<div className="head-title">
						<span className="user-head" style={{backgroundImage:`${infoList.avatar}`}}></span>
						<span className="user-name"></span>
						<span className="timer"></span>
					</div>
					<div className="text">
						{infoList.topicContent}
						{this.renderContentImg()}
					</div>
				</div>
			<form onSubmit={handleSubmit(this.handleSubmit)} style={{marginTop:50}}>
				<KrField
						style={{width:260}}
						name="payAccount"
						inline={false}
						component="select"
						label="处罚"
						options={punish}
						onChange={this.onSelect}
				/>
				{timeFlag && 
					<div style={{display:'inline-block'}}>
						<KrField
								style={{width:260,marginTop:14}}
								component="input"
								inline={false}
								name="time"
						/>
						<span style={{display:'inline-block',marginTop:32,marginLeft:20}}>小时</span>
					</div>
					
				}
			
				<div>
					<input 		
							type="checkbox" 
							style={{marginLeft:10}} 
							value={ownFlag?'1':'0'} 
							name="status"
							checked="checked"
							onChange={this.changeCheck}
					/>删除帖子
				</div>
				
						<Grid style={{marginTop:50,width:'81%'}}>
						<Row >
						<Col md={12} align="center">
							<ButtonGroup>
								<Button  label="确定" type="submit"  />
								<Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/>
							</ButtonGroup>
						  </Col>
						</Row>
						</Grid>
						
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