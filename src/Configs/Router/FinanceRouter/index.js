import React from 'react';
import {
	Router,
	Route,
	Link,
	Redirect,
	IndexRoute,
	IndexRedirect
} from 'react-router';

const Basic = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Basic').default)
  }, 'Basic')
}

const Finance_Manage_OrderBill_ReceiptList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Finance/Manage/OrderBill/ReceiptList').default)
  }, 'Finance_Manage_OrderBill_ReceiptList')
}

const Finance_Manage_OrderBill_OrderList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Finance/Manage/OrderBill/OrderList').default)
  }, 'Finance_Manage_OrderBill_OrderList')
}

const Finance_Manage_OrderBill_OrderBillDetail = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Finance/Manage/OrderBill/OrderBillDetail').default)
  }, 'Finance_Manage_OrderBill_OrderBillDetail')
}

const Finance_Manage_FundSetting_TotalFund = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Finance/Manage/FundSetting/TotalFund').default)
  }, 'Finance_Manage_FundSetting_TotalFund')
}

const Finance_Manage_FundSetting_DetailFund = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Finance/Manage/FundSetting/DetailFund').default)
  }, 'Finance_Manage_FundSetting_DetailFund')
}


const Finance_Manage_Invoice = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Finance/Manage/Invoice').default)
  }, 'Finance_Manage_Invoice')
}


const Finance_Manage_Audit = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Finance/Manage/Audit').default)
  }, 'Finance_Manage_Audit')
}
const Finance_Manage_Sync = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Finance/Manage/Sync').default)
  }, 'Finance_Manage_Sync')
}

const Operation_VoucherManage_VoucherList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('kr/Containers/Operation/VoucherManage/VoucherList').default)
  }, 'Operation_VoucherManage_VoucherList')
}


module.exports =()=>{
	return (
		<Route path="finance" getComponent={Basic}>
           
            <Route path="manage" getComponent={Basic}>
                <Route path="orderbill" getComponent={Basic}>
                    <Route path="receiptList" getComponent={Finance_Manage_OrderBill_ReceiptList}/> {/*订单账单*/}
                    <Route path="orderList" getComponent={Finance_Manage_OrderBill_OrderList}/> {/*订单账单明细*/}
                    <Route path=":orderId/detail" getComponent={Finance_Manage_OrderBill_OrderBillDetail}/>
                </Route>

                <Route path="fundSetting" getComponent={Basic}>
                    <Route path="totalFund" getComponent={Finance_Manage_FundSetting_TotalFund}/>
                    <Route path=":fundId/detailFund" getComponent={Finance_Manage_FundSetting_DetailFund}/>
                </Route>

                {/*开票列表*/}
                <Route path="invoice" getComponent={Basic}>
                    <Route path="list" getComponent={Finance_Manage_Invoice}/>
                </Route>
                {/*审核列表*/}
                <Route path="audit" getComponent={Basic}>
                    <Route path="auditlist" getComponent={Finance_Manage_Audit}/>
                </Route>
                {/*开票列表*/}
                <Route path="sync" getComponent={Basic}>
                    <Route path="list" getComponent={Finance_Manage_Sync}/>
                </Route>
            </Route>
            {/*凭证管理*/}
                <Route path="voucherManage" getComponent={Basic} >
                {/*凭证列表*/}
                  <Route path="voucherList" getComponent={Operation_VoucherManage_VoucherList}/>
                </Route>
        </Route>
	);
};
