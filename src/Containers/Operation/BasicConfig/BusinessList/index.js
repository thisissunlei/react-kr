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
import NewBusiness from "./NewBusiness";
import EditBusiness from "./EditBusiness";
import BusinessSearchForm from "./BusinessSearchForm";
import {
	observer,
	inject
} from 'mobx-react';
@inject("FormModel")
@observer

class BusinessList  extends React.Component{

	constructor(props,context){
		super(props, context);
		let date = new Date();
		this.state={
			searchParams:{
				name:'',
				page: 1,
     			pageSize: 15,
     			districtId:'',
     			enable:'',
     			name:'',
     			no:'',
     			date:date
			},
			openNewBusiness:false,
			openEditBusiness:false,
			openUpperForm:false,
			id : '',
			searchContent:{
	          searchType:"CODING",
	          searchKey:""
	        },
     cityName : ""
		}
	}

	componentDidMount(){


	}

   //搜索列表
   onSearchSubmit = (value) =>{
   	let name = "",no = "";
   	if(value.filter == "CODING"){
   		no = value.content;
   	}else{
   		name = value.content;
   	}

   	let {searchParams} = this.state;
	  let date = new Date();

   	this.setState({
      searchParams:{
				name:name,
				page: searchParams.page,
     			pageSize: searchParams.pageSize,
     			districtId:"",
     			enable:"",
     			no:no,
     			date:date
			}
   	})
   }

   //新建商圈
   openNewBusiness = () =>{
   		this.setState({
   			openNewBusiness:true,
   		});
      const {FormModel} = this.props;
  		FormModel.getForm("NewBusinessForm")
  		.changeValues({no:'',name:'',districtId:'',sort:'',enable:''});

   }
   //关闭新建商圈
   closeNewBusiness = () =>{

     this.setState({
       openNewBusiness:false,
     });

   }
   // 打开编辑商圈
   openEditBusiness = () =>{
		this.setState({
   			openEditBusiness:true,
   		})
   }

   // 关闭编辑商圈
   closeEditBusiness = () =>{
		this.setState({
   			openEditBusiness:false,
   		})
   }
   //打开高级查询
  openUpperForm = () =>{
    this.setState({
   		openUpperForm:true,
   	})
    const {FormModel} = this.props;
    FormModel.getForm("BusinessSearchForm")
    .changeValues({districtId:'',enable:''});
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
					name:values.name,
					page: searchParams.page,
	     			pageSize: searchParams.pageSize,
	     			districtId:values.districtId,
	     			enable:values.enable,
	     			no:values.no,
	     			date:date
				}
	   	})
	   	this.closeUpperForm();
   }
   //提交新建
	onSubmit = (params) =>{
		let {id} = this.state;
		let _this = this;

		params.id = id;


		Http.request('business-new',params).then(function(response) {
			_this.refreshList();
			_this.closeNewBusiness();
			_this.closeEditBusiness();
		}).catch(function(err) {
			Message.error(err.message);
		});

	}
	//相关操作
	onOperation = (type, itemDetail) =>{


		const {FormModel} = this.props;
		if(type === "edit"){

        let provinceName = !itemDetail.provinceName ? "" : itemDetail.provinceName;
        let cityName = !itemDetail.cityName ? "" : "/" + itemDetail.cityName;
        let districtName = !itemDetail.districtName ? "" : "/" + itemDetail.districtName;
        this.setState({
	        id:itemDetail.id,
	     	openEditBusiness:true,
	     	cityName : provinceName+cityName+districtName
	    })
      FormModel.getForm("EditBusiness").changeValues(itemDetail);
		}
	}
  //全部关闭
	closeAll = () =>{
		this.setState({
			openNewBusiness:false,
			openEditBusiness:false
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


//导出表
onExport = () =>{

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
				openNewBusiness,
				openEditBusiness,
				openUpperForm,
				searchContent,
				cityName
			} = this.state;


		return(
			<div className="m-equipment-list m-business-list" style={{minHeight:'910'}}>
				<Title value="商圈列表"/>
      		<Section title="商圈列表"  style={{marginBottom:-5,minHeight:910}}>

		        <Row style={{marginBottom:21,zIndex:5,position:"relative"}}>
				          <Col
						     align="left"
						     style={{float:'left'}}
						   >
								<Button
									label="新建商圈"
									type='button'
									onTouchTap={this.openNewBusiness}
								/>
						  </Col>

				          <Col  align="right" style={{marginTop:0,float:"right",marginRight:-10,zIndex:99}}>



					          <ListGroup>

                        <ListGroupItem>

                          <SearchForms placeholder='请输入关键字' searchFilter={[{label:"商圈编码",value:"CODING"},{label:"商圈名称",value:"NAME"}]} onChange ={this.searchChange} onSubmit={this.onSearchSubmit} onFilter={this.ToObtainType}/>
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
		            ajaxUrlName='business-list'
		            ajaxFieldListName="items"
                onExport={this.onExport}
                exportSwitch={false}
				>
			            <TableHeader>
			              <TableHeaderColumn>所属区县</TableHeaderColumn>
			              <TableHeaderColumn>商圈编码</TableHeaderColumn>
			              <TableHeaderColumn>商圈名称</TableHeaderColumn>
			              <TableHeaderColumn>排序号</TableHeaderColumn>
			              <TableHeaderColumn>创建人</TableHeaderColumn>
			              <TableHeaderColumn>创建时间</TableHeaderColumn>
			              <TableHeaderColumn>是否有效</TableHeaderColumn>
			              <TableHeaderColumn>操作</TableHeaderColumn>

			          	</TableHeader>

				        <TableBody >
				          <TableRow>
			                <TableRowColumn name="districtName"></TableRowColumn>
			                <TableRowColumn name="no"></TableRowColumn>
			                <TableRowColumn name="name"></TableRowColumn>
			                <TableRowColumn name="sort"></TableRowColumn>
			                <TableRowColumn name="createName"></TableRowColumn>
			                <TableRowColumn name="createDate"
			                	component={(value,oldValue)=>{
		                             return (<KrDate value={value} format="yyyy-mm-dd"/>)
		                          }}

			                ></TableRowColumn>
			                <TableRowColumn name="enable"
				                component={(value,oldValue)=>{
	                             return (<div>{value == "ENABLE" ? "启用":"禁用"}</div>)
	                          	}}

			                ></TableRowColumn>

			                <TableRowColumn type="operation">
			                    <Button label="编辑"  type="operation"  operation="edit" />
			                </TableRowColumn>
				          </TableRow>
				        </TableBody>
				        <TableFooter></TableFooter>
	           </Table>
	           </Section>

	   <Drawer

				width={750}
				onClose={this.closeAll}
				open={openNewBusiness}
				containerStyle={{minHeight:"100%",top:60,paddingBottom:228,zIndex:20}}
			>
					<NewBusiness onCancel= {this.closeNewBusiness} onSubmit = {this.onSubmit}/>
		 	</Drawer>

         <Drawer

             width={750}
             onClose={this.closeAll}
             open={openEditBusiness}
             containerStyle={{minHeight:"100%",top:60,paddingBottom:228,zIndex:20}}
             >
               <EditBusiness onCancel= {this.closeEditBusiness} onSubmit = {this.onSubmit} cityName = {cityName}/>
        </Drawer>


        {/*高级查询*/}
        <Dialog
				title="高级查询"
				operType="SHARE"
				modal={true}
				onClose={this.closeUpperForm}
				open={openUpperForm}
				contentStyle ={{ width: '666',overflow:'visible',height:296}}
			>
				<BusinessSearchForm
				    onCancel={this.closeUpperForm}
				    onSubmit={this.upperFormSubmit}

				/>
		  </Dialog>

	     </div>

		);
	}
}

export default BusinessList;
