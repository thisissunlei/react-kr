import React, {Component, PropTypes} from 'react';
import { observer } from 'mobx-react';
import { observable ,action,asReference} from 'mobx';


import Section from 'kr-ui/Section';


import {Grid,Row,Col} from 'kr-ui/Grid';

import { Button } from 'kr-ui/Button';
import {Form,FormControl} from 'kr-ui/Form';

import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	Divider,
	FontIcon,
	DatePicker,
	Paper,
	Avatar,
	Dialog
} from 'material-ui';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,TableFooter} from 'kr-ui/Table';

const appState = observable({
	customerid:'',
	communityid:'',
	contractcode:'',
	boardroomnum:'',
	contracttype:'',
	leaseAddress:'',
	leaseBegindate:'',
	paymentId:'',
	stationList:'',
	signdate:'',
	boardroomnum:'',
	leaseEnddate:'',
	leaseAddress:'',
	totaldownpayment:'',
	lessorContacttel:'',
	contractfile:'',
	leaseContacttel:'',
	lessorAddress:'',
	leaseContact:'',
	customerid:'',
	stationnum:'',
	leaseId:'',
	contractcode:'',
	lessorContactid:'',
	mainbillid:'',
	contractmark:'',
	wherefloor:'',
	templockday:'',
	contracttype:'',
	leaseBegindate:'',
	user:'sddd',
});

appState.set = function(name,value){
	this[name] = value;
}

export default @observer class AdmitCreate extends Component {

	constructor(props,context){
		super(props, context);

	}

  render() {


    return (

      <div>
			<Section title="创建入驻协议书" description=""> 

				<Form store={appState} value="yayay" >

						<div>
							{appState.lessorAddress}
						</div>

						<div>
							{appState.leaseId}
						</div>

						<FormControl label="出租方" name="leaseId"  type="select">
								<option value="1">哈哈哈</option>
								<option value="2">哈哈哈</option>
								<option value="3">哈哈哈</option>
								<option value="4">哈哈哈</option>
						</FormControl>

						<FormControl label="地址" name="lessorAddress"  type="text"/>
						<FormControl label="联系人" name="lessorContactid"  type="text"/>
						<FormControl label="电话" name="lessorContacttel"  type="text" />
							<FormControl label="承租方" name="user"  type="text" />
								<FormControl label="地址" name="pass"  type="text"/ >

								<FormControl label="联系人" name="pass"  type="text"/>

								<FormControl label="电话" name="pass"  type="text"  />

								<FormControl label="所属社区" name="user"  type="text"  />

								<FormControl label="所属楼层" name="pass"  type="text"  />

								<FormControl label="签署日期" name="pass"  type="text"  />

								<FormControl label="合同编号" name="pass"  type="text"  />

								<FormControl label="定金总额" name="pass"  type="text"  />

								<FormControl label="付款方式" name="pass"  type="text"  />

								<FormControl label="租赁期限" name="pass"  type="text"  />

								<FormControl label="保留天数" name="pass"  type="text"  />

								<FormControl label="租赁项目工位" name="pass"  type="text"  />

								<FormControl label="会议室" name="pass"  type="text"  />

								<FormControl label="备注" name="pass"  type="text"  />

								<FormControl label="上传附件" name="pass"  type="text" />



<Section title="租赁明细" description="" rightMenu = {
								<Menu>
									  <MenuItem primaryText="删除" />
									  <MenuItem primaryText="分配"/>
								</Menu>
				}> 

			<Table  displayCheckbox={true}>
					<TableHeader>
							<TableHeaderColumn>类别</TableHeaderColumn>
							<TableHeaderColumn>编号／名称</TableHeaderColumn>
							<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
							<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
					</TableHeader>
					<TableBody>
						 <TableRow>
							<TableRowColumn>1</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn>Employed</TableRowColumn>
								<TableRowColumn>John Smith</TableRowColumn>
						</TableRow>

						 <TableRow>
							<TableRowColumn>1</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn>Employed</TableRowColumn>
								<TableRowColumn>John Smith</TableRowColumn>
						</TableRow>

				   </TableBody>
			 </Table>


			</Section>

		</Form>
			</Section>
	</div>

	);
  }
}



/*
<Form>

						<FormControl label="出租方" name="leaseId"  type="select" store={appState} >
								<option value="1">哈哈哈</option>
								<option value="2">哈哈哈</option>
								<option value="3">哈哈哈</option>
								<option value="4">哈哈哈</option>
						</FormControl>

						<FormControl label="地址" name="lessorAddress"  type="text" value={appState.lessorAddress} store={appState}/>

						<FormControl label="联系人" name="lessorContactid"  type="text" store={appState}/>

						<FormControl label="电话" name="lessorContacttel"  type="text" store={appState} />


									<FormControl label="承租方" name="user"  type="text" store={appState} value={appState.user}/>

								<FormControl label="地址" name="pass"  type="text" store={appState} / >

								<FormControl label="联系人" name="pass"  type="text" store={appState} />

								<FormControl label="电话" name="pass"  type="text" store={appState} />

								<FormControl label="所属社区" name="user"  type="text" store={appState} />

								<FormControl label="所属楼层" name="pass"  type="text" store={appState} />

								<FormControl label="签署日期" name="pass"  type="text" store={appState} />

								<FormControl label="合同编号" name="pass"  type="text" store={appState} />

								<FormControl label="定金总额" name="pass"  type="text" store={appState} />

								<FormControl label="付款方式" name="pass"  type="text" store={appState} />

								<FormControl label="租赁期限" name="pass"  type="text" store={appState} />

								<FormControl label="保留天数" name="pass"  type="text" store={appState} />

								<FormControl label="租赁项目工位" name="pass"  type="text" store={appState} />

								<FormControl label="会议室" name="pass"  type="text" store={appState} />

								<FormControl label="备注" name="pass"  type="text" store={appState} />

								<FormControl label="上传附件" name="pass"  type="text" store={appState} />



<Section title="租赁明细" description="" rightMenu = {
								<Menu>
									  <MenuItem primaryText="删除" />
									  <MenuItem primaryText="分配"/>
								</Menu>
				}> 

			<Table  displayCheckbox={true}>
					<TableHeader>
							<TableHeaderColumn>类别</TableHeaderColumn>
							<TableHeaderColumn>编号／名称</TableHeaderColumn>
							<TableHeaderColumn>租赁开始时间</TableHeaderColumn>
							<TableHeaderColumn>租赁结束时间</TableHeaderColumn>
					</TableHeader>
					<TableBody>
						 <TableRow>
							<TableRowColumn>1</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn>Employed</TableRowColumn>
								<TableRowColumn>John Smith</TableRowColumn>
						</TableRow>

						 <TableRow>
							<TableRowColumn>1</TableRowColumn>
							<TableRowColumn>John Smith</TableRowColumn>
							<TableRowColumn>Employed</TableRowColumn>
								<TableRowColumn>John Smith</TableRowColumn>
						</TableRow>

				   </TableBody>
			 </Table>


			</Section>

		</Form>

*/
