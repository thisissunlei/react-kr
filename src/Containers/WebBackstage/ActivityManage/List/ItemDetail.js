
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import ReactHtmlParser from 'react-html-parser';
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
		if(!ShallowEqual(this.state.initializeValues,nextProps.detail)){
			this.setState({
				initializeValues:nextProps.detail
			},function(){
				State.activityGetList(nextProps.detail.id);
				State.activityItemcontent();
			})
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
	showMore=()=>{
		State.HeightAuto = !State.HeightAuto;
	}
	showMoreContent=()=>{
		State.contentHeightAuto = !State.contentHeightAuto;
	}
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}

	render(){
		const { handleSubmit} = this.props;
		let initValue = this.props.detail;
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
		let options = [{
			label: 'CEO Time',
			value: 'CEO_TIME'
		}, {
			label: '公开氪',
			value: 'OPEN_KR'
		}, {
			label: '社区福利',
			value: 'COMMUNITY_WELFARE'
		},  {
			label: 'Open Day',
			value: 'OPEN_DAY'
		}];
		
		let joinType;
		let activityType;
		partakeMan.map((item)=>{
			if(item.value == initValue.joinType){
				joinType = item.label;
			}
			return joinType;
		})
		options.map((item)=>{
			if(initValue.type == item.value){
				activityType = item.label
			}
			return activityType
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
		let same = this.isSameDay(initValue.beginDate,initValue.endDate);
		let time = this.setTime(same,initValue);
		return (

			<div className="new-create-activity">
			<form>

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
							<KrField grid={1/2} name="type" type="labelText" inline={false} label="活动类型" requireLabel={true} style={{width:'252px'}} value={activityType} />
							<KrField grid={1} name="date" type="labelText" inline={false} label="活动类型" requireLabel={true} value={time} />
							<KrField grid={1} name="date" type="labelText" inline={false} label="举办地址" requireLabel={true} value={`${initValue.cityName}${initValue.countyName}-${initValue.address}`} />
							<KrField grid={1/2} name="date" type="labelText" inline={false} label="地址坐标" requireLabel={true} value={`X:${initValue.xPoint} Y:${initValue.yPoint}`} />
							<KrField grid={1/2} name="date" type="labelText" inline={false} label="排序" requireLabel={true} value={initValue.sort}  defaultValue='无'/>

							<KrField grid={1/2} name="contact" type="labelText" inline={false} label="活动联系人" style={{width:'252px'}} value={initValue.contact} defaultValue='无'/>
							<KrField grid={1/2} name="contactPhone" type="labelText" inline={false} label="活动联系人电话" style={{width:'252px',marginLeft:24}} value={initValue.contactPhone} defaultValue='无'/>
							<KrField name="joinType" component="labelText" inline={false}label="参与人"style={{width:'252px'}}value={joinType}/>
							<KrField grid={1/2} name="maxPerson" type="labelText" inline={false} label="人数限制" style={{width:'252px',marginLeft:24}} value={initValue.maxPerson}  defaultValue='无'/>
							<KrField grid={1/2} name="top" type="labelText" inline={false} label="是否置顶"  style={{width:'252px'}} value={initValue.sortShow}  defaultValue='不置顶'/>
							<div className="photo-box activity-content">
								<span className="photo-title">活动介绍</span>
								<div className={State.contentHeightAuto?'content-info auto':'content-info stationList'} style={{maxHeight:'150px'}}>
									{/*initValue.summary*/}
									{ReactHtmlParser(State.detailContent)}
								</div>
							{<div className="Btip"  style={{height:70}} onTouchTap={this.showMoreContent}> <p><span>{State.contentHeightAuto?'收起':'展开'}</span><span className={State.contentHeightAuto?'Toprow':'Bottomrow'}></span></p></div>}

							</div>

							<div className="photo-box" style={{display:initValue.top?'block':'none'}}>
								<span className="photo-title">上传轮播图</span>
								<div className="photo-img-box">
									<img src={initValue.coverPic} style={{width:'100%',height:'100%'}}/>
								</div>
							</div>

							<div className="photo-box">
								<span className="photo-title">上传列表详情图</span>
								<div className="photo-img-box" style={{width:390,height:230}}>
									<img src={initValue.infoPic} style={{width:'100%',height:'100%'}}/>
											
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
										{	list.name && <ListGroupItem style={{marginRight:48}}>
												<span style={{fontSize:14,color:"#333333"}} >姓名</span>
											</ListGroupItem>
										}
										{	list.phone && <ListGroupItem style={{marginRight:48}}>
												<span style={{fontSize:14,color:"#333333"}} >电话</span>
											</ListGroupItem>
										}
										{	list.company && <ListGroupItem style={{marginRight:48}}>
												<span style={{fontSize:14,color:"#333333"}} >公司名称</span>
											</ListGroupItem>
										}
										{	list.job && <ListGroupItem style={{marginRight:48}}>
												<span style={{fontSize:14,color:"#333333"}} >职务</span>
											</ListGroupItem>
										}
										{	list.address && <ListGroupItem style={{marginRight:48}}>
												<span style={{fontSize:14,color:"#333333"}} >地址</span>
											</ListGroupItem>
										}
									</ListGroup>					
								</Row>
							</Grid>
						</div>
					</div>
					<div className="enroll-info" style={{minHeight:150}}>
						<div className="enroll-title">
							<span>3</span>
							<span></span>
							<span>报名情况</span>
						</div>
						<div className={State.HeightAuto?'auto':'stationList'}>
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
									return (
										<TableRow key={index}>
											{list.name && <TableRowColumn>{item.name}</TableRowColumn>}
											{list.phone && <TableRowColumn>{item.phone}</TableRowColumn>}
											{list.company && <TableRowColumn>{item.company}</TableRowColumn>}
											{list.job && <TableRowColumn>{item.job}</TableRowColumn>}
											{list.address && <TableRowColumn>{item.cityName}</TableRowColumn>}
									   	</TableRow>
									);
								})}
								</TableBody>
							</Table>
						</div>
						{!State.actField.items.length && <div style={{fontSize:'14px',paddingLeft:'55px'}}>暂无</div>}
						

						{State.actField.items.length>5?<div className="Btip"  style={{height:70}} onTouchTap={this.showMore}> <p><span>{State.HeightAuto?'收起':'展开'}</span><span className={State.HeightAuto?'Toprow':'Bottomrow'}></span></p></div>:''}

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
