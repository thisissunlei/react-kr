import * as Company from  './Company/actions';
import * as Demo from  './Demo/actions';
import * as Notifiy from  './Notifiy/actions';
import * as Plan from  './Plan/actions';



module.exports = Object.assign({},{
...Company,
...Demo,
...Notifiy,
...Plan,
})
