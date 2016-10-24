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
      searchParams:{
        mainbillid:3
    }
    }

	}



  onSelect(selected){

  }

	onSubmit(form){

    let stationVos = [
        {id:1},
        {id:2},
        {id:3},
    ];
		const {onSubmit} = this.props;
		onSubmit && onSubmit(stationVos);
	}

	onCancel(){
		const {onCancel} = this.props;
		onCancel  && onCancel();
	}

	render(){

		let { error, handleSubmit, pristine, reset, submitting} = this.props;

		return (
			<div>

        {/*
      <Table ajax={true}  ajaxUrlName='getStationOrSettingList' ajaxParams={this.state.searchParams} onSelect={this.onSelect}>
          */}
      <Table ajax={true}  ajaxUrlName='getFinaDataByList' ajaxFieldListName = "finaContractMainbillVOList" ajaxParams={this.state.searchParams} onSelect={this.onSelect}>
        <TableHeader>
          <TableHeaderColumn>类别</TableHeaderColumn>
          <TableHeaderColumn>编号／名称</TableHeaderColumn>
          <TableHeaderColumn>单价（元／月）</TableHeaderColumn>
          <TableHeaderColumn>楼层</TableHeaderColumn>
          <TableHeaderColumn>起始日期</TableHeaderColumn>
          <TableHeaderColumn>结束日期</TableHeaderColumn>
          <TableHeaderColumn>减租开始日期</TableHeaderColumn>
      </TableHeader>

      <TableBody>
          <TableRow>
          <TableRowColumn name="stationType" options={[{label:'工位',value:'1'},{label:'会议室',value:'2'}]} ></TableRowColumn>
          <TableRowColumn name="stationId" ></TableRowColumn>
          <TableRowColumn name="whereFloor" ></TableRowColumn>
          <TableRowColumn name="unitprice" ></TableRowColumn>
          <TableRowColumn name="leaseBeginDate" type="date" ></TableRowColumn>
          <TableRowColumn name="leaseEndDate" type="date"></TableRowColumn>
          <TableRowColumn>yahaha</TableRowColumn>
         </TableRow>
      </TableBody>

      </Table>

      <Grid>
      <Row style={{marginTop:30}}>
      <Col md={2} align="right"> <Button  label="确定" type="button" primary={true} onTouchTap={this.onSubmit}/> </Col>
      <Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
      </Grid>

			</div>);
	}
}
