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
		 community:'',
		 communityInfoFloorList:[]
	 }

	constructor(props,context){
		super(props, context);
		this.getStationUrl = this.getStationUrl.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.scrollLoad = this.scrollLoad.bind(this);
		this.onLoad = this.onLoad.bind(this);

		this.iframeWindow = null;
		// this.setIframeWidth = this.setIframeWidth.bind(this);
		this.state = {
			url:this.getStationUrl(),
			community:this.props.community,
			form:{
			}
		}

	}

	onLoad(iframeWindow){

		this.iframeWindow = iframeWindow;
		console.log('iframeWindow', iframeWindow);

	}

	

	 componentDidMount(){
	 	let {community} = this.props;
	 	


	 }


	 getStationUrl(form){


	     let url = "http://optest.krspace.cn/krspace_operate_web/commnuity/communityFloorPlan/toCommunityFloorPlanList?communityId={communityId}&wherefloor={wherefloor}&date={date}&dateend={dateend}";

		var formList = form || {};
		// let {community} = this.state;
		if(form){
			this.setState({
				form:formList
			});
		};
		let params;
		console.log('formList', formList);
		params = {
			communityId:'',
			wherefloor:formList.floor || '',
			date: dateFormat(formList.start,"yyyy.mm.dd") || dateFormat(new Date(),"yyyy.mm.dd"),
			dateend: dateFormat(formList.end,"yyyy.mm.dd")|| dateFormat(new Date(),"yyyy.mm.dd"),
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
		var that = this;
		setTimeout(function(){
			that.setState({
				url:that.getStationUrl(form)
			});
		},100);
		
	}
	// 监听滚动事件
	scrollLoad(){
		let {form} = this.state;
		var that = this;
		console.log(this.iframeWindow);


		$(window).bind('scroll',function(){
			var top = $(window).scrollTop() || 0;
            var height = $(window).height() || 0;
            var scrollBottom = $('#planTable').offset().top - top - height;
            var isOutBoundary =  scrollBottom >= 1;
            console.log(isOutBoundary, scrollBottom >= 1);
            if (!isOutBoundary) {
            	console.log('load');
            	that.iframeWindow.pagequery();
            }
		})

	}

	

  render() {
  	const {url} = this.state;
  	let {tab} = this.props;
		let {community} = this.state;
		let {communityInfoFloorList} = this.props;

  	console.log(this.state, url, 'url', community);
  	if(tab === 'floorplan'){
  			this.scrollLoad();
  	}else{
  		$(window).unbind('scroll',this.scrollLoad());
  	}
    return (

		 <div id="planTable">
		 	<Form name="planTable" onSubmit={this.onSubmit} >
				<KrField name="floor"  grid={1/1} component="select" label="楼层" options={communityInfoFloorList}/>
				<KrField grid={1/1}  name="start" component="date" label="注册时间" />
				<KrField grid={1/1}  name="end" component="date"  label="至" />
				<Button  label="确定" type="submit" primary={true} />
			</Form>
			<IframeContent src={url} onClose={this.onIframeClose} id="floorIframe" onLoad={this.onLoad}/>

		</div>
	);
  }
}









