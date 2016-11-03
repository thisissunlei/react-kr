import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions,Store} from 'kr/Redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import {reduxForm,formValueSelector,initialize,change,arrayPush,arrayInsert,FieldArray} from 'redux-form';

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



var arr=[];
class ReceivedBtnForm extends Component{
	static contextTypes = {
	  params: React.PropTypes.object.isRequired
    }

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
		optionList:React.PropTypes.object,
		typeList:React.PropTypes.object,
		
  }

	constructor(props,context){
		super(props, context);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
		  this.state = {
			
	     }
   }

	componentDidMount() {

    
      let initialValues={
       	 sumSign:'0',
       	 autoSplit:'0',
       	 mainbillid:this.context.params.orderId
       }
	   Store.dispatch(initialize('ReceivedBtnForm',initialValues));
		
	}
    
   
    onSubmit(values){
		 const {onSubmit} = this.props;
		 onSubmit && onSubmit(values);

	 }

	 onCancel(){
		 const {onCancel} = this.props;	
		 onCancel && onCancel();		 
	 }
	

	  

    

	render(){

	

        const { error, handleSubmit, pristine, reset,optionList,changeValues,typeList} = this.props;
		

		//console.log("====999",typeList)
        

 
		return(

			    <div>
                 
					      <form onSubmit={handleSubmit(this.onSubmit)}>
                            <KrField  name="mainbillid" type="hidden" component="input"/>
						    <KrField  label="代码名称" name="accountId" type="select" options={optionList} requireLabel={true}/>
						    <KrField component="date" label="回款日期" name="receiveDate" requireLabel={true}/>
						    <KrField label="交易编号" name="dealCode"  component="input" type="text" requireLabel={true}/>
						    <KrField label="是否自动拆分"  name="autoSplit" component="select" options={
						    	[{label:"是",value:"1"},{label:"否",value:"0"}]
						    } requireLabel={true}/>

						    {parseInt(changeValues.autoSplit)?<div>
						    	 <KrField label="金额（元）" name="sum" component="input" type="text" requireLabel={true}/>
						    </div>:<div>
						      {typeList.map((item,index)=>						
						         <KrField key={index} grid={1} label={item.label} component="input" name={item.value} type="text"/>						 
						       )}                           
						    </div>}
                            
                            <KrField name="sumSign" component="group" label="金额正负" requireLabel={true}>
				                <KrField name="sumSign" label="正" component="radio" type="radio" value="0"/>
				                <KrField name="sumSign" label="负" component="radio" type="radio" value="1"/>
			                </KrField>
                            
                            <KrField label="备注" name="remark" component="input" type="text"/>
                            <KrField label="上传附件" name="fileids" component="file" />

						   <Grid style={{marginTop:20}}>
						<Row>
							<Col md={12} align="right">
								<ButtonGroup>
									<Button  label="确定" type="submit" primary={true} /> 
									<Button  label="取消" type="button"  onTouchTap={this.onCancel} /> 
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
	console.log('--------');
		

		if(!values.accountId){
			errors.accountId = '请填写代码名称';
		}

		if (!values.receiveDate) {
			errors.receiveDate = '请填写回款日期';
		}

		if (!values.dealCode) {
			errors.dealCode = '请填写交易编号';
		}

		if (!values.sum) {
			errors.sum = '请填写金额';
		}		

		return errors
	}

const selector = formValueSelector('ReceivedBtnForm');

ReceivedBtnForm = reduxForm({ form: 'ReceivedBtnForm',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(ReceivedBtnForm);

export default connect((state)=>{

	let changeValues = {};

	changeValues.autoSplit = selector(state,'autoSplit');

	return {
		changeValues
	}

})(ReceivedBtnForm);




