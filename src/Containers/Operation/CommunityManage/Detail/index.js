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
			community:'',
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

		// Store.dispatch(change('selectCommunityForm','community',personel.label));
		this.getCommunityFloors(personel.id);
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
			console.log('err', err);
			Notify.show([{
				message:err.message,
				type: 'danger',
			}]);
	   	});

	}
	

	getCommunityFloors(id){
		console.log('floors',id);
		let communityid = {communityid:id};
		var communityInfoFloorList;
		var that = this;
	 	Store.dispatch(Actions.callAPI('getCommunityFloors', communityid)).then(function(response){
			
			communityInfoFloorList = response.floors.map(function(item,index){
				item.value = item.id;
				item.label = item.name;
				return item;
			});
			that.setState({
				communityInfoFloorList
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

  	var {communityInfoList, communityInfoFloorList} = this.state;
  	let {community} = this.state;
  	console.log('id', community);


  	
    return (
    	
		 <div>
		 	<BreadCrumbs children={['系统运营','社区管理','计划表']}/>
			
			<Section title="计划表" description=""> 

				<Form name="selectCommunityForm" initialValues={{community:this.state.community}}>
					<KrField name="community"  grid={1/3} component="select" label="社区" onChange={this.selectCommunity} options={communityInfoList}/>

				</Form>
				 <Tabs>
					<Tab label="计划表" onActive={this.planTable}>
						<Schedule  community={community}/>
					</Tab>
					<Tab label="平面图"  onActive={this.Floorplan} >

					   <FloorPlan communityId={community} tab={tab} communityInfoFloorList={communityInfoFloorList}/>

					</Tab>
			</Tabs>

			</Section>
			
			
		</div>
	);
  }
}





