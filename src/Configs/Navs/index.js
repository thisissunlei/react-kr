/*
 * 
 *
 * 导航字典
 *
 */
 //首页
import HomeNav from './HomeNav';
// 社区运营
import OperationNav from './OperationNav';
// 客户会员
import UserNav from './UserNav';
// 产品商品
import ProductNav from './ProductNav';
// 订单合同
import OrderNav from './OrderNav';
// 账单财务
import FinanceNav from './FinanceNav';
// 智能硬件
import SmartHardware from './SmartHardware';
// 系统配置
import ConfigNav from './ConfigNav';


//财法管理

// //人事管理
// import OANav from './OANav';
// //综合办公
// import OfficeNav from './OfficeNav';
// //基础管理

// //综合办公
// import OtherNav from './OtherNav';
// //行政管理
// import AdministrationNav from './AdministrationNav';
// //智能硬件

// //订单中心
// import OrderCenter from './OrderCenter';
// //账单中心
// import BillNav from './BillNav';
//订单中心

const NavItems = [].concat(HomeNav,OperationNav,UserNav,ProductNav,OrderNav,FinanceNav,SmartHardware,ConfigNav);

module.exports = {
    current_parent: '',
    current_child: '',
    current_router: '',
    current_items: [{
        primaryText: "权限管理",
        router: 'order',
        menuCode: 'rightadmin',
        menuItems: [],
    }],
    items: NavItems
}
