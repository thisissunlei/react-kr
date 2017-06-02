import React, {
	PropTypes
} from 'react';
import {
	Actions,
	Store
} from 'kr/Redux';
import $ from 'jquery';
import {DateFormat,Http} from 'kr/Utils';
import {
	KrField,
	Button,
	ListGroup,
	Message,
	ListGroupItem
} from 'kr-ui';
import {
	reduxForm,
	change
} from 'redux-form';


export default class FloorPlan extends React.Component {

	static defaultProps = {
		
	}

	constructor(props, context) {
		super(props, context);
		let _this = this;
		this.state = {
			communityIdList: [],
			communityInfoFloorList: [],
			dateend: DateFormat(new Date(), "yyyy-mm-dd"),
			date: DateFormat(new Date(), "yyyy-mm-dd")
		}
		this.getcommunity();
		Store.dispatch(change('FloorPlan', 'start', DateFormat(new Date(), "yyyy-mm-dd")));
		Store.dispatch(change('FloorPlan', 'end', DateFormat(new Date(), "yyyy-mm-dd")));
	}
	
	
	//获取社区
	getcommunity=()=> {
		let _this = this;
		let {
			communityIdList
		} = this.state;
		Http.request('getCommunity').then(function(response) {
			communityIdList = response.communityInfoList.map(function(item, index) {
				item.value = item.id;
				item.label = item.name;
				return item;
			});
			communityIdList.unshift({
				label: '请选择',
				value: '0',
				id: '0',
			});
			_this.setState({
				communityIdList,
			});
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
    
	//选择社区
	selectCommunity=(personel)=> {
		let id = '';
		if (personel) {
			id = personel.id;
			this.getCommunityFloors(personel.id);
		}
		Store.dispatch(change('FloorPlan', 'floor', ''));
	}
	
	//获取楼层
	getCommunityFloors=(id)=> {
		let communityId = {
			communityId: parseInt(id)
		};
		var communityInfoFloorList;
		var that = this;
		Http.request('getCommunityFloors', communityId).then(function(response) {
			communityInfoFloorList = response.floors.map(function(item, index) {
				var obj = {};
				obj.value = item;
				obj.label = item;
				return obj;
			});
			that.setState({
				communityInfoFloorList
			});
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	
	//开始时间
	firstDate = (personel) => {
		let firstDate = new Date(personel);
		let {date} = this.state;
		if (this.state.dateend) {
			let endDate = new Date(this.state.dateend);
			let start = firstDate.getTime();
			let end = endDate.getTime();
			if (start <= end) {
				this.setState({
					date: personel
				})
			} else {
				Message.error('结束时间不能小于开始时间');
				Store.dispatch(change('FloorPlan', 'start', DateFormat(date, "yyyy-mm-dd")));
			}
		} else {
			this.setState({
				date: personel
			})
		}
	}

	//结束时间
	secondDate = (personel) => {
		let {dateend}= this.state;
		let secondDate = new Date(personel);
		let end = this.state.dateend;
		if (this.state.date) {
			let firstDate = new Date(this.state.date);
			let start = firstDate.getTime();
			let end = secondDate.getTime();
			if (start <= end) {
				this.setState({
					dateend: personel
				})
			} else {
				Message.error('结束时间不能小于开始时间');
				Store.dispatch(change('FloorPlan', 'end', DateFormat(dateend, "yyyy-mm-dd")));
			}
		} else {
			this.setState({
				dateend: personel
			})
		}
	}


	componentWillUnmount(){
		
	}

	onSubmit=()=>{
		
	}

	render() {

		const {
			communityIdList,
			communityInfoFloorList,
			dateend,
			date
		} = this.state;

		let {
			handleSubmit
		} = this.props;

		

		return (

			<div id="planTable" style={{margin:20,paddingBottom:30}}>
		 	<form name="planTable" onSubmit={handleSubmit(this.onSubmit)} className="form-list" style={{textAlign:'right'}}>

					<ListGroup>
						<ListGroupItem><span style={{display:'inline-block',lineHeight:'45px',textAlign:'left'}}>社区</span></ListGroupItem>
						<ListGroupItem style={{maxWidth:170,marginTop:'-6px',minWidth:110,width:'100%',textAlign:'left'}}><KrField grid={1/1} name="community" component="select"   options={communityIdList} onChange={this.selectCommunity} /></ListGroupItem>
						<ListGroupItem><span style={{display:'inline-block',lineHeight:'45px',textAlign:'left'}}>楼层</span></ListGroupItem>
						<ListGroupItem  style={{maxWidth:170,marginTop:'-6px',minWidth:100,width:'100%',textAlign:'left'}}><KrField name="floor" grid={1/1} component="select" options={communityInfoFloorList} onChange={this.selectFloors}/></ListGroupItem>
						<ListGroupItem style={{minWidth:100,marginTop:'-6px',marginLeft:'-3px',textAlign:'left'}}> <KrField name="start"  component="date"  simple={true} onChange={this.firstDate}/></ListGroupItem>
						<ListGroupItem style={{marginLeft:'10px',textAlign:'left'}}><span style={{display:'inline-block',lineHeight:'45px'}}>至</span></ListGroupItem>
						<ListGroupItem  style={{minWidth:100,marginTop:'-6px',textAlign:'left'}}> <KrField name="end" component="date" simple={true}  onChange={this.secondDate}/> </ListGroupItem>
					</ListGroup>
			</form>
			<p style={{margin:10}}></p>
			{/*<IframeContent src={url} onClose={this.getState} className="floorIframe" onLoad={this.onLoad} width={'100%'} height={800} scrolling="no"/>*/}
			

		</div>
		);
	}
}

FloorPlan = reduxForm({
	form: 'FloorPlan'
})(FloorPlan);
