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
import * as actionCreators from 'kr-ui/../Redux/Actions';
import {
	reduxForm,
	formValueSelector,
	initialize,
	change,
	arrayPush,
	arrayInsert,
	FieldArray,
	reset
} from 'redux-form';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	Notify,
	List,
	ListItem,
	LabelText,
	Dialog,
	KrField,
	ButtonGroup
} from 'kr-ui';



var arr = [];
class ReceivedBtnForm extends Component {
	static contextTypes = {
		params: React.PropTypes.object.isRequired
	}

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
		optionList:React.PropTypes.array,
		accountDetail:React.PropTypes.array,
		contractReceive:React.PropTypes.array,
		contractTopReceive:React.PropTypes.array,
	}

	constructor(props, context) {
		super(props, context);
		this.state = { }

		//Store.dispatch(reset('ReceivedBtnForm'));
	}

	componentDidMount() {


		let initialValues = {
			preCode:'1',
			mainbillId:this.context.params.orderId
		}

		Store.dispatch(initialize('receivedBtnForm', initialValues));

	}


	onSubmit=(values)=> {
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(values);

	}

  onCancel=()=> {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

   depositFuction=(values)=>{
     const {
			depositFuction
		} = this.props;
		depositFuction && depositFuction(values);
   }
   stationFuction=(values)=>{
     const {
			stationFuction
		} = this.props;
		stationFuction && stationFuction(values);
   }

   depositAddFuction=(values)=>{
     const {
			depositAddFuction
		} = this.props;
		depositAddFuction && depositAddFuction(values);
   }
   stationAddFuction=(values)=>{
     const {
			stationAddFuction
		} = this.props;
		stationAddFuction && stationAddFuction(values);
   }

   depositAdminFuction=(values)=>{
     const {
			depositAdminFuction
		} = this.props;
		depositAdminFuction && depositAdminFuction(values);
   }
   stationAdminFuction=(values)=>{
     const {
			stationAdminFuction
		} = this.props;
		stationAdminFuction && stationAdminFuction(values);
   }
   compareFuction=(values)=>{
      const {
			compareFuction
		} = this.props;
		compareFuction && compareFuction(values);
   }
   leftBottomFuction=(values)=>{
      const {
			leftBottomFuction
		} = this.props;
		leftBottomFuction && leftBottomFuction(values);
   }
   rightBottomFuction=(values)=>{
      const {
			rightBottomFuction
		} = this.props;
		rightBottomFuction && rightBottomFuction(values);
   }
   receiveAllMoney=(values)=>{
     const {
			receiveAllMoney
		} = this.props;
		receiveAllMoney && receiveAllMoney(values);
   }
  joinInputRender=()=>{
  	return (
          <div>
              <KrField  label="押金"  grid={1/2}  name='l227l1' component="input" type="text" onChange={this.depositFuction}/>
              <KrField label="工位服务费"  grid={1/2} name='l227l3' component="input" type="text" onChange={this.stationFuction}/>
          </div>
  	  )
  }
  increaseInputRender=()=>{
  	return (
          <div>
              <KrField  label="押金"  grid={1/2}  name='l228l1' component="input" type="text" onChange={this.depositAddFuction}/>
              <KrField label="工位服务费"  grid={1/2} name='l228l3' component="input" type="text" onChange={this.stationAddFuction}/>
          </div>
  	  )
  }
  adminInputRender=()=>{
  	return (
          <div>
              <KrField  label="押金"  grid={1/2}  name='l230l1' component="input" type="text" onChange={this.depositAdminFuction}/>
              <KrField label="工位服务费"  grid={1/2} name='l230l3' component="input" type="text" onChange={this.stationAdminFuction}/>
          </div>
  	  )
  }
  tenantInputRender=()=>{

  	return (
            <div className='depositMoney-render'>
              <KrField label="定金"  grid={1/2}  name='l226l2' component="input" type="text" onChange={this.compareFuction}/>
            </div>
  		)
  }

  receiveInputRender=()=>{
  	        let {accountDetail}=this.props;
             var _this=this;
             var accountTail=accountDetail.map(function(item,index){
						      	if(index%2==0){
									return <KrField key={index} style={{marginBottom:5}}  grid={1/2}  right={43}  label={item.propname} component="input" name={item.id} type="text" onChange={_this.leftBottomFuction}/>
						      	}else{
						      		return <KrField key={index} style={{marginBottom:5}}  grid={1/2}  right={43}  label={item.propname}  component="input" name={item.id} type="text" onChange={_this.rightBottomFuction}/>
				   }
			     }
               )

            return accountTail;

  }


	render() {

         var _this=this;

		let {
			error,
			handleSubmit,
			pristine,
			reset,
			optionList,
			contractReceive,
			contractTopReceive
		} = this.props;






		let heightStyle = {
			width: '546',
			height: '72'
		}





       contractReceive.map(function(item,index){
          if(item.value=='226'){
          	item.component=_this.tenantInputRender
          }
          if(item.value=='227'){
          	item.component=_this.joinInputRender
          }
          if(item.value=='228'){
          	item.component=_this.increaseInputRender
          }
          if(item.value=='230'){
          	item.component=_this.adminInputRender
          }
          if(item.value=='000'){
          	item.component=_this.receiveInputRender
          }
       })



		return (
          <div className='receive-form-middle'>

					      <form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:45,marginLeft:'10px'}}>
                            <KrField  name="mainbillId" type="hidden" component="input"/>
		                    <KrField  label="支付方式" grid={1/2} right={21} name="accountId" style={{marginBottom:5}} type="select" options={optionList} requireLabel={true}/>
						     <KrField name="preCode" grid={1/2} left={21} component="group" style={{marginLeft:-22}}  label="金额正负" requireLabel={true}>
				                <KrField name="preCode" grid={1/2}  label="正" component="radio" type="radio" value="0"/>
				                <KrField name="preCode"  grid={1/2} label="负" component="radio" type="radio" value="1"/>
			                </KrField>

						     <KrField component="date" grid={1/2} right={23} style={{marginTop:'-5px'}}  label="回款日期" name="operatedate" requireLabel={true}/>
						     <KrField label="回款总额"  grid={1/2} right={21} style={{marginTop:'-6px'}} name="totalPayment" component="input" type="text" requireLabel={true} onChange={this.receiveAllMoney}/>
						     <KrField label="对应合同" name='contract' grid={1/2} component="groupCheckbox" defaultValue={contractReceive} requireLabel={true} />

						     <KrField label="上传附件" grid={1/2} left={30}  style={{marginLeft:-30}} name="fileids" component="file" />

                             <KrField label="备注" grid={1}  heightStyle={heightStyle} name="finaflowdesc" component="textarea" type="text" placeholder='请输入备注，输入字数不能超过100字' maxSize={100} lengthClass='ui-length-textarea'/>


						   <Grid style={{marginTop:0,marginBottom:30}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
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
const validate = values =>{

		const errors = {}

		if(!values.accountId){
			errors.accountId = '请填写支付方式';
		}
		if(!values.operatedate){
			errors.operatedate = '请填写回款日期';
		}
		if(!values.totalPayment){
			errors.totalPayment = '请填写回款总额';
		}

		return errors
	}

export default reduxForm({form:'receivedBtnForm',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(ReceivedBtnForm);
