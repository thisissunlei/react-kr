/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-op-contract': '&#xe902;',
		'icon-placket-manage': '&#xe901;',
		'icon-product-goods': '&#xe938;',
		'icon-card': '&#xe939;',
		'icon-orders': '&#xe93a;',
		'icon-website': '&#xe93b;',
		'icon-contracts': '&#xe93c;',
		'icon-members': '&#xe93d;',
		'icon-customers': '&#xe93e;',
		'icon-space-manage': '&#xe93f;',
		'icon-equipment-manage': '&#xe940;',
		'icon-wendang': '&#xe941;',
		'icon-money': '&#xe942;',
		'icon-central-control': '&#xe943;',
		'icon-op-permission': '&#xe948;',
		'icon-theLog': '&#xe949;',
		'icon-op-set': '&#xe94a;',
		'icon-add': '&#xe934;',
		'icon-newthing': '&#xe932;',
		'icon-donething': '&#xe933;',
		'icon-delete': '&#xe90b;',
		'icon-searching': '&#xe916;',
		'icon-info': '&#xe91a;',
		'icon-vip': '&#xe903;',
		'icon-activity': '&#xe904;',
		'icon-user': '&#xe907;',
		'icon-process': '&#xe90d;',
		'icon-permissions': '&#xe912;',
		'icon-personnel-information': '&#xe91b;',
		'icon-administrator': '&#xe91c;',
		'icon-basis': '&#xe926;',
		'icon-community': '&#xe927;',
		'icon-com': '&#xe928;',
		'icon-home-setting': '&#xe929;',
		'icon-statistics': '&#xe92a;',
		'icon-systems': '&#xe92c;',
		'icon-hardware': '&#xe92d;',
		'icon-operation-home': '&#xe92e;',
		'icon-accountAdmin': '&#xe92f;',
		'icon-knowledge': '&#xe930;',
		'icon-app': '&#xe931;',
		'icon-day': '&#xe91d;',
		'icon-month': '&#xe921;',
		'icon-close': '&#xe919;',
		'icon-infos': '&#xe918;',
		'icon-more': '&#xe917;',
		'icon-excel': '&#xe900;',
		'icon-template': '&#xe915;',
		'icon-dandian_nor': '&#xe905;',
		'icon-orderForm': '&#xe906;',
		'icon-schema': '&#xe908;',
		'icon-control': '&#xe909;',
		'icon-look': '&#xe90c;',
		'icon-return': '&#xe90e;',
		'icon-commodityManage': '&#xe90f;',
		'icon-file': '&#xe911;',
		'icon-system': '&#xe913;',
		'icon-account': '&#xe914;',
		'icon-return1': '&#xe90a;',
		'icon-error': '&#xe935;',
		'icon-right': '&#xe936;',
		'icon-edit': '&#xe937;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
