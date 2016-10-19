
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
} from 'kr-ui';


 class IncomePayment extends Component{

	 static PropTypes = {
		 
	 }

	
	
	componentDidMount() {
      
		
	}
	

	

	render(){

		

		return (
			<div>

			   <Grid>
				<Row>
					<Col md={2}> <Button  label="回款" /> </Col>
					<Col md={2}> <Button  label="退款" /> </Col>
				</Row>
				</Grid>

				<Table  style={{marginTop:10}} displayCheckbox={true} >
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
						 <TableRow displayCheckbox={true}>
						<TableRowColumn ></TableRowColumn>
						<TableRowColumn></TableRowColumn>
						<TableRowColumn ></TableRowColumn>
						<TableRowColumn ></TableRowColumn>
						<TableRowColumn ></TableRowColumn>
						<TableRowColumn ></TableRowColumn>
						<TableRowColumn ></TableRowColumn>
						<TableRowColumn>
							  <Button label="查看" />
						 </TableRowColumn>
					 </TableRow>
				</TableBody>
			 </Table>
		</div>	
				
		);
	}
}



