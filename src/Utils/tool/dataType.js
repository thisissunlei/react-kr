function dataType(data) {
    var dom = Object.prototype.toString.call(data);
    switch (dom) {
        case '[object String]':
            return 'string';
            break;
        case '[object Number]':
            return 'number';
            break;
        case '[object Boolean]':
            return 'boolean';
            break;
        case '[object Symbol]':
            return 'symbol';
            break;
        case '[object Undefined]':
            return 'undefined';
            break;
        case '[object Null]':
            return 'null';
            break;
        case '[object Function]':
            return 'function';
            break;
        case '[object Date]':
            return 'date';
            break;
        case '[object Array]':
            return 'array';
            break;
        case '[object RegExp]':
            return 'regExp';
            break;
        case '[object Error]':
            return 'error';
            break;
        /**
         * dom节点类型
        */
        case '[object HTMLDocument]':
            return 'node';
            break;
        case '[object global]':
            return 'global';
            break;
    }
}
export default dataType;