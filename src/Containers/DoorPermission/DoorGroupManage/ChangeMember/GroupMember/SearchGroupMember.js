

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
	SearchFormsNew,
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
			seachFormContent : '',
			seachFormFilter : "name",
			searchFormOptions : [
				{
					label:"姓名",
					value: "name",
					className:"group-member-deviceId"
					
				},{
					label:"手机",
					value: "phone",
					className:"all-search-member-deviceId"
					
				}	
			],
		}
	}
	componentDidMount(){
		
		
	}

	onSubmit=(values)=>{

		var sendData = {communityId:'',customerId : ''}
		sendData = Object.assign(sendData,values);
		let {submitSearchParams}=this.props;
		submitSearchParams && submitSearchParams(sendData);
		
	}

	// onClearAll=()=>{
	// 	Store.dispatch(reset('SearchGroupForm',''));
	// 	let {clearParams} = this.props;
	// 	clearParams && clearParams();
	// }

	changeSearchFormContent=(content)=>{
		
		let that = this;
		let {seachFormFilter} = this.state;
		this.setState({
			searchFilterContent : content
		},function(){
			that.resetSearchFormData(content);
		})

	}

	changeSearchFormFilter=(filter)=>{

		let that = this;
		let {searchFilterContent} = this.state;
		this.setState({
			seachFormFilter : filter
		},function(){
			that.resetSearchFormData(searchFilterContent);
		})
		
	}

	resetSearchFormData=(content)=>{
		let {seachFormFilter} = this.state;
		var newParamObj = {};
		newParamObj[seachFormFilter] = content;
		var emptyObj={name:'',phone:''};
		var realData = Object.assign(emptyObj,newParamObj);

		Store.dispatch(change('SearchGroupForm','name',realData.name||''));
		Store.dispatch(change('SearchGroupForm','phone',realData.phone||''));
	
	}

	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		let {logTypeOptions,searchFormOptions,seachFormContent} = this.state;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} className="group-member-search door-permission-group-search">
				<ListGroup className="search-item-line">
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
						<span style={{display:"inline-block",marginRight:10}}>
							<SearchFormsNew onSubmit={this.onSearchSubmit}  
								style={{zIndex:10000,marginLeft:10}}
								content={seachFormContent}
								searchFilter={searchFormOptions}
								onChange={this.changeSearchFormContent}
								onFilter={this.changeSearchFormFilter}
								filterSpecialClass ="search-member-all-search-form"
							/>
						</span>

					</ListGroupItem>
					
					
					<ListGroupItem style={{}}>
						<Button  label="搜索" type="submit"/>
					</ListGroupItem>
					{/* <ListGroupItem style={{}}> */}
						{/* <Button  label="清空" type="button"  cancle={true} onTouchTap={this.onClearAll} /> */}
					{/* </ListGroupItem> */}
					
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
