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
		 groupId:React.PropTypes.number
	}

	constructor(props,context){
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
		 this.state = {			
				startDate:'',
		}
	}

	componentDidMount() {
		var _this = this;
		Store.dispatch(Actions.callAPI('openCompanyData',{
			groupId:_this.props.groupId
		})).then(function(response){
            _this.setState({			
					startDate:response.today,						
			})
		}).catch(function(err) {
			Message.error(err);
		});                
	}

	render(){
        
         
		let {panels,groupId}=this.props;
		let {startDate}=this.state;

		
		var renderComponent = [];
		var props = {
			groupId
		};

		panels.map(function(item,index){
			var childComponentName = PanelsDic[item.id];
			if(childComponentName){
				props.key = index;
				props.startDate=startDate;
				renderComponent.push(React.cloneElement(childComponentName,{
					...props
				}));
			}
		});

		//<div key={index}>{childComponentName}</div>
		
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
