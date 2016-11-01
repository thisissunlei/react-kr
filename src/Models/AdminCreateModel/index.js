import {observable, autorun, action} from "mobx";

module.exports = observable({

	customerList:[],
    paymentList:[],
    payTypeList:[],
    floorList:[],
    billList:[],

    get labelText() {
        return 'haha'; 
    },

    setAge: action(function() {

    })

});


