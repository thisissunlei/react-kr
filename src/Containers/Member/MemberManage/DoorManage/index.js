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
	Grid,
	Row,
	ListGroup,
	ListGroupItem
} from 'kr-ui';
import {Http} from 'kr/Utils';

import {Actions,Store} from 'kr/Redux';
import NewCreateForm from './NewCreateForm';
import ImpowerEditMemberForm from './ImpowerEditMemberForm';
import ImpowerList from './ImpowerList';
import SearchDetailForm from './SearchDetailForm';

import './index.less';
export default class List extends React.Component {
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
			openImpoverList : false,
			itemDetail: {},
			item: {},
			list: {},
			content:'',
			filter:'COMP_NAME',
			realPage:1,
			searchParams: {
				page:"1",
				pageSize:"20",
				customerName: '',
				communityId:''
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
		Http.request('newCreateOrEditImpower',{},values).then(function(response){
			Message.success("操作成功");
			_this.setState({
				openEditDetail : !_this.state.openEditDetail,
				searchParams:{
					date: new Date(),
					communityId :'',
					customerName: '',
					page : _this.state.realPage

				}
			})
		}).catch(function(err){

			Message.error(err.message);
		});
	}
	// 提交新建
	onNewCreateSubmit=(values)=>{

		let _this = this;
		Http.request('newCreateOrEditImpower',{},values).then(function(response){
			Message.success("操作成功");
			_this.setState({
				openNewCreate : !_this.state.openNewCreate,
				searchParams:{
					date: new Date(),
					communityId : _this.state.searchParams.communityId,
					customerName : _this.state.searchParams.customerName,

				}
			})
		}).catch(function(err){

			Message.error(err.message);
		});
	}

	// 打开确认删除
	confirmDelete=()=>{
		let _this = this;
		let {itemDetail} = this.state;
		Http.request('doorCustomerDelete',{id:itemDetail.id}).then(function(response){
			Message.success("操作成功");
			_this.setState({
				openDeleteDialog : !_this.state.openDeleteDialog,
				searchParams:{
					date: new Date(),
					communityId : '',
					customerName :'',
					page: _this.state.realPage

				}
			})
		}).catch(function(err){
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	// 选择社区
	onChangeCommunity=(item)=>{
		let _this = this;
		if(!item){
			_this.setState({
				searchParams:{
					communityId : '',
					customerName : _this.state.searchParams.customerName,
				}
			})
		}else{
			_this.setState({
			searchParams:{
				communityId : item.id,
				customerName : _this.state.searchParams.customerName,
			}
		})
		}

	}
	// 查询
	onSearchSubmit=(value)=>{
		let _this = this;
		_this.setState({
			searchParams:{
				customerName : value.content,
				communityId : _this.state.searchParams.communityId
			}
		})
	}


//刷新页面
	fresh=()=>{
		_this.setState({
			searchParams:{
				date : new Date(),
				page:"1",
				pageSize:"20",
				customerName: '',
				communityId:''
			}
		})
	}

	onPageChange=(page)=>{
    
	    this.setState({
	      realPage:page
	    })

	}

	render() {
		let {
			list,itemDetail,seleced
		} = this.state;
		return (
			    <div style={{minHeight:'910',backgroundColor:"#fff"}}>
								<Title value="门禁授权"/>
								<Section title={`入驻团队门禁授权`} description="" >
										<Button label="新增授权"  onTouchTap={this.openNewCreateDialog} />

										<SearchDetailForm onChange={this.onChangeCommunity}/>
										<SearchForms placeholder='请输入客户名称' inputName='mr' onSubmit={this.onSearchSubmit} style={{float:"right"}}/>

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
											ajaxUrlName='impowerList'
											ajaxParams={this.state.searchParams}
											displayCheckbox={false}
											onPageChange={this.onPageChange}
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
											<TableRowColumn name="customerName"
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




											<TableRowColumn name="beginDate" type="date" format="yyyy-mm-dd"></TableRowColumn>

											<TableRowColumn name="endDate" type="date" format="yyyy-mm-dd"></TableRowColumn>
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
									<ImpowerList onSubmit={this.onEditSubmit} params={this.params} onCancel={this.openImpoverList} detail={itemDetail} fresh={this.fresh}/>
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
