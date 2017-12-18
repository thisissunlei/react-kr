/*
 * 
 *
 * 导航字典
 *
 */
 //首页
import HomeNav from './HomeNav';
//运营管理
import OperationNav from './OperationNav';
//财法管理
import FinanceNav from './FinanceNav';
//人事管理
import OANav from './OANav';
//综合办公
import OfficeNav from './OfficeNav';
//基础管理
import PermissionNav from './PermissionNav';
//综合办公
import OtherNav from './OtherNav';
//行政管理
import AdministrationNav from './AdministrationNav';

//智能硬件
import SmartHardware from './SmartHardware';
//订单中心
import OrderCenter from './OrderCenter';


const NavItems = [].concat(HomeNav,OtherNav,OfficeNav,OANav,OperationNav,AdministrationNav,FinanceNav,PermissionNav,SmartHardware,OrderCenter);

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
