module.exports = [
    {
        primaryText: "项目管理",
        menuCode: 'bill',
        menuItems: [
            {
                primaryText: "项目管理",
                iconName: 'icon-money',
                iconColor: '#79859a',
                type: 'vue',
                menuItems: [
                    {
                        primaryText: "项目管理",
                        originUrl: '/bill/project-setting',
                        type: 'vue',
                        menuCode: 'pay_deal_flow_page',
                    }
                ]
            }

        ]
    }
]