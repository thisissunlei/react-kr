import * as Company from  './Company/reducers';
import * as Demo from  './Demo/reducers';
import * as Notifiy from  './Notifiy/reducers';
import * as Plan from  './Plan/reducers';



module.exports = Object.assign({},{
...Company,
...Demo,
...Notifiy,
...Plan,
})
