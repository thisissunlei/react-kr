//平面图
var Map = function (elementId, configs) {
    var movePositionArr = [];
    //画布上下文    
    var context;

    //画布父本
    var element;

    //画布元素
    var canvas;

    //画布尺寸
    var canvasWidth;
    var canvasHeight;


	var mapMenu;

    var stationNumber = 1;


    //操作类型
    var operationType;

    //背景图Object
    var bkImageObject = null;


    var defaultConfigs = {
        z: 1,
        isMode: 'edit',
        modes: ['edit', 'view', 'select'],
        isEditMode: function () {
            return this.isMode === 'edit';
        },
        isViewMode: function () {
            return this.isMode === 'view';
        },
        isSelectMode: function () {
            return this.isMode === 'select';
        },
        //工位状态
        stationStatus: {
            '1': {
                status: 'join',
                mark: '已入住',
                textColor: '#fff',
                backgroundColor: '#499df1',
            },
            '2': {
                status: 'admit',
                mark: '有意向',
                textColor: '#666',
                backgroundColor: '#eee',
            },
            '3':{
                status: 'checked',
                mark: '已选中',
                textColor: '#fff',
                backgroundColor: '#28c288',
            },
            '4':{
                status: 'notChecked',
                mark: '未选择',
                textColor: '#fff',
                backgroundColor: '#499df1',
            },
            '5':{
                status: 'default',
                mark: '默认',
                textColor: '#499df1',
                backgroundColor: '#ffffff',
            }
        },
        //地图信息
        map: {
			menuEnable:false,
            mouseEnable: false,
            deleteEnable: true,
            scaleEnable: true,
			rulerEnable:true,
            scale: 1,
            scaleMax: 2,
            scaleMin: 0.1,
            scaleSpeed: 0.1,
            translateX: 0,
            translateY: 0,
            isLoadImageError: false,
        },
        //工位信息
        station: {
            width: 30,
            height: 30,
            minWidth: 30,
            minHeight: 30,
            maxWidth: 200,
            maxHeight: 200,
            scaleSpeed: 20,
            //工位大小一致
            isToSameSize: true,
        },
        plugin: {
            onRemoveCallback: null,
            onScaleMapCallback: null,
            onCheckedStationCallback: null,

			//对立事件
            onHoverInStationCallback: null,
            onHoverOutStationCallback: null,

            onErrorCallback: null,
            onReadyCallback: null,
            onRenderMapCallback: null,
        },

        operationTypeConfigs: {
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

        }
    }


    //工位
    var stationObjectArray = [];

    //向什么方向放大
    var scaleStationDirection;

    var position = {
        //鼠标按下坐标
        down: {},
        //鼠标抬起坐标
        up: {},
        //鼠标移动坐标
        move: {}
    }

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
                    stations: []
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

                if (typeof index === 'undefined') {
                    return;
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

        stationNumber++;
        defaultConfigs.z++;

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
            width: defaultConfigs.station.width,
            height: defaultConfigs.station.height,
            name: 'demo',
            type: 'station',
            drag: false,
            checked: false,
            removed: false,
            key: stationNumber,
            status: 5,
			//开关，面向有对立事件的判断控制
			switchHoverIn:false,
        }


		//工位事件
		StationObject.prototype.onHoverIn = function(){

			const {onHoverInStationCallback} = defaultConfigs.plugin;

			var props = this.getProps();

			if(props.switchHoverIn){
				return ;
			}

			const bbox = canvas.getBoundingClientRect();
			const position = MapFactory.canvasToWindow(props.x + bbox.left, props.y + bbox.top);

			props.clientX = position.x;
			props.clientY = position.y;


			defaultConfigs.z++;

			this.setProps({
				switchHoverIn:true,
				z:defaultConfigs.z
			});

			onHoverInStationCallback && onHoverInStationCallback(props);
		}

		StationObject.prototype.onHoverOut = function(){

			const {onHoverOutStationCallback} = defaultConfigs.plugin;

			var props = this.getProps();

			if(!props.switchHoverIn){
				return ;
			}

			this.setProps({
				switchHoverIn:false
			});

			const bbox = canvas.getBoundingClientRect();
			const position = MapFactory.canvasToWindow(props.x + bbox.left, props.y + bbox.top);

			props.clientX = position.x;
			props.clientY = position.y;

			onHoverOutStationCallback && onHoverOutStationCallback(props);
		}


        //获取props信息
        StationObject.prototype.getProps = function () {
            return Object.assign({}, this.props);
        }

        //设置props信息 跟数据库进行关联
        StationObject.prototype.setProps = function (nextProps) {

            const { minWidth, minHeight } = defaultConfigs.station;

            //设置到对象属性
            var props = Object.assign({}, this.props);

            props = Object.assign({}, this.props, nextProps);

            if (props.width <= minWidth) {
                props.width = minWidth;
            }

            if (props.height <= minHeight) {
                props.height = minHeight;
            }

            this.props = Object.assign({}, props);

            var fdIndex = DB.findStationIndex(props.key);

            if (typeof fdIndex === 'undefined') {
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

            const { key } = this.props;
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

            const { drag, checked, removed, status } = this.props;

            if (removed) {
                return;
            }

            const props = this.props;

            var style = defaultConfigs.stationStatus[status];

            if (checked) {
                style = defaultConfigs.stationStatus[3];
            }

            const widthOrHeight = MapFactory.transformWidthOrHeightToView(props.width, props.height);
            const width = widthOrHeight.width;
            const height = widthOrHeight.height;


            var position = this.getLeftTopPosition();
            position = MapFactory.transformPositionToView(position.x, position.y);

            //绘制
            context.moveTo(position.x, position.y);
            context.beginPath();

            context.fillStyle = '#fff';

            if (typeof style === 'object' && style.hasOwnProperty('backgroundColor')) {
                context.fillStyle = style.backgroundColor;
            }

            context.fillRect(position.x, position.y, width, height);
            context.closePath();

            context.beginPath();
            context.font = 12 * defaultConfigs.map.scale + 'px';

            context.fillStyle = '#fff';

            if (typeof style === 'object' && style.hasOwnProperty('textColor')) {
                context.fillStyle = style.textColor;
            }

            context.textAlign = 'center';
            context.fillText(this.props.name, position.x + width / 2, position.y + height / 2 + 5);
            context.closePath();

            if (drag) {
                this.drawDragStyle();
            }


        }

        //会议室
        StationObject.prototype.isSpace = function () {
            const { type } = this.props;
            var isOK = false;
            if (type === 'SPACE') {
                isOK = true;
            }
            return isOK;
        }

        StationObject.prototype.toChecked = function () {
            var { checked, type, status, z } = this.props;

            if (status == 1 || status == 2) {
                return;
            }
            z = defaultConfigs.z;
            defaultConfigs.z++;
            checked = !checked;
            this.componentWillReceiveProps({ checked, z });

        }

        StationObject.prototype.isRemove = function () {
            const { removed } = this.props;
            return removed;
        }

        //工位
        StationObject.prototype.isStation = function () {
            const { type } = this.props;

            var isOK = false;
            if (type === 'STATION') {
                isOK = true;
            }
            return isOK;
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

            var move = Object.assign({}, position.move);
            var down = Object.assign({}, position.down);


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

                    if (props.width > defaultConfigs.station.minWidth) {
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

                    if (props.width >= defaultConfigs.station.minWidth) {
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

                    if (props.height >= defaultConfigs.station.minHeight) {
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

                    if (props.height >= defaultConfigs.station.minHeight) {
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

            canvasWidth = element.clientWidth;
            canvasHeight = element.clientHeight;

            if (configs.hasOwnProperty('stationToSame')) {
                defaultConfigs.station.isToSameSize = configs.stationToSame;
            }

            if (configs.hasOwnProperty('backgroundImageUrl')) {
                DB.setImageUrl(configs.backgroundImageUrl);
            }

            if (configs.hasOwnProperty('isMode')) {
                defaultConfigs.isMode = configs.isMode;
            }



			this.initializeModeConfigs();

            if (configs.hasOwnProperty('station')) {
                defaultConfigs.station = Object.assign({}, defaultConfigs.station, configs.station);
            }

            if (configs.hasOwnProperty('translateX')) {
                defaultConfigs.map.translateX = configs.translateX;
            }

            if (configs.hasOwnProperty('translateY')) {
                defaultConfigs.map.translateY = configs.translateY;
            }

            if (configs.hasOwnProperty('map')) {
                defaultConfigs.map = Object.assign({}, defaultConfigs.map, configs.map);
            }

            if (configs.hasOwnProperty('stationStatus')) {
                defaultConfigs.stationStatus = Object.assign({}, defaultConfigs.stationStatus, configs.stationStatus);
            }


            if (configs.hasOwnProperty('plugin')) {
                defaultConfigs.plugin = Object.assign({}, defaultConfigs.plugin, configs.plugin);
            }




            canvas = document.createElement('canvas');
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
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

		MapObject.prototype.initializeModeConfigs = function(){

			var {operationTypeConfigs} = defaultConfigs;

			//查看模式
			if(defaultConfigs.isViewMode()){
				defaultConfigs.map.deleteEnable = false;
				defaultConfigs.map.scaleEnable = true;
				defaultConfigs.map.mouseEnable = false;
				operationTypeConfigs.stationHover.style = 'auto';
			}

			//选择模式
			if(defaultConfigs.isSelectMode()){
				defaultConfigs.map.deleteEnable = false;
				defaultConfigs.map.scaleEnable = true;
				defaultConfigs.map.mouseEnable = false;
			}

			defaultConfigs.operationTypeConfigs  = Object.assign({},operationTypeConfigs);
		}


		MapObject.prototype.mapMenu = {
			element:null,
            create: function (plugin) {

                var html = `<div>
						<span data-type="left">左</span>
						<span data-type="up">上</span>
						<span data-type="right">右</span>
						<span data-type="down">下</span>
					</div>`;



                if (typeof mapMenu === 'undefined') {
                    mapMenu = document.createElement('div');
					//style
					mapMenu.style.position = 'absolute';
					mapMenu.style.width = '100px';
					mapMenu.style.height = '100px';
					mapMenu.style.right = '10px';
					mapMenu.style.top = '10px';
					mapMenu.style.border = '1px solid red';
					mapMenu.style.zIndex = 8;
                    mapMenu.innerHTML = html;

					var timer = null;
					mapMenu.addEventListener('mousedown',function(event){

						var targetEle = event.target;
						var type = targetEle.getAttribute('data-type');
						console.log('event',event.target,type);

						timer = window.setInterval(function(){

							switch(type){
							case 'up':{
								plugin.operationToTranslateUp();
								break;
							}

							case 'right':{
								plugin.operationToTranslateRight();
								break;
							}

							case 'down':{
								plugin.operationToTranslateDown();
								break;
							}

							case 'left':{
								plugin.operationToTranslateLeft();
								break;
							}
							}
						},200);

					});

					mapMenu.addEventListener('mouseup',function(event){
						window.clearInterval(timer);
					});

                    element.appendChild(mapMenu);

                }

                mapMenu.style.display = 'block';

            },
		}
			
        MapObject.prototype.loadImage = function (imageUrl) {


            var self = this;
            imageUrl = imageUrl || DB.getImageUrl();


            if (!imageUrl) {
                defaultConfigs.map.isLoadImageError = true;
            }

            defaultConfigs.map.isLoadImageError = false;

            bkImageObject = new Image();
            bkImageObject.src = imageUrl;

            bkImageObject.onerror = function () {

                defaultConfigs.plugin.onErrorCallback && defaultConfigs.plugin.onErrorCallback('图片加载错误');

                defaultConfigs.map.isLoadImageError = true;
                self.render();

            }

            bkImageObject.onload = function () {
                self.render();
            }
        }


        MapObject.prototype.componentDidMount = function () {

            const { readyCallback } = defaultConfigs.plugin;

            this.isComponentDidMout = true;
            this.registerEvents();

            readyCallback && readyCallback();

        }

        MapObject.prototype.setMouseStyle = function () {

            if (typeof operationType === 'undefined') {
                return;
            }

            const { operationTypeConfigs } = defaultConfigs;

            var operation = operationTypeConfigs[operationType];

            element.style.cursor = operation.style;

        }

        //清除
        MapObject.prototype.clear = function () {
            canvas.width = canvasWidth;
        }

		//标尺
		MapObject.prototype.drawMouserPosition = function(){

			const {mouseEnable} = defaultConfigs.map;

			if(!mouseEnable){
				return;
			}

			const {move} = position;

			const {x,y} = MapFactory.transformPositionToView(move.x,move.y);


			//横线
			context.beginPath();
			context.moveTo(x,0);
			context.strokeStyle = 'red';
			context.lineTo(x,canvasHeight);
			context.closePath();
			context.stroke();

			//竖线
			context.beginPath();
			context.moveTo(0,y);
			context.strokeStyle = 'red';
			context.lineTo(canvasWidth,y);
			context.closePath();
			context.stroke();
		}

		MapObject.prototype.operationToTranslateLeft = function(){
            defaultConfigs.map.translateX-= 50;
			this.render();
		}

		MapObject.prototype.operationToTranslateRight = function(){
            defaultConfigs.map.translateX+=50;
			this.render();
		}

		MapObject.prototype.operationToTranslateUp = function(){
            defaultConfigs.map.translateY-=50;
			this.render();
		}

      	MapObject.prototype.operationToTranslateDown = function(){
            defaultConfigs.map.translateY+=50;
			this.render();
		}


        //构造视图
        MapObject.prototype.render = function () {

			const {menuEnable} = defaultConfigs.map;


            //重置
            this.clear();

            //设置边界值
            this.calcMaxMin();
            //绘制背景图片
            this.drawImage();
            //绘制工位
            this.drawStations();

            this.setMouseStyle();

			this.drawMouserPosition();


			if(menuEnable){
				this.mapMenu.create(this);
			}

            if (!this.isComponentDidMout) {
                this.componentDidMount();
                return;
            }



            const { onRenderMapCallback } = defaultConfigs.plugin;
            onRenderMapCallback && onRenderMapCallback(canvas.toDataURL('image/jpeg'));


        }



        MapObject.prototype.onRenderMap = function (callback) {
            defaultConfigs.plugin.onRenderMapCallback = callback;
        }

        //放大
        MapObject.prototype.onScaleMap = function (callback) {
            defaultConfigs.plugin.onScaleMapCallback = callback;
        }

        MapObject.prototype.onCheckedStation = function (callback) {
            defaultConfigs.plugin.onCheckedStationCallback = callback;
        }

        MapObject.prototype.onHoverInStation = function (callback) {
            defaultConfigs.plugin.onHoverInStationCallback = callback;
        }

        MapObject.prototype.onHoverOutStation = function (callback) {
            defaultConfigs.plugin.onHoverOutStationCallback = callback;
        }


        MapObject.prototype.onError = function (callback) {
            defaultConfigs.plugin.onErrorCallback = callback;
        }



        //绘制工位及会议室
        MapObject.prototype.drawStations = function () {

            if (stationObjectArray.length) {

                this.sortStation();

                stationObjectArray.map(function (station) {
                    if (!station.isRemove()) {
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

        MapObject.prototype.savePropsToStash = function () {

            const { translateX, translateY, scale } = defaultConfigs.map;

            this.stashProps = {
                translateX,
                translateY,
                scale
            }

        }

        MapObject.prototype.getStashProps = function () {
            return Object.assign({}, this.stashProps);
        }


        MapObject.prototype.scaleMap = function (deltaY) {
            this.savePropsToStash();

            const { scaleSpeed, scaleMax, scaleMin } = defaultConfigs.map;

            const { onScaleMapCallback } = defaultConfigs.plugin;

            if (deltaY > 0) {
                defaultConfigs.map.scale += scaleSpeed;
            } else {
                defaultConfigs.map.scale -= scaleSpeed;
            }


            if (defaultConfigs.map.scale > scaleMax) {
                defaultConfigs.map.scale = scaleMax;
                defaultConfigs.map.scale = scaleMax;
            }

            if (defaultConfigs.map.scale <= scaleMin) {
                defaultConfigs.map.scale = scaleMin;
            }

            var stashProps = this.getStashProps();

			/*
            defaultConfigs.map.translateX -= (scale) * canvas.width/2;
            defaultConfigs.map.translateY -= (scale) * canvas.height/2;
			*/


            onScaleMapCallback && onScaleMapCallback(Math.abs(defaultConfigs.map.scale));

            this.render();

        }



        //创建canvas dom 完成
        MapObject.prototype.registerEvents = function () {

            var self = this;

            const { scaleEnable } = defaultConfigs.map;

            const ScaleMapEvent = function (event) {
                event.preventDefault();
                var deltaY = event.deltaY;
                self.scaleMap(deltaY);
                return false;
            }

            //放大工位
            const ScaleStationMoveEvent = function (event) {
                MapFactory.setMovePosition(event);

                self.drawScaleStationMove();
                //self.drawDragStationMove();

                //添加监听相关事件回调函数
                canvas.addEventListener('mouseup', ScaleStationEndEvent, false);
            }

            const ScaleStationEndEvent = function (event) {
                MapFactory.setUpPosition(event);
                //MapObject.setDownPosition(event);
                canvas.removeEventListener('mousemove', ScaleStationMoveEvent, false);
            }

            //拖拽工位-移动
            const DragStationMoveEvent = function (event) {
                MapFactory.setMovePosition(event);
                self.drawDragStationMove();

                //添加监听相关事件回调函数
                canvas.addEventListener('mouseup', DragStationEndEvent, false);
            }

            //拖拽工位-结束
            const DragStationEndEvent = function (event) {
                MapFactory.setUpPosition(event);

                //工位拖拽结束
                self.endDragStation();

                //取消相关事件回调函数
                canvas.removeEventListener('mouseup', DragStationEndEvent, false);
                canvas.removeEventListener('mousemove', DragStationMoveEvent, false);
            }

            //拖拽地图-移动
            const DragMapMoveEvent = function (event) {
                MapFactory.setMovePosition(event);
                movePositionArr.push(position.move);
                let start = movePositionArr[0];
                let end = movePositionArr[movePositionArr.length - 1];
                if(Math.abs(start.x-end.x)>=1||Math.abs(start.y-end.y)>=1){
                    self.dragMap();
                }

                canvas.addEventListener('mouseup', DragMapEndEvent, false);
                // MapFactory.setMovePosition(event);
                // canvas.addEventListener('mouseup', DragMapEndEvent, false);
            }

            //拖拽地图-结束
            const DragMapEndEvent = function (event) {
                MapFactory.setUpPosition(event);
                canvas.removeEventListener('mouseup', DragMapEndEvent, false);
                canvas.removeEventListener('mousemove', DragMapMoveEvent, false);
                movePositionArr = [];
                //拖拽地图
                // self.dragMap();
            }


            var MouseDownRightEvent = function (event) {
                MapFactory.setDownPosition(event);
                // 鼠标右击事件
                //MapObject.contextMenu.create();

                //event.preventDefault()
            }


            //鼠标按下事件
            const MouseDownEvent = function (event) {
                MapFactory.setDownPosition(event);

                const { down } = position;

                //鼠标右击事件
                if (event.button === 2) {
                    document.addEventListener('contextmenu', MouseDownRightEvent, false);
                    return false;
                }
                //按下在工位上、添加拖拽工位事件

                if (self.isInStation(down.x, down.y)) {

                    if (defaultConfigs.isSelectMode()) {
                        self.setCheckedStationStyle(down.x, down.y);
                        return;
                    }

                    self.setDragStationStyle(down.x, down.y);

                    //工位变成拖拽样式
                    self.startDragStation();
                    if (self.isInStationDragPosition(down.x, down.y)) {
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
                MapFactory.setMovePosition(event);

                const { move } = position;

                self.judgeHoverInStation(move.x, move.y);

                if (self.isInStation(move.x, move.y)) {


                    if (self.isInStationDragPosition(move.x, move.y)) {

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


                if (scaleEnable) {
                    window.addEventListener("mousewheel", ScaleMapEvent, false);
                }

            }

            //鼠标离开canvas mouseleave
            const MouseLeaveEvent = function (event) {
                MapFactory.setDownPosition(event);

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

            if (scaleEnable) {
                window.addEventListener("mousewheel", ScaleMapEvent, false);
            }



        }


        MapObject.prototype.calcMaxMin = function () {



			/*
			//平移
			//translateX 和translateY 最大 最小值设定
			var translateLeftMax = bkImageObject.width - canvasWidth;
			var tranlateRightMax = 100;
			var translateUpMax = bkImageObject.height - canvasHeight;
			var tranlateDownMax = 100;
			//左右
			//限制向左移最大值
			if (defaultConfigs.map.translateX < 0 && Math.abs(defaultConfigs.map.translateX) > translateLeftMax) {
			defaultConfigs.map.translateX = -Math.abs(translateLeftMax);
			}
			//限制向右移动最大值
			if (defaultConfigs.map.translateX > 0 && Math.abs(defaultConfigs.map.translateX) > tranlateRightMax) {
			defaultConfigs.map.translateX = tranlateRightMax;
			}

			//上下
			//限制向上移最大值
			if (defaultConfigs.map.translateY < 0 && Math.abs(defaultConfigs.map.translateY) > translateUpMax) {
			defaultConfigs.map.translateY = -Math.abs(translateUpMax);
			}
			//限制向下移动最大值
			if (defaultConfigs.map.translateY > 0 && Math.abs(defaultConfigs.map.translateY) > tranlateDownMax) {
			defaultConfigs.map.translateY = tranlateDownMax;
			}
			 */


            //缩放

            if (defaultConfigs.map.scale > defaultConfigs.map.scaleMax) {
                defaultConfigs.map.scale = defaultConfigs.map.scaleMax;
                defaultConfigs.map.scale = defaultConfigs.map.scaleMax;
            }

            if (defaultConfigs.map.scale <= defaultConfigs.map.scaleMin) {
                defaultConfigs.map.scale = defaultConfigs.map.scaleMin;
            }

        }

        MapObject.prototype.drawImage = function () {

            const { isLoadImageError } = defaultConfigs.map;

            if (isLoadImageError) {
                return;
            }

            var img = bkImageObject;
            context.beginPath();
            context.drawImage(img, defaultConfigs.map.translateX * defaultConfigs.map.scale, defaultConfigs.map.translateY * defaultConfigs.map.scale, img.width * defaultConfigs.map.scale, img.height * defaultConfigs.map.scale);
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

		//根据z属性，排序
		MapObject.prototype.sortStationObjectArray = function(){
            stationObjectArray.sort(function (prev, next) {
                var prevProps = prev.getProps();
                var nextProps = next.getProps();
                return nextProps.z - prevProps.z;
            });
		}

        MapObject.prototype.setCheckedStationStyle = function (x, y) {

            //查看模式
            if (defaultConfigs.isEditMode()) {
                return;
            }

			this.sortStationObjectArray();

            var station = null;
            var props = null;

            var targetProps = {};

            for (var i = 0, len = stationObjectArray.length; i < len; i++) {
                station = stationObjectArray[i];
                if (station.hasPosition(x, y)) {
                    station.toChecked();
                    targetProps = station.getProps();
                    break;
                }
            }

            const { onCheckedStationCallback } = defaultConfigs.plugin;

            const checkedAll = this.getCheckedAll();

            onCheckedStationCallback && onCheckedStationCallback(targetProps, checkedAll);

        }

        MapObject.prototype.setDragStationStyle = function (x, y) {

            if (!defaultConfigs.isEditMode()) {
                return;
            }

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

        //hover
        MapObject.prototype.judgeHoverInStation = function (x, y) {

            const { onHoverInStationCallback } = defaultConfigs.plugin;

            var station = null;
            var isOK = false;
            var props = null;

			this.sortStationObjectArray();

            for (var i = 0, len = stationObjectArray.length; i < len; i++) {
                station = stationObjectArray[i];

                if (station.hasPosition(x, y)) {
					station.onHoverIn();
                    isOK = true;
                }else{
					station.onHoverOut();
				}
            }

        }

        //拖拽地图
        MapObject.prototype.dragMap = function () {

            let start = movePositionArr[0];
            let end = movePositionArr[movePositionArr.length - 1];

            var dragX = end.x - start.x;
            var dragY = end.y - start.y;

            var lx = Math.abs(dragX);
            var ly = Math.abs(dragY);
            var lmax = Math.max(lx, ly);

            //控制鼠标点击抖动导致拖拽
            if (lmax < 10) {
                return;
            }

            //计算平移单位
            defaultConfigs.map.translateX += (end.x - start.x)*2.5;
            defaultConfigs.map.translateY += (end.y - start.y)*2.5;

            this.render();
            movePositionArr = [];
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
        MapObject.prototype.removeStation = function () {

        }

        //删除已选中工位
        MapObject.prototype.removeCheckedStation = function () {

			const {deleteEnable} = defaultConfigs.map;

			if(!deleteEnable){
				return ;
			}

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

            stationObjectArray = stationObjectArray.filter(function (station) {
                var isOK = !station.isRemove();
                if (isOK) {
                    allStation.push(station.getProps());
                }
                return isOK;
            });

            this.render();
            defaultConfigs.plugin.onRemoveCallback && defaultConfigs.plugin.onRemoveCallback(removeStations, allStation);
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

            if (!defaultConfigs.isEditMode()) {
                return;
            }

            var dragStations = this.getDragStations();

            //设置其它工位的样式
            stationObjectArray.map(function (station) {
                station.setProps({ drag: false });
            });

            var lx = position.move.x - position.down.x;
            var ly = position.move.y - position.down.y;
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

            if (!defaultConfigs.isEditMode()) {
                return;
            }

            const { move } = position;

            var activeStation = undefined;
            var self = this;

            var dragStations = this.getDragStations();

            dragStations.map(function (station, index) {
                station.opration(scaleStationDirection);
            });

            var targetStation = dragStations[0];
            var props = targetStation.getProps();

            if (targetStation.isStation()) {
                defaultConfigs.station.width = props.width;
                defaultConfigs.station.height = props.height;
            }

            this.stationToSameAction();
            //放大
            this.render();
        }

        //准备好了
        MapObject.prototype.ready = function (callback) {
            defaultConfigs.plugin.readyCallback = callback;
        }

        MapObject.prototype.getCanvasElement = function () {
            return canvas;
        }

        MapObject.prototype.save = function (callback) {
            var params = {};
            params.translateX = defaultConfigs.map.translateX;
            params.translateY = defaultConfigs.map.translateY;
            params.scale = defaultConfigs.map.scale;
            params.stations = DB.getAllStation();
            callback && callback(params);
        }


        //销毁
        MapObject.prototype.destory = function () {

            stationObjectArray = [];
            bkImageObject = null;

            defaultConfigs.map.scale = 1;
            defaultConfigs.map.translateX = 0;
            defaultConfigs.map.translateY = 0;

            DB.reset();
            //StationFactory = null;
            element.removeChild(canvas);
        }

        //创建新的工位
        MapObject.prototype.createStation = function (props) {

            var dragStations = this.getDragStations();

            const { width, height, isToSameSize } = defaultConfigs.station;

            if (!props) {
                return;
            }

            defaultConfigs.z++;

            if (isToSameSize && props.type === 'STATION') {
                props.width = width;
                props.height = height;
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

            defaultConfigs.map.scale = 1;
            defaultConfigs.map.translateX = 0;
            defaultConfigs.map.translateY = 0;

            var reader = new FileReader();
            reader.onloadend = function () {
                self.loadImage(reader.result);
            }
            reader.readAsDataURL(file);

        }

        MapObject.prototype.stationToSameAction = function () {

            var dragStations = this.getDragStations();

            if (!defaultConfigs.station.isToSameSize) {
                return;
            }

            const { width, height } = defaultConfigs.station;

            stationObjectArray.map(function (station) {
                var stationProps = station.getProps();
                if (station.isStation()) {
                    station.setProps({ width, height });
                }
            });

        }

        MapObject.prototype.onRemove = function (callback) {
            defaultConfigs.plugin.onRemoveCallback = callback;
        }

        MapObject.prototype.setStationToSame = function (value, callback) {
            defaultConfigs.station.isToSameSize = value;
            this.stationToSameAction();
            this.render();
        }



        MapObject.prototype.setScale = function (scaleValue) {
            defaultConfigs.map.scale = scaleValue;
            this.render();
        }


        ///////////静态方法//////////////

        //鼠标右击
        MapObject.contextMenu = {

            create: function () {
                var html =
                    '<ul class="right-menu">' +
                    '<li>加载</li>' +
                    '<li>关闭</li>' +
                    '</ul>'
                var position = MapObject.canvasToWindow(position.down.x, position.down.y);
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

    //设置鼠标抬起坐标
    MapFactory.setUpPosition = function (event) {
        position.up = MapFactory.windowToCanvas(event);
    }

    //设置鼠标按下坐标
    MapFactory.setDownPosition = function (event) {
        position.down = MapFactory.windowToCanvas(event);
    }
    //设置鼠标移动坐标
    MapFactory.setMovePosition = function (event) {
        position.move = MapFactory.windowToCanvas(event);
    }


    //转换坐标
    MapFactory.windowToCanvas = function (event) {

        var position = { x: 0, y: 0 };
        let bbox = {};
        bbox = canvas.getBoundingClientRect();

        var clientX = event.clientX;
        var clientY = event.clientY;

        position.x = clientX - bbox.left * (canvasWidth / bbox.width);
        position.y = clientY - bbox.top * (canvasHeight / bbox.height);

        position.x = (position.x < 0 ? Math.ceil(position.x) : Math.floor(position.x));
        position.y = (position.y < 0 ? Math.ceil(position.y) : Math.floor(position.y));

        return MapFactory.transformPositionToOrigin(position.x, position.y);

    };


    MapFactory.canvasToWindow = function (x, y) {

        var position = { x: 0, y: 0 };
        let bbox = {};
        bbox = canvas.getBoundingClientRect();

        var clientX = x;
        var clientY = y;

        position.x = clientX + bbox.left / (canvasWidth * bbox.width);
        position.y = clientY + bbox.top / (canvasHeight * bbox.height);

        position.x = (position.x < 0 ? Math.ceil(position.x) : Math.floor(position.x));
        position.y = (position.y < 0 ? Math.ceil(position.y) : Math.floor(position.y));


        return MapFactory.transformPositionToView(position.x, position.y);
    }


    MapFactory.transformWidthOrHeightToView = function (w, h) {

        const { scale } = defaultConfigs.map;

        const width = Number(w) * scale;
        const height = Number(h) * scale;

        return { width, height };
    }

    MapFactory.transformWidthOrHeightToOrigin = function (w, h) {

        const { scale } = defaultConfigs.map;

        const width = Number(w) / scale;
        const height = Number(h) / scale;

        return { width, height };
    }

    //将原始坐标转换成到视野窗口坐标
    MapFactory.transformPositionToView = function (x, y) {

        const { translateX, translateY, scale } = defaultConfigs.map;

        const tx = (Number(x) + Number(translateX)) * scale;
        const ty = (Number(y) + Number(translateY)) * scale;

        return { x: tx, y: ty };
    }

    //将canvas坐标转换成原始坐标
    MapFactory.transformPositionToOrigin = function (x, y) {

        const { translateX, translateY, scale } = defaultConfigs.map;

        var tx = Number(x) / scale - Number(translateX);
        var ty = Number(y) / scale - Number(translateY);

        return { x: tx, y: ty };
    }


    const map = MapFactory(elementId, configs);

    //暴露接口
    return  {
        ready: function () {
            map.ready.apply(map, arguments)
        },
        change: function () {
        },
        setScale: function () {
            map.setScale.apply(map, arguments)
        },
        onError: function () {
            map.onError.apply(map, arguments)
        },
        setStationToSame: function () {
            map.setStationToSame.apply(map, arguments)
        },
        save: function () {
            map.save.apply(map, arguments)
        },
        destory: function () {
            map.destory.apply(map, arguments)
        },
        setBackgroundImage: function () {
            map.setBackgroundImage.apply(map, arguments)
        },
        getCheckedAll: function () {
            map.getCheckedAll.apply(map, arguments)
        },
        onRemove: function () {
            map.onRemove.apply(map, arguments)
        },
        onScaleMap: function () {
            map.onScaleMap.apply(map, arguments)
        },
        onCheckedStation: function () {
            map.onCheckedStation.apply(map, arguments)
        },
        onHoverInStation: function () {
            map.onHoverInStation.apply(map, arguments)
        },
        onHoverOutStation: function () {
            map.onHoverOutStation.apply(map, arguments)
        },
        onRenderMap: function () {
            map.onRenderMap.apply(map, arguments)
        },
        createStation: function () {

            var canvas = map.getCanvasElement();
            var box = canvas.getBoundingClientRect();

            var params = Object.assign({}, arguments[0]);

            params.x = Number(params.x) - Number(box.left);
            params.y = Number(params.y) - Number(box.top);

            var position = MapFactory.transformPositionToOrigin(params.x, params.y);

            params.x = position.x;
            params.y = position.y;

            map.createStation(params);
        },
    }
};

module.exports=Map;