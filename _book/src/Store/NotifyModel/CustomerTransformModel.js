import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';

//全局store
let State = observable({
    searchParams:{
      page: 1,
      pageSize: 15,
      createDateEnd:'',
      createDateStart:'',
      other:false
    }
});

State.setSearchParams = action(function(params) {
    this.searchParams = params;
});

module.exports = State;