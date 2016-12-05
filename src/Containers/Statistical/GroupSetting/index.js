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
			accountname: {}
		}
	}

	//操作相关
	onOperation(type, itemDetail) {

			this.openEditDetailDialog();

	}

	//编辑
	openEditDetailDialog() {
		this.setState({
			openEditDetail: !this.state.openEditDetail
		});
	}
	//搜索功能
	onSearchSubmit(accountname) {

		this.setState({
			accountname
		});

	}

	//新建
	openNewCreateDialog() {
		this.setState({
			openNewCreate: !this.state.openNewCreate
		});
	}
//高级搜索
	openSearchUpperFormDialog=()=> {
		this.setState({
			openSearchUpperForm: !this.state.openSearchUpperForm
		});
	}

	render(){


		return(

			<div>
					<Section title="分组配置" description="" >
							<Grid style={{marginBottom:22,marginTop:2}}>
								<Row >
									<Col md={4} align="left"> <Button label="新建" type='button' joinEditForm onTouchTap={this.openNewCreateDialog}  /> </Col>
									<Col md={8} align="right" style={{marginTop:7}}>
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
											}}

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
												<TableRowColumn name="operaterName"></TableRowColumn>
												<TableRowColumn name="operatedate" ></TableRowColumn>
												<TableRowColumn name="enableflag" options={[{label:'启用',value:'ENABLE'},{label:'禁用',value:'DISENABLE'}]}></TableRowColumn>

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
						<NewEditDetail  detail={this.state.itemDetail} onSubmit={this.onEditSubmit} onCancel={this.openEditDetailDialog} />
		  			</Dialog>

		  			<Dialog
						title="新建分组"
						modal={true}

						open={this.state.openNewCreate}
						onClose={this.openNewCreateDialog}


					>
						<NewCreateForm detail={this.state.itemDetail} onSubmit={this.openNewCreateSubmit} onCancel={this.openNewCreateDialog} />

				  </Dialog>


					<Dialog
						title="高级查询"
						modal={true}
						open={this.state.openSearchUpperForm}
						onClose={this.openSearchUpperFormDialog}
						bodyStyle={{paddingTop:34}}
						contentStyle={{width:687}}
					>
						<SearchUpperForm detail={this.state.itemDetail} onSubmit={this.onNewCreateSubmit} onCancel={this.openSearchUpperFormDialog} />

				  </Dialog>


			</div>
		);
	}

}
