import React, {Component, PropTypes} from 'react';
import { connect } from 'kr/Redux';
import {Actions,Store} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';
import $ from 'jquery';
import dateFormat from 'dateformat';
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
import {reduxForm,formValueSelector,initialize,arrayPush,arrayInsert,FieldArray} from 'redux-form';


export default  class FloorPlan extends Component {
	static defaultProps = {
		 tab:'',
		 communityId:'',
		 communityInfoFloorList:[]
	 }

	constructor(props,context){
		super(props, context);
		this.getStationUrl = this.getStationUrl.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.scrollLoad = this.scrollLoad.bind(this);
		this.onLoad = this.onLoad.bind(this);
		console.log('this.props',this.props,'props', props);
		this.iframeWindow = null;
		// this.setIframeWidth = this.setIframeWidth.bind(this);
		this.state = {
			url:this.getStationUrl(),
			communityId:this.props.communityId,
			form:{
			}
		}

	}
	componentWillReceiveProps(nextProps){

		if(nextProps.communityId != this.props.communityId){
			this.setState({
				communityId:nextProps.communityId
			});
		}

		

	}

	onLoad(iframeWindow){

		this.iframeWindow = iframeWindow;
		console.log('-----------load', iframeWindow.document.body.scrollHeight);


	}

	

	 componentDidMount(){
	 	


	 }


	 getStationUrl(form){


	     let url = "http://optest.krspace.cn/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanList?communityId={communityId}&wherefloor={wherefloor}&date={date}&dateend={dateend}";

		var formList = form || {};
		// let {community} = this.state;
		// if(form){
		// 	this.setState({
		// 		form:formList
		// 	});
		// };
		let params;
		console.log('formList', formList);
		params = {
			communityId:'',
			wherefloor:'',
			date: dateFormat(new Date(),"yyyy.mm.dd"),
			dateend:dateFormat(new Date(),"yyyy.mm.dd"),
		};

		if(Object.keys(params).length){
			for (let item in params) {
				if (params.hasOwnProperty(item)) {
					url = url.replace('{' + item + '}', params[item]);
					delete params[item];
				}
			}
		};

		return url ;
	}
	onSubmit(form){
		form = Object.assign({},form);
		var that = this;
		var params = {
			communityId:this.state.communityId || '',
			wherefloor:form.floor || '',
			date: dateFormat(form.start,"yyyy.mm.dd") || dateFormat(new Date(),"yyyy.mm.dd"),
			dateend: dateFormat(form.end,"yyyy.mm.dd")|| dateFormat(new Date(),"yyyy.mm.dd"),
		};
		console.log(params, that.iframeWindow);
		that.iframeWindow.query(params);
		
	}
	// 监听滚动事件
	scrollLoad(){
		var that = this;
		$(window).bind('scroll',function(){
			var top = $(window).scrollTop() || 0;
            var height = $(window).height() || 0;
            var scrollBottom = $('#planTable').offset().top - top - height;
            var isOutBoundary =  scrollBottom >= 1;
            console.log(isOutBoundary, scrollBottom >= 1);
            if (!isOutBoundary) {
            	that.iframeWindow.pagequery();
            }
		})

	}

	

  render() {
  	const {url, height} = this.state;
  	let {tab} = this.props;
		let {communityId} = this.state;
		let {communityInfoFloorList} = this.props;

		// console.log('-----------load', this.iframeWindow.document.body.scrollHeight);

  	console.log('url', this.state);
  	if(tab === 'floorplan'){
  			this.scrollLoad();
  	}else{
  		$(window).unbind('scroll',this.scrollLoad());
  	}
    return (

		 <div id="planTable">
		 	<Form name="planTable" onSubmit={this.onSubmit} className="form-list">
				<KrField name="floor"  grid={1/4} component="select" label="楼层" options={communityInfoFloorList}/>
				<KrField grid={1/4}  name="start" component="date" label="注册时间" />
				<KrField grid={1/4}  name="end" component="date"  label="至" />
				<Button  label="确定" type="submit" primary={true} style={{marginLeft:100}}/>
			</Form>
			<IframeContent src={url} onClose={this.onIframeClose} className="floorIframe" onLoad={this.onLoad} width={900}/>

		</div>
	);
  }
}









