module.exports = [
	
		{
			primaryText: "智能硬件",
			router: 'smarthardware',
			originUrl: './#/smarthardware/doormanage/equipmentmanage',
			menuItems: [
					{
						primaryText: "门禁管理",
						iconName: 'icon-card',
						iconColor: '#79859a',
						router :'',
						menuItems: [
							{
								primaryText: '设备管理',
								menuCode: 'sysDeviceDefinitionList',
								router: '/smarthardware/doorManage/equipmentmanage',
							},{
								primaryText: '开门记录',
								menuCode: 'iot_door_open_log',
								router: '/smarthardware/doorManage/openlog',
								otherRouter : ['/smarthardware/doorManage/openlog/'],
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
					iconName: 'icon-card',
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
				iconName: 'icon-card',
				iconColor: '#79859a',
				router :'',
				menuItems: [
	
					{
						primaryText: '设备查询',
						menuCode: 'myCard',
						router: '/smarthardware/equipmentmanage/equipmentsearch',
					},{
						primaryText: 'IP冲突检测',
						menuCode: 'myCard',
						router: '/smarthardware/equipmentmanage/checkrepeatip',
					}
				]
		},
			],
		}
	]
	