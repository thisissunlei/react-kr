module.exports = [

	{
		primaryText: "商品零售",
		iconName: 'icon-look',
		iconColor: '#79859a',

		router: 'retail',
		menuCode: 'krspace_retail',
		originUrl: '/krspace_retail_web/retail/charts/retailCharts/toRetailCharts?mid=92',
		menuItems: [
			{
				primaryText: '零售看板',
				menuCode: 'retailCharts',
				router: 'retailCharts',
				originUrl: '/krspace_retail_web/retail/charts/retailCharts/toRetailCharts?mid=92'
			}, 
			{
				primaryText: '商品管理',
				menuCode: 'goodsAdmin',
				iconName: 'icon-commodityManage',
				iconColor: '#79859a',

				router: 'goodsAdmin',
				menuItems: [
					{
						primaryText: '商品品牌',
						menuCode: 'goodsBrandAdmin',
						router: 'goodsBrandAdmin',
						originUrl: '/krspace_retail_web/retail/goods/goodsBrand/toEGoodsBrandList?mid=72'
					}, 
					{
						primaryText: '商品类别',
						menuCode: 'goodsTypeAdmin',
						router: 'goodsTypeAdmin',
						originUrl: '/krspace_retail_web/retail/goods/goodsType/toGoodsTypeList?mid=73'
					}, 
					{
						primaryText: '中心商品',
						menuCode: 'goodsbase',
						router: 'goodsbase',
						originUrl: '/krspace_retail_web/retail/goods/goodsBase/toEGoodsBaseList?mid=78'
					}, 
					{
						primaryText: '社区商品',
						menuCode: 'goodscommunity',
						router: 'goodscommunity',
						originUrl: '/krspace_retail_web/retail/goods/goodsCommunity/toEGoodsCommunityList?mid=79'
					},

				]
			}, 
			{
				primaryText: '订单管理',
				iconName: 'icon-orderForm',
				iconColor: '#79859a',

				menuCode: 'ordersManager',
				router: 'ordersManager',
				menuItems: [
					{
						primaryText: '全部订单',
						menuCode: 'allOrders',
						router: 'allOrders',
						originUrl: '/krspace_retail_web/retail/orders/allOrders/toOrdersList?mid=81'
					}, 
					{
						primaryText: '社区订单',
						menuCode: 'communityOrders',
						router: 'communityOrders',
						originUrl: '/krspace_retail_web/retail/orders/communityOrders/toOrdersList?mid=82'
					}

				]
			}, 
			{
				primaryText: '系统信息',
				iconName: 'icon-system',
				iconColor: '#79859a',

				menuCode: 'sysmsgmanger',
				router: 'sysmsgmanger',
				menuItems: [
					{
						primaryText: '反馈信息',
						menuCode: 'user_submit_msg',
						router: 'user_submit_msg',
						originUrl: '/krspace_retail_web/retail/buyers/buyersfeedback/toBuyersFeedbackList?mid=86'
					}, 
					{
						primaryText: '推送人员',
						menuCode: 'add_manager',
						router: 'add_manager',
						originUrl: '/krspace_retail_web/retail/sys/sysPushPerson/toSysPushPersonList?mid=89'
					}, 
					{
						primaryText: '系统社区',
						menuCode: 'syscommunity',
						router: 'syscommunity',
						originUrl: '/krspace_retail_web/retail/sys/sysCommunity/toSysCommunityList?mid=76'
					}, 
					{
						primaryText: '参数配置',
						menuCode: 'retail_sysparamadmin',
						router: 'retail_sysparamadmin',
						originUrl: '/krspace_retail_web/sys/sysParam/toSysParamList?mid=54'
					},

				]
			}]
	}
]
