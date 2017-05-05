import React from 'react';
import {
	observer,
	inject
} from 'mobx-react';
import {
	reduxForm,
} from 'redux-form';
import {Http} from 'kr/Utils'
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

class MeetingReservationFrom extends React.Component {

	static propTypes = {

	}

	constructor(props) {
		super(props);
		this.state={
			options:[],
			searchParams:{
				communityId:'',
				time:'',
				floor:'',

			}
		}
	}
	timeChange = (data) =>{
		let {searchParams} = this.state;
		let {onSubmit} = this.props;
		this.setState({
			searchParams:{
				communityId:searchParams.communityId,
				time:data,
				floor:searchParams.floor,
			}
		},function(){
			onSubmit(this.state.searchParams)
		})
		
	}
	selectChange = (data) =>{
		let {searchParams} = this.state;
		let {onSubmit} = this.props;
		let options = [];

		let _this = this;
		Http.request("getCommunityFloors",{communityId:data.value}).then(function(response) {
			response.floors.map(function(item,index){
				options.push({label:item,value:item});
			})
			_this.setState({
				options,
				searchParams:{
					communityId:data.value,
					time:searchParams.time,
					floor:searchParams.floor,
				}
			},function(){
				onSubmit(_this.state.searchParams)
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	floorChange = (data) =>{
		let {searchParams} = this.state;
		let {onSubmit} = this.props;
		this.setState({
			searchParams:{
				communityId:searchParams.communityId,
				time:searchParams.time,
				floor:data.value,
			}
		},function(){
			onSubmit(this.state.searchParams)
		})
	}
    onSubmit = () =>{

    } 
	render() {
        const {handleSubmit} = this.props;
		const {options} = this.state;
	  	return(
			<div className = "meeting-reservation-from" >
			    <form onSubmit={handleSubmit(this.onSubmit)}>
                    <KrField grid={1/2} label="时间:" name="signStartDate" style ={{width:310}} component="date" inline={true} onChange = {this.timeChange} />
                    <KrField grid={1/2} 
						name="intentionCommunityId" 
						component='searchIntend' 
						style ={{width:335,marginTop:3}} 
						label="社区:" inline={true}  
						placeholder='请输入社区名称' 
						requireLabel={false}
						onChange = {this.selectChange}
					/>
					<div className = "meeting-reservation-select">
						<KrField grid={1/2} label="" name="staionTypeId" style ={{width:325}} component="select" style={{width:262}}
							options={options}
							inline={true}
							requireLabel={false}
							onChange = {this.floorChange}
						/>
					</div>
					
					
				</form>
			</div>
		);
	}
}


export default reduxForm({form:'MeetingReservationFrom',enableReinitialize:true,keepDirtyOnReinitialize:true})(MeetingReservationFrom);
