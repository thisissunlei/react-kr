import React from 'react';
import {
	Title,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	SearchForms,
	Dialog,
	Tooltip,
	Drawer,
	CheckPermission
} from 'kr-ui';
import State from './State';
import {DateFormat} from 'kr/Utils';
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
export default class List extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.openAdvancedQueryDialog = this.openAdvancedQueryDialog.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		// this.params = this.context.router.params;
	}
	openNewCreateDialog=()=> {
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
	}
	// 查询
	onSearchSubmit=(value)=>{
		let values ={};
		values.name = value.content;
		values.page = 1;
		State.searchParams = Object.assign({},State.searchParams,values);
	}
	// 打开高级查询
	openAdvancedQueryDialog(){
		State.openAdvancedQuery = !State.openAdvancedQuery;
	}
	// 高级查询
	onAdvanceSearchSubmit=(values)=>{
		State.searchParams = {
			beginDate:values.beginDate ||'',
			cityId: values.cityId ||'',
			countyId: values.countyId ||'',
			endDate: values.endDate ||'',
			name: values.name ||'',
			page: 1,
			pageSize: 15,
			type: values.type || '',
			time:''
		}
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
	onPageChange=(page)=>{
		var searchParams = Object.assign({},State.searchParams);
		searchParams.page = page;
		State.searchParams = searchParams;
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
	closeAll=()=>{
		console.log('dasdasdasd')
		State.openDetail=false;
		State.openNewCreate=false;
		State.openEditDetail=false;
	}

	render() {
		let className = '';
		if(State.openCloseNavs || State.openNewCreate || State.openDetail || State.openEditDetail){
			className='close-navs'
		}else{
			className = 'none';
		}
		return (
			    <div style={{minHeight:'910',backgroundColor:"#fff"}} className="m-activity-list-manage">
					<div className={className} onClick={this.closeNavs}></div>

								<Title value="活动列表 "/>
								<Section title={`活动列表`} description="" >
									<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
											<Button label="新建活动" operateCode="main_activity_add" onTouchTap={this.openNewCreateDialog} />
										{/*高级查询*/}
										<Button   type='search'  searchClick={this.openAdvancedQueryDialog} searchStyle={{marginLeft:'30',marginTop:'10',display:'inline-block',float:'right'}}/>
										<SearchForms onSubmit={this.onSearchSubmit} style={{marginTop:5,zIndex:10000}} className="activity-serach"/>
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
											onPageChange={this.onPageChange}
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
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="inline-block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:118,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }} ></TableRowColumn>
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
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="inline-block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:118,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{itemData.cityName}{itemData.countyName}</span>
														 	<Tooltip offsetTop={5} place='top'>{itemData.cityName}{itemData.countyName}</Tooltip></div>)
													 }}
											></TableRowColumn>

											<TableRowColumn name="beginDate" style={{width:250}} type="date"
											component={(value,oldValue,itemData)=>{
												return (<span>{DateFormat(itemData.beginDate,'yyyy.mm.dd HH:MM')}至{DateFormat(itemData.endDate,'yyyy.mm.dd HH:MM')}</span>)}}
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
																<Button label="编辑" operateCode="main_activity_add" type="operation" onTouchTap={this.openEditDialog.bind(this,itemData)}/>
																<Button label="发布"  operateCode="main_acitvity_down"  type="operation" onTouchTap={this.publish.bind(this,itemData)}/>
															</span>
														)
												}else{
													//已发布 && 已置顶
													if(itemData.top){
														return (
															<span>
															<Button label="查看"  type="operation" onTouchTap={this.openItemDetail.bind(this,itemData)}/>
																<Button label="下线" operateCode="main_acitvity_down" type="operation" onTouchTap={this.downPublish.bind(this,itemData)}/>
																<Button label="取消置顶" operateCode="main_acitvity_top"  type="operation" onTouchTap={this.resetUpPosition.bind(this,itemData)}/>
															</span>
														)
													}else{
														return (
															<span>
															<Button label="查看"  type="operation" onTouchTap={this.openItemDetail.bind(this,itemData)}/>
																<Button label="下线" operateCode="main_acitvity_down"  type="operation" onTouchTap={this.downPublish.bind(this,itemData)}/>
															<Button label="置顶" operateCode="main_acitvity_top" type="operation" onTouchTap={this.upPosition.bind(this,itemData)}/>
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
							  <Drawer open={State.openNewCreate}
							   width={700} openSecondary={true} 
							   onClose={this.closeAll}
							   containerStyle={{marginTop:60,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:9}}
							   >

								<NewCreateForm onCancel={this.openNewCreateDialog} open={State.openNewCreate} />
							  </Drawer>
							  {/*查看活动*/}
							  <Drawer open={State.openDetail} width={700} 
							  	openSecondary={true} 
							  	 onClose={this.closeAll}
							  	containerStyle={{marginTop:60,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:9}}>
								<ItemDetail onSubmit={this.onNewCreateSubmit} onCancel={this.closeItemDetail} detail={State.itemDetail}/>
							  </Drawer>
								{/*编辑活动*/}
							  <Drawer open={State.openEditDetail} 
							  width={700} openSecondary={true} 
							   onClose={this.closeAll}
							  containerStyle={{marginTop:60,boxShadow:'0 1px 1px rgba(0, 0, 0, 0.16), 0 1px 1px rgba(0, 0, 0, 0.23)',zIndex:9}}>
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
