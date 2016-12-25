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



		let {
			error,
			handleSubmit,
			pristine,
			reset,
			optionList,
			changeValues,
			typeList
		} = this.props;

		

		let heightStyle = {
			width: '546',
			height: '72'
		}


		return (
          <div className='receive-form-middle'>
			
					      <form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:45,marginLeft:'10px'}}>
                            <KrField  name="mainbillid" type="hidden" component="input"/>
		                    <KrField  label="支付方式" grid={1/2} right={21} name="accountId" style={{marginBottom:5}} type="select" options={optionList} requireLabel={true}/>
						     <KrField name="sumSign" grid={1/2} left={21} component="group" style={{marginLeft:-22}}  label="金额正负" requireLabel={true}>
				                <KrField name="sumSign" grid={1/2}  label="正" component="radio" type="radio" value="0"/>
				                <KrField name="sumSign"  grid={1/2} label="负" component="radio" type="radio" value="1"/>
			                </KrField>

						     <KrField component="date" grid={1/2} right={23} style={{marginTop:'-5px'}}  label="回款日期" name="receiveDate" requireLabel={true}/>
						     <KrField label="回款总额"  grid={1/2} right={21} style={{marginTop:'-6px'}} name="finaflowamount" component="input" type="text" requireLabel={true}/>
						     <KrField label="上传附件" grid={1/2} left={30}  style={{marginLeft:-30}} name="fileids" component="file" />
                       
                            <KrField label="备注" grid={1}  heightStyle={heightStyle} name="remark" component="textarea" type="text" placeholder='请输入备注，输入字数不能超过100字' maxSize={100} lengthClass='ui-length-textarea'/>


						   <Grid style={{marginTop:0,marginBottom:5}}>
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


export default reduxForm({form:'receivedBtnForm',enableReinitialize:true,keepDirtyOnReinitialize:true})(ReceivedBtnForm);