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
import VisitorsSearchForm from "./SearchForm";
import {
	observer,
	inject
} from 'mobx-react';
@inject("FormModel")
@observer
class HoldList  extends React.Component{

	constructor(props,context){
		super(props, context);
		let date = new Date();
		this.state={
			searchParams:{
				page: 1,
     			pageSize: 15,
     			visitType:'',
     			searchKey:'',
     			date:date
			},
      openUpperForm:false,

      searchContent:{
        searchKey:'',
        searchType:'NAME',
      },
      typeValue:"",

		}
	}

	componentDidMount(){


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
  //刷新列表
  refreshList = () =>{
    let {searchParams} = this.state;
	  let date = new Date();


   	this.setState({
      searchParams:{
				searchKey:searchParams.searchKey,
        page: searchParams.page,
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


	render(){
		let {
          searchParams,
          select,
          openUpperForm,
          searchContent,
          typeValue
        } = this.state;

		return(
			<div className="m-equipment-list m-visitors-to-record" style={{paddingTop:25,minHeight:'910'}}>
				<Title value="访客记录"/>
      		<Section title="访客记录"  style={{marginBottom:-5,minHeight:910}}>

		        <Row style={{marginBottom:21,zIndex:3,position:"relative"}}>
				          <Col
						     align="left"
						     style={{float:'left'}}
						   >
							
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
		            displayCheckbox={false}
		            ajaxParams={searchParams}
		            ajaxUrlName='visit-record-list'
		            ajaxFieldListName="items"
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


			                <TableRowColumn type="operation">
                          <Button label="查看"  type="operation"  operation="detail" />
			                    <Button label="编辑"  type="operation"  operation="edit" />
			                </TableRowColumn>
				          </TableRow>
				        </TableBody>
				        <TableFooter></TableFooter>
	           </Table>
	           </Section>
             

             {/*高级查询*/}
              <Dialog
                title="高级查询"
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



	     </div>

		);
	}
}

export default HoldList;
