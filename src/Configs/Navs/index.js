/*
 *
 * 导航字典
 *
 */
import StatisticalNav from './StatisticalNav';
import OtherNav from './OtherNav';

const NavItems = [].concat(StatisticalNav,OtherNav);

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
