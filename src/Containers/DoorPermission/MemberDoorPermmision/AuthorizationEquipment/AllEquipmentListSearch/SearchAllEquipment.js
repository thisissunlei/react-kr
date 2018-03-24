

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
	SearchFormsNew
} from 'kr-ui';
import './index.less';
import {DateFormat} from 'kr/Utils';

import PropsState from '../../State';
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
					value:"doorCode",
					className:"group-equipment-doorCode"
				},{
					label:"屏幕标题",
					value:"title",
					className:"group-equipment-title"
					
			    },{
					label:"硬件ID",
					value:"deviceId",
					className:"group-equipment-deviceId"
					
				}
			],
			searchFormFilterContent : {
				doorCode : '',
				deviceId : '',
				title : ''
			}
		}
	}
	componentDidMount(){
		
	}

	

	onSubmit=(values)=>{
		
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
		let newObj = {};
		newObj[seachFormFilter] = content;

		let emptyObj ={doorCode : '',deviceId : '',title : ''}
		let formDateObj = Object.assign(emptyObj,newObj);
		Store.dispatch(change('SearchGroupForm','deviceId',formDateObj.deviceId || ""));
		Store.dispatch(change('SearchGroupForm','doorCode',formDateObj.doorCode || ""));
		Store.dispatch(change('SearchGroupForm','title',formDateObj.title|| ""));
		
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
		const { error, handleSubmit, pristine, reset,content,filter,} = this.props;
		let {searchEquipmentFormOptions,seachFormContent,floorsOptions} = this.state;
		let doorTypeOptions = PropsState.doorTypeOptions;
		var str= new Date().getTime();
		str =  "search-form-" + str;

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
						<KrField name="doorType"
							component="select"
							label="门类型："
							onChange = {this.onchangeDoorType}
							options={doorTypeOptions}
							style={{width:237}}
							inline={true}
						/>
					</span>
					</ListGroupItem>
					
					<ListGroupItem >
						<span style={{display:"inline-block",marginRight:10}}>
							<SearchFormsNew onSubmit={this.onSearchSubmit}  
								style={{zIndex:10000,marginLeft:10}}
								content={seachFormContent}
								searchFilter={searchEquipmentFormOptions}
								onChange={this.changeSearchFormContent}
								onFilter={this.changeSearchFormFilter}
								filterSpecialClass ={str}
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
