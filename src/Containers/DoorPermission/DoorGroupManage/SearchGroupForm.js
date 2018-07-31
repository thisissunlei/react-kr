

import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,change,reset} from 'redux-form';
import {Http} from 'kr/Utils';

import {
	KrField,
	Button,
	ListGroup,
	ListGroupItem,
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



class GroupListSearchForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
		}
	}
	componentDidMount(){
		
		
	}
	onSubmit=(values)=>{
		
		let pageSizeParam = {pageSize:15}
		let senParams = Object.assign({},values,pageSizeParam)
		let {submitSearchParams}=this.props;
		submitSearchParams && submitSearchParams(senParams);
		
	}

	onClearAll=()=>{
		Store.dispatch(reset('GroupListSearchForm',''));
		let {clearParams} = this.props;
		clearParams && clearParams();
	}

	addSelected=()=>{
		let {addSelected} = this.props;
		addSelected && addSelected();
	}

	render(){
		const { error, handleSubmit, pristine, reset,content,filter,showAddMultiple} = this.props;
		let {groupLevelOptions} = State;
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
							component="searchSmartHardCompany" 
							label="公司：" 
							style={{width:'237px'}}
							inline={true}
						/>

					</ListGroupItem>
					
					<ListGroupItem className="special-style">
						<span className="special-style-innner">
							<KrField name="groupLevel"

								component="select" 
								label="组级别：" 
								options = {groupLevelOptions}
								style={{width:237}}
							/>
						</span>
					</ListGroupItem>
					<ListGroupItem  className="special-style">
						
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
					<ListGroupItem style={{marginBottom:15}}>
						<Button  label="清空" type="button"  cancle={true} onTouchTap={this.onClearAll} />
					</ListGroupItem>
					{showAddMultiple && showAddMultiple == true &&
					
						<ListGroupItem style={{marginBottom:15}}>
							<Button  label="批量加入" type="button"  cancle={true} onTouchTap={this.addSelected} />
						</ListGroupItem>
						


					}
					
				</ListGroup>
			</form>
		);
	}
}
export default GroupListSearchForm = reduxForm({
	form: 'GroupListSearchForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(GroupListSearchForm);
