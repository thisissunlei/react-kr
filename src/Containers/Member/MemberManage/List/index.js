import React, {
	Component
} from 'react';


import {
	Title,
	DatePicker,
	Form,
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	DotTitle,
	BraceWidth,
	SelfAdaption,
	LineText,
	SplitLine,
	SearchForms,
	Dialog,
} from 'kr-ui';

import NewCreateForm from './NewCreateForm';


export default class List extends Component {

	constructor(props, context) {
		super(props, context);

		this.openNewCreateDialog = this.openNewCreateDialog.bind(this);

		this.state = {
			openNewCreate: false,
			openView: false,
			openEditDetail: false,
			itemDetail: {},
			item: {},
			list: {},
			searchParams: {
				page: 1,
				pageSize: 15
			}

		}
	}
	openNewCreateDialog() {
		this.setState({
			openNewCreate: !this.state.openNewCreate,
			searchParams:{
				pageSize:'15'
			}
		});
		console.log(!this.state.openNewCreate);
	}

	onNewCreateCancel() {
		this.openNewCreateDialog();
	}

	render() {

		let title = 3000;
		let options = [{
			label: '公司名称',
			value: 'BILL'
		}, {
			label: '手机号',
			value: 'PHONE'
		}, {
			label: '微信',
			value: 'PHONE'
		}, {
			label: '姓名',
			value: 'PHONE'
		}];
		return (

			    <div >
								<Title value="全部会员 "/>

								<Section title={`全部会员 (${title})`} description="" >
									<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45,zIndex:1000}}>
										<Button label="新建会员"  onTouchTap={this.openNewCreateDialog} />
										<Button searchClick={this.openNewCreateDialog}  type='search' searchStyle={{marginLeft:'30',marginTop:'10',display:'inline-block',float:'right'}}/>
										<SearchForms onSubmit={this.onSubmit} searchFilter={options} style={{marginTop:5}} />
									</form>
									<Table
											style={{marginTop:10,zIndex:0}}
											ajax={true}
											onProcessData={(state)=>{
												return state;
												}}
											ajaxFieldListName="memberPage"
											ajaxUrlName='membersList'
											ajaxParams={this.state.searchParams}
										>
										<TableHeader>
											<TableHeaderColumn>ID</TableHeaderColumn>
											<TableHeaderColumn>联系电话</TableHeaderColumn>
											<TableHeaderColumn>姓名</TableHeaderColumn>
											<TableHeaderColumn>微信</TableHeaderColumn>
											<TableHeaderColumn>邮箱</TableHeaderColumn>
											<TableHeaderColumn>职位</TableHeaderColumn>
											<TableHeaderColumn>工作地点</TableHeaderColumn>
											<TableHeaderColumn>公司</TableHeaderColumn>
											<TableHeaderColumn>会员等级</TableHeaderColumn>
											<TableHeaderColumn>注册来源</TableHeaderColumn>
											<TableHeaderColumn>注册日期</TableHeaderColumn>
											<TableHeaderColumn>操作</TableHeaderColumn>
									</TableHeader>

									<TableBody>
											<TableRow displayCheckbox={true}>
											<TableRowColumn name="id" ></TableRowColumn>
											<TableRowColumn name="name" ></TableRowColumn>
											<TableRowColumn name="wechatNick"></TableRowColumn>
											<TableRowColumn name="email"></TableRowColumn>
											<TableRowColumn name="jobBame"></TableRowColumn>
											<TableRowColumn name="cityName"></TableRowColumn>
											<TableRowColumn name="companyName"></TableRowColumn>
											<TableRowColumn name="companyName"></TableRowColumn>
											<TableRowColumn name="sourceName"></TableRowColumn>
											<TableRowColumn name="registerTime" type="date"></TableRowColumn>
											<TableRowColumn type="operation">
													<Button label="详情"  type="operation" operation="view"/>
													<Button label="编辑"  type="operation" operation="edit"/>
											 </TableRowColumn>
										 </TableRow>
									</TableBody>

									<TableFooter></TableFooter>

									</Table>
								</Section>

								<Dialog
									title="新建会员"
									modal={true}
									open={this.state.openNewCreate}
									onClose={this.openNewCreateDialog}
									bodyStyle={{paddingTop:34}}
									contentStyle={{width:687}}
								>
								
							  </Dialog>



				</div>
		);

	}

}
