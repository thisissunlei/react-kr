import { Link } from 'react-router';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Actions, Store } from 'kr/Redux';
import {Http} from 'kr/Utils';
import { reduxForm, change } from 'redux-form';
import Pagination from '../../Pagination';
import KrField from '../../KrField';
import {ListGroup,ListGroupItem} from '../../ListGroup';
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

    }
    componentWillReceiveProps(next, state) {
        if (next.infoTab != this.props.infoTab) {
            this.setState({
                infoTab: next.infoTab
            }, function() {
                this.getInfoData();
            })

        }

    }
    click=()=>{
    	let {changeCount} = this.props;
    	changeCount && changeCount();
    }

    getInfoData = () => {
        let {infoTab} = this.state;
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
            })
            return;
        }

        this.setState({
            url: '',
            readedUrl: ''
        })
    }
    getDataList = (url, params) => {
    	let _this = this;
        Http.request(url, params).then(function(response) {
            _this.setState({
            	infoList:response.items,
            	currentPage:parseInt(response.page),
            	totalCount:response.totalCount,
            	pagination:response.totalPages,
            })
        }).catch(function(err) {
        });
    }
    readed(item) {
        let {readedUrl,url} = this.state;
        let _this = this;
        Http.request(readedUrl, {
            id: item.msgInfoId
        }).then(function(response) {

        	if(item.msgStatu == 'UNREAD'){
        		_this.click();
        	}
        	_this.getDataList(url, {
                page: _this.state.currentPage,
                pageSize:15,
                startTime:_this.state.startTime,
                endTime:_this.state.endTime,
            });
        });
    }
    startDate=(person)=>{
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
    clearTime=()=>{
        Store.dispatch(change('time','end',''));
        Store.dispatch(change('time','start',''));
        Store.dispatch(Actions.switchRightBar(false));

        let {url} = this.state;
        let params = {
            startTime:'',
            endTime:'',
            page:1,
            pageSize:15
        }
        this.getDataList(url, params);
    }

    render() {
        let {currentPage, pageSize,totalCount,pagination,infoList} = this.state;
        let {infoTab} = this.props;
        let height = document.documentElement.clientHeight - 160;
        return (
            <div className="ui-info-list-myself" style={{position:'relative',borderTop:'1px solid rgb(216, 212, 212)'}}>
				<div style={{
	                padding: '30px',
	                paddingBottom:'20px',
	                marginBottom:'100px'
	            }}>
					<span className="close-info icon-close" onClick={this.clearTime}></span>
					<div style={{
		                marginBottom: 10
		            }}>
					<span className="icon-info ui-m-info-logo"></span>
					<span className="ui-m-info-title">消息提醒</span>
					</div>
					<form>
						<ListGroup>
						<ListGroupItem style={{width:200,marginTop:'-3px',marginLeft:'-3px',textAlign:'left'}}><KrField name="start" component="date"  simple={true}  onChange={this.startDate}/></ListGroupItem>
						<ListGroupItem style={{marginLeft:'10px',textAlign:'left'}}><span style={{display:'inline-block',lineHeight:'45px'}}>至</span></ListGroupItem>
						<ListGroupItem  style={{width:200,marginTop:'-3px',textAlign:'left'}}> <KrField name="end" component="date" simple={true}  onChange={this.endDate}/> </ListGroupItem>
						</ListGroup>


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
				< div style = {{paddingRight: '15px',visibility:pagination?'visible':'hidden',position:'absolute',bottom:'-27px',left:'25px'}} >
				<Pagination totalCount={totalCount} page={currentPage} pageSize={pageSize} onPageChange={this.onPageChange} pageJump={4}/>
				< /div>
				 < /div >
            );
    }

}
InfoList = reduxForm({
	form: 'time'
})(InfoList);
