import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {reduxForm,formValueSelector,initialize} from 'redux-form';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import {Actions,Store} from 'kr/Redux';
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
	Form,
	Dialog,
	KrField,
	ButtonGroup,
} from 'kr-ui';




class AccountBtnForm extends Component{
    static contextTypes = {
	  params: React.PropTypes.object.isRequired
    }
	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
		optionList:React.PropTypes.array,
		accountDetail:React.PropTypes.array,
		contractList:React.PropTypes.array,
		stationPayment:React.PropTypes.object,
	}
	constructor(props,context){
		super(props,context);
		this.onCancel=this.onCancel.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.state={
          Addaccount:false,

		}
	};
	onCancel(){
		const {onCancel} = this.props;
		onCancel && onCancel();
	};
	onSubmit(values){
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}
	componentDidMount() {

    
      let initialValues={
       	 preCode:'0',
       	 mainbillId:this.context.params.orderId,
       	 operatedate:'',
       	 accountId:''
       }
	   Store.dispatch(initialize('AccountBtnForm',initialValues));
		
	}
	
	render(){
		const {error,handleSubmit,pristine,reset,accountDetail,contractList,optionList,stationPayment} = this.props;
		let style={
       	 marginTop:'6'
       }
       let heightStyle={s
       	 width:'546',
       	 height:'72'
       }

           
        let stationPaymentName=stationPayment.id;

		return(
			 <div className='ui-quit-wrap' style={{marginLeft:3}}>
				<form  onSubmit={handleSubmit(this.onSubmit)} style={{marginLeft:31}}>
					<KrField  name="mainbillId" type="hidden"/>
					<KrField grid={1/2} name="accountId" right={42} component="select" label="支付方式" options={optionList} requireLabel={true}/> 
					<KrField name="preCode" grid={1/2} component="group" label="金额正负" requireLabel={true} style={{marginLeft:-12}}>
		                <KrField name="preCode" label="正" type="radio" value="0"/>
		                <KrField name="preCode" label="负" type="radio" value="1" />
		            </KrField> 
					<KrField grid={1/2} name="operatedate" right={45} type="date" component="date" label="挂账日期" requireLabel={true} style={{marginTop:3}}/> 
					<KrField grid={1/2} name="fileids"  component="file" label="上传附件" style={{marginLeft:-12}}/>
					<KrField grid={1/2} name="stationPaymentName" right={42}  component="input" label={stationPayment.propname} type="text" style={{marginRight:-12}}/> 
					<KrField grid={1/2} name="contractId" right={42}  component="select" label="工位合同"  options={contractList}/> 
					
					   <div>
						      {accountDetail.map((item,index)=>{
						      	 
						      	if(index%2==0){
									return <KrField key={index}   grid={1/2} style={{marginTop:5,marginRight:-12}} right={42} label={item.propname} component="input" name={item.id} type="text"/>
									        
						      	}else{
						      		return <KrField key={index}   grid={1/2}  style={{marginTop:5}} right={42} label={item.propname} component="input" name={item.id} type="text"/>
						      	}

						        }

						       )}
					    </div>
					
				
					<KrField grid={1} style={style} label="备注" name="finaflowdesc" style={{marginTop:5}} type="text" heightStyle={heightStyle} component="textarea"  placeholder='请输入备注,文字不能超过100字' maxSize={100} lengthClass='ui-length-textarea'/> 


					
					<Grid style={{marginBottom:5,marginLeft:-30}}>
						<Row>
							<Col md={12} align="center">
								<ButtonGroup>
									<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div> 
									<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} /> 
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
			errors.operatedate = '请填写挂帐日期';
		}
		if(!values.finaflowamount){
			errors.finaflowamount = '请填写金额';
		}
		if (values.finaflowamount && isNaN(values.finaflowamount)) {
			errors.finaflowamount = '金额必须为数字';
		}
		if (!values.stationPaymentName&&values.contractId) {
			errors.stationPaymentName = '必须填写工位服务费金额';
		}
		if (values.stationPaymentName&&!values.contractId) {
			errors.contractId = '必须选择工位合同';
		}
	
	
		return errors
	}

export default reduxForm({
	form: 'AccountBtnForm',
	validate,enableReinitialize:true,keepDirtyOnReinitialize:true
})(AccountBtnForm);




