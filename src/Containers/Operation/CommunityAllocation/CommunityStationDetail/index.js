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
import NewAddStation from './NewAddStation';
import EditStation from './EditStation';
import DeleteStation from './DeleteStation';
import SearchUpperForm from './SearchUpperForm';
import ImportData from './ImportData';
@inject("FormModel")
@inject("CommunityStationModel")
@observer
class  CommunityStationDetail extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
		 //社区名称
		communityName:'',
		//空间名称数据准备
		stationName:{},
		//高级查询空间名称
		spacesName:[],
		//楼层数据准备
		floorData:[],
		}
	}

	componentWillMount(){
		  var href=window.location.href.split('communityAllocation/')[1].split('/')[0];
		  //工位列表数据准备
			var data={};
			data.communityId=href;
			var _this=this;
			Http.request('station-param-data',data).then(function(response) {
				_this.setState({
					communityName:response.communityName,
					stationName:response.floorSpaces,
					floorData:response.floors,
					spacesName:response.spaces
				})
		 }).catch(function(err) {
				Message.error(err.message);
		 });
        this.props.CommunityStationModel.searchParams.communityId=href;
		this.props.CommunityStationModel.communityId=href;
	}

    //新建工位打开
	openAddStation=()=>{
		let {FormModel} = this.props;
		FormModel.getForm("NewAddStation")
		.changeValues({code:'',area:'',belongSpace:'',enable:'',floor:'',spaceId:'',stationType:'',quotedPrice:''});
		this.props.CommunityStationModel.addStation();
		this.props.CommunityStationModel.isCode=false;
		this.props.CommunityStationModel.deleteId='';
	}
	//新建工位取消
	cancelAddCode=()=>{
		this.props.CommunityStationModel.addStation();
	}
	//编辑工位取消
	cancelEditCode=()=>{
		this.props.CommunityStationModel.editStation();
	}
 //查看相关操作
 onOperation=(type,itemDetail)=>{
   if(type=='edit'){
		 this.props.CommunityStationModel.editStation();
		 this.props.CommunityStationModel.deleteId=itemDetail.id;
		 this.props.CommunityStationModel.isCode=false;
	 }else if(type=='delete'){
		 this.props.CommunityStationModel.deleteId=itemDetail.id;
         this.props.CommunityStationModel.deleteStation();
	 }
 }

 //删除取消
 cancelDelete=()=>{
	 this.props.CommunityStationModel.deleteStation();
 }
 //删除提交
 deleteSubmit=()=>{
	 this.props.CommunityStationModel.deleteSubmitFunc(this.props.CommunityStationModel.deleteId);
 }

 //导出
onExport=(values)=> {
let {searchParams} = this.props.CommunityStationModel;
let defaultParams = {
	belongSpace:'',
	code:'',
	enable:'',
	spaceId:'',
	stationType:''
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
	var url = `/api/krspace-finance-web/cmt/station/export?${where.join('&')}`
	window.location.href = url;
}

 //新建提交
 stationAddSubmit=(params)=>{
   
   this.props.CommunityStationModel.stationSubmit(params);
 }

 //搜索
 onSearchSubmit=(params)=>{
	 let data={
		 code:params.content
	 }
	 this.props.CommunityStationModel.searchParams= Object.assign({},this.props.CommunityStationModel.searchParams,data);
	 this.props.CommunityStationModel.searchParams.time=+new Date();
 }

 //高级查询
openSearchUpperDialog=()=>{
		var params={
		  code:'',
			stationType:'',
			enable:'',
			belongSpace:'',
			spaceId:'',
		}
   this.props.CommunityStationModel.searchParams=Object.assign({},this.props.CommunityStationModel.searchParams,params);;
	 this.props.CommunityStationModel.searchUpperCustomer();
}
//高级查询取消
cancelSearchUpperDialog=()=>{
	this.props.CommunityStationModel.searchUpperCustomer();
}
//高级查询提交
onSearchUpperSubmit=(params)=>{
 this.props.CommunityStationModel.searchParams= Object.assign({},this.props.CommunityStationModel.searchParams,params);
 this.props.CommunityStationModel.searchParams.time=+new Date();
 this.props.CommunityStationModel.searchParams.page = 1;
 this.props.CommunityStationModel.searchUpperCustomer();
}

//导入
openImporData=()=>{
	this.props.CommunityStationModel.openImportData();
}

//下载模版
onLoadDemo=()=>{
	let url = `/api/krspace-finance-web/cmt/station/import/actions/download-templete`;
	window.location.href = url;
}

//点空白
whiteClose=()=>{
  this.props.CommunityStationModel.openStation=false;
	this.props.CommunityStationModel.openStationEdit=false;
}

//选择社区
SelectCommunity=()=>{
	window.location.href=`./#/operation/communityAllocation/communityStation`;
}

onPageChange=(page)=>{
   var searchParams={
	   page:page
   }
   this.props.CommunityStationModel.searchParams=Object.assign({},this.props.CommunityStationModel.searchParams,searchParams);
}

	render(){

		let {communityName,stationName,spacesName,floorData}=this.state;

		let title=`工位列表(${communityName})`;
		return(
			<div className='community-list'>
				<Title value="工位列表"/>
				<Section title={title} description="" style={{marginBottom:-5,minHeight:910}}>
				<Row style={{marginBottom:21,position:'relative',zIndex:5}}>

			          <Col
					     style={{float:'left'}}
					   >
									<div style={{display:'inline-block',marginRight:20}}>
										<Button
											label="新建"
											type='button'
											onTouchTap={this.openAddStation}
											operateCode="oper_cmt_station_edit"
										/>
									</div>
									<div style={{display:'inline-block',marginRight:20}}>
										<Button
											label="选择社区"
											type='button'
											onTouchTap={this.SelectCommunity}
										/>
									</div>
									<Button
											label="导入"
											type='button'
											onTouchTap={this.openImporData}
											operateCode="oper_cmt_station_import"
									/>
					  </Col>

                      <Col  style={{marginTop:0,float:"right",marginRight:-10}}>
				          <ListGroup>
				            <ListGroupItem><SearchForms placeholder='请输入工位编号'  onSubmit={this.onSearchSubmit}/></ListGroupItem>
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
	            ajaxParams={this.props.CommunityStationModel.searchParams}
	            ajaxUrlName='station-list'
	            ajaxFieldListName="items"
					  >
		            <TableHeader>
		              <TableHeaderColumn>工位编号</TableHeaderColumn>
		              <TableHeaderColumn>所在楼层</TableHeaderColumn>
                  <TableHeaderColumn>工位性质</TableHeaderColumn>
		              <TableHeaderColumn>是否属于空间</TableHeaderColumn>
		              <TableHeaderColumn>空间名称</TableHeaderColumn>
		              <TableHeaderColumn>报价</TableHeaderColumn>
		              <TableHeaderColumn>状态</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>
		          	</TableHeader>

			        <TableBody >
			              <TableRow>
			                <TableRowColumn name="code"></TableRowColumn>
                      <TableRowColumn name="floor"></TableRowColumn>
			                <TableRowColumn name="stationType" options={[{label:'开放',value:'OPEN'},{label:'半开放',value:'HALF_OPEN'},{label:'封闭',value:'CLOSED'}]}></TableRowColumn>
                      <TableRowColumn name="belongSpace"  options={[{label:'属于',value:'true'},{label:'不属于',value:'false'}]}></TableRowColumn>
			                <TableRowColumn name="spaceName"></TableRowColumn>
			                <TableRowColumn name="quotedPrice"></TableRowColumn>
			                <TableRowColumn name="enable" options={[{label:'启用',value:'true'},{label:'未启用',value:'false'}]}></TableRowColumn>
			                <TableRowColumn type="operation">
			                    <Button label="编辑"  type="operation"  operation="edit" operateCode="oper_cmt_station_edit"/>
			                    <Button label="删除"  type="operation"  operation="delete" operateCode="oper_cmt_station_delete"/>
			                </TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
            </Table>
       </Section>

			 {/*新建工位*/}
			 <Drawer

					open={this.props.CommunityStationModel.openStation}
					width={750}
					onClose={this.whiteClose}
					openSecondary={true}
					containerStyle={{top:60,paddingBottom:48,zIndex:20}}
					>
				<NewAddStation
					onCancel={this.cancelAddCode}
					onSubmit={this.stationAddSubmit}
					stationName={stationName}
					floorData={floorData}
				/>
			 </Drawer>

			 {/*编辑工位*/}
			 <Drawer
					open={this.props.CommunityStationModel.openStationEdit}
					width={750}
					onClose={this.whiteClose}
					openSecondary={true}
					containerStyle={{top:60,paddingBottom:48,zIndex:20}}
					>
				<EditStation
					onCancel={this.cancelEditCode}
					onSubmit={this.stationAddSubmit}
					id={this.props.CommunityStationModel.deleteId}
					stationName={stationName}
					floorData={floorData}
				/>
			 </Drawer>

			 {/*删除*/}
			 <Dialog
					title="提示"
					onClose={this.cancelDelete}
					open={this.props.CommunityStationModel.openDelete}
					contentStyle ={{ width: '440px',height:'240px'}}
					>
					<DeleteStation
						 onCancel={this.cancelDelete}
						 onSubmit={this.deleteSubmit}
					/>
			</Dialog>

			{/*高级查询*/}
			<Dialog
				title="高级查询"
				onClose={this.cancelSearchUpperDialog}
				open={this.props.CommunityStationModel.openSearchUpper}
				contentStyle ={{ width: '666px',height:'382px'}}
				>
				<SearchUpperForm
					onCancel={this.cancelSearchUpperDialog}
					onSubmit={this.onSearchUpperSubmit}
					spacesName={spacesName}
				/>
				</Dialog>

				{/*导入*/}
				<Dialog
					title="导入工位"
					onClose={this.openImporData}
					open={this.props.CommunityStationModel.openImport}
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
export default CommunityStationDetail;
