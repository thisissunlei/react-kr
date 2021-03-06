//平面图
var Map = (function (window) {


    //画布上下文    
    var context;

    var stationNumber = 1;

    var defaultConfigs = {
        z: 1,
        scaleMax: 2,
        scaleMin: 0.1,
        scaleSpeed: 0.1,
    }

    //工位基本配置

    var defaultStation = {
        width: 30,
        height: 30,
        minWidth: 30,
        minHeight: 30,
        maxWidth: 200,
        maxHeight: 200,
        scaleSpeed: 20,
    }

    var isLoadImageError = false;

    var isEdit = true;
    var onRemoveCallback = function () { };

    var onScaleMapCallback = function () { };
    var onErrorCallback = function () { };

    var ready = function () { };

    //鼠标样式
    var mouseStyle;

    //操作类型 mouseMove 、stationMove、mapMove、stationHover、stationLeftTopScale、
    var operationType;
    var operationTypeConfigs = {
        'mapHover': {
            'style': 'move',
        },
        'stationMove': {
            'style': 'move',
        },
        'stationHover': {
            'style': 'pointer',
        },
        'stationLeftTopScale': {
            'style': 'nw-resize',
        },
        'stationLeftCenterScale': {
            'style': 'w-resize',
        },
        'stationLeftBottomScale': {
            'style': 'sw-resize',
        },
        'stationTopCenterScale': {
            'style': 'n-resize',
        },
        'stationRightTopScale': {
            'style': 'ne-resize',
        },
        'stationRightCenterScale': {
            'style': 'e-resize',
        },
        'stationRightBottomScale': {
            'style': 'se-resize',
        },
        'stationBottomCenterScale': {
            'style': 's-resize',
        },
    };


    //背景图Object

    var bkImageObject = null;

    //画布父本
    var element;
    //画布元素
    var canvas;

    //画布尺寸
    var width;
    var height;

    //工位
    var stationObjectArray = [];
    var dragStations = []; //拖拽中的工位


    //工位大小一致
    var stationToSame = false;

    //向什么方向放大
    var scaleStationDirection;


    //平移
    var translateX = 0;
    var translateY = 0;

    //缩放
    var scale = 1;

    //鼠标按下坐标
    var downPosition = {};
    //鼠标抬起坐标
    var upPosition = {};
    //鼠标移动坐标
    var movePosition = {};

    //右击菜单
    var contextMenu;


    //基础数据控制器
    const DB = (function () {

        var DEFAULTCONFIGS = {
            stations: [],
        }

        var CONFIGS = Object.assign({}, DEFAULTCONFIGS);

        return {
            reset: function () {
                 CONFIGS = {
                    stations:[]
                } 
            },
            getAllStation: function () {
                var stations = [].concat(CONFIGS.stations);
                return stations;
            },
            setAllStation: function (stations) {
                CONFIGS.stations = [].concat(stations);
            },
            findStationIndex: function (key) {
                var fdIndex;
                var stations = this.getAllStation();
                stations.map(function (station, index) {
                    if (station.key == key) {
                        fdIndex = index;
                    }
                });
                return fdIndex;
            },
            newStation: function (props) {
                props = Object.assign({}, props);
                var fdIndex = this.findStationIndex(props.key);
                if (typeof fdIndex === 'undefined') {
                    CONFIGS.stations.push(props);
                }
                return this;
            },
            removeStation: function (key) {

                //删除数据
                var stations = this.getAllStation();

                var fdIndex;
                stations.map(function (item, index) {
                    if (key == item.key) {
                        fdIndex = index;
                    }
                });

                if (typeof fdIndex === 'undefined') {
                    return;
                }

                stations.splice(fdIndex, 1);

                this.setAllStation(stations);

                var fdIndex;

                stationObjectArray.map(function (station, index) {
                    var props = station.getProps();
                    if (props.key == key) {
                        fdIndex = index;
                    }
                });

                if (typeof fdIndex === 'undefined') {
                    return;
                }

                stationObjectArray.splice(fdIndex, 1);

            },
            getStation: function (key) {
                var index = this.findStationIndex(key);
                var stations = this.getAllStation();
                var stationData = stations[index];
                return Object.assign({}, stationData);
            },
            setStation: function (key, nextProps) {

                var props = this.getStation(key);
                var index = this.findStationIndex(key);

                if(typeof index === 'undefined'){
                    return ;
                }

                props = Object.assign({}, props, nextProps);
                CONFIGS.stations.splice(index, 1, props);
                return this;
            },
            getImageUrl: function () {
                return CONFIGS.backgroundImageUrl;
            },
            setImageUrl: function (imageUrl) {
                CONFIGS.backgroundImageUrl = imageUrl;
            },
        };

    })();
    //每调用一次，生成一个新的station 并与DB进行关联
    const StationFactory = function (params) {

        params = params || {};

        stationNumber ++;
        defaultConfigs.z++;

        if (params.hasOwnProperty('scale')) {
            scale = scale;
        }

        if (params.hasOwnProperty('translateX')) {
            translateX = translateX;
        }

        if (params.hasOwnProperty('translateY')) {
            translateY = translateY;
        }


        //工位及会议室
        var StationObject = function (props) {

            var props = Object.assign({}, StationObject.defaultPropTypes, props);
            this.stashProps = Object.assign({}, StationObject.defaultPropTypes, props);

            this.componentWillReceiveProps(props);
        }

        //Station参数
        StationObject.defaultPropTypes = {
            x: 0,
            y: 0,
            z: defaultConfigs.z,
            width: defaultStation.width,
            height: defaultStation.height,
            name: 'demo',
            type: 'station',
            drag: false,
            checked: false,
            removed: false,
            key: stationNumber,
            status:1,
        }

        //获取props信息
        StationObject.prototype.getProps = function () {
            return Object.assign({},this.props);
        }

        //设置props信息 跟数据库进行关联
        StationObject.prototype.setProps = function (nextProps) {
            //设置到对象属性
            var props = Object.assign({}, this.props);

            props = Object.assign({}, this.props, nextProps);

            if (props.width <= defaultStation.minWidth) {
                props.width = defaultStation.minWidth;
            }

            if (props.height <= defaultStation.minHeight) {
                props.height = defaultStation.minHeight;
            }

            this.props = Object.assign({}, props);

            var fdIndex = DB.findStationIndex(props.key);

            if(typeof fdIndex === 'undefined'){
                DB.newStation(props);
            }
            //存入数据库
            DB.setStation(props.key, props);
        }

        StationObject.prototype.move = function (x, y) {
            var key = this.stashProps.key;
            var index = DB.findStationIndex(key);
            var nextProps = Object.assign({}, { key, x, y, drag: true });
            this.componentWillReceiveProps(nextProps);
        }

        //删除工位
        StationObject.prototype.remove = function () {
            const { key} = this.props;
            this.setProps({ removed: true });
            var stations = DB.getAllStation();

            DB.removeStation(key);

            stations = DB.getAllStation();

        }
        //更新工位坐标参数
        StationObject.prototype.componentWillReceiveProps = function (nextProps) {
            this.setProps(nextProps);
            this.render();
        }

        StationObject.prototype.saveProps = function () {
            this.stashProps = Object.assign({}, this.props);
        }

        StationObject.prototype.getStashProps = function () {
            return Object.assign({}, this.stashProps);
        }

        //绘制Station
        StationObject.prototype.render = function () {

            const { drag, checked, removed } = this.props;

            if (removed) {
                return;
            }

            const props = this.props;
            const widthOrHeight = MapFactory.transformWidthOrHeightToView(props.width, props.height);
            const width = widthOrHeight.width;
            const height = widthOrHeight.height;


            var position = this.getLeftTopPosition();
            position = MapFactory.transformPositionToView(position.x, position.y);

            //context.globalCompositeOperation = 'source-over';
            //绘制
            context.moveTo(position.x, position.y);
            context.beginPath();
            context.fillStyle = '#fff';
            context.fillRect(position.x, position.y, width, height);
            context.closePath();

            context.beginPath();
            context.font = 12 * scale + 'px';
            context.fillStyle = "#499df1";
            context.textAlign = 'center';
            context.fillText(this.props.name, position.x + width / 2, position.y + height / 2 + 5);
            context.closePath();

            if (drag) {
                this.drawDragStyle();
            }

            if (checked) {
                this.drawCheckedStyle();
            }

        }

        //会议室
        StationObject.prototype.isSpace = function(){
            const {type} = this.props;
            var isOK = false;
            if(type === 'SPACE'){
                isOK = true;
            }
            return isOK;
        }

        StationObject.prototype.isRemove = function(){
            const {removed} = this.props;
            return removed;
        }

        //工位
        StationObject.prototype.isStation = function(){
            const {type} = this.props;

            var isOK = false;
            if(type === 'STATION'){
                isOK = true;
            }
            return isOK;
        }

        StationObject.prototype.drawCheckedStyle = function () {

        }

        //拖拽样式
        StationObject.prototype.drawDragStyle = function () {

            const { x, y } = this.props;

            var props = this.props;

            var widthOrHeight = MapFactory.transformWidthOrHeightToView(props.width, props.height);
            var width = widthOrHeight.width;
            var height = widthOrHeight.height;


            var position = this.getLeftTopPosition();
            position = MapFactory.transformPositionToView(position.x, position.y);

            //左上角
            context.beginPath();
            context.arc(position.x, position.y, 3, 0, 2 * Math.PI);
            context.strokeStyle = '#000';
            context.stroke();
            context.closePath();

            context.beginPath();
            context.arc(position.x, position.y, 2, 0, 2 * Math.PI);
            context.fillStyle = '#3efe0b';
            context.fill();
            context.closePath();

            //左上线
            context.beginPath();
            context.moveTo(position.x + 4, position.y);
            context.lineTo(position.x + width / 2, position.y);
            context.strokeStyle = "#444";
            context.stroke();
            context.closePath();

            //右上线
            context.beginPath();
            context.moveTo(position.x + width / 2, position.y);
            context.lineTo(position.x + width, position.y);
            context.strokeStyle = "#444";
            context.stroke();
            context.closePath();

            //左下线
            context.beginPath();
            context.moveTo(position.x + 4, position.y + height);
            context.lineTo(position.x + width / 2, position.y + height);
            context.strokeStyle = "#444";
            context.stroke();
            context.closePath();

            //右下线
            context.beginPath();
            context.moveTo(position.x + width / 2, position.y + height);
            context.lineTo(position.x + width, position.y + height);
            context.strokeStyle = "#444";
            context.stroke();
            context.closePath();

            //左中上线
            context.beginPath();
            context.moveTo(position.x, position.y + 4);
            context.lineTo(position.x, position.y + height / 2);
            context.strokeStyle = "#444";
            context.stroke();
            context.closePath();

            //左中下线
            context.beginPath();
            context.moveTo(position.x, position.y + height / 2);
            context.lineTo(position.x, position.y + height);
            context.strokeStyle = "#444";
            context.stroke();
            context.closePath();

            //右中上线
            context.beginPath();
            context.moveTo(position.x + width, position.y + 4);
            context.lineTo(position.x + width, position.y + height / 2);
            context.strokeStyle = "#444";
            context.stroke();
            context.closePath();

            //右中下线
            context.beginPath();
            context.moveTo(position.x + width, position.y + height / 2);
            context.lineTo(position.x + width, position.y + height);
            context.strokeStyle = "#444";
            context.stroke();
            context.closePath();

            //右上角

            context.beginPath();
            context.arc(position.x + width, position.y, 3, 0, 2 * Math.PI);
            context.strokeStyle = '#000';
            context.stroke();
            context.closePath();

            context.beginPath();
            context.arc(position.x + width, position.y, 2, 0, 2 * Math.PI);
            context.fillStyle = '#3efe0b';
            context.fill();
            context.closePath();

            //右下角

            context.beginPath();
            context.arc(position.x + width, position.y + height, 3, 0, 2 * Math.PI);
            context.strokeStyle = '#000';
            context.stroke();
            context.closePath();

            context.beginPath();
            context.arc(position.x + width, position.y + height, 2, 0, 2 * Math.PI);
            context.fillStyle = '#3efe0b';
            context.fill();
            context.closePath();

            //左下角

            context.beginPath();
            context.arc(position.x, position.y + height, 3, 0, 2 * Math.PI);
            context.strokeStyle = '#000';
            context.stroke();
            context.closePath();

            context.beginPath();
            context.arc(position.x, position.y + height, 2, 0, 2 * Math.PI);
            context.fillStyle = '#3efe0b';
            context.fill();
            context.closePath();


            //上中角
            context.beginPath();
            context.arc(position.x + width / 2, position.y, 3, 0, 2 * Math.PI);
            context.strokeStyle = '#000';
            context.stroke();
            context.closePath();

            context.beginPath();
            context.arc(position.x + width / 2, position.y, 2, 0, 2 * Math.PI);
            context.fillStyle = '#3efe0b';
            context.fill();
            context.closePath();

            //下中角
            context.beginPath();
            context.arc(position.x + width / 2, position.y + height, 3, 0, 2 * Math.PI);
            context.strokeStyle = '#000';
            context.stroke();
            context.closePath();

            context.beginPath();
            context.arc(position.x + width / 2, position.y + height, 2, 0, 2 * Math.PI);
            context.fillStyle = '#3efe0b';
            context.fill();
            context.closePath();

            //左中角
            context.beginPath();
            context.arc(position.x, position.y + height / 2, 3, 0, 2 * Math.PI);
            context.strokeStyle = '#000';
            context.stroke();
            context.closePath();

            context.beginPath();
            context.arc(position.x, position.y + height / 2, 2, 0, 2 * Math.PI);
            context.fillStyle = '#3efe0b';
            context.fill();
            context.closePath();

            //右中角
            context.beginPath();
            context.arc(position.x + width, position.y + height / 2, 3, 0, 2 * Math.PI);
            context.strokeStyle = '#000';
            context.stroke();
            context.closePath();

            context.beginPath();
            context.arc(position.x + width, position.y + height / 2, 2, 0, 2 * Math.PI);
            context.fillStyle = '#3efe0b';
            context.fill();
            context.closePath();
        }

        StationObject.prototype.getCenterPosition = function () {
            const { x, y } = this.props;
            return { x, y };
        }

        //左上，根据中心点坐标转换成左上角坐标值
        StationObject.prototype.getLeftTopPosition = function () {
            var { x, y, width, height } = this.props;
            x = x - width / 2;
            y = y - height / 2;
            return { x, y };
        }

        //上中
        StationObject.prototype.getTopCenterPosition = function () {
            var { x, y, width, height } = this.props;
            y = y - height / 2;
            return { x, y };
        }



        //左中
        StationObject.prototype.getLeftCenterPosition = function () {
            var { x, y, width, height } = this.props;
            x = x - width / 2;
            return { x, y };
        }

        //左下
        StationObject.prototype.getLeftBottomPosition = function () {
            var { x, y, width, height } = this.props;
            x = x - width / 2;
            y = y + height / 2;
            return { x, y };
        }

        //下中
        StationObject.prototype.getBottomCenterPosition = function () {
            var { x, y, width, height } = this.props;
            y = y + height / 2;
            return { x, y };
        }

        //右上
        StationObject.prototype.getRightTopPosition = function () {
            var { x, y, width, height } = this.props;
            x = x + width / 2;
            y = y - height / 2;
            return { x, y };
        }

        //右下
        StationObject.prototype.getRightBottomPosition = function () {
            var { x, y, width, height } = this.props;
            x = x + width / 2;
            y = y + height / 2;
            return { x, y };
        }

        //右中
        StationObject.prototype.getRightCenterPosition = function () {
            var { x, y, width, height } = this.props;
            x = x + width / 2;
            return { x, y };
        }


        //在拖拽坐标点上
        StationObject.prototype.inScalePosition = function (mouseX, mouseY) {

            if (!this.hasPosition(mouseX, mouseY)) {
                return false;
            }

            var range = 6;

            var leftTop = this.getLeftTopPosition();
            var topCenter = this.getTopCenterPosition();
            var leftCenter = this.getLeftCenterPosition();
            var leftBottom = this.getLeftBottomPosition();
            var bottomCenter = this.getBottomCenterPosition();

            var rightTop = this.getRightTopPosition();
            var rightCenter = this.getRightCenterPosition();
            var rightBottom = this.getRightBottomPosition();

            //左上
            if (StationFactory.inRange(mouseX, leftTop.x, range) && StationFactory.inRange(mouseY, leftTop.y, range)) {
                scaleStationDirection = 'leftTop';
                operationType = 'stationLeftTopScale';
                return true;
            }

            //左中
            if (StationFactory.inRange(mouseX, leftCenter.x, range) && StationFactory.inRange(mouseY, leftCenter.y, range)) {
                scaleStationDirection = 'leftCenter';
                operationType = 'stationLeftCenterScale';
                return true;
            }

            //左下
            if (StationFactory.inRange(mouseX, leftBottom.x, range) && StationFactory.inRange(mouseY, leftBottom.y, range)) {
                scaleStationDirection = 'leftBottom';
                operationType = 'stationLeftBottomScale';
                return true;
            }

            //上中
            if (StationFactory.inRange(mouseX, topCenter.x, range) && StationFactory.inRange(mouseY, topCenter.y, range)) {
                scaleStationDirection = 'topCenter';
                operationType = 'stationTopCenterScale';
                return true;
            }

            //下中
            if (StationFactory.inRange(mouseX, bottomCenter.x, range) && StationFactory.inRange(mouseY, bottomCenter.y, range)) {
                scaleStationDirection = 'bottomCenter';
                operationType = 'stationBottomCenterScale';
                return true;
            }

            //右上
            if (StationFactory.inRange(mouseX, rightTop.x, range) && StationFactory.inRange(mouseY, rightTop.y, range)) {
                scaleStationDirection = 'rightTop';
                operationType = 'stationRightTopScale';
                return true;
            }

            //右中
            if (StationFactory.inRange(mouseX, rightCenter.x, range) && StationFactory.inRange(mouseY, rightCenter.y, range)) {
                scaleStationDirection = 'rightCenter';
                operationType = 'stationRightCenterScale';
                return true;
            }

            //右下
            if (StationFactory.inRange(mouseX, rightBottom.x, range) && StationFactory.inRange(mouseY, rightBottom.y, range)) {
                scaleStationDirection = 'rightBottom';
                operationType = 'stationRightBottomScale';
                return true;
            }

            return false;
        }

        StationObject.prototype.opration = function () {

            var move = Object.assign({}, movePosition);
            var down = Object.assign({}, downPosition);


            switch (scaleStationDirection) {
                case 'leftTop': {


                    var stashProps = this.getStashProps();
                    var scale = Math.sqrt(Math.pow(move.x - down.x, 2), Math.pow(move.y - down.y, 2));

                    scale = (move.y - down.y) > 0 ? -scale : scale;

                    var props = this.getProps();
                    props.width = stashProps.width + scale;
                    props.height = stashProps.height + scale;
                    props.drag = true;
                    this.componentWillReceiveProps(props);

                    break;
                }

                case 'leftCenter': {

                    var stashProps = this.getStashProps();
                    var scale = -(move.x - down.x);

                    var props = this.getProps();
                    props.width = stashProps.width + scale;
                    props.height = stashProps.height;

                    if (props.width > defaultStation.minWidth) {
                        props.x = stashProps.x - scale / 2;
                    }

                    props.drag = true;
                    this.componentWillReceiveProps(props);
                    break;
                }

                case 'leftBottom': {


                    var stashProps = this.getStashProps();
                    var scale = Math.sqrt(Math.pow(move.x - down.x, 2), Math.pow(move.y - down.y, 2));

                    scale = (move.y - down.y) > 0 ? scale : -scale;

                    var props = this.getProps();
                    props.width = stashProps.width + scale;
                    props.height = stashProps.height + scale;
                    props.drag = true;

                    this.componentWillReceiveProps(props);

                    break;
                }

                case 'rightTop': {

                    var stashProps = this.getStashProps();
                    var scale = Math.sqrt(Math.pow(move.x - down.x, 2), Math.pow(move.y - down.y, 2));

                    scale = (move.y - down.y) > 0 ? -scale : scale;
                    var props = this.getProps();
                    props.width = stashProps.width + scale;
                    props.height = stashProps.height + scale;
                    props.drag = true;
                    this.componentWillReceiveProps(props);
                    break;
                }

                case 'rightCenter': {

                    var stashProps = this.getStashProps();

                    var scale = move.x - down.x;

                    var props = this.getProps();
                    props.width = stashProps.width + scale;
                    props.height = stashProps.height;

                    if (props.width >= defaultStation.minWidth) {
                        props.x = stashProps.x + scale / 2;
                    }

                    props.drag = true;
                    this.componentWillReceiveProps(props);
                    break;
                }

                case 'rightBottom': {

                    var stashProps = this.getStashProps();
                    var scale = Math.sqrt(Math.pow(move.x - down.x, 2), Math.pow(move.x - down.x, 2));

                    scale = (move.y - down.y) > 0 ? scale : -scale;

                    var props = this.getProps();
                    props.width = stashProps.width + scale;
                    props.height = stashProps.height + scale;
                    props.drag = true;
                    this.componentWillReceiveProps(props);
                    break;
                }

                case 'topCenter': {

                    var stashProps = this.getStashProps();
                    var scale = -(move.y - down.y);

                    var props = this.getProps();
                    props.width = props.width;
                    props.height = stashProps.height + scale;

                    if (props.height >= defaultStation.minHeight) {
                        props.y = stashProps.y - scale / 2;
                    }
                    props.drag = true;
                    this.componentWillReceiveProps(props);
                    break;
                }

                case 'bottomCenter': {

                    var stashProps = this.getStashProps();
                    var scale = move.y - down.y;

                    var props = this.getProps();
                    props.width = props.width;
                    props.height = stashProps.height + scale;

                    if (props.height >= defaultStation.minHeight) {
                        props.y = stashProps.y + scale / 2;
                    }
                    props.drag = true;
                    this.componentWillReceiveProps(props);
                    break;
                }


                default: {
                    break;
                }
            }


        }

        //工位包涵相关坐标点
        StationObject.prototype.hasPosition = function (mouseX, mouseY) {

            const { width, height } = this.props;

            var loc = this.getLeftTopPosition();
            var minX = loc.x;
            var maxX = minX + width;

            var minY = loc.y;
            var maxY = minY + height;

            if (mouseX >= minX && mouseX <= maxX && mouseY >= minY && mouseY <= maxY) {
                return true;
            }

            return false;

        }

        //静态方法


        return new StationObject(params);
    }

    //判断一个数值在某个范围内
    StationFactory.inRange = function (x, num, range) {

        num = Math.ceil(Number(num));
        range = Math.ceil(Number(range));

        var min = Math.min(num - range, num + range);
        var max = Math.max(num - range, num + range);

        if (x >= min && x <= max) {
            return true;
        }

        return false;

    }



    const MapFactory = function (elementId, configs) {


        //平面构造器
        var MapObject = function (elementId, configs) {

            DB.reset();

            stationObjectArray = [];

            this.isComponentDidMout = false;
            this.readyCallback = function () { };


            element = document.getElementById(elementId);
            width = element.clientWidth;
            height = element.clientHeight;

            if (configs.hasOwnProperty('stationToSame')) {
                stationToSame = configs.stationToSame;
            }

            if (configs.hasOwnProperty('backgroundImageUrl')) {
                DB.setImageUrl(configs.backgroundImageUrl);
            }

            if (configs.hasOwnProperty('defaultStation')) {
                defaultStation = Object.assign({},defaultStation);
            }

            if (configs.hasOwnProperty('translateX')) {
                translateX = configs.translateX;
            }

            if (configs.hasOwnProperty('translateY')) {
                translateY = configs.translateY;
            }


            canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            element.appendChild(canvas);
            context = canvas.getContext('2d');



            var StationsData = configs.stations;

            StationsData.map(function (item, index) {
                var props = Object.assign({}, item);
                props.x = Number(props.x);
                props.y = Number(props.y);
                props.width = Number(props.width);
                props.height = Number(props.height);
                stationObjectArray.push(StationFactory(props));
            });

            this.loadImage();

        }

        MapObject.prototype.loadImage = function (imageUrl) {

            var self = this;
            imageUrl = imageUrl || DB.getImageUrl();


            if (!imageUrl) {
                isLoadImageError = true;
            }

            isLoadImageError = false;

            bkImageObject = new Image();
            bkImageObject.src = imageUrl;

            bkImageObject.onerror = function () {
                onErrorCallback && onErrorCallback('图片加载错误');
                isLoadImageError = true;
                self.render();
            }

            bkImageObject.onload = function () {
                self.render();
            }
        }


        MapObject.prototype.componentDidMount = function () {
            this.isComponentDidMout = true;
            this.registerEvents();
            this.readyCallback && this.readyCallback();
        }

        MapObject.prototype.setMouseStyle = function () {

            if (typeof operationType === 'undefined') {
                return;
            }

            var operation = operationTypeConfigs[operationType];

            element.style.cursor = operation.style;
        }

        //构造视图
        MapObject.prototype.render = function () {

            //重置
            canvas.width = width;

            //设置边界值
            this.calcMaxMin();
            //绘制背景图片
            this.drawImage();
            //绘制工位
            this.drawStations();

            this.setMouseStyle();



            if (!this.isComponentDidMout) {
                this.componentDidMount();
                return;
            }

        }


        //放大
        MapObject.prototype.onScaleMap = function (callback) {
            onScaleMapCallback = callback;
        }

        MapObject.prototype.onError = function (callback) {
            onErrorCallback = callback;
        }



        //绘制工位及会议室
        MapObject.prototype.drawStations = function () {

            if (stationObjectArray.length) {

                this.sortStation();

                stationObjectArray.map(function (station) {
                    if(!station.isRemove()){
                         station.render();
                    }
                });

                return;
            }


        }


        MapObject.prototype.cleanStationDragStyle = function () {
            var dragStations = this.getDragStations();
            dragStations.map(function (station) {
                station.setProps({ drag: false });
            });
            this.render();
        }

        MapObject.prototype.savePropsToStash = function(){

            this.stashProps = {
                translateX,
                translateY,
                scale
            }

        }

        MapObject.prototype.getStashProps = function(){
            return Object.assign({},this.stashProps);
        }


        MapObject.prototype.scaleMap = function (deltaY) {
            this.savePropsToStash();
            if (deltaY > 0) {
                scale += defaultConfigs.scaleSpeed;
            } else {
                scale -= defaultConfigs.scaleSpeed;
            }


            if (scale > defaultConfigs.scaleMax) {
                scale = defaultConfigs.scaleMax;
                scale = defaultConfigs.scaleMax;
            }

            if (scale <= defaultConfigs.scaleMin) {
                scale = defaultConfigs.scaleMin;
            }

            var stashProps = this.getStashProps();

            //translateX -= (scale+stashProps.scale) * canvas.width/2;
            //translateY -= (scale+stashProps.scale) * canvas.height/2;

            onScaleMapCallback && onScaleMapCallback(Math.abs(scale));

            this.render();

        }



        //创建canvas dom 完成
        MapObject.prototype.registerEvents = function () {

            var self = this;

            const ScaleMapEvent = function (event) {
                event.preventDefault();
                var deltaY = event.deltaY;
                self.scaleMap(deltaY);
                return false;
            }

            //放大工位
            const ScaleStationMoveEvent = function (event) {
                MapObject.setMovePosition(event);

                self.drawScaleStationMove();
                //self.drawDragStationMove();

                //添加监听相关事件回调函数
                canvas.addEventListener('mouseup', ScaleStationEndEvent, false);
            }

            const ScaleStationEndEvent = function (event) {
                MapObject.setUpPosition(event);
                //MapObject.setDownPosition(event);

                canvas.removeEventListener('mousemove', ScaleStationMoveEvent, false);

            }

            //拖拽工位-移动
            const DragStationMoveEvent = function (event) {
                MapObject.setMovePosition(event);
                self.drawDragStationMove();

                //添加监听相关事件回调函数
                canvas.addEventListener('mouseup', DragStationEndEvent, false);
            }

            //拖拽工位-结束
            const DragStationEndEvent = function (event) {
                MapObject.setUpPosition(event);

                //工位拖拽结束
                self.endDragStation();

                //取消相关事件回调函数
                canvas.removeEventListener('mouseup', DragStationEndEvent, false);
                canvas.removeEventListener('mousemove', DragStationMoveEvent, false);
            }

            //拖拽地图-移动
            const DragMapMoveEvent = function (event) {
                MapObject.setMovePosition(event);
                canvas.addEventListener('mouseup', DragMapEndEvent, false);
            }

            //拖拽地图-结束
            const DragMapEndEvent = function (event) {
                MapObject.setUpPosition(event);
                canvas.removeEventListener('mouseup', DragMapEndEvent, false);
                canvas.removeEventListener('mousemove', DragMapMoveEvent, false);

                //拖拽地图
                self.dragMap();
            }


            var MouseDownRightEvent = function (event) {
                MapObject.setDownPosition(event);
                // 鼠标右击事件
                //MapObject.contextMenu.create();

                //event.preventDefault()
            }


            //鼠标按下事件
            const MouseDownEvent = function (event) {
                MapObject.setDownPosition(event);

                //鼠标右击事件
                if (event.button === 2) {
                    document.addEventListener('contextmenu', MouseDownRightEvent, false);
                    return false;
                }
                //按下在工位上、添加拖拽工位事件

                if (self.isInStation(downPosition.x, downPosition.y)) {
                    self.setDragStationStyle(downPosition.x, downPosition.y);

                    //工位变成拖拽样式
                    self.startDragStation();
                    if (self.isInStationDragPosition(downPosition.x, downPosition.y)) {
                        canvas.addEventListener('mousemove', ScaleStationMoveEvent, false);
                    } else {
                        canvas.addEventListener('mousemove', DragStationMoveEvent, false);
                    }

                } else {

                    self.cleanStationDragStyle();

                    //TODO:取消事件 : 放大工位  是否有bug 未知，建议留意
                    canvas.removeEventListener('mousemove', ScaleStationMoveEvent, false);
                    canvas.removeEventListener('mousemove', DragStationMoveEvent, false);


                    //按下不在工位上、添加拖拽地图事件
                    canvas.addEventListener('mousemove', DragMapMoveEvent, false);
                }
                canvas.addEventListener('mouseup', MouseUpEvent, false);
                canvas.removeEventListener('mousemove', MouseMoveEvent, false);
            }

            //鼠标抬起事件
            const MouseUpEvent = function (event) {


                canvas.removeEventListener('mousemove', ScaleStationMoveEvent, false);
                canvas.removeEventListener('mousemove', ScaleStationEndEvent, false);

                canvas.removeEventListener('mousemove', DragStationMoveEvent, false);
                canvas.removeEventListener('mousemove', DragStationEndEvent, false);

                canvas.removeEventListener('mousemove', DragMapMoveEvent, false);
                canvas.removeEventListener('mousemove', DragMapEndEvent, false);

                canvas.removeEventListener('mouseup', MouseUpEvent, false);

                canvas.addEventListener('mousemove', MouseMoveEvent, false);

                MapObject.contextMenu.close();
            }

            const MouseMoveEvent = function (event) {
                MapObject.setMovePosition(event);

                if (self.isInStation(movePosition.x, movePosition.y)) {

                    if (self.isInStationDragPosition(movePosition.x, movePosition.y)) {

                    } else {
                        operationType = 'stationHover';
                    }

                } else {
                    operationType = 'mapHover';
                }
                self.render();

            }

            //输入内容
            const KeyUpEvent = function (event) {

                var keyCode = event.keyCode;

                switch (keyCode) {
                    // 删除键
                    case 8:
                        self.removeCheckedStation();
                        break;
                    case 46:
                        self.removeCheckedStation();
                        break;
                    default:
                        break;
                }
            }

            //mouseover
            const MouseOverEvent = function (event) {

                canvas.addEventListener('mousemove', MouseMoveEvent, false);

                document.addEventListener('keyup', KeyUpEvent, false);
                canvas.addEventListener('mouseleave', MouseLeaveEvent, false);
                window.addEventListener("mousewheel", ScaleMapEvent, false);

            }

            //鼠标离开canvas mouseleave
            const MouseLeaveEvent = function (event) {
                MapObject.setDownPosition(event);

                canvas.removeEventListener('mousemove', DragStationMoveEvent, false);
                canvas.removeEventListener('mousemove', DragMapMoveEvent, false);
                canvas.removeEventListener('mousemove', ScaleStationMoveEvent, false);

                canvas.removeEventListener('mouseup', MouseUpEvent, false);


                document.removeEventListener('keyup', KeyUpEvent, false);
                document.removeEventListener('contextmenu', MouseDownRightEvent, false);

                window.removeEventListener("mousewheel", ScaleMapEvent, false);
            }

            //鼠标按键
            canvas.addEventListener('mousedown', MouseDownEvent, false);

            //鼠标进入canvas
            canvas.addEventListener('mouseover', MouseOverEvent, false);


            document.addEventListener('keyup', KeyUpEvent, false);

        }


        MapObject.prototype.calcMaxMin = function () {



            /*
                        //平移
                        //translateX 和translateY 最大 最小值设定
                        var translateLeftMax = bkImageObject.width - width;
                        var tranlateRightMax = 100;
                        var translateUpMax = bkImageObject.height - height;
                        var tranlateDownMax = 100;
                        //左右
                        //限制向左移最大值
                        if (translateX < 0 && Math.abs(translateX) > translateLeftMax) {
                            translateX = -Math.abs(translateLeftMax);
                        }
                        //限制向右移动最大值
                        if (translateX > 0 && Math.abs(translateX) > tranlateRightMax) {
                            translateX = tranlateRightMax;
                        }
            
                                    //上下
                                    //限制向上移最大值
                                    if (translateY < 0 && Math.abs(translateY) > translateUpMax) {
                                        translateY = -Math.abs(translateUpMax);
                                    }
                                    //限制向下移动最大值
                                    if (translateY > 0 && Math.abs(translateY) > tranlateDownMax) {
                                        translateY = tranlateDownMax;
                                    }
                                    */


            //缩放

            if (scale > defaultConfigs.scaleMax) {
                scale = defaultConfigs.scaleMax;
                scale = defaultConfigs.scaleMax;
            }

            if (scale <= defaultConfigs.scaleMin) {
                scale = defaultConfigs.scaleMin;
            }

        }

        MapObject.prototype.drawImage = function () {

            if (isLoadImageError) {
                return;
            }

            var img = bkImageObject;
            context.beginPath();
            context.drawImage(img, translateX * scale, translateY * scale, img.width * scale, img.height * scale);
            context.closePath();
        }


        //在工位的放大坐标点上
        MapObject.prototype.isInStationDragPosition = function (x, y) {

            var dragStations = this.getDragStations();
            var isOK = false;
            dragStations.map(function (station) {
                if (station.inScalePosition(x, y)) {
                    isOK = true;
                }
            });

            return isOK;
        }


        MapObject.prototype.getDragStations = function () {

            var dragStations = [];
            var props = null;
            stationObjectArray.map(function (station) {
                props = station.getProps();
                if (props.drag) {
                    dragStations.push(station);
                }
            })
            return dragStations;
        }

        MapObject.prototype.setDragStationStyle = function (x, y) {

            //清空上次拖拽的工位
            this.cleanDragStations();

            stationObjectArray.sort(function (prev, next) {
                var prevProps = prev.getProps();
                var nextProps = next.getProps();
                return nextProps.z - prevProps.z;
            });

            var station = null;
            var props = null;

            for (var i = 0, len = stationObjectArray.length; i < len; i++) {
                station = stationObjectArray[i];
                if (station.hasPosition(x, y)) {
                    props = station.getProps();

                    if (!props.drag) {
                        props.drag = true;
                    }
                    props.z = defaultConfigs.z;

                    station.componentWillReceiveProps(props);
                    break;
                }
            }
            defaultConfigs.z++;

        }

        MapObject.prototype.sortStation = function () {
            stationObjectArray.sort(function (prev, next) {
                var prevProps = prev.getProps();
                var nextProps = next.getProps();
                return prevProps.z - nextProps.z;
            });
        }

        //点击在工位上
        MapObject.prototype.isInStation = function (x, y) {
            var station = null;
            var isOK = false;
            var props = null;

            for (var i = 0, len = stationObjectArray.length; i < len; i++) {
                station = stationObjectArray[i];
                if (station.hasPosition(x, y)) {
                    isOK = true;
                    break;
                }
            }
            return isOK;
        }

        //拖拽地图
        MapObject.prototype.dragMap = function () {

            var dragX = upPosition.x - downPosition.x;
            var dragY = upPosition.y - downPosition.y;

            var lx = Math.abs(dragX);
            var ly = Math.abs(dragY);
            var lmax = Math.max(lx, ly);

            //控制鼠标点击抖动导致拖拽
            if (lmax < 10) {
                return;
            }

            //计算平移单位
            translateX += upPosition.x - downPosition.x;
            translateY += upPosition.y - downPosition.y;

            this.render();
        }

        //工位拖拽-开始
        MapObject.prototype.startDragStation = function () {
            var dragStations = this.getDragStations();
            dragStations.map(function (station) {
                station.saveProps();
            });
        }

        //工位拖拽移动
        MapObject.prototype.moveDragStation = function () {
        }

        //工位拖拽-结束
        MapObject.prototype.endDragStation = function () {
            /*
            var dragStations = this.getDragStations();
            dragStations.map(function (station) {
                station.drawDragStyle();
            });
            */
        }

        //删除工位
        MapObject.prototype.removeStation = function(){

        }

        //删除已选中工位
        MapObject.prototype.removeCheckedStation = function () {

            var dragStations = this.getDragStations();
            if (!dragStations.length) {
                return;
            }

            var removeStations = [];
            var props;

            dragStations.map(function (station) {
                props = station.getProps();
                station.remove();
                removeStations.push(props);
            });

            var allStation = [];

           stationObjectArray =  stationObjectArray.filter(function (station) {
                var isOK = !station.isRemove();
                if(isOK){
                    allStation.push(station.getProps());
                }
                return isOK;
            });

             this.render();
            onRemoveCallback && onRemoveCallback(removeStations, allStation);
        }


        //重置选中的工位
        MapObject.prototype.cleanDragStations = function () {
            var dragStations = this.getDragStations();
            //清掉已经删除的工位对象
            dragStations = dragStations.filter(function (station) {
                return !station.removed;
            });

            /*
            dragStations.map(function(station){
                station.setProps({drag:false})
            });
            */

            this.render();
        }


        //拖拽工位时，生成一个拷贝工位
        MapObject.prototype.drawDragStationMove = function () {

            var dragStations = this.getDragStations();

            //设置其它工位的样式
            stationObjectArray.map(function (station) {
                station.setProps({ drag: false });
            });

            var lx = movePosition.x - downPosition.x;
            var ly = movePosition.y - downPosition.y;
            var move = {};

            var stashProps = null;

            dragStations.map(function (station, index) {
                stashProps = station.getStashProps();
                move.x = stashProps.x + lx;
                move.y = stashProps.y + ly;
                station.move(move.x, move.y);
            });

            this.render();
        }

        //放大工位时
        MapObject.prototype.drawScaleStationMove = function () {

            var move = Object.assign({}, movePosition);
            var activeStation = undefined;
            var self = this;
            var dragStations = this.getDragStations();

            dragStations.map(function (station, index) {
                station.opration(scaleStationDirection);
            });

            var targetStation = dragStations[0];
            var props = targetStation.getProps();

            if(targetStation.isStation()){
                 defaultStation.width = props.width;
                 defaultStation.height = props.height;
            }

            this.stationToSameAction();
            //放大
            this.render();
        }

        //准备好了
        MapObject.prototype.ready = function (callback) {
            this.readyCallback = callback;
        }

        MapObject.prototype.getCanvasElement = function () {
            return canvas;
        }

        MapObject.prototype.save = function (callback) {
            var params = {};
            params.translateX = translateX;
            params.translateY = translateY;
            params.scale = scale;
            params.stations = DB.getAllStation();
            callback && callback(params);
        }


        //销毁
        MapObject.prototype.destory = function () {
            stationObjectArray = [];
            bkImageObject = null;
			scale = 1;
			translateX = 0;
			translateY = 0;
            DB.reset();
            element.removeChild(canvas);
        }

        //创建新的工位
        MapObject.prototype.createStation = function (props) {

            var dragStations = this.getDragStations();

            if (!props) {
                return;
            }

            defaultConfigs.z++;

            if (stationToSame && props.type === 'STATION') {
                props.width = defaultStation.width;
                props.height = defaultStation.height;
            }

            props.z = defaultConfigs.z;

            var station = StationFactory(props);
            stationObjectArray.push(station);

        }

        MapObject.prototype.getCheckedAll = function () {

            var checkedAll = [];
            var props = {};

            stationObjectArray.map(function (station) {
                props = station.getProps();
                if (props.checked) {
                    checkedAll.push(props);
                }
            });

            return checkedAll;

        }

        MapObject.prototype.setBackgroundImage = function (file) {

            var self = this;

            scale = 1;
            translateX = 0;
            translateY = 0;

            var reader = new FileReader();
            reader.onloadend = function () {
                self.loadImage(reader.result);
            }
            reader.readAsDataURL(file);

        }

        MapObject.prototype.stationToSameAction = function () {

            var dragStations = this.getDragStations();

            if (!stationToSame) {
                return;
            }

            var width = defaultStation.width;
            var height = defaultStation.height;

            stationObjectArray.map(function (station) {
                var stationProps = station.getProps();
                if (station.isStation()) {
                    station.setProps({ width, height });
                }
            });

        }

        MapObject.prototype.onRemove = function (callback) {
            onRemoveCallback = callback;
        }

        MapObject.prototype.setStationToSame = function (value, callback) {
            stationToSame = value;
            this.stationToSameAction();
            this.render();
        }



        MapObject.prototype.setScale = function (scaleValue) {
            scale = scaleValue;
            this.render();
        }

        ///////////静态方法//////////////


        //设置鼠标抬起坐标
        MapObject.setUpPosition = function (event) {
            upPosition = MapObject.windowToCanvas(event);
        }

        //设置鼠标按下坐标
        MapObject.setDownPosition = function (event) {
            downPosition = MapObject.windowToCanvas(event);
        }
        //设置鼠标移动坐标
        MapObject.setMovePosition = function (event) {
            movePosition = MapObject.windowToCanvas(event);
        }

        //转换坐标
        MapObject.windowToCanvas = function (event) {

            var position = { x: 0, y: 0 };
            let bbox = {};
            bbox = canvas.getBoundingClientRect();

            var clientX = event.clientX;
            var clientY = event.clientY;

            position.x = clientX - bbox.left * (width / bbox.width);
            position.y = clientY - bbox.top * (height / bbox.height);

            position.x = (position.x < 0 ? Math.ceil(position.x) : Math.floor(position.x));
            position.y = (position.y < 0 ? Math.ceil(position.y) : Math.floor(position.y));

            return MapFactory.transformPositionToOrigin(position.x, position.y);

        };


        MapObject.canvasToWindow = function (x, y) {

            var position = { x: 0, y: 0 };
            let bbox = {};
            bbox = canvas.getBoundingClientRect();

            var clientX = x;
            var clientY = y;

            position.x = clientX + bbox.left / (width * bbox.width);
            position.y = clientY + bbox.top / (height * bbox.height);

            position.x = (position.x < 0 ? Math.ceil(position.x) : Math.floor(position.x));
            position.y = (position.y < 0 ? Math.ceil(position.y) : Math.floor(position.y));


            return MapFactory.transformPositionToView(position.x, position.y);
        }



        //鼠标右击
        MapObject.contextMenu = {

            create: function () {
                var html =
                    '<ul class="right-menu">' +
                    '<li>加载</li>' +
                    '<li>关闭</li>' +
                    '</ul>'
                var position = MapObject.canvasToWindow(downPosition.x, downPosition.y);
                if (typeof contextMenu === 'undefined') {
                    contextMenu = document.createElement('div');
                    contextMenu.id = 'contextMenu';
                    contextMenu.className = 'm-context-menu';
                    contextMenu.innerHTML = html;
                    element.appendChild(contextMenu);
                }
                contextMenu.style.left = position.x + 'px';
                contextMenu.style.top = position.y + 'px';
                contextMenu.style.display = 'block';

            },
            close: function () {
                if (typeof contextMenu === 'undefined') {
                    return;
                }
                contextMenu.style.display = 'none';

            }

        }

        return new MapObject(elementId, configs);
    }


    MapFactory.transformWidthOrHeightToView = function (w, h) {
        var width = Number(w) * scale;
        var height = Number(h) * scale;
        return { width, height };
    }

    MapFactory.transformWidthOrHeightToOrigin = function (w, h) {
        var width = Number(w) / scale;
        var height = Number(h) / scale;
        return { width, height };
    }

    //将原始坐标转换成到视野窗口坐标
    MapFactory.transformPositionToView = function (x, y) {
        var tx = (Number(x) + Number(translateX)) * scale;
        var ty = (Number(y) + Number(translateY)) * scale;
        return { x: tx, y: ty };
    }

    //将canvas坐标转换成原始坐标
    MapFactory.transformPositionToOrigin = function (x, y) {
        var tx = Number(x) / scale - Number(translateX);
        var ty = Number(y) / scale - Number(translateY);
        return { x: tx, y: ty };
    }

    //暴露接口,避免生活糜烂
    const exportMap = function () {
        this.map = MapFactory.apply(null, arguments);
    }


    //准备
    exportMap.prototype.ready = function () {
        this.map.ready.apply(this.map, arguments);
    }

    //更改数据
    exportMap.prototype.change = function () {
        this.map.change.apply(this, arguments);
    }

    exportMap.prototype.createStation = function () {

        var canvas = this.map.getCanvasElement();
        var box = canvas.getBoundingClientRect();
        var params = Object.assign({}, arguments[0]);
        params.x = Number(params.x) - Number(box.left);
        params.y = Number(params.y) - Number(box.top);

        var position = MapFactory.transformPositionToOrigin(params.x, params.y);
        params.x = position.x;
        params.y = position.y;

        this.map.createStation.call(this.map, params);
    }

    //重置
    exportMap.prototype.reset = function () {

    }
    //销毁
    exportMap.prototype.destory = function () {
        this.map.destory.apply(this.map);
    }

    //更新背景图片
    exportMap.prototype.setBackgroundImage = function () {
        this.map.setBackgroundImage.apply(this.map, arguments);
    }

    //保存
    exportMap.prototype.save = function () {
        this.map.save.apply(this.map, arguments);
    }

    //设置放大缩小
    exportMap.prototype.setScale = function () {
        this.map.setScale.apply(this.map, arguments);
    }

    //错误信息
    exportMap.prototype.onError = function () {
        this.map.onError.apply(this.map, arguments);
    }


    //设置工位大小一致
    exportMap.prototype.setStationToSame = function () {
        this.map.setStationToSame.apply(this.map, arguments);
    }

    //获取选中
    exportMap.prototype.getCheckedAll = function () {
        return this.map.getCheckedAll.apply(this.map, arguments);
    }

    exportMap.prototype.onRemove = function () {
        this.map.onRemove.apply(this.map, arguments);
    }

    exportMap.prototype.onScaleMap = function () {
        this.map.onScaleMap.apply(this.map, arguments);
    };

    return exportMap;


})(window);

module.exports=Map;