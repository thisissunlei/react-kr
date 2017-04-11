/*
 *
 * 导航字典
 *
 */
import StatisticalNav from './StatisticalNav';
import FinanceNav from './FinanceNav';
import CommunityNav from './CommunityNav';
import MemberNav from './MemberNav';
import OperationNav from './OperationNav';
import OANav from './OANav';
import OtherNav from './OtherNav';

const NavItems = [].concat(StatisticalNav,FinanceNav,OperationNav,MemberNav,OANav,OtherNav);

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
