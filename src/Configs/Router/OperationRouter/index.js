import React from 'react';
import {
	Router,
	Route,
	Link,
	Redirect,
	IndexRoute,
	IndexRedirect
} from 'react-router';

import {
	Actions,
	Store
} from 'kr/Redux';

import Operation from 'kr/Containers/Operation';
import Basic from 'kr/Containers/Basic';

module.exports =()=>{
	return (

		<Route path="operation" component={Basic}>
			<Route path="index" component={Operation.Home}/>
			{/*分组模版管理*/}
			<Route path="groupSetting" component={Operation.GroupSetting}/>

			{/*社区配置*/}
			<Route path="communityAllocation" component={Basic}>
				<Route path="communityList" component={Operation.CommunityAllocation.CommunityList}/>
			</Route>
			{/*基础配置*/}
			<Route path="basicConfig" component={Basic}>
				<Route path="EquipmentDefinition" component={Operation.BasicConfig.EquipmentDefinition} name="EquipmentDefinition"/>
			</Route>

			{/*凭证管理*/}
			<Route path="voucherManage" component={Basic} >
					{/*凭证列表*/}
						<Route path="voucherList" component={Operation.VoucherManage.VoucherList}/>
			</Route>

			{/*客户管理*/}
			<Route path="customerManage" component={Basic}>
				<Route path="customerList" component={Operation.CustomerManage.CustomerList} />
				<Route path="agreementList" component={Operation.CustomerManage.AgreementList} />
				{/*客户公海*/}
				<Route path="customerHighSea" component={Operation.CustomerManage.CustomerHighSea}/>
				<Route path="list" component={Operation.CustomerManage.List} />

				<Route path=":customerId/" component={Basic} >

					{/*订单*/}
					<Route path="order" component={Basic}>
						<Route path="create" component = {Operation.CustomerManage.Order.Create} name="customerManage_order_create"/>
						<Route path=":orderId/detail" component = {Operation.CustomerManage.Order.Detail} name="customerManage_order_detail"/>
						<Route path=":orderId/Edit" component = {Operation.CustomerManage.Order.Edit} name="customerManage_order_edit"/>


						{/*合同信息*/}
						<Route path=":orderId/agreement" component={Basic}>

							{/*入驻协议书*/}
							<Route path="join" component={Basic}>
								<Route path=":id/edit" component={Operation.CustomerManage.Agreement.Join.Edit}/>
								<Route path=":id/detail" component={Operation.CustomerManage.Agreement.Join.Detail}/>
								<Route path="create" component={Operation.CustomerManage.Agreement.Join.Create}/>
								<Route path=":id/print" component={Operation.CustomerManage.Agreement.Join.Print}/>
							</Route>

							{/*承租意向书*/}
							<Route path="admit" component={Basic}>
								<Route path="create" component={Operation.CustomerManage.Agreement.Admit.Create}/>
								<Route path=":id/edit" component={Operation.CustomerManage.Agreement.Admit.Edit}/>
								<Route path=":id/detail" component={Operation.CustomerManage.Agreement.Admit.Detail}/>
								<Route path=":id/print" component={Operation.CustomerManage.Agreement.Admit.Print}/>
							</Route>

							{/*增租协议书*/}
							<Route path="increase" component={Basic}>
								<Route path="create" component={Operation.CustomerManage.Agreement.Increase.Create}/>
								<Route path=":id/edit" component={Operation.CustomerManage.Agreement.Increase.Edit}/>
								<Route path=":id/detail" component={Operation.CustomerManage.Agreement.Increase.Detail}/>
								<Route path=":id/print" component={Operation.CustomerManage.Agreement.Increase.Print}/>
							</Route>

							{/*续租协议书*/}
							<Route path="renew" component={Basic}>
								<Route path="create" component={Operation.CustomerManage.Agreement.Renew.Create}/>
								<Route path=":id/edit" component={Operation.CustomerManage.Agreement.Renew.Edit}/>
								<Route path=":id/detail" component={Operation.CustomerManage.Agreement.Renew.Detail}/>
								<Route path=":id/print" component={Operation.CustomerManage.Agreement.Renew.Print}/>
							</Route>

							{/*减租协议书*/}
							<Route path="reduce" component={Basic}>
								<Route path="create" component={Operation.CustomerManage.Agreement.Reduce.Create}/>
								<Route path=":id/edit" component={Operation.CustomerManage.Agreement.Reduce.Edit}/>
								<Route path=":id/detail" component={Operation.CustomerManage.Agreement.Reduce.Detail}/>
								<Route path=":id/print" component={Operation.CustomerManage.Agreement.Reduce.Print}/>

							</Route>

							{/*退租协议书*/}
							<Route path="exit" component={Basic}>
								<Route path="create" component={Operation.CustomerManage.Agreement.Exit.Create}/>
								<Route path=":id/edit" component={Operation.CustomerManage.Agreement.Exit.Edit}/>
								<Route path=":id/detail" component={Operation.CustomerManage.Agreement.Exit.Detail}/>
							</Route>

						</Route>
					</Route>

				</Route>

				{/*合同配置*/}
				<Route path="agreement" component={Basic} >

					{/*出租方管理*/}
					<Route path="lessorManage" component={Basic}>
						<Route path="list" component={Operation.CustomerManage.Agreement.LessorManage.List}/>
					</Route>

					{/*基础配置*/}
					<Route path="setting" component={Basic}>
						<Route path="list" component={Operation.CustomerManage.Agreement.Setting.List}/>
					</Route>
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
		</Route>
	);
};
