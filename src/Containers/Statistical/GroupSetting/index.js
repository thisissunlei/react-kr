import React,{Component} from 'react';
import { connect } from 'react-redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
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
	Grid,
	Row,
	Col,
	Dialog,
	SearchForms,
	ListGroup,
	ListGroupItem,
	Notify,

} from 'kr-ui';
import NewCreateForm from './CreateForm';
import NewEditDetail from './EditForm';
import SearchUpperForm from './SearchUpperFrom'

export default class Initialize  extends Component{

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.openEditDetailDialog=this.openEditDetailDialog.bind(this);
		this.onOperation=this.onOperation.bind(this);
		this.onSearchSubmit=this.onSearchSubmit.bind(this);
		this.openNewCreateDialog=this.openNewCreateDialog.bind(this);
		this.openEditDetailDialog=this.openEditDetailDialog.bind(this);
		this.state = {
			openNewCreate: false,
			openView: false,
			openEditDetail: false,
			openSearchUpperForm:false,
			itemDetail: {},
			accountname: {},
			//已选模板列表
			templateList:[],
			//未选模板列表
			unselectedList:[],
			allData:{},
			searchParams: {
				pageNo: 1,
				pageSize: 15,
				enable:'',
				groupName:''
			},
			id:null,
			noinit:true,

		}
	}

	//新建提交数据和编辑数据的提交
	onCreateSubmit=(params)=> {
		var _this = this;
		params = Object.assign({}, params);
		if(this.state.noinit){
			params.templateIdList="";
		}else{
			params.templateIdList=this.state.templateList;
		}


		Store.dispatch(Actions.callAPI('GroupNewAndEidt', {}, params)).then(function(response) {
			_this.setState({
				openNewCreate: false,
				openEditDetail: false
			});

		}).catch(function(err) {
			console.log(params.templateIdList)
			if(!params.templateIdList){
				err.message="模板列表不能为空";
			}
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});


	}


	//导出事件
	onExport(values) {

		let idList = [];
		if (values.length != 0) {
			values.map((item, value) => {
				idList.push(item.id)
			})
		}
		var url = `/api/krspace-finance-web/finaccount/property/exportDatas?ids=${idList}`
		window.location.href = url;

	}

	//操作相关
	onOperation(type,itemDetail) {
				this.setState({
					id:itemDetail.id
				},function(){
					this.openEditDetailDialog();
				})

	}

	//编辑
	openEditDetailDialog=()=> {
		var _this = this;
		Store.dispatch(Actions.callAPI('MouldGroupDetails',{id:this.state.id})).then(function(data) {

			_this.setState({
					itemDetail:data,
			},function(){
				_this.setState({
					openEditDetail: !_this.state.openEditDetail
				});

			});
		}).catch(function(err) {
			console.log(err)

			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});



	}
	//搜索功能
	onSearchSubmit(searchParams) {
		let obj = {
			groupName:searchParams.content,
			pageSize:15,
			pageNo: 1,
		}


		this.setState({
			searchParams: obj
		});

	}

	onSearchCancel() {

	}
	//高级搜索功能点击确定
	onSearchUpperForm=(searchParams)=>{

		var _this=this;

		let obj = {
			groupName:searchParams.groupName,
			pageSize:15,
			pageNo: 1,
			enable:searchParams.enable
		}
		this.setState({
			searchParams: obj
		});
		this.openSearchUpperFormDialog();


	}
	//新建
	openNewCreateDialog=()=> {
		var _this = this;
		Store.dispatch(Actions.callAPI('GroupNewModule')).then(function(data) {
			_this.setState({
					templateList:data.templateList,
			},function(){
				_this.setState({
					openNewCreate: !_this.state.openNewCreate
				});
			});
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});

	}
//高级搜索
	openSearchUpperFormDialog=()=> {
		var _this=this;
		this.setState({
			openSearchUpperForm: !this.state.openSearchUpperForm
		});
	}
	// 改变模板分组
	changeMudle=(arr)=>{
		var ids=[];

		for(var i=0;i<arr.length;i++){
				ids.push(arr[i].id);
		}
		this.setState({templateList:ids.join(","),noinit:false})
	}
	render(){
		return(
			<div>
					<Section title="分组配置" description="" >
							<Grid style={{marginBottom:22,marginTop:2}}>
								<Row >
									<Col md={4} align="left"> <Button label="新建" type='button' joinEditForm onTouchTap={this.openNewCreateDialog}  /> </Col>
									<Col md={8} align="right" style={{marginTop:0}}>
										<ListGroup>
											<ListGroupItem> <SearchForms onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/></ListGroupItem>
											<ListGroupItem> <Button searchClick={this.openSearchUpperFormDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'5'}}/></ListGroupItem>
										</ListGroup>
									</Col>
								</Row>
							</Grid>

										<Table  style={{marginTop:10}}
												ajax={true}
												onOperation={this.onOperation}
												onProcessData={(state)=>{

													return state;
												}
											}

										onExport={this.onExport}
										ajaxParams={this.state.searchParams}

											ajaxFieldListName="items"
											ajaxUrlName='MouldGroupList' exportSwitch={true}>
											<TableHeader>
												<TableHeaderColumn>分组名称</TableHeaderColumn>
												<TableHeaderColumn>排序</TableHeaderColumn>
												<TableHeaderColumn>分组描述</TableHeaderColumn>
												<TableHeaderColumn>模板数</TableHeaderColumn>
												<TableHeaderColumn>创建人</TableHeaderColumn>
												<TableHeaderColumn>创建时间</TableHeaderColumn>
												<TableHeaderColumn>启用状态</TableHeaderColumn>
												<TableHeaderColumn>操作</TableHeaderColumn>
										</TableHeader>

										<TableBody>
												<TableRow displayCheckbox={true}>
												<TableRowColumn name="groupName" ></TableRowColumn>
												<TableRowColumn name="sort" ></TableRowColumn>
												<TableRowColumn name="groupDesc"></TableRowColumn>
												<TableRowColumn name="templateNum"></TableRowColumn>
												<TableRowColumn name="creator"></TableRowColumn>
												<TableRowColumn name="createTime" type='date' format="yyyy-mm-dd" ></TableRowColumn>
												<TableRowColumn name="enable" options={[{label:'启用',value:'ENABLE'},{label:'禁用',value:'DISABLE'}]} component={(value,item)=>{<span>{value}</span>}}></TableRowColumn>

												<TableRowColumn>
													  <Button label="编辑"  type="operation"  operation="edit" />
												 </TableRowColumn>
											 </TableRow>
										</TableBody>

										<TableFooter></TableFooter>

										</Table>
					</Section>
					<Dialog
						title="编辑"
						modal={true}
						open={this.state.openEditDetail}
						onClose={this.openEditDetailDialog}

					>
						<NewEditDetail changeMudle={this.changeMudle} detail={this.state.itemDetail} onSubmit={this.onCreateSubmit} onCancel={this.openEditDetailDialog} />




		  			</Dialog>

		  			<Dialog
						title="新建分组"
						modal={true}
						// detail={this.state.templateList}
						open={this.state.openNewCreate}
						onClose={this.openNewCreateDialog}


					>
						<NewCreateForm changeMudle={this.changeMudle}  detail={this.state.templateList} onSubmit={this.onCreateSubmit} onCancel={this.openNewCreateDialog} />

				  </Dialog>


					<Dialog
						title="高级查询"
						modal={true}
						open={this.state.openSearchUpperForm}
						onClose={this.openSearchUpperFormDialog}
						bodyStyle={{paddingTop:34}}
						contentStyle={{width:687}}
					>
						<SearchUpperForm detail={this.state.itemDetail} onSubmit={this.onSearchUpperForm} onCancel={this.openSearchUpperFormDialog} />

				  </Dialog>


			</div>
		);
	}

}
