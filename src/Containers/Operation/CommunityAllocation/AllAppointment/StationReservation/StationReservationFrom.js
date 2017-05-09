import React from 'react';
import {
	observer,
	inject
} from 'mobx-react';
import {
	reduxForm,
} from 'redux-form';
import {Http,DateFormat} from 'kr/Utils'
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	ListGroup,
	SearchForm,
	ListGroupItem,
	Message
} from 'kr-ui';

class StationReservationFrom extends React.Component {

	static propTypes = {

	}

	constructor(props) {
		super(props);
		this.state={
			options:[],
			searchParams:{
				communityId:'',
				time:DateFormat(new Date(),"yyyy-mm-dd hh:MM:ss"),
				floor:'',

			},
			date:DateFormat(new Date(),"yyyy-mm-dd"),
			communityIdList:[],
		}
		// this.getcommunity();
	}
	// getcommunity = () => {
	// 	let _this = this;
	// 	let {communityIdList} = this.state;
	// 	Http.request('getCommunity').then(function(response) {

	// 		communityIdList = response.communityInfoList.map(function(item, index) {

	// 			item.value = item.id;
	// 			item.label = item.name;
	// 			return item;
	// 		});
	// 		_this.setState({
	// 			communityIdList,
	// 		});


	// 	}).catch(function(err) {



	// 	});
	// }
	// timeChange = (data) =>{
	// 	let {searchParams} = this.state;
	// 	let {onSubmit} = this.props;
	// 	if(!data){
	// 		data = "";
	// 	}
	// 	this.setState({
	// 		searchParams:{
	// 			communityId:searchParams.communityId,
	// 			time:data,
	// 			floor:searchParams.floor,
	// 		}
	// 	},function(){
	// 		onSubmit(this.state.searchParams)
	// 	})
		
	// }
	// selectChange = (data) =>{
	// 	let {searchParams} = this.state;
	// 	let {onSubmit} = this.props;
	// 	let options = [];
	// 	if(!data){
	// 		this.setState({
	// 			options,
	// 			searchParams:{
	// 				communityId:"",
	// 				time:searchParams.time,
	// 				floor:searchParams.floor,
	// 			}
	// 		},function(){
	// 			onSubmit(this.state.searchParams)
	// 		})
			
	// 		return ;
	// 	}
	// 	let _this = this;
	// 	Http.request("getCommunityFloors",{communityId:data.value}).then(function(response) {
	// 		response.floors.map(function(item,index){
	// 			options.push({label:item,value:item});
	// 		})
	// 		_this.setState({
	// 			options,
	// 			searchParams:{
	// 				communityId:data.value,
	// 				time:searchParams.time,
	// 				floor:searchParams.floor,
	// 			}
	// 		},function(){
	// 			onSubmit(_this.state.searchParams)
	// 		})
	// 	}).catch(function(err) {
	// 		Message.error(err.message);
	// 	});
	// }
	// floorChange = (data) =>{
	// 	let {searchParams} = this.state;
	// 	let {onSubmit} = this.props;
	// 	if(!data){
	// 		data = {value:''};
	// 	}
	// 	this.setState({
	// 		searchParams:{
	// 			communityId:searchParams.communityId,
	// 			time:searchParams.time,
	// 			floor:data.value,
	// 		}
	// 	},function(){
	// 		onSubmit(this.state.searchParams)
	// 	})
	// }
  
   
	render() {
        const {handleSubmit} = this.props;
		const {options,date,communityIdList} = this.state;
	  	return(
			<div className = "station-reservation-from" >
			    <form >
				<div className='m-contract'>
					<KrField 
					grid={1/2}  
					style={{width:"240px",}} 
					name="contractType" 
					type="select" 
					label="合同类型：" 
					inline={true}
				
				/>
				
				<div className="searchForm-col" style={{marginTop:"2px"}}>
					<KrField
						grid={1/2} 
						label="时间" 
						name="createDateBegin" 
						style={{width:"310px"}}  
						component="date" 
						inline={true} 
						placeholder='日期'
					/>
				</div>
				<div className="searchForm-col" style={{marginTop:"-40px",position:"relative",left:35,top:53}}>
					<span>至</span>
				</div>
				<div className="searchForm-col" style={{marginTop:"2px",marginRight:20}}>
					<KrField 
						grid={1/2} 
						label="" 
						name="createDateEnd" 
						style={{width:"310px"}} 
						component="date"  inline={true} 
						
						placeholder='日期'
					/>
				</div>
				
				</div>
					
				</form>
			</div>
		);
	}
}


export default reduxForm({form:'StationReservationFrom',enableReinitialize:true,keepDirtyOnReinitialize:true})(StationReservationFrom);
