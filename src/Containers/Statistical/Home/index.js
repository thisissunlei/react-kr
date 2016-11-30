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
import './index.less';

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
					
				],
				action:0,
		}
	}

	getInitData = ()=>{

	}

	activeTable=(index)=>{
       let {
			action,
		} = this.state; 
        
        this.setState({
			action:index,
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
              

		return (
	      <div className='static-tabWrap'>
		   <span className="line"></span>
		   <Tabs tabItemContainerStyle={{background:'#FFF'}} inkBarStyle={{background: '-webkit-linear-gradient(right, #03ec56, #499df1)',position:'absolute',top:0,height:3}} style={{background:'#fff',position:'relative',paddingLeft:'20',paddingRight:'20'}}>
					{groupList.map((item,index)=>{
						    var activeStyle={}
							if(this.state.action==index){
								activeStyle=activeTab;
							}else{
								activeStyle=commenTab;
							}
						    return (<Tab label={item.groupName} key={index} onActive={this.activeTable.bind(this,index)} style={activeStyle}><PanelComponents panels={item.templateList} groupId={item.id}/> </Tab>)
						})
				   }
	 	   </Tabs>
	 	  </div>
		);
	}


	renderGroupSingle = ()=>{

		let {groupList} = this.state;
		let groupItem = groupList[0];

		return(
			<Section title={groupItem.groupName}>
			    <div className='static-section-inner'>
					<PanelComponents panels={groupItem.templateList} groupId={groupItem.id}/>
				</div>
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
