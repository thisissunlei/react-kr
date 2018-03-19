

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
	
} from 'kr-ui';
import './index.less';
import {DateFormat} from 'kr/Utils';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer



class SearchGroupForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			logTypeOptions : [
				{
					label:"普通组",
					value: "NORMAL"
				},{
					label:"全国通开组",
					value: "COUNTRYWIDE"
				},{
					label:"社区通开组",
					value: "COMMUNITYWIDE"
				}
				
			],
		}
	}
	componentDidMount(){
		
		
	}
	onSubmit=(values)=>{
		
		console.log("values",values);
		let {submitSearchParams}=this.props;
		submitSearchParams && submitSearchParams(values);
		
	}

	onClearAll=()=>{
		Store.dispatch(reset('SearchGroupForm',''));
		let {clearParams} = this.props;
		clearParams && clearParams();
		// Store.dispatch(change('SearchGroupForm','stime',''));
		// Store.dispatch(change('SearchGroupForm','etime',''));
		// var time=this.refs.stime
		// State.warnSearchParams={
		// 	page:1,
		// 	pageSize:15,
		// 	stime :  '',
		// 	etime: '',
		// 	deviceId:'',
		// 	logType: ''
		// }
	}

	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		let {logTypeOptions} = this.state;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} className="door-permission-group-search">
				<ListGroup className="fir-list">
					<ListGroupItem>
						<span className="communityId-span">
							<KrField name="communityId"
								component="searchCommunityAll"
								label="社区名称："
								style={{width:'237px'}}
								onChange = {this.onChangeCommunity}
								inline={true}
							/>
						</span>
					</ListGroupItem>
					<ListGroupItem>
						<KrField name="customerId" 
							component="searchMemberCompany" 
							label="公司：" 
							style={{width:'237px'}}
							inline={true}
						/>

					</ListGroupItem>
					
					<ListGroupItem >
						
						<KrField name="groupLevel" 
							component="select" 
							label="组级别：" 
							options = {logTypeOptions}
							style={{width:237}}
						/>
					</ListGroupItem>
					<ListGroupItem >
						
						<KrField
							name="name" 
							type="text" 
							label="组名称："
							style={{width:237}}
						/>

					</ListGroupItem>
					
					<ListGroupItem style={{}}>
						<Button  label="搜索" type="submit"/>
					</ListGroupItem>
					<ListGroupItem style={{}}>
						<Button  label="清空" type="button"  cancle={true} onTouchTap={this.onClearAll} />
					</ListGroupItem>
					
				</ListGroup>
			</form>
		);
	}
}
export default SearchGroupForm = reduxForm({
	form: 'SearchGroupForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(SearchGroupForm);
