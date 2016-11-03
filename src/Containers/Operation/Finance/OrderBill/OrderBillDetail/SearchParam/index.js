import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';
import {Actions,Store} from 'kr/Redux';
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
	Notify,
	List,
 	ListItem,
	LabelText,
	LineText
} from 'kr-ui';


export default class SearchParam extends Component{

	static defaultProps = {
		detail:{

		},
	}

	static PropTypes = {
		detailPayment:React.PropTypes.object,
		detailIncome:React.PropTypes.object,
		detailBalance:React.PropTypes.object,
		params:React.PropTypes.object
	}
     
	constructor(props,context){
		super(props, context);

		this.onSearch = this.onSearch.bind(this);

	}

	componentDidMount() {
       
	}

	onSearch(type,childType,id,propInfo){    
		const {onSearch,params} = this.props;

		var searchParam = {};

		searchParam.accountType = type;
		searchParam.childType = childType;
		searchParam.propertyId = id;
		searchParam.propInfo=propInfo;
		searchParam.orderId = params.orderId;
		onSearch && onSearch(searchParam);
	}

	render(){
         const {detailPayment,detailIncome,detailBalance}=this.props;

		return(

		<div>     

		            
		            <LineText title='回款' primary='false' onTouchTap={this.onSearch.bind(this,'PAYMENT','basic','','SETTLED')}/>

					<Table  style={{marginTop:10}} displayCheckbox={false}>
					  
					 <TableBody>
						 {detailPayment.map((item,index)=><TableRow key={index}>			
							<TableRowColumn onTouchTap={this.onSearch.bind(this,'PAYMENT',item.propcode,item.id,item.propInfo)}>{item.propname}</TableRowColumn>
							<TableRowColumn>{item.propamount}</TableRowColumn>					
						 </TableRow>
						  )}
					</TableBody>
					</Table>

					<Table  style={{marginTop:10}} displayCheckbox={false}>
					   <TableHeader>
						<TableHeaderColumn onTouchTap={this.onSearch.bind(this,'INCOME','basic','','SETTLED')} colSpan={2}>收入</TableHeaderColumn>
						</TableHeader>

					<TableBody>
						 {detailIncome.map((item,index)=><TableRow key={index}>						
							<TableRowColumn onTouchTap={this.onSearch.bind(this,'INCOME',item.propcode,item.id,item.propInfo)}>{item.propname}</TableRowColumn>
							<TableRowColumn>{item.propamount}</TableRowColumn>					
						 </TableRow>
						  )}
					</TableBody>
					</Table>

					<Table  style={{marginTop:10}} displayCheckbox={false}>
					  <TableHeader>
						<TableHeaderColumn colSpan={2}>余额</TableHeaderColumn>
					   </TableHeader>
					 <TableBody>
						  <TableRow displayCheckbox={false}>						
							<TableRowColumn>余额</TableRowColumn>
							<TableRowColumn>{detailBalance}</TableRowColumn>					
						 </TableRow>
					</TableBody>
					</Table>
			
		</div>		

		);

	}
}




