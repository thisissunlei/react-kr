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
	Grid,
	Row,
	ListGroup,
	ListGroupItem
} from 'kr-ui';
import {connect} from 'kr/Redux';
import { reduxForm } from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import NewCreateForm from './NewCreateForm';
import ImpowerEditMemberForm from './ImpowerEditMemberForm';
import AdvancedQueryForm from './AdvancedQueryForm';
import ImpowerList from './ImpowerList';

import './index.less';
export default class List extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);
		this.params = this.context.router.params;
		this.state = {
			openNewCreate: false,
			openView: false,
			openEditDetail: false,
			openAdvancedQuery :false,
			openDeleteDialog :false,
			openImpoverList : true,
			itemDetail: {},
			item: {},
			list: {},
			content:'',
			filter:'COMP_NAME',
			searchParams: {
				page: 1,
				pageSize: 15,
				startTime:'',
				endTime:'',
				registerSourceId:'',
				jobId:'',
				companyId:0,
				cityId:'',
				type:'COMP_NAME',
				value:'',
			}
		}
	}
	// 打开新建授权Dialog
	openNewCreateDialog=()=> {
		this.setState({
			openNewCreate: !this.state.openNewCreate,
		});
	}
	// 编辑详情的Dialog
	openEditDetailDialog=()=>{
		this.setState({
			openEditDetail: !this.state.openEditDetail,
		});
	}
	
	// 关闭新建
	onNewCreateCancel() {
		this.openNewCreateDialog();
	}
	onLoaded=(response)=>{
		let list = response;
		this.setState({
			list
		})
	}
	//操作相关
	onOperation=(type, itemDetail)=>{
		this.setState({
			itemDetail
		});
		// console.log("itemDetail",itemDetail);
		if (type == 'impower') {
			this.openImpoverList();
		} else if (type == 'edit') {
			this.openEditDetailDialog();
		}else if(type == 'delete'){
			this.openDeleteDialog();
		}
	}
	// 是否打开删除窗口
	openDeleteDialog=()=>{
		this.setState({
			openDeleteDialog:!this.state.openDeleteDialog
		})
	}
	// 打开ImpowerList
	openImpoverList=()=>{
		this.setState({
			openImpoverList : !this.state.openImpoverList
		})
	}
    //提交编辑
	onEditSubmit=(values)=>{
		var _this = this;
		Store.dispatch(Actions.callAPI('membersChange',{},values)).then(function(response){
			_this.openEditDetailDialog();
			Message.success("操作成功");
			_this.setState({
				
				searchParams:{
					page:"1",
					pageSize:"15",
					value:'',
					type:'COMP_NAME',
					
					companyId:"0",
				}
			})
		}).catch(function(err){
			// Notify.show([{
			// 	message: err.message,
			// 	type: 'danger',
			// }]);
		});
	}
	// 提交新建
	onNewCreateSubmit=(values)=>{
		// console.log("value",values);
		let params = {
			email:values.email
		}
		let cardSearchParams ={
			foreignCode:values.cardId
		}
		let _this = this;
		Store.dispatch(Actions.callAPI('membersChange',{},values)).then(function(response){
							_this.openNewCreateDialog();
							Message.success("操作成功");
							_this.setState({
								
								searchParams:{
									page:"1",
									pageSize:"15",
									type:'COMP_NAME',
									value:"",
									
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
	onSearchSubmit=(value)=>{
		console.log("value",value);
		let _this = this;
		let searchParam = {
			value :value.content,
			type :value.filter
		}
		_this.setState({
			content :value.content,
			filter :value.filter,
			
			searchParams :{
				type:value.filter,
				value:value.content,
				page :1,
				pageSize:15,
				companyId:0,
			}
		})
	}
	
	// 选择社区
	onChangeSearchCommunity=()=>{
		console.log("kkakakak");
	}
	// 高级查询
	onAdvanceSearchSubmit=(values)=>{
		// console.log('onAdvanceSearchSubmit是否传到列表页',values);
		let _this = this;
		_this.setState({
			openAdvancedQuery: !this.state.openAdvancedQuery,
			searchParams :{
				registerSourceId:values.registerSourceId || '',
				value :values.value,
				type :values.type,
				cityId :values.city || '',
				endTime :values.endTime || '',
				startTime :values.startTime || '',
				jobId :values.jobId || '',
				page:1,
				pageSize:15,
				companyId:0,
			}
		})
	}
	// 打开确认删除
	confirmDelete=()=>{
		this.setState({
			openDeleteDialog: !this.state.openDeleteDialog
		});
		let {itemDetail} = this.state;
		console.log("itemDetail调用删除接口",itemDetail);

	}
	render() {
		let {
			list,itemDetail,seleced
		} = this.state;
		return (
			    <div style={{minHeight:'910',backgroundColor:"#fff"}}>
								<Title value="门禁授权"/>
								<Section title={`入驻团队门禁授权`} description="" >
									{/*<form name="searchForm"  className="searchForm searchList" style={{marginBottom:10,height:45}}>
										<Button label="新增授权"  onTouchTap={this.openNewCreateDialog} />
										<KrField grid={1/2} name="communityId" component="searchCommunity" label="社区" onChange={this.onChangeSearchCommunity}   style={{width:'252px',marginRight:'30'}}/>
										
										
										<SearchForms placeholder='请输入客户名称' inputName='mr' onSubmit={this.onSearchSubmit}/>

									</form>*/}
									<Table
										className="member-list-table"
											style={{marginTop:10,position:'inherit'}}
											onLoaded={this.onLoaded}
											ajax={true}
											onProcessData={(state)=>{
												return state;
												}}
											onOperation={this.onOperation}
											exportSwitch={false}
											ajaxFieldListName='items'
											ajaxUrlName='membersList'
											ajaxParams={this.state.searchParams}
										>
										<TableHeader>
											<TableHeaderColumn>客户名称</TableHeaderColumn>
											<TableHeaderColumn>社区</TableHeaderColumn>
											<TableHeaderColumn>授权开始时间</TableHeaderColumn>
											<TableHeaderColumn>授权结束时间</TableHeaderColumn>
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
											<TableRowColumn name="wechatNick"
											component={(value,oldValue)=>{
												if(value==""){
													value="-"
												}
												return (<span>{value}</span>)}}
											></TableRowColumn>
											
											
											
											<TableRowColumn name="registerTime" type="date" format="yyyy-mm-dd"></TableRowColumn>
											<TableRowColumn type="operation">
													<Button label="编辑"  type="operation" operation="edit"/>
													<Button label="授权"  type="operation" operation="impower"/>
													<Button label="删除"  type="operation" operation="delete" onClick={this.confirmDelete.bind(this.itemDetail)}/>
											 </TableRowColumn>
										 </TableRow>
									</TableBody>
									<TableFooter></TableFooter>
									</Table>
								</Section>


								<Dialog
									title="新建授权"
									modal={true}
									open={this.state.openNewCreate}
									onClose={this.openNewCreateDialog}
									contentStyle={{width:687}}
								>
								<NewCreateForm onSubmit={this.onNewCreateSubmit} onCancel={this.openNewCreateDialog} />
								</Dialog>
								<Dialog
										title="编辑授权"
										modal={true}
										open={this.state.openEditDetail}
										onClose={this.openEditDetailDialog}
										contentStyle={{width:687}}
									>
									<ImpowerEditMemberForm onSubmit={this.onEditSubmit} params={this.params} onCancel={this.openEditDetailDialog} detail={itemDetail}/>
								</Dialog>


								<Dialog
										title="门禁授权"
										modal={true}
										open={this.state.openImpoverList}
										onClose={this.openImpoverList}
										contentStyle={{width:687}}
									>
									<ImpowerList onSubmit={this.onEditSubmit} params={this.params} onCancel={this.openImpoverList} detail={itemDetail}/>
								</Dialog>


								<Dialog
						          title="确认删除"
						          open={this.state.openDeleteDialog}
						          onClose={this.openDeleteDialog}
						          contentStyle={{width:443,height:236}}
						        >
						          <div style={{marginTop:45}}>
						            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>确定要删除吗？</p>
						            <Grid style={{marginTop:60,marginBottom:'4px'}}>
						                  <Row>
						                    <ListGroup>
						                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
						                        <Button  label="确定" type="submit" onClick={this.confirmDelete} />
						                      </ListGroupItem>
						                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
						                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.openDeleteDialog} />
						                      </ListGroupItem>
						                    </ListGroup>          
						                  </Row>
						                </Grid>
						          </div>
						        </Dialog>
							
				</div>
		);

	}

}
const validate = values => {

	const errors = {}
	
	if (!values.companyId) {
		errors.companyId = '请输入客户名称';
	}
	if (!values.communityId) {
		errors.communityId = '请输入社区名称';
	}
	 
	
	return errors
}

