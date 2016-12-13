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
import './index.less';

export default class List extends Component {

	constructor(props, context) {
		super(props, context);

		this.openNewCreateDialog = this.openNewCreateDialog.bind(this);
		this.onLoaded = this.onLoaded.bind(this);
		this.onOperation = this.onOperation.bind(this);
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

	}
	onChangeSearchPersonel(personel) {
		Store.dispatch(change('joinCreateForm', 'lessorContacttel', personel.mobile));
		Store.dispatch(change('joinCreateForm', 'lessorContactName', personel.lastname));
	}
	// 社区模糊查询
	onChangeSearchCommunity(community) {
		Store.dispatch(change('joinCreateForm', 'communityName', community.communityName));
	}
	// 公司模糊查询
	onChangeSearchCompany(company) {
		Store.dispatch(change('joinCreateForm', 'companyName', company.companyName));
	}
	onNewCreateCancel() {
		this.openNewCreateDialog();
	}
	onLoaded(response) {

		let list = response;

		this.setState({
			list
		})
	}
	//操作相关
	onOperation(type, itemDetail) {
		this.setState({
			itemDetail
		});
	// 点击详情跳转到详情页面
		if (type == 'view') {
			let orderId = itemDetail.id
			window.open(`./#/member/MemberManage/${orderId}/detail`, orderId);
		} else if (type == 'edit') {
			// this.openEditDetailDialog();
		}
	}

	render() {

		let {
			list
		} = this.state;

		if (!list.totalCount) {
			list.totalCount = 0;
		}

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
								<Section title={`全部会员 (${list.totalCount})`} description="" >
									<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
										<Button label="新建会员"  onTouchTap={this.openNewCreateDialog} />
										<Button   type='search' searchStyle={{marginLeft:'30',marginTop:'10',display:'inline-block',float:'right'}}/>
										<SearchForms onSubmit={this.onSubmit} searchFilter={options} style={{marginTop:5,zIndex:10000}} />
									</form>
									<Table
										className="member-list-table"
											style={{marginTop:10,position:'inherit'}}
											onLoaded={this.onLoaded}
											ajax={true}
											onProcessData={(state)=>{
												return state;
												}}
											onOperation={this.onOperation}
											exportSwitch={true}
											ajaxFieldListName='items'
											ajaxUrlName='membersList'
											ajaxParams={this.state.searchParams}
										>
										<TableHeader>
											{/*<TableHeaderColumn>ID</TableHeaderColumn>*/}
											<TableHeaderColumn>联系电话</TableHeaderColumn>
											<TableHeaderColumn>姓名</TableHeaderColumn>
											<TableHeaderColumn>微信</TableHeaderColumn>
											<TableHeaderColumn>邮箱</TableHeaderColumn>
											<TableHeaderColumn>职位</TableHeaderColumn>
											<TableHeaderColumn>工作地点</TableHeaderColumn>
											<TableHeaderColumn>公司</TableHeaderColumn>
											// 由于页面效果不好暂时不添加会员等级这一项
											{/*<TableHeaderColumn>会员等级</TableHeaderColumn>*/}
											<TableHeaderColumn>注册来源</TableHeaderColumn>
											<TableHeaderColumn>注册日期</TableHeaderColumn>
											<TableHeaderColumn>操作</TableHeaderColumn>
									</TableHeader>

									<TableBody style={{position:'inherit'}}>
											<TableRow displayCheckbox={true}>
											{/*<TableRowColumn name="id" ></TableRowColumn>*/}
											<TableRowColumn name="name" ></TableRowColumn>
											<TableRowColumn name="phone" ></TableRowColumn>
											<TableRowColumn name="wechatNick"></TableRowColumn>
											<TableRowColumn name="email"></TableRowColumn>
											<TableRowColumn name="jobName"></TableRowColumn>
											<TableRowColumn name="cityName"></TableRowColumn>
											<TableRowColumn name="companyName"></TableRowColumn>
											<TableRowColumn name="sourceName"></TableRowColumn>
											<TableRowColumn name="registerTime"></TableRowColumn>
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
									contentStyle={{width:687}}
								>
										<NewCreateForm onSubmit={this.onNewCreateSubmit} onCancel={this.openNewCreateDialog} />
							  </Dialog>
				</div>
		);

	}

}
