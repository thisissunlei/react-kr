// return  {
//     primaryText: "开发工具",
//     router: 'dev',
//     type: 'vue',
//     menuItems: [
//         {
//             primaryText: '后端工具',
//             iconName: 'icon-money',
//             iconColor: '#79859a',
//             type: 'vue',
//             menuItems: [
//                 {
                    primaryText: "数据监控",
                    router: 'management-tool/data-monitoring',
                    type: 'vue',
                    menuCode: 'pm_manage_list'
//                 }
//             ]
//         }

//     ]
// }
module.exports = [

	{
		primaryText: "开发工具",
        menuCode: 'dev',
        type: 'vue',
		menuItems: [
			{
               primaryText: '后端工具',
                iconName: 'icon-money',
                iconColor: '#79859a',
                type: 'vue',
                menuItems: [
                    
                    {
                        primaryText: "数据监控",
                        originUrl: '/management-tool/data-monitoring',
                        type: 'vue',
                        menuCode: 'pm_manage_list',
                    },
                ]
            }
        ]
	}

]
