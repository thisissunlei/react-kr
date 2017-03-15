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
	Message,
	Notify,
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import { Drawer} from 'material-ui';
import State from './State';
import {
	observer
} from 'mobx-react';
import './index.less';
import AdvancedQueryForm from './AdvancedQueryForm';
import NewCreateForm from './NewCreateForm';
@observer
export default class List extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);
		this.openEditDetailDialog = this.openEditDetailDialog.bind(this);
		this.openAdvancedQueryDialog = this.openAdvancedQueryDialog.bind(this);
		this.onLoaded = this.onLoaded.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.params = this.context.router.params;
	}
	openNewCreateDialog=()=> {
		State.openNewCreate = !State.openNewCreate;
	}
	// 编辑详情的Dialog
	openEditDetailDialog(){
		State.openEditDetail = !State.openEditDetail;
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
	// 导出Excle表格
	onExport=(values)=>{
		var url = '';
		let params = State.searchParams;
		let ids = [];
		if (values.length != 0) {
			values.map((item, value) => {
				ids.push(item.id)
			});
			ids = String(ids);
			url = `/api/krspace-finance-web/member/member-list-excel?ids=${ids}`

		}else{
			url = `/api/krspace-finance-web/member/member-list-excel?cityId={cityId}&type={type}&title={title}&startTime={startTime}&endTime={endTime}`
			if (Object.keys(params).length) {
				for (let item in params) {
					if (params.hasOwnProperty(item)) {
						url = url.replace('{' + item + '}', params[item]);
						delete params[item];
					}
				}
			}
		}
		console.log('===>onExport',values,State.searchParams);
		console.log('url',url);
		
		// window.location.href = url;
		
	}
    //提交编辑
	onEditSubmit=(values)=>{
		console.log('提交编辑',values);
	}
	// 提交新建
	onNewCreateSubmit=(values)=>{
		console.log('新建活动',values);
	}
	// 查询
	onSearchSubmit=(value)=>{
		console.log('===>',value);
		value.companyId = 0;
		State.searchParams = value;
		console.log(State.searchParams);
	}
	// 打开高级查询
	openAdvancedQueryDialog(){
		State.openAdvancedQuery = !State.openAdvancedQuery;
	}
	// 高级查询
	onAdvanceSearchSubmit=(values)=>{
		values.companyId = 0;
		console.log('高级查询',values);
		State.searchParams = values;
	}
	downPublish=(itemData)=>{
		console.log('downPublish');
	}
	publish=(itemData)=>{
		console.log('publish');
	}
	resetUpPosition=(itemData)=>{
		console.log('resetUpPosition');
	}
	upPosition=(itemData)=>{
		console.log('upPosition');
	}
	render() {
		if (!State.list.totalCount) {
			State.list.totalCount = 0;
		}
		let options = [{
			label: '公司名称',
			value: 'COMP_NAME'
		}, {
			label: '手机号',
			value: 'PHONE'
		}, {
			label: '微信',
			value: 'WECHAT'
		}, {
			label: '姓名',
			value: 'NAME'
		}];
		return (
			    <div style={{minHeight:'910',backgroundColor:"#fff"}}>
								<Title value="活动列表 "/>
								<Section title={`活动列表`} description="" >
									<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
										<Button label="新建活动"  onTouchTap={this.openNewCreateDialog} />
										{/*高级查询*/}
										<Button   type='search'  searchClick={this.openAdvancedQueryDialog} searchStyle={{marginLeft:'30',marginTop:'10',display:'inline-block',float:'right'}}/>
										<SearchForms onSubmit={this.onSearchSubmit} style={{marginTop:5,zIndex:10000}} />
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
											ajaxParams={State.searchParams}
										>
										<TableHeader>
											<TableHeaderColumn>活动标题</TableHeaderColumn>
											<TableHeaderColumn>活动类型</TableHeaderColumn>
											<TableHeaderColumn>城市地区</TableHeaderColumn>
											<TableHeaderColumn>活动时间</TableHeaderColumn>
											<TableHeaderColumn>创建人</TableHeaderColumn>
											<TableHeaderColumn>已报名数</TableHeaderColumn>
											<TableHeaderColumn>状态</TableHeaderColumn>
											// 由于页面效果不好暂时不添加会员等级这一项
											<TableHeaderColumn>排序</TableHeaderColumn>
											<TableHeaderColumn>操作</TableHeaderColumn>
									</TableHeader>
									<TableBody style={{position:'inherit'}}>
											<TableRow displayCheckbox={true}>
											<TableRowColumn name="phone"
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											></TableRowColumn>
											<TableRowColumn name="name"
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											 ></TableRowColumn>
											<TableRowColumn name="jobName"
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											></TableRowColumn>
											<TableRowColumn name="registerTime" type="date" format="yyyy-mm-dd"></TableRowColumn>
											<TableRowColumn name="cityName"
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											></TableRowColumn>
											<TableRowColumn name="companyName" style={{overflow:"hidden"}}
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											></TableRowColumn>
											<TableRowColumn name="registerName"
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}></TableRowColumn>
											<TableRowColumn name="registerTime" type="date" format="yyyy-mm-dd"></TableRowColumn>
											<TableRowColumn name="registerName"
											component={(value,oldValue,itemData)=>{
												//未发布
												if(itemData.registerName){
													return (
															<span>
															<Button label="查看"  type="operation" onTouchTap={this.openNewCreateDialog.bind(this,itemData)}/>
															<Button label="编辑"  type="operation" onTouchTap={this.openNewCreateDialog.bind(this,itemData)}/>
															<Button label="发布"  type="operation" onTouchTap={this.publish.bind(this,itemData)}/>
															</span>
														)
												}else{
													//已发布 && 已置顶
													if(itemData.isLeader){
														return (
															<span>
															<Button label="查看"  type="operation" onTouchTap={this.openNewCreateDialog.bind(this,itemData)}/>
															<Button label="编辑"  type="operation" onTouchTap={this.openNewCreateDialog.bind(this,itemData)}/>
															<Button label="下线"  type="operation" onTouchTap={this.downPublish.bind(this,itemData)}/>
															<Button label="取消置顶"  type="operation" onTouchTap={this.resetUpPosition.bind(this,itemData)}/>
															</span>
														)
													}else{
														return (
															<span>
															<Button label="查看"  type="operation" onTouchTap={this.openNewCreateDialog.bind(this,itemData)}/>
															<Button label="编辑"  type="operation" onTouchTap={this.openNewCreateDialog.bind(this,itemData)}/>
															<Button label="下线"  type="operation" onTouchTap={this.downPublish.bind(this,itemData)}/>
															<Button label="置顶"  type="operation" onTouchTap={this.upPosition.bind(this,itemData)}/>
															</span>
														)
													}
												}
											}}></TableRowColumn>
										 </TableRow>
									</TableBody>
									<TableFooter></TableFooter>
									</Table>
								</Section>
								{/*新建活动*/}
							  <Drawer open={State.openNewCreate} width={400} openSecondary={true} containerStyle={{marginTop:60,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:10}}>
								<NewCreateForm onSubmit={this.onNewCreateSubmit} onCancel={this.openNewCreateDialog} />
							  </Drawer>
							  {/*查看活动*/}
							  <Drawer open={State.openNewCreate} width={400} openSecondary={true} containerStyle={{marginTop:60,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:10}}>
								<NewCreateForm onSubmit={this.onNewCreateSubmit} onCancel={this.openNewCreateDialog} />
							  </Drawer>
								{/*编辑活动*/}
							  <Drawer open={State.openEditDetail} width={400} openSecondary={true} containerStyle={{marginTop:60,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:10}}>
								<NewCreateForm onSubmit={this.onNewCreateSubmit} onCancel={this.openEditDetailDialog} />
							  </Drawer>
								<Dialog
									title="高级查询"
									modal={true}
									open={State.openAdvancedQuery}
									onClose={this.openAdvancedQueryDialog}
									contentStyle={{width:687}}
								>
									<AdvancedQueryForm onCancel={this.openAdvancedQueryDialog} onSubmit={this.onAdvanceSearchSubmit}/>
							  </Dialog>
				</div>
		);

	}

}
