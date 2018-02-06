import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {KrField,Grid,Row,Button,ListGroup,ListGroupItem,Loading,Message} from 'kr-ui';
import './index.less';
import $ from 'jquery';
import {Http,DateFormat} from 'kr/Utils';
import State from './State';
import {
	observer
} from 'mobx-react';
@ observer
export default class EquipmentDetail extends React.Component{
	constructor(props){
		super(props);
		this.state={
			detail:{}
		}
	}

	componentDidMount(){
		let {detail} = this.props;

		this.setState({
			detail : detail
		})		
	}

	componentWillReceiveProps(nextProps){

		if (nextProps.detail.qrImgUrl !== this.props.detail.qrImgUrl) {
	      	this.setState({
	        	detail : nextProps.detail
	      	});
	    }

	}

	closeDialog=()=>{
		State.openFirstHardwareDetail= false;
	}

	productQRCode=()=>{
		let {prodoctQRCodeFun} = this.props;
		prodoctQRCodeFun && prodoctQRCodeFun();
	}



	render(){
		let {detail} = this.state;
		let {showReported,showDesired} = this.state;
		return (
			<div className="seconde-dialog">
				<img src={require("./images/closeIMG.svg")} className="close-dialog" onClick={this.closeDialog}/>
				<h1 style={{marginTop:"-10px"}}>设备信息</h1>
				<div className="detail-list-equipment" style={{paddingLeft:20}}>
					<KrField
						style={{width:800}}
						inline={true}
						component="labelText"
						label="硬件ID："
						value={detail.deviceId || "无"}
					/>
					<KrField
						style={{width:400}}
						inline={true}
						component="labelText"
						label="锁是否连接："
						value={detail.lockConnected?"是":"否"}
					/>

					<KrField
						style={{width:400}}
						inline={true}
						component="labelText"
						label="屏幕是否连接："
						value={detail.screenConnected?"是":"否"}
					/>

					<KrField
						style={{width:400}}
						inline={true}
						component="labelText"
						label="社区名称："
						value={detail.communityName || "无"}
					/>
					<KrField
						style={{width:400}}
						inline={true}
						component="labelText"
						label="楼层："
						value={detail.floor || "无"}
					/>
					<KrField
						style={{width:400}}
						inline={true}
						component="labelText"
						label="楼层："
						value={detail.floor || "无"}
					/>

					<KrField
						style={{width:400}}
						inline={true}
						component="labelText"
						label="房间："
						value={detail.roomName || "无"}
					/>
					<KrField
						style={{width:400}}
						inline={true}
						component="labelText"
						label="门类型："
						value={detail.doorTypeName || "无"}
					/>
					<KrField
						style={{width:400}}
						inline={true}
						component="labelText"
						label="屏幕展示标题："
						value={detail.title || "无"}
					/>
					<KrField
						style={{width:400}}
						inline={true}
						component="labelText"
						label="屏幕展示编号："
						value={detail.doorCode || "无"}
					/>
					<KrField
						style={{width:400}}
						inline={true}
						component="labelText"
						label="厂家："
						value={detail.makerName || "无"}
					/>
					<KrField
						style={{width:400}}
						inline={true}
						component="labelText"
						label="二维码有效期："
						value={DateFormat(detail.qrExpireAt, "yyyy-mm-dd HH:mm:ss") || "无"}
					/>
					<div style={{fontSize:14,paddingLeft:10,marginTop:10}}>
						<div className="td-left" style={{display:"inline-block",marginRight:6}}>二维码地址:</div>
						<div className="td-right" style={{display:"inline-block"}}>{detail.qrImgUrl || "无"}</div>
					</div>
					
					<div className="tr-line" style={{paddingLeft:5,marginTop:15}}>
						<div className="td-left" style={{width:50}}>二维码:</div>
						<div className="td-right" style={{paddingLeft:5}}>{detail.qrImgUrl?<img src={detail.qrImgUrl} style={{width:100,height:100}}/>:<span>无</span>}</div>
					</div>
					<div className="tr-line-last" style={{display:"block",paddingLeft:10}}><div className="td-left">备注:</div><div className="td-right">{detail.memo || "无"}</div></div>

				</div>
				<div className="btn-div">

					<div style={{display:"inline-block",marginRight:20}}><Button label="生成二维码" onTouchTap={this.productQRCode}/></div>
					<div style={{display:"inline-block"}}><Button label="关闭" onTouchTap={this.closeDialog}/></div>

				</div>
				
		  	</div>
		);
	}
}











