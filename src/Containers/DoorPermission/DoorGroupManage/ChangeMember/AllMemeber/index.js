import React from 'react';
import {
	Title,
	Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn,TableFooter,
	Button,
	Section,
	Dialog,
	Message,
	Grid,Row,
	ListGroup,ListGroupItem,
	Tooltip,
	Drawer ,
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import './index.less';
 import SearchAllMember from './SearchAllMember';



import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class DoorGroupManage extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			itemDetail:{},
			groupLevelOptions: [{
				label:"普通组",
				value: "NORMAL"
			},{
				label:"全国通开组",
				value: "COUNTRYWIDE"
			},{
				label:"社区通开组",
				value: "COMMUNITYWIDE"
			}],
			getDoorPermissionListParams:{
				communityId : '',
				customerId : '',
				name : '',
				page : '',
				pageSize : 15,
				groupLevel:''
			}
		}
	}

	componentDidMount(){
		State.getDicOptions();
	}
	
	onLoaded=(response)=>{
		let list = response;
		this.setState({
			list
		})
	}

	openDeleteGroupFun=()=>{
		State.openDeleteGroup = !State.openDeleteGroup;
	}

	//操作相关
	onOperation=(type, itemDetail)=>{
		State.itemDetail = itemDetail;
		this.setState({
			itemDetail
		})
		let _this = this;
		if (type == 'delete') {
			
			_this.openDeleteGroupFun();
		}
		if(type == 'detail') {
			// _this.openUpgradeAddFun();
		}
		if(type=='changeMember'){
			
		}
	}

	
	onPageChange=(page)=>{
		this.setState({
			realPage : page 
		})
	}



	openNewCreateDoorGoupDialog=()=>{
		State.openNewCreateDoorGroup = !State.openNewCreateDoorGroup;
	}

	submitSearchParams=(params)=>{
		let {getDoorPermissionListParams} = this.state;
		var params = Object.assign({},getDoorPermissionListParams,params);
		this.setState({
			getDoorPermissionListParams:params
		})
	}


	submitNewCreateDoorGoup=(values)=>{
		let that= this;
		let {getDoorPermissionListParams} = this.state;
		Http.request('newCreateDoorGroup',{},values).then(function(response) {
			Message.success("添加成功");
			that.refreshPage();
			that.openNewCreateDoorGoupDialog();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}


	refreshPage=()=>{
		let {getDoorPermissionListParams}  =this.state;
		var newObj = Object.assign({},getDoorPermissionListParams,{date :new Date()});
		this.setState({
			getDoorPermissionListParams:newObj
		})
	}

	clearParams=()=>{
		this.setState({
			getDoorPermissionListParams:{
				communityId : '',
				customerId : '',
				name : '',
				page : '',
				pageSize : 15,
				groupLevel:''
			}
		})
	}

	confirmDelete=()=>{
		
		let {itemDetail,getDoorPermissionListParams}  = this.state;
		let that = this;
		Http.request('deleteDoorGroup',{id:itemDetail.id}).then(function(response) {
			Message.success("删除成功");
			that.refreshPage();
			that.openDeleteGroupFun();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}

	openChangeMemeberFun=()=>{

		State.openChangeMemeberDialog = !State.openChangeMemeberDialog;
	}



	render() {
		let {
			groupLevelOptions,getDoorPermissionListParams,
			list,seleced,itemDetail
		} = this.state;
		
		return (
		    <div className="change-member-item-box" style={{minHeight:600,backgroundColor:"#fff"}} >
				<Title value="门禁组管理"/>
				<Section title={`门禁组管理`} description="" >
					
					<div style={{float:"right",marginTop:"-60px"}}>
						<Button label="新建门禁组"  onTouchTap={this.openNewCreateDoorGoupDialog} className="button-list"/>
					</div>
					{/* <div>
						<SearchAllMember submitSearchParams={this.submitSearchParams} clearParams={this.clearParams}/>
					</div> */}

					<Table
						className="member-list-table"
						style={{marginTop:10,position:'inherit'}}
						onLoaded={this.onLoaded}
						ajax={true}
						onProcessData={(state)=>{
							return state;
							}}
						exportSwitch={false}
						onOperation={this.onOperation}
						ajaxFieldListName='items'
						ajaxUrlName='getDoorPermissionList'
						ajaxParams={getDoorPermissionListParams}
						onPageChange={this.onPageChange}
						displayCheckbox={false}
					>
						<TableHeader>
							<TableHeaderColumn>姓名</TableHeaderColumn>
							<TableHeaderColumn>联系电话</TableHeaderColumn>
							<TableHeaderColumn>社区</TableHeaderColumn>
							<TableHeaderColumn>公司</TableHeaderColumn>
							<TableHeaderColumn>邮箱</TableHeaderColumn>
							<TableHeaderColumn>操作</TableHeaderColumn>
						</TableHeader>
						<TableBody style={{position:'inherit'}}>
							<TableRow>

							<TableRowColumn 
								style={{width:"12%",overflow:"visible"}} 
								name="name" 
								component={(value,oldValue,itemData)=>{
								var TooltipStyle=""
								if(value.length==""){
									TooltipStyle="none"

								}else{
									TooltipStyle="block";
								}
									return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}} >{value}</span>
									<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
							}} ></TableRowColumn>

							<TableRowColumn name="groupLevel"
							style={{width:"5%",overflow:"visible"}} 
							options={groupLevelOptions}
							component={(value,oldValue)=>{
								if(value==""){
									value="-"
								}
								return (<span>{value}</span>)}}
							></TableRowColumn>

							<TableRowColumn name="communityName"
							style={{width:"10%",overflow:"visible"}} 
							component={(value,oldValue)=>{
								if(value==""){
									value="-"
								}
								return (<span>{value}</span>)}}
							></TableRowColumn>
							


							<TableRowColumn 
								style={{width:"10%",overflow:"visible"}} 
								name="customerName" 
								component={(value,oldValue,itemData)=>{
								var TooltipStyle=""
								if(value.length==""){
									TooltipStyle="none"

								}else{
									TooltipStyle="block";
								}
									return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}} >{value}</span>
									<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
							}} ></TableRowColumn>

							
							<TableRowColumn type="operation" style={{width:"16%",overflow:"visible"}} >

								<Button  label="添加成员"  type="operation" operation="changeMember"/>
								
							</TableRowColumn>

						</TableRow>
						</TableBody>
					</Table>

				</Section>
			</div>
		);

	}

}
