
import React, {
	Component
} from 'react';

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
	Tooltip,
	Message,
	Title,
	KrDate,
	SnackTip

} from 'kr-ui';


import EditDetail from "./EditDetail";
import HeavilyActivation from "./HeavilyActivation";
import NewActivation from "./NewActivation";
import StartCardActivation from "./StartCardActivation"


export default class List extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			//新建激活页面的开启状态
			openNewActivation: false,
			//编辑页面的开启状态
			openEditDetail: false,
			//批量激活输入卡号的开启状态
			openHeavilyActivation: false,
			//批量激活开始激活
			openStartCardActivation:false,
			itemDetail: {},
			item: {},
			list: {},
			searchParams: {
				foreignCode:'',
				page: 1,
				pageSize: 15,
				EditDetail:{}
			}

		}
	}




	//操作相关
	onOperation=(type, itemDetail)=> {
		var _this=this;
		this.setState({
			itemDetail
		});
		if (type == 'view') {
			let orderId = itemDetail.id
		} else if (type == 'edit') {
			this.openEditDetailDialog();
		}
	}



	//编辑页面开关
	openEditDetailDialog=()=> {
		this.setState({
			openEditDetail: !this.state.openEditDetail
		});
	}
	//批量激活输入卡号页面开关
	openHeavilyActivationDialog=()=> {
		this.setState({
			openHeavilyActivation: !this.state.openHeavilyActivation,
		});
	}
	//新建激活页面开关
	openNewActivationDialog=()=> {
		this.setState({
			openNewActivation: !this.state.openNewActivation,
		});
	}
	//批量激活开始激活页面的开关
	openStartCardActivationDialog=()=>{
		this.setState({
			openStartCardActivation: !this.state.openStartCardActivation,
		});
	}
	throwBack=()=>{
		this.openStartCardActivationDialog();
		this.openHeavilyActivationDialog();
	}
	//新建激活的确定操作
	onNewActivation=(values)=> {
		var _this=this;
		const params={};
		params.foreignCode=values.foreignCode;
		params.interCode=values.interCode;
		Store.dispatch(Actions.callAPI('CardEdit', {}, params)).then(function(response) {
			_this.openNewActivationDialog();
		}).catch(function(err) {
			Message.error(err.message)
		});
	}

	//输入卡号的确定操作
	onHeavilyActivation=(detail)=> {
		console.log(detail,"index");
		if(!detail.startNum||!detail.endNum){
			return ;
		}
		this.setState({detail},function(){

				this.openHeavilyActivationDialog();
				this.onStartCardActivation()

			}
		)
	}
	//开始激活的确定操作
	onStartCardActivation=()=>{
		this.openStartCardActivationDialog();
	}
	//编辑页面的确定操作
	onEditDetail=(values)=>{
		var _this=this;
		const params={};
		params.id=values.id;
		params.foreignCode=values.foreign_code;
		params.interCode=""+values.inter_code;
		Store.dispatch(Actions.callAPI('CardEdit', {}, params)).then(function(response) {
			_this.openEditDetailDialog()
		}).catch(function(err) {
			Message.error(err.message)
		});

	}


	//搜索被点击
	onSearchSubmit=(searchParams)=> {
		let obj = {
			foreignCode: searchParams.content,
			pageSize:15,
			page:1,
		}
		this.setState({
			searchParams: obj
		});
	}

	onSearchCancel=()=> {

	}

	onNewCreateCancel=()=> {
		this.openNewCreateDialog();
	}

	onLoaded=(response)=> {

		let list = response;
		this.setState({
			list
		})
	}

		render(){
			return(
				<div className="switchhover">
				<Title value="会员配置"/>

						<Section title="会员卡激活" description="" style={{minHeight:"900px"}}>
								<Grid style={{marginBottom:22,marginTop:2}}>
									<Row >
									<Col md={1} align="left"> <Button label="新建激活" type='button' joinEditForm onTouchTap={this.openNewActivationDialog}  /> </Col>
									<Col md={1} align="left"> <Button label="批量激活" type='button' joinEditForm onTouchTap={this.openHeavilyActivationDialog}  /> </Col>
										<Col md={10} align="right" style={{marginTop:0}}>
											<ListGroup>
												<ListGroupItem> <SearchForms onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/></ListGroupItem>
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
												ajaxParams={this.state.searchParams}

												ajaxFieldListName="items"
												ajaxUrlName='CardActivationList'>
												<TableHeader>
													<TableHeaderColumn>卡号</TableHeaderColumn>
													<TableHeaderColumn>内码</TableHeaderColumn>
													<TableHeaderColumn>状态</TableHeaderColumn>
													<TableHeaderColumn>激活时间</TableHeaderColumn>
													<TableHeaderColumn>操作</TableHeaderColumn>

											</TableHeader>

											<TableBody >
													<TableRow >
													<TableRowColumn name="foreign_code" ></TableRowColumn>
													<TableRowColumn name="inter_code" ></TableRowColumn>
													<TableRowColumn name="enable" options={[{label:'是',value:'ENABLE'},{label:'否',value:'DISENABLE'}]}></TableRowColumn>
													<TableRowColumn name="active_time" type='date' format="yyyy-mm-dd hh:MM:ss" ></TableRowColumn>
													<TableRowColumn type="operation">
														  <Button label="编辑"  type="operation"  operation="edit" />
													 </TableRowColumn>
												 </TableRow>
											</TableBody>

											<TableFooter ></TableFooter>

											</Table>
						</Section>
						<Dialog
							title="新建激活"
							modal={true}
							open={this.state.openNewActivation}
							onClose={this.openNewActivationDialog}
							bodyStyle={{paddingTop:45}}
							contentStyle={{width:442}}
						>
							<NewActivation  onSubmit={this.onNewActivation} onCancel={this.openNewActivationDialog}/>

					  </Dialog>

						<Dialog
							title="批量激活"
							modal={true}
							open={this.state.openHeavilyActivation}
							onClose={this.openHeavilyActivationDialog}
							bodyStyle={{paddingTop:45}}
							contentStyle={{width:500}}
						>
							<HeavilyActivation detail={this.state.detail}  onSubmit={this.onHeavilyActivation} onCancel={this.openHeavilyActivationDialog}/>
					  </Dialog>

						<Dialog
							title="编辑"
							modal={true}
							open={this.state.openEditDetail}
							onClose={this.openEditDetailDialog}
							bodyStyle={{paddingTop:45}}
							contentStyle={{width:442}}
						>
						<EditDetail detail={this.state.itemDetail} onSubmit={this.onEditDetail} onCancel={this.openEditDetailDialog}/>
					  </Dialog>

						<Dialog
							title="批量激活"
							modal={true}
							open={this.state.openStartCardActivation}
							onClose={this.openStartCardActivationDialog}
							bodyStyle={{paddingTop:45}}
							contentStyle={{width:500}}
						>
							<StartCardActivation detail={this.state.detail}  onCancel={this.openStartCardActivationDialog} throwBack={this.throwBack}/>
					  </Dialog>

				</div>
			);
		}


}
