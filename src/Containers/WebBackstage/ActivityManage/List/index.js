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
import dateFormat from 'dateformat';
import {
	observer
} from 'mobx-react';
import './index.less';
import AdvancedQueryForm from './AdvancedQueryForm';
import NewCreateForm from './NewCreateForm';
import ItemDetail from './ItemDetail';
import EditActivityForm from './EditActivityForm';
import cityDataState from "../../../../Components/KrField/CityComponent/State";


@observer
export default class List extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);
		this.openAdvancedQueryDialog = this.openAdvancedQueryDialog.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.params = this.context.router.params;
	}
	openNewCreateDialog=()=> {
		cityDataState.setCity("请选择");
		State.openNewCreate = !State.openNewCreate;
	}
	// 打开编辑详情的Dialog
	openEditDialog(itemData){
		State.itemData =itemData;
		State.openEditDetail = !State.openEditDetail;
	}
	closeEditDialog(){
		State.openEditDetail = !State.openEditDetail;
	}
	onNewCreateCancel() {
		this.openNewCreateDialog();
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
			url = `/api/krspace-finance-web/activity/activity-export?ids=${ids}`

		}else{
			url = `/api/krspace-finance-web/activity/activity-export?cityId={cityId}&type={type}&countyId={countyId}&beginDate={beginDate}&endDate={endDate}&name={name}`
			if (Object.keys(params).length) {
				for (let item in params) {
					if (params.hasOwnProperty(item)) {
						url = url.replace('{' + item + '}', params[item]);
						delete params[item];
					}
				}
			}
		}
		window.location.href = url;
		console.log('onexport------>',url);
	}
	// 查询
	onSearchSubmit=(value)=>{
		let values ={};
		values.name = value.content;
		State.searchParams = Object.assign({},State.searchParams,values);
	}
	// 打开高级查询
	openAdvancedQueryDialog(){
		State.openAdvancedQuery = !State.openAdvancedQuery;
	}
	// 高级查询
	onAdvanceSearchSubmit=(values)=>{
		State.searchParams = Object.assign({},State.searchParams,values);
		State.openAdvancedQuery = !State.openAdvancedQuery;

	}
	downPublish=(itemData)=>{
		State.itemDownPublish(itemData.id);
	}
	publish=(itemData)=>{
		State.itemUpPublish(itemData.id);
	}
	resetUpPosition=(itemData)=>{
		State.resetUpItemPosition(itemData.id);
	}
	upPosition=(itemData)=>{
		State.upItemPosition(itemData.id);
	}
	closeItemDetail=()=>{
		State.openDetail = false;
	}
	closeNavs=()=>{
		State.openCloseNavs = false;
		State.openDetail = false;
		State.openNewCreate = false;
		State.openDetail = false;
		State.openEditDetail = false;
	}
	openItemDetail=(itemData)=>{
		State.openDetail = true;
		State.itemDetail = itemData;
	}

	render() {
		let className = '';
		if(State.openCloseNavs || State.openNewCreate || State.openDetail || State.openEditDetail){
			className='close-navs'
		}else{
			className = 'none';
		}
		return (
			    <div style={{minHeight:'910',backgroundColor:"#fff"}} className="m-activity-list">
					<div className={className} onClick={this.closeNavs}></div>

								<Title value="活动列表 "/>
								<Section title={`活动列表`} description="" >
									<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
										<Button label="新建活动"  onTouchTap={this.openNewCreateDialog} />
										{/*高级查询*/}
										<Button   type='search'  searchClick={this.openAdvancedQueryDialog} searchStyle={{marginLeft:'30',marginTop:'10',display:'inline-block',float:'right'}}/>
										<SearchForms onSubmit={this.onSearchSubmit} style={{marginTop:5,zIndex:10000}}/>
									</form>
									<Table
										className="member-list-table"
											style={{marginTop:10,position:'inherit'}}
											ajax={true}
											onProcessData={(state)=>{
												return state;
												}}
											onOperation={this.onOperation}
											exportSwitch={true}
											onExport={this.onExport}
											ajaxFieldListName='items'
											ajaxUrlName='activityList'
											ajaxParams={State.searchParams}
										>
										<TableHeader>
											<TableHeaderColumn>活动标题</TableHeaderColumn>
											<TableHeaderColumn>活动类型</TableHeaderColumn>
											<TableHeaderColumn>城市地区</TableHeaderColumn>
											<TableHeaderColumn style={{width:250}}>活动时间</TableHeaderColumn>
											<TableHeaderColumn>创建人</TableHeaderColumn>
											<TableHeaderColumn>已报名数</TableHeaderColumn>
											<TableHeaderColumn>状态</TableHeaderColumn>
											<TableHeaderColumn>排序</TableHeaderColumn>
											<TableHeaderColumn>操作</TableHeaderColumn>
									</TableHeader>
									<TableBody style={{position:'inherit'}}>
											<TableRow displayCheckbox={true}>
											<TableRowColumn name="name"
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											></TableRowColumn>
											<TableRowColumn name="type"
											component={(value,oldValue)=>{
												if(value=='CEO_TIME'){
													value = "CEO Time"
												}
												if(value=='OPEN_KR'){
													value = "公开氪"
												}
												if(value=='COMMUNITY_WELFARE'){
													value = "社区福利"
												}
												if(value=='OPEN_DAY'){
													value = "Open Day"
												}
												return (<span>{value}</span>)}}
											 ></TableRowColumn>
											<TableRowColumn name="cityId"
											component={(value,oldValue,itemData)=>{
												if(value==""){
													value="-"
												}
												return (<span>{itemData.cityName}{itemData.countyName}</span>)}}
											></TableRowColumn>

											<TableRowColumn name="beginDate" style={{width:250}} type="date"
											component={(value,oldValue,itemData)=>{
												return (<span>{dateFormat(itemData.beginDate,'yyyy.mm.dd HH:MM')}至{dateFormat(itemData.endDate,'yyyy.mm.dd HH:MM')}</span>)}}
												></TableRowColumn>
											<TableRowColumn name="createName"
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											></TableRowColumn>
											<TableRowColumn name="enrollNum" style={{overflow:"hidden"}}
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											></TableRowColumn>
											<TableRowColumn name="publishType"
											component={(value,oldValue)=>{
												if(value == 'true'){
													return (<span>已发布</span>)
												}else{
													return (<span style={{color:'red'}}>未发布</span>)
												}

											}}></TableRowColumn>
											<TableRowColumn name="sortShow" ></TableRowColumn>
											<TableRowColumn name="registerName"
											component={(value,oldValue,itemData)=>{
												//未发布
												if(!itemData.publishType){
													return (
															<span>
															<Button label="查看"  type="operation" onTouchTap={this.openItemDetail.bind(this,itemData)}/>
															<Button label="编辑"  type="operation" onTouchTap={this.openEditDialog.bind(this,itemData)}/>
															<Button label="发布"  type="operation" onTouchTap={this.publish.bind(this,itemData)}/>
															</span>
														)
												}else{
													//已发布 && 已置顶
													if(itemData.top){
														return (
															<span>
															<Button label="查看"  type="operation" onTouchTap={this.openItemDetail.bind(this,itemData)}/>
															<Button label="下线"  type="operation" onTouchTap={this.downPublish.bind(this,itemData)}/>
															<Button label="取消置顶"  type="operation" onTouchTap={this.resetUpPosition.bind(this,itemData)}/>
															</span>
														)
													}else{
														return (
															<span>
															<Button label="查看"  type="operation" onTouchTap={this.openItemDetail.bind(this,itemData)}/>
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
							  <Drawer open={State.openNewCreate && !State.openCloseNavs} width={700} openSecondary={true} containerStyle={{marginTop:60,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:9}}>

								<NewCreateForm onCancel={this.openNewCreateDialog} />
							  </Drawer>
							  {/*查看活动*/}
							  <Drawer open={State.openDetail && !State.openCloseNavs} width={700} openSecondary={true} containerStyle={{marginTop:60,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:9}}>
								<ItemDetail onSubmit={this.onNewCreateSubmit} onCancel={this.closeItemDetail} detail={State.itemDetail}/>
							  </Drawer>
								{/*编辑活动*/}
							  <Drawer open={State.openEditDetail && !State.openCloseNavs} width={700} openSecondary={true} containerStyle={{marginTop:60,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:9}}>
								<EditActivityForm  onCancel={this.closeEditDialog} detail={State.itemData}/>
							  </Drawer>
								<Dialog
									title="高级查询"
									modal={true}
									open={State.openAdvancedQuery}
									onClose={this.openAdvancedQueryDialog}
									contentStyle={{width:687}}
								>
									<AdvancedQueryForm onCancel={this.openAdvancedQueryDialog} onSubmit={this.onAdvanceSearchSubmit} title={State.searchParams}/>
							  </Dialog>
				</div>
		);

	}

}
