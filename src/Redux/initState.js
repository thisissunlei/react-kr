
let initState = {

	companys: [
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
	plan:{
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
				createAt:'2016-08-01',
				title:'ahahal回家'
			},
			{
				createAt:'2016-08-27',
				title:'ahahal回家'
			},
			{
				createAt:'2016-08-25',
				title:'氪空间重构'
			},
			{
				createAt:'2016-08-25',
				title:'融资小伙伴'
			},
			{
				createAt:'2016-08-25',
				title:'回家'
			},
			{
				createAt:'2016-08-28',
				title:'ahahal回家'
			},
		],
		now_date:+new Date(),
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
		items:[
			{
				content:'请注意，那里有人',
				createAt:'',
			},
			{
				content:'请注意，那里有人',
				createAt:'',
			},
			{
				content:'请注意，那里有人',
				createAt:'',
			},
			{
				content:'请注意，那里有人',
				createAt:'',
			},
			{
				content:'注意啦',
				createAt:'',
			}
		],
	}
};


module.exports = initState;


