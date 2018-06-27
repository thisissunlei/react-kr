module.exports = [
	{
		primaryText: "开发工具",
        menuCode: 'pm_manage',
		menuItems: [
			{
                primaryText: '后端工具',
                iconName: 'icon-money',
                iconColor: '#79859a',
                type: 'vue',
                menuItems: [
                    {
                        primaryText: "订单数据监控",
                        originUrl: '/management-tool/data-monitoring',
                        type: 'vue',
                        menuCode: 'order_validate_list',
                    },
                ]
            }
        ]
	}
]
