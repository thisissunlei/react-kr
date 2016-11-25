import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

import * as actionCreators from 'kr-ui/../Redux/Actions';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
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
	Grid,
	Row,
	Col,
	Dialog,
	Tabs,
	Tab,
	Title
} from 'kr-ui';

import PanelComponents from './PanelComponents';

export default class Home  extends Component{

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

		this.state = {
				groupList:[
					{
						groupName:'集团经营',
						id:'3224',
						templateList:[
							{
								id:'324324',
								templateName:'第一个',
								templateNo:''
							},
							{
								id:'2334',
								templateName:'第二个',
								templateNo:''
							},
						]
					},
					{
						groupName:'经营',
						id:'3224',
						templateList:[
							{
								id:'324324',
								templateName:'第一个',
								templateNo:''
							},
							{
								id:'2334',
								templateName:'第二个',
								templateNo:''
							},
						]
					},
				]
		}
	}

	getInitData = ()=>{

	}

	renderGroupTabs = ()=>{

		let {groupList} = this.state;

		return (
				<Tabs>
					{groupList.map((item,index)=><Tab label={item.groupName} key={index}> <PanelComponents panels={item.templateList} /> </Tab>)}
	 	   </Tabs>
		);
	}


	renderGroupSingle = ()=>{

		let {groupList} = this.state;
		let groupItem = groupList[0];

		return(
			<Section title={groupItem.groupName} >
					<PanelComponents panels={groupItem.templateList} />
			</Section>
		);
	}

	render(){

		let {groupList} = this.state;

		if(groupList.length == 1){
				return this.renderGroupSingle();
		}
		
		return(
			<div>
					{this.renderGroupTabs()}
			</div>

		);
	}
}
