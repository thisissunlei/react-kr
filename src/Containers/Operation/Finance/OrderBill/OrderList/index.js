import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import TitleList from 'kr-ui/TitleList';
import './index.less';
import {KrField} from 'kr-ui/Form';

import {List, ListItem} from 'material-ui/List';
import {Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'
import {blue500, yellow600,red500,pink500,purple500} from 'material-ui/styles/colors';

import {Grid,Row,Col} from 'kr-ui/Grid';

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { Field, reduxForm } from 'redux-form';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';

import Section from 'kr-ui/Section';

import {
	AppBar,
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	IconButton,
	RaisedButton,
	Drawer,
	Divider,
	FontIcon,
	GridList,
	GridTile,
	DatePicker,
	Dialog,
	Avatar,
	SelectField,
} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import Formsy from 'formsy-react';
import Toggle from 'material-ui/Toggle';
import { FormsyCheckbox, FormsyDate, FormsyRadio, FormsyRadioGroup,
    FormsySelect, FormsyText, FormsyTime, FormsyToggle } from 'formsy-material-ui/lib';


	const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
	  <SelectField
	    floatingLabelText={label}
	    errorText={touched && error}
	    {...input}
	    onChange={(event, index, value) => input.onChange(value)}
	    children={children}/>
	)
	

	var SearchForm = (props) => {
	 const  { handleSubmit, pristine, reset, submitting ,submit,cancle} = props;
	 return (
	 	<form onSubmit={handleSubmit(submit)} className='search-form'>
	 		<div>
	 			<KrField name="username" type="text" label="客户名称：" />
	 		</div>
	 		<div>
	 			<label>所属社区：</label>
			        <Field name="area" component={renderSelectField}>
			          <MenuItem value={'ff0000'} primaryText="Red"/>
			          <MenuItem value={'00ff00'} primaryText="Green"/>
			          <MenuItem value={'0000ff'} primaryText="Blue"/>
			        </Field>
	 			
	 		</div>
	 		<div>
	 				<label>订单类型：</label>
			        <Field name="orderType" component={renderSelectField}>
			          <MenuItem value={'ff0000'} primaryText="Red"/>
			          <MenuItem value={'00ff00'} primaryText="Green"/>
			          <MenuItem value={'0000ff'} primaryText="Blue"/>
			        </Field>
	 			
	 		</div>
	 		<div>
	 			<label>查询区间：</label>
	 				<Avatar icon={<ActionDateRange  />}  size={25}/>
	 				<Field name="time" component='DatePicker'>
	 				</Field>
			            
			       
	 			
	 		</div>
	 		<div className="button">
				<FlatButton
				label="取消"
				primary={true}
				onTouchTap={cancle}
				/>,
				<FlatButton
				label="提交"
				primary={true}
				type="submit"
				/>
	 		</div>
	 		
	 	</form>
	 )
}

	SearchForm = reduxForm({
		  form: 'simple'
		})(SearchForm);


class OrderList extends Component{

	

	constructor(props,context){
		super(props, context);

		this.state = {
			open:false
		};
		this.title = ['系统运营','财务管理'];
		this.tableHead = ['票据类型','发票号码','开票金额','开票日期','操作人','备注','操作'];
		this.tableHeadList = ['票据类型','发票号码','开票金额','开票日期','操作人','备注'];
		this.companyInfo = this.companyInfo.bind(this);
	}

	submitForm(values){
		this.setState({open: false});
		console.log('ccccc',values);
	}



	componentDidMount() {


	}
	companyInfo(){
		return (
				<Grid style={{marginTop:20}}>
					<Row>
						<Col md={3}>hahhaah</Col>
						<Col md={3}>hahhaah</Col>
						<Col md={3}>hahhaah</Col>
						<Col md={3}>hahhaah</Col>
					</Row>
				</Grid>
		)
	}



	render() {

		return (
			<div>
				<div>
					<TitleList children={this.title}></TitleList>
				</div>
				<div>
					<Section title="财务管理" description=""> 
						{this.companyInfo()}
					</Section>
					<div className="container">
						<div className="billlist">
						</div>
					</div>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state){

	return {
		plan:state.plan,
		items:state.plan.items,
		now_date:state.plan.now_date
	};
}

function mapDispatchToProps(dispatch){
	return {
		actions:bindActionCreators(Object.assign({},actionCreators),dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(OrderList);








