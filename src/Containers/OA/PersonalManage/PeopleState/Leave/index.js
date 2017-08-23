import React,{Component} from 'react';

import {
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	KrDate,
	Row,
	Col,
	Dialog,
    Title,
    ListGroup,
    ListGroupItem,
    SearchForms,
	Drawer,
	Tooltip,
	Message,
	CheckPermission
} from 'kr-ui';
import './index.less';
import SearchUpperForm from './SearchUpperForm';

export default class Leave extends Component{

	constructor(props,context){
		super(props, context);
		this.state={
			searchParams : {
				page:1,
				pageSize:15,
				searchKey:'',
			},
			isName:false,
			openSearchUpper:false
		}
	}


	scrollListener=()=>{
 	 if(this.scrollData.scrollLeft>102){
 			this.setState({
 				 isName:true
 			})
 	 }else{
 		 this.setState({
 				isName:false
 		 })
 	 }
  }


	//搜索确定
	onSearchSubmit = (data)=>{
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.searchKey = data.content;
		this.setState({
			searchParams
		})

	}

 componentDidMount(){
	  this.scrollData.addEventListener("scroll",this.scrollListener,false)
 }


 //高级查询
 openSearchUpperDialog=()=>{
	 this.setState({
		 openSearchUpper:!this.state.openSearchUpper
	 })
 }


 //导出
 onExport=(values)=> {
	 let {searchParams} = this.state;
	 let defaultParams = {
		  searchKey:'',
			mobilePhone:'',
			email:'',
			orgId:'',
			orgType:'',
			leader:'',
			type:'',
			status:'',
			leaveType:'',
			leaveReason:'',
			leaveDateStart:'',
			leaveDateEnd:'',
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
		var url = `/api/krspace-finance-web/cmt/community/export?${where.join('&')}`
		window.location.href = url;
 }


 //高级查询提交
 onSearchUpperSubmit=(param)=>{
	 if(param.orgId){
     var id=param.orgId[0].orgId;
     var type=param.orgId[0].treeType;
     param.orgId=id;
     param.orgType=type;
   }
	 if(param.leader){
		 param.leader=param.leader[0].orgId;
	 }
	 let defaultParams = {
		 searchKey:'',
		 mobilePhone:'',
		 email:'',
		 orgId:'',
		 orgType:'',
		 leader:'',
		 type:'',
		 status:'',
		 leaveType:'',
		 leaveReason:'',
		 leaveDateStart:'',
		 leaveDateEnd:'',
	 }
	 var searchParams = Object.assign({},defaultParams,param);
	 this.setState({
		 searchParams,
		 openSearchUpper:!this.state.openSearchUpper
	 })
 }

	render(){

   let {isName}=this.state;


		return(
      	<div className="oa-leave-position" style={{paddingTop:25}}>

	        <Row style={{marginBottom:11}}>

				<Col
					align="right"
					style={{
							marginTop:0,
							float:"right",
							marginRight:-10
						   }}
				>
					<ListGroup>
						<ListGroupItem>
							<SearchForms
								placeholder='请输入姓名/编号'
								inputName='search'
								onSubmit={this.onSearchSubmit}
							/>
						</ListGroupItem>
						<ListGroupItem><Button searchClick={this.openSearchUpperDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'3'}}/></ListGroupItem>
					</ListGroup>
				</Col>
	        </Row>



					<div className='list-scroll-leave' ref = {
							(ref) =>{
									this.scrollData = ref;
							}
					} >
            <Table
			        style={{marginTop:8,width:3600}}
              ajax={true}
	            displayCheckbox={true}
	            ajaxParams={this.state.searchParams}
	            ajaxUrlName='getLeaveList'
	            ajaxFieldListName="items"
							exportSwitch={true}
							onExport={this.onExport}
			>
				<TableHeader>
					{isName&&<TableHeaderColumn className='table-header-name'>姓名</TableHeaderColumn>}
					{!isName&&<TableHeaderColumn >姓名</TableHeaderColumn>}
					<TableHeaderColumn>编号</TableHeaderColumn>
					<TableHeaderColumn>分部</TableHeaderColumn>
					<TableHeaderColumn>部门</TableHeaderColumn>
					<TableHeaderColumn>直接上级</TableHeaderColumn>
					<TableHeaderColumn>职务</TableHeaderColumn>
					<TableHeaderColumn>员工属性</TableHeaderColumn>
					<TableHeaderColumn>员工类别</TableHeaderColumn>
					<TableHeaderColumn>员工状态</TableHeaderColumn>
					<TableHeaderColumn style={{width:100}}>是否开通账号</TableHeaderColumn>
					<TableHeaderColumn>手机号</TableHeaderColumn>
					<TableHeaderColumn>公司邮箱</TableHeaderColumn>
					<TableHeaderColumn>入职时间</TableHeaderColumn>
					<TableHeaderColumn>离职类型</TableHeaderColumn>
					<TableHeaderColumn>离职原因</TableHeaderColumn>
					<TableHeaderColumn>离职时间</TableHeaderColumn>
					<TableHeaderColumn>操作人</TableHeaderColumn>
					<TableHeaderColumn>操作时间</TableHeaderColumn>

				</TableHeader>
				<TableBody >
					<TableRow>
						{isName&&<TableRowColumn name='name' className='table-single-name'></TableRowColumn>}
						{!isName&&<TableRowColumn name='name'></TableRowColumn>}
						<TableRowColumn name="code"></TableRowColumn>
						<TableRowColumn name="subName"></TableRowColumn>
						<TableRowColumn name="depName"></TableRowColumn>
						<TableRowColumn name="leaderName"></TableRowColumn>
						<TableRowColumn name="jobName"></TableRowColumn>
						<TableRowColumn name="propertyStr"></TableRowColumn>
						<TableRowColumn name="typeStr"></TableRowColumn>
						<TableRowColumn name="statusStr"></TableRowColumn>
						<TableRowColumn name="hasAccountStr" style={{width:100}}></TableRowColumn>
						<TableRowColumn name="mobilePhone"></TableRowColumn>
						<TableRowColumn name="email"></TableRowColumn>
						<TableRowColumn name="entryDate" component={(value,oldValue)=>{
									return (<KrDate value={value} format="yyyy-mm-dd"/>)
								}}></TableRowColumn>
						<TableRowColumn name="leaveReason"></TableRowColumn>
						<TableRowColumn name="updator"></TableRowColumn>
						<TableRowColumn name="uTime" component={(value,oldValue)=>{
									return (<KrDate value={value} format="yyyy-mm-dd"/>)
								}}></TableRowColumn>
							</TableRow>
						</TableBody>
						<TableFooter></TableFooter>
           </Table>
         </div>

				 {/*高级查询*/}
				 <Dialog
				 title="高级查询"
				 onClose={this.openSearchUpperDialog}
				 open={this.state.openSearchUpper}
				 contentStyle ={{ width: '666px',height:'auto'}}
				 >
					 <SearchUpperForm
							 onCancel={this.openSearchUpperDialog}
							 onSubmit={this.onSearchUpperSubmit}
					 />
			 </Dialog>

        </div>
		);
	}
}
;
