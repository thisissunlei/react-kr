import React, {
	Component
} from 'react';
import {
	Field,
	reduxForm
} from 'redux-form';
import Notify from '../../Notify';
import ReactDOM from 'react-dom';
import './index.less';
import refresh from "./images/location.svg";
import {Actions,Store} from 'kr/Redux';
import WrapComponent from '../WrapComponent';



export default class MapComponent extends Component {
	static defaultProps = {
		
	}
	static PropTypes = {
		className: React.PropTypes.string
	}
	constructor(props,context){
		super(props,context);
		this.state={
			
		}
	}
	componentWillUnmount() {
		
	}
	componentDidMount() {
		// 百度地图API功能
		var map = new BMap.Map("mapComponent");    // 创建Map实例
		map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
		map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
		map.enableScrollWheelZoom(true);
	}
	componentWillReceiveProps(nextProps){
	}
	
	
	render() {
		let {placeholder,style,...other} = this.props;
		// let {operateImg} = this.state;
		
		return(
      		<div style={style} className="ui-map-component">
				<input type="text" placeholder={placeholder} style={{width:"100%",height:"100%"}}/>
				<div id="mapComponent" ></div>
			</div>
      	
		);
	}
}
