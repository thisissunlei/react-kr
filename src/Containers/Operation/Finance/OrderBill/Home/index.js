import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import TitleList from 'kr-ui/TitleList';
import './index.less';

import {List, ListItem} from 'material-ui/List';
import {Table, TableBody, TableHeader, TableFooter, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ActionInfo from 'material-ui/svg-icons/action/info';
import { Field, reduxForm } from 'redux-form';

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

	var SearchForm = (props) => {
	 var   {handleSubmit, pristine, reset, submitting, submit}= props ;
	 
	 return (
	 	<form onsubmit={handleSubmit(submit)} >
	 		<div>
	 			<label>客户名称</label>
	 			<div>
	 				<Field name='name' component='input' type='text'/>
	 			</div>
	 		</div>
	 		<div>
	 			<label>所属社区</label>
	 			<div>
	 				 <Field name="area" component="select">
			            <option value="ff0000">Red</option>
			            <option value="00ff00">Green</option>
			            <option value="0000ff">Blue</option>
			          </Field>
	 			</div>
	 			
	 		</div>
	 		<div>
	 			<label>订单类型</label>
	 			<div>
	 				 <Field name="ordertype" component="select">
			            <option value="ff0000">Red</option>
			            <option value="00ff00">Green</option>
			            <option value="0000ff">Blue</option>
			          </Field>
	 			</div>
	 			
	 		</div>
	 		<div>
	 			<label>查询区间</label>
	 			<div>
	 				<Field name="time" component="DatePicker">
			             <DatePicker hintText="Portrait Dialog" />
			          </Field>
			       
	 			</div>
	 			
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
		this.tableHead = ['客户名称','订单类型','所在社区','计划入住日期','计划离开日期','收入总额','回款总额','余额','操作'];
		this.tableHeadList = ['客户名称','订单类型','所在社区','计划入住日期','计划离开日期','收入总额','回款总额','余额'];
		this.closeDialog = this.closeDialog.bind(this);
		this.confirmSubmit = this.confirmSubmit.bind(this);
		this.submitForm = this.submitForm.bind(this);
		this.doSubmit = this.doSubmit.bind(this);
		
	}

	confirmSubmit(){
		console.log('aaaa');
		var form = this.refs.searchForm;
		form.submit();
	}
	doSubmit(){
		console.log('www');
	}


	submitForm(data){
		console.log(data);
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

		const actions = [
			<FlatButton
			label="取消"
			primary={true}
			onTouchTap={this.closeDialog}
			/>,
			<FlatButton
			label="提交"
			primary={true}
			keyboardFocused={true}
			onTouchTap={this.confirmSubmit}
			/>
		];

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
							<input type="text" placeholder="请输入客户名称" />
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
									<FlatButton label="生成对账单" style={style.FlatButton}/>
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
		          actions={actions}
		          modal={false}
		          open={this.state.open}
		          onRequestClose={this.handleClose}
		        >
		        <SearchForm  ref='searchForm' submit={this.doSubmit}/>
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








