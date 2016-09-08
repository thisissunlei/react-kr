import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';

import TitleList from 'kr-ui/TitleList';
import './index.less';

import {List, ListItem} from 'material-ui/List';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'

import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ActionInfo from 'material-ui/svg-icons/action/info';


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
	SelectField
} from 'material-ui';
import FlatButton from 'material-ui/FlatButton';
import Formsy from 'formsy-react';
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
		}
		
	}


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

		this.actions = [
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
	}

	confirmSubmit(){
		var form = this.refs.myForm;
		form.submit();
	}
	submitForm(form){
		console.log(form);
	}



	componentDidMount() {


	}

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

	handleChange = (event, index, value) => {this.setState({value});this.refs.myForm.area = value};



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
							<input type="text" placeholder="请输入客户名称" />
						</div>
					</div>
				<Table className="table-content" >
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
				</Table>

				</Section>
				</div>
				

				<Dialog
			modal={false}
			open={this.state.open}
			onRequestClose={this.closeDialog}
			autoScrollBodyContent={true}
			actions={this.actions}
			>

			<div className="form">

			<Formsy.Form
			onValidSubmit={this.submitForm}
			ref="myForm"
			>

			<div className="form-group">
				<label for="" className="label-control">客户名称</label>
				<div className="form-control">
					<FormsyText
						name="content"
						required
						fullWidth
						hintText="客户名称" />
				</div>
			</div>

			<div className="form-group">
				<label for="" className="label-control">所属社区</label>
				<div className="form-control">
					<SelectField value={this.state.value} onChange={this.handleChange} name="area">
			          <MenuItem value={1} primaryText="Never" />
			          <MenuItem value={2} primaryText="Every Night" />
			          <MenuItem value={3} primaryText="Weeknights" />
			          <MenuItem value={4} primaryText="Weekends" />
			          <MenuItem value={5} primaryText="Weekly" />
			        </SelectField>
				</div>

			</div>

				</Formsy.Form>
			</div>

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








