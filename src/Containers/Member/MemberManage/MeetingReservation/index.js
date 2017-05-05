
import React from 'react';
import {initialize} from 'redux-form';

import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';

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
			searchParams:{},
		}
	}
	//生成时间轴的方法
	generateElems = () =>{
		if(!data){
			return null;
		}
		let elems = data.map(function(item,index){
			return <Timeline 
						key = {index}
						data = {items}
				   />
		})


	}
	//分页点击
	onPageChange = (page) =>{
		 console.log(page,">>>>>>>");
	}
	onSubmit = (searchParams) => {
		console.log(searchParams,'????')
		this.setState({
			searchParams,
		})

	}
	//刷新列表
	refreshList = (params) =>{

	}
	//删除预约
	delete = (data) =>{
		const {searchParams} = this.state;

	}
    render(){

        return(
            <div className="metting-reservation">
				<Title value="会议室预定"/>
      		<Section title="会议室预定"  style={{marginBottom:-5,minHeight:910}}>
				<SearchUpperForm onSubmit = {this.onSubmit}/>
				<div className = "metting-reservation-content">
					<Timeline 
						delete = {this.delete}
					/>
				</div>
				<div style = {{marginTop:72}}>
					<Pagination  
						totalCount={15} 
						page={1} 
						pageSize={3} 
						onPageChange={this.onPageChange}
					/>
				</div>
				
	           </Section>
            </div>
        );
    }


}
