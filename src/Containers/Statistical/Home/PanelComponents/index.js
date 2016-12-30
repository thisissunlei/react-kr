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

				var  dateT=new Date();
				var dateYear=dateT.getFullYear();
				var dateMonth=dateT.getMonth()+1;
				var dateDay=dateT.getDate();
						if(dateDay<10){
							dateDay='0'+dateDay
						}
						var todayDate=dateYear+'-'+dateMonth+'-'+dateDay;


				var renderComponent = [];
				var props = {
					groupId
				};

				console.log('---',panels);
				panels.map(function(item,index){
					var childComponentName = PanelsDic[item.id];
					alert(JSON.stringify(item));
					console.log(item);

					//alert(childComponentName);

					if(childComponentName){
						props.key = index;
						props.todayDate=todayDate;
						renderComponent.push(React.cloneElement(childComponentName,{
							...props
						}));
					}
				});

				return renderComponent;
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
