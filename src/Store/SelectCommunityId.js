import mobx, {
	observable,
} from 'mobx';

//全局store
let State = observable({
	 communityId:''
});


module.exports = State;
