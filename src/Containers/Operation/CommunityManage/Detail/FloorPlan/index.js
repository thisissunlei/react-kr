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

	constructor(props,context){
		super(props, context);
		this.getStationUrl = this.getStationUrl.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.scrollLoad = this.scrollLoad.bind(this);

		this.state = {
			url:this.getStationUrl()
		}

	}

	

	 componentDidMount(){

	 }

	 getStationUrl(form){


	     let url = "http://optest.krspace.cn/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanList?communityId={communityId}&wherefloor={wherefloor}&date={date}&dateend={dateend}";

		var formList = form || {};
		let params;
		params = {
			communityId:'',
			wherefloor:formList.floor || '',
			date:formList.start || dateFormat(new Date(),"yyyy.mm.dd"),
			dateend:formList.end || dateFormat(new Date(),"yyyy.mm.dd"),
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
		this.setState({
			url:this.getStationUrl(form)
		});
	}
	// 监听滚动事件
	scrollLoad(){
		$(window).scroll(function(){
			var top = $(window).scrollTop() || 0;
            var height = $(window).height() || 0;
            var scrollBottom = $('#planTable').offset().top - top - height;
            var isOutBoundary =  scrollBottom >= 1;
            console.log(isOutBoundary);
            if (!isOutBoundary) {
                console.log('dasdasd');
            }
		})

	}

  render() {
  	const {url} = this.state;
  	console.log(this.state, url, 'url');
  	this.scrollLoad();
    return (

		 <div id="planTable">
		 	<Form name="planTable" onSubmit={this.onSubmit} >
				<KrField grid={1/5}  name="floor" component="input" label="楼层" />
				<KrField grid={1/5}  name="start" component="date" label="注册时间" />
				<KrField grid={1/5}  name="end" component="date"  label="至" />
				<Button  label="确定" type="submit" primary={true} />
			</Form>
			<IframeContent src={url} onClose={this.onIframeClose}/>

		</div>
	);
  }
}









