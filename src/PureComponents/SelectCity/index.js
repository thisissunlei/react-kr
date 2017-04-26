import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {
	KrField,
	Button,
	Section,
	Grid,
	Row,
	Col,
	ListGroup,
	ListGroupItem,
	SearchForms
} from 'kr-ui';
import {
	observer,
	inject
} from 'mobx-react';
import './index.less';
@inject("CommunityMeetingModel")
@inject("CommunityStationModel")
@observer
export default class  SelectCity extends React.Component{

	constructor(props,context){
		super(props, context);

		this.state={
			 cityData:[],
			 type:''
		}

	}

//ajax数据
 ajaxDataHttp=(name)=>{
	 let {type}=this.props;
	 let searchParams={};
	 searchParams.type=type;
	 searchParams.name=name;
	 var _this=this;
		Http.request('type-city-community',searchParams).then(function(response) {
			_this.setState({
				cityData:response.cityCommunitys,
        type:response.type
			})
	 }).catch(function(err) {
			Message.error(err.message);
	 });
 }

//搜索
 onSearchSubmit=(params)=>{
	this.ajaxDataHttp(params.content);
 }

 //跳转社区
 switchGoDetail=(communityId)=>{
	 let {type}=this.state;
	 if(type=='STATION'){
	 	 this.props.CommunityStationModel.searchParams={
	 	 	page:1,
	 	 	pageSize:15,
	 	 	communityId:communityId
	 	 }
		 window.location.href=`./#/operation/communityAllocation/${communityId}/communityStationDetail`;
	 }
	 if(type=='SPACE'){
	 	 this.props.CommunityMeetingModel.searchParams={
	 	 	page:1,
	 	 	pageSize:15,
	 	 	communityId:communityId
	 	 }
		 window.location.href=`./#/operation/communityAllocation/${communityId}/communityMeetingRoomDetail`;
	 }

 }

 componentDidMount(){
   this.ajaxDataHttp('');
 }

	render(){

		let {cityData}=this.state;
		let {type}=this.props;
		var title='';
		if(type=='SPACE'){
			title="会议室配置"
		}
		if(type=='STATION'){
			title="工位配置"
		}
		if(type=='GRAPH'){
			title="工位平面图配置"
		}

		return(

			<div className='m-commonCity'>
					<Section title={title} description="" style={{marginBottom:-5,minHeight:910}}>
					    <Row style={{paddingBottom:21,position:'relative',zIndex:5,borderBottom:'solid 1px #b1d8ff'}}>


									<Col  style={{marginTop:0,float:"right",marginRight:-10}}>
										<ListGroup>
											<ListGroupItem><SearchForms placeholder='请输入您要查询的内容 ' onSubmit={this.onSearchSubmit}/></ListGroupItem>
										</ListGroup>
									</Col>
							</Row>

		         <div style={{marginTop:'20px',paddingBottom:20}}>
							 {cityData.map((item,index)=>{
								 return (
								 <div key = {index}>
									 <div className='city-name'>{item.name}</div>
									 <ul>
									   {item.communitys.map((items,index)=>{
		                   return (<li key = {index} className='community-name' onClick={this.switchGoDetail.bind(this,items.id)}>{items.name}</li>)
										 })}
									 </ul>
		             </div>
								 )
							 })
						 }
           </div>
					</Section>
			</div>
		);
	}

}
