import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable
} from 'mobx';
import {
	Message
} from "kr-ui";
import {Http} from "kr/Utils";
import {Actions,Store} from 'kr/Redux';
//全局store
let State = observable({
    searchParams:{
        sourceType:'',
        wspicHeight:'',
        wspicWidth:'',
        wsenabled:'true',
        wsfile:"",
        wstext:'',
        wsfloat:"",
        wsheight:'',
        wsbtnEnabled:"true",
        wspicFile:"",
        wsPicEnabled:"true",
        sourceOrgin:'',
        wsradio:""
    },
    oldDetail:{}
    
});



module.exports = State;
