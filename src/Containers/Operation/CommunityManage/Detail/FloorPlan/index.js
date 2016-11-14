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
		community: '',
		communityId: '',
		communityInfoFloorList: []
	}

	constructor(props, context) {
		super(props, context);
		this.getStationUrl = this.getStationUrl.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.scrollLoad = this.scrollLoad.bind(this);
		this.onLoad = this.onLoad.bind(this);
		this.iframeWindow = null;
		this.state = {
			url: this.getStationUrl(),
			communityId: this.props.communityId,
			form: {},
			communityIdList:[],
			communityInfoFloorList:[]
		}

		this.getcommunity = this.getcommunity.bind(this);
		this.selectCommunity = this.selectCommunity.bind(this);
		this.getcommunity();
		this.getCommunityFloors = this.getCommunityFloors.bind(this);;


	}
	componentWillReceiveProps(nextProps) {

		if (nextProps.communityId != this.props.communityId) {
			this.setState({
				communityId: nextProps.communityId
			});
		}


	}


	onLoad(iframeWindow) {
		this.iframeWindow = iframeWindow;

	}



	componentDidMount() {



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



		return url;
	}
	onSubmit(form) {
			form = Object.assign({}, form);
			var that = this;
			var params = {
				communityId: this.state.communityids || '',
				wherefloor: form.floor || '',
				date: dateFormat(form.start, "yyyy.mm.dd") || dateFormat(new Date(), "yyyy.mm.dd"),
				dateend: dateFormat(form.end, "yyyy.mm.dd") || dateFormat(new Date(), "yyyy.mm.dd"),
			};
			that.iframeWindow.query(params);

		}
		// 监听滚动事件
	scrollLoad() {
		var that = this;
		$(window).bind('scroll', function() {
			var top = $(window).scrollTop() || 0;
			var height = $(window).height() || 0;
			// var scrollBottom = $('#planTable').offset().top +1000 - top - height;
			var scrollBottom = height - top;
			var isOutBoundary = scrollBottom >= 100;
			if (!isOutBoundary) {
				that.iframeWindow.pagequery();
			}
		})


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
			console.log(communityIdList);
			_this.setState({
				communityIdList,
			});
		}).catch(function(err) {
			console.log('err', err);
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}
	selectCommunity(personel) {
		console.log(personel);
		this.getCommunityFloors(personel.id);
		this.setState({
			communityids: personel.id,
		})
	}

	getCommunityFloors(id) {
		console.log('floors', id);
		let communityid = {
			communityid: id
		};
		var communityInfoFloorList;
		var that = this;
		Store.dispatch(Actions.callAPI('getCommunityFloors', communityid)).then(function(response) {

			communityInfoFloorList = response.floors.map(function(item, index) {
				item.value = item.id;
				item.label = item.name;
				return item;
			});
			that.setState({
				communityInfoFloorList
			});
			console.log('========',communityInfoFloorList);
		}).catch(function(err) {
			Notify.show([{
				message: err.message,
				type: 'danger',
			}]);
		});
	}

	render() {

		const {
			url,
			height
		} = this.state;
		let {
			tab
		} = this.props;
		let {
			communityId
		} = this.state;
		let {communityIdList} = this.state;
		let {
			communityInfoFloorList
		} = this.props;
		if (tab === 'floorplan') {
			this.scrollLoad();
		} else {
			$(window).unbind('scroll', this.scrollLoad());
		}
		const width = $('#planTable').width() || 900;
		return (

			<div id="planTable" style={{paddingTop:20}}>
		 	<Form name="planTable" onSubmit={this.onSubmit} className="form-list">
				<KrField name="community"  grid={1/5} component="select" label="社区" inline={true}  options={communityIdList} onChange={this.selectCommunity} />
				<KrField name="floor"  grid={1/5} component="select" label="楼层" options={communityInfoFloorList} inline={true}/>
				<KrField grid={3/10}  name="start" component="date" label="注册时间" inline={true}/>
				<KrField grid={1/5}  name="end" component="date"  label="至" inline={true}/>
				<Button  label="确定" type="submit" />
			</Form>
			<IframeContent src={url} onClose={this.onIframeClose} className="floorIframe" onLoad={this.onLoad} width={width} scrolling="no"/>

		</div>
		);
	}
}