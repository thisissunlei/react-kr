import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {Binder} from 'react-binding';
import dateFormat from 'dateformat';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray} from 'redux-form';

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

    this.state = {
      stationVos:[],
      selected:[]
    }
	}

  componentDidMount(){
    this.getLoadData();
  }


  setReduceStartDate(dateValue){

    let {stationVos,selected} = this.state;

    var result = [];

    stationVos.forEach(function(item,index){
      var obj = Object.assign({},item);
    
        if(selected.indexOf(index) !==-1){
            obj.startDate = dateValue;
        }else{
           obj.startDate = ''; 
        }
        result.push(obj);
    });

    this.setState({stationVos:result});
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

    let {stationVos,selected} = this.state;

    if(!selected.length){
		console.log('---->>>');
       Notify.show([{
            message:'请选择工位',
            type: 'danger',
        }]);

		return ;
    }

	 //选择了哪些工位
	let selectStationVos = [];

	stationVos.forEach(function(item,index){
		if(selected.indexOf(index) !== -1){
			selectStationVos.push(item);
		}
	});


	//选中的必须要有租赁结束日期
	var someStartDate = true;

	selectStationVos.forEach(function(item,index){
		if(!item.startDate){
			someStartDate = false;
		}
		item.leaseBeginDate =  dateFormat(item.leaseBeginDate,'yyyy-mm-dd hh:MM:ss');
		item.leaseEndDate =  dateFormat(item.leaseEndDate,'yyyy-mm-dd hh:MM:ss');
	});

	  if(!someStartDate){
			Notify.show([{
				message:'选择的工位必须要有租赁结束时间',
				type: 'danger',
			  }]);
		  return ;
	  }

	 //工位结束时间相同

	if(selectStationVos.length>1){

		var some = true;
		selectStationVos.sort(function(pre,next){
			var preDate = dateFormat(pre.leaseEndDate,'yyyy-mm-dd');
			var nextDate = dateFormat(next.leaseEndDate,'yyyy-mm-dd');
			if(preDate != nextDate){
			  some = false;
			}
			return -1;
		});

		if(!some){
			Notify.show([{
				message:'请选择相同日期',
				type: 'danger',
			  }]);
			  return false;
		}
	}

	let beginDate = Date.parse(selectStationVos[0].leaseEndDate);
	let endDate = Date.parse(selectStationVos[0].startDate);

  if(beginDate>= endDate){
		Notify.show([{
			message:'选择的工位租赁结束时间不能大于续租结束时间',
			type: 'danger',
		  }]);
		  return false;
  }

	Store.dispatch(change('reduceCreateForm','leaseBegindate',selectStationVos[0].leaseEndDate));
 const {onSubmit} = this.props;
   onSubmit && onSubmit(selectStationVos);

  }


	onCancel(){
		const {onCancel} = this.props;
		onCancel  && onCancel();
	}

	render(){

		let { error, handleSubmit, pristine, reset, submitting} = this.props;
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
			<div style={{height:667,marginTop:20}}>
<form onSubmit={handleSubmit(this.onSubmit)}>
			<KrField grid={1/1}  name="startDate" component="date" label="续租结束时间" onChange={this.setReduceStartDate}/>
      <Table onSelect={this.onSelect} style={overfolw}>
        <TableHeader>
          <TableHeaderColumn>类别</TableHeaderColumn>
          <TableHeaderColumn>编号／名称</TableHeaderColumn>
          <TableHeaderColumn>单价（元／月）</TableHeaderColumn>
          <TableHeaderColumn>楼层</TableHeaderColumn>
          <TableHeaderColumn>起始日期</TableHeaderColumn>
          <TableHeaderColumn>结束日期</TableHeaderColumn>
          <TableHeaderColumn>续租结束日期</TableHeaderColumn>
      </TableHeader>
      <TableBody>
      {stationVos && stationVos.map((item,index)=>{
        return (
          <TableRow key={index}>
          <TableRowColumn >{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
          <TableRowColumn >{item.stationName}</TableRowColumn>
          <TableRowColumn >{item.unitprice}</TableRowColumn>
          <TableRowColumn >{item.whereFloor}</TableRowColumn>
          <TableRowColumn ><KrDate.Format value={item.leaseBeginDate}/></TableRowColumn>
          <TableRowColumn ><KrDate.Format value={item.leaseEndDate}/></TableRowColumn>
          <TableRowColumn>
				{item.startDate && dateFormat(item.startDate,'yyyy-mm-dd')}
          </TableRowColumn>
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

export default reduxForm({form: 'selectStationForm',enableReinitialize:true,keepDirtyOnReinitialize:true})(SelectStationForm);
