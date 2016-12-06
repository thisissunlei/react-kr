//日期格式工具
import shallowequal from 'shallowequal';

export function ShallowEqual(props,nextProps){

    if(typeof props !== 'object' || typeof nextProps !== 'object'){
        return false;
    }
    
    return shallowequal(props,nextProps);
}
