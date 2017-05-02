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

	onStationVosChange=(index,type, value)=>{

		
		State.stationVos[index][type] = value;
	}
	positionChange=(index, value,type)=>{
		console.log(index, value,type)

	}
	onBlur=(item)=>{
		console.log('onblur',item)
	}
	onChange=()=>{
		console.log('onChange');
	}
	onPositionChange=(type,value)=>{
		State.position[type]= value;
		
	}
	addUrl=(result,index)=>{
		console.log(result,index)
	}
	typeLink=(type)=>{
		let typeLink = {
			value: State.stationVos[index].type,
			requestChange: this.onStationVosChange.bind(null, index,type)
		}

		return typeLink
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
		console.log('内容',State.position)

		return (
			    <div style={{background: '#fff'}}>
			    	{list && list.map((item,index)=>{	
			    		return (
			    			<div>
			    				<input type="text" name="age"  valueLink={this.typeLink.bind(this,'name')} onBlur={this.onBlur.bind(this,item)}/>
			    				<input type="text" name="age"  valueLink={this.typeLink.bind(this,'phone')} onBlur={this.onBlur.bind(this,item)}/>
			    				<input type="text" name="age" valueLink={this.typeLink.bind(this,'email')} onBlur={this.onBlur.bind(this,item)}/>
			    				{item.type}
			    			</div>	
			    		)
			    	})}
			    	


			    	<div className="info-box">
			    		<AdvancedQuery defaultUrl={defaultUrl} onChange={this.addUrl} index={1}/>
			    		
						<div className="info-list">
							<span className="info-input" style={{border:'none',lineHeight:'36px',display:'inline-block',marginTop:'-10px',marginBottom:'3px'}}>社区负责任人</span>
			    			<input type="text" name="name" className="info-input" valueLink={typeLinkName}  placeholder='请输入姓名'/>
			    			<input type="text" name="telephone" className="info-input" valueLink={typeLinkPhone}  placeholder='请输入电话号码'/>
			    			<input type="text" name="email" className="info-input"  valueLink={typeLinkEmail}  placeholder='请输入邮箱'/>
						</div>
			    	</div>
				</div>
		);

	}

}
