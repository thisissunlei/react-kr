
let initState = {

	companys: [
		{},
		{}
	],
	companys_fetch:{

	},
	sidebar_nav:{
		switch_value:true,
	},
	bottom_nav:{
		switch_value:false,
		anchor_el:undefined
	},
	calendar:{
		items:[
			{
				createAt:'2015-10-11',
				title:'出差办事'
			},
			{
				createAt:'2016-10-01',
				title:'国庆回家'
			},
			{
				createAt:'2015-10-01',
				title:'laal回家'
			},
			{
				createAt:'2015-10-01',
				title:'ahahalaal回家'
			},
			{
				createAt:'2015-10-01',
				title:'ahahal回家'
			}
		],
		now_date:"2016-10-01",
		now_trip:[
			{
				createAt:'2015-10-11',
				title:'出差办事'
			},
			{
				createAt:'2016-10-01',
				title:'国庆回家'
			},
			{
				createAt:'2016-10-01',
				title:'laal回家'
			}
		],
	},
	notify:{
		items:[],
	}

};


module.exports = initState;


