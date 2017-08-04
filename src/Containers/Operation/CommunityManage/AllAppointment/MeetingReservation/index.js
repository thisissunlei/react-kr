
import React from 'react';
import {initialize} from 'redux-form';

import {Actions,Store} from 'kr/Redux';
import {Http,DateFormat} from 'kr/Utils';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	Dialog,
	SearchForms,
	ListGroup,
	ListGroupItem,
	Message,
	Title,
	SnackTip,
	Pagination,
	KrField,
	Loading,
	Nothing

} from 'kr-ui';


import Timeline from './Timeline';
import SearchUpperForm from './SearchUpperForm';
import './index.less';

export default class MeetingReservation extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			data : '',
			searchParams:{
				communityId:"",
				date:DateFormat(new Date(),"yyyy-mm-dd hh:MM:ss"),
				floor:"",
				page:1,
				pageSize:4
			},
			page:1,
			pageSize:4,
			totalCount:'',
			isRefreshList:true,
		}
		this.refreshList();
		
	}
	 //转化为时分
    hourFormat = (time) =>{
        
        let date = DateFormat(time,24).split(" ");
        let obj = {
            h:Number(date[date.length-1].split(":")[0]),
            m:Number(date[date.length-1].split(":")[1]),
        }
        return obj;
    }
	//生成时间轴的方法
	generateElems = () =>{
		const {data} = this.state;
		let _this = this;
		if(!data){
			return null;
		}
		let elems = data.map(function(item,index){
				
			if(_this.hourFormat(item.orderEndTime).h==0){
				item.orderEndTime=item.orderEndTime-1
			}
			return <Timeline 
						key = {index}
						data = {item}
						mtDelete = {_this.mtDelete}
				   />
		})
		return elems;

	}
	//分页点击
	onPageChange = (page) =>{
		 let {searchParams} = this.state;
		 let _this = this;
		
		 this.setState({
			 searchParams:{
				communityId:searchParams.communityId,
				date:searchParams.date,
				floor:searchParams.floor,
				page:page,
				pageSize:searchParams.pageSize
			 }
		 },function(){
			 _this.refreshList();
			 
		 })
	}
	onSubmit = (params) => {
		let {searchParams} = this.state;
		let _this = this;
		this.setState({
			searchParams:{
				communityId:params.communityId,
				date:params.time,
				floor:params.floor,
				page:searchParams.page,
				pageSize:searchParams.pageSize
			 }
		},function(){
			 _this.refreshList();
		})

	}
	//刷新列表
	refreshList = () => {
		let _this = this;
		let {searchParams} = this.state;
			
		let data = Object.assign({}, searchParams);
		this.setState({
			isRefreshList:true,
		})
		Http.request("meeting-reservation",data).then(function(response) {
			
			_this.setState({
				data:response.items,
				page:response.page,
				pageSize:response.pageSize,
				totalCount:response.totalCount,
				isRefreshList:false,
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	//删除预约
	mtDelete = (data,fn) =>{
		const {searchParams} = this.state;
		let _this = this;
		
		 fn();
		Http.request("meeting-reservation-delete",{id:data.id}).then(function(response) {
			 _this.refreshList();
			 fn();
			
		}).catch(function(err) {
			Message.error(err.message);
		});

	}
    render(){
		const {page,pageSize,totalCount,isRefreshList,data} = this.state;
		
        return(
            <div className="metting-reservation">
				<Title value="空间预订"/>
      		
				<SearchUpperForm onSubmit = {this.onSubmit}/>
				<div className = "metting-reservation-content">
					
					{  
						isRefreshList ? <Loading /> : this.generateElems()
					}
					{!isRefreshList && data.length == 0 && <Nothing style = {{marginTop:100}}/>}
				</div>
				<div style = {{marginTop:72,marginBottom:40}}>
					{data.length != 0 &&<Pagination  
						totalCount={totalCount} 
						page={page} 
						pageSize={pageSize} 
						onPageChange={this.onPageChange}
					/>}
				</div>
				
	           
            </div>
        );
    }


}
