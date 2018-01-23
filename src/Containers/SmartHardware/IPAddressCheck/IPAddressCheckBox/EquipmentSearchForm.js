
import React from 'react';
import {reduxForm,change,initialize,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	Message
} from 'kr-ui';
import './index.less';
import State from './State';
import {
	observer
} from 'mobx-react';
@observer


class IpAddressCheck extends React.Component{
	constructor(props){
		super(props);
		this.state={
			searchParams : {},
			listUrl : ''
		}
	}

	componentDidMount(){

	}
	

	// 提交
	onSubmit=(values)=>{
		// console.log("values",values);
	}

	onChangeCommunity=(value)=>{
		let {searchParams} = this.state;
		var objCommunity = {communityId :value.id }
		var newObj = Object.assign(searchParams,objCommunity)
		this.setState({
			searchParams : newObj
		})
	}


	onchangeConnect=(connectStatus)=>{

		let {searchParams} = this.state;
		var connectObj={connected:connectStatus.value||''};
		var objNewT = Object.assign({},searchParams,connectObj);
		this.setState({
			searchParams : objNewT
		})

	}

	onchangeIp=(value)=>{
		let {searchParams} = this.state;
		var IPObj={ip:value||''};
		var objNewT = Object.assign({},searchParams,IPObj);
		this.setState({
			searchParams : objNewT
		})
	}

	searchList=()=>{

		let {searchParams} = this.state;
		if(!searchParams.communityId){
			Message.warntimeout("请选择社区",'error');
			return;
		}
		this.setState({
			listUrl : "searchIp"
		})
		let {getRepeatIpListProps} = this.props;
		getRepeatIpListProps && getRepeatIpListProps(searchParams,"searchIp");
	}

	getRepeatIpList=()=>{

		let {searchParams} = this.state;
		if(!searchParams.communityId){
			Message.warntimeout("请选择社区",'error');
			return;
		}
		this.setState({
			listUrl : "checkRepeatIpAddress"
		})
		let {getRepeatIpListProps} = this.props;
		getRepeatIpListProps && getRepeatIpListProps(searchParams,"checkRepeatIpAddress"); 
	}




	render(){
		const { error, handleSubmit,content,filter} = this.props;
	
		let connectOptions=[{label:"已连接",value:"true"},
							{label:"未连接",value:"false"}]
		let deviceTypeOptions =[{label:"门禁",value:"DOOR"},
		{label:"智能网关面板",value:"GATEWAY_PANEL"}]	
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{width:"100%",marginTop:20,position:"relative"}} className="son-equipment-search">
				<span className="fir-span">
					<KrField name="communityId"
						component="searchCommunityAll"
						label="社区名称："
						style={{width:'237px'}}
						onChange = {this.onChangeCommunity}
						inline={true}
					/>
				</span>
				<KrField name="connectStatus"
					component="select"
					label="连接状态："
					onChange = {this.onchangeConnect}
					options={connectOptions}
					style={{width:'185px'}}
					inline={true}
				/>
				<span className="sen-span">
					<KrField
						inline={true}
						name="IP" 
						type="text" 
						label="IP：" 
						style={{width:235,marginBottom:5}}
						onChange = {this.onchangeIp}
					/>
				</span>
				
			
			
				<Button label="查询"  onTouchTap={this.searchList} className="button-list"/>
				<Button label="查看重复IP"  onTouchTap={this.getRepeatIpList} className="button-list"/>
				
				
				
		  </form>
		);
	}
}
export default IpAddressCheck = reduxForm({
	form: 'IpAddressCheck',
	// validate,
	// enableReinitialize: true,
	// keepDirtyOnReinitialize: true,
})(IpAddressCheck);
