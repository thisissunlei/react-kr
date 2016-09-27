import { observable ,action,asReference} from 'mobx';
    
/*
let store =  observable({
    firstName: "Clive Staples",
    lastName: "Lewis",
});

store.setFirstName = action(function reset() {
    store.firstName = 0;
});
*/

class AdmitDetailStore {

  @observable user = null;
  @observable csrfToken = null;
  @observable presInfo = asReference({});
  @observable fid = null;

  constructor() {

	  this.user = 'hahah===>>>>';
  }


}

module.exports = new AdmitDetailStore();



