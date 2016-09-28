import { observable ,action,asReference} from 'mobx';
    
class AdmitDetailStore {

  @observable user = null;
  @observable csrfToken = null;
  @observable presInfo = asReference({});
  @observable fid = null;
  @observable basic = asReference({});


  constructor() {
	  this.user = 'hahah===>>>>';
  }


}

module.exports = new AdmitDetailStore();



