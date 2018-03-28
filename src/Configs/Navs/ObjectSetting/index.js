module.exports = [
    {
        primaryText: "项目管理",
        router: 'finance',
        type: 'vue',
        menuItems: [
            {
                primaryText: "项目管理",
                iconName: 'icon-money',
                iconColor: '#79859a',
                type: 'vue',
                menuItems: [
                    {
                        primaryText: "项目管理",
                        router: 'bill/projectSetting',
                        type: 'vue',
                        menuCode: 'pay_deal_flow_page'
                    }
                ]
            }

        ]
    }
]