

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
	SearchForms,
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
			seachFormFilter : "doorCode",
			floorsOptions:[],
			searchEquipmentFormOptions : [
				{
					label:"屏幕编号",
					value:"doorCode"
				},{
					label:"屏幕标题",
					value:"title"
			    },{
					label:"硬件ID",
					value:"deviceId"
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
		console.log("filter===>",filter);
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
		if(seachFormFilter=="deviceId"){
			Store.dispatch(change('SearchGroupForm','deviceId',content));
			Store.dispatch(change('SearchGroupForm','doorCode',''));
			Store.dispatch(change('SearchGroupForm','title',''));
		}else if(seachFormFilter=="doorCode"){
			Store.dispatch(change('SearchGroupForm','deviceId',""));
			Store.dispatch(change('SearchGroupForm','doorCode',content));
			Store.dispatch(change('SearchGroupForm','title',''));
		}else if(seachFormFilter=="title"){
			Store.dispatch(change('SearchGroupForm','deviceId',""));
			Store.dispatch(change('SearchGroupForm','doorCode',''));
			Store.dispatch(change('SearchGroupForm','title',content));
		}
	}

	onChangeCommunity=(community)=>{
		
		let _this = this;
		var communityIdReal,floorReal;
		if(!community){

			// communityIdReal = '';
			floorReal = '';
			Store.dispatch(change('SearchGroupForm','floor',''));
			_this.setState({
				floorsOptions : []
			})

		}else{
			// communityIdReal = community.id;
			// floorReal = State.equipmentSecondParams.floor

			let CommunityId = {
				communityId : community.id
			}
			Http.request('getFloorByComunity',CommunityId).then(function(response){
				var arrNew = []
				for (var i=0;i<response.floors.length;i++){
					arrNew[i] = {label:response.floors[i],value:response.floors[i]}
				}
				_this.setState({
					floorsOptions : arrNew
				})
			}).catch(function(err){

			})

		}

		// var newObj = {
		// 	communityId: communityIdReal,
		// 	floor : floorReal,
		// 	page:1
		// }
		// State.realPage =1;
		// State.equipmentSecondParams = Object.assign({},State.equipmentSecondParams,newObj);

	}

	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		let {searchEquipmentFormOptions,seachFormContent,floorsOptions} = this.state;
		console.log("searchEquipmentFormOptions",searchEquipmentFormOptions);
		console.log("State.doorTypeOptions",State.doorTypeOptions);
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
						<span className="communityId-span">
						<KrField name="floor"
							component="select"
							label="楼层："
							options = {floorsOptions}
							style={{width:237}}
							inline={true}
							onChange = {this.onchangeFloor}
						/>
					</span>
					
					</ListGroupItem>

					<ListGroupItem>
					<span className="communityId-span">
						<KrField name="propertyId"
							component="select"
							label="类型："
							onChange = {this.onchangeDoorType}
							options={State.doorTypeOptions}
							style={{width:237}}
							inline={true}
						/>
					</span>
					</ListGroupItem>
					
					<ListGroupItem >
						<span style={{display:"inline-block",marginRight:10}}>
							<SearchForms onSubmit={this.onSearchSubmit}  
								style={{zIndex:10000,marginLeft:10}}
								content={seachFormContent}
								searchFilter={searchEquipmentFormOptions}
								onChange={this.changeSearchFormContent}
								onFilter={this.changeSearchFormFilter}
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
