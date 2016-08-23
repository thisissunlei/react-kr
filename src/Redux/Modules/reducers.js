import * as Company from  './Company/reducers';
import * as Demo from  './Demo/reducers';
import * as Memo from  './Memo/reducers';
import * as Notifiy from  './Notifiy/reducers';
import * as Plan from  './Plan/reducers';



module.exports = {
...Company,
...Demo,
...Memo,
...Notifiy,
...Plan,
};
