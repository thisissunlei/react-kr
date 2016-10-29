import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';
import {reduxForm,submitForm,change,reset} from 'redux-form';
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
	Dialog,
	BreadCrumbs
} from 'kr-ui';


export default  class EmployessTable extends Component {

	 static defaultProps = {
		 activity:false,
		 params:{
		 	mainBillId:1,
		 	communityId:1
		 }
	 }

	 static PropTypes = {
		 params:React.PropTypes.object,
		 activity:React.PropTypes.bool,
	 }

	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){

	}

  render() {

	  let {activity} = this.props;

	  if(!activity){
		  return null;
	  }

    return (

		 <div className="employees-content">

				<Table  style={{marginTop:10}} displayCheckbox={false} ajax={false}  ajaxUrlName='findFinaFinaflowPropertyList' pagination={false} >
					<TableHeader>
						<TableHeaderColumn name="propcode">工位编号</TableHeaderColumn>
						<TableHeaderColumn>租赁起始时间</TableHeaderColumn>
						<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
						<TableHeaderColumn>员工</TableHeaderColumn>
						<TableHeaderColumn>电话</TableHeaderColumn>
						<TableHeaderColumn>状态</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>

				<TableBody>
						 <TableRow displayCheckbox={true}>
						<TableRowColumn name="propcode" ></TableRowColumn>
						<TableRowColumn name="propname" ></TableRowColumn>
						<TableRowColumn name="enableflag" options={[{label:'是',value:'ENABLE'},{label:'否',value:'DISENABLE'}]}></TableRowColumn>
						<TableRowColumn name="ordernum"></TableRowColumn>
						<TableRowColumn name="creatername"></TableRowColumn>
						<TableRowColumn name="createdate" type="date"></TableRowColumn>
						<TableRowColumn>
							  <Button label="查看"  type="operation" operation="view"/>
							  <Button label="编辑"  type="operation" operation="edit"/>
						 </TableRowColumn>
					 </TableRow>
				</TableBody>

				<TableFooter></TableFooter>
			</Table>
		</div>
	);
  }
}





