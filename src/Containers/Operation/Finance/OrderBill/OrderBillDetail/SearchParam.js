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
	}
     
	constructor(props,context){
		super(props, context);

		this.onSearch = this.onSearch.bind(this);

	}

	componentDidMount() {
       
	}

	onSearch(type,childType,id){


		const {onSearch} = this.props;

		var searchParam = {};

		searchParam.type = type;
		searchParam.childType = childType;
		searchParam.id = id;

		console.log(type,childType,id);


		onSearch && onSearch(searchParam);


	}

	render(){
        
         const {detailPayment,detailIncome,detailBalance}=this.props;

		//console.log("jjj",this.props.detailPayment);
		//console.log("uuu",this.props.detailIncome);
		//console.log("ooo",this.props.detailBalance);
        
       


		return(

			<div>
              
             <Row>                  
                <Col md={4} >
                        
                       
						<Table  style={{marginTop:10}} displayCheckbox={false}>
						  <TableHeader>
							
							
							<TableHeaderColumn onTouchTap={this.onSearch.bind(this,'RECEIVED','basic','')}>回款</TableHeaderColumn>
						    </TableHeader>

						 <TableBody>
						     {detailPayment.map((item,index)=><TableRow key={index}>			
								<TableRowColumn onTouchTap={this.onSearch.bind(this,'RECEIVED',item.propcode,item.id)}>{item.propname}</TableRowColumn>
								<TableRowColumn>{item.propamount}</TableRowColumn>					
							 </TableRow>
							  )}
						</TableBody>
						</Table>

						<Table  style={{marginTop:10}} displayCheckbox={false}>
						   <TableHeader>
							
							
							<TableHeaderColumn onTouchTap={this.onSearch.bind(this,'INCOME','basic','')}>收入</TableHeaderColumn>
						    </TableHeader>

						<TableBody>
						     {detailIncome.map((item,index)=><TableRow key={index}>						
								<TableRowColumn onTouchTap={this.onSearch.bind(this,'INCOME',item.propcode,item.id)}>{item.propname}</TableRowColumn>
								<TableRowColumn>{item.propamount}</TableRowColumn>					
							 </TableRow>
							  )}
						</TableBody>
						</Table>

						<Table  style={{marginTop:10}} displayCheckbox={false}>
						  <TableHeader>
							
							<TableHeaderColumn>余额</TableHeaderColumn>
						   </TableHeader>

						 <TableBody>
						      <TableRow displayCheckbox={false}>						
								<TableRowColumn>余额</TableRowColumn>
								<TableRowColumn>{detailBalance}</TableRowColumn>					
							 </TableRow>
						</TableBody>
						</Table>
                     </Col> 
                     
                  </Row>
				
			</div>		

		);

	}

}




