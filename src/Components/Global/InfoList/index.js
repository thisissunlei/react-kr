import { Link } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Actions, Store } from 'kr/Redux';
import { reduxForm, change } from 'redux-form';
import Pagination from '../../Pagination';
import KrField from '../../KrField';
import dateFormat from 'dateformat';
import $ from 'jquery';
import './index.less';
export default class InfoList extends Component {

    PropTypes = {
        items: React.PropTypes.isArray,
        current_parent: React.PropTypes.string,
        current_child: React.PropTypes.string,
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            infoTab: this.props.infoTab,
            url: '',
            readedUrl: '',
            infoList:[],
            page:1, 
            pageSize:15,
            totalCount:0,
            pagination:0,
            startTime:'',
            endTime:'',
            currentPage:1
        }
    }
    onPageChange = (pages) => {
        let {url,currentPage} = this.state;
        let page = ++currentPage;
        let params = {
        	startTime:this.state.startTime,
            endTime:this.state.endTime,
            pageSize:15,
            page:pages
        }
        this.getDataList(url, params);

        console.log('onPageChange', params);
        // this.setState({
        //     params:params
        // })
    }
    onClose = () => {
        let {onClose} = this.props;
        onClose && onClose();
    }
    componentWillMount() {
        this.getInfoData();
        console.log('pppppp', this.props.infoTab);

    }
    componentWillReceiveProps(next, state) {
        console.log('componentWillReceiveProps', next.infoTab, this.props.infoTab);
        if (next.infoTab != this.props.infoTab) {
            this.setState({
                infoTab: next.infoTab
            }, function() {
                console.log('next.infoTab', next.infoTab, this.state.infoTab);
                this.getInfoData();
            })

        }
        // console.log('pppppp');

    }

    getInfoData = () => {
        let {infoTab} = this.state;
        console.log('getInfoData', infoTab);
        if (!infoTab) {
            return;
        }
        if (infoTab == 'community') {
            this.getDataList('getInfoList', {
                page: 1,
                pageSize: 15,
                startTime:this.state.startTime,
                endTime:this.state.endTime,
            });
            this.setState({
                url: 'getInfoList',
                readedUrl: 'setInfoReaded'
            },function(){
            	console.log(this.state);
            })
            return;
            // alert('community');

        }
        // if(infoTab == 'member'){
        // 	this.setState({
        // 		url:'2222',
        // 		readedUrl:'2222'
        // 	})
        // 	// alert('member');
        // }
        this.setState({
            url: '',
            readedUrl: ''
        })
    }
    getDataList = (url, params) => {
    	let _this = this;
        Store.dispatch(Actions.callAPI(url, params)).then(function(response) {
            console.log('ddd',response,url,_this.state);
            _this.setState({
            	infoList:response.items,
            	currentPage:parseInt(response.page),
            	totalCount:response.totalCount,
            	pagination:response.totalPages,
            })
        }).catch(function(err) {
            console.log(err);
        });
    }
    readed(item) {
        let {readedUrl,url} = this.state;
        let _this = this;
        console.log('item', item,readedUrl);
        Store.dispatch(Actions.callAPI(readedUrl, {
            id: item.msgInfoId
        })).then(function(response) {
        	_this.getDataList(url, {
                page: _this.state.currentPage,
                pageSize: 15,
                startTime:_this.state.startTime,
                endTime:_this.state.endTime,
            });
        }).catch(function(err) {
            console.log(err);
        });
    }
    startDate=(person)=>{
    	console.log('start',person);
    	let {url} = this.state;
    	let params = {
    		startTime:person,
    		endTime:this.state.endTime,
    		page:1,
    		pageSize:15
    	}
        this.getDataList(url, params);
        this.setState({
            startTime:person
        })
    }
    endDate=(person)=>{
    	let {url} = this.state;
    	let params = {
    		startTime:this.state.startTime,
    		endTime:person,
    		page:1,
    		pageSize:15
    	}
        this.getDataList(url, params);
        this.setState({
            endTime: person
        })
    }
    dataNone=()=>{
    	return (
    		<div className="ui-m-nothing">
    			<div className="icon"></div>
				<p className="tip">暂时还没有数据呦~</p>
    		</div>
    	)
    }

    render() {
        let {currentPage, pageSize,totalCount,pagination,infoList} = this.state;
        let {infoTab} = this.props;
        let height = document.documentElement.clientHeight - 160;
        // if (!pagination) {
        //     return null;
        // }
        return (
            <div className="ui-info-list-myself">
				<div style={{
	                padding: '30px',
	                minHeight: height,
	                paddingBottom:'20px'
	            }}>
					<span className="close-info icon-close" onClick={this.onClose}></span>
					<div style={{
		                marginBottom: 10
		            }}>
					<span className="icon-info ui-m-info-logo"></span>
					<span className="ui-m-info-title">信息提醒 :</span>
					</div>
					<form>
						<KrField name="start" component="date" grid={1/2} simple={true}  onChange={this.startDate}/>
						<KrField name="end" component="date" simple={true} grid={1/2}   onChange={this.endDate}/>
					</form>
					{infoList.map((item, index) => {
		                return (
		                    <p className={item.msgStatu=='UNREAD'?'ui-m-info-content':'ui-m-info-content-readed'} key={index}>
								<a className="ui-m-info-contents" onClick={this.readed.bind(this, item)} href={item.msgUrl} target='_blank'>{item.msgContent}</a>
								<span className="ui-m-info-date">{dateFormat(item.createDate,'yyyy/mm/dd')}</span>
							</p>
		                )
		            })}
		            {!infoList.length && this.dataNone()}
				</div> 
				< div style = {{paddingRight: '15px',visibility:pagination?'visible':'hidden'}} >
				<Pagination totalCount={totalCount} page={currentPage} pageSize={pageSize} onPageChange={this.onPageChange} pageJump={4}/> 
				< /div>
				 < /div >
            );
    }

}
InfoList = reduxForm({
	form: 'time'
})(InfoList);