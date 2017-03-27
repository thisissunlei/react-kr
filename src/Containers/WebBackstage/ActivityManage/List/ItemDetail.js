
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
	SnackTip,
	ListGroup,
	ListGroupItem,
	Notify,
	DateComponent,
	Checkbox,
	Editor,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
} from 'kr-ui';
import {
	observer
} from 'mobx-react';
import './index.less';
import {ShallowEqual} from 'kr/Utils';
import State from './State';
import dateFormat from 'dateFormat';
@observer


 class NewCreateForm extends Component{
	constructor(props){
		super(props);
		this.detail = this.props.detail;
		this.state={
			initializeValues:{}
		}
	}
	componentWillMount() {
	}
	componentDidMount(){
	}
	componentWillReceiveProps(nextProps){
		console.log('------>',nextProps.detail.id);
		if(!ShallowEqual(this.state.initializeValues,nextProps.detail)){
			this.setState({
				initializeValues:nextProps.detail
			},function(){
				console.log('ddddd',nextProps.detail.id);
				// State.activityGetInfo(nextProps.detail.id);
				State.activityGetList(nextProps.detail.id);
			})
		}
		

	}
	// 存为草稿
	toSave=()=>{
		console.log("你点击存为草稿");
	}
	// 取消新建
	onCancel=()=>{
		let {onCancel}=this.props;
		onCancel && onCancel();
	}
	// 提交
	onSubmit=(values)=>{
		
	}
	//存为草稿
	toSave=(values)=>{
		State.noPublic = true;
	}
	// 置顶
	chooseStick=()=>{
		State.isStick = true;

	}
	 // 不置顶
	noStick=()=>{
		
		State.isStick = false;

	}

	// 复选框
	chooseName=(e)=>{
		if(e.target.checked){
			State.choseName = true;
		}else{
			State.choseName = false;
		}
	}
	choosePhone=(e)=>{
		if(e.target.checked){
			State.chosePhone = true;
		}else{
			State.chosePhone = false;
		}
	}
	chooseCompany=(e)=>{
		if(e.target.checked){

			State.choseCompany = true;
		}else{
			State.choseCompany = false;
			

		}
	}
	choosePosition=(e)=>{
		if(e.target.checked){
			State.chosePosition = true;

		}else{
			State.chosePosition = false;
		}
	}
	chooseAdd=(e)=>{
		if(e.target.checked){
			State.choseAdd = true;
		}else{
			State.choseAdd = false;
		}
	}

	isSameDay=(begin,end)=>{
		let dayOne = new Date(begin).toLocaleDateString().split("/");
		let dayTwo = new Date(end).toLocaleDateString().split("/");
		let same = 'no';
		if(dayOne[0] === dayTwo[0] && dayOne[1] === dayTwo[1]&& dayOne[2] === dayTwo[2]){
			same = 'day';
		}else if(dayOne[0] === dayTwo[0] && dayOne[1] === dayTwo[1]&& dayOne[2] !== dayTwo[2]){
			same = 'mouth';
		}else if(dayOne[0] === dayTwo[0] && dayOne[1] !== dayTwo[1]&& dayOne[2] !== dayTwo[2]){
			same = 'year'
		}
		return same;
	}
	setTime(same,value){
		let time;
		switch(same)
		{
		case 'year':
		  time = dateFormat(value.beginDate,'yyyy/mm/dd HH:MM:ss')+'-'+dateFormat(value.endDate,'mm/dd HH:MM:ss');
		  break;
		case 'mouth':
			time = dateFormat(value.beginDate,'yyyy/mm/dd HH:MM:ss')+'-'+dateFormat(value.endDate,'mm/dd HH:MM:ss');
		  break;
		case 'day':
			time = dateFormat(value.beginDate,'yyyy/mm/dd HH:MM:ss')+'-'+dateFormat(value.endDate,'HH:MM:ss');
		  break;
		default:
			time = dateFormat(value.beginDate,'yyyy/mm/dd HH:MM:ss')+'-'+dateFormat(value.endDate,'yyyy/mm/dd HH:MM:ss');
		}
		return time;
	}

	render(){
		const { handleSubmit} = this.props;
		let initValue = this.props.detail;
		
		// 对应功能选项
		let correspondingFunction =[{
			label: 'CEO Time',
			value: 'CEO_TIME'
		},{
			label: '公开氪',
			value: 'OPEN_KR'
		},{
			label: '社区福利',
			value: 'COMMUNITY_WELFARE'
		},{
			label: 'Open Day',
			value: 'OPEN_DAY'
		}];
		let partakeMan =[{
			label: '仅限会员',
			value: 'ONLY_MEMBER'
		},{
			label: '仅限受邀者',
			value: 'ONLY_INVITA'
		},{
			label: '无限制',
			value: 'ANYBODY'
		}];
		let checkboxOptions=[{
			label: '姓名',
			value: 1
		},{
			label: '电话',
			value: 2
		},{
			label: '公司名称',
			value: 3
		},{
			label: '职务',
			value: 4
		},{
			label: '地址',
			value: 5
		}]
		let joinType;
		partakeMan.map((item)=>{
			if(item.value == initValue.joinType){
				joinType = item.label;
			}
			return joinType;
		})
		let list = {};
		State.actField.actEnroll.map((item)=>{
			if(item == '姓名'){
				list.name = true;
			}else if(item == '电话'){
				list.phone = true
			}else if(item == '公司名称'){
				list.company = true
			}else if(item == '职务'){
				list.job = true
			}else if(item == '地址'){
				list.address = true
			}

			
		});
		console.log('---->---->',list,State.actField.actEnroll.length);
		let same = this.isSameDay(initValue.beginDate,initValue.endDate);
		let time = this.setTime(same,initValue);
		return (

			<div className="new-create-activity">
			<form onSubmit={handleSubmit(this.onSubmit)}>

				<div className="title-box">
					<img src={require('./images/activity.svg')} className="title-img"/>
					<span className="title-text">查看活动</span>
					<span className="close-page" onClick={this.onCancel}>
						<img src={require('./images/closeIMG.svg')} className="close-page-img" />
					</span>
				</div>
				<div className="detail-info">
					<div className="activity-info">
						<div className="activity-title">
							<span>1</span>
							<span></span>
							<span>活动信息</span>
						</div>
						<div className="activity-detail-info">
							<img src={require('./images/selectOne.svg')} className="select-one"/>



							<KrField grid={1/2} name="name" type="labelText" inline={false} label="活动名称" requireLabel={true} style={{width:'252px'}} value={initValue.name} />
							<KrField grid={1/2} name="type" type="labelText" inline={false} label="活动类型" requireLabel={true} style={{width:'252px'}} value={initValue.type} />
							<KrField grid={1} name="date" type="labelText" inline={false} label="活动类型" requireLabel={true} value={time} />
							<KrField grid={1} name="date" type="labelText" inline={false} label="举办地址" requireLabel={true} value={`${initValue.cityName}${initValue.countyName}-${initValue.address}`} />
							<KrField grid={1/2} name="date" type="labelText" inline={false} label="地址坐标" requireLabel={true} value={`X:${initValue.xPoint} Y:${initValue.yPoint}`} />
							<KrField grid={1/2} name="date" type="labelText" inline={false} label="排序" requireLabel={true} value={initValue.sort} />

							<KrField grid={1/2} name="contact" type="labelText" inline={false} label="活动联系人" style={{width:'252px'}} value={initValue.contact}/>
							<KrField grid={1/2} name="contactPhone" type="labelText" inline={false} label="活动联系人电话" style={{width:'252px',marginLeft:24}} value={initValue.contactPhone}/>
							<KrField name="joinType" component="labelText" inline={false}label="参与人"style={{width:'252px'}}value={joinType}/>
							<KrField grid={1/2} name="maxPerson" type="labelText" inline={false} label="人数限制" style={{width:'252px',marginLeft:24}} value={initValue.maxPerson}/>
							<KrField grid={1/2} name="top" type="labelText" inline={false} label="是否置顶"  style={{width:'252px'}} value={initValue.sortShow} />
							{/*置顶显示轮播图*/}

							<div className="photo-box" style={{display:initValue.top?'block':'none'}}>
								<span className="photo-title">上传轮播图</span>
								<div className="photo-img-box">
									
								</div>
							</div>

							<div className="photo-box">
								<span className="photo-title">上传列表详情图</span>
								<div className="photo-img-box" style={{width:390,height:230}}>
									
								</div>
							</div>


							<div className="photo-box">
								<span className="photo-title">活动介绍</span>
								<div>
									{initValue.summary}
								</div>
							</div>

							
							
						</div>

					</div>
					<div className="enroll-info">
						<div className="enroll-title">
							<span>2</span>
							<span></span>
							<span>报名信息</span>
						</div>
						<div className="enroll-detail-info">
							<img src={require('./images/selectOne.svg')} className="select-one"/>
					
							<Grid style={{marginTop:19,marginBottom:'80px'}}>
								<Row>
									<ListGroup>
										{	list.name && <ListGroupItem style={{marginRight:48}} key={index}>
												<span style={{fontSize:14,color:"#333333"}} >姓名</span>
											</ListGroupItem>
										}
										{	list.phone && <ListGroupItem style={{marginRight:48}} key={index}>
												<span style={{fontSize:14,color:"#333333"}} >电话</span>
											</ListGroupItem>
										}
										{	list.company && <ListGroupItem style={{marginRight:48}} key={index}>
												<span style={{fontSize:14,color:"#333333"}} >公司名称</span>
											</ListGroupItem>
										}
										{	list.job && <ListGroupItem style={{marginRight:48}} key={index}>
												<span style={{fontSize:14,color:"#333333"}} >职务1</span>
											</ListGroupItem>
										}
										{	list.address && <ListGroupItem style={{marginRight:48}} key={index}>
												<span style={{fontSize:14,color:"#333333"}} >地址</span>
											</ListGroupItem>
										}
									</ListGroup>					
								</Row>
							</Grid>
						</div>
					</div>
					<div className="enroll-info">
						<div className="enroll-title">
							<span>3</span>
							<span></span>
							<span>报名情况</span>
						</div>
						<div style={{marginBottom:50}}>
							<Table displayCheckbox={false}>
								<TableHeader>
									{
										State.actField.actEnroll && State.actField.actEnroll.map((item,index)=>{
											return (
												<TableHeaderColumn key={index}>{item}</TableHeaderColumn>
											)
										})
									}
								</TableHeader>
								<TableBody>

								{
									State.actField.actEnroll && State.actField.items.map((item,index)=>{
									console.log('===>',item);
									return (
										<TableRow key={index}>
											{list.name && <TableRowColumn>{item.name}</TableRowColumn>}
											{list.phone && <TableRowColumn>{item.phone}</TableRowColumn>}
											{list.company && <TableRowColumn>{item.company}</TableRowColumn>}
											{list.job && <TableRowColumn>{item.job}</TableRowColumn>}
											{list.address && <TableRowColumn>{item.cityName}</TableRowColumn>}
									   	</TableRow>
										)
								})}

								</TableBody>
							</Table>
						</div>
					</div>
				</div>

				</form>
		  	</div>
		);
	}
}
const selector = formValueSelector('NewCreateForm');
export default NewCreateForm = reduxForm({
	form: 'NewCreateForm',
})(NewCreateForm);
