
import React, { PropTypes} from 'react';
import {reduxForm,formValueSelector} from 'redux-form';
import $ from 'jquery';
import {ReactHtmlParser} from 'kr/Utils';
import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Tooltip,
	DrawerTitle
} from 'kr-ui';
import {
	observer
} from 'mobx-react';
import './index.less';
import {ShallowEqual} from 'kr/Utils';
import State from './State';
import {DateFormat} from 'kr/Utils';
@observer


 class NewCreateForm extends React.Component{
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
		let {detail}= this.props;

		State.activityDetail(detail.id);
		State.activityGetList(detail.id);
	}
	componentDidUpdate(){
		if($('#clampjs').height()>110){
			State.contentHeightAutoShow = true;
			$('#clampjs').css({'max-height':'111px',position:'relative'});
		}else{
			State.contentHeightAutoShow = false;
		}
	}
	componentWillReceiveProps(nextProps){
		if(!ShallowEqual(this.state.initializeValues,nextProps.detail)){
			this.setState({
				initializeValues:nextProps.detail
			})
			State.activityGetList(nextProps.detail.id);
			State.activityDetail(nextProps.detail.id);
			State.HeightAuto = false;
			State.contentHeightAuto = false;
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
		  time = DateFormat(value.beginDate,'yyyy/mm/dd HH:MM:ss')+'-'+DateFormat(value.endDate,'mm/dd HH:MM:ss');
		  break;
		case 'mouth':
			time = DateFormat(value.beginDate,'yyyy/mm/dd HH:MM:ss')+'-'+DateFormat(value.endDate,'mm/dd HH:MM:ss');
		  break;
		case 'day':
			time = DateFormat(value.beginDate,'yyyy/mm/dd HH:MM:ss')+'-'+DateFormat(value.endDate,'HH:MM:ss');
		  break;
		default:
			time = DateFormat(value.beginDate,'yyyy/mm/dd HH:MM:ss')+'-'+DateFormat(value.endDate,'yyyy/mm/dd HH:MM:ss');
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
		console.log('=====',State.cmts)
		let partakeMan =[{
			label: '会员专属',
			value: 'MEMBER_ONLY'
		},{
			label: '会员优先',
			value: 'MEMBER_FIRST'
		},{
			label: '仅限氪空间项目',
			value: 'KR_PROJECT_ONLY'
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
					<DrawerTitle title ='查看活动' onCancel = {this.onCancel}/>
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



							<KrField grid={1/2} name="name" type="labelText" inline={false} label="活动名称" requireLabel={true} style={{width:276}} value={initValue.name} />
							<KrField grid={1/2} name="type" type="labelText" inline={false} label="活动类型" requireLabel={true} style={{width:'252px'}} value={activityType} />
							<KrField grid={1} name="date" type="labelText" inline={false} label="活动时间" requireLabel={true} value={time} />
							<KrField grid={1} name="date" type="labelText" inline={false} label="举办地址" requireLabel={true} value={`${initValue.cityName}${initValue.countyName}-${initValue.address}`} />
							{State.cmts && State.cmts.length == 1 && <KrField grid={1} name="date" type="labelText" inline={false} label="活动推送社区" requireLabel={true} value={`${State.cmts[0].name}`} />}
							{State.cmts && State.cmts.length >1  && <KrField grid={1} name="date" type="labelText" inline={false} label="活动推送社区" requireLabel={true} value={`${State.cmts[0].name}等${State.cmts.length}个社区`} />}
							<KrField grid={1/2} name="date" type="labelText" inline={false} label="地址坐标" requireLabel={true} value={`X:${initValue.xPoint} Y:${initValue.yPoint}`} />
							<KrField grid={1/2} name="date" type="labelText" inline={false} label="排序" requireLabel={true} value={initValue.sort}  defaultValue='无'/>

							<KrField grid={1/2} name="contact" type="labelText" inline={false} label="活动联系人" style={{width:'252px'}} value={initValue.contact} defaultValue='无'/>
							<KrField grid={1/2} name="contactPhone" type="labelText" inline={false} label="活动联系人电话" style={{width:'252px',marginLeft:20}} value={initValue.contactPhone} defaultValue='无'/>
							<KrField name="joinType" component="labelText" inline={false}label="参与人"style={{width:'252px'}}value={joinType}/>
							<KrField grid={1/2} name="maxPerson" type="labelText" inline={false} label="人数限制" style={{width:'252px',marginLeft:20}} value={initValue.maxPerson}  defaultValue='无'/>
							<KrField grid={1/2} name="top" type="labelText" inline={false} label="是否置顶"  style={{width:'252px'}} value={initValue.top==1?'置顶':'不置顶'}  />

							<div style={{display:initValue.top?"block":"none",fontSize:14,marginBottom:10}}>
								<span style={{fontSize:14,color:"red",marginRight:8}}>*</span>
								<span>上传轮播图</span>
							</div>

							<div className="photo-box" style={{display:initValue.top?'block':'none'}}>
								<span className="photo-title">电脑端轮播图</span>
								<div className="photo-img-box" style={{marginLeft:15}}>
									<img src={initValue.pcCoverPic} style={{width:'100%',height:'100%'}}/>
								</div>
							</div>
							<div className="photo-box" style={{display:initValue.top?'block':'none'}}>
								<span className="photo-title">移动端轮播图</span>
								<div className="photo-img-box" style={{width:217,height:157,marginLeft:15}}>
									<img src={initValue.appCoverPic} style={{width:'100%',height:'100%'}}/>
								</div>
							</div>

							<div className="photo-box">
								<span className="photo-title">上传列表详情图</span>
								<div className="photo-img-box" style={{width:390,height:230,marginLeft:15}}>
									<img src={initValue.infoPic} style={{width:'100%',height:'100%'}}/>

								</div>
							</div>

							<div className="photo-box activity-content">
								<span className="photo-title">活动介绍</span>
								<div className={State.contentHeightAuto?'content-info auto':'content-info stationList'} id="clampjs" style={{margin:"12px 0 0 14px"}}>
									{ReactHtmlParser(State.detailContent)}
								</div>
							{State.contentHeightAutoShow && State.detailContent && <div className="Btip"  style={{height:70}} onTouchTap={this.showMoreContent}> <p style={{width:'auto',textAlign:'center'}}><span>{State.contentHeightAuto?'收起':'查看余下全文'}</span><span className={State.contentHeightAuto?'Toprow':'Bottomrow'} style={{display:'block',margin:'0 auto'}}></span></p></div>}

							</div>

						</div>

					</div>
					<div className="enroll-info" style={{marginTop:'-14px'}}>
						<div className="enroll-title">
							<span>2</span>
							<span></span>
							<span>报名信息</span>
						</div>
						<div className="enroll-detail-info-detail">
							<img src={require('./images/selectOne.svg')} className="select-one-see"/>

							<Grid style={{marginTop:5,paddingBottom:15,marginLeft:17}}>
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
					<div className="enroll-info-last" style={{minHeight:150,paddingBottom:30}}>
						<img src={require('./images/selectOne.svg')} className="select-one-see"/>

						<div className="enroll-title">
							<span>3</span>
							<span></span>
							<span>报名情况</span>
						</div>
						<div className={State.HeightAuto?'auto':'stationList'}  style={{overflow:'initial'}}>
							<Table displayCheckbox={false} style={{margin:"58px 0 0 38px",width:547}}>
								<TableHeader>
									{
										State.actField.items.length && State.actField.actEnroll && State.actField.actEnroll.map((item,index)=>{
											return (
												<TableHeaderColumn key={index}>{item}</TableHeaderColumn>
											)
										})
									}
								</TableHeader>
								<TableBody>
								{
									State.actField.items.length && State.actField.actEnroll && State.actField.items.map((item,index)=>{
									return (
										<TableRow key={index}>
											{list.name && <TableRowColumn>

												<span style={{display:"inline-block",width:"100%",overflow:"hidden",textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.name}</span>
												<Tooltip offsetTop={5} place='top' style={{marginLeft:5}}>{item.name}</Tooltip>

											</TableRowColumn>}
											{list.phone && <TableRowColumn >{item.phone}</TableRowColumn>}
											{list.company && <TableRowColumn>
												<span style={{display:"inline-block",width:"100%",overflow:"hidden",textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.company}</span>
												<Tooltip offsetTop={5} place='top' style={{marginLeft:5}}>{item.company}</Tooltip>
											</TableRowColumn>}
											{list.address && <TableRowColumn>
												<span style={{display:"inline-block",width:"100%",overflow:"hidden",textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{item.cityName}{item.countyName}{item.address}</span>
												<Tooltip offsetTop={5} place='top' style={{marginLeft:5}}>{item.cityName}{item.countyName}{item.address}</Tooltip>
											</TableRowColumn>}
											{list.job && <TableRowColumn>
												<span style={{display:"inline-block",width:"100%",overflow:"hidden",textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
													{item.job}
												</span>
												<Tooltip offsetTop={5} place='top' style={{marginLeft:5}}>{item.job}</Tooltip>
											</TableRowColumn>}
									   	</TableRow>
									);
								})}
								</TableBody>
							</Table>
						</div>
						{!State.actField.items.length && <div style={{fontSize:'14px',paddingLeft:43,marginTop:'-12px'}}>暂无</div>}


						{State.actField.items.length>5?<div className="Btip"  style={{height:42}} onTouchTap={this.showMore}> <p style={{textAlign:'center'}}><span style={{display:'inline-block'}}>{State.HeightAuto?'收起':'查看全部'}</span><span className={State.HeightAuto?'Toprow':'Bottomrow'} style={{margin:'0 auto',display:'block'}}></span></p></div>:''}

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
