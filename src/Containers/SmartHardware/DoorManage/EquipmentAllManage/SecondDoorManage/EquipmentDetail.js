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
		
		return (
			<div className="seconde-dialog">

				<img src={require("./images/closeIMG.svg")} className="close-dialog" onClick={this.closeDialog}/>
				<h1>设备信息</h1>
				<div className="detail-list-equipment">
					<dl>
						<dd>硬件ID</dd><dt>13242245</dt>
						<dd>硬件ID</dd><dt>13242245</dt>
						<dd>硬件ID</dd><dt>13242245</dt>
						<dd>硬件ID</dd><dt>13242245</dt>
						<dd>硬件ID</dd><dt>13242245</dt>
						<dd>硬件ID</dd><dt>13242245</dt>
						<dd>硬件ID</dd><dt>13242245</dt>
						<dd>硬件ID</dd><dt>13242245</dt>
						<dd>硬件ID</dd><dt>13242245</dt>
						<dd>硬件ID</dd><dt>13242245</dt>
						<dd>硬件ID</dd><dt>13242245</dt>
						<dd>硬件ID</dd><dt>13242245</dt>
						<dd>硬件ID</dd><dt>13242245</dt>
						<dd>硬件ID</dd><dt>13242245</dt>
						
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











