import React from 'react';
import {
	Title,
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	SearchForms,
	Dialog,
	Message,
	DivTitle,
} from 'kr-ui';
import {
	observer
} from 'mobx-react';
import {Actions,Store} from 'kr/Redux';
import './index.less';
import ReactMixin from "react-mixin";
import AdvancedQuery from './AdvancedQuery';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import State from './State';

@observer
@ReactMixin.decorate(LinkedStateMixin)

export default class MaChaoYue extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);

	}

	onStationVosChange=(type,index,value)=>{
		let item = State.stationVos[index]
		console.log(State.stationVos,State.stationVos[index],item[type],index,type,value)

		item[type]= value;
		// State.stationVos[index][type] = value;
	}
	positionChange=(index, value,type)=>{
		console.log(index, value,type)

	}
	onBlur=(item)=>{
		console.log('onblur',State.stationVos)
	}
	onChange=()=>{
		console.log('onChange');
	}
	onPositionChange=(type,value)=>{
		State.position[type]= value;
		
	}
	addUrl=(result,index)=>{
		State.stationVos[index].headerUrl = result;
	}
	addArr=()=>{
		let item = {
			unitprice:'111',
			name:'',
			phone:'',
			email:'',
			headerUrl:''
		};
		State.stationVos.push(item);
		console.log(State.stationVos.length)

	}
	reduceArr=(index)=>{
		State.stationVos.splice(index,1);
	}

	
	render() {
		let _this = this;
		let list = State.stationVos;
		let typeLinkName = {
			value: State.position.name,
			requestChange: _this.onPositionChange.bind(null,'name')
		}
		let typeLinkPhone = {
			value: State.position.phone,
			requestChange: _this.onPositionChange.bind(null,'phone')
		}
		let typeLinkEmail = {
			value: State.position.email,
			requestChange: _this.onPositionChange.bind(null,'email')
		}
		let defaultUrl = "http://krspace-upload-test.oss-cn-beijing.aliyuncs.com/device_definition_unzip/201705/Z/142000354_925.jpg";
		console.log('内容',State.stationVos,State.stationVos.length)

		return (
			    <div style={{background: '#fff',width:'750px'}}>
			    <div>基本信息</div>
			    <DivTitle index={1} title='进本信息'>
			    	{list && list.map((item,index)=>{	
			    		let typeLinkNameList = {
							value: State.stationVos[index].name,
							requestChange: _this.onStationVosChange.bind(null,'name',index)
						}
						let typeLinkPhoneList = {
							value: State.stationVos[index].phone,
							requestChange: _this.onStationVosChange.bind(null,'phone',index)
						}
						let typeLinkEmailList = {
							value: State.stationVos[index].email,
							requestChange: _this.onStationVosChange.bind(null,'email',index)
						}
			    		return (
			    			<div className="info-box">
					    		<AdvancedQuery defaultUrl={item.headerUrl} onChange={this.addUrl} index={index}/>
					    		
								<div className="info-list">
									<span className="info-input" style={{border:'none',lineHeight:'36px',display:'inline-block',marginTop:'-10px',marginBottom:'3px'}}>社区负责任人</span>
					    			<input type="text" name="name" className="info-input" valueLink={typeLinkNameList}  placeholder='请输入姓名'/>
					    			<input type="text" name="telephone" className="info-input" valueLink={typeLinkPhoneList}  placeholder='请输入电话号码'/>
					    			<input type="text" name="email" className="info-input"  valueLink={typeLinkEmailList}  placeholder='请输入邮箱'/>
								</div> 
								<div className="caozuo">
									<span className="add-info-box" onClick={this.addArr}>+</span>
									{State.stationVos.length>1 && <span className="less-info-box"  onClick={this.reduceArr.bind(this,index)}>-</span>}
								</div>
					    	</div>

			    		)
			    	})}
			    	
			    	
				</DivTitle>
				<DivTitle index={1} title='进本信息'>

				fsdsdfsdfsdf
				dasdasdasd
				dasdasd
				</DivTitle>
				</div>
		);

	}

}
