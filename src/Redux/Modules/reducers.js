import *  as Company  from './Company/reducers';
import * as Demo from './Demo/reducers';


module.exports = Object.assign({},{
	...Company,
	...Demo
});



