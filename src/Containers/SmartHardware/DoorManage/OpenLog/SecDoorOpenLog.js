

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
		
		if(values.startTime && values.endTime){
			var start=Date.parse(DateFormat(values.startTime,"yyyy-mm-dd hh:MM:ss"));
			var end=Date.parse(DateFormat(values.endTime,"yyyy-mm-dd hh:MM:ss"));
			if(start>end){
				Message.error("结束时间不能小于开始时间");
				return ;
			}
		}
		console.log("values",values);
		State.openLogSearchParams={
			page:1,
			pageSize:15,
			sdate : values.startTime || '',
			edate: values.endTime || '',
			communityId: values.communityId || '',
			deviceId: values.deviceId || '',
			memberName:  values.memberName || '',
			phone :  values.phone || '',
		}
		console.log("State.openLogSearchParams",State.openLogSearchParams);
	}

	onClearAll=()=>{
		Store.dispatch(reset('OpenLogForm',''));
		State.openLogSearchParams={
			page:1,
			pageSize:15,
			sdate : '',
			edate: '',
			communityId: '',
			deviceId: '',
			memberName:  '',
			phone : '',
		}
	}

	onStartChange=(startTime)=>{
		let {searchParams}=this.state;
		let start=Date.parse(DateFormat(startTime,"yyyy-mm-dd hh:MM:ss"));
		if(searchParams.endTime){
			var end=Date.parse(DateFormat(searchParams.endTime,"yyyy-mm-dd hh:MM:ss"))
		}
		if(searchParams.endTime&&start>end){
			Message.error("结束时间不能小于开始时间");
			return ;
		}

		Store.dispatch(change('OpenLogForm','startTime',startTime));
		searchParams = Object.assign({}, searchParams, {startTime});

		this.setState({
			searchParams
		});

	}
	onEndChange=(endTime)=>{
		let {searchParams}=this.state;
		
		let end=Date.parse(DateFormat(endTime,"yyyy-mm-dd hh:MM:ss"));
		if(searchParams.startTime){
			var start=Date.parse(DateFormat(searchParams.startTime,"yyyy-mm-dd hh:MM:ss"));
		}
		if(searchParams.startTime&&start>end){
			Message.error("结束时间不能小于开始时间");
			return ;
		}
		Store.dispatch(change('OpenLogForm','endTime',endTime));			 searchParams = Object.assign({}, searchParams, {endTime});
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
						
							<KrField label="开门时间：" name="sdate" component="date" inline={true} style={{width:244,marginTop:-3}} onChange={this.onStartChange}/>
						
					</ListGroupItem>

					<ListGroupItem>
							<KrField label="至：" name="edate" component="date" inline={true} style={{width:200,marginTop:-3}} onChange={this.onEndChange} />
					</ListGroupItem>
					<ListGroupItem>
						<span className="community-list">
							<KrField  name="communityId" component="searchCommunityAll" label="社区名称：" inline={true} style={{width:254}} onChange={this.chooseCommunity} className="community-id"/>
						</span>
					</ListGroupItem>
				</ListGroup>
				<ListGroup>
					<ListGroupItem>
						<KrField grid={1/2} name="deviceId" 
							type="text" 
							label="门禁ID：" 
							style={{width:245}}
							inline={true}
						/>
					</ListGroupItem>
					
					<ListGroupItem>
						<KrField grid={1/2} name="memberName" 
							type="text" 
							label="姓名：" 
							style={{width:245}}
							inline={true}
						/>
					</ListGroupItem>
					
					<ListGroupItem>
						<KrField grid={1/2} name="phone" 
							type="text" 
							label="手机号：" 
							style={{width:245}}
							inline={true}
						/>
					</ListGroupItem>

					<ListGroupItem style={{float:"right"}}>
						<Button  label="清空" type="button"  cancle={true} onTouchTap={this.onClearAll} />
					</ListGroupItem>
					<ListGroupItem style={{float:"right"}}>
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
