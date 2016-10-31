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
} from 'kr-ui';
import {reduxForm,formValueSelector,initialize,arrayPush,arrayInsert,FieldArray} from 'redux-form';


export default  class FloorPlan extends Component {
	static defaultProps = {
		 tab:'',
		 community:''
	 }

	constructor(props,context){
		super(props, context);
		this.getStationUrl = this.getStationUrl.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.scrollLoad = this.scrollLoad.bind(this);
		// this.setIframeWidth = this.setIframeWidth.bind(this);
		this.state = {
			url:this.getStationUrl(),
			community:this.props.community,
			form:{
				pageSize:2,
			}
		}

	}

	

	 componentDidMount(){

	 }

	 getStationUrl(form){


	     let url = "http://optest.krspace.cn/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanList?communityId={communityId}&wherefloor={wherefloor}&date={date}&dateend={dateend}";

		var formList = form || {};
		if(form){
			this.setState({
				form:formList
			});
		};
		let params;
		params = {
			communityId:'',
			wherefloor:formList.floor || '',
			date:formList.start || dateFormat(new Date(),"yyyy.mm.dd"),
			dateend:formList.end || dateFormat(new Date(),"yyyy.mm.dd"),
			pageSize:formList.pageSize || 2,
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
		console.log('form', form);
		form.pageSize = 2;
		this.setState({
			url:this.getStationUrl(form)
		});
	}
	// 监听滚动事件
	scrollLoad(){
		let {form} = this.state;
		var that = this;
		$(window).bind('scroll',function(){
			var top = $(window).scrollTop() || 0;
            var height = $(window).height() || 0;
            var scrollBottom = $('#planTable').offset().top - top - height;
            var isOutBoundary =  scrollBottom >= 1;
            console.log(isOutBoundary, scrollBottom >= 1);
            if (!isOutBoundary) {
            	// form.pageSize +=2;
             //    that.getStationUrl(form);
            }
		})

	}

	

  render() {
  	// this.setIframeWidth();
  	const {url} = this.state;
  	let {tab} = this.props;
  	console.log(this.state, url, 'url');
  	if(tab === 'floorplan'){
  			this.scrollLoad();
  	}else{
  		$(window).unbind('scroll',this.scrollLoad());
  	}
    return (

		 <div id="planTable">
		 	<Form name="planTable" onSubmit={this.onSubmit} >
				<KrField grid={1/5}  name="floor" component="input" label="楼层" />
				<KrField grid={1/5}  name="start" component="date" label="注册时间" />
				<KrField grid={1/5}  name="end" component="date"  label="至" />
				<Button  label="确定" type="submit" primary={true} />
			</Form>
			<IframeContent src={url} onClose={this.onIframeClose} id="floorIframe"/>

		</div>
	);
  }
}









