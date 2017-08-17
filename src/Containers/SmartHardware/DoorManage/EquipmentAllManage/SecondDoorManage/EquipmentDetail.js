import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {KrField,Grid,Row,Button,ListGroup,ListGroupItem,Loading} from 'kr-ui';
import './index.less';
import $ from 'jquery';
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
		let _this =this;
		$("#json-str-report").html(_this.syntaxHighlight(State.deviceVO.report));
		$("#json-str-desired").html(_this.syntaxHighlight(State.deviceVO.desired));
	}
	closeDialog=()=>{
		State.openHardwareDetail= false;
	}
	
	syntaxHighlight=(json)=>{
		json = JSON.parse(json);
	    if (typeof json != 'string') {
	        json = JSON.stringify(json, undefined, 2);
	    }
	    json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');
	    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function(match) {
	        var cls = 'number';
	        console.log("match",match);
	        if (/^"/.test(match)) {
	            if (/:$/.test(match)) {
	                cls = 'key';
	            } else {
	                cls = 'string';
	            }
	        } else if (/true|false/.test(match)) {
	            cls = 'boolean';
	        } else if (/null/.test(match)) {
	            cls = 'null';
	        }
	        return '<span class="' + cls + '">' + match + '</span>';
	    });
	}


	render(){
		var params = Object.assign({},State.deviceVO);

		return (
			<div className="seconde-dialog">

				<img src={require("./images/closeIMG.svg")} className="close-dialog" onClick={this.closeDialog}/>
				<h1>设备信息</h1>
				<div className="detail-list-equipment">
					<div>
						
						<div className="tr-line"><div className="td-left">硬件ID:</div><div className="td-right">{params.deviceId}</div></div>
						<div className="tr-line"><div className="td-left">底层固件版本:</div><div className="td-right">{params.driverV}</div></div>
						<div className="tr-line"><div className="td-left">IP地址:</div><div className="td-right">{params.ip}</div></div>
						<div className="tr-line"><div className="td-left">内存:</div><div className="td-right">{params.mem}</div></div>
						<div className="tr-line"><div className="td-left">标记:</div><div className="td-right">{params.name}</div></div>
						<div className="tr-line"><div className="td-left">存储容量:</div><div className="td-right">{params.rom}</div></div>
						<div className="tr-line"><div className="td-left">sd卡容量:</div><div className="td-right">{params.sd}</div></div>
						<div className="tr-line"><div className="td-left">APP版本:</div><div className="td-right">{params.v}</div></div>
						<div className="tr-line"><div className="td-left">APP版本:</div><div className="td-right">{params.v}</div></div>
						<div className="tr-line"><div className="td-left">设备上报信息:</div><div className="td-right"><pre id="json-str-report"></pre></div></div>
						<div className="tr-line"><div className="td-left">设备影子信息:</div><div className="td-right"><pre id="json-str-desired"></pre></div></div>
						
					</div>
				</div>
				<img src={require("./images/selectOne.svg")} className="end-img"/>
				<div className="btn-div">
					<Button label="关闭" onTouchTap={this.closeDialog}/>
				</div>
				
		  	</div>
		);
	}
}











