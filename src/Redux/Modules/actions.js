import * as Calendar from  './Calendar/actions';
import * as Company from  './Company/actions';
import * as Demo from  './Demo/actions';
import * as Notifiy from  './Notifiy/actions';



module.exports = Object.assign({},{
...Calendar,
...Company,
...Demo,
...Notifiy,
})
