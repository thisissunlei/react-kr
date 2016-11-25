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

export default class Initialize  extends Component{

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}



	render(){

		return(

			<div>
					<Section title="分组配置" description="" >


										<Table  style={{marginTop:10}} ajax={true} onProcessData={(state)=>{
												return state;
											}}
											ajaxFieldListName="groups"
											ajaxUrlName='getDataGrouplis' exportSwitch={true}>
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
													  <Button label="编辑"  type="operation" operation="edit"/>
												 </TableRowColumn>
											 </TableRow>
										</TableBody>

										<TableFooter></TableFooter>

										</Table>
					</Section>
			</div>
		);
	}

}
