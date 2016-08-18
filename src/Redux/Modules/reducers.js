import * as Calendar from  './Calendar/reducers';
import * as Company from  './Company/reducers';
import * as Demo from  './Demo/reducers';
import * as Notifiy from  './Notifiy/reducers';



module.exports = Object.assign({},{
...Calendar,
...Company,
...Demo,
...Notifiy,
})
