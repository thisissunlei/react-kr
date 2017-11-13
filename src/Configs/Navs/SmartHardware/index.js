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
						},
						{
							primaryText: '故障报警',
							menuCode: 'iot_device_alarm',
							router: '/smarthardware/doorManage/warning',
						},
						{
							primaryText: '升级包管理',
							menuCode: 'iot_upgrade_package',
							router: '/smarthardware/doorManage/upgrademanage',
						}
					]
			}, ],
	}
]
