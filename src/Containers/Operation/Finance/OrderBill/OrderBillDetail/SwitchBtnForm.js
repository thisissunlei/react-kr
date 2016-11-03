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
	KrField,
	ButtonGroup
} from 'kr-ui';




class SwitchBtnForm extends Component{

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
	   Store.dispatch(initialize('SwitchBtnForm',initialValues));
		
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

	

        const { error, handleSubmit, pristine, reset,optionList} = this.props;
		

        
 
		return(

			    <div>                 
					      <form onSubmit={handleSubmit(this.onSubmit)}>                           
						    <KrField  name="id" type="hidden"/>
                            <KrField label="合同编号" name="contractcodeId" type="select" options={optionList} requireLabel={true}/>
                            <KrField label="备注" name="finaflowdesc" component="input" type="text"/>
                            <KrField label="上传附件" name="fileids" component="file"/>

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

		if(!values.contractcodeId){
			errors.contractcodeId = '请填写合同编号';
		}
	
		return errors
	}


export default reduxForm({form:'SwitchBtnForm',validate})(SwitchBtnForm);




