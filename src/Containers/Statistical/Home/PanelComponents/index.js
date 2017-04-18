import React  from 'react';
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
import MerchantsData from './MerchantsData';
import dateFormat from 'kr/Utils';


//import PanelsDic from './PanelsDic';

export default class PanelComponents  extends React.Component{

	static displayName = 'PanelComponents';
	static defaultProps = {
		panels:[{templateName:'张三',templateNo:''},{latemplateNamebel:'里斯',templateNo:'dddd'}]
	}

	static propTypes = {
		 panels:React.PropTypes.array,
		 groupId:React.PropTypes.number
	}

	constructor(props,context){
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	componentDidMount() {

	}

	renderGroupComponent = ()=>{

				let {panels,groupId}=this.props;

				var  yesterday = new Date(new Date().getTime() - 86400000);
						 yesterday = dateFormat(yesterday,"yyyy-mm-dd");
				var today = new Date();
						today = dateFormat(today,"yyyy-mm-dd");
				var renderComponent = [];
				var props = {
						groupId:groupId,
						todayDate:'',
				};

				var _this = this;
				panels.map(function(item,index){
						props.key = index;
						props.yesterday=yesterday;
						props.today=today;

						renderComponent.push(_this.createPanelComponent(item.id,props));
				});

				return renderComponent;
	}

	createPanelComponent = (value,props)=>{
			let {groupList} = this.props;
			props.groupList = groupList;
			var component = null;
			switch (value) {
				case 1:{
					component = <OpenPanel {...props}/>
					break;
				}
				case 2:{
					component = <NotOpenPanel {...props}/>
					break;
				}
				case 3:{
					component = <MerchantsData {...props}/>
					break;
				}
				default:{
					component = null;
				}
			}
			return component;
	}

	render(){

		return(
			<div>
			    <Title value="数据统计"/>
			    	{this.renderGroupComponent()}
			</div>
		);
	}
}
