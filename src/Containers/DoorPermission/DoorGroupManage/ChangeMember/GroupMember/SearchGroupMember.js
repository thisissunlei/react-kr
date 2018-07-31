

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
			communityId : '',
			customerId : '',
			searchParams : {
				communityId:'', 
				customerId: '', 
				name: '', 
				phone: '', 
				page: 1,
				pageSize: 15
			},
			searchFormOptions : [
				{
					label:"姓名",
					value: "name",
					className : "name-class"
				},{
					label:"手机",
					value: "phone",
					className : "phone-class"
				}	
			],
		}
	}
	componentDidMount(){
		
		
	}
	onSubmit=(values)=>{

		var sendData = {
			communityId :values.communityId_all||'',
			customerId : values.customerId_all||'',
		}
		sendData = Object.assign(sendData,values);
		
		this.sendSearchParams(sendData);
		
	}

	onSearchFormSubmit=()=>{

		let {communityId,customerId,seachFormFilter,searchFilterContent} = this.state;
		var param ={};
		param[seachFormFilter] = searchFilterContent;
		var searchParams = {
			communityId: communityId,
			customerId: customerId,
			page: 1,
			pageSize: 15
		}
		var sendParams = Object.assign({},searchParams,param);
		
		this.sendSearchParams(sendParams);
	}


	sendSearchParams = (sendData)=>{

		let {submitSearchParams}=this.props;
		submitSearchParams && submitSearchParams(sendData);
		this.setState({
			searchParams : sendData
		})

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
		if(seachFormFilter=="name"){
			Store.dispatch(change('SearchGroupForm','name',content));
			Store.dispatch(change('SearchGroupForm','phone',''));
		}else{
			Store.dispatch(change('SearchGroupForm','phone',content));
			Store.dispatch(change('SearchGroupForm','name',''));
		}
	}

	onChangeCommunity=(item)=>{
		if(!item){
			this.setState({
				communityId : ''
			})
			return;
		}
		this.setState({
			communityId : item.id
		})
	}

	onChangeCompany=(item)=>{
		if(!item){
			this.setState({
				customerId : ''
			})
			return;
		}
		this.setState({
			customerId : item.id
		})
	}




	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		let {logTypeOptions,searchFormOptions,seachFormContent} = this.state;
		
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} className="group-member-search door-permission-group-search">
				<ListGroup className="search-item-line">
					<ListGroupItem>
						<span className="communityId-span">
							<KrField name="communityId_all"
								component="searchCommunityAll"
								label="社区名称："
								style={{width:'237px'}}
								onChange = {this.onChangeCommunity}
								inline={true}
							/>
						</span>
					</ListGroupItem>
					<ListGroupItem>
						<KrField name="customerId_all" 
							component="searchSmartHardCompany" 
							label="公司：" 
							style={{width:'237px'}}
							inline={true}
							onChange = {this.onChangeCompany}
						/>

					</ListGroupItem>
					
					
					
					<ListGroupItem >
						<span style={{display:"inline-block",marginRight:10}}>
							<SearchFormsNew onSubmit={this.onSearchSubmit}  
								inputEnter={this.onSearchFormSubmit}
								style={{zIndex:10000,marginLeft:10}}
								content={seachFormContent}
								searchFilter={searchFormOptions}
								onChange={this.changeSearchFormContent}
								onFilter={this.changeSearchFormFilter}
								filterSpecialClass ="search-group-member-to-group"
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
