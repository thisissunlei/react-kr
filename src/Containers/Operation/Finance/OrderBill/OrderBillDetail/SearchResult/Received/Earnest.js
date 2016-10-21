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

import {Actions,Store} from 'kr/Redux';

export default class Earnest extends Component{

	static PropTypes = {
		params:React.PropTypes.object,
		type:React.PropTypes.string
	}

	constructor(props,context){
		super(props, context);

		this.state={
           item:{}
		}
	}


	componentDidMount() {
        var _this = this;
		Store.dispatch(Actions.callAPI('getPageAccountFlow')).then(function(response){      
			_this.setState({
				item:response
			});
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});
	}

	render(){

		let {params,type} = this.props;

		if(params.childType != type){
			return  null;
		}

        let items=this.state.item.items;

	   
	    if(!items){
	    	items=[];
	    }


		return(

			 <div>
               <Row>
					<Col md={2}><Button label="回款" primary={true}/></Col>
					<Col md={2}><Button label="转押金" primary={true}/></Col>
					<Col md={2}><Button label="转营业外收入" primary={true}/></Col>
					
                  </Row>

                  
                  <Table displayCheckbox={false}>
			          <TableHeader>
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







