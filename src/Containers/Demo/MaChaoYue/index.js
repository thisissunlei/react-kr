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
import {Actions,Store} from 'kr/Redux';
import './index.less';
import ReactMixin from "react-mixin";
import AdvancedQuery from './AdvancedQuery';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
@ReactMixin.decorate(LinkedStateMixin)

export default class MaChaoYue extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);
		this.state= {
			stationVos:[{type:'负责人1',unitprice:''},{type:'负责人2',unitprice:''}],
			position:{
				name:'',
				phone:'',
				email:''
			}
		}

	}

	onStationVosChange=(index, value)=>{

		let {
			stationVos
		} = this.state;
		stationVos[index].unitprice = value;
		this.setState({
			stationVos
		});
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
		let {position} = this.state;
		position[type]= value;
		this.setState({
			position
		})
	}
	
	render() {
		let _this = this;
		let list = this.state.stationVos;
		let typeLinkName = {
			value: _this.state.position.name,
			requestChange: _this.onPositionChange.bind(null,'name')
		}
		let typeLinkPhone = {
			value: _this.state.position.phone,
			requestChange: _this.onPositionChange.bind(null,'phone')
		}
		let typeLinkEmail = {
			value: _this.state.position.email,
			requestChange: _this.onPositionChange.bind(null,'email')
		}

		return (
			    <div style={{minHeight:'910',backgroundColor:"#fff"}}>
			    	{list && list.map((item,index)=>{
			    		let typeLink = {
			    			value: this.state.stationVos[index].unitprice,
			    			requestChange: this.onStationVosChange.bind(null, index)
			    		}	
			    		return (
			    			<div>
			    				<input type="text" name="age"  valueLink={typeLink} onBlur={this.onBlur.bind(this,item)}/>
			    				{item.type}
			    			</div>	
			    		)
			    	})}


			    	<div className="info-box">
			    		<AdvancedQuery />
						<div className="info-list">
							<span>社区负责任人</span>
			    			<input type="text" name="name"  valueLink={typeLinkName}  placeholder='请输入姓名'/>
			    			<input type="text" name="telephone"  valueLink={typeLinkPhone}  placeholder='请输入电话号码'/>
			    			<input type="text" name="email"  valueLink={typeLinkEmail}  placeholder='请输入邮箱'/>
						</div>
			    	</div>
				</div>
		);

	}

}
