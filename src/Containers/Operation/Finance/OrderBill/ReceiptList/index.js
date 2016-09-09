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


	const style = {
		FlatButton:{
			width:30,
			color:'#0099FF',
			display:'block',
			border:0,
			lineHeight:'20px',
			height:20,
		},
		derived:{
			color:'#fff',
			background:'rgb(0,153,255)',
			width:30,
		}
		
	}

	const renderSelectField = ({ input, label, meta: { touched, error }, children }) => (
	  <SelectField
	    floatingLabelText={label}
	    errorText={touched && error}
	    {...input}
	    onChange={(event, index, value) => input.onChange(value)}
	    children={children}/>
	)
	const renderDate = ({input, label, meta: { touched, error }}) =>(
		<DatePicker onChange={(event, value) => input.onChange(value)} />
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


class Home extends Component{

	

	constructor(props,context){
		super(props, context);

		this.state = {
			open:false
		};
		this.renderSearchCard = this.renderSearchCard.bind(this);
		this.title = ['系统运营','财务管理'];
		this.tableHead = ['票据类型','发票号码','开票金额','开票日期','操作人','备注','操作'];
		this.tableHeadList = ['票据类型','发票号码','开票金额','开票日期','操作人','备注'];
		this.closeDialog = this.closeDialog.bind(this);
		this.submitForm = this.submitForm.bind(this);
		
	}

	submitForm(values){
		this.setState({open: false});
		console.log('ccccc',values);
	}



	componentDidMount() {


	}

	handleOpen = () => {
	    this.setState({open: true});
	  };

	  handleClose = () => {
	    this.setState({open: false});
	  };


	handleToggle(){

		this.setState({open: !this.state.open});

		var {actions,sidebar_nav} = this.props;

		actions.switchSidebarNav(!!!sidebar_nav.switch_value);

	}

	
	renderSearchCard(){
		this.setState({open:true});
		
	}

	closeDialog(){
		this.setState({open: false});
	}

	handleChange = (event, index, value) => {this.setState({value});};


	render() {

		return (

		<div>


				<TitleList children={this.title}></TitleList>
				<div className="order-table">
				<Section title="财务管理" description="">	
					<div>
						<span>收入总额：</span>
						<span>收入总额：</span>
						<span>余额：</span>
						<div className="search-content">
							<input type="text" placeholder="请输入客户名称"  
							icon={<FontIcon className="search" />}/>
						</div>
					</div>
				<Table className="table-content" multiSelectable={true}>
					<TableHeader>
						<TableRow>
							{this.tableHead.map((item)=>{
								return <TableHeaderColumn key={item}>{item}</TableHeaderColumn>
							})}
						</TableRow>
					</TableHeader>
					
					<TableBody>
						{this.tableHead.map( (row, index) => (
			              <TableRow key={index} selected={row.selected}>
				              {this.tableHeadList.map((item)=>{
									return <TableRowColumn key={item} >{item}</TableRowColumn>
								})}

								<TableRowColumn>
								    <FlatButton label="查看" onTouchTap={this.renderSearchCard} style={style.FlatButton}/>
								    <FlatButton label="编辑" onTouchTap={this.renderSearchCard} style={style.FlatButton}/>
									<FlatButton label="删除" style={style.FlatButton}/>
								</TableRowColumn>
			              </TableRow>
			              ))}

			              
						
					</TableBody>
			            
			        <TableFooter>
			        	<TableRow>
			              <TableRowColumn colSpan="5"> 	
							<RaisedButton label="导出"  primary={true}/>
			              </TableRowColumn>
			              <TableRowColumn colSpan="3">Status</TableRowColumn>
			            </TableRow>
			        </TableFooter>
				</Table>

				</Section>
				</div>
				
				 <Dialog
		          modal={false}
		          open={this.state.open}
		          onRequestClose={this.handleClose}
		        >
		        <SearchForm submit={this.submitForm} ref="simple" cancle={this.closeDialog}/>
		         </Dialog>
			
			
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

export default connect(mapStateToProps,mapDispatchToProps)(Home);








