module.exports = [

		{
			primaryText: "智能硬件",
			router: 'smarthardware',
			originUrl: './#/smarthardware/doormanage/equipmentmanage',
			menuItems: [
					{
						primaryText: "门禁管理",
						iconName: 'icon-placket-manage',
						iconColor: '#79859a',
						router :'',
						menuItems: [
							{
								primaryText: '设备管理',
								menuCode: 'sysDeviceDefinitionList',
								router: '/smarthardware/doorManage/equipmentmanage',
							},{
								primaryText: "开门记录",
								originUrl: '/smarthardware/openlog',
								type: 'vue',
								menuCode: 'iot_door_open_log',
								// otherRouter : ['/smarthardware/doorManage/openlog/'],
							},
							{
								primaryText: '故障报警',
								menuCode: 'iot_device_alarm',
								router: '/smarthardware/doorManage/warning',
								otherRouter : ['/smarthardware/doorManage/warning/'],

							},
							{
								primaryText: '升级管理',
								menuCode: 'iot_upgrade_package',
								router: '/smarthardware/doorManage/upgrademanage',
							},
							{
								primaryText: "门禁级联关系",
								originUrl: '/doorrelationship/map',
								type: 'vue',
								menuCode: 'door_relation',
							}
						]
				}, {
						primaryText: "打印管理",
						iconName: 'icon-card',
						iconColor: '#79859a',
						router :'',
						menuItems: [
							{
								primaryText: '打印机管理',
								menuCode: 'printer_manage',
								router: '/smarthardware/printmanage/equipmentmanage',
							},{
								primaryText: '社区打印配置',
								menuCode: 'print_community_config',
								router: '/smarthardware/printmanage/printerconfig',
							},
							{
								primaryText: '费用配置',
								menuCode: 'print_price_config',
								router: '/smarthardware/printmanage/priceconfig',
							},
							{
								primaryText: '打印记录',
								menuCode: 'print_record',
								router: '/smarthardware/printmanage/printlog',
							}
						]
				},{
					primaryText: "中央控制管理",
					iconName: 'icon-central-control',
					iconColor: '#79859a',
					router :'',
					menuItems: [

						{
							primaryText: '设备管理',
							menuCode: 'gateway_list',
							router: '/smarthardware/centercontrolmanage/equipmentmanage',
						},{
							primaryText: '操作记录',
							menuCode: 'gateway_click_list',
							router: '/smarthardware/centercontrolmanage/operatelog',
						}
					]
			},{
				primaryText: "设备管理",
				iconName: 'icon-equipment-manage',
				iconColor: '#79859a',
				router :'',
				menuItems: [

					{
						primaryText: '设备查询',
						menuCode: 'device_deploy_search',
						router: '/smarthardware/equipmentmanage/equipmentsearch',
					},{
						primaryText: 'IP冲突检测',
						menuCode: 'device_ip_detection',
						router: '/smarthardware/equipmentmanage/checkrepeatip',
					}
				]
		    },{
                primaryText: "空间管理",
                iconName: 'icon-space-manage',
                iconColor: '#79859a',
                router :'',
                menuItems: [
                    {
                        primaryText: '空间管理',
                        menuCode: 'basic_space',
                        type:'vue',
                        originUrl: '/smart-hardware/space-manage',
                    },
                ]
              },
			],
		}
	]

