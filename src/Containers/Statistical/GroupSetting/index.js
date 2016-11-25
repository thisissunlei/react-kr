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
											}} ajaxUrlName='findFinaFinaflowPropertyList' exportSwitch={true}>
											<TableHeader>
												<TableHeaderColumn>属性名称</TableHeaderColumn>
												<TableHeaderColumn name="propcode">属性编码</TableHeaderColumn>
												<TableHeaderColumn>是否启用</TableHeaderColumn>
												<TableHeaderColumn>属性类别</TableHeaderColumn>
												<TableHeaderColumn>排序号</TableHeaderColumn>
												<TableHeaderColumn>创建人</TableHeaderColumn>
												<TableHeaderColumn>创建时间</TableHeaderColumn>
												<TableHeaderColumn>操作</TableHeaderColumn>
										</TableHeader>

										<TableBody>
												 <TableRow displayCheckbox={true}>
												 <TableRowColumn name="propname" ></TableRowColumn>
												<TableRowColumn name="propcode" ></TableRowColumn>
												<TableRowColumn name="enableflag" options={[{label:'是',value:'ENABLE'},{label:'否',value:'DISENABLE'}]}></TableRowColumn>
												<TableRowColumn name="proptype" options={[{label:'收入',value:'INCOME'},{label:'回款',value:'PAYMENT'}]}></TableRowColumn>
												<TableRowColumn name="ordernum"></TableRowColumn>
												<TableRowColumn name="creatername"></TableRowColumn>
												<TableRowColumn name="createdate" type="date"></TableRowColumn>
												<TableRowColumn type="operation">
													  <Button label="查看"  type="operation" operation="view"/>
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
