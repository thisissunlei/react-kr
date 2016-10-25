import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';
import Param from 'jquery-param';
import { Fields } from 'redux-form'; 
import {Binder} from 'react-binding';
import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import dateFormat from 'dateformat';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

import UnitPriceForm from './UnitPriceForm';

import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	Dialog,

	Table, 
	TableBody, 
	TableHeader, 
	TableHeaderColumn, 
	TableRow, 
	TableRowColumn,
	TableFooter,
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	IframeContent,
} from 'kr-ui';
import Date from 'kr-ui/Date';

@ReactMixin.decorate(LinkedStateMixin)
class NewCreateForm  extends Component{

	static DefaultPropTypes = {
		initialValues:{
			customerName:'',
			communityName:'',
			lessorAddress:'',
			payTypeList:[],
			paymentList:[],
			fnaCorporationList:[],
		}
	}

	static PropTypes = {
		initialValues:React.PropTypes.object,
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props,context){
		super(props, context);

		//stationsRefs表单
		this.stationRefs = {};

		this.onCancel  = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onStationDelete = this.onStationDelete.bind(this);
		this.onStationSelect = this.onStationSelect.bind(this);

		this.getStationUrl = this.getStationUrl.bind(this);
		this.onIframeClose = this.onIframeClose.bind(this);
		this.openStationDialog = this.openStationDialog.bind(this);
		this.onStationUnitPrice = this.onStationUnitPrice.bind(this);
		this.openStationUnitPriceDialog = this.openStationUnitPriceDialog.bind(this);
		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);
		this.onChangeLeaseBeginDate = this.onChangeLeaseBeginDate.bind(this);
		this.onChangeLeaseEndDate = this.onChangeLeaseEndDate.bind(this);
		this.onStationVosChange = this.onStationVosChange.bind(this);
		console.log('------props',props);
		this.state = {
			stationVos:this.props.stationVos,
			selectedStation:[],
			openStation:false,
			openStationUnitPrice:false,
		}
		console.log(this.props);
	}

	onStationVosChange(index,value){

		let {stationVos} = this.state;
		 stationVos[index].unitprice = value;

	 	this.setState({stationVos});
	}

	//录入单价dialog
	openStationUnitPriceDialog(){
		this.setState({
			openStationUnitPrice:!this.state.openStationUnitPrice
		});
	}

	//录入单价
	onStationUnitPrice(form){

		var value = form.price;
		let {stationVos,selectedStation} = this.state;

		stationVos = stationVos.map(function(item,index){
			if(selectedStation.indexOf(index) != -1){
				item.unitprice= value;
			}
			return item;
		});

		this.setState({
			stationVos
		});

		this.openStationUnitPriceDialog();
	}
	//修改租赁期限－开始时间
	onChangeLeaseBeginDate(value){

		value = dateFormat(value,"yyyy-mm-dd hh:MM:ss");

		let {stationVos} = this.state;

		if(!stationVos.length){
			return ;
		}
		stationVos.forEach(function(item,index){
			item.leaseBeginDate = value;
		});
		this.setState({
			stationVos
		});
	}

	//修改租赁期限-结束时间
	onChangeLeaseEndDate(value){
		value = dateFormat(value,"yyyy-mm-dd hh:MM:ss");
		let {stationVos} = this.state;

		if(!stationVos.length){
			return ;
		}
		stationVos.forEach(function(item,index){
			item.leaseEndDate = value;
		});
		this.setState({
			stationVos
		});
	}

	//删除工位
	onStationDelete(){

		let {stationVos} = this.props;
		let {selectedStation} = this.state;
		stationVos = stationVos.filter(function(item,index){
			if(selectedStation.indexOf(index) != -1){
			return false;
			}
			return true;
		});
		this.setState({
			stationVos
		});
	}

	onStationSelect(selectedStation){
		this.setState({
			selectedStation
		})
	}

	openStationDialog(){

		let {changeValues} = this.props;

		let {wherefloor,leaseBegindate,leaseEnddate} = changeValues;

		/*
		if(!wherefloor){
			Notify.show([{
				message:'请先选择楼层',
				type: 'danger',
			}]);
			return ;
		}

		if(!leaseBegindate){
			Notify.show([{
				message:'请选择租赁开始时间',
				type: 'danger',
			}]);
			return ;
		}

		if(!leaseEnddate){
			Notify.show([{
				message:'请选择租赁结束时间',
				type: 'danger',
			}]);
			return ;
		}
		*/

		this.setState({
			openStation:!this.state.openStation
		});
	}

	componentDidMount(){
		let {initialValues}= this.props;
		Store.dispatch(initialize('admitCreateForm',initialValues));
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.stationVos.length){
			let stationVos = nextProps.stationVos;
			this.setState({
				stationVos
			});
		}
	}

	onSubmit(form){
		form = Object.assign({},form);

		let {stationVos} = this.state;


		let {billList} = this.state;

		let {changeValues} = this.props;

        form.lessorAddress = changeValues.lessorAddress;

		var _this = this;

		form.stationVos =  stationVos;

		form.stationVos = JSON.stringify(form.stationVos);
		form.leaseBegindate = dateFormat(form.leaseBegindate,"yyyy-mm-dd hh:MM:ss");
		form.leaseEnddate = dateFormat(form.leaseEnddate,"yyyy-mm-dd hh:MM:ss");
		form.signdate = dateFormat(form.signdate,"yyyy-mm-dd hh:MM:ss");
		console.log('form', form);

		const {onSubmit} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	getStationUrl(){

	    let url = "http://optest.krspace.cn/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanSel?communityId={communityId}&floors={floors}&goalStationNum={goalStationNum}&goalBoardroomNum={goalBoardroomNum}&selectedObjs={selectedObjs}";

		let {changeValues,initialValues,optionValues} = this.props;
		let {stationVos} = this.state;

		stationVos = stationVos.map(function(item){
			var obj = {};
			obj.id = item.stationId;
			obj.type = item.stationType;
			return obj;
		});

		let params = {
			communityId:optionValues.mainbillCommunityId,
			floors:changeValues.wherefloor,
			//工位
			goalStationNum:changeValues.stationnum,
			//会议室
			goalBoardroomNum:changeValues.boardroomnum,
			selectedObjs:JSON.stringify(stationVos)
		};

		if(Object.keys(params).length){
			for (let item in params) {
				if (params.hasOwnProperty(item)) {
					url = url.replace('{' + item + '}', params[item]);
					delete params[item];
				}
			}
		}
		return url ;
	}

	onIframeClose(billList){

		this.openStationDialog();

		console.log('data',billList);

		if(!billList){
			return ;
		}

		var _this = this;

		let {changeValues} = this.props;

		let {stationVos} = this.state;

		try{
			billList.map(function(item,index){
					item.leaseBeginDate = changeValues.leaseBegindate;
					item.leaseEndDate = changeValues.leaseEnddate;
					item.stationId = item.id;
					item.stationType = item.type;
					item.unitprice = '';
					item.whereFloor =  item.wherefloor;
			});
			
		}catch(err){
			console.log('billList 租赁明细工位列表为空');
		}

		this.setState({
			stationVos:billList
		});

	}
	onChangeSearchPersonel(personel){
		console.log('personel',personel)
		Store.dispatch(change('admitCreateForm','lessorContacttel',personel.mobile));
	}

	render(){

		let { error, handleSubmit, pristine, reset, submitting,initialValues,changeValues,optionValues} = this.props;

		let {fnaCorporationList} = optionValues;

		fnaCorporationList && fnaCorporationList.map(function(item,index){
			if(changeValues.leaseId  == item.id){
				changeValues.lessorAddress = item.corporationAddress;
			}
		});
		

		let {stationVos} = this.state;

		return (


			<div>

<form onSubmit={handleSubmit(this.onSubmit)}>

				<KrField grid={1/2}  name="mainbillid" type="hidden" component="input" /> 
				<KrField grid={1/2}  name="contractstate" type="hidden" component="input" /> 
				<KrField grid={1/2}  name="contracttype" type="hidden" component="input" /> 

				<KrField name="leaseId"  grid={1/2} component="select" label="出租方" options={optionValues.fnaCorporationList}  />
				<KrField grid={1/2}  name="lessorAddress" type="text" component="labelText" label="地址" value={changeValues.lessorAddress}/> 
				<KrField grid={1/2}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} />
				<KrField grid={1/2}  name="lessorContacttel" type="text" component="input" label="电话" /> 

				<KrField grid={1/2}  component="labelText" label="承租方" value={optionValues.customerName}/> 

				<KrField grid={1/2}  name="leaseAddress" type="text" component="input" label="地址" /> 

				<KrField grid={1/2}  name="leaseContact" type="text" component="input" label="联系人" /> 
				<KrField grid={1/2}  name="leaseContacttel" type="text" component="input" label="电话" /> 

				<KrField grid={1/2}  name="communityid" component="labelText" label="所属社区" value={optionValues.communityName} /> 

				<KrField name="wherefloor"  grid={1/2} component="select" label="所在楼层" options={optionValues.floorList} />
                <KrField grid={1/2}  name="totaldownpayment" type="text" component="input" label="定金总额"  /> 
				<KrField name="paymodel"  grid={1/2} component="select" label="付款方式" options={optionValues.paymentList} /> 

				<KrField grid={1/2}  name="contractcode" type="text" component="input" label="合同编号"  /> 

				<KrField grid={1/1} component="group" label=" 租赁项目"> 
					<KrField grid={1}  name="stationnum" type="text" component="input" label="工位" /> 
					<KrField grid={1}  name="boardroomnum" type="text" component="input" label="会议室" /> 
				</KrField>
				<KrField grid={1/1}  component="group" label="租赁期限"> 
					<KrField grid={1/2}  name="leaseBegindate"  component="date" onChange={this.onChangeLeaseBeginDate}/> 
					<KrField grid={1/2}  name="leaseEnddate" component="date" onChange={this.onChangeLeaseEndDate} /> 
				</KrField>
				<KrField name="templockday"  grid={1} component="input" type="text" label="保留天数"/> 
				<KrField grid={1/1}  name="contractmark" component="textarea" label="备注" /> 
							 <KrField grid={1}  name="fileIdList" component="file" label="上传附件" /> 


				<Section title="租赁明细" description="" rightMenu = {
					<Menu>
						<MenuItem primaryText="删除" onTouchTap={this.onStationDelete} />
						<MenuItem primaryText="租赁"  onTouchTap={this.openStationDialog} />
					</Menu>
				}> 

				<Table  displayCheckbox={true} onSelect={this.onStationSelect}>
				<TableHeader>
				<TableHeaderColumn>类别</TableHeaderColumn>
				<TableHeaderColumn>编号／名称</TableHeaderColumn>
					<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
						<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
						</TableHeader>
						<TableBody>
						{
							stationVos.map((item,index)=>{
							return (
								<TableRow key={index}>
									<TableRowColumn>{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
									<TableRowColumn>{item.stationId}</TableRowColumn>
									<TableRowColumn> <Date.Format value={item.leaseBeginDate}/></TableRowColumn>
									<TableRowColumn><Date.Format value={item.leaseEndDate}/></TableRowColumn>

									</TableRow>
							);
						})}
						</TableBody>
						</Table>

						</Section>

						<Grid>
						<Row style={{marginTop:30}}>
						<Col md={2} align="right"> <Button  label="确定" type="submit" primary={true} /> </Col>
						<Col md={2} align="right"> <Button  label="取消" type="button"  onTouchTap={this.onCancel}/> </Col> </Row>
						</Grid>

						</form>


					<Dialog
						title="分配工位"
						autoScrollBodyContent={true}
						contentStyle ={{ width: '100%', maxWidth: 'none'}}
						open={this.state.openStation} >
							<IframeContent src={this.getStationUrl()} onClose={this.onIframeClose}/>
					  </Dialog>

					<Dialog
						title="录入单价"
						autoScrollBodyContent={true}
						open={this.state.openStationUnitPrice} >
								<UnitPriceForm  onSubmit={this.onStationUnitPrice} onCancel={this.openStationUnitPriceDialog}/>
					  </Dialog>

			</div>);
	}
	}

	/*
	const validate = values =>{
		const errors = {}

		if(!values.mainbilltype){
			errors.mainbilltype = '请选择订单类型';
		}else if (!values.communityid) {
			errors.communityid = '请选择所在社区';
		}else if(!values.mainbillname){
			errors.mainbillname = '订单名称不能为空';
		}

		return errors
	}
	*/

const selector = formValueSelector('admitCreateForm');

NewCreateForm = reduxForm({ form: 'admitCreateForm',enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCreateForm);

export default connect((state)=>{

	let changeValues = {};

	changeValues.lessorId = selector(state,'lessorId');
	changeValues.leaseId = selector(state,'leaseId');
	changeValues.stationnum = selector(state,'stationnum') || 0;
	changeValues.boardroomnum = selector(state,'boardroomnum') || 0;
	changeValues.leaseBegindate = selector(state,'leaseBegindate') || 0;
	changeValues.leaseEnddate = selector(state,'leaseEnddate') || 0;
	changeValues.wherefloor = selector(state,'wherefloor') || 0;


	return {
		changeValues
	}

})(NewCreateForm);

