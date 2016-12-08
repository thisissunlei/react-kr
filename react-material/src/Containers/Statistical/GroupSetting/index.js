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
	

} from 'kr-ui';

import  CreateForm from "./CreateForm";

export default class Initialize  extends Component{

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		this.openEditDetailDialog=this.openEditDetailDialog.bind(this);
		this.onOperation = this.onOperation.bind(this);
		this.state={
			openEditDetail:false,
		}
	}

	//编辑
	openEditDetailDialog(){
		this.setState({
			openEditDetail: !this.state.openEditDetail
		});
	}

	//相关操作
	onOperation() {

			this.openEditDetailDialog();
		
	}
	



	render(){

		return(

			<div>
					<Section title="分组配置" description="" >


										<Table  style={{marginTop:10}} ajax={true} onProcessData={(state)=>{
												return state;
											}}
											ajaxFieldListName="groups"
											ajaxUrlName='getDataGrouplis' exportSwitch={true}
											onOperation={this.onOperation}

											>
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

												<TableRowColumn type="operation">
													  <Button label="编辑"  type="operation" operation="edit" />
												 </TableRowColumn>
											 </TableRow>
										</TableBody>

										<TableFooter></TableFooter>

										</Table>
					</Section>

					<Dialog
						title="新建"
						modal={true}
						open={this.state.openEditDetail}
						onClose={this.openNewEditDialog}
					>
						<CreateForm  onCancel={this.openViewDialog} />
				  </Dialog>
			</div>
		);
	}

}
