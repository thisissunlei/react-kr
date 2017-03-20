import React, { Component, PropTypes } from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	KrField,
	Row,
	Col,
	Button,
	Notify,
	IframeContent,
	KrDate,
	DotTitle,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	Paper,
	CircleStyle,
	Tooltip

} from 'kr-ui';
import SearchForm from "./SearchForm";
export default class AppointmentVisit extends Component {
	constructor(props, context) {
		super(props, context);
		this.state={
			searchParams: {
				page: 1,
				pageSize: 15,
				createDateEnd:'',
				createDateStart:'',
				other:false
			},
		}
	}
	render(){
		let {searchParams} = this.state;

		return (
			<div className="appointment-visit">
					<SearchForm />
					<div className="all-read" onClick={this.allReadClick}>全部标为已读</div>
					<Table  style={{marginTop:10}}
						ajax={true}
						
						onProcessData={
							(state)=>{
								return state;
							}
						}
						displayCheckbox={false}
						ajaxParams={searchParams}
						ajaxFieldListName="items"
						ajaxUrlName='messageRemindCustomerSwitching'
					>											
						<TableBody style={{background:"#fff",border:"0px"}}>

							<TableRow style={{background:"#fff",border:"0px"}}>

								<TableRowColumn 
									style={{overflow:"visible",textAlign: "center",width:462,lineHeight:"42px"}} 
									name="msgContent" 
									component={
										(value,oldValue) => {
											return (
														<div className='appointment-visit-content'>
															<span className="appointment-visit-spot"></span>
															{value}
														</div>
													);
										}
									} 
								>
								</TableRowColumn>	

								<TableRowColumn style={{overflow:"visible",textAlign: "center",}} 
									name="createDate" 
									component={
										(value,oldValue) => {
											return (
												<div className="appointment-visit-time"> value</div>
											);
										}
									} 
								>
								</TableRowColumn>

								<TableRowColumn style={{overflow:"visible",textAlign: "center"}} 
									name="createDate" 
									component={
										(value,oldValue) => {
											return (
												<div className="appointment-visit-read">value</div>
											);
										}
									} 
								>
								</TableRowColumn>

							 </TableRow>
						</TableBody>
						
							<TableFooter ></TableFooter>
4					</Table>
			</div>
			);
	}

	
}