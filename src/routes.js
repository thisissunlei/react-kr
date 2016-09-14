import React from 'react';

import { Router, Route, Link,IndexRoute,browserHistory} from 'react-router';




import {
	Help,
	Undefined,
	Permission,
	Document,
	Operation,
	Basic,
} from './Containers';

import Master from './master';

export default(

	<Route path="/" component={Master}>
		<IndexRoute component={Permission.Home}/>
		<Route path="index" component={Permission.Home}/>


		{/*运营管理*/}
		<Route path="operation" component={Basic}>
				<Route path="index" component={Operation.Home}/>

              {/*客户管理*/}
				<Route path="customerManage" component={Basic}>
					<Route path="List" component={Operation.CustomerManage.List}/>
					<Route path=":customerId/Order" component={Basic}>
						<Route path="create" component = {Operation.CustomerManage.Order.Create}/>
						<Route path=":orderId/detail" component = {Operation.CustomerManage.Order.Detail}/>
						<Route path=":oriderId/Edit" component = {Operation.CustomerManage.Order.Edit}/>
					</Route>
				</Route>

				{/*入驻订单*/}
				<Route path="joinOrder" component={Basic}>
					<Route path="list" component={Operation.JoinOrder.List}/>
					<Route path="customer" component={Basic}>
						<Route path="edit" component = {Operation.JoinOrder.Customer.Edit}/>
						<Route path="detail" component = {Operation.JoinOrder.Customer.Detail}/>
					</Route>
				</Route>

				{/*合同信息*/}
				<Route path="agreement" component={Basic}>

					{/*入驻协议书*/}
					<Route path="join" component={Basic}>
						<Route path="edit" component={Operation.Agreement.Join.Edit}/>
						<Route path="detail" component={Operation.Agreement.Join.Detail}/>
						<Route path="create" component={Operation.Agreement.Join.Create}/>
					</Route>

					{/*承租意向书*/}
					<Route path="admit" component={Basic}>
						<Route path="edit" component={Operation.Agreement.Admit.Edit}/>
						<Route path="detail" component={Operation.Agreement.Admit.Detail}/>
					</Route>

					{/*增租协议书*/}
					<Route path="increase" component={Basic}>
						<Route path="edit" component={Operation.Agreement.Renew.Edit}/>
						<Route path="detail" component={Operation.Agreement.Renew.Detail}/>
					</Route>

					{/*续租协议书*/}
					<Route path="renew" component={Basic}>
						<Route path="edit" component={Operation.Agreement.Renew.Edit}/>
						<Route path="detail" component={Operation.Agreement.Renew.Detail}/>
					</Route>

					{/*减租协议书*/}
					<Route path="reduce" component={Basic}>
						<Route path="edit" component={Operation.Agreement.Reduce.Edit}/>
						<Route path="detail" component={Operation.Agreement.Reduce.Detail}/>
					</Route>

					{/*退租协议书*/}
					<Route path="exit" component={Basic}>
						<Route path="edit" component={Operation.Agreement.Exit.Edit}/>
						<Route path="detail" component={Operation.Agreement.Exit.Detail}/>
					</Route>


				</Route>

				{/*财务管理*/}
				<Route path="finance" component={Basic}>
					<Route path="index" component={Operation.Finance.Home}/>
					<Route path="orderbill" component={Basic}>
						<IndexRoute component = {Operation.Finance.OrderBill.Home}/>
						<Route path="receipt" component={Operation.Finance.OrderBill.ReceiptList}/>
						<Route path="orderlist" component={Operation.Finance.OrderBill.OrderList}/>
					</Route>

				</Route>

		</Route>

		{/*权限管理*/}
		<Route path="permission" component={Basic}>
			<IndexRoute component = {Permission.Home}/>
			<Route path="index" component={Permission.Home}/>
			<Route path="notify" component={Permission.Notify}/>
			<Route path="memo" component={Permission.Memo}/>
			<Route path="docs" component={Permission.Docs}/>
			<Route path="order" component={Permission.Order}/>
		</Route>


		{/*文档管理*/}
		<Route path="document" component={Basic}>
			<Route path="index" component={Document.Home}/>
		</Route>

		{/*帮助*/}
		<Route path="help" component={Help}/>

		{/*404*/}
		<Route path="undefined" component={Undefined}/>
		<Route path="*" component={Undefined}/>

	</Route>

);
