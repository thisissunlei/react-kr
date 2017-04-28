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
			stationVos:[{type:'负责人1',unitprice:''},{type:'负责人2',unitprice:''}]
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
	onBlur=(item)=>{
		console.log('onblur',item)
	}
	
	render() {
		let list = this.state.stationVos;



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
			    	</div>
				</div>
		);

	}

}
