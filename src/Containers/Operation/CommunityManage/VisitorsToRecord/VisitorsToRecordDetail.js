
import React, {Component, PropTypes} from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import {
	observer
} from 'mobx-react';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
	Message,
	Loading
} from 'kr-ui';

import {Http,DateFormat} from "kr/Utils";
import {mobxForm}  from 'kr/Utils/MobxForm';
import './index.less';

 class VisitorsToRecordDetail extends Component{



	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		this.state = {
			detail:{},
			loading:true,
		}

		this.getDetail(this.props.detailData.id);



	}

	//获取页面详情信息
	 getDetail = (id) =>{
	 	let _this = this;
	 	const { select } = this.props;
	 	this.setState({
	 		loading:true,
	 	})
	 	Http.request("visit-record-detail",{id:id}).then(function(detail){
	 		_this.setState({
	      	detail:detail,
	      	loading:false,
	      })
   		}).catch(function(err) {
			Message.error(err.message);
		});
	 }

	 //
	 // getLable = (items,value) => {
	 // 	let label = "";
	 // 	items.map(function(item,index){
	 // 		if(item.value == value){
	 // 			label = item.label;
	 // 		}

	 // 	})
	 // 	return label;

	 // }

	componentDidMount(){

	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();

	}
	generateDetail = () =>{
	   let {detailData} = this.props;

	}
	render(){
		const {detailData,select,} = this.props;
		const {detail,loading}  = this.state;
		const typeValue = detailData.typeId;
		if(loading){
			return <Loading />
		}

		return (
      <div className = "m-newMerchants m-visitors-to-record-detail">
        <div className="title" style={{marginBottom:"30px"}}>
			<div><span className="new-icon"></span><label className="title-text">查看访客</label></div>
			<div className="customer-close" onClick={this.onCancel}></div>
		</div>
        <KrField component="labelText" grid={1/2} label="社区："  value = {detail.communityName} requireBlue={true}  inline={true}/>
        <KrField component="labelText" grid={1/2} label="类型:" value={detail.typeName} requireBlue={true} />
        {typeValue ==50 &&<KrField component="labelText" grid={1/2} label="面试类型：" value={detail.interviewTypeName} defaultValue="无" requireBlue={true} />}
        {typeValue ==51 &&<KrField component="labelText" grid={1/2} label="活动类型：" value={detail.activityTypeName} defaultValue="无" requireBlue={true} />}
        <KrField component="labelText" grid={1/2} label="姓名：" value={detail.name} defaultValue="无" requireBlue={true} />
        <KrField component="labelText" grid={1/2} label="联系方式：" value={detail.tel} defaultValue="无" requireBlue={true} />
        {typeValue ==52 &&<KrField component="labelText" grid={1/2} label="微信：" value={detail.wechat} defaultValue="无" requireBlue={true} />}
        {(typeValue == 49 || typeValue == 732) &&<KrField component="labelText" grid={1/2} label="拜访人数：" value={detail.num} defaultValue="无" requireBlue={true} />}
        <KrField component="labelText" grid={1/2} label="邮箱：" value={detail.email} defaultValue="无" requireBlue={true} />
        {typeValue ==52 &&<KrField component="labelText" grid={1/2} label="参观目的：" value={detail.purposeName} defaultValue="无" requireBlue={true} />}
        {typeValue ==50 &&<KrField component="labelText" grid={1/2} label="面试轮次：" value={detail.interviewRoundName} defaultValue="无" requireBlue={true} />}
        <KrField component="labelText" grid={1/2} label="拜访日期：" value={DateFormat(detail.vtime,"yyyy-mm-dd")} defaultValue="无" requireBlue={true} />
        {(typeValue == 49 || typeValue == 732) &&<KrField component="labelText" grid={1/2} label="被拜访人：" value={detail.meetedMan} defaultValue="无" requireBlue={true} />}
      </div>

		);
	}
}

export default VisitorsToRecordDetail;
