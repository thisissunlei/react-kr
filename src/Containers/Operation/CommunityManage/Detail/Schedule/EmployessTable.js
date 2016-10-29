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
		 activity:false
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
						<TableHeaderColumn name="propcode">属性编码</TableHeaderColumn>
						<TableHeaderColumn>属性名称</TableHeaderColumn>
						<TableHeaderColumn>是否启用</TableHeaderColumn>
						<TableHeaderColumn>属性类别</TableHeaderColumn>
						<TableHeaderColumn>排序号</TableHeaderColumn>
						<TableHeaderColumn>创建人</TableHeaderColumn>
						<TableHeaderColumn>创建时间</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
				</TableHeader>

				<TableBody>
						 <TableRow displayCheckbox={true}>
						<TableRowColumn name="propcode" ></TableRowColumn>
						<TableRowColumn name="propname" ></TableRowColumn>
						<TableRowColumn name="enableflag" options={[{label:'是',value:'ENABLE'},{label:'否',value:'DISENABLE'}]}></TableRowColumn>
						<TableRowColumn name="proptype" options={[{label:'收入',value:'INCOME'},{label:'回款',value:'PAYMENT'}]}></TableRowColumn>
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





