import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {Actions,Store} from 'kr/Redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import {reduxForm,formValueSelector,initialize} from 'redux-form';
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




class QuitMoney extends Component{

	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
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
		Store.dispatch(initialize('QuitMoney',initialValues));
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

		const { error, handleSubmit, pristine, reset} = this.props;

		return(

			    <div>
                 
					     <form onSubmit={handleSubmit(this.onSubmit)}>
 
						    <KrField name="id" type="hidden"/>
                            <KrField label="金额（元）" name="finaflowamount" component="input" type="text"/>
                            <KrField type="date" label="退款日期" name="receiveDate"/>
                            <KrField label="备注" name="finaflowdesc" component="input" type="text"/>
                            <KrField label="上传附件" name="fileids" component="file"/>

						    <Row>
								<Col md={6}> <Button  label="确定" type="submit" primary={true} /> </Col>
								<Col md={6}> <Button  label="取消" type="button"  onTouchTap={this.onCancel} /> </Col>
						   </Row> 
					   
                         </form>
			</div>		

		);

	}

}


export default reduxForm({form:'QuitMoney'})(QuitMoney);




