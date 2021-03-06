

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



class SearchAllEquipmentForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			seachFormContent : '',
			seachFormFilter : "doorCode",
			floorsOptions:[],
			doorTypeOptions : [],
			communityId: '',
			doorType:'',
			floor: '',
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
		this.getDoorTypeOptions();
	}


	getDoorTypeOptions=()=>{
		let that = this;
		Http.request('getWarningType',{}).then(function(response) {
			var doorTypeArrNew=[];
			
			if(response.DoorType){
				for (var i=0;i<response.DoorType.length;i++){
					
					doorTypeArrNew[i] = {
						label:response.DoorType[i].desc,
						value:response.DoorType[i].value
					}
				}
			}
	
			that.setState({
				doorTypeOptions : doorTypeArrNew
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	

	onSubmit=(values)=>{
		
		let {seachFormContent,seachFormFilter} =this.state;
		let SearchFormData = {};
		SearchFormData[seachFormFilter] = seachFormContent;
		let newObj = {pageSize:25}
		let sendParams = Object.assign({},values,newObj,SearchFormData)
		let {submitSearchParams}=this.props;
		submitSearchParams && submitSearchParams(sendParams);
		
	}

	

	changeSearchFormContent=(content)=>{
		let that = this;
		let {seachFormFilter} = this.state;
		this.setState({
			seachFormContent : content
		},function(){
			// that.resetSearchFormData(content);
		})

	}

	changeSearchFormFilter=(filter)=>{
		let that = this;
		let {seachFormContent} = this.state;
		this.setState({
			seachFormFilter : filter
		},function(){
			// that.resetSearchFormData(seachFormContent);
		})
		
	}

	resetSearchFormData=(content)=>{

		
	}

	onChangeCommunity=(community)=>{
		
		let _this = this;
		var communityIdReal,floorReal;
		if(!community){

			floorReal = '';
			Store.dispatch(change('SearchAllEquipmentForm','floor',''));
			_this.setState({
				floorsOptions : [],
				communityId : ''
			})

		}else{
			_this.setState({
				communityId : community.id
			})

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
	}

	onchangeFloor=(item)=>{
		if(!item){
			this.setState({
				floor: '',
			})
		}else{
			this.setState({
				floor: item.value
			})
		}
	}

	onchangeDoorType=(item)=>{
		
		if(!item){
			this.setState({
				doorType: '',
			})
		}else{
			this.setState({
				doorType: item.value
			})
		}
	}

	onSearchFormSubmit=()=>{

		let {communityId,doorType,floor,seachFormFilter,seachFormContent} = this.state;
		var param ={};
		param[seachFormFilter] = seachFormContent;
		var searchParams = {
			communityId: communityId,
			doorType: doorType,
			floor : floor,
			page: 1,
			pageSize: 25,
		}
		var sendParams = Object.assign({},searchParams,param);
		
		let {submitSearchParams} =this.props;
		submitSearchParams && submitSearchParams(sendParams);
	}

	render(){
		const { error, handleSubmit, pristine, reset,content,filter,} = this.props;
		let {searchEquipmentFormOptions,seachFormContent,floorsOptions,doorTypeOptions} = this.state;
		
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
								inputEnter={this.onSearchFormSubmit}
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
export default SearchAllEquipmentForm = reduxForm({
	form: 'SearchAllEquipmentForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(SearchAllEquipmentForm);
