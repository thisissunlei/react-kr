import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {
	Section,
	Tabs,
	Tab,
	Message
} from 'kr-ui';
import {Http} from 'kr/Utils';
import {
	observer,
	inject
} from 'mobx-react';
import CompanyPanel from './CompanyPanel';
import BussinessPanel from './BussinessPanel';
import './index.less';

@inject("NavModel")
@observer
export default class Home  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			tab:'table',
			tabFlag:false
		}
	}

	getInitData = ()=>{

	}

	companyTable=()=>{
       let {
			tab,
		} = this.state;
		tab = 'table';
		this.setState({
			tab,
		});
	}
    
	bussinessTable=()=>{
		let {
			tab,
		} = this.state;
		tab = 'bus';
		this.setState({
			tab,
		});
	}

	renderGroupTabs = ()=>{
        let {tab}=this.state;

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
        
		let companyStyle = (tab=='table') ? activeTab : commenTab;
		let businessStyle = (tab == 'bus') ? activeTab : commenTab;
		
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

				    <Tab label='集团经营'  key={1} onActive={this.companyTable} style={companyStyle}>
				               <div className='tabWrap_section'>
				                {tab=='table'&&<CompanyPanel/>}
				               </div>
				    </Tab>
					<Tab label='招商数据' key={2} onActive={this.bussinessTable} style={businessStyle}>
				               <div className='tabWrap_section'>
				                {tab=='bus'&&<BussinessPanel/>}
				               </div>
				    </Tab>


	 	    </Tabs>
	 	   </div>
	 	  </div>
		);
	}

 renderGroupSingle = ()=>{
		return(
		  <div className='static-section'>
			<Section title='集团经营' style={{background:'none'}} headerStyle={{background:'#fff'}}>
			    <div className='static-section-inner' style={{borderTop:'solid 1px #e8e9e9'}}>
				  <CompanyPanel/>
				</div>
			</Section>
		  </div>
		);
	}
   
   componentWillMount(){
	    let {tabFlag}=this.state;
		var _this=this;
		setTimeout(function() {
			tabFlag=_this.props.NavModel.checkOperate('stat_business');
			_this.setState({
			tabFlag
		})
		},1000);
   }

	componentDidMount() {
		Store.dispatch(Actions.switchSidebarNav(false));
	}

	render(){
        
	   if(!this.state.tabFlag){
		   return this.renderGroupSingle();
	   }

		return(
			<div className="g-statistical">
					{this.renderGroupTabs()}
			</div>

		);
	}
}
