import * as Types from './types';

export function navs(state = {},action){

	switch(action.type){
		//用户navs
		case Types.SET_USER_NAVS:{
			return {...state,items:action.response};
		}
		case Types.SET_NAVS_CURRENT_CHILD_ROUTER:{
			return {...state,current_child:action.router};
		}

		case Types.SET_NAVS_CURRENT_PARENT_ROUTER:{
			return {...state,current_parent:action.router};
		}

		case Types.SET_NAVS_CURRENT_ROUTER:{
			return {...state,current_router:action.router};
		}

		case Types.SET_NAVS_ACTIVITY:{

			const items = state.items;
			var router = action.router;

			items.forEach(function(item,index){
				if(item.router && item.router ==  router){
					item.active = true;
				}else{
					item.active = false;
				}
			});

			return {...state,items};
		}

		case Types.SET_NAVS_CURRENT_ITEMS:{
			const items = state.items;
			var router = action.router;

			const currentItem = items.filter(function(item,index){
				return item.router && item.router ==  router;
			}).pop() ||{menuItems:[]};

			const children = currentItem.menuItems ||[];

			return {...state,current_items:children};
		}

		case Types.SET_NAVS_CURRENT_ITEM_ACTIVE:{
			return {...state};
		}

		default:{
			return state;
		}

	}
}















