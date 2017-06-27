import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Actions,Store} from 'kr/Redux';
import {
	Section,
	Tabs,
	Tab,
	Message
} from 'kr-ui';
import {Http} from 'kr/Utils';

import PanelComponents from './PanelComponents';
import './index.less';

export default class Home  extends React.Component{

	constructor(props,context){
		super(props, context);

		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

		this.state = {
				groupList:[

				],
				groupId:'',
				action:0,
		}
	}

	getInitData = ()=>{

	}

	activeTable=(index,id)=>{
       let {
			action,
			groupId
		} = this.state;

        this.setState({
			action:index,
			groupId:id
		},function(){
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

		var activeTabPanel;
		return (
		 <div className='backStatic'>
	      <div className='static-tabWrap'>
		   <Tabs
		   		tabItemContainerStyle={{background:'#FFF'}}

		   		style={{
		   				background:'#fff',
		   				position:'relative',
		   				paddingLeft:'20',
		   				paddingRight:'20'
		   			}}
		   	>
					{groupList.map((item,index)=>{
						    var activeStyle={}
							if(this.state.action==index){
								activeStyle=activeTab;
								activeTabPanel=(<PanelComponents groupList = {groupList} panels={item.templateList} groupId={this.state.groupId}/>)
							}else{
								activeStyle=commenTab;
							}
							return (
				             <Tab label={item.groupName} key={index} onActive={this.activeTable.bind(this,index,item.id)} style={activeStyle}>
				               <div className='tabWrap_section'>
				                {activeTabPanel}
				               </div>
				             </Tab>
    		                )
						})
				   }
	 	    </Tabs>
	 	   </div>
	 	  </div>
		);
	}


	renderGroupSingle = ()=>{

		let {groupList} = this.state;
		let groupItem = groupList[0];


		return(
		  <div className='static-section'>
			<Section title={groupItem.groupName} style={{background:'none'}} headerStyle={{background:'#fff'}}>
			    <div className='static-section-inner' style={{borderTop:'solid 1px #e8e9e9'}}>
					<PanelComponents groupList = {groupList} panels={groupItem.templateList} groupId={groupItem.id}/>
				</div>
			</Section>
		  </div>
		);
	}

	componentDidMount() {
		var _this = this;
		Http.request('get-my-groups').then(function(response) {
		   _this.setState({
		   	 groupList:response.groupList,
		   	 groupId:response.groupList[0].id
		   })
		}).catch(function(err) {
			Message.error(err);
		});

		Store.dispatch(Actions.switchSidebarNav(false));

	}

	render(){

		let {groupList} = this.state;


		if(groupList.length == 1){
				return this.renderGroupSingle();
		}

		return(
			<div className="g-statistical">
					{this.renderGroupTabs()}
			</div>

		);
	}
}
