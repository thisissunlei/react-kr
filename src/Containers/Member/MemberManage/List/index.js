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
	Notify,
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import NewCreateForm from './NewCreateForm';
import CreateMemberForm from './EditMember';
import AdvancedQueryForm from './AdvancedQueryForm';
import './index.less';

export default class List extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);

		this.openNewCreateDialog = this.openNewCreateDialog.bind(this);
		this.openEditDetailDialog = this.openEditDetailDialog.bind(this);
		this.openAdvancedQueryDialog = this.openAdvancedQueryDialog.bind(this);
		this.onLoaded = this.onLoaded.bind(this);
		this.onOperation = this.onOperation.bind(this);
		this.onExport = this.onExport.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.params = this.context.router.params;
		this.state = {
			openNewCreate: false,
			openView: false,
			openEditDetail: false,
			openAdvancedQuery :false,
			openA: false,
			itemDetail: {},
			item: {},
			list: {},
			searchParams: {
				page: 1,
				pageSize: 15
			}
		}
	}
	editMember(itemDetail){
		this.setState({
			editMember: !this.state.editMember,
			itemDetail:itemDetail
		});
	}
	editMembers=()=>{
		this.setState({
			editMember: !this.state.editMember,
		});
	}
	openNewCreateDialog() {
		this.setState({
			openNewCreate: !this.state.openNewCreate,
			searchParams:{
				pageSize:'15'
			}
		});
	}
	openEditDetailDialog(){
		this.setState({
			openEditDetail: !this.state.openEditDetail,
			searchParams:{
				pageSize:'15'
			}
		});
	}
	openAdvancedQueryDialog(){
		console.log("1111");
		this.setState({
			openAdvancedQuery: !this.state.openAdvancedQuery,
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
		if (type == 'view') {
			let orderId = itemDetail.id
			window.open(`./#/member/MemberManage/${orderId}/detail`, orderId);
		} else if (type == 'edit') {
			this.openEditDetailDialog();
		}
	}
	// 导出Excle表格
	onExport(values) {
		let ids = [];
		if (values.length != 0) {
			values.map((item, value) => {
				ids.push(item.id)
			});
		}
		var url = `/mockjs/4/member/member-list-excel?ids=${ids}`
		window.location.href = url;
	}
	onNewCreateSubmit=(values)=>{
		var _this = this;
		Store.dispatch(Actions.callAPI('membersChange',values)).then(function(response){
			_this.openEditDetailDialog();
			Notify.show([{
 			 message: '成功',
 			 type: 'success',
 		 	}]);

		}).catch(function(err){
			console.log(err);
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	// 查询
	onSearchSubmit=(value)=>{
		console.log("-----",value);
		let _this = this;
		let searchParam = {
			value :value.content,
			type :value.filter
		}
		Store.dispatch(Actions.callAPI('searchListByFilter',searchParam)).then(function(response){
			console.log(_this.state.searchParams,"_this.state.searchParams");
				console.log(value.content,"value.content");
			_this.setState({
				searchParams:{
					page:1,
					pageSize:15,
					value :value.content,
					type :value.filter
				}
			})

		}).catch(function(err){
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	render() {
		let {
			list,itemDetail,seleced
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
										{/*高级查询*/}
										<Button   type='search'  searchClick={this.openAdvancedQueryDialog}   searchStyle={{marginLeft:'30',marginTop:'10',display:'inline-block',float:'right'}}/>
										<SearchForms onSubmit={this.onSearchSubmit} searchFilter={options} style={{marginTop:5,zIndex:10000}} />
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
											onExport={this.onExport}
											ajaxFieldListName='items'
											ajaxUrlName='membersList'
											ajaxParams={this.state.searchParams}
										>
										<TableHeader>
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
								<Dialog
									title="编辑会员"
									modal={true}
									open={this.state.openEditDetail}
									onClose={this.openEditDetailDialog}
									contentStyle={{width:687}}
								>
										<CreateMemberForm onSubmit={this.onNewCreateSubmit} params={this.params} onCancel={this.openEditDetailDialog} detail={itemDetail}/>
							  </Dialog>
								<Dialog
									title="高级查询"
									modal={true}
									open={this.state.openAdvancedQuery}
									onClose={this.openAdvancedQueryDialog}
									contentStyle={{width:687}}
								>
									<AdvancedQueryForm onSubmit={this.onAdvanceSearchSubmit} params={this.params} onCancel={this.openAdvancedQueryDialog} detail={itemDetail} style={{textAlign:'center'}}/>
							  </Dialog>

				</div>
		);

	}

}
