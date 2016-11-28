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
				],
				active:'tab'
		}
	}

	getInitData = ()=>{

	}

	activeTable=()=>{
       let {
			active
		} = this.state;

		active = 'tab';
		this.setState({
			active
		});
	}
    

	renderGroupTabs = ()=>{

		let {groupList,active} = this.state;

		const activeTab={
			color:'#499df1',
			borderBottom: "1px solid #eee",
			fontSize:16
		}
		const commenTab={
			color:'#666',
			borderBottom: "1px solid #eee",
			fontSize:16
		}
        
       let activeStyle = (active == 'tab') ? activeTab : commenTab;


		return (
		   <Tabs tabItemContainerStyle={{background:'#FFF'}} inkBarStyle={{background: '-webkit-linear-gradient(right, #03ec56, #499df1)',position:'absolute',top:0,height:3}} style={{background:'#fff',position:'relative'}}>
					{groupList.map((item,index)=><Tab label={item.groupName} key={index} onActive={this.activeTable} style={activeStyle}><PanelComponents panels={item.templateList}/> </Tab>)}
	 	   </Tabs>
		);
	}


	renderGroupSingle = ()=>{

		let {groupList} = this.state;
		let groupItem = groupList[0];

		return(
			<Section title={groupItem.groupName} >
					<PanelComponents panels={groupItem.templateList}/>
			</Section>
		);
	}

	componentDidMount() {

		/*var _this = this;
		Store.dispatch(Actions.callAPI('get-my-groups')).then(function(response) {
		   _this.setState({
		   	 groupList:response.groupList
		   })
		}).catch(function(err) {
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
		});*/


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
