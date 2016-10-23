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


export default class Basic extends Component{

	static PropTypes = {
		params:React.PropTypes.object,
		type:React.PropTypes.string
	}

	constructor(props,context){
		super(props, context);

		this.state={
           item:{},
           Params:{
           	accountType:'INCOME',
           }
		}
	}


	componentDidMount() {
        
	}

	render(){

	   let {params,type} = this.props;

	   let items=this.state.item.items;
		console.log('state',this.state.Params)	
	   
	    if(!items){
	    	items=[];
	    }

		if(params.childType != type){
			return  null;
		}

		return(

			 <div>
            <Table style={{marginTop:10}} ajax={true}  ajaxUrlName='getPageAccountFlow' ajaxParams={this.state.Params}  >
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
	                <TableRow>
	                	<TableRowColumn name="id"></TableRowColumn>
	                    <TableRowColumn name="occuryear"></TableRowColumn>
	                    <TableRowColumn name="accountName"></TableRowColumn>
	                    <TableRowColumn name="recordType"></TableRowColumn>
	                    <TableRowColumn name="propertyName"></TableRowColumn>
	                    <TableRowColumn name="finaflowAmount"></TableRowColumn>
	                    <TableRowColumn name="finaflowdesc"></TableRowColumn>
	                    <TableRowColumn>
	                        <Button label="查看"  type="link" primary={true} />
	                    </TableRowColumn>
	                  </TableRow>
	              </TableBody>
            </Table>

			</div>		

		);

	}

}







