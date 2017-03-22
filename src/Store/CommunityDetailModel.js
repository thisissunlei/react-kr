import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';

import {Http} from 'kr/Utils';

//全局store
let State = observable({
  detail:{

  },
  orders:[]
});

State.getDetail = action(function(params) {
  Http.callAPI('demo').then(function(response) {
    /*
    var citys = response;
    extendObservable(_this,{
      citys:citys
    });
    */
  });
});

module.exports = State;
