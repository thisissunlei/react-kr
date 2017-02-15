import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	bindActionCreators
} from 'redux';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	reduxForm,
	formValueSelector,
	initialize,
	change,
	arrayPush,
	arrayInsert,
	FieldArray,
	reset,
	destroy
} from 'redux-form';

import {
	Button,
	Grid,
	Row,
	Col,
	KrField,
	Message,
	ButtonGroup
} from 'kr-ui';



class ReceivedBtnForm extends Component {
	static contextTypes = {
		params: React.PropTypes.object.isRequired
	}

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
		optionList: React.PropTypes.array,
		accountDetail: React.PropTypes.array,
		contractReceive: React.PropTypes.array,
	}

	constructor(props, context) {
		super(props, context);

		this.joinContractId = [];
		this.adminContractId = [];
		this.increaseContractId = [];
		this.tenantContractId = [];
		this.index = 0;
	}

	componentDidMount() {



	}


	onSubmit = (values) => {
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(values);

	}

	componentWillReceiveProps(nextProps) {

		if (nextProps.open) {
			//Store.dispatch(change('receivedBtnForm', 'accountId', ''));
			//Store.dispatch(change('receivedBtnForm', 'totalPayment', ''));
			Store.dispatch(change('receivedBtnForm', 'preCode', '1'));
			//Store.dispatch(change('receivedBtnForm', 'operatedate', ''));
			Store.dispatch(change('receivedBtnForm', 'mainbillId', this.context.params.orderId));
		}

	}

	moneyCheck = (value) => {
		if (value && isNaN(value)) {
			Message.error('需填写数字');
			return;
		}
		if (value && value < 0) {
			Message.error('不能填写负数');
			return;
		}
		if (value && value == 0) {
			Message.error('金额不能为0');
			return;
		}
	}

	onCancel = () => {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	calcBalance = (value, input) => {
		var lastValue = value.split('.')[1]
		if (lastValue && lastValue.length > 2) {
			Message.error('最多到小数点后两位');
			return;
		}
		let {
			changeValues,
			calcBalance
		} = this.props;
		input.value = value;
		calcBalance && calcBalance(input);

	}

	joinInputRender = (index) => {
		return (
			<div style={{width:600,marginTop:8}} className='m-tenantStation'>
              <KrField  label="押金"  grid={1/2}  name={'fix'+this.joinContractId[index]+'1'} style={{width:261,marginLeft:-9}} component="input" type="text" onChange={this.calcBalance} onBlur={this.moneyCheck}/>
              <KrField label="工位服务费"  grid={1/2} name={'fix'+this.joinContractId[index]+'3'} style={{width:261,marginLeft:28}} component="input" type="text" onChange={this.calcBalance} onBlur={this.moneyCheck}/>
          </div>
		)
	}
	increaseInputRender = (index) => {
		return (
			<div style={{width:600,marginTop:8}} className='m-tenantStation'>
              <KrField  label="押金"  grid={1/2}  name={'fix'+this.increaseContractId[index]+'1'} style={{width:261,marginLeft:-9}} component="input" type="text" onChange={this.calcBalance} onBlur={this.moneyCheck}/>
              <KrField label="工位服务费"  grid={1/2} name={'fix'+this.increaseContractId[index]+'3'} style={{width:261,marginLeft:28}} component="input" type="text" onChange={this.calcBalance} onBlur={this.moneyCheck}/>
          </div>
		)
	}
	adminInputRender = (index) => {
		return (
			<div style={{width:600,marginTop:8}} className='m-tenantStation'>
              <KrField  label="押金"  grid={1/2}  name={'fix'+this.adminContractId[index]+'1'} style={{width:261,marginLeft:-9}} component="input" type="text" onChange={this.calcBalance} onBlur={this.moneyCheck}/>
              <KrField label="工位服务费"  grid={1/2} name={'fix'+this.adminContractId[index]+'3'} style={{width:261,marginLeft:28}} component="input" type="text" onChange={this.calcBalance} onBlur={this.moneyCheck}/>
          </div>
		)
	}
	tenantInputRender = () => {

		return (
			<div className='depositMoney-render'  style={{width:546}}>
              <KrField label="定金"  grid={1/2}  name={'fix'+this.tenantContractId+'2'} style={{width:261,marginLeft:-9}} component="input" type="text" onChange={this.calcBalance} onBlur={this.moneyCheck}/>
            </div>
		)
	}

	argreementChecked = (options) => {
		console.log('checked----', options)
		var name, input = {
				value: 0
			},
			nameList = [];
		let {
			calcBalance,
			accountDetail
		} = this.props;

		options.map((item, index) => {
			var len = options.length - 1;
			if (item.checked == false) {
				name = `fix${item.contractId}`;
				Store.dispatch(change('receivedBtnForm', `fix${item.contractId}1`, ' '));
				Store.dispatch(change('receivedBtnForm', `fix${item.contractId}3`, ' '));
				calcBalance && calcBalance(input, name);
			}
			if (options[len].checked == false) {
				accountDetail.map((item, index) => {
					nameList.push(item, item.id)
					Store.dispatch(change('receivedBtnForm', item.id, ' '));
				})
				calcBalance && calcBalance(input, '', nameList);
			}

		})



	}

	receiveInputRender = () => {
		let {
			accountDetail
		} = this.props;
		var _this = this;



		return (
			<div style={{marginBottom:-7}}>
              	       {
              	       	accountDetail.map(function(item,index){
						      	if(index%2==0){
									return <div className='leftBottomValue'><KrField key={index} style={{marginBottom:5,width:261,marginLeft:-9}}  grid={1/2}   label={item.propname} component="input" name={String(item.id)} type="text" onChange={_this.calcBalance} onBlur={_this.moneyCheck}/></div>
						      	}else{
						      		return <div className='rightBottomValue'><KrField key={index} style={{marginBottom:5,width:261}} grid={1/2}   label={item.propname}  component="input" name={String(item.id)} type="text" onChange={_this.calcBalance} onBlur={_this.moneyCheck}/></div>
						   }
					     }
		               )
              	       }
              	    </div>
		)


	}



	render() {

		var _this = this;

		let {
			error,
			handleSubmit,
			pristine,
			reset,
			optionList,
			contractReceive,
			accountDetail,
		} = this.props;

		let heightStyle = {
			width: '546',
			height: '72',
		}


		contractReceive.map(function(item, index) {
			//意向书
			if (item.value == '1') {
				if (_this.tenantContractId.indexOf(item.contractId) == -1) {
					_this.tenantContractId[index] = item.contractId;
				}
				item.component = _this.tenantInputRender.bind(this, index);

			}
			//入驻协议书
			if (item.value == '2') {
				if (_this.joinContractId.indexOf(item.contractId) == -1) {
					_this.joinContractId[index] = item.contractId;
				}
				item.component = _this.joinInputRender.bind(this, index);

			}
			//增租协议书
			if (item.value == '3') {
				if (_this.increaseContractId.indexOf(item.contractId) == -1) {
					_this.increaseContractId[index] = item.contractId;
				}
				//_this.increaseContractId = item.contractId;
				item.component = _this.increaseInputRender.bind(this, index);
			}
			//续租协议书
			if (item.value == '4') {
				if (_this.adminContractId.indexOf(item.contractId) == -1) {
					_this.adminContractId[index] = item.contractId;
				}
				//_this.adminContractId = item.contractId;
				item.component = _this.adminInputRender.bind(this, index);
			}
			//无合同
			if (item.value == '000') {
				item.component = _this.receiveInputRender
			}
		})



		return (
			<div className='receive-form-middle'>

					      <form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:45,marginLeft:'10px',width:580}}>
                            <KrField  name="mainbillId" type="hidden" component="input"/>
		                    <KrField  label="支付方式" grid={1/2} right={30} name="accountId" style={{marginBottom:5}} type="select" options={optionList} requireLabel={true}/>
						    <KrField name="preCode" grid={1/2} left={30} component="group" style={{marginLeft:-30}}  label="金额正负" requireLabel={true}>
				                <KrField name="preCode" grid={1/2}  label="正" component="radio" type="radio" value="0"/>
				                <KrField name="preCode"  grid={1/2} label="负" component="radio" type="radio" value="1"/>
			                </KrField>

						     <KrField component="date" grid={1/2} right={30} style={{marginTop:'-5px'}}  label="回款日期" name="operatedate" requireLabel={true}/>
						     <KrField label="回款总额"  grid={1/2} right={30} style={{marginTop:'-6px'}} name="totalPayment" component="input" type="text" requireLabel={true} onChange={this.calcBalance}/>
						     <KrField label="对应合同" name='contract' grid={1/2} component="groupCheckbox" defaultValue={contractReceive} requireLabel={true} onChange={this.argreementChecked}/>
                             
              	             <div className='m-textareaText'><KrField label="备注" grid={1}  heightStyle={heightStyle} name="finaflowdesc" component="textarea" type="text" placeholder='请输入备注，输入字数不能超过100字' maxSize={100} lengthClass='ui-length-textarea'/></div>

                             <KrField  grid={1} left={30}  style={{marginLeft:-30,marginTop:-10}} name="fileids" component="file" label="上传附件"  defaultValue={[]} />
                            


						   <Grid style={{marginTop:0,marginBottom:30}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div  className='ui-btn-center'><Button  label="确定" type="submit" /></div>
									<Button  label="取消" type="button" cancle={true}  onTouchTap={this.onCancel} />
								</ButtonGroup>
							</Col>
						</Row>
					</Grid>



                   </form>
			  </div>

		);

	}
}



const validate = values => {


	const errors = {}

	if (!values.accountId) {
		errors.accountId = '请填写支付方式';
	}
	if (!values.operatedate) {
		errors.operatedate = '请填写回款日期';
	}
	if (!values.totalPayment) {
		errors.totalPayment = '请填写回款总额';
	}
	if (values.totalPayment && isNaN(values.totalPayment)) {
		errors.totalPayment = '金额只能为数字';
	}

	return errors
}



export default reduxForm({
	form: 'receivedBtnForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(ReceivedBtnForm);