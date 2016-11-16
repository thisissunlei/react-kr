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

	static PropTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
		optionList: React.PropTypes.object,
		typeList: React.PropTypes.object,

	}

	constructor(props, context) {
		super(props, context);
		this.onCancel = this.onCancel.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.state = {

		}
    
		//Store.dispatch(reset('ReceivedBtnForm'));
	}

	componentDidMount() {
        

		let initialValues = {
			sumSign: '1',
			autoSplit: '0',
			mainbillid: this.context.params.orderId
		}

		Store.dispatch(initialize('ReceivedBtnForm', initialValues));

	}


	onSubmit(values) {
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(values);

	}

	onCancel() {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}



	render() {



		const {
			error,
			handleSubmit,
			pristine,
			reset,
			optionList,
			changeValues,
			typeList
		} = this.props;



		return (

			<div className='ui-receive-money'>
                 
					      <form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:45,marginLeft:'10px'}}>
                            <KrField  name="mainbillid" type="hidden" component="input"/>
		                    <KrField  label="代码名称"  style={{width:252,marginRight:'30px'}} name="accountId" type="select" options={optionList} requireLabel={true}/>
						     <KrField name="sumSign"  style={{width:252,marginRight:'30px'}} component="group" label="金额正负" requireLabel={true}>
				                <KrField name="sumSign" style={{width:112,marginRight:'30px'}} label="正" component="radio" type="radio" value="0"/>
				                <KrField name="sumSign"style={{width:112,marginRight:'30px'}} label="负" component="radio" type="radio" value="1"/>
			                </KrField>
                            
						    <KrField component="date"  style={{width:252,marginRight:'30px'}} label="回款日期" name="receiveDate" requireLabel={true}/>
						     <KrField label="上传附件" style={{width:252,marginRight:'30px'}} name="fileids" component="file" />
                             <KrField label="交易编号" placeholder='请输入交易编号' style={{width:252,marginRight:'30px'}}  name="dealCode"  component="input" type="text" requireLabel={true}/>
                             <KrField label="是否自动拆分" style={{width:252,marginRight:'30px'}} name="autoSplit" component="select" options={
						    	[{label:"是",value:"1"},{label:"否",value:"0"}]
						    } requireLabel={true}/>

						    {parseInt(changeValues.autoSplit)?<div>
						    	 <KrField label="金额（元） "  style={{width:252,marginRight:'30px'}} name="sum" component="input" type="text" requireLabel={true} placeholder='请输入金额'/>
						    </div>:<div>
						      {typeList.map((item,index)=>						
						         <KrField key={index} style={{width:252,marginRight:'30px'}} label={item.label} component="input" name={item.value} type="text" placeholder=" 请输入'+{item.label}+'"/>						 
						       )}                           
						    </div>}
						    
						   

						    

						    
                            
                           
                            <KrField label="备注" style={{width:546}} name="remark" component="textarea" type="text" placeholder='请输入备注，输入字数不能超过100字' maxSize={100}/>
                           

						   <Grid style={{marginTop:10,marginBottom:5}}>
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

const validate = values => {

	const errors = {}



	if (!values.accountId) {
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

	if (values.sum && isNaN(values.sum)) {
		errors.sum = '金额必须为数字';
	}

	return errors
}

const selector = formValueSelector('ReceivedBtnForm');

ReceivedBtnForm = reduxForm({
	form: 'ReceivedBtnForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true
})(ReceivedBtnForm);

export default connect((state) => {

	let changeValues = {};

	changeValues.autoSplit = selector(state, 'autoSplit');

	return {
		changeValues
	}

})(ReceivedBtnForm);
