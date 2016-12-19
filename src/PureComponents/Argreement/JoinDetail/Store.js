import mobx,{ observable, action, asMap,computed ,extendObservable} from 'mobx';

let Store = observable({
    name:'张三',
    values:{},
    fields:{},
});


Store.reset = action(function(){
  
});
