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
  KrDate,
} from 'kr-ui';

class SelectStationForm  extends Component{

	static PropTypes = {
    searchParams:React.PropTypes.object,
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}
  static contextTypes = {
	 params: React.PropTypes.object.isRequired
 }
	constructor(props,context){
		super(props, context);


		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

    this.onSelect = this.onSelect.bind(this);
    this.getLoadData = this.getLoadData.bind(this);
    this.setReduceStartDate = this.setReduceStartDate.bind(this);
    this.deleteCommen = this.deleteCommen.bind(this);
    this.state = {
      stationVos:[],
      selected:[]
    }
	}

  componentDidMount(){

    this.getLoadData();
  }

  setReduceStartDate(dateValue){
		dateValue = dateFormat(dateValue,"yyyy-mm-dd");

    let {stationVos} = this.state;

    stationVos = stationVos.map(function(item,index){
        item.startDate = dateValue;
        return item;
    });
    this.setState({
        stationVos
    });

  }

	componentWillReceiveProps(nextProps){

    if(nextProps.changeValues && nextProps.changeValues.startDate){
        this.setReduceStartDate(nextProps.changeValues.startDate);
    }

	}

  getLoadData(){
    var _this  = this;
    let {params} = this.context;
		Store.dispatch(Actions.callAPI('getStationOrSettingList',{mainBillid:params.orderId,page:1,pagesize:100})).then(function(response){
      _this.setState({
        stationVos:response.items
      });
		}).catch(function(err){
			Notify.show([{
				message:'后台出错请联系管理员',
				type: 'danger',
			}]);
	   	});
  }

  onSelect(selected){
    this.setState({
      selected
    });
  }

	  onSubmit(){
    var commen = this.deleteCommen();
    console.log(this.state, commen);
    let {stationVos,selected} = this.state;
    let {changeValues} = this.props;
    stationVos = stationVos.filter(function(item,index){
      if(!item.startDate){
        Notify.show([{
            message:'请选择减租开始时间',
            type: 'danger',
          }]);
          return false;
      }
      if(commen === 'false'){
        Notify.show([{
            message:'请选择相同日期',
            type: 'danger',
          }]);
          return false;
      }
        if(selected.indexOf(index) !==-1){
            console.log(index, stationVos[index]);
            var end = stationVos[index].leaseEndDate;
            var start  = Date.parse(item.startDate);

            if(end <= start){
              console.log('big');
              Notify.show([{
                  message:'减租开始日期不能大于租赁结束时间',
                  type: 'danger',
                }]);
                return false;
            }
            item.leaseEndDate = item.startDate;
            item.stationName = item.stationId;
            return true;
          }
        return false;
    });
    const {onSubmit} = this.props;
    onSubmit && onSubmit(stationVos);

  }
    deleteCommen(){
      var commen;
      let {stationVos,selected} = this.state;
     var item = stationVos.filter(function(item,index){
        if(selected.indexOf(index) !==-1){
          return true;
        }
        return false;
      });
     var date = item[0].leaseEndDate;
       item.map(function(value){
        if(value.leaseEndDate !== date){
          commen =  'false';
        }
       });
       return commen;
    }
	onCancel(){
		const {onCancel} = this.props;
		onCancel  && onCancel();
	}

	render(){

		let { error, handleSubmit, pristine, reset, submitting,changeValues} = this.props;
    let {stationVos} = this.state;
    const overfolw = {
      'overflow':'hidden',
      maxHeight:510,
    }
    const height = {
      height:stationVos.length*45,
      maxHeight:667,
    }
		return (
			<div style={{height:667}}>
<form onSubmit={handleSubmit(this.onSubmit)}>
			<KrField grid={1/1}  name="startDate" component="date" label="减租开始时间" />
      <Table onSelect={this.onSelect} style={overfolw}>
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
          <TableRowColumn >{item.stationType}</TableRowColumn>
          <TableRowColumn >{item.stationId}</TableRowColumn>
          <TableRowColumn >{item.unitprice}</TableRowColumn>
          <TableRowColumn >{item.whereFloor}</TableRowColumn>
          <TableRowColumn ><KrDate.Format value={item.leaseBeginDate}/></TableRowColumn>
          <TableRowColumn ><KrDate.Format value={item.leaseEndDate}/></TableRowColumn>
          <TableRowColumn>{item.startDate}</TableRowColumn>
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
