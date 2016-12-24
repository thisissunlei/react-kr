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




class ShiftBtnForm extends Component{

	static PropTypes = {
		shiftData:React.PropTypes.arr,
		initialValuesId:React.PropTypes.object,
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
       	flowId:this.props.initialValuesId.id, 
       	preCode:'0'
       }
	   Store.dispatch(initialize('shiftBtnForm',initialValues));
		
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
       
        const { error, handleSubmit, pristine, reset,initialValuesId} = this.props;
		

         let shiftData=[
        {
            "id":72726,"propname":"押金"
        }, 
         {
            "id":727,"propname":"定金"
        }, 
        {
            "id":725,"propname":"电费"
        },  
        ]
 
		return(
          <div style={{marginTop:'35px'}}>
                 
					    <form onSubmit={handleSubmit(this.onSubmit)} style={{marginLeft:'30px'}}>
 
						    <KrField name="flowId" type="hidden"/>
						    <KrField grid={1/2} label="可操作金额"  component="labelText" value={initialValuesId.fiMoney} inline={false} defaultValue="无"/>
                            <KrField name="preCode" grid={1/2} left={30} component="group"   label="金额正负" style={{marginLeft:'-45px'}}>
				                <KrField name="preCode" grid={1/2} right={30} label="正" component="radio" type="radio" value="1"/>
				                <KrField name="preCode"  grid={1/2} left={30}label="负" component="radio" type="radio" value="0"/>
			                </KrField>
			                <KrField type="date" grid={1/2} label="转移日期" right={45} name="operatedate" /> 
                             
                             {shiftData.map((item,index)=>{
						      	if(index%2==0){
									return <KrField key={index} style={{marginBottom:5}}  grid={1/2}  right={43}  style={{marginLeft:'-14px'}} label={item.propname} component="input" name={item.id} type="text"/>
						      	}else{
						      		return <KrField key={index} style={{marginBottom:5}}  grid={1/2}  right={43}  label={item.propname}  component="input" name={item.id} type="text"/>
						      	}

						      }
                             )}
                             <KrField label="上传附件" grid={1/2} name="fileids" style={{marginLeft:-5}} component="file"/>
                          
                       
                           

				
						   <Grid style={{marginTop:0,marginBottom:5,marginLeft:-30}}>
							<Row>
								<Col md={12} align="center">
									<ButtonGroup>
										<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm/></div>
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



export default reduxForm({form:'shiftBtnForm',enableReinitialize:true,keepDirtyOnReinitialize:true})(ShiftBtnForm);




