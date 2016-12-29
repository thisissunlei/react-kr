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
	Message,
	ButtonGroup
} from 'kr-ui';



var joinContractId='';
var adminContractId='';
var increaseContractId='';
var tenantContractId='';
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
	}

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {


		let initialValues = {
			preCode:'1',
			mainbillId:this.context.params.orderId
		}

		Store.dispatch(initialize('receivedBtnForm', initialValues));

	}
     componentWillMount(){
     	console.log('44444');
     }

	onSubmit=(values)=> {
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(values);

	}

	moneyCheck=(value)=>{
		if(isNaN(value)){
          Message.error('金额只能为数字');
          return ;
		}
	}

  onCancel=()=> {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

   calcBalance=(value,input)=>{
     var lastValue=value.split('.')[1]
     if(lastValue&&lastValue.length>2){
       Message.error('最多到小数点后两位');
       return ; 
     }
   	 let {changeValues,calcBalance} = this.props;
   	 input.value = value;
   	 calcBalance && calcBalance(input);
  
   }
  
  joinInputRender=()=>{
  	return (
          <div style={{width:600,marginTop:8}} className='m-tenantStation'>
              <KrField  label="押金"  grid={1/2}  name={joinContractId+'1'} style={{width:261,marginLeft:-9}} component="input" type="text" onChange={this.calcBalance} onBlur={this.moneyCheck}/>
              <KrField label="工位服务费"  grid={1/2} name={joinContractId+'3'} style={{width:261,marginLeft:28}} component="input" type="text" onChange={this.calcBalance} onBlur={this.moneyCheck}/>
          </div>
  	  )
  }
  increaseInputRender=()=>{
  	return (
          <div style={{width:600,marginTop:8}} className='m-tenantStation'>
              <KrField  label="押金"  grid={1/2}  name={increaseContractId+'1'} style={{width:261,marginLeft:-9}} component="input" type="text" onChange={this.calcBalance} onBlur={this.moneyCheck}/>
              <KrField label="工位服务费"  grid={1/2} name={increaseContractId+'3'} style={{width:261,marginLeft:28}} component="input" type="text" onChange={this.calcBalance} onBlur={this.moneyCheck}/>
          </div>
  	  )
  }
  adminInputRender=()=>{
  	return (
          <div style={{width:600,marginTop:8}} className='m-tenantStation'>
              <KrField  label="押金"  grid={1/2}  name={adminContractId+'1'} style={{width:261,marginLeft:-9}} component="input" type="text" onChange={this.calcBalance} onBlur={this.moneyCheck}/>
              <KrField label="工位服务费"  grid={1/2} name={adminContractId+'3'} style={{width:261,marginLeft:28}} component="input" type="text" onChange={this.calcBalance} onBlur={this.moneyCheck}/>
          </div>
  	  )
  }
  tenantInputRender=()=>{

  	return (
            <div className='depositMoney-render'  style={{width:546}}>
              <KrField label="定金"  grid={1/2}  name={tenantContractId+'2'} style={{width:261,marginLeft:-9}} component="input" type="text" onChange={this.calcBalance} onBlur={this.moneyCheck}/>
            </div>
  		)
  }

  receiveInputRender=()=>{
  	        let {accountDetail}=this.props;
             var _this=this;


		let heightStyle = {
			width: '546',
			height: '72'
		}

              return (
              	    <div>
              	       {
              	       	accountDetail.map(function(item,index){
						      	if(index%2==0){
									return <div className='leftBottomValue'><KrField key={index} style={{marginBottom:5,width:261,marginLeft:-9}}  grid={1/2}   label={item.propname} component="input" name={item.id} type="text" onChange={_this.calcBalance} onBlur={this.moneyCheck}/></div>
						      	}else{
						      		return <div className='rightBottomValue'><KrField key={index} style={{marginBottom:5,width:261}} grid={1/2}   label={item.propname}  component="input" name={item.id} type="text" onChange={_this.calcBalance} onBlur={this.moneyCheck}/></div>
						   }
					     }
		               )
              	       }
              	       <div className='m-textareaText'><KrField label="备注" grid={1}  heightStyle={heightStyle} name="finaflowdesc" component="textarea" type="text" placeholder='请输入备注，输入字数不能超过100字' maxSize={100} lengthClass='ui-length-textarea'/></div>
              	    </div>
              	  )
              

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
			accountDetail,	
		} = this.props;






      contractReceive.map(function(item,index){
          if(item.value=='1'){
          	item.component=_this.tenantInputRender;
            tenantContractId=item.contractId
          }
          if(item.value=='2'){
          	item.component=_this.joinInputRender;
          	joinContractId=item.contractId
          }
          if(item.value=='3'){
          	item.component=_this.increaseInputRender;
          	increaseContractId=item.contractId
          }
          if(item.value=='4'){
          	item.component=_this.adminInputRender;
          	adminContractId=item.contractId
          }
          if(item.value=='000'){
          	item.component=_this.receiveInputRender
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
						     <KrField label="对应合同" name='contract' grid={1/2} component="groupCheckbox" defaultValue={contractReceive} requireLabel={true} />

						     <KrField label="上传附件" grid={1/2} left={30}  style={{marginLeft:-30}} name="fileids" component="file" />

                            


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
		if(values.totalPayment&&isNaN(values.totalPayment)){
			errors.totalPayment = '金额只能为数字'; 
		}

		return errors
	}



export default reduxForm({form:'receivedBtnForm',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(ReceivedBtnForm);
