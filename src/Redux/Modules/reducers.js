import * as Company from  './Company/reducers';
import * as Demo from  './Demo/reducers';
import * as Memo from  './Memo/reducers';
import * as Notifiy from  './Notifiy/reducers';
import * as Plan from  './Plan/reducers';
import * as Navs from  './Navs/reducers';

import { reducer as formReducer } from 'redux-form'


module.exports = {
...Company,
...Demo,
...Memo,
...Notifiy,
...Plan,
...Navs,
 form: formReducer  
};
