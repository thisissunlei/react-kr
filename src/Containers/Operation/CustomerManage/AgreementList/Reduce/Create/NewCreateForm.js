import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import Param from 'jquery-param';
import {
	Binder
} from 'react-binding';
import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import dateFormat from 'dateformat';
import nzh from 'nzh';
import {
	reduxForm,
	formValueSelector,
	change,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,

} from 'redux-form';

import {
	Actions,
	Store
} from 'kr/Redux';

import AllStation from './AllStation';

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
	DotTitle,
	KrDate,
	ButtonGroup,
	Paper,
	ListGroup,
	ListGroupItem,
	CircleStyle
} from 'kr-ui';

@ReactMixin.decorate(LinkedStateMixin)
class NewCreateForm extends Component {

	static DefaultPropTypes = {
		initialValues: {
			customerName: '',
			communityName: '',
			lessorAddress: '',
			payTypeList: [],
			paymentList: [],
			fnaCorporationList: [],
		}
	}

	static PropTypes = {
		initialValues: React.PropTypes.object,
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	static contextTypes = {
		params: React.PropTypes.object.isRequired
	}

	constructor(props, context) {
		super(props, context);
		//stationsRefs表单
		this.stationRefs = {};

		this.onCancel = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);

		this.onStationSubmit = this.onStationSubmit.bind(this);
		this.onStationCancel = this.onStationCancel.bind(this);

		this.onStationDelete = this.onStationDelete.bind(this);
		this.onStationSelect = this.onStationSelect.bind(this);

		this.openStationDialog = this.openStationDialog.bind(this);
		this.openStationUnitPriceDialog = this.openStationUnitPriceDialog.bind(this);
		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);
		this.onStationVosChange = this.onStationVosChange.bind(this);

		this.state = {
			stationVos: [],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
			allRent:0,
			HeightAuto: false,
		}
	}

	onStationVosChange(index, value) {
		let {
			stationVos
		} = this.state;
		stationVos[index].unitprice = value;
		this.setState({
			stationVos
		});
	}

	showMore = () => {
		this.setState({
			HeightAuto: !this.state.HeightAuto
		})

	}

	onChangeSearchPersonel(personel) {
		Store.dispatch(change('reduceCreateForm', 'lessorContacttel', personel.mobile));
	}

	//录入单价dialog
	openStationUnitPriceDialog() {
		this.setState({
			openStationUnitPrice: !this.state.openStationUnitPrice
		});
	}

	onChangeSearchPersonel(personel) {
		Store.dispatch(change('reduceCreateForm', 'lessorContacttel', personel.mobile));
		Store.dispatch(change('reduceCreateForm', 'lessorContactName', personel.lastname));
	}

	onStationCancel() {
		this.openStationDialog();
	}

	onStationSubmit(stationVos) {
		let _this = this;
		let allRent = 0;
		this.setAllRent(stationVos);

		this.setState({
			stationVos,
		});
		this.openStationDialog();
	}
	setAllRent=(list)=>{
		let _this = this;
		let stationList = list.map((item)=>{
			if(!item.unitprice){
				item.unitprice = 0;
			}
			return item;
		})
		
		Store.dispatch(Actions.callAPI('reduceGetAllRent',{},{stationList:JSON.stringify(list),billId:_this.props.params.orderId})).then(function(response) {
			_this.setState({
				allRent:response
			})
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	getSingleRent=(item)=>{
		//年月日
		let mounth = [31,28,31,30,31,30,31,31,30,31,30,31];
		let rentBegin = dateFormat(item.leaseBeginDate, "yyyy-mm-dd").split('-');
		let rentEnd = dateFormat(item.leaseEndDate, "yyyy-mm-dd").split('-');
		let rentDay = 0;
		let rentMounth = (rentEnd[0]-rentBegin[0])*12+(rentEnd[1]-rentBegin[1]);
		let years = rentEnd[0];
		if(rentBegin[2]-rentEnd[2] == 1){
			rentDay = 0;
		}else{
			let a =rentEnd[2]-rentBegin[2];
			if(a>=0){
				rentDay = a+1;

			}else{
				let mounthIndex = rentEnd[1]-1;
				if((years%4==0 && years%100!=0)||(years%400==0) && rentEnd[1]==2 ){
					rentDay = mounth[mounthIndex]+2+a;
				}
				rentDay = mounth[mounthIndex]+1+a;
				rentMounth = rentMounth-1;
			}
		}
		//计算日单价
		let rentPriceByDay =((item.unitprice*12)/365).toFixed(6);
		//工位总价钱
		let allRent = (rentPriceByDay * rentDay) + (rentMounth*item.unitprice);
		allRent = allRent.toFixed(2)*1;
		return allRent;
	}


	//删除工位
	onStationDelete() {

		let {
			selectedStation,
			stationVos
		} = this.state;
		stationVos = stationVos.filter(function(item, index) {

			if (selectedStation.indexOf(index) != -1) {
				return false;
			}
			return true;
		});
		let _this = this;
		let allRent = 0;
		this.setAllRent(stationVos);
		this.setState({
			stationVos
		});
	}

	onStationSelect(selectedStation) {
		this.setState({
			selectedStation
		})
	}

	openStationDialog() {
		this.setState({
			openStation: !this.state.openStation
		});
	}

	componentDidMount() {
		let {
			initialValues
		} = this.props;
		Store.dispatch(initialize('reduceCreateForm', initialValues));
	}

	componentWillReceiveProps(nextProps) {

	}

	onSubmit(form) {
		console.log("4444444");
		
	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
	dealRentName=(allRent)=>{
		let name = '';
		var nzhcn = nzh.cn;
		if(!allRent){
			return '零';
		}
		let  allRentName = nzhcn.encodeB(parseFloat(allRent));
		let allRentNameArray = allRentName.split('点');
		if(allRentNameArray.length==1){
			name = allRentNameArray[0] + '元整';
		}else{
			let xiaoshu = allRentNameArray[1];
			name = allRentNameArray[0]+'元'+xiaoshu[0]+'角';
			if(xiaoshu[1]){
				name = name+xiaoshu[1]+'分';
			}
		}
		return name;
	}
	
	render() {
				let {
					error,
					handleSubmit,
					pristine,
					reset,
					submitting,
					initialValues,
					changeValues,
					optionValues
				} = this.props;

				let {
					fnaCorporationList
				} = optionValues;

				fnaCorporationList && fnaCorporationList.map(function(item, index) {
					if (changeValues.leaseId == item.id) {
						changeValues.lessorAddress = item.corporationAddress;
					}
				});

				let {
					stationVos,
					allRent,
					HeightAuto
				} = this.state;
				let allRentName = this.dealRentName(allRent);
				return (
					<div style={{width:615,marginTop:'-10px'}}>

						<form className="m-new-reduce" onSubmit={handleSubmit(this.onSubmit)}>
							<div className="cheek" style={{paddingLeft:0,marginLeft:23}}>
								<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">1</span><span className="wire"></span><label className="small-title">租赁明细</label></div>
								<div className="small-cheek">
									<div className="detailList" style={{marginTop:"-35px",width:"620px",marginLeft:"35px"}} >	
										<DotTitle title='租赁明细' tyle={{marginTop:53,marginBottom:25}}>
									       <Grid style={{marginTop:"-28px",marginBottom:"10px"}}>
												<Row>
													<Col align="right">
														<ButtonGroup>
															<Button label="减租"  onTouchTap={this.openStationDialog} />
															<Button label="删除" height={27} cancle={true} type="button"  onTouchTap={this.onStationDelete} />
													  	</ButtonGroup>
													</Col>
												</Row>
											</Grid>
											<div style={{marginTop:"-10px"}}>
												<Table  displayCheckbox={true} onSelect={this.onStationSelect}>
													<TableHeader>
														<TableHeaderColumn>类别</TableHeaderColumn>
														<TableHeaderColumn>编号／名称</TableHeaderColumn>
														<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
														<TableHeaderColumn>减租开始时间</TableHeaderColumn>
														<TableHeaderColumn>减租结束日期</TableHeaderColumn>
													</TableHeader>
													<TableBody>
														{stationVos.map((item,index)=>{
															return (
																<TableRow key={index}>
																	<TableRowColumn>{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
																	<TableRowColumn>{item.stationName}</TableRowColumn>
																	<TableRowColumn>
																			{item.unitprice}
																	</TableRowColumn>
																	<TableRowColumn> <KrDate value={item.leaseBeginDate}/></TableRowColumn>
																	<TableRowColumn><KrDate value={item.leaseEndDate}/></TableRowColumn>

																</TableRow>
															);
														})}
													</TableBody>
												</Table>
											</div>

				                       		{stationVos.length > 5 ? <div className="bottom-tip"  onTouchTap={this.showMore}> <p><span>{HeightAuto?'收起':'展开'}</span><span className={HeightAuto?'toprow':'bottomrow'}></span></p></div>:''}
					                     
							            </DotTitle>
							            <div style={{marginTop:'0px',marginBottom:25}}>减少费用总计：<span style={{marginRight:50,color:'red'}}>￥{allRent}</span><span>{allRentName}</span></div>

					                </div>

									<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">2</span><span className="wire"></span><label className="small-title">合同基本信息</label></div>
									<div className="small-cheek" style={{paddingBottom:0}}>
										

										<KrField style={{width:262,marginLeft:25}} name="leaseId" component="select" label="出租方" options={optionValues.fnaCorporationList} requireLabel={true} />
										
									</div>

									<div className="end-round"></div>
								</div>
							</div>
							
				         	<div style={{paddingBottom:50,textAlign:"center"}}>
								<Grid >
									<Row >
										<ListGroup>
											<ListGroupItem style={{textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit" disabled={pristine || submitting} width={81} height={30} fontSize={16} /></ListGroupItem>
											<ListGroupItem style={{textAlign:'left',paddingLeft:15,paddingRight:0}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel} width={81} height={30} fontSize={16}/></ListGroupItem>
										</ListGroup>
									</Row>
								</Grid>
							</div>

						</form>

						<Dialog
							title="分配工位"
							open={this.state.openStation}
							modal={true}
							autoScrollBodyContent={true}
							autoDetectWindowHeight={true}
							onClose={this.onStationCancel}>
								<AllStation onSubmit={this.onStationSubmit} onCancel={this.onStationCancel} params= {this.props.params}/>
					    </Dialog>


					</div>);
			}
}
const selector = formValueSelector('reduceCreateForm');
const validate = values => {

	const errors = {}

	// if (!values.leaseId) {
	// 	errors.leaseId = '请填写出租方';
	// }

	// if (!values.lessorContactid) {
	// 	errors.lessorContactid = '请填写出租方联系人';
	// }

	// if (!values.lessorContacttel) {
	// 	errors.lessorContacttel = '请填写出租方联系电话';
	// }

	// if (!values.leaseAddress) {
	// 	errors.leaseAddress = '请填写承租方地址';
	// }
	// if (!values.wherefloor) {
	// 	errors.wherefloor = '请先选择楼层';
	// }

	// if (!values.leaseContacttel) {
	// 	errors.leaseContacttel = '请填写承租方电话';
	// }

	// if (!values.leaseAddress) {
	// 	errors.leaseAddress = '请填写承租方地址';
	// }

	// if (values.leaseAddress && !isNaN(values.leaseAddress)) {
	// 	errors.leaseAddress = '承租方地址不能为数字';
	// }

	// if (!values.leaseContact) {
	// 	errors.leaseContact = '请填写承租方联系人';
	// }

	// if (!values.signdate) {
	// 	errors.signdate = '请填写签署时间';
	// }

	// if (!values.contractcode) {
	// 	errors.contractcode = '请填写合同编号';
	// }


	return errors
}
NewCreateForm = reduxForm({
	form: 'reduceCreateForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(NewCreateForm);

export default connect((state) => {

	let changeValues = {};

	changeValues.lessorId = selector(state, 'lessorId');
	changeValues.leaseId = selector(state, 'leaseId');
	changeValues.stationnum = selector(state, 'stationnum') || 0;
	changeValues.boardroomnum = selector(state, 'boardroomnum') || 0;
	changeValues.leaseBegindate = selector(state, 'leaseBegindate');
	changeValues.leaseEnddate = selector(state, 'leaseEnddate');
	changeValues.wherefloor = selector(state, 'wherefloor') || 0;

	return {
		changeValues
	}

})(NewCreateForm);