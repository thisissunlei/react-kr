import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {Binder} from 'react-binding';

import {reduxForm,formValueSelector,initialize,arrayPush,arrayInsert,FieldArray} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

import {
  Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
} from 'kr-ui';

export default class AllStation  extends Component{

  static DefaultPropTypes = {

  }

	static PropTypes = {
    searchParams:React.PropTypes.object,
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props,context){
		super(props, context);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

    this.onSelect = this.onSelect.bind(this);


    this.state = {
      searchParams:this.props.searchParams
    }

	}



  onSelect(selected){

  }

	onSubmit(form){
		const {onSubmit} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel(){
		const {onCancel} = this.props;
		onCancel  && onCancel();
	}

	render(){

		let { error, handleSubmit, pristine, reset, submitting} = this.props;

		return (
			<div>

      <Table  style={{marginTop:10}} displayCheckbox={true} ajax={true}  ajaxUrlName='findFinaFinaflowPropertyList' ajaxParams={this.state.searchParams} onSelect={this.onSelect}>
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

      <Grid>
      <Row style={{marginTop:30}}>
      <Col md={2} align="right"> <Button  label="确定" type="button" primary={true} onTouchTap={this.onSubmit}/> </Col>
      <Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
      </Grid>

			</div>);
	}
}
