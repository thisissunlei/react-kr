import mobx,{ observable, action, asMap,computed ,extendObservable} from 'mobx';

let State = observable({
    values:{},
    fields:{},
    initialValues:{},
    syncErrors:{},
    validations:{}
});

//action
State.reset = action(function(){


});

module.exports = State;
