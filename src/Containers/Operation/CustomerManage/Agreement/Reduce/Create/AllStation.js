import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {Binder} from 'react-binding';
import dateFormat from 'dateformat';
import {reduxForm,formValueSelector,initialize,arrayPush,arrayInsert,FieldArray} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

import {
  Form,
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

class SelectStationForm  extends Component{

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
    this.getLoadData = this.getLoadData.bind(this);

    this.state = {
      stationVos:[
        {id:1},
        {id:3},
        {id:2},
        {id:5},
      ]
    }

	}

  getLoadData(){
    var _this  = this;
		Store.dispatch(Actions.callAPI('fina-contract-intention',{customerId:params.customerId,mainBillId:params.orderId,communityId:1})).then(function(response){
			_this.setState({
        stationVos:response
			});
		}).catch(function(err){
			Notify.show([{
				message:'后台出错请联系管理员',
				type: 'danger',
			}]);
	   	});
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

		let { error, handleSubmit, pristine, reset, submitting,changeValues} = this.props;
    let {stationVos} = this.state;

    console.log('0000',this.props.changeValues);


		return (
			<div>

<form onSubmit={handleSubmit(this.onSubmit)}>
							<KrField grid={1/1}  name="startDate" component="date" label="减租开始时间" />
        {/*
      <Table ajax={true}  ajaxUrlName='getStationOrSettingList' ajaxParams={this.state.searchParams} onSelect={this.onSelect}>
          */}
      <Table>
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
      {stationVos && stationVos.map((item,index)=>{
        return (
          <TableRow key={index}>
          <TableRowColumn name="stationType" options={[{label:'工位',value:'1'},{label:'会议室',value:'2'}]} ></TableRowColumn>
          <TableRowColumn name="stationId" ></TableRowColumn>
          <TableRowColumn name="whereFloor" ></TableRowColumn>
          <TableRowColumn name="unitprice" ></TableRowColumn>
          <TableRowColumn name="leaseBeginDate" type="date" ></TableRowColumn>
          <TableRowColumn name="leaseEndDate" type="date"></TableRowColumn>
          <TableRowColumn>{item.tartDate}</TableRowColumn>
         </TableRow>
        );
      })}
      </TableBody>
      </Table>
      <Grid>
      <Row style={{marginTop:30}}>
      <Col md={2} align="right"> <Button  label="确定" type="submit" primary={true}/> </Col>
      <Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
      </Grid>
</form>
			</div>);
	}
}

const selector = formValueSelector('selectStationForm');
export default connect((state)=>{
	let changeValues = {};
	changeValues.startDate = selector(state,'startDate');
	return {
		changeValues
	}

})(reduxForm({ form: 'selectStationForm',enableReinitialize:true,keepDirtyOnReinitialize:true})(SelectStationForm));
