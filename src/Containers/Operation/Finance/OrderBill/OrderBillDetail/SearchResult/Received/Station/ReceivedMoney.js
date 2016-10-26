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
	KrField
} from 'kr-ui';



class ReceivedMoney extends Component{

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
		optionList:React.PropTypes.object,
		initialValues:React.PropTypes.object,
  }

	constructor(props,context){
		super(props, context);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
		  this.state = {
			
	     }
   }

	componentDidMount() {

       let {initialValues}= this.props;
	   Store.dispatch(initialize('ReceivedMoney',initialValues));
		
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

	

        const { error, handleSubmit, pristine, reset,optionList,changeValues} = this.props;
		

		console.log("vbvbvb",this.props.initialValues)
        
 
		return(

			    <div>
                 
					      <form onSubmit={handleSubmit(this.onSubmit)}>
                            <KrField  name="mainbillid" type="hidden" component="input"/>
						    <KrField  label="代码名称" name="accountId" type="select" options={optionList}/>
						    <KrField component="date" label="回款日期" name="receiveDate"/>
						    <KrField label="交易编号" name="dealCode"  component="input" type="text"/>
						    <KrField label="是否自动拆分" name="autoSplit" component="select" options={
						    	[{label:"是",value:"1"},{label:"不是",value:"0"}]
						    }/>
                            <KrField name="sumSign" component="group" label="金额正负" >
				                <KrField name="sumSign" label="正" component="radio" type="radio" value="0"/>
				                <KrField name="sumSign" label="负" component="radio" type="radio" value="1" />
			                </KrField>
                           {parseInt(changeValues.autoSplit)?<div>
						    	<KrField label="金额（元）" name="sum" component="input" type="text"/>
						    </div>:<div>
						      <KrField label="定金" name='dinjin' component="input" type="text"/>
						      <KrField label="押金" name='yajin' component="input" type="text"/>
						      <KrField label="租金" name='gongweihuikuan'  component="input" type="text"/>
						      <KrField label="其他" name='qitahuikuan'  component="input" type="text"/>
                              
						    </div>}
                            <KrField label="备注" name="remark" component="input" type="text"/>
                            <KrField label="上传附件" name="fileids" component="file" />

						    <Row>
								<Col md={6}> <Button  label="确定" type="submit" primary={true} /> </Col>
								<Col md={6}> <Button  label="取消" type="button"  onTouchTap={this.onCancel} /> </Col>
						   </Row> 
					   
                         </form>
			</div>		

		);

	}

}


const selector = formValueSelector('ReceivedMoney');

ReceivedMoney = reduxForm({ form: 'ReceivedMoney',enableReinitialize:true,keepDirtyOnReinitialize:true})(ReceivedMoney);

export default connect((state)=>{

	let changeValues = {};

	changeValues.autoSplit = selector(state,'autoSplit');

	return {
		changeValues
	}

})(ReceivedMoney);





