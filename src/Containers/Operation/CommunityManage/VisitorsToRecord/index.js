import React from 'react';
import {DateFormat} from 'kr/Utils';
import {
  reduxForm,
  change,
  arrayPush,
  initialize
} from 'redux-form';

import {
  Actions,
  Store
} from 'kr/Redux';
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
import  "./index.less";
import {Http} from "kr/Utils";
import {
	observer,
	inject
} from 'mobx-react';
import NewVisitorsToRecord from "./NewVisitorsToRecord";
import EditVisitorsToRecord from "./EditVisitorsToRecord";
import VisitorsToRecordDetail from "./VisitorsToRecordDetail";
import VisitorsSearchForm from "./SearchForm";
import VisitToState from './VisitToState';
@inject("FormModel")
@observer

class VisitorsToRecord  extends React.Component{

	constructor(props,context){
		super(props, context);
		let date = new Date();
		this.state={
      editDetail:'',
			searchParams:{
				searchType:'',
        id:"",
				page: 1,
     			pageSize: 15,
     			visitType:'',
     			searchKey:'',
     			date:date
			},
      openNewVisitors:false,
      openEditVisitors:false,
      openVisitorsDetail:false,
      openUpperForm:false,
      openVisitToState:false,

      select : {
        //活动类型
        activitytype:[],
        //社区列表
        communitys:[],
        //面试类型
        interviewtype:[],
        //参观目的
        purpose:[],
        //面试轮次
        round:[],
        // 访客记录类型
        type:[],

      },
      detailData:{},
      editData:{},
      searchContent:{
        searchKey:'',
        searchType:'NAME',
      },
      typeValue:"",
      allVisitNum:0,

		}
    this.readyData();
	}

	componentDidMount(){


	}
  //准备数据
  readyData = () =>{
    let _this = this;

    Http.request("visit-record-ready").then(function(select){
      _this.setState({
        select
      })
    }).catch(function(err) {
			Message.error(err.message);
		});
  }
  getEidtData = (id,itemDetail) =>{
    let _this= this;
    const {FormModel} = this.props;
     FormModel.getForm("EditVisitorsToRecord")
  		.changeValues({
        communityId:"",
        typeId:"",
        interviewTypeId:"",
        activityTypeId:"",
        name:"",
        tel:"",
        wechat:"",
        num:'',
        email:"",
        purposeId:'',
        interviewRoundId:'',
        vtime:'',
      })

    Http.request("visit-record-edit-deatil",{id:id}).then(function(editData){
      var vtime = DateFormat(editData.vtime,"yyyy-mm-dd hh:MM");
      editData.date = vtime.split(" ")[0];
      editData.time = vtime.split(" ")[1];
      if(!editData.visitStatus || editData.visitStatus == "NONE"){
        editData.visitStatus = "UNVISIT"
      }
      
      FormModel.getForm("EditVisitorsToRecord")
  		         .changeValues(editData);
      _this.setState({
        typeValue:editData.typeId,
        openEditVisitors:true,
        id:itemDetail.id,
        editDetail:editData
      })
    }).catch(function(err) {
      Message.error(err.message);
    });
  }
   //搜索列表
   onSearchSubmit = (value) =>{
   	let {searchParams} = this.state;
	  let date = new Date();

   	this.setState({
      searchParams:{
				searchKey:value.content,
				page: searchParams.page,
     		pageSize: searchParams.pageSize,
     		searchType:value.filter,
     		visitType:searchParams.visitType,
     		date:date
			},


   	})
   }

   //打开新增访客
   openNewVisitors = () =>{
      const {FormModel} = this.props;
   		this.setState({
   			openNewVisitors:true,
        id:''
   		});
      FormModel.getForm("NewVisitorsToRecord")
  		.changeValues({
        communityId:"",
        typeId:"",
        interviewTypeId:"",
        activityTypeId:"",
        name:"",
        tel:"",
        wechat:"",
        num:'',
        email:"",
        purposeId:'',
        interviewRoundId:'',
        vtime:'',
        
      })

   }
   //关闭新增访客
   closeNewVisitors = () =>{
     this.setState({
       openNewVisitors:false,
     });

   }
   // 打开编辑商圈
   openEditVisitors = () =>{
		this.setState({
   			openEditVisitors:true,
   		})
   }

   // 关闭编辑商圈
   closeEditVisitors = () =>{
		this.setState({
   			openEditVisitors:false,
   		})
   }
   //打开高级查询
  openUpperForm = () =>{
    let {FormModel} = this.props;
    this.setState({
   		openUpperForm:true,
   	})
    FormModel.getForm("VisitorsSearchForm")
             .changeValues({visitType:''})
  }
   //关闭高级查询
   closeUpperForm = () =>{
     this.setState({
       openUpperForm:false,
     })
   }
   //打开详情页
   openVisitorsDetail = () =>{
     this.setState({
       openVisitorsDetail:true,
     })
   }
   //关闭详情页
   closeVisitorsDetail = () =>{
     this.setState({
       openVisitorsDetail:false,
     })
   }
   //状态到访状态
   switchVisitToState = () =>{
     const {openVisitToState} = this.state;  
     this.setState({
       openVisitToState:!openVisitToState
     })
   }

   //高级查询确定
   upperFormSubmit = (values) =>{
     let {searchParams} = this.state;
 	  let date = new Date();
       
    	 this.setState({
         searchParams:{
 				searchKey:values.searchKey,
 				page: searchParams.page,
      		pageSize: searchParams.pageSize,
      		searchType:values.searchType,
      		visitType:values.visitType,
      		date:date
 			},
    })
    this.closeUpperForm();

   }
   //提交新建
	onSubmit = (params) =>{

    let {id} = this.state;
    let _this = this;
    var page='';
    params.id= !id ? "" : id;
    if(!id){
      page=1;
    }
    Http.request("visit-record-edit",{},params).then(function(select){
      _this.refreshList(page);
      _this.closeNewVisitors();
      _this.closeEditVisitors();

    }).catch(function(err) {

      Message.error(err.message);
    });


	}
	//相关操作
	onOperation = (type, itemDetail) =>{
    let {FormModel} = this.props;
		if(type === "edit"){
        this.getEidtData(itemDetail.id,itemDetail);
		}
    if(type === "detail"){
      this.setState({
         openVisitorsDetail:true,
         detailData:itemDetail
      })
    }
    if(type == "visit"){
        if(!itemDetail.visitStatus || itemDetail.visitStatus=="NONE"){
          itemDetail.visitStatus = "UNVISIT"
        }
        var params = {
          id:itemDetail.id,
          visitStatus:itemDetail.visitStatus
        }
        FormModel.getForm("VisitToState")
  		         .changeValues(params);
      this.switchVisitToState()
    }
	}
  //全部关闭
	closeAll = () =>{
		this.setState({
			openNewVisitors:false,
      openVisitorsDetail:false,
      openEditVisitors:false,
		})
	}

  //刷新列表
  refreshList = (page) =>{
    let {searchParams} = this.state;
	  let date = new Date();


   	this.setState({
      searchParams:{
				searchKey:searchParams.searchKey,
        page: page==1?1:searchParams.page,
        pageSize: searchParams.pageSize,
        searchType:searchParams.searchType,
        visitType:searchParams.visitType,
        date:date
			}
   	})
  }
  searchChange = (values) =>{
    const {searchContent} = this.state;
    this.setState({
      searchContent:{
        searchType:searchContent.searchType,
        searchKey:values
      }
    })
  }
  ToObtainType = (values) =>{
    const {searchContent} = this.state;

    this.setState({
      searchContent:{
        searchType:values,
        searchKey:searchContent.searchKey
      }
    })

  }
  //到访状态提交
  VisitToStateSubmit = (values) =>{
    var params = Object.assign({},values); 
    var that = this;
    Http.request("change-visit-state",{},params).then(function(select){
      that.switchVisitToState();
      that.refreshList();
    }).catch(function(err) {

      Message.error(err.message);
    });
  }


  onPageChange=(page)=>{
    var searchParams={
       page:page
    }
    this.setState({
       searchParams:Object.assign({},this.state.searchParams,searchParams)
    })
  }
  tableLoaded = (values) =>{
    this.setState({
      allVisitNum:values.totalCount
    })
  }


	render(){
		let {
          searchParams,
          openNewVisitors,
          openEditVisitors,
          openVisitorsDetail,
          openVisitToState,     
          select,
          detailData,
          openUpperForm,
          searchContent,
          typeValue,
          allVisitNum,
          editDetail
        } = this.state;

		return(
			<div className="m-equipment-list m-visitors-to-record" style={{minHeight:'910'}}>
				<Title value="预约参观" style = {{}}/>
      		<Section title="预约参观"  style={{marginBottom:-5,minHeight:910}}>

		        <Row style={{marginBottom:21,zIndex:3,position:"relative"}}>
              <Col md={12} style={{marginTop: -20}}>
                  <ListGroup >
                    <div className="list-name">
                    <span className='ui-incomeMoney'>
                    </span>
                    <span className="font-width">访客总数:</span>
                    <span className="font-width font-num">{allVisitNum}</span>
                    </div>
                  </ListGroup>
                </Col>
				      <Col
						     align="left"
						     style={{float:'left'}}
						   >
								<Button
									label="新增访客"
									type='button'
									onTouchTap={this.openNewVisitors}
								/>
						  </Col>

				          <Col  align="right" style={{marginTop:0,float:"right",marginRight:-10,zIndex:99}}>
					          <ListGroup>

                        <ListGroupItem>

                          <SearchForms placeholder='请输入关键字' searchFilter={[{label:"访客姓名",value:"NAME"},{label:"访客电话",value:"TEL"}]} onChange ={this.searchChange}  onSubmit={this.onSearchSubmit} onFilter = {this.ToObtainType} />
                        </ListGroupItem>
                        <ListGroupItem><Button searchClick={this.openUpperForm}  type='search' searchStyle={{marginLeft:'20',marginTop:'3'}}/></ListGroupItem>
					          </ListGroup>
				          </Col>
                  
		        </Row>


	            <Table
                  style={{marginTop:8}}
                        ajax={true}
                        onProcessData={
                    (state)=>{
                      return state;
                    }
                  }
                  onOperation={this.onOperation}
                  displayCheckbox={false}
                  ajaxParams={searchParams}
                  ajaxUrlName='visit-record-list'
                  ajaxFieldListName="items"
	                onExport={this.onExport}
                  onPageChange={this.onPageChange}
	                exportSwitch={false}
                  onLoaded = {this.tableLoaded}
				      >
			            <TableHeader>
			              <TableHeaderColumn>访客姓名</TableHeaderColumn>
			              <TableHeaderColumn>访客电话</TableHeaderColumn>
			              <TableHeaderColumn>访客类型</TableHeaderColumn>
			              <TableHeaderColumn>所属社区</TableHeaderColumn>
			              <TableHeaderColumn>访客时间</TableHeaderColumn>
			              <TableHeaderColumn>访客身份证号</TableHeaderColumn>
			              <TableHeaderColumn>是否已到访</TableHeaderColumn>
			              <TableHeaderColumn>操作</TableHeaderColumn>

			          	</TableHeader>

				        <TableBody >
				          <TableRow>
			                <TableRowColumn name="name"></TableRowColumn>
			                <TableRowColumn name="tel"></TableRowColumn>
			                <TableRowColumn name="typeId"
                        component={(value,oldValue)=>{

                           let types = select.type;
                           let detail = ""
                           types.map(function(item,index){
                             if(item.value == value){
                               detail = item.label;

                             }
                           })
                           return <span>{detail}</span>;
                        }}
                      ></TableRowColumn>
			                <TableRowColumn name="communityName"></TableRowColumn>
			                <TableRowColumn name="vtime"
                        component={(value,oldValue)=>{
                           return (<KrDate value={value} format="yyyy-mm-dd"/>)
                        }}

                      ></TableRowColumn>
                       <TableRowColumn name="idCard"
                        style = {{wordWrap:'break-word',whiteSpace:'normal'}}
                        component={(value,oldValue)=>{
                          var detail='';
                          if(!value){
                            detail='-';
                          }else{
                            detail=value;
                          }
                           return <span>{detail}</span>;
                        }}
                      ></TableRowColumn>
                      <TableRowColumn 
                        name="visitStatus"
                        options={[{label:'无',value:"NONE"},{label:'未到访',value:"UNVISIT"},{label:'已到访未签约',value:"VISIT_UNSIGN"},{label:'已到访已签约',value:"VISIT_SIGN"}]}
                        style = {{wordWrap:'break-word',whiteSpace:'normal'}}
                       
                      ></TableRowColumn>

			                <TableRowColumn type="operation">
                          <Button label="查看"  type="operation"  operation="detail" />
			                    <Button label="编辑" operateCode="com_sys_visit_edit" type="operation"  operation="edit" />
			                    <Button label="到访状态" operateCode="com_sys_visit_edit" type="operation"  operation="visit" />
			                </TableRowColumn>
				          </TableRow>
				        </TableBody>
				        <TableFooter></TableFooter>
	           </Table>
	           </Section>
             {/*新增访客*/}
             <Drawer
       					modal={true}
       					width={750}
       					onClose={this.closeAll}
       					open={openNewVisitors}
       					containerStyle={{minHeight:"100%",top:60,paddingBottom:228,zIndex:20}}
       					>
       						<NewVisitorsToRecord select = {select} onCancel= {this.closeNewVisitors} onSubmit = {this.onSubmit}/>
   				   </Drawer>

           {/*编辑访客*/}
             <Drawer
                modal={true}
                width={750}
                onClose={this.closeAll}
                open={openEditVisitors}
                containerStyle={{minHeight:"100%",top:60,paddingBottom:228,zIndex:20}}
                >
                  <EditVisitorsToRecord
                    select = {select}
                    onCancel= {this.closeEditVisitors}
                    onSubmit = {this.onSubmit}
                    typeValue = {typeValue}
                    editDetail = {editDetail}
                  />
             </Drawer>

             {/*查看详情*/}
             <Drawer
       					modal={true}
       					width={750}
       					onClose={this.closeAll}
       					open={openVisitorsDetail}
       					containerStyle={{minHeight:"100%",top:60,paddingBottom:228,zIndex:99}}
       					>
       						<VisitorsToRecordDetail select = {select}  detailData = {detailData}  onCancel= {this.closeVisitorsDetail} />
   				   </Drawer>

             {/*高级查询*/}
              <Dialog
                title="高级查询"
                operType="SHARE"
                modal={true}
                onClose={this.closeUpperForm}
                open={openUpperForm}
                contentStyle ={{ width: '666',height:240,overflow:'visible'}}
              >
               <VisitorsSearchForm
                  select = {select}
                  onCancel={this.closeUpperForm}
                  onSubmit={this.upperFormSubmit}

              />
              </Dialog>
              {/*到访状态*/}
              <Dialog
                title="到访状态"
               
                modal={true}
                onClose={this.switchVisitToState}
                open={openVisitToState}
                contentStyle ={{ width: '666',height:240,overflow:'visible'}}
              >
                 <VisitToState onCancel={this.switchVisitToState} onSubmit={this.VisitToStateSubmit}  />
              </Dialog>


	     </div>

		);
	}
}

export default VisitorsToRecord;
