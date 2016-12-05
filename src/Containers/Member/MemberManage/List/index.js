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
} from 'kr-ui';


export default class List extends Component {

	constructor(props, context) {
		super(props, context);
	}

	render() {


		return (

			    <div >
									<Title value="全部会员 "/>

								<Section title="全部会员" description="" >
									<Table  style={{marginTop:10}} ajax={true} onProcessData={(state)=>{
											return state;
										}} ajaxUrlName='findFinaFinaflowPropertyList'  exportSwitch={true}  >
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
