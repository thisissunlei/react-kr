

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



class DoorWarnForm extends React.Component{
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
		
		
		if(values.stime && values.etime){

			var start=Date.parse(DateFormat(values.stime,"yyyy-mm-dd hh:MM:ss"));
			var end=Date.parse(DateFormat(values.etime,"yyyy-mm-dd hh:MM:ss"));

			if(start>end){
				Message.error("结束时间不能小于开始时间");
				return ;
			}
		}
		State.warnSearchParams={
			page:1,
			pageSize:15,
			stime :  values.stime || '',
			etime:  values.etime || '',
			deviceId: values.deviceId || '',
			logType:  values.logType || '',
		}
	}

	onClearAll=()=>{
		Store.dispatch(reset('DoorWarnForm',''));
		Store.dispatch(change('DoorWarnForm','stime',''));
		Store.dispatch(change('DoorWarnForm','etime',''));
		var time=this.refs.stime
		State.warnSearchParams={
			page:1,
			pageSize:15,
			stime :  '',
			etime: '',
			deviceId:'',
			logType: ''
		}

	}

	onStartChange=(stime)=>{
		let {searchParams}=this.state;
		let start=Date.parse(DateFormat(stime,"yyyy-mm-dd hh:MM:ss"));
		if(searchParams.etime){
			var end=Date.parse(DateFormat(searchParams.etime,"yyyy-mm-dd hh:MM:ss"))
		}
		if(searchParams.etime&&start>end){
			Message.error("结束时间不能小于开始时间");
			return ;
		}

		Store.dispatch(change('DoorWarnForm','stime',stime));
		searchParams = Object.assign({}, searchParams, {stime});

		this.setState({
			searchParams
		});

	}
	onEndChange=(etime)=>{
		let {searchParams}=this.state;
		
		let end=Date.parse(DateFormat(etime,"yyyy-mm-dd hh:MM:ss"));
		if(searchParams.stime){
			var start=Date.parse(DateFormat(searchParams.stime,"yyyy-mm-dd hh:MM:ss"));
		}
		if(searchParams.stime&&start>end){
			Message.error("结束时间不能小于开始时间");
			return ;
		}
		Store.dispatch(change('DoorWarnForm','etime',etime));			 
		searchParams = Object.assign({}, searchParams, {etime});
		this.setState({
			searchParams
		});
	}
	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} className="door-warn-search">
				<ListGroup>
					<ListGroupItem>
						
							<KrField label="开门时间：" ref="stime" name="stime" component="date" inline={true} style={{width:244,marginTop:-3}} onChange={this.onStartChange}/>
						
					</ListGroupItem>

					<ListGroupItem>
							<KrField label="至：" name="etime" component="date" inline={true} style={{width:200,marginTop:-3}} onChange={this.onEndChange} />
					
					</ListGroupItem>
					<ListGroupItem>
						<KrField grid={1/2} name="deviceId" 
							type="text" 
							label="硬件ID：" 
							style={{width:245}}
							inline={true}
						/>
					</ListGroupItem>
					
					<ListGroupItem>
						
						<KrField name="logType" 
							component="select" 
							label="报警类型：" 
							options = {State.LogTypeOptions}
							style={{width:'252px'}}
							onChange = {this.getFloor}
							inline={true}
						/>
					</ListGroupItem>
					
				</ListGroup>
				<ListGroup className="sec-list">
					
					

					<ListGroupItem style={{float:"right",margin:"10px 20px 10px 0"}}>
						<Button  label="清空" type="button"  cancle={true} onTouchTap={this.onClearAll} />
					</ListGroupItem>
					<ListGroupItem style={{float:"right",margin:10}}>
						<Button  label="搜索" type="submit"/>
					</ListGroupItem>
					
				</ListGroup>
			</form>
		);
	}
}
export default DoorWarnForm = reduxForm({
	form: 'DoorWarnForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(DoorWarnForm);
