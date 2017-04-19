import React from 'react';
import {Http} from 'kr/Utils';
import {reduxForm}  from 'kr/Utils/ReduxForm';
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
	Message
} from 'kr-ui';
import {
	observer,
	inject
} from 'mobx-react';
import './index.less';
import State from './State';
import NewAddStation from './NewAddStation';
import EditStation from './EditStation';
import DeleteStation from './DeleteStation';
import SearchUpperForm from './SearchUpperForm';
import ImportData from './ImportData';
//@inject("FormModel")
@observer
class  CommunityStationDetail extends React.Component{

	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}

	constructor(props,context){
		super(props, context);
	}

	componentDidMount(){
		State.stationDataReady(this.context.router.params.communityId);
    State.searchParams.communityId=this.context.router.params.communityId;
	}

 //新建工位打开
	openAddStation=()=>{
		let {FormModel}=this.props;
		FormModel.changeValues('NewAddStation',{code:''});
		State.addStation();
	}
	//新建工位取消
	cancelAddCode=()=>{
		State.addStation();
	}
	//编辑工位取消
	cancelEditCode=()=>{
		State.editStation();
	}
 //查看相关操作
 onOperation=(type,itemDetail)=>{
   if(type=='edit'){
		 State.editStation();
		 State.deleteId=itemDetail.id;
	 }else if(type=='delete'){
		 State.deleteId=itemDetail.id;
     State.deleteStation();
	 }
 }

 //删除取消
 cancelDelete=()=>{
	 State.deleteStation();
 }
 //删除提交
 deleteSubmit=()=>{
	 State.deleteSubmitFunc(State.deleteId);
 }

 //导出
onExport=(values)=> {
let {searchParams} = State;
let defaultParams = {
	belongSpace:'',
	code:'',
	communityId:'',
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
   State.stationSubmit(params);
 }

 //搜索
 onSearchSubmit=(params)=>{
	 let data={
		 code:params.content
	 }
	 State.searchParams= Object.assign({},State.searchParams,data);
	 State.searchParams.time=+new Date();
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
   State.searchParams=params;
	 State.searchUpperCustomer();
}
//高级查询取消
cancelSearchUpperDialog=()=>{
	State.searchUpperCustomer();
}
//高级查询提交
onSearchUpperSubmit=(params)=>{
 State.searchParams= Object.assign({},State.searchParams,params);
 State.searchParams.time=+new Date();
 State.searchUpperCustomer();
}

//导入
openImporData=()=>{
	State.openImportData();
}

//下载模版
onLoadDemo=()=>{
	let url = `/api/krspace-finance-web/cmt/station/import/actions/download-templete`;
	window.location.href = url;
}

//点空白
whiteClose=()=>{
  State.openStation=false;
	State.openStationEdit=false;
}

//选择社区
SelectCommunity=()=>{
	window.location.href=`./#/operation/communityAllocation/communityStation`;
}

	render(){

		let title=`工位列表(${State.communityName})`;
		return(
			<div className='community-list'>
				<Title value="工位列表"/>
				<Section title={title} description="" style={{marginBottom:-5,minHeight:910}}>
				<Row style={{marginBottom:21,position:'relative',zIndex:5}}>

			          <Col
					     style={{float:'left'}}
					   >
									<div style={{display:'inline-block',marginRight:20}}><Button
											label="新建"
											type='button'
											onTouchTap={this.openAddStation}
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
	            ajaxParams={State.searchParams}
	            ajaxUrlName='station-list'
	            ajaxFieldListName="items"
					  >
		            <TableHeader>
		              <TableHeaderColumn>工位编号</TableHeaderColumn>
		              <TableHeaderColumn>所在楼层</TableHeaderColumn>
                  <TableHeaderColumn>工位性质</TableHeaderColumn>
		              <TableHeaderColumn>是否属于会议室</TableHeaderColumn>
		              <TableHeaderColumn>会议室名称</TableHeaderColumn>
		              <TableHeaderColumn>状态</TableHeaderColumn>
		              <TableHeaderColumn>操作</TableHeaderColumn>
		          	</TableHeader>

			        <TableBody >
			              <TableRow>
			                <TableRowColumn name="code"></TableRowColumn>
                      <TableRowColumn name="floor"></TableRowColumn>
			                <TableRowColumn name="stationType"></TableRowColumn>
                      <TableRowColumn name="belongSpace"  options={[{label:'属于',value:'true'},{label:'不属于',value:'false'}]}></TableRowColumn>
			                <TableRowColumn name="spaceName"></TableRowColumn>
			                <TableRowColumn name="enable" options={[{label:'显示',value:'true'},{label:'不显示',value:'false'}]}></TableRowColumn>
			                <TableRowColumn type="operation">
			                    <Button label="编辑"  type="operation"  operation="edit" />
			                    <Button label="删除"  type="operation"  operation="delete" />
			                </TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
            </Table>
       </Section>

			 {/*新建工位*/}
			 <Drawer
					open={State.openStation}
					width={750}
					onClose={this.whiteClose}
					openSecondary={true}
					containerStyle={{top:60,paddingBottom:48,zIndex:20}}
					>
				<NewAddStation
					onCancel={this.cancelAddCode}
					onSubmit={this.stationAddSubmit}
				/>
			 </Drawer>

			 {/*编辑工位*/}
			 <Drawer
					open={State.openStationEdit}
					width={750}
					onClose={this.whiteClose}
					openSecondary={true}
					containerStyle={{top:60,paddingBottom:48,zIndex:20}}
					>
				<EditStation
					onCancel={this.cancelEditCode}
					onSubmit={this.stationAddSubmit}
					id={State.deleteId}
				/>
			 </Drawer>

			 {/*删除*/}
			 <Dialog
					title="提示"
					onClose={this.cancelDelete}
					open={State.openDelete}
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
				open={State.openSearchUpper}
				contentStyle ={{ width: '666px',height:'382px'}}
				>
				<SearchUpperForm
					onCancel={this.cancelSearchUpperDialog}
					onSubmit={this.onSearchUpperSubmit}
				/>
				</Dialog>

				{/*导入*/}
				<Dialog
					title="导入工位"
					onClose={this.openImporData}
					open={State.openImport}
					contentStyle ={{ width: '444px'}}
					>
					<ImportData
						onCancel={this.openImporData}
						onSubmit={this.onSearchUpperSubmit}
						onLoadDemo={this.onLoadDemo}
					/>
					</Dialog>



	 </div>
	 );
	}

}
export default CommunityStationDetail;
