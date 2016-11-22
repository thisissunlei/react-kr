import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import {
	Actions,
	Store
} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';
import $ from 'jquery';
import dateFormat from 'dateformat';
import DatePicker from 'material-ui/DatePicker';
import {
	Dialog,
	Section,
	Grid,
	Form,
	Notify,
	KrField,
	BreadCrumbs,
	IframeContent,
	Button,
	Row,
	Col,
	ListGroup,
	ListGroupItem
} from 'kr-ui';
import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray
} from 'redux-form';


export default class FloorPlan extends Component {
	static defaultProps = {
		tab: '',
	}

	constructor(props, context) {
		super(props, context);
		this.getStationUrl = this.getStationUrl.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.scrollLoad = this.scrollLoad.bind(this);
		this.onLoad = this.onLoad.bind(this);
		this.iframeWindow = null;
		this.state = {
			url: '',
			form: {},
			communityIdList:[],
			communityInfoFloorList:[],
		}

		this.getcommunity = this.getcommunity.bind(this);
		this.selectCommunity = this.selectCommunity.bind(this);
		this.getcommunity();
		this.getCommunityFloors = this.getCommunityFloors.bind(this);
		this.getState = this.getState.bind(this);


	}
	componentWillReceiveProps(nextProps) {

	}


	onLoad(iframeWindow) {
		this.iframeWindow = iframeWindow;

	}



	componentDidMount() {
		this.setState({
			url:this.getStationUrl()
		})


	}

	getStationUrl(form) {


	     let url = "/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanList?communityId={communityId}&wherefloor={wherefloor}&date={date}&dateend={dateend}";

		var formList = form || {};
		let params;
		params = {
			communityId: '',
			wherefloor: '',
			date: dateFormat(new Date(), "yyyy.mm.dd"),
			dateend: dateFormat(new Date(), "yyyy.mm.dd"),
		};

		if (Object.keys(params).length) {
			for (let item in params) {
				if (params.hasOwnProperty(item)) {
					url = url.replace('{' + item + '}', params[item]);
					delete params[item];
				}
			}
		};
		console.log('---');



		return url;
	}
	onSubmit(form) {
			form = Object.assign({}, form);
			var that = this;
			var params = {
				communityId: form.community || '',
				wherefloor: form.floor || '',
				date: dateFormat(form.start, "yyyy.mm.dd") || dateFormat(new Date(), "yyyy.mm.dd"),
				dateend: dateFormat(form.end, "yyyy.mm.dd") || dateFormat(new Date(), "yyyy.mm.dd"),
			};
			console.log(params);
			that.iframeWindow.query(params);
			return false;

		}
		// 监听滚动事件
	scrollLoad() {
		var that = this;
		$(window).bind('scroll', function() {
			var top = $(window).scrollTop() || 0;//539滚出的距离
			var height = $(window).height() || 0;//705浏览器高度
			var num = $(document).height()-$(window).height();//页面高-浏览器高度
			// var scrollBottom = $('#planTable').offset().top +1000 - top - height;
			var scrollBottom = top-num;
			var isOutBoundary = scrollBottom >= 0;
			console.log(isOutBoundary);
			if (isOutBoundary) {
				console.log('------');
				that.iframeWindow.pagequery();
				// let possition = that.getState();
				// if(position){
					// console.log('--true--');
					// $(window).scrollTop(top-100);
				// }
				
			}
		})


	}
	getState(){

		console.log('----');
	}
	getcommunity(){
		let _this = this;
		let {communityIdList} = this.state;
		Store.dispatch(Actions.callAPI('getCommunity')).then(function(response) {
			communityIdList = response.communityInfoList.map(function(item, index) {
				item.value = item.id;
				item.label = item.name;
				return item;
			});
			_this.setState({
				communityIdList,
			});
		}).catch(function(err) {
			console.log(err);
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	selectCommunity(personel) {
		this.getCommunityFloors(personel.id);
	}

	getCommunityFloors(id) {
		console.log(id);
		let communityId = {
			communityId: parseInt(id)
		};
		var communityInfoFloorList;
		var that = this;
		Store.dispatch(Actions.callAPI('getCommunityFloors', communityId)).then(function(response) {
			communityInfoFloorList = response.floors.map(function(item, index) {
				var obj= {};
				obj.value = item;
				obj.label = item;
				return obj;
			});
			that.setState({
				communityInfoFloorList
			});
			console.log(response);
		}).catch(function(err) {
			console.log('err',err);
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}

	render() {

		const {
			url,
			height,
			communityLabel,
			communityIdList,
			communityId,
			communityInfoFloorList,
		} = this.state;


		let {tab,handleSubmit} = this.props;

		if (tab === 'floorplan') {
			this.scrollLoad();
		} else {
			$(window).unbind('scroll', this.scrollLoad());
		}
		return (

			<div id="planTable" style={{margin:20,paddingBottom:30}}>
		 	<form name="planTable" onSubmit={handleSubmit(this.onSubmit)} className="form-list">
				
					<ListGroup>
						<ListGroupItem><span style={{display:'inline-block',lineHeight:'45px'}}>社区</span></ListGroupItem>
						<ListGroupItem style={{maxWidth:170,marginTop:'-6px',minWidth:110,width:'100%'}}><KrField grid={1/1} name="community" component="select"   options={communityIdList} onChange={this.selectCommunity} /></ListGroupItem>
						<ListGroupItem><span style={{display:'inline-block',lineHeight:'45px'}}>楼层</span></ListGroupItem>
						<ListGroupItem  style={{maxWidth:170,marginTop:'-6px',minWidth:100,width:'100%'}}><KrField name="floor" grid={1/1} component="select" options={communityInfoFloorList} /></ListGroupItem>
						<ListGroupItem><span style={{display:'inline-block',lineHeight:'45px'}}>注册时间</span></ListGroupItem>
						<ListGroupItem style={{minWidth:100,marginTop:'-6px'}}> <KrField name="start"  component="date" onChange={this.onChangeLeaseBeginDate} simple={true}/></ListGroupItem>
						<ListGroupItem style={{marginLeft:'10px'}}><span style={{display:'inline-block',lineHeight:'45px'}}>至</span></ListGroupItem>
						<ListGroupItem  style={{minWidth:100,marginTop:'-6px'}}> <KrField name="end" component="date" onChange={this.onChangeLeaseEndDate} simple={true}/> </ListGroupItem>
						<ListGroupItem style={{marginLeft:6,marginTop:4}}> <Button  label="确定" type="submit" height={34}/></ListGroupItem>
					</ListGroup>
			</form>
			<p style={{margin:10}}></p>
			<IframeContent src={url} onClose={this.getState} className="floorIframe" onLoad={this.onLoad} width={'100%'} height={800} scrolling="no"/>

		</div>
		);
	}
}

FloorPlan = reduxForm({
	form: 'FloorPlan'
})(FloorPlan);