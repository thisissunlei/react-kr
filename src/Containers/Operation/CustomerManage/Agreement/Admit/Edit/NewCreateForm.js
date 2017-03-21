import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import Param from 'jquery-param';
import {
	Fields
} from 'redux-form';
import {
	Binder
} from 'react-binding';
import nzh from 'nzh';
import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import dateFormat from 'dateformat';
import {
	reduxForm,
	formValueSelector,
	change,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray
} from 'redux-form';

import {
	Actions,
	Store
} from 'kr/Redux';

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
	DotTitle,
	ButtonGroup,
	Paper,
	ListGroup,
	ListGroupItem,
	KrDate,
	CircleStyle
} from 'kr-ui';

@ReactMixin.decorate(LinkedStateMixin)
class NewCreateForm extends Component {



	static contextTypes = {
		params: React.PropTypes.object.isRequired
	}

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

	constructor(props, context) {
		super(props, context);

		//stationsRefs表单
		this.stationRefs = {};

		this.onCancel = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onStationDelete = this.onStationDelete.bind(this);
		this.onStationSelect = this.onStationSelect.bind(this);

		this.getStationUrl = this.getStationUrl.bind(this);
		this.onIframeClose = this.onIframeClose.bind(this);
		this.openStationDialog = this.openStationDialog.bind(this);

		this.openStationUnitPriceDialog = this.openStationUnitPriceDialog.bind(this);
		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);
		this.onChangeLeaseBeginDate = this.onChangeLeaseBeginDate.bind(this);
		this.onChangeLeaseEndDate = this.onChangeLeaseEndDate.bind(this);
		this.onStationVosChange = this.onStationVosChange.bind(this);
		this.calcStationNum = this.calcStationNum.bind(this);
		this.onClose = this.onClose.bind(this);
		this.state = {
			stationUrl: '',
			stationVos: this.props.stationVos,
			delStationVos: [],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
			HeightAuto: false,
			allRent:'-1',
		}
		console.log(this.props);
	}
	calcStationNum() {
		let {
			stationVos
		} = this.state;

		var stationnum = 0;
		var boardroomnum = 0;

		stationVos.forEach(function(item, index) {
			if (item.stationType == 1) {
				stationnum++;
			} else {
				boardroomnum++;
			}
		});

		Store.dispatch(change('admitCreateForm', 'stationnum', stationnum));
		Store.dispatch(change('admitCreateForm', 'boardroomnum', boardroomnum));
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

	//录入单价dialog
	openStationUnitPriceDialog() {
		this.setState({
			openStationUnitPrice: !this.state.openStationUnitPrice
		});
	}

	//修改租赁期限－开始时间
	onChangeLeaseBeginDate(value) {

		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			return;
		}

		this.setState({
			stationVos: [],
			delStationVos: stationVos
		}, function() {
			this.calcStationNum();
		});
	}

	//修改租赁期限-结束时间
	onChangeLeaseEndDate(value) {
		let {
			stationVos
		} = this.state;

		if (!stationVos.length) {
			return;
		}

		this.setState({
			stationVos: [],
			delStationVos: stationVos
		}, function() {
			this.calcStationNum();
		});
	}


	//删除工位
	onStationDelete() {
		let {
			selectedStation,
			stationVos,
			delStationVos
		} = this.state;

		stationVos = stationVos.filter(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				delStationVos.push(item);
				return false;
			}
			return true;
		});

		this.setState({
			stationVos,
			delStationVos
		}, function() {
			this.calcStationNum();
		});

	}



	onStationSelect(selectedStation) {
		this.setState({
			selectedStation
		})
	}

	openStationDialog() {


		this.getStationUrl();

		let {
			changeValues
		} = this.props;

		let {
			wherefloor,
			leaseBegindate,
			leaseEnddate
		} = changeValues;

		if (!wherefloor) {
			Notify.show([{
				message: '请先选择楼层',
				type: 'danger',
			}]);
			return;
		}

		if (!leaseBegindate) {
			Notify.show([{
				message: '请选择租赁开始时间',
				type: 'danger',
			}]);
			return;
		}

		if (!leaseEnddate) {
			Notify.show([{
				message: '请选择租赁结束时间',
				type: 'danger',
			}]);
			return;
		}

		if(new Date(leaseEnddate)<new Date(leaseBegindate)){
			Notify.show([{
				message: '结束时间不能小于开始时间',
				type: 'danger',
			}]);
			return;
		}

		this.setState({
			openStation: !this.state.openStation
		});
	}
	onClose() {
		this.setState({
			openStation: !this.state.openStation
		});
	}

	componentDidMount() {
		let {
			initialValues
		} = this.props;
		Store.dispatch(initialize('admitCreateForm', initialValues));
	}

	componentWillReceiveProps(nextProps) {
		if (!this.isInit && nextProps.stationVos.length) {
			let stationVos = nextProps.stationVos;
			this.setState({
				stationVos
			}, function() {
				this.calcStationNum();
			});
			this.isInit = true;
		}
	}
	openPreStationUnitPriceDialog=()=> {
		let {
			selectedStation
		} = this.state;
		if (!selectedStation.length) {
			Notify.show([{
				message: '请先选择要录入单价的工位',
				type: 'danger',
			}]);
			return;
		}
		this.openStationUnitPriceDialog();
	}

	//录入单价dialog
	openStationUnitPriceDialog=()=> {
		this.setState({
			openStationUnitPrice: !this.state.openStationUnitPrice
		});
	}

	//录入单价
	onStationUnitPrice=(form)=> {

		var value = form.price;
		let {
			stationVos,
			selectedStation
		} = this.state;
		let _this = this;
		let allMoney = 0;

		stationVos = stationVos.map(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				item.unitprice = value;
			}
			return item;
		});
		this.setAllRent(stationVos);
		// stationVos.map((item)=>{
		// 	allMoney += _this.getSingleRent(item);
		// })
		// allMoney = parseFloat(allMoney).toFixed(2)*1;

		this.setState({
			stationVos,
			allRent:allMoney
		});

		this.openStationUnitPriceDialog();
	}


	onSubmit(form) {

		form = Object.assign({}, form);

		let {
			stationVos,
			delStationVos
		} = this.state;

		let {
			changeValues
		} = this.props;

		form.lessorAddress = changeValues.lessorAddress;

		var _this = this;

		form.delStationVos = JSON.stringify(delStationVos);
		form.stationVos = JSON.stringify(stationVos);
		form.leaseBegindate = dateFormat(form.leaseBegindate, "yyyy-mm-dd hh:MM:ss");
		form.leaseEnddate = dateFormat(form.leaseEnddate, "yyyy-mm-dd hh:MM:ss");
		form.signdate = dateFormat(form.signdate, "yyyy-mm-dd hh:MM:ss");
		form.totalrent = this.state.allRent?this.state.allRent:initialValues.totalrent;
		if(!!!form.agreement){
			form.agreement = '无';
		}
		if(!form.contractmark){
			form.contractmark="";
		}
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	getStationUrl() {

		let url = "/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanSel?mainBillId={mainBillId}&communityId={communityId}&floors={floors}&goalStationNum={goalStationNum}&goalBoardroomNum={goalBoardroomNum}&selectedObjs={selectedObjs}&startDate={startDate}&endDate={endDate}&contractId={contractId}";

		let {
			changeValues,
			initialValues,
			optionValues
		} = this.props;
		let {
			stationVos
		} = this.state;

		stationVos = stationVos.map(function(item) {
			var obj = {};
			obj.id = item.stationId;
			obj.type = item.stationType;
			obj.whereFloor = item.whereFloor;
			return obj;
		});

		let params = {
			contractId: this.context.params.id,
			mainBillId: this.context.params.orderId,
			communityId: optionValues.mainbillCommunityId,
			floors: changeValues.wherefloor,
			//工位
			goalStationNum: changeValues.stationnum,
			//会议室
			goalBoardroomNum: changeValues.boardroomnum,
			selectedObjs: JSON.stringify(stationVos),
			startDate: dateFormat(changeValues.leaseBegindate, "yyyy-mm-dd"),
			endDate: dateFormat(changeValues.leaseEnddate, "yyyy-mm-dd")

		};


		if (Object.keys(params).length) {
			for (let item in params) {
				if (params.hasOwnProperty(item)) {
					url = url.replace('{' + item + '}', params[item]);
					delete params[item];
				}
			}
		}

		this.setState({
			stationUrl: url
		});
	}


	onIframeClose(billList,data) {

		this.openStationDialog();


		if (!billList) {
			return;
		}

		var _this = this;
		let {delStationVos} = this.state;

		let {
			changeValues
		} = this.props;
        data.deleteData && data.deleteData.map((item)=>{
                var obj = {};
                obj.stationId = item.id;
                obj.whereFloor = item.whereFloor;
                obj.stationType = item.type;
                delStationVos.push(obj);
        })

		try {
			billList && billList.map(function(item, index) {
				item.leaseBeginDate = changeValues.leaseBegindate;
				item.leaseEndDate = changeValues.leaseEnddate;
				item.stationId = item.id;
				item.stationType = item.type;
				item.stationName = item.name;
				item.unitprice = '';
				item.whereFloor = item.wherefloor;

			});
		} catch (err) {
			console.log('billList 租赁明细工位列表为空');
		}



		this.setState({
			stationVos: billList,
			delStationVos
		}, function() {
			this.calcStationNum();
		});

	}
	onChangeSearchPersonel(personel) {

		Store.dispatch(change('admitCreateForm', 'lessorContacttel', personel.mobile));



	}
	showMore = () => {
		this.setState({
			HeightAuto: !this.state.HeightAuto
		})

	}
	onBlur=(item)=>{
		let {stationVos} = this.state;
		let allMoney = 0;
		console.log('stationVos',stationVos);
		this.setAllRent(stationVos);
		
	}
	setAllRent=(list)=>{
		let _this = this;
		Store.dispatch(Actions.callAPI('getAllRent',{},{stationList:JSON.stringify(list)})).then(function(response) {
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
			console.log('a',a);
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
		console.log('day',rentMounth,rentDay);
		//计算日单价
		// let rentPriceByDay = Math.ceil(((item.unitprice*12)/365)*100)/100;
		let rentPriceByDay = ((item.unitprice*12)/365).toFixed(6);
		//工位总价钱
		let allRent = (rentPriceByDay * rentDay) + (rentMounth*item.unitprice);
		allRent = allRent.toFixed(2)*1;
		console.log('allRent',allRent,rentPriceByDay);
		return allRent;
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
			HeightAuto,
			allRent
		} = this.state;
		allRent = (allRent!='-1')?allRent:initialValues.totalrent;
		var nzhcn = nzh.cn;
		let  allRentName = nzhcn.encodeB(parseFloat(allRent));
		return (


			<div>
<Paper width={968}>
<form onSubmit={handleSubmit(this.onSubmit)}>
				<CircleStyle num="1" info="租赁明细">
				<KrField  name="wherefloor" style={{width:370,marginLeft:70}} component="select" label="所在楼层" options={optionValues.floorList} requireLabel={true} multi={true} />
				<KrField style={{width:370,marginLeft:90}} left={20} component="group" label="租赁期限" requireLabel={true}>
					<ListGroup>
						<ListGroupItem style={{width:'45%',padding:0,marginLeft:'-10px',marginTop:'-10px'}}> <KrField  simple={true} name="leaseBegindate"  component="date" onChange={this.onChangeLeaseBeginDate}/>  </ListGroupItem>
						<ListGroupItem style={{width:'5%',textAlign:'center',padding:0,marginLeft:10,marginTop:'-10px'}} ><span style={{display:'inline-block',lineHeight:'60px',width:'33px',textAlign:'center',left:'5px'}}>至</span></ListGroupItem>
						<ListGroupItem style={{width:'45%',padding:0,marginTop:'-10px'}}> <KrField simple={true}  name="leaseEnddate" component="date" onChange={this.onChangeLeaseEndDate} />  </ListGroupItem>
					</ListGroup>
				</KrField>
				<div className="detailList" style={{marginTop:"-35px"}}>
				 <DotTitle title='租赁明细'>
				       <Grid style={{marginTop:"-40px"}}>
							<Row>
								<Col align="right">
									<ButtonGroup>
										<Button label="删除"  onTouchTap={this.onStationDelete} />
									    <Button label="批量录入单价"  width={100}  onTouchTap={this.openPreStationUnitPriceDialog} />
										<Button label="选择工位"  onTouchTap={this.openStationDialog} />
								  </ButtonGroup>
								</Col>
							</Row>
						</Grid>
				
				<div  className={HeightAuto?'auto':'stationList'} style={{marginTop:"-10px"}}>
				<Table onSelect={this.onStationSelect}>
				<TableHeader>
				<TableHeaderColumn>类别</TableHeaderColumn>
				<TableHeaderColumn>编号／名称</TableHeaderColumn>
				<TableHeaderColumn>单价(元/月)</TableHeaderColumn>
					<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
						<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
						</TableHeader>
						<TableBody>
						{
							stationVos && stationVos.map((item,index)=>{
							var typeLink = {
								value: this.state.stationVos[index].unitprice,
								requestChange: this.onStationVosChange.bind(null, index)
							}
							return (
								<TableRow key={index}>
									<TableRowColumn>{(item.stationType == 1) ?'工位':'会议室'}</TableRowColumn>
									<TableRowColumn>{item.stationName}</TableRowColumn>
									<TableRowColumn>
											<input type="text" name="age"  valueLink={typeLink} onBlur={this.onBlur.bind(this,item)}/>
									</TableRowColumn>
									<TableRowColumn> <KrDate value={item.leaseBeginDate}/></TableRowColumn>
									<TableRowColumn><KrDate value={item.leaseEndDate}/></TableRowColumn>

									</TableRow>
							);
						})}
						</TableBody>
						</Table>
						 </div>
							{stationVos.length>5?<div className="Btip"  onTouchTap={this.showMore}> <p><span>{HeightAuto?'收起':'展开'}</span><span className={HeightAuto?'Toprow':'Bottomrow'}></span></p></div>:''}
					 </DotTitle>
                     {/*<div style={{marginTop:'-20px',marginBottom:60}}>服务费总计：<span style={{marginRight:50,color:'red'}}>￥{allRent}</span><span>{allRentName}</span></div>*/}

					 </div>
					 </CircleStyle>
					<CircleStyle num="2" info="合同文本信息" circle="bottom">
				<KrField grid={1/2}  name="mainbillid" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractstate" type="hidden" component="input" />
				<KrField grid={1/2}  name="contracttype" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractVersionType" type="hidden" component="input" />

				<KrField style={{width:370,marginLeft:70}} name="leaseId"   component="select" label="出租方" options={optionValues.fnaCorporationList}  requireLabel={true}/>
				<KrField style={{width:370,marginLeft:90}}  name="lessorAddress" inline={false} type="text" component="labelText" label="地址" value={changeValues.lessorAddress}/>
				<KrField style={{width:370,marginLeft:70}}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} placeholder={optionValues.lessorContactName} requireLabel={true}/>

				<KrField style={{width:370,marginLeft:90}}  name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

				<KrField style={{width:370,marginLeft:70}}  component="labelText" inline={false} label="承租方" value={optionValues.customerName}/>

				<KrField style={{width:370,marginLeft:90}}  name="leaseAddress" type="text" component="input" label="地址" requireLabel={true}
				requiredValue={true} pattern={/^.{0,120}$/} errors={{requiredValue:'地址为必填项',pattern:'地址最大60位'}} />

				<KrField style={{width:370,marginLeft:70}}  name="leaseContact" type="text" component="input" label="联系人" requireLabel={true}
				requiredValue={true} pattern={/^.{0,20}$/} errors={{requiredValue:'联系人为必填项',pattern:'联系人最大20位'}} />
				<KrField style={{width:370,marginLeft:90}}  name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

				<KrField style={{width:370,marginLeft:70}}  name="communityid" component="labelText" inline={false} label="所属社区" value={optionValues.communityName} />

				
                <KrField style={{width:370,marginLeft:90}}  name="totaldownpayment" type="text" component="input" label="定金总额" requireLabel={true}
								requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'定金总额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />
				<KrField style={{width:370,marginLeft:70}} name="paymentId"  component="select" label="付款方式" options={optionValues.paymentList} requireLabel={true}/>

				<KrField   style={{width:370,marginLeft:70,paddingLeft:20}} name="contractcode" component="labelText" inline={false} label="合同编号" value={initialValues.contractcode} />

				{/*<KrField style={{width:370,marginLeft:90}}  name="contractcode" type="text" component="input" label="合同编号" requireLabel={true}
				requiredValue={true} pattern={/^.{0,50}$/} errors={{requiredValue:'合同编号为必填项',pattern:'合同编号最大50位'}} />
				*/}

				<KrField style={{width:370,marginLeft:70}} name="signdate"  component="date" label="签署日期"  />

				
				<KrField style={{width:900,marginLeft:70}} component="group" label="租赁项目" requireLabel={true}>
								<KrField style={{width:370}}  name="stationnum" type="text" component="labelText" label="工位" value={changeValues.stationnum} defaultValue={0} />
								<KrField style={{width:370,marginLeft:80}}  name="boardroomnum" type="text" component="labelText" label="会议室" value={changeValues.boardroomnum} defaultValue={0} />
				</KrField>
				<KrField  name="templockday"  style={{width:370,marginLeft:70}} component="input" type="text" label="保留天数" requireLabel={true}
				requiredValue={true} pattern={/^\d{0,3}$/} errors={{requiredValue:'保留天数为必填项',pattern:'请输入三位以内正整数'}} />
				<KrField style={{width:830,marginLeft:70}}  name="contractmark" component="textarea" label="备注" maxSize={200} />
							 <KrField style={{width:830,marginLeft:70}}  name="agreement" type="textarea" component="textarea" label="双方其他约定内容" maxSize={200} defaultValue="无"/>
				 </CircleStyle>
				<KrField style={{width:830,marginLeft:90,marginTop:'-20px'}}   name="fileIdList" component="file" label="上传附件" defaultValue={optionValues.contractFileList}/>

               
               

						<Grid style={{paddingBottom:50}}>
						<Row >
						<ListGroup>
							<ListGroupItem style={{width:'45%',textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit" disabled={pristine || submitting} /></ListGroupItem>
							<ListGroupItem style={{width:'45%',textAlign:'left',paddingLeft:15}}> <Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/> </ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>

						</form>
					</Paper>

					<Dialog
						title="分配工位"
						autoScrollBodyContent={true}
						onCancel={this.onCancel}
						contentStyle ={{ width: '100%', maxWidth: 'none'}}
						open={this.state.openStation} onClose={this.onClose}>
							<IframeContent src={this.state.stationUrl} onClose={this.onIframeClose}/>
					  </Dialog>
					<Dialog
						title="录入单价"
						autoScrollBodyContent={true}
						open={this.state.openStationUnitPrice} contentStyle={{width:430}}
						onClose={this.openStationUnitPriceDialog}>
								<UnitPriceForm  onSubmit={this.onStationUnitPrice} onCancel={this.openStationUnitPriceDialog}/>
					  </Dialog>


			</div>);
	}
}


const selector = formValueSelector('admitCreateForm');

const validate = values => {

	const errors = {}

	if (!values.leaseId) {
		errors.leaseId = '请填写出租方';
	}

	if (!values.lessorContactid) {
		errors.lessorContactid = '请填写出租方联系人';
	}

	if (!values.lessorContacttel) {
		errors.lessorContacttel = '请填写出租方联系电话';
	}

	if (!values.leaseAddress) {
		errors.leaseAddress = '请填写承租方地址';
	}
	if (!values.wherefloor) {
		errors.wherefloor = '请先选择楼层';
	}

	if (!values.leaseContacttel) {
		errors.leaseContacttel = '请填写承租方电话';
	}

	if (!values.leaseAddress) {
		errors.leaseAddress = '请填写承租方地址';
	}

	if (values.leaseAddress && !isNaN(values.leaseAddress)) {
		errors.leaseAddress = '承租方地址不能为数字';
	}

	if (!values.leaseContact) {
		errors.leaseContact = '请填写承租方联系人';
	}

	if (!values.paymodel) {
		errors.paymodel = '请填写付款方式';
	}


	if (!values.signdate) {
		errors.signdate = '请填写签署时间';
	}
	if (!values.templockday) {
		errors.templockday = '请填写保留天数';
	}
	if (!values.stationnum && !values.boardroomnum) {
		errors.stationnum = '租赁项目必须填写一项';
	}

	// if (!values.contractcode) {
	// 	errors.contractcode = '请填写合同编号';
	// }

	if (!values.paymentId) {
		errors.paymentId = '请填写付款方式';
	}

	if (!String(values.totaldownpayment)) {
		errors.totaldownpayment = '请填写定金总额';
	}


	if (values.totaldownpayment && isNaN(values.totaldownpayment)) {
		errors.totaldownpayment = '定金总额必须为数字';
	}



	return errors
}

NewCreateForm = reduxForm({
	form: 'admitCreateForm',
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
	changeValues.leaseBegindate = selector(state, 'leaseBegindate') || 0;
	changeValues.leaseEnddate = selector(state, 'leaseEnddate') || 0;
	changeValues.wherefloor = selector(state, 'wherefloor') || 0;


	return {
		changeValues
	}

})(NewCreateForm);