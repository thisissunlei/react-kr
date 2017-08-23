import React from 'react';
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
	Dictionary,
	Tooltip,
  Pagination,
} from 'kr-ui';
import $ from 'jquery';
import {
	AddPostPeople
} from 'kr/PureComponents';
import {Http} from 'kr/Utils';
import Leave from './Leave';
import Remove from './Remove';
import Transfer from './Transfer';
import OpenCard from './OpenCard';
import OpenAccount from './OpenAccount';
import IsSure from './IsSure';
import SearchUpperForm from './SearchUpperForm';
import './index.less';
import {
	observer,
	inject
} from 'mobx-react';

@inject("NavModel")
@observer
export default class InService  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openAddPerson:false,
			openLeave:false,
			openRemove:false,
			openTransfer:false,
			openCard:false,
			openAccount:false,
			openSure:false,
      openSearchUpper:false,
			searchParams : {
				page:1,
				pageSize:15,
        totalCount:'',
				searchKey:''
			},
			employees:{
				name:'',
				phone:'',
			},
			//离职id
			leaveId:'',
			//调动数据
			transferDetail:{},
			resourceId:'',
			//绑定的数据
			cardParam:'',
			//权限
			isLeave:false,
			isRemove:false,
			istranfer:false,
			isCard:false,
			isOpen:false,
      isBase:false,
      isPerson:false,
      isWork:false,

      //控制定位显示隐藏
      isName:false,
      positionList:[]
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


	componentDidMount() {

    var {checkOperate} = this.props.NavModel;

    this.scrollData.addEventListener("scroll",this.scrollListener,false)

		var {checkOperate} = this.props.NavModel;
		var _this=this;
		setTimeout(function() {
		   _this.setState({
			   isLeave :checkOperate("hrm_resource_dimission"),
		     isRemove : checkOperate("hrm_resource_account"),
		     istranfer : checkOperate("hrm_resource_move"),
			   isCard : checkOperate("hrm_resource_card"),
		     isOpen : checkOperate("hrm_resource_account"),
         isBase:checkOperate("hrm_resource_base_edit"),
         isPerson:checkOperate("hrm_resource_edit"),
         isWork:checkOperate("hrm_resource_workinfo_edit")
		   })
		},500);

	}

   //新建用户
   openAddPersonal=()=>{
      this.setState({
		  openAddPerson:!this.state.openAddPerson
	  })
   }

   //新建用户提交
   addPersonSubmit=(param)=>{
    var data = Object.assign({},param);
	var _this = this;
	var searchParams={
		time:+new Date()
	}
	Http.request("submit-new-personnel",{},data).then(function (response) {
		_this.setState({
			searchParams:Object.assign({},_this.state.searchParams,searchParams)
		})
		_this.openAddPersonal();
	}).catch(function (err) {
		Message.error(err.message);
	});
   }

   //操作开关
   //编辑打开
   operationEdit=(itemDetail)=>{
        this.goDetail(itemDetail);
   }
   //离职打开
   operationLeave=(itemDetail)=>{
       this.setState({
			openLeave:true,
			leaveId:itemDetail.id
		})
   }
   //解除账号打开
   operationRemove=(itemDetail)=>{
	    this.setState({
			  openRemove:true,
			  resourceId:itemDetail.id
		})
   }

   //调动打开
   operationTransfer=(itemDetail)=>{
		 this.setState({
			  openTransfer:true,
			  transferDetail:itemDetail
		  })
   }

   //绑定门禁卡打开
   operationCard=(itemDetail)=>{
		this.setState({
			  openCard:true,
			  employees:itemDetail
		})
   }

   //开通账号打开
   operationAccount=(itemDetail)=>{
       this.setState({
			  openAccount:true,
			  resourceId:itemDetail.id
		})
   }



   //离职关闭
   cancelLeave=()=>{
     this.setState({
		openLeave:!this.state.openLeave
	 })
   }
   //离职提交
   addLeaveSubmit=(data)=>{
	let {leaveId}=this.state;
	var param = Object.assign({},data);
	param.resourceId=leaveId;
	var searchParams={
		time:+new Date()
	}
	var _this = this;
	Http.request("leaveOnSubmit",{},param).then(function (response) {
		_this.setState({
			searchParams:Object.assign({},_this.state.searchParams,searchParams),
		})
		_this.cancelLeave();
	}).catch(function (err) {
		Message.error(err.message);
	});
   }

  //解除关闭
   cancelRemove=()=>{
	 this.setState({
		openRemove:!this.state.openRemove
	 })
   }

   //解除提交
   addRemoveSubmit=()=>{
	   const _this = this;
	   const {resourceId} = this.state;
	    var param={};
	    param.resourceId=resourceId;
		var searchParams={
		  time:+new Date()
	    }
        Http.request("remove-account",{},param).then(function (response) {
			_this.setState({
               searchParams:Object.assign({},_this.state.searchParams,searchParams)
		    })
			_this.cancelRemove();
        }).catch(function (err) {
            Message.error(err.message);
        });
   }

   //开通关闭
    cancelAccount=()=>{
	 this.setState({
		openAccount:!this.state.openAccount
	 })
   }

    //开通提交
   addOpenSubmit=()=>{
	   const _this = this;
	   const {resourceId} = this.state;
	    var param={};
	    param.resourceId=resourceId;
		var searchParams={
		  time:+new Date()
	    }
        Http.request("open-account",{},param).then(function (response) {
			_this.setState({
               searchParams:Object.assign({},_this.state.searchParams,searchParams)
		    })
			_this.cancelAccount();
        }).catch(function (err) {
            Message.error(err.message);
        });
   }


   //调动取消
   cancelTransfer=()=>{
	 this.setState({
		openTransfer:!this.state.openTransfer
	 })
   }

   //调动提交
   addTransferSubmit=(data)=>{
		var param = Object.assign({},data);
		var _this = this;
		var searchParams={
		  time:+new Date()
	    }
		Http.request("service-switch",{},param).then(function (response) {
			_this.setState({
               searchParams:Object.assign({},_this.state.searchParams,searchParams)
		    })
			_this.cancelTransfer()
		}).catch(function (err) {
			Message.error(err.message);
		});
   }


   //开通门禁取消
   cancelCard=()=>{
	  this.setState({
		openCard:!this.state.openCard
	 })
   }
   //开通门禁提交
   addCardSubmit=(param)=>{
	   if(param.isBound){
		 this.setState({
			 cardParam:param,
			 openSure:true
		 })
	   }else {
		   var _this = this;
			Http.request("bindingCard",{},param).then(function (response) {
				_this.cancelCard();
				Message.success("绑定成功");
			}).catch(function (err) {
				Message.error(err.message);
			});
	   }
   }

   //是否确定
   cancelSure=()=>{
	  this.setState({
		openSure:!this.state.openSure
	 })
   }

   //是否确定
   addSureSubmit=()=>{
	   let {cardParam}=this.state;
       var _this = this;
		Http.request("bindingCard",{},cardParam).then(function (response) {
			_this.cancelCard();
			Message.success("绑定成功");
		}).catch(function (err) {
			Message.error(err.message);
		});
		this.cancelSure();
   }

   //关闭所有侧滑
   allClose=()=>{
      this.setState({
		  openAddPerson:false
	  })
   }
   onSearchSubmit = (data) =>{
	var searchParams = Object.assign({},this.state.searchParams);
	searchParams.searchKey = data.content;
  	this.setState({
  		searchParams
  	})
   }
   //跳转详情页
   goDetail = (data) =>{
	    let personId=data.id;
		window.open(`./#/oa/${personId}/peopleDetail`,'_blank');
   }

  //翻页
   onPageChange=(page)=>{
    let {searchParams}=this.state;
    searchParams.page=page;
    searchParams.pageSize=15;
    this.setState({
      searchParams
    })
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
      hasAccount:'',
      property:'',
      entryDateStart:'',
      entryDateEnd:''
   }
   var searchParams = Object.assign({},defaultParams,param);
   this.setState({
     searchParams,
     openSearchUpper:!this.state.openSearchUpper
   })
 }

  //高级查询
	openSearchUpperDialog=()=>{
    this.setState({
      openSearchUpper:!this.state.openSearchUpper,
    })
	}

  cancelSearchUpperDialog=()=>{
    this.setState({
      openSearchUpper:!this.state.openSearchUpper,
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
      hasAccount:'',
      property:'',
      entryDateStart:'',
      entryDateEnd:''
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
     var url = `/api/krspace-erp-web/hrm/resource/export/type/incumbency?${where.join('&')}`
     window.location.href = url;
  }



	render(){
		const {transferDetail,positionList,isName,searchParams,employees,isLeave,isRemove,istranfer,isCard,isOpen,isBase,isPerson,isWork} = this.state;


		return(

			<div className='m-inservice-list'>
					<Title value="在职列表"/>
						<Row style={{marginBottom:11,position:'relative',zIndex:5,marginTop:20}}>

							<Col
								style={{float:'left'}}
							>
								<Button
									label="新建人员"
									type='button'
									onTouchTap={this.openAddPersonal}
									operateCode="hrm_resource_add"
								/>
							</Col>

							<Col  style={{marginTop:0,float:"right",marginRight:-10}}>
								<ListGroup>
									<ListGroupItem><div className='list-outSearch'><SearchForms placeholder='请输入姓名/编号' onSubmit={this.onSearchSubmit}/></div></ListGroupItem>
                  <ListGroupItem><Button searchClick={this.openSearchUpperDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'3'}}/></ListGroupItem>
								</ListGroup>
							</Col>

					</Row>


              <div className='list-scroll-data' ref = {
                  (ref) =>{
                      this.scrollData = ref;
                  }
              } >
    					<Table
    						style={{marginTop:8,width:3100}}
                ajax={true}
                ajaxParams={searchParams}
                onPageChange={this.onPageChange}
                ajaxUrlName='getInServiceList'
                ajaxFieldListName="items"
    						displayCheckbox={true}
                exportSwitch={true}
                onExport={this.onExport}
    					  >
    						<TableHeader>
                    {isName&&<TableHeaderColumn className='table-header-name'>姓名</TableHeaderColumn>}
                    {!isName&&<TableHeaderColumn >姓名</TableHeaderColumn>}
                    <TableHeaderColumn >编号</TableHeaderColumn>
                    <TableHeaderColumn>分部</TableHeaderColumn>
    								<TableHeaderColumn>部门</TableHeaderColumn>
    								<TableHeaderColumn>直接上级</TableHeaderColumn>
    								<TableHeaderColumn>职务</TableHeaderColumn>
    								<TableHeaderColumn>员工属性</TableHeaderColumn>
    								<TableHeaderColumn>员工类别</TableHeaderColumn>
    								<TableHeaderColumn>员工状态</TableHeaderColumn>
    								<TableHeaderColumn  style={{width:100}}>是否开通账号</TableHeaderColumn>
                    <TableHeaderColumn>手机号</TableHeaderColumn>
    								<TableHeaderColumn>公司邮箱</TableHeaderColumn>
                    <TableHeaderColumn>入职时间</TableHeaderColumn>
    								<TableHeaderColumn>创建人</TableHeaderColumn>
                    <TableHeaderColumn>创建时间</TableHeaderColumn>
    								<TableHeaderColumn style={{width:'300px'}}>操作</TableHeaderColumn>
    						</TableHeader>

    						<TableBody >
                         <TableRow>
                           {isName&&<TableRowColumn name='name' className='table-single-name'></TableRowColumn>}
                           {!isName&&<TableRowColumn name='name'></TableRowColumn>}
           								 <TableRowColumn name='code'></TableRowColumn>
                           <TableRowColumn name='subName'></TableRowColumn>
                           <TableRowColumn name='depName'></TableRowColumn>
                           <TableRowColumn name='leaderName'></TableRowColumn>
                           <TableRowColumn name='jobName'></TableRowColumn>
                           <TableRowColumn name='propertyStr'></TableRowColumn>
                           <TableRowColumn name='typeStr'></TableRowColumn>
                           <TableRowColumn name='statusStr'></TableRowColumn>
           								 <TableRowColumn style={{width:100}} name='hasAccountStr'></TableRowColumn>
           								 <TableRowColumn name='mobilePhone'></TableRowColumn>
           								 <TableRowColumn name='email'></TableRowColumn>
           								 <TableRowColumn name='entryDate' component={(value,oldValue)=>{
       													 return (<KrDate value={value} format="yyyy-mm-dd"/>)
       												 }}></TableRowColumn>
           								 <TableRowColumn name='creatorName'></TableRowColumn>
           								 <TableRowColumn name='cTime' component={(value,oldValue)=>{
       													 return (<KrDate value={value} format="yyyy-mm-dd"/>)
       												 }}></TableRowColumn>
           								 <TableRowColumn type="operation" style={{width:'300px'}} component={(value,oldValue,detail)=>{
           										return <span>
           											  {(isBase||isPerson||isWork)&&<span onClick={this.operationEdit.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>编辑</span>}
           												{isLeave&&<span onClick={this.operationLeave.bind(this,value)}style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>离职</span>}
           												{istranfer&&<span onClick={this.operationTransfer.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>调动</span>}
           												{isRemove&&value.hasAccount&&<span onClick={this.operationRemove.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>解除账号</span>}
           												{isOpen&&!value.hasAccount&&<span onClick={this.operationAccount.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>开通账号</span>}
           												{isCard&&value.hasAccount&&<span onClick={this.operationCard.bind(this,value)} style={{color:'#499df1',marginLeft:'5px',cursor:'pointer'}}>绑定门禁卡</span>}
           											</span>
           								 }}>
           								</TableRowColumn>
           							</TableRow>
    						   </TableBody>
                   <TableFooter></TableFooter>
    					</Table>
            </div>


					{/*新建用户*/}
					<AddPostPeople
					 onCancel={this.openAddPersonal}
					 onSubmit={this.addPersonSubmit}
					 open={this.state.openAddPerson}
					 onClose={this.allClose}
					/>

					{/*离职*/}
					<Dialog
						title="离职"
						onClose={this.cancelLeave}
						open={this.state.openLeave}
						contentStyle ={{ width: '666px',height:'auto'}}
					>
					<Leave
					   onCancel={this.cancelLeave}
					   onSubmit={this.addLeaveSubmit}
					/>
					</Dialog>

					{/*解除帐号*/}
					<Dialog
						title="解除帐号"
						onClose={this.cancelRemove}
						open={this.state.openRemove}
						contentStyle ={{ width: '444px',height:'190px'}}
					>
					<Remove
						onCancel={this.cancelRemove}
						onSubmit={this.addRemoveSubmit}
					/>
					</Dialog>

					{/*是否更换门禁卡*/}
					<Dialog
						title="提示"
						onClose={this.cancelSure}
						open={this.state.openSure}
						contentStyle ={{ width: '444px',height:'190px'}}
						stylesCard={true}
					>
					<IsSure
						onCancel={this.cancelSure}
						onSubmit={this.addSureSubmit}
					/>
					</Dialog>

					{/*开通帐号*/}
					<Dialog
						title="提示"
						onClose={this.cancelAccount}
						open={this.state.openAccount}
						contentStyle ={{ width: '444px',height:'190px'}}
					>
					<OpenAccount
						onCancel={this.cancelAccount}
						onSubmit={this.addOpenSubmit}
					/>
					</Dialog>

					{/*人员调动*/}
					<Dialog
						title="人员调动"
						onClose={this.cancelTransfer}
						open={this.state.openTransfer}
						contentStyle ={{ width: '444px',overflow:'inherit'}}
					>
					<Transfer
						onCancel={this.cancelTransfer}
						onSubmit={this.addTransferSubmit}
						department = {transferDetail}
					/>
					</Dialog>

					{/*开通门禁*/}
					<Dialog
						title="绑定门禁卡"
						onClose={this.cancelCard}
						open={this.state.openCard}
						contentStyle ={{ width: '444px'}}
					>
					<OpenCard
						onCancel={this.cancelCard}
						onSubmit={this.addCardSubmit}
						employees = {employees}
					/>
					</Dialog>

          {/*高级查询*/}
          <Dialog
          title="高级查询"
          onClose={this.openSearchUpperDialog}
          open={this.state.openSearchUpper}
          contentStyle ={{ width: '666px',height:'auto'}}
          >
            <SearchUpperForm
                onCancel={this.cancelSearchUpperDialog}
                onSubmit={this.onSearchUpperSubmit}
                positionList={positionList}
            />
        </Dialog>

			</div>
		);
	}
}
