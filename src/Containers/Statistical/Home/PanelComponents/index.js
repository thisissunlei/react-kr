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
	Title

} from 'kr-ui';

import NotOpenPanel from './NotOpenPanel';
import OpenPanel from './OpenPanel';

import PanelsDic from './PanelsDic';

export default class PanelComponents  extends Component{

	static defaultProps = {
		panels:[{templateName:'张三',templateNo:''},{latemplateNamebel:'里斯',templateNo:'dddd'}]
	}

	static propTypes = {
		 panels:React.PropTypes.array,
		 groupId:React.PropTypes.string
	}

	constructor(props,context){
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render(){

		let {panels}=this.props;
		var renderComponent = [];
		panels.map(function(item,index){
			var childComponentName = PanelsDic[item.templateNo];
			if(childComponentName){

				renderComponent.push(<div key={index}>{childComponentName}</div>);
			}
		});
		console.log(renderComponent);
		return(
			<div>
			    <Title value="数据统计"/>
			    	{renderComponent}
			  {/*
	            <NotOpenPanel groupId={this.props.groupId} currentDate={currentDate}/>
				<OpenPanel groupId={this.props.groupId} currentDate={currentDate}/></div>			
			*/}
		
			</div>
		);
	}
}
