import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {KrField,Grid,Row,Button,ListGroup,ListGroupItem,Loading} from 'kr-ui';
import './index.less';
import State from './State';
import {
	observer
} from 'mobx-react';
@ observer
export default class EquipmentDetail extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
		}
	}
	componentWillMount() {
	}

	componentWillReceiveProps(nextProps){
	}

	componentDidMount(){
	}
	closeDialog=()=>{
		State.openHardwareDetail= false;
	}
	
	render(){
		var params = Object.assign({},State.deviceVO);

		return (
			<div className="seconde-dialog">

				<img src={require("./images/closeIMG.svg")} className="close-dialog" onClick={this.closeDialog}/>
				<h1>设备信息</h1>
				<div className="detail-list-equipment">
					<dl>

						<dd>硬件ID:</dd><dt>{params.deviceId}</dt>
						<dd>底层固件版本:</dd><dt>{params.driverV}</dt>
						<dd>IP地址:</dd><dt>{params.ip}</dt>
						<dd>内存:</dd><dt>{params.mem}</dt>
						<dd>标记:</dd><dt>{params.name}</dt>
						<dd>存储容量:</dd><dt>{params.rom}</dt>
						<dd>sd卡容量:</dd><dt>{params.sd}</dt>
						<dd>APP版本:</dd><dt>{params.v}</dt>
						
					</dl>
				</div>
				<img src={require("./images/selectOne.svg")} className="end-img"/>
				<div className="btn-div">
					<Button label="关闭" onTouchTap={this.closeDialog}/>
				</div>
				
		  	</div>
		);
	}
}











