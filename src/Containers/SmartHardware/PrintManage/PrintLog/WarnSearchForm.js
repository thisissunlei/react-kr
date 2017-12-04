

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

import './index.less';

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
			logTypeOptions : [],
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
		State.printLogParams = {
			page:1,
			pageSize:15,
			communityId :  values.communityId||'',
			customerId: values.customerId||'',
			endDate:values.etime||'',
			jobType: values.jobType||'',
			accountNo : values.accountNo||'',
			printerName :values.printerName||'',
			startDate :values.stime||'',
			dateP : new Date()
		}
	}

	onClearAll=()=>{
		Store.dispatch(reset('DoorWarnForm',''));
		Store.dispatch(change('DoorWarnForm','stime',''));
		Store.dispatch(change('DoorWarnForm','etime',''));
		var time=this.refs.stime
		State.printLogParams = {
			page:1,
			pageSize:15,
			communityId : '',
			customerId: '',
			endDate:'',
			jobType: '',
			accountNo : '',
			printerName :'',
			startDate :'',
			dateNow : new Date()
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
		let {logTypeOptions} = this.state;
		 let  floorsOptions=[{
		      label:"屏幕显示编号",
		      value:"doorCode"
		    },{
		      label:"屏幕显示标题",
		      value:"title"
		    },{
		      label:"智能硬件ID",
		      value:"deviceId"
		    }]
	    let  printTypeOptions=[
									{value:"PRINT",label:"打印"},
									{value:"SCAN",label:"扫描"},
									{value:"COPY",label:"复印"},
									{value:"FAX",label:"传真接收"},
									{value:"FAX_SEND",label:"传真发送"}
								]
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} className="door-warn-search">
				<ListGroup >
					<ListGroupItem>
						
							<KrField label="打印时间：" ref="startDate" name="stime" component="date" inline={true} style={{width:244,marginTop:-3,marginBottom : 10}} onChange={this.onStartChange}/>
						
					</ListGroupItem>

					<ListGroupItem>
							<KrField label="至：" name="etime" component="date" inline={true} style={{width:200,marginTop:-3,marginBottom : 10}} onChange={this.onEndChange} />
					
					</ListGroupItem>
					<ListGroupItem >
						
						<KrField 
							name="printerName" 
							type="text" 
							label="打印机：" 
							inline={true}
							requireLabel={false} 
							style={{marginBottom : 10}}
							
						/>
					</ListGroupItem>
					
					
					<ListGroupItem >
						
						<KrField 
							name="accountNo" 
							type="text" 
							label="账号：" 
							inline={true}
							requireLabel={false} 
							
						/>
					</ListGroupItem>

					<ListGroupItem>
						<KrField name="communityId" 
							component="searchCommunityAll" 
							label="社区名称："  
							inline={true}
						/>
					</ListGroupItem>

					
					<ListGroupItem >
						
						<KrField name="jobType"
							component="select"
							label="任务类型： "
							inline={true}
							options = {printTypeOptions}
							
						/>
					</ListGroupItem>
					
					<ListGroupItem style={{padding:0}}>
						<span className="customer-box">
						<KrField  
							name="customerId" 
							label="客户："
							placeholder="请输入客户名称" 
							component="searchCompany"  
							inline={true}
							onChange={this.changeCustomer}  
						
						/>
						</span>
						
					</ListGroupItem>
					
				</ListGroup>
				<ListGroup className="sec-list">
					
					<ListGroupItem style={{margin:"0 10px"}}>
						<Button  label="搜索" type="submit"/>
					</ListGroupItem>
					<ListGroupItem >
						<Button  label="清空" type="button"  cancle={true} onTouchTap={this.onClearAll} />
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
