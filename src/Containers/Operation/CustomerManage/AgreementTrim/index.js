import React, { PropTypes } from 'react'; 
import { connect } from 'kr/Redux';

import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';

import { observer } from 'mobx-react';

import {
	Actions,
	Store
} from 'kr/Redux';

import Baidu from 'kr/Utils/Baidu';

import {Http} from 'kr/Utils';

import {
	Tabs,
	Tab,
	Form,
	Title,
	Message,
	Section,
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableRow,
	TableHeaderColumn,
	TableRowColumn,
	Button,
	SearchForms,
	Drawer
} from 'kr-ui';
import './index.less'
import AgreementList from './AgreementList';
import Edit from './Edit';
import State from './State';

@observer
class AgreementTrim extends React.Component {

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		console.log('did')
	}
	onPageChange=(page)=>{
		console.log(page)
	}
	onSearchSubmit=(value)=>{
		console.log(value)
		// let content = value.content;
		State.searchParams = Object.assign({},State.searchParams,value)
	}
	openNewCreateDialog=()=>{
		State.openAgreementList = true;
		console.log('=========>')
	}
	detailOpenEdit=()=>{
		State.openEdit = false;
	}
	


	render() {
		

		return (

			<div className="tab-container" style={{minHeight:910,background:'#fff'}}>

			<Title value="合同调整"/>
			<Section title="合同调整" description="" bodyPadding={'20px 20px 50px 20px'}>
				<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
					<Button operateCode="mbr_list_add"  label="新建"  onTouchTap={this.openNewCreateDialog} />
					<SearchForms onSubmit={this.onSearchSubmit}  style={{marginTop:5,zIndex:10000}} />
				</form>
				<Table
					displayCheckbox={false}
					className="member-list-table"
					style={{marginTop:10,position:'inherit'}}
					ajax={true}
					ajaxFieldListName='items'
					ajaxUrlName='membersList'
					ajaxParams={State.searchParams}
					onPageChange={this.onPageChange}
				>
					<TableHeader>
						<TableHeaderColumn>客户名称</TableHeaderColumn>
						<TableHeaderColumn>订单名称</TableHeaderColumn>
						<TableHeaderColumn>合同类型</TableHeaderColumn>
						<TableHeaderColumn>调整内容</TableHeaderColumn>
						<TableHeaderColumn>操作人</TableHeaderColumn>
						<TableHeaderColumn>操作时间</TableHeaderColumn>
					</TableHeader>
					<TableBody style={{position:'inherit'}}>
						<TableRow>
						<TableRowColumn name="phone"
						component={(value,oldValue)=>{
							if(value==""){
								value="-"
							}
							return (<span>{value}</span>)}}
						></TableRowColumn>
						<TableRowColumn name="phone"
						component={(value,oldValue)=>{
							if(value==""){
								value="-"
							}
							return (<span>{value}</span>)}}
						></TableRowColumn>
						<TableRowColumn name="phone"
						component={(value,oldValue)=>{
							if(value==""){
								value="-"
							}
							return (<span>{value}</span>)}}
						></TableRowColumn>
						<TableRowColumn name="phone"
						component={(value,oldValue)=>{
							if(value==""){
								value="-"
							}
							return (<span>{value}</span>)}}
						></TableRowColumn>
						<TableRowColumn name="phone"
						component={(value,oldValue)=>{
							if(value==""){
								value="-"
							}
							return (<span>{value}</span>)}}
						></TableRowColumn>
						<TableRowColumn name="phone"
						component={(value,oldValue)=>{
							if(value==""){
								value="-"
							}
							return (<span>{value}</span>)}}
						></TableRowColumn>
						</TableRow>
				</TableBody>
				<TableFooter></TableFooter>
				</Table>					
			</Section>
			   <Drawer
				    open={State.openAgreementList}
				    width={750}
				    onClose={this.detailOpenAgreement}
				    openSecondary={true}
				    containerStyle={{top:60,paddingBottom:48,zIndex:8}}
			    >
                    <AgreementList />

		        </Drawer>
		        <Drawer
				    open={State.openEdit}
				    width={750}
				    onClose={this.detailOpenEdit}
				    openSecondary={true}
				    containerStyle={{top:60,paddingBottom:48,zIndex:8}}
			    >
                    <Edit />

		        </Drawer>


			


		</div>
		);
	}
}
export default AgreementTrim;
