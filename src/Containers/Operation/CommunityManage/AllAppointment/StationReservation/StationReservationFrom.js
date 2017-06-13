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
				createDateBegin:'',
				createDateEnd:'',

			},
			startValue:'',
			endValue:'',
			communityIdList:[],
		}
		this.getcommunity();
	}
	getcommunity = () => {
		let _this = this;
		let {communityIdList} = this.state;
		Http.request('getCommunity').then(function(response) {

			communityIdList = response.communityInfoList.map(function(item, index) {

				item.value = item.id;
				item.label = item.name;
				return item;
			});
			_this.setState({
				communityIdList,
			});


		}).catch(function(err) {



		});
	}
	
	communityChange = (data) =>{
		let {searchParams} = this.state;
		let {onSubmit} = this.props;
		if(!data){
			data = {value:''};
		}
		this.setState({
			searchParams:{
				createDateBegin:searchParams.createDateBegin,
				createDateEnd:searchParams.createDateEnd,
				communityId:data.value,
			}
		},function(){
			onSubmit && onSubmit(this.state.searchParams)
		})
	}

	 //日期开始
	 onStartChange=(startD)=>{
	 	const {onSubmit} = this.props;
    	let {searchParams}=this.state;
        let start=startD;
        let end=searchParams.createDateEnd;
        this.setState({
        	startValue:startD
        },function () {
        	if(start>end&&end){
	         Message.error('开始时间不能大于结束时间');
	          return ;
	        }
	        let createDateBegin=this.state.startValue;
	    	searchParams = Object.assign({}, searchParams, {createDateBegin:this.state.startValue,createDateEnd:this.state.endValue||searchParams.createDateEnd});
	    	this.setState({
				searchParams
			},function(){
			   onSubmit && onSubmit(searchParams);
			});

        })
    }

    //日期结束
	 onEndChange=(endD)=>{
	 	const {onSubmit} = this.props;
    	let {searchParams}=this.state;
        let start=searchParams.createDateBegin;
        let end=endD;
        this.setState({
        	endValue:endD
        },function () {
        	if(start>end&&start){
	         Message.error('开始时间不能大于结束时间');
	          return ;
	        }
	        let createDateEnd=this.state.endValue;
	    	searchParams = Object.assign({}, searchParams, {createDateBegin:this.state.startValue||searchParams.createDateBegin,createDateEnd:this.state.endValue,});
	    	this.setState({
				searchParams
			},function(){
                onSubmit && onSubmit(searchParams);
			});

        })

    }
  
   
	render() {
        const {handleSubmit} = this.props;
		const {options,date,communityIdList} = this.state;
	  	return(
			<div className = "station-reservation-from" >
			    <form >
				<div className='m-contract' style = {{height:56}}>
					<KrField 
					grid={1/2}  
					style={{width:"330px",float:"left",marginTop:"4px",}} 
					name="contractType" 
					component="searchCommunityAll" 
					label="社区：" 
					inline={true}
					options = {communityIdList}
					onChange = {this.communityChange}
				
				/>
				
				<div className="searchForm-col" 
					 style={{
						 		marginTop:"2px",
								 
							}}>
					<KrField
						grid={1/2} 
						label="时间" 
						name="createDateBegin" 
						style={{width:"310px"}}  
						component="date" 
						inline={true} 
						onChange = {this.onStartChange}
						placeholder='日期'
					/>
				</div>
				<div className="searchForm-col" style={{marginTop:"-40px",position:"relative",left:5,top:53}}>
					<span>至</span>
				</div>
				<div className="searchForm-col" style={{marginTop:"2px",marginRight:20}}>
					<KrField 
						grid={1/2} 
						label="" 
						name="createDateEnd" 
						style={{width:"310px"}} 
						component="date"  inline={true} 
						onChange = {this.onEndChange}
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
