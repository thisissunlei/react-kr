import React from 'react';
import {Http} from 'kr/Utils';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Dialog,
	Section,
	Grid,
	Row,
	Col,
	Drawer,
	SearchForms,
	Button,
	KrField,
	KrDate,
	Title,
	ListGroup,
	ListGroupItem,
	Message,
	CheckPermission
} from 'kr-ui';
import {
	observer,
	inject
} from 'mobx-react';
import './index.less';
import NewAddMeeting from './NewAddMeeting';
import EditMeeting from './EditMeeting';
import DeleteMeeting from './DeleteMeeting';
import MeetingsearchUpperForm from './SearchUpperForm';
import ImportData from './ImportData';
@inject("FormModel")
@inject("CommunityMeetingModel")
@observer
class  CommunityMeetingRoomDetail extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	componentWillMount(){
		var href=window.location.href.split('communityAllocation/')[1].split('/')[0];
		this.props.CommunityMeetingModel.stationDataReady(href);
        this.props.CommunityMeetingModel.searchParams.communityId=href;
		this.props.CommunityMeetingModel.communityId=href;
	}

    //新建会议室打开
	openAddStation=()=>{
		const {FormModel} = this.props;
		FormModel.getForm("NewAddMeeting")
		.changeValues({capacity:'',area:'',deviceIds:'',enable:'',floor:'',location:'',name:'',spaceType:'',quotedPrice:''});
		this.props.CommunityMeetingModel.addStation();
		this.props.CommunityMeetingModel.isCode=false;
		this.props.CommunityMeetingModel.deleteId='';
	}
	//新建会议室取消
	cancelAddCode=()=>{
		this.props.CommunityMeetingModel.addStation();
	}
	//编辑会议室取消
	cancelEditCode=()=>{
		this.props.CommunityMeetingModel.editStation();
	}
   //查看相关操作
   onOperation=(type,itemDetail)=>{
   if(type=='edit'){
		 this.props.CommunityMeetingModel.editStation();
		 this.props.CommunityMeetingModel.deleteId=itemDetail.id;
		 this.props.CommunityMeetingModel.isCode=false;
	 }else if(type=='delete'){
		 this.props.CommunityMeetingModel.deleteId=itemDetail.id;
         this.props.CommunityMeetingModel.deleteStation();
	 }
 }

 //删除取消
 cancelDelete=()=>{
	 this.props.CommunityMeetingModel.deleteStation();
 }
 //删除提交
 deleteSubmit=()=>{
	 this.props.CommunityMeetingModel.deleteSubmitFunc(this.props.CommunityMeetingModel.deleteId);
 }

 //导出
onExport=(values)=> {
let {searchParams} = this.props.CommunityMeetingModel;
let defaultParams = {
	capacityBegin:'',
	capacityEnd:'',
	deviceIds:[],
	enable:'',
	searchKey:'',
	searchType:''
}
searchParams = Object.assign({},defaultParams,searchParams);
	let ids = [];
	if (values.length != 0) {
		values.map((item, value) => {
			ids.push(item.id)
		});
	}
	var where=[];
	for(var item in searchParams){
		if(searchParams.hasOwnProperty(item)){
			 where.push(`${item}=${searchParams[item]}`);
		}
	}
	where.push(`ids=${ids}`);
	var url = `/api/krspace-finance-web/cmt/space/export?${where.join('&')}`
	window.location.href = url;
}

 //新建提交
 stationAddSubmit=(params)=>{
 	
	 params = Object.assign({},params);
	 //亮点开始
	 var maskList=[];
	 if(params.maskStation){
		params.maskStation.map((item)=>{
				 if(!item.list){
					 return ;
			 }
				maskList.push(item.list);
		});
	}
	 params.activeTypes=maskList;

	 if(params.spaceType=='BOARDROOM'){
		 if(params.orderStartTimeStr&&params.orderEndTimeStr){
			 if(params.orderStartTimeStr>params.orderEndTimeStr){
				 Message.error('预定开始时间不能大于预定结束时间');
				 return ;
			 }
		}else if(params.orderStartTimeStr&&!params.orderEndTimeStr){
			Message.error('请输入预定结束时间');
			return ;
		}else if(!params.orderStartTimeStr&&params.orderEndTimeStr){
			Message.error('请输入预定开始时间');
			return ;
		}else{
			Message.error('请输入预定时间段');
			return ;
		}
	 }

	 delete params.orderEndTime;
	 delete params.orderStartTime;
	 delete params.maskStation;
   this.props.CommunityMeetingModel.stationSubmit(params);
 }

 //搜索
 onSearchSubmit=(params)=>{
 	 if(!params.content){
 	 	params.filter='';
 	 }
	 let data={
		 searchKey:params.content,
		 searchType:params.filter
	 }
	 this.props.CommunityMeetingModel.searchParams= Object.assign({},this.props.CommunityMeetingModel.searchParams,data);
	 this.props.CommunityMeetingModel.searchParams.time=+new Date();
 }

    //高级查询
   openSearchUpperDialog=()=>{
		var params={
		    capacityBegin:'',
			capacityEnd:'',
			deviceIds:[],
			enable:'',
			searchKey:'',
			searchType:'',
			spaceType:''
		}
   this.props.CommunityMeetingModel.searchParams=Object.assign({},this.props.CommunityMeetingModel.searchParams,params);;
   this.props.CommunityMeetingModel.searchUpperCustomer();
}
//高级查询取消
cancelSearchUpperDialog=()=>{
	this.props.CommunityMeetingModel.searchUpperCustomer();
}
//高级查询提交
onSearchUpperSubmit=(params)=>{
 this.props.CommunityMeetingModel.searchParams= Object.assign({},this.props.CommunityMeetingModel.searchParams,params);
 this.props.CommunityMeetingModel.searchParams.time=+new Date();
 this.props.CommunityMeetingModel.searchParams.page = 1;

 this.props.CommunityMeetingModel.searchUpperCustomer();
}

//导入
openImporData=()=>{
	this.props.CommunityMeetingModel.openImportData();
}

//下载模版
onLoadDemo=()=>{
	let url = `/api/krspace-finance-web/cmt/space/import/actions/download-templete`;
	window.location.href = url;
}

//点空白
whiteClose=()=>{
  this.props.CommunityMeetingModel.openStation=false;
	this.props.CommunityMeetingModel.openStationEdit=false;
}

//选择社区
SelectCommunity=()=>{
	window.location.href=`./#/product/communityAllocation/CommunityMeetingRoom`;
}

onPageChange=(page)=>{
   var searchParams={
	   page:page
   }
   this.props.CommunityMeetingModel.searchParams=Object.assign({},this.props.CommunityMeetingModel.searchParams,searchParams);
}

	render(){

		let options=[
         {label:'空间名称',value:'NAME'},
         {label:'空间编码',value:'CODE'},
		]

		let title=`空间列表(${this.props.CommunityMeetingModel.communityName})`;
		return(
			<div className='meeting-list'>
				<Title value="空间列表"/>
				<Section title={title} description="" style={{marginBottom:-5,minHeight:910}}>
				<Row style={{marginBottom:21,position:'relative',zIndex:5}}>

			          <Col
					     style={{float:'left'}}
					   >
									<div style={{display:'inline-block',marginRight:20}}><Button
											label="新建"
											type='button'
											onTouchTap={this.openAddStation}
											operateCode="oper_cmt_space_edit"
									/></div>
									<div style={{display:'inline-block',marginRight:20}}><Button
											label="选择社区"
											type='button'
											onTouchTap={this.SelectCommunity}
									/></div>
									<Button
											label="导入"
											type='button'
											onTouchTap={this.openImporData}
											operateCode="oper_cmt_space_import"
									/>
					  </Col>

                      <Col  style={{marginTop:0,float:"right",marginRight:-10}}>
				          <ListGroup>
				            <ListGroupItem><SearchForms placeholder='请输入工位编号' searchFilter={options} onSubmit={this.onSearchSubmit}/></ListGroupItem>
				            <ListGroupItem><Button searchClick={this.openSearchUpperDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'3'}}/></ListGroupItem>
				          </ListGroup>
			          </Col>

	          </Row>

	         <Table
			        style={{marginTop:8}}
              ajax={true}
              onOperation={this.onOperation}
	            displayCheckbox={true}
	            exportSwitch={true}
			        onExport={this.onExport}
					onPageChange={this.onPageChange}
	            ajaxParams={this.props.CommunityMeetingModel.searchParams}
	            ajaxUrlName='meeting-room-list'
	            ajaxFieldListName="items"
					  >
		            <TableHeader>
		              <TableHeaderColumn>空间类型</TableHeaderColumn>
		              <TableHeaderColumn>空间编码</TableHeaderColumn>
                     <TableHeaderColumn>空间名称</TableHeaderColumn>
		              <TableHeaderColumn>可容纳人数</TableHeaderColumn>
					 <TableHeaderColumn>面积（㎡）</TableHeaderColumn>
		              <TableHeaderColumn>所在楼层</TableHeaderColumn>
		              <TableHeaderColumn>报价</TableHeaderColumn>
		              <TableHeaderColumn>状态</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>
		          	</TableHeader>

			        <TableBody >
			              <TableRow>

			                <TableRowColumn name="typeName" options={[{label:'独立办公区',value:'INDEPENDENT_OFFICE'},{label:'会议室',value:'BOARDROOM'},{label:'路演厅',value:'ROADSHOW_HALL'}]}></TableRowColumn>
							<TableRowColumn name="code"></TableRowColumn>
                      <TableRowColumn name="name"></TableRowColumn>
			                <TableRowColumn name="capacity"></TableRowColumn>
                      <TableRowColumn name="area"></TableRowColumn>
			                <TableRowColumn name="floor"></TableRowColumn>
			                <TableRowColumn name="quotedPrice"></TableRowColumn>
			                <TableRowColumn name="enable" options={[{label:'启用',value:'true'},{label:'禁用',value:'false'}]}></TableRowColumn>
			                <TableRowColumn type="operation">
			                    <Button label="编辑"  type="operation"  operation="edit" operateCode="oper_cmt_space_edit"/>
			                    <Button label="删除"  type="operation"  operation="delete" operateCode="oper_cmt_space_delete"/>
			                </TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
            </Table>
       </Section>

			 {/*新建工位*/}
			 <Drawer
					open={this.props.CommunityMeetingModel.openStation}
					width={750}
					onClose={this.whiteClose}
					openSecondary={true}
					containerStyle={{top:60,paddingBottom:48,zIndex:20}}
					>
				<NewAddMeeting
					onCancel={this.cancelAddCode}
					onSubmit={this.stationAddSubmit}
				/>
			 </Drawer>

			 {/*编辑工位*/}
			 <Drawer
					open={this.props.CommunityMeetingModel.openStationEdit}
					width={750}
					onClose={this.whiteClose}
					openSecondary={true}
					containerStyle={{top:60,paddingBottom:48,zIndex:20}}
					>
				<EditMeeting
					onCancel={this.cancelEditCode}
					onSubmit={this.stationAddSubmit}
					id={this.props.CommunityMeetingModel.deleteId}
				/>
			 </Drawer>

			 {/*删除*/}
			 <Dialog
					title="提示"
					onClose={this.cancelDelete}
					open={this.props.CommunityMeetingModel.openDelete}
					contentStyle ={{ width: '440px',height:'240px'}}
					>
					<DeleteMeeting
						 onCancel={this.cancelDelete}
						 onSubmit={this.deleteSubmit}
					/>
			</Dialog>

			{/*高级查询*/}
			<Dialog
				title="高级查询"
				onClose={this.cancelSearchUpperDialog}
				open={this.props.CommunityMeetingModel.openSearchUpper}
				contentStyle ={{ width: '666px'}}
				>
				<MeetingsearchUpperForm
					onCancel={this.cancelSearchUpperDialog}
					onSubmit={this.onSearchUpperSubmit}
				/>
				</Dialog>

				{/*导入*/}
				<Dialog
					title="导入空间"
					onClose={this.openImporData}
					open={this.props.CommunityMeetingModel.openImport}
					contentStyle ={{ width: '444px'}}
					>
					<ImportData
						onCancel={this.openImporData}
						onLoadDemo={this.onLoadDemo}
					/>
					</Dialog>



	 </div>
	 );
	}

}
export default CommunityMeetingRoomDetail;
