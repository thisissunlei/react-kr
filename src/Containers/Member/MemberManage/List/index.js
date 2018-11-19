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
	Message,
	Notify,
	CheckPermission,
	ListGroup,
	ListGroupItem,
	Drawer,
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import NewCreateForm from './NewCreateForm';
import MemeberEditMemberForm from './MemeberEditMemberForm';
import AdvancedQueryForm from './AdvancedQueryForm';
import ImportData from './ImportData';
import CodeManage from './CodeManage';
import SearchCommunityForm from './SearchCommunityForm';
import './index.less';
export default class List extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);
		this.openAdvancedQueryDialog = this.openAdvancedQueryDialog.bind(this);
		this.onLoaded = this.onLoaded.bind(this);
		this.onSearchSubmit = this.onSearchSubmit.bind(this);
		this.params = this.context.router.params;
		this.state = {
			openNewCreate: false,
			openView: false,
			openEditDetail: false,
			openAdvancedQuery :false,
			status:false,
			submit:false,
			itemDetail: {},
			item: {},
			list: {},
			content:'',
			filter:'COMP_NAME',
			realPage : 1,
			importdata:false,
			openDelete:false,
			openView:false,
			openLeave:false,
			openBack:false,
			openBindCode:false,
			searchParams: {
				page: 1,
				pageSize: 15,
				startTime:'',
				endTime:'',
				registerSourceId:'',
				job:'',
				companyId:0,
				cityId:'',
				type:'',
				value:'',
				status:false,
				teamId: this.getTeamId()
			},
			oldSearchParams:''
		}
	}

	// 获取teamId
	getTeamId =() => {
		let result = window.location.href.match(/\S*?teamId=(\d+)/);
		let teamId = result && result.length && result[1];
		return teamId || '';
	}
	// 保存一份初始请求state
	componentDidMount(){
		this.setState({oldSearchParams: this.state.searchParams})
	}
	importData=()=>{
		this.setState({
			importdata:!this.state.importdata
		})
	}
	openLeave=(itemDetail)=>{

		this.setState({
			openLeave: !this.state.openLeave,
			itemDetail
		});
	}
	openBack=(itemDetail)=>{
		this.setState({
			openBack: !this.state.openBack,
			itemDetail
		});
	}
	openNewCreateDialog=()=> {
		this.setState({
			openNewCreate: !this.state.openNewCreate,
		});
	}
	openView=(itemDetail)=>{
		window.open(`./#/member/memberManage/list/${itemDetail.uid}`,'_blank');
	}
	// 编辑详情的Dialog
	openEditDetailDialog=(itemDetail)=>{
		this.setState({
			openEditDetail: !this.state.openEditDetail,
			itemDetail
		});
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
	openDelete=(itemDetail)=>{
		this.setState({
			openDelete:!this.state.openDelete,
			itemDetail
		})
	}

	toMemberDoorPermmision=(itemDetail)=>{

		this.setState({
			itemDetail
		},function(){
			window.open(`./#/user/memberdoormanage/${itemDetail.uid}`,'_blank');
		})
	}
	openBindCode=(itemDetail)=>{
		this.setState({
			openBindCode:!this.state.openBindCode,
			itemDetail
		})
	}

	// 导出Excle表格
	onExport=(values)=>{
		let ids = [];
		if (values.length != 0) {
			values.map((item, value) => {
				ids.push(item.id)
			});
		}
		ids = String(ids);
		var url = `/api/krspace-sso-web/member/member-list-excel?ids=${ids}`
		//var url = `http://optest01.krspace.cn/api/krspace-finance-web/member/member-list-excel?ids=${ids}`
		window.location.href = url;
	}
	//下载模板
	onLoadDemo=()=>{
		let url = '/api/krspace-sso-web/member/member-templet-excel';
		window.location.href = url;
	}
    //提交编辑
	onEditSubmit=(values)=>{
		var _this = this;
		Http.request('edit-members',{},values).then(function(response){
			_this.openEditDetailDialog();
			Message.success("操作成功");
			_this.setState({
				status:!_this.state.status,
				searchParams:{
					page: _this.state.realPage,
					pageSize:"15",
					value:_this.state.searchParams.value,
					type:_this.state.searchParams.type,
					status:!_this.state.status,
					companyId:"0",
					startTime:_this.state.searchParams.startTime,
					endTime:_this.state.searchParams.endTime,
					registerSourceId:_this.state.searchParams.registerSourceId,
					job:_this.state.searchParams.job,
					cityId:_this.state.searchParams.cityId,
					teamId: _this.state.searchParams.teamId,
				}
			})
		}).catch(function(err){

			Message.error(err.message);
		});
	}
	// 提交新建
	onNewCreateSubmit=(values)=>{
		let params = {
			email:values.email
		}
		let cardSearchParams ={
			foreignCode:values.foreignCode
		}
		let _this = this;
		Http.request('add-members',{},values).then(function(response){
							_this.openNewCreateDialog();
							Message.success("操作成功");


							_this.setState({
								status:!_this.state.status,
								searchParams:{
									page:"1",
									pageSize:"15",
									type:'COMP_NAME',
									value:"",
									status:!_this.state.status,
									companyId:0,
								}
							})
						}).catch(function(err){
							Notify.show([{
								message: err.message,
								type: 'danger',
							}]);
						});
	}
	// 查询
	onSearchSubmit=(value)=>{ // todo 结合社区的值 
		let _this = this;	
		let searchParam = {
			value :value.content,
			type :value.filter
		}
		_this.setState({
			content :value.content,
			filter :value.filter,
			submit:true,
			realPage : 1,
			searchParams :{
				type:value.filter,
				value:value.content,
				page :1,
				pageSize:15,
				companyId:0,
				cmtId: _this.state.searchParams.cmtId || '',
				teamId: _this.state.searchParams.teamId || '',
			}
		})
	}
	// 打开高级查询
	openAdvancedQueryDialog(){
		this.setState({
			openAdvancedQuery: !this.state.openAdvancedQuery,
		});
	}
	// 高级查询
	onAdvanceSearchSubmit=(values)=>{
		let _this = this;
		_this.setState({
			openAdvancedQuery: !this.state.openAdvancedQuery,
			realPage:1,
			searchParams :{
				registerSourceId:values.registerSourceId || '',
				value :values.value,
				type :values.type,
				cityId :values.city || '',
				endTime :values.endTime || '',
				startTime :values.startTime || '',
				job :values.job || '',
				page :1,
				pageSize:15,
				companyId:0,
			}
		})
	}
	onPageChange=(page)=>{
		this.setState({
			realPage : page
		})
	}
	//离职
	onLeave=()=>{
		var _this=this;
		const {itemDetail}=this.state;
		Http.request('member-leave',{id:itemDetail.uid}).then(function (response) {
			_this.openLeave();
			Message.success('修改成功！');
			_this.setState({
				searchParams:{
					date:new Date()
				}
			})

		}).catch(function (err) {
			Message.error(err.message)
		});

	}
	//恢复
	onBack=()=>{
		var _this=this;
		const {itemDetail}=this.state;
		Http.request('cancle-leave',{id:itemDetail.uid}).then(function (response) {
			_this.openBack();
			Message.success('修改成功！');
			_this.setState({
				searchParams:{
					date:new Date()
				}
			})

		}).catch(function (err) {
			Message.error(err.message)
		});

	}
	//删除
	 onDeleteData=()=>{
		var _this=this;
		const {itemDetail}=this.state;
		Http.request('delete-members',{id:itemDetail.uid}).then(function (response) {
			_this.openDelete();
			Message.success('删除成功！');
			_this.setState({
				searchParams:{
					date:new Date()
				}
			})

		}).catch(function (err) {
			Message.error(err.message)
		});

	}
	importDataPost=()=>{
		this.setState({
			searchParams:{
				date:new Date()
			}
		})
	}

	// 选择社区
	onChangeCommunity=(item)=>{ // tood  结合原有的filter  
		let _this = this;
		if(!item){
			_this.setState({
				realPage:1,
				searchParams:{
					cmtId : '',
					type:_this.state.searchParams.filter || '', 
				  value:_this.state.searchParams.content || '',
					page : 1,
					pageSize:15,
					teamId: _this.state.searchParams.teamId || '',
				}
			})
		}else{
			_this.setState({
			realPage:1,
			searchParams:{
				cmtId : item.id,
				type:_this.state.searchParams.filter || '',
				value:_this.state.searchParams.content || '',
				teamId:this.state.searchParams.teamId || '',
				page :1,
				pageSize:15,
			}
		})
		}

	}

	render() {
		let {
			list,
			itemDetail,
			seleced
		} = this.state;
		if (!list.totalCount) {
			list.totalCount = 0;
		}
		var logFlag = '';
		let options = [{
			label: '公司名称',
			value: 'COMP_NAME'
		}, {
			label: '手机号',
			value: 'PHONE'
		}, {
			label: '姓名',
			value: 'NAME'
		},{
			label: '昵称',
			value: 'NICK'
		}
	];
		return (
			    <div className="member-list-div" style={{minHeight:'910',backgroundColor:"#fff"}} >
								<Title value="会员-氪空间后台管理系统"/>
								<Section title={`全部会员 (${list.totalCount})`} description="" >
									<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45,width:'40%',float: 'left'}}>
									<div className="u-member-btn-list">
										<Button operateCode="mbr_list_add"  label="新建会员"  onTouchTap={this.openNewCreateDialog} />
										<Button  operateCode="mbr_list_import" label="批量导入" type="button" onTouchTap={this.importData} width={80} height={30} />
									</div>	
									</form>
										{/*高级查询*/}
										{/* <Button type='search'  searchClick={this.openAdvancedQueryDialog} searchStyle={{marginLeft:'30',marginTop:'10',display:'inline-block',float:'right'}}/> */}
										<SearchForms onSubmit={this.onSearchSubmit} searchFilter={options} style={{zIndex:10000}} content={this.state.content} filter={this.state.filter}/>
										<SearchCommunityForm   onChange={this.onChangeCommunity}/>
									
									<Table
										className="member-list-table"
											style={{marginTop:10,position:'inherit'}}
											onLoaded={this.onLoaded}
											ajax={true}
											onProcessData={(state)=>{
												return state;
											}}
											//exportSwitch={true}
										 	//onExport={this.onExport}
											ajaxFieldListName='items'
											ajaxUrlName='membersList'
											ajaxParams={this.state.searchParams}
											onPageChange={this.onPageChange}
										>
										<TableHeader>
											<TableHeaderColumn>ID</TableHeaderColumn>
											<TableHeaderColumn>姓名</TableHeaderColumn>
											<TableHeaderColumn>联系电话</TableHeaderColumn>、
											<TableHeaderColumn>邮箱</TableHeaderColumn>
											<TableHeaderColumn>所在社区</TableHeaderColumn>
											<TableHeaderColumn>公司</TableHeaderColumn>
											// 由于页面效果不好暂时不添加会员等级这一项
											{/*<TableHeaderColumn>会员等级</TableHeaderColumn>*/}
											<TableHeaderColumn>注册日期</TableHeaderColumn>
											<TableHeaderColumn>状态</TableHeaderColumn>
											<TableHeaderColumn>操作</TableHeaderColumn>
									</TableHeader>
									<TableBody style={{position:'inherit'}}>
											<TableRow displayCheckbox={true}>
											<TableRowColumn name="uid"></TableRowColumn>
											<TableRowColumn name="name"
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
											<TableRowColumn name="email" style={{overflow:"hidden"}}
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											></TableRowColumn>

											<TableRowColumn name="communityName"
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

											<TableRowColumn name="createTime" type="date" format="yyyy-mm-dd"></TableRowColumn>
											<TableRowColumn name="leaved"
												component={(value)=>{
													let Style,status;
													if(value==1){
														Style="u-txt-red";
														status='已离场';
													}else if(value==0){
														Style="u-txt-green";
														status='已入驻';
													}else if(value==2){
														Style="u-txt-green";
														status='未入驻';
													}
													return (<span className={Style}>{status}</span>)
												}}
											></TableRowColumn>
											<TableRowColumn type="operation" name="leaved" style={{width:230}} component={(value,oldValue,itemDetail) => {
												  if (value == 1) {
														logFlag = false;
													}
													if (value == 0) {
														logFlag = true;
													}
													return (
														<div>
															<Button label="详情" onClick={this.openView.bind(this,itemDetail)} type="operation"/>
															<Button operateCode="mbr_list_edit" onClick={this.openEditDetailDialog.bind(this,itemDetail)} label="编辑"  type="operation"/>
															 {logFlag?<Button operateCode="mbr_list_leave" onClick={this.openLeave.bind(this,itemDetail)} label="离场"  type="operation" operation="leave"/>:''} 
															{/* <Button operateCode="mbr_list_leave" label="恢复" onClick={this.openBack.bind(this,itemDetail)}  type="operation" operation="back"/> */}
															<Button operateCode="mbr_list_bind" onClick={this.openBindCode.bind(this,itemDetail)} label="绑卡"  type="operation" operation="bindcode"/>
															<Button operateCode="mbr_list_delete" onClick={this.openDelete.bind(this,itemDetail)} label="删除"  type="operation" operation="delete"/>
															<Button  onClick={this.toMemberDoorPermmision.bind(this,itemDetail)} label="门禁权限"  type="operation" operation="doorpermmision"/>

														</div>
													)
											}}>




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
										<MemeberEditMemberForm onSubmit={this.onEditSubmit} params={this.params} onCancel={this.openEditDetailDialog} detail={itemDetail}/>
							  </Dialog>
							  <Dialog
								title="删除"
								modal={true}
								contentStyle ={{ width: '444',overflow:'visible'}}
								open={this.state.openDelete}
								onClose={this.openDelete}
								>
								<div className='u-list-delete'>
									<p className='u-delete-title' style={{textAlign:'center',color:'#333'}}>确认要删除该会员吗？</p>
									<div style={{textAlign:'center',marginBottom:10}}>
										<div  className='ui-btn-center'>
											<Button  label="确定" onClick={this.onDeleteData}/></div>
											<Button  label="取消" type="button" cancle={true} onClick={this.openDelete} />
										</div>
									</div>
								</Dialog>
								<Dialog
								title="离职"
								modal={true}
								contentStyle ={{ width: '444',overflow:'visible'}}
								open={this.state.openLeave}
								onClose={this.openLeave}
								>
								<div className='u-list-delete'>
									<p className='u-delete-title' style={{textAlign:'center',color:'#333'}}>确认此会员已离职吗？</p>
									<div style={{textAlign:'center',marginBottom:10}}>
										<div  className='ui-btn-center'>
											<Button  label="确定" onClick={this.onLeave}/></div>
											<Button  label="取消" type="button" cancle={true} onClick={this.openLeave} />
										</div>
									</div>
								</Dialog>
								<Dialog
								title="恢复"
								modal={true}
								contentStyle ={{ width: '444',overflow:'visible'}}
								open={this.state.openBack}
								onClose={this.openBack}
								>
								<div className='u-list-delete'>
									<p className='u-delete-title' style={{textAlign:'center',color:'#333'}}>确认恢复此会员吗？</p>
									<div style={{textAlign:'center',marginBottom:10}}>
										<div  className='ui-btn-center'>
											<Button  label="确定" onClick={this.onBack}/></div>
											<Button  label="取消" type="button" cancle={true} onClick={this.openBack} />
										</div>
									</div>
								</Dialog>
								<Dialog
									title="高级查询"
									modal={true}
									open={this.state.openAdvancedQuery}
									onClose={this.openAdvancedQueryDialog}
									contentStyle={{width:687}}
								>
									<AdvancedQueryForm onSubmit={this.onAdvanceSearchSubmit} params={this.params} onCancel={this.openAdvancedQueryDialog} detail={itemDetail} style={{marginTop:37}} content={this.state.content} filter={this.state.filter} />
							  </Dialog>
							<Dialog
								title="批量导入"
								modal={true}
								open={this.state.importdata}
								onClose={this.importData}
								contentStyle={{width:500}}
							>
							<ImportData onSubmit={this.importDataPost} onCancel={this.importData} onLoadDemo={this.onLoadDemo}/>
							</Dialog>
							<Drawer
							  modal={true}
							  width={750}
							  open={this.state.openBindCode}
							  onClose={this.openBindCode}
							  openSecondary={true}
							  containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
							>
								  <CodeManage
								  		  detail={itemDetail}
										  onCancel={this.openBindCode}

								   />
							</Drawer>
				</div>
		);

	}

}
