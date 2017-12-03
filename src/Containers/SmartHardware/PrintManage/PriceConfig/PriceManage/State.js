

import mobx, {
	observable,
	action,
} from 'mobx';


let State = observable({
	openNewCreate:false,
	openEditDialog:false,
	openConfirmDelete:false,

});



module.exports = State;






