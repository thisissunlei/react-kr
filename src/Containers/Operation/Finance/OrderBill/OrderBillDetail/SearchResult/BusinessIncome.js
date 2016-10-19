import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

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


export default class BusinessIncome extends Component{

	static PropTypes = {
		detailResult:React.PropTypes.object
	}

	constructor(props,context){
		super(props, context);

		this.state = {			
			item:{}
		}
	}

	componentDidMount() {
         var _this = this;
		Store.dispatch(Actions.callAPI('getPageAccountFlow',{
			accountType:'PAYMENT',
			orderId:'3',
            propertyId:'5'
		})).then(function(response){
            _this.setState({
            	item:response
            })	
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});
	}

	render(){
		const {detailResult}=this.props;
	    let  items=this.state.item.items;

		//console.log("kkkkk",items);
        console.log(";;;;",items);
		return(
      
			 <div>
				  <Row>
					<Col md={2}><Button label="回款" primary={true}/></Col>
					<Col md={2}><Button label="开票" primary={true}/></Col>
                  </Row>

                  
                  <Table displayCheckbox={false}>
			          <TableHeader>
			          <TableHeaderColumn></TableHeaderColumn>
			          <TableHeaderColumn>序号</TableHeaderColumn>
			          <TableHeaderColumn>交易日期</TableHeaderColumn>
			          <TableHeaderColumn>代码</TableHeaderColumn>
			           <TableHeaderColumn>类别</TableHeaderColumn>
			          <TableHeaderColumn>款项</TableHeaderColumn>
			          <TableHeaderColumn>金额</TableHeaderColumn>
			           <TableHeaderColumn>备注</TableHeaderColumn>
			           <TableHeaderColumn>操作</TableHeaderColumn>
			         </TableHeader>
			         <TableBody>        
          
			         {items.map((item,index)=><TableRow key={index}>
			              <TableRowColumn type="hidden" value={item.id}></TableRowColumn>
			              <TableRowColumn>{index+1}</TableRowColumn>
			              <TableRowColumn>{item.occuryear}</TableRowColumn>
			              <TableRowColumn>{item.accountName}</TableRowColumn>
			              <TableRowColumn>{item.recordType}</TableRowColumn>
			              <TableRowColumn>{item.propertyName}</TableRowColumn>
			              <TableRowColumn>{item.finaflowAmount}</TableRowColumn>
			               <TableRowColumn>{item.finaflowdesc}</TableRowColumn>
			              <TableRowColumn>
							  <Button label="查看" component="labelText" type="link"/>
						 </TableRowColumn>
			            </TableRow>
			         )}

           </TableBody>
       </Table> 



				  
			</div>		

		);

	}

}







