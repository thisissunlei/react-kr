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
	LineText,
	ListGroup,
	ListGroupItem
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


		            <ListGroup inline={false}>
		              {detailPayment.map((item,index)=>
		            	<ListGroupItem key={index}>
                          <span className='receivedText' onTouchTap={this.onSearch.bind(this,'PAYMENT',item.propcode,item.id,item.propInfo)}>{item.propname}</span>
                          <span className='receivedMoney'>{item.propamount}</span>
		            	</ListGroupItem>
		              )}
		            </ListGroup>

					
                    
                    <LineText title='收入' primary={this.state.primaryI} onClick={this.onSearch.bind(this,'INCOME','basic','','SETTLED')}/>
					
                    <ListGroup inline={false}>
		              {detailIncome.map((item,index)=>
		            	<ListGroupItem key={index}>
                          <span className='receivedText' onTouchTap={this.onSearch.bind(this,'INCOME',item.propcode,item.id,item.propInfo)}>{item.propname}</span>
                          <span className='receivedMoney'>{item.propamount}</span>
		            	</ListGroupItem>
		              )}
		            </ListGroup>

					
                    <LineText title='余额' primary='false' style={{color:'#999',cursor:'default'}} styleLine={{background:'#999'}}/>
					
                     <ListGroup inline={false}>
		               <ListGroupItem>
                          <span className='receivedText' style={{cursor:'default'}}>余额</span>
                          <span className='receivedMoney'>{detailBalance}</span>
		            	</ListGroupItem>
		            </ListGroup>

					
			
		</div>		

		);

	}
}




