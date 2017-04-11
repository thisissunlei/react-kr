import React from 'react';
import {
	Router,
	Route,
	Link,
	Redirect,
	IndexRoute,
	IndexRedirect
} from 'react-router';

import {Finance,Basic} from 'kr/Containers';


module.exports =()=>{


	return (
		<Route path="finance" component={Basic}>

            <IndexRedirect to="manage/audit/auditlist"/>

            <Route path="manage" component={Basic}>
                <Route path="orderbill" component={Basic}>
                    <Route path="receiptList" component={Finance.Manage.OrderBill.ReceiptList}/> {/*订单账单*/}
                    <Route path="orderList" component={Finance.Manage.OrderBill.OrderList}/> {/*订单账单明细*/}
                    <Route path=":orderId/detail" component={Finance.Manage.OrderBill.OrderBillDetail}/>
                </Route>

                <Route path="fundSetting" component={Basic}>
                    <Route path="totalFund" component={Finance.Manage.FundSetting.TotalFund}/>
                    <Route path=":fundId/detailFund" component={Finance.Manage.FundSetting.DetailFund}/>
                </Route>

                {/*开票列表*/}
                <Route path="invoice" component={Basic}>
                    <Route path="list" component={Finance.Manage.Invoice}/>
                </Route>

                {/*代码配置*/}
                <Route path="codeSetting" component={Basic}>
                    <Route path="attribute" component={Finance.Manage.CodeSetting.Attribute}/>
                    <Route path="subject" component={Finance.Manage.CodeSetting.Subject}/>
                </Route>
                {/*审核列表*/}
                <Route path="audit" component={Basic}>
                    <Route path="auditlist" component={Finance.Manage.Audit}/>
                </Route>
            </Route>
        </Route>
	);
};
