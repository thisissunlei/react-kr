
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
	KrField

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
				communityId:1,
				date:'2017-05-6 00:00:00',
				floor:3,
				page:2,
				pageSize:15
			},
			page:'',
			pageSize:15,
			totalCount:'',
		}
		this.refreshList();
		
	}
	//生成时间轴的方法
	generateElems = () =>{
		const {data} = this.state;
		let _this = this;
		if(!data){
			return null;
		}
		
		let elems = data.map(function(item,index){
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
			console.log(searchParams,">>>>--")
			
		Http.request("meeting-reservation",data).then(function(response) {
			
			_this.setState({
				data:response.items,
				page:response.page,
				pageSize:response.pageSize,
				totalCount:response.totalCount,
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
			 console.log("?????")
		}).catch(function(err) {
			Message.error(err.message);
		});

	}
    render(){
		const {page,pageSize,totalCount} = this.state;
        return(
            <div className="metting-reservation">
				<Title value="会议室预定"/>
      		<Section title="会议室预定"  style={{marginBottom:-5,minHeight:910}}>
				<SearchUpperForm onSubmit = {this.onSubmit}/>
				<div className = "metting-reservation-content">
					
					{
						this.generateElems()
					}
				</div>
				<div style = {{marginTop:72}}>
					<Pagination  
						totalCount={totalCount} 
						page={page} 
						pageSize={pageSize} 
						onPageChange={this.onPageChange}
					/>
				</div>
				
	           </Section>
            </div>
        );
    }


}
