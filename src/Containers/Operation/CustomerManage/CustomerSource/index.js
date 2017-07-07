import React,{Component} from 'react';
import {
    reduxForm,
    formValueSelector,
    initialize,
    change
} from 'redux-form';
import {Actions,Store,connect} from 'kr/Redux';
import {
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
	Drawer,
	Dialog,
	SearchForms,
	ListGroup,
	ListGroupItem,
	Tooltip,
	Message,
	Title,
	KrDate
} from 'kr-ui';
import {Http} from 'kr/Utils';
import './index.less';
import EditCustomerSource from './EditCustomerSource';
import NewCustomerSource from './NewCustomerSource';
import DeleteSource from './DeleteSource';
export default class CustomerSource  extends Component{

	constructor(props,context){
		super(props, context);
		this.state = {
			isEdit : false,
			isNew : false,
			isLook : false,
			isDel : false,
			searchParams:{
				page:1,
				pageSize:15,
				searchKey:'',
				other:'',
			},
			sourceId:'',
			childs : [],
		}

	}

	//新建提交数据和编辑数据的提交
	onCreateSubmit=(params)=> {

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
	onOperation = (type,itemDetail) => {
		if(type == "edit"){
			this.editSwitch();
			this.getDetailEdit(itemDetail.id)
		}else if(type == "delete"){

			this.delSwitch();

		}
		this.setState({
			sourceId:itemDetail.id,
		})

    }
	//打开新建按钮
	openNew = () =>{
		this.newSwitch();
	}

	//编辑开关
	editSwitch = () => {

		let {isEdit} = this.state;
		this.setState({
			isEdit : !isEdit,
		})

	}
	//新建开关
	newSwitch = () => {
		let {isNew} = this.state;
		this.setState({
			isNew : !isNew,
		})
	}
	//查看开关
	lookSwitch = () => {
		let {isLook} = this.state;
		this.setState({
			isLook : !isLook
		})
	}
	//删除确定的开关
	delSwitch = () =>{
		let {isDel} = this.state;
		this.setState({
			isDel : !isDel
		})
	}
	//搜索功能
	onSearchSubmit = (data) => {
		let searchParams = Object.assign({},this.state.searchParams);
		searchParams.searchKey = data.value;
		this.setState({
			searchParams,
		})

	}
	//获取编辑的信息
	getDetailEdit = (id) =>{
		var value = {id:id}
		const self = this;
		Http.request('get-detail-source',value).then(function(response) {
			var data = Object.assign({},response);
			data.enabled = data.enabledStr;
			var childs = data.subListStr;
			self.setState({
				childs
			})
			Store.dispatch(initialize('editCustomerSource',data));
		}).catch(function(err) {

		});
	}
	
	
	//删除客户来源
	delSubmit = () =>{
		const {sourceId} = this.state;
		var value = {id:sourceId||''};
		const self = this;
		Http.request('delete-source',value).then(function(response) {
			self.delSwitch();
			self.refreshList();
		}).catch(function(err) {

		});
	}
	//关闭所有的侧滑
	allClose = () =>{
		this.setState({
			isEdit : false,
			isNew : false,
			// isDel : false,
			// isLook : false,
		})
	}
	//编辑提交
	editSubmit = (data) =>{
		const self = this;
		let arr = [];
		for(let i = 0; i<data.subListStr.length;i++){
			if(data.subListStr[i]!=null){
				arr.push(data.subListStr[i])
			}
		}
		var subListStr = JSON.stringify(arr);
		data = Object.assign({},data);
		data.subListStr = subListStr;
		var value = Object.assign({},data);
		Http.request('edit-source',{},value).then(function(response) {
			self.editSwitch();
			self.refreshList();
		}).catch(function(err) {

		});
	}
	//新建提交
	newSubmit = (data) =>{
		const self = this;
		let arr = [];
		for(let i = 0; i<data.subListStr.length;i++){
			if(data.subListStr[i]!=null){
				arr.push(data.subListStr[i])
			}
		}
		var subListStr = JSON.stringify(arr);
		data = Object.assign({},data);
		data.subListStr = subListStr;
		var value = Object.assign({},data);
		Http.request('new-source',{},value).then(function(response) {
			self.newSwitch();
			self.refreshList();
		}).catch(function(err) {

		});
	}
	//刷新列表
	refreshList = () =>{
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.other = +new Date();
		this.setState({
			searchParams,
		})
	}
	render(){
		const {isEdit,isNew,searchParams,isDel,childs} = this.state;

		return(
			<div className="customer-source">
			    <Title value="客户来源配置"/>

					<Section title="客户来源配置" description="" style={{minHeight:"900px"}}>
							<Grid style={{marginBottom:22,marginTop:2}}>
								<Row >
									<Col md={4} align="left"> <Button label="新建" type='button' joinEditForm onTouchTap={this.openNew}  /> </Col>
									<Col md={8} align="right" style={{marginTop:0}}>
										<ListGroup>
											<ListGroupItem> <SearchForms onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/></ListGroupItem>
											{/*<ListGroupItem> <Button searchClick={this.openSearchUpperFormDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'5'}}/></ListGroupItem>*/}
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
                                    displayCheckbox={false}
                                    onExport={this.onExport}
                                    ajaxParams={searchParams}

                                    ajaxFieldListName="items"
                                    ajaxUrlName='list-source'
                            >
                                <TableHeader>
                                    <TableHeaderColumn>来源编码</TableHeaderColumn>
                                    <TableHeaderColumn>来源名称</TableHeaderColumn>
                                    <TableHeaderColumn>子项</TableHeaderColumn>
                                    <TableHeaderColumn>佣金</TableHeaderColumn>
                                    <TableHeaderColumn>顺序</TableHeaderColumn>
                                    <TableHeaderColumn>是否全员开放</TableHeaderColumn>
                                    <TableHeaderColumn>创建人</TableHeaderColumn>
                                    <TableHeaderColumn>创建时间</TableHeaderColumn>
                                    <TableHeaderColumn>操作</TableHeaderColumn>

                                </TableHeader>

                                <TableBody >
                                    <TableRow >

                                        <TableRowColumn name="code" ></TableRowColumn>
                                        <TableRowColumn name="name"></TableRowColumn>
                                        <TableRowColumn name="subSourceStr" component={(value,oldValue)=>{
						                				let show="inline-block";
						                				if(value.length==0){
						                					show="none";
						                				}else{
						                					show="inline-block";
						                				}
														 return (
															 <div style={{display:"inline-block"}}>
																 <span className='tableOver' 
																 	style={{
																		 maxWidth:130,
																		 marginTop:5,
																		 display:"inline-block",
																		 overflowX:"hidden",
																		 textOverflow:" ellipsis",
																		 whiteSpace:" nowrap"}}
																	>
																	{value}
																</span>
																<Tooltip 
																	offsetTop={10} 
																	place='top' 
																	style={{left:50,display:"show"}}
																>
																	<div>{value}</div>
																</Tooltip>
															 </div>
															 )
										}}></TableRowColumn>
                                        <TableRowColumn name="brokerage"></TableRowColumn>
                                        <TableRowColumn name="orderNum"></TableRowColumn>
                                        <TableRowColumn name="enabled" component={(value,oldValue)=>{
											var label = "是";
											if(value == "false"){
												var label = "否";
											}
											return <div>{label}</div>
										}}></TableRowColumn>
                                        <TableRowColumn name="creatorName"></TableRowColumn>
                                        <TableRowColumn name="cTime" component={(value,oldValue)=>{
						                				let show="inline-block";
						                				if(value.length==0){
						                					show="none";
						                				}else{
						                					show="inline-block";
						                				}
														 return (<div style={{display:"inline-block"}}><span className='tableOver' style={{maxWidth:130,marginTop:5,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}><KrDate value={value} format="yyyy-mm-dd"/><span>...</span></span>
														 	<Tooltip offsetTop={10} place='top' style={{left:50,display:show}}>
																<div><KrDate value={value} format="yyyy-mm-dd HH:MM:ss"/></div>
														 	</Tooltip></div>)
										}}></TableRowColumn>
                                        <TableRowColumn>
                                            {/*<Button label="查看"  type="operation" operation="look"/>*/}
                                            <Button label="编辑"  type="operation" operation="edit"/>
                                            <Button label="删除"  type="operation" operation="delete"/>
                                        </TableRowColumn>

                                    </TableRow>
                                </TableBody>

                                <TableFooter></TableFooter>

                        </Table>
				</Section>
				{/*编辑*/}
				<Drawer
					open={isEdit}
					width={750}
					openSecondary={true}
					onClose={this.allClose}
					containerStyle={{top:60,paddingBottom:228,zIndex:20}}
				>
					<EditCustomerSource childs = {childs} onSubmit = {this.editSubmit} onCancel = {this.editSwitch}/>
				</Drawer>

				{/*新建*/}
				<Drawer
					open={isNew}
					width={750}
					openSecondary={true}
					onClose={this.allClose}
					containerStyle={{top:60,paddingBottom:228,zIndex:20}}
				>
					<NewCustomerSource onSubmit = {this.newSubmit} onCancel = {this.newSwitch}/>
				</Drawer>
				<Dialog
					title="删除合同"
					modal={true}
					onClose={this.delSwitch}
					open={isDel}
					contentStyle={{width:445,height:236}}
       			>
					<DeleteSource
						onCancel = {this.delSwitch}
						onSubmit = {this.delSubmit}
					/>
		    	</Dialog>
			</div>
		);
	}

}
