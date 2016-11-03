import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';
import {Actions,Store} from 'kr/Redux';
import './index.less';
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
		this.state = {	
		  primaryR:'true',
		  primaryI:'false'
		}
       
	}

	componentDidMount() {
       
	}

	onSearch(type,childType,id,propInfo){    
		const {onSearch,params} = this.props;
        
        if(type=='PAYMENT'){
          this.setState({
			primaryR:'true',
			primaryI:'false'	
	      });
        }

        if(type=='INCOME'){
        this.setState({
			primaryR:'false',
			primaryI:'true'	
	      });
        }
        
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

		            
		            <LineText title='回款' primary={this.state.primaryR} onClick={this.onSearch.bind(this,'PAYMENT','basic','','SETTLED')}/>

					<Table  style={{marginTop:30}} displayCheckbox={false}>
					  
					 <TableBody>
						 {detailPayment.map((item,index)=><TableRow key={index}>			
							<TableRowColumn  className='tapText' onTouchTap={this.onSearch.bind(this,'PAYMENT',item.propcode,item.id,item.propInfo)}>{item.propname}</TableRowColumn>
							<TableRowColumn>{item.propamount}</TableRowColumn>					
						 </TableRow>
						  )}
					</TableBody>
					</Table>
                    
                    <LineText title='收入' primary={this.state.primaryI} onClick={this.onSearch.bind(this,'INCOME','basic','','SETTLED')}/>
					<Table  style={{marginTop:30}} displayCheckbox={false}>
					<TableBody>
						 {detailIncome.map((item,index)=><TableRow key={index}>						
							<TableRowColumn  className='tapText' onTouchTap={this.onSearch.bind(this,'INCOME',item.propcode,item.id,item.propInfo)}>{item.propname}</TableRowColumn>
							<TableRowColumn>{item.propamount}</TableRowColumn>					
						 </TableRow>
						  )}
					</TableBody>
					</Table>
                    <LineText title='余额' primary='false'/>
					<Table  style={{marginTop:30}} displayCheckbox={false}>
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




