import { observable ,action,asReference} from 'mobx';
    
class AdmitDetailStore {

  @observable user = null;

  constructor() {
	  this.user = 'hahah===>>>>';
  }


}

module.exports = new AdmitDetailStore();



