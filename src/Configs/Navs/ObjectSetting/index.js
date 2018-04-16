module.exports = [
    {
        primaryText: "项目管理",
        menuCode: 'pm_manage',
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
                        menuCode: 'pm_manage_list',
                    }
                ]
            }

        ]
    }
]