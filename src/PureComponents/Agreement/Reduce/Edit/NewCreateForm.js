import React, {
	 
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
import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import {DateFormat,Http} from 'kr/Utils';
import nzh from 'nzh';
import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';

import {
	Actions,
	Store
} from 'kr/Redux';

import AllStation from './AllStation';

import {
	Menu,
	Dialog,
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
	DotTitle,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
} from 'kr-ui';

@ReactMixin.decorate(LinkedStateMixin)
class NewCreateForm extends React.Component {

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

		this.onStationSubmit = this.onStationSubmit.bind(this);
		this.onStationCancel = this.onStationCancel.bind(this);

		this.onStationDelete = this.onStationDelete.bind(this);
		this.onStationSelect = this.onStationSelect.bind(this);

		this.openStationDialog = this.openStationDialog.bind(this);
		this.onStationUnitPrice = this.onStationUnitPrice.bind(this);
		this.openStationUnitPriceDialog = this.openStationUnitPriceDialog.bind(this);
		this.onChangeSearchPersonel = this.onChangeSearchPersonel.bind(this);
		this.onStationVosChange = this.onStationVosChange.bind(this);
		this.state = {
			originStationVos:[],
			stationVos: [],
			delStationVos: [],
			selectedStation: [],
			openStation: false,
			openStationUnitPrice: false,
			allRent:'-1',

			oldBasicStationVos:[],
			openAdd:false,
			openMinus:false,

		}
	}

	onStationVosChange(index, value) {
		let {
			stationVos
		} = this.state;
		if(!value ||isNaN(value)){
			stationVos[index].unitprice = "";
		}else{
			stationVos[index].unitprice = value;
		}
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

	//录入单价
	onStationUnitPrice(form) {

		var value = form.price;
		let {
			stationVos,
			selectedStation
		} = this.state;

		stationVos = stationVos.map(function(item, index) {
			if (selectedStation.indexOf(index) != -1) {
				item.unitprice = value;
			}
			return item;
		});

		this.setState({
			stationVos
		});

		this.openStationUnitPriceDialog();
	}
	setAllRent=(list)=>{
		let _this = this;
		let {initialValues} = this.props;
		let stationList = list.map((item)=>{
			if(!item.unitprice){
				item.unitprice = 0;
			}
			return item;
		})
		Http.request('reduceGetAllRent',{},{stationList:JSON.stringify(list),billId:_this.props.params.orderId}).then(function(response) {
			Store.dispatch(change('reduceCreateForm', 'rentamount', response));
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

	onChangeSearchPersonel(personel) {
		Store.dispatch(change('reduceCreateForm', 'lessorContacttel', personel.mobile));
		Store.dispatch(change('reduceCreateForm', 'lessorContactName', personel.lastname|| '请选择'));

	}

	// station list
	onStationCancel() {
		this.setState({
			openStation: false
		});
	}


	onStationSubmit(stationVos) {
		let _this = this;
		let allRent = 0;
		this.setAllRent(stationVos);
		let stationVosList = this.state.originStationVos;
		let {delStationVos} = this.state;
		let {initialValues } = this.props;
		this.state.originStationVos.forEach((item,index)=>{
			stationVos.map((value)=>{
				if(item.stationId == value.stationId){
					stationVosList.splice(index,1);
				}
			})
		})
		delStationVos = Object.assign([],stationVosList);
		Store.dispatch(change('reduceCreateForm', 'stationVos', stationVos));
		Store.dispatch(change('reduceCreateForm', 'delStationVos', stationVosList));
		this.setState({
			stationVos,
			delStationVos
		});
		this.openStationDialog();
	}


	//删除工位
	onStationDelete() {

		let {
			selectedStation,
			stationVos,
			delStationVos,
		} = this.state;
		let {
			leaseEnddate
		} = this.props.optionValues;
		let {initialValues} = this.props;
		stationVos = stationVos.filter(function(item, index) {

			if (selectedStation.indexOf(index) != -1) {
				var obj = item;
				obj.leaseEndDate = leaseEnddate;
				delStationVos.push(obj);
				return false;
			}
			return true;
		});

		Store.dispatch(change('reduceCreateForm', 'stationVos', stationVos));
		Store.dispatch(change('reduceCreateForm', 'delStationVos',delStationVos));
		let _this = this;
		let allRent = 0;
		console.log('delStationVos',delStationVos)
		this.setAllRent(stationVos);
		this.setState({
			stationVos,
			delStationVos
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

	 addClick=()=>{
      let {oldBasicStationVos,stationVos,openMinus,openAdd}=this.state;
	   this.setState({
	  	 stationVos:oldBasicStationVos,
	  	 openMinus:true,
	  	 openAdd:false
	    })
	}

	minusClick=()=>{
      let {oldBasicStationVos,stationVos,openAdd,openMinus}=this.state;
	   this.setState({
	  	 stationVos:oldBasicStationVos.slice(0,5),
	  	 openAdd:true,
	  	 openMinus:false
	    })
	}

	addRender=()=>{
    	    var _this=this;
            let add='';
             add=(<div onClick={_this.addClick} className='arrow-wrap'><span className='arrow-open'>展开</span><span className='arrow-pic'></span></div>)
            return add;
        }

     minusRender=()=>{
    	 var _this=this;
            let minus='';
             minus=(<div onClick={_this.minusClick} className='arrow-wrap'><span className='arrow-open'>收起</span><span className='arrow-pic-do'></span></div>)
            return minus
    }



	componentWillReceiveProps(nextProps) {
		var _this=this;
		if (!this.isInit && nextProps.stationVos.length) {

			let stationVos = nextProps.stationVos;
			let initialValues = nextProps.initialValues;

			let originStationVos = [].concat(stationVos);

			this.setState({
				stationVos,
				originStationVos,
				oldBasicStationVos:stationVos,
				delStationVos:nextProps.delStationVos
			},function(){
				_this.setAllRent(nextProps.stationVos);
				   let {stationVos,oldBasicStationVos,openAdd}=_this.state;
			       if(oldBasicStationVos&&oldBasicStationVos.length>5){
			            _this.setState({
			            	stationVos:oldBasicStationVos.slice(0,5),
			            	openAdd:true
			            })    	
			        }
			        if(oldBasicStationVos&&oldBasicStationVos.length<=5){
			        	_this.setState({
			        		stationVos:oldBasicStationVos,
			        		openAdd:false
			        	})
			        }     	     
			});

			this.isInit = true;
		};
	}


	onSubmit(form) {

		form = Object.assign({}, form);

		let {
			changeValues,
			initialValues
		} = this.props;
		let {
			stationVos,
			delStationVos,
			allRent,
		} = this.state;
		let originStationVos = form.stationVos;

		let delStationVo =[];

		delStationVo = originStationVos.filter(function(origin){
				var isOk = true;
				stationVos.map(function(station){
						if(station.id == origin.id){
								isOk = false;
						}
				});
				return isOk;
		});
		delStationVos = delStationVos.concat(delStationVo);

		form.signdate = DateFormat(form.signdate, "yyyy-mm-dd 00:00:00");
		form.lessorAddress = changeValues.lessorAddress;

		form.leaseBegindate = DateFormat(stationVos[0].leaseBeginDate, "yyyy-mm-dd 00:00:00");
		form.leaseEnddate = DateFormat(stationVos[0].leaseEndDate, "yyyy-mm-dd 00:00:00");
		form.lessorAddress = changeValues.lessorAddress;
		form.rentamount = (this.state.allRent!='-1')?this.state.allRent:initialValues.rentamount;
		var _this = this;

		form.stationVos = stationVos;

		form.stationVos = JSON.stringify(form.stationVos);
		form.delStationVos = JSON.stringify(delStationVos);
		if(!!!form.agreement){
			form.agreement = '无';
		}

		if(!!!form.contractmark){
			form.contractmark = '';
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
			if (initialValues.leaseId == item.id) {
				changeValues.lessorAddress = item.corporationAddress;
			}
		});

		let {
			stationVos,
			params,
			allRent,
			openAdd,
			openMinus
		} = this.state;
		allRent = (allRent!='-1')?allRent:initialValues.rentamount;
		let allRentName = this.dealRentName(allRent);
		var agreementValue = initialValues.agreement=='无'?'如社区申请增加补充条款的，补充条款内容经法务审核通过后，社区将审核通过的内容邮件发送法务林玉洁（linyujie@krspace.cn），抄送技术部田欢（tianhuan@krspace.cn），冯西臣（fengxichen@krspace.cn），由技术部修改该内容，修改后邮件回复社区即可联网打印盖章版本。':initialValues.agreement;



		return (
			<div style={{width:615,marginLeft:25}}>

<form className="m-edit-reduce m-edit-reduce-dialog-form" onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:-15}}>
			<div className="cheek" style={{paddingLeft:0,marginLeft:23}}>
				<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">1</span><span className="wire"></span><label className="small-title">租赁明细</label></div>
				<div className="small-cheek">
				<div className="detailList" style={{marginTop:"-35px",width:"620px",marginLeft:"35px"}}>
				 <DotTitle title='租赁明细' style={{marginTop:53,marginBottom:25,paddingLeft:0,paddingRight:0}}>
				       <Grid style={{marginTop:"-28px",marginBottom:"10px"}}>
							<Row>
								<Col align="right">
									<ButtonGroup>
										<Button label="删除"  onTouchTap={this.onStationDelete} />
										<Button label="减租"  onTouchTap={this.openStationDialog} />
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
					<TableHeaderColumn>减租开始日期</TableHeaderColumn>
						<TableHeaderColumn>减租结束日期</TableHeaderColumn>
						</TableHeader>
						<TableBody>
						{stationVos.map((item,index)=>{
							return (
								<TableRow key={index}>
									<TableRowColumn>{(item.stationType == 1) ?'工位':'独立空间'}</TableRowColumn>
									<TableRowColumn>{item.stationName}</TableRowColumn>
									<TableRowColumn>
											{item.originalUnitprice}
									</TableRowColumn>
									<TableRowColumn> <KrDate value={item.leaseBeginDate}/></TableRowColumn>
									<TableRowColumn><KrDate value={item.leaseEndDate}/></TableRowColumn>

									</TableRow>
							);
						})}
						</TableBody>
						</Table>
						</div>
                        
                         {openAdd&&this.addRender()}
			             {openMinus&&this.minusRender()}

						</DotTitle>
                     <div className="all-rent" style={{marginTop:'0px',marginBottom:25}}>减少费用总计：<span style={{marginRight:50,color:'red'}}>￥{allRent}</span><span>{allRentName}</span></div>

						 </div>
			<div className="titleBar" style={{marginLeft:-23}}><span className="order-number">2</span><span className="wire"></span><label className="small-title">合同基本信息</label></div>
				<div className="small-cheek" style={{paddingBottom:0}}>
				<KrField grid={1/2}  name="id" type="hidden" component="input" />
				<KrField grid={1/2}  name="mainbillid" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractstate" type="hidden" component="input" />
				<KrField grid={1/2}  name="contracttype" type="hidden" component="input" />
				<KrField grid={1/2}  name="leaseEnddate" type="hidden" component="input" />
				<KrField grid={1/2}  name="leaseBegindate" type="hidden" component="input" />
				<KrField grid={1/2}  name="contractVersionType" type="hidden" component="input" />

				<KrField style={{width:262,marginLeft:25}} name="leaseId"  component="select" label="出租方" options={optionValues.fnaCorporationList} requireLabel={true} />
				<div className="lessor-address"><KrField style={{width:262,marginLeft:25}}  name="lessorAddress" type="text" component="labelText" inline={false} label="地址" value={changeValues.lessorAddress}  defaultValue="无" toolTrue={true}/></div>
				<KrField style={{width:262,marginLeft:25}}  name="lessorContactid" component="searchPersonel" label="联系人" onChange={this.onChangeSearchPersonel} placeholder={optionValues.lessorContactName} requireLabel={true} />

				<KrField style={{width:262,marginLeft:25}} name="lessorContacttel" type="text" component="input" label="电话" requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

				<KrField style={{width:262,marginLeft:25}}  component="labelText" label="承租方" inline={false} value={optionValues.customerName}/>

				<KrField style={{width:262,marginLeft:25}}  name="leaseAddress" type="text" component="input" label="地址" requireLabel={true}
				requiredValue={true} pattern={/^.{0,120}$/} errors={{requiredValue:'地址为必填项',pattern:'地址最大60位'}} />

				<KrField style={{width:262,marginLeft:25}}  name="leaseContact" type="text" component="input" label="联系人" requireLabel={true}
				requiredValue={true} pattern={/^.{0,20}$/} errors={{requiredValue:'联系人为必填项',pattern:'联系人最大20位'}} />
				<KrField style={{width:262,marginLeft:25}}  name="leaseContacttel" type="text" component="input" label="电话" requireLabel={true}
				requiredValue={true} pattern={/(^((\+86)|(86))?[1][3456789][0-9]{9}$)|(^(0\d{2,3}-\d{7,8})(-\d{1,4})?$)/} errors={{requiredValue:'电话号码为必填项',pattern:'请输入正确电话号'}}/>

				<KrField style={{width:262,marginLeft:25}}  name="communityid" component="labelText" label="所属社区" inline={false} value={optionValues.communityName} />

				<KrField style={{width:262,marginLeft:25}}  name="communityAddress" component="labelText" label="地址" inline={false} value={optionValues.communityAddress} toolTrue={true}/>

				<KrField style={{width:262,marginLeft:25}} name="contractcode" component="labelText" label="合同编号" value={initialValues.contractcode} inline={false}/>
				<KrField style={{width:262,marginLeft:25}}  name="signdate"  component="date" grid={1/2} label="签署时间" requireLabel={true}/>

				<KrField style={{width:262,marginLeft:25}} name="rentamount" component="labelText" inline={false} type="text" requireLabel={true} label="减租金额" value={allRent} defaultValue={initialValues.rentamount}
				requiredValue={true} pattern={/^\d{0,16}(\.\d{0,2})?$/} errors={{requiredValue:'减租金额为必填项',pattern:'请输入正数金额，小数点后最多两位'}} />
				<KrField style={{width:545,marginLeft:25}}  name="contractmark" component="textarea" label="备注" maxSize={200}/>
				<KrField style={{width:545,marginLeft:25}}  name="agreement" type="textarea" component="labelText" inline={false} label="双方其他约定内容" maxSize={200} value={agreementValue}/>

				</div>

				<div className="end-round"></div>
				</div>
			</div>
				<KrField style={{width:545,marginLeft:25,marginTop:'-20px',paddingLeft:"25px"}}  name="fileIdList" component="file" label="合同附件" defaultValue={optionValues.contractFileList}  onChange={(files)=>{
					Store.dispatch(change('reduceCreateForm','contractFileList',files));
				}} />



						<Grid style={{paddingBottom:50,textAlign:"center"}}>
							<Row >
								<ListGroup>
									<ListGroupItem style={{textAlign:'right',paddingRight:15}}><Button  label="确定" type="submit" disabled={pristine || submitting} width={81} height={30} fontSize={16}/></ListGroupItem>
									<ListGroupItem style={{textAlign:'left',paddingLeft:15}}> <Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}  width={81} height={30} fontSize={16}/> </ListGroupItem>
								</ListGroup>
							</Row>
						</Grid>

						</form>


					<Dialog
						title="分配工位"
						open={this.state.openStation}
						modal={true}
						bodyStyle={{overflowY:'scroll'}}
						onClose={this.onStationCancel}
						autoScrollBodyContent={true}
						autoDetectWindowHeight={true}>
								<AllStation onSubmit={this.onStationSubmit} onCancel={this.onStationCancel} endTime={optionValues.leaseEnddate} stationVos={stationVos} changeValues={this.props.changeValues} params={{mainBillid:initialValues.mainbillid,contractId:initialValues.id}}/>
					  </Dialog>


			</div>);
	}
}
const selector = formValueSelector('reduceCreateForm');
const validate = values => {

	const errors = {}

	++values.num;
	localStorage.setItem(values.mainbillid+''+values.customerId+''+values.id+values.contracttype+'edit',JSON.stringify(values));

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

	if (!values.signdate) {
		errors.signdate = '请填写签署时间';
	}

	if (!values.contractcode) {
		errors.contractcode = '请填写合同编号';
	}

	


	return errors
}

NewCreateForm = reduxForm({
	form: 'reduceCreateForm',
	validate,
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
