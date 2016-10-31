import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';
import {reduxForm,submitForm,change,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';

import {
	Tabs,
	Tab,
	Dialog,
	Section,
	Grid,
	Notify,
	Button,
	KrField,
	Form,
	BreadCrumbs,
} from 'kr-ui';

import Schedule from './Schedule';
import FloorPlan from './FloorPlan';
import $ from 'jquery';

export default  class CommunityManage extends Component {

	constructor(props,context){
		super(props, context);
		this.planTable = this.planTable.bind(this);
		this.Floorplan = this.Floorplan.bind(this);
		this.selectCommunity = this.selectCommunity.bind(this);
		this.getCommunity = this.getCommunity.bind(this);
		this.state = {
			tab:'plan',
			communityInfoList:[],
			community:''
		}
		
	}

	componentDidMount(){
  		this.getCommunity();

	}
	Floorplan(){
		console.log('plan');
		let {tab} = this.state;
		tab = 'floorplan';
		this.setState({
			tab
		});
	}
	planTable(){
		console.log('jdadtable');
		let {tab} = this.state;
		tab = 'table';
		this.setState({
			tab
		});
	}
	selectCommunity(personel){
		console.log('change',personel.id);
		// Store.dispatch(change('selectCommunityForm','community',personel.id));
		this.setState({
			community:personel.id
		})

	}
	getCommunity(){
		var that = this;
		var {communityInfoList} = this.state;
		Store.dispatch(Actions.callAPI('getCommunity')).then(function(response){
			
			communityInfoList = response.communityInfoList.map(function(item,index){
				item.value = item.id;
				item.label = item.name;
				return item;
			});
			that.setState({
				communityInfoList
			});
		}).catch(function(err){
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
	   	});

	}
	
	

	


  render() {
  	let {tab} = this.state;
  	var {communityInfoList} = this.state;
  	console.log(communityInfoList);
  	// let sectionTitle;
  	let {community} = this.state;
  	console.log('id', community);
  	// if(tab === 'floorplan'){
  	// 		sectionTitle = "平面图";
  	// }else{
  	// 	sectionTitle = "计划表";
  	// }

  	
    return (
    	
		 <div>
		 	<BreadCrumbs children={['系统运营','社区管理','计划表']}/>
			
			<Section title="计划表" description=""> 
				<Form name="selectCommunityForm" >
				<KrField name="leaseId"  grid={1/1} component="select" label="社区" onChange={this.selectCommunity} options={communityInfoList}/>

			</Form>
				 <Tabs>
					<Tab label="计划表" onActive={this.planTable}>
						<Schedule  community={community}/>
					</Tab>
					<Tab label="平面图"  onActive={this.Floorplan} >
					   <FloorPlan community={community} tab={tab}/>
					</Tab>
			</Tabs>

			</Section>
			
			
		</div>
	);
  }
}





