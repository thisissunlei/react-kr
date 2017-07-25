/*
 * 
 *
 * 导航字典
 *
 */
import HomeNav from './HomeNav';
import StatisticalNav from './StatisticalNav';
import CommunityNav from './CommunityNav';
import OperationNav from './OperationNav';
import MemberNav from './MemberNav';
import FinanceNav from './FinanceNav';
import RetailNav from './RetailNav';
import OANav from './OANav';
import KnowledgeNav from './KnowledgeNav';
import PowerNav from './PowerNav';
import WebBackstageNav from './WebBackstageNav';
import PermissionNav from './PermissionNav';

import OtherNav from './OtherNav';

const NavItems = [].concat(HomeNav,OperationNav,FinanceNav,RetailNav,OANav,KnowledgeNav,PowerNav,OtherNav,PermissionNav);

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
