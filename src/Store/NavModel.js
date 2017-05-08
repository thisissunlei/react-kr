import mobx, {
	observable,
	action,
	extendObservable
} from 'mobx';

import Navs from 'kr/Configs/Navs';

//全局store
let State = observable({
	...Navs
});


//列表数据请求
State.getNavs=action(function(){
	return mobx.toJS(this.items);
});

module.exports = State;
