

import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,change,reset} from 'redux-form';
import {Http} from 'kr/Utils';


import {
	KrField,
	Grid,
	Row,
	Button,
	Notify,
	ListGroup,
	ListGroupItem,
	SearchForm,
	Message,
	SearchForms
} from 'kr-ui';

import {DateFormat} from 'kr/Utils';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer



class OpenLogForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
			searchParams:{

			},
		}
	}
	componentDidMount(){
		
	}
	onSubmit=(values)=>{
		
		if(values.sdate && values.edate){
			var start=Date.parse(DateFormat(values.sdate,"yyyy-mm-dd hh:MM:ss"));
			var end=Date.parse(DateFormat(values.edate,"yyyy-mm-dd hh:MM:ss"));
			if(start>end){
				Message.error("结束时间不能小于开始时间");
				return ;
			}
		}
		
		State.openLogSearchParams={
			page:1,
			pageSize:15,
			startDate : values.sdate || '',
			endDate: values.edate || '',
			communityId: values.communityId || '',
			serialNo: State.openLogSearchParams.serialNo || '',
			date : new Date()
		}
	}

	onchangeSerialNo=(value)=>{
		Store.dispatch(change('OpenLogForm','serialNo',value));
		State.openLogSearchParams.serialNo =value;
	}

	onClearAll=()=>{
		Store.dispatch(reset('OpenLogForm',''));
		Store.dispatch(change('OpenLogForm','sdate',''));
		Store.dispatch(change('OpenLogForm','edate',''));

		State.openLogSearchParams={
			communityId: '',
			endDate: '',
			page:1,
			pageSize:15,
			serialNo: '',
			spaceId: '',
			startDate : '',
		}
	}



	onStartChange=(sdate)=>{
		let {searchParams}=this.state;
		let start=Date.parse(DateFormat(sdate,"yyyy-mm-dd hh:MM:ss"));
		if(searchParams.edate){
			var end=Date.parse(DateFormat(searchParams.edate,"yyyy-mm-dd hh:MM:ss"))
		}
		if(searchParams.edate&&start>end){
			Message.error("结束时间不能小于开始时间");
			return ;
		}

		Store.dispatch(change('OpenLogForm','sdate',sdate));
		searchParams = Object.assign({}, searchParams, {sdate});

		this.setState({
			searchParams
		});

	}
	onEndChange=(edate)=>{
		let {searchParams}=this.state;
		
		let end=Date.parse(DateFormat(edate,"yyyy-mm-dd hh:MM:ss"));
		if(searchParams.sdate){
			var start=Date.parse(DateFormat(searchParams.sdate,"yyyy-mm-dd hh:MM:ss"));
		}
		if(searchParams.sdate&&start>end){
			Message.error("结束时间不能小于开始时间");
			return ;
		}
		Store.dispatch(change('OpenLogForm','edate',edate));			 
		searchParams = Object.assign({}, searchParams, {edate});
		this.setState({
			searchParams
		});
	}
	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} className="search-form-second-door">
				<ListGroup>
					<ListGroupItem>
							<KrField label="开始时间：" name="sdate" component="date" inline={true} style={{width:244,marginTop:-3}} onChange={this.onStartChange} placeholder="日期"/>
					</ListGroupItem>

					<ListGroupItem>
							<KrField label="至：" name="edate" component="date" inline={true} style={{width:200,marginTop:-3}} onChange={this.onEndChange}  placeholder="日期"/>
					</ListGroupItem>
					<ListGroupItem>
						<span className="community-list">
							<KrField  name="communityId" component="searchCommunityAll" label="社区名称：" inline={true} style={{width:254}} onChange={this.chooseCommunity} className="community-id"/>
						</span>
					</ListGroupItem>
					<ListGroupItem>
						<span className="serialNo-box">
							<KrField
								inline={true}
								name="serialNo" 
								type="text" 
								label="序列号：" 
								style={{width:300,margin:'0 35px 5px 0'}}
								onChange = {this.onchangeSerialNo}
							/>
						</span>
					</ListGroupItem>
				</ListGroup>
				<ListGroup style={{marginBottom:10}}>
					

					<ListGroupItem style={{float:"right",margin:"0px 20px 10px 0"}}>
						<Button  label="清空" type="button"  cancle={true} onTouchTap={this.onClearAll} />
					</ListGroupItem>
					<ListGroupItem style={{float:"right",margin:"2px 10px 0 0"}}>
						<Button  label="搜索" type="submit"/>
					</ListGroupItem>
					
				</ListGroup>
			</form>
		);
	}
}
export default OpenLogForm = reduxForm({
	form: 'OpenLogForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(OpenLogForm);
