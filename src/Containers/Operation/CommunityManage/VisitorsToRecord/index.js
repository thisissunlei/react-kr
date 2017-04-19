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
import VisitorsToRecordDetail from "./VisitorsToRecordDetail";
import VisitorsSearchForm from "./SearchForm";
@inject("FormModel")
@observer

class VisitorsToRecord  extends React.Component{

	constructor(props,context){
		super(props, context);
		let date = new Date();
		this.state={
			searchParams:{
				searchType:'',
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
      


		}
    this.readyData();
	}

	componentDidMount(){


	}
  //ready
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
   //搜索列表
   onSearchSubmit = (value) =>{
   	let {searchParams} = this.state;
	  let date = new Date();

   	this.setState({
      searchParams:{
				name:value,
				page: searchParams.page,
     			pageSize: searchParams.pageSize,
     			districtId:searchParams.districtId,
     			enable:searchParams.enable,
     			no:searchParams.no,
     			date:date
			}

   	})
   }

   //打开新增访客
   openNewVisitors = () =>{
   		this.setState({
   			openNewVisitors:true,
   		});
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
    this.setState({
   		openUpperForm:true,
   	})
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

   //高级查询确定
   upperFormSubmit = () =>{

   }
   //提交新建
	onSubmit = (params) =>{
    console.log(params,"====>")


	}
	//相关操作
	onOperation = (type, itemDetail) =>{

		if(type === "edit"){
	      this.setState({
	     	   openEditVisitors:true,
	      })

		}
    if(type === "detail"){
      this.setState({
         openVisitorsDetail:true,
         detailData:itemDetail
      })
    }
	}
  //全部关闭
	closeAll = () =>{
		this.setState({
			openNewVisitors:false,
      openVisitorsDetail:false,
		})
	}

  //刷新列表
  refreshList = () =>{
    let {searchParams} = this.state;
	  let date = new Date();

   	this.setState({
      searchParams:{
				  name:searchParams.name,
				  page: searchParams.page,
     			pageSize: searchParams.pageSize,
     			districtId:searchParams.districtId,
     			enable:searchParams.enable,
     			no:searchParams.no,
     			date:date
			}
   	})
  }
  //确定筛选
  onSearchSubmit = () =>{

  }
  // 获取下拉值
  onFilter = () =>{

  }



	render(){
		let {
          searchParams,
          openNewVisitors,
          openEditVisitors,
          openVisitorsDetail,
          select,
          detailData,
          openUpperForm
         
        } = this.state;

		return(
			<div className="m-equipment-list m-visitors-to-record" style={{paddingTop:25,minHeight:'910'}}>
				<Title value="访客记录"/>
      		<Section title="访客记录"  style={{marginBottom:-5,minHeight:910}}>

		        <Row style={{marginBottom:21,zIndex:100,position:"relative"}}>
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

                          <SearchForms placeholder='请输入关键字' searchFilter={[{label:"访客姓名",value:"NAME"},{label:"访客电话",value:"TEL"}]} onSubmit={this.onSearchSubmit} onFilter={this.onFilter}/>
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
	                exportSwitch={false}
				>
			            <TableHeader>
			              <TableHeaderColumn>访客姓名</TableHeaderColumn>
			              <TableHeaderColumn>访客电话</TableHeaderColumn>
			              <TableHeaderColumn>访客类型</TableHeaderColumn>
			              <TableHeaderColumn>所属社区</TableHeaderColumn>
			              <TableHeaderColumn>访客时间</TableHeaderColumn>
			              <TableHeaderColumn>操作</TableHeaderColumn>

			          	</TableHeader>

				        <TableBody >
				          <TableRow>
			                <TableRowColumn name="typeName"></TableRowColumn>
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


			                <TableRowColumn type="operation">
                          <Button label="查看"  type="operation"  operation="detail" />
			                    <Button label="编辑"  type="operation"  operation="edit" />
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
                contentStyle ={{ width: '666',height:'458px',overflow:'visible'}}
              >
               <VisitorsSearchForm
                  select = {select}
                  onCancel={this.closeUpperForm}
                  onSubmit={this.upperFormSubmit}
              />
              </Dialog>



	     </div>

		);
	}
}

export default VisitorsToRecord;
