import React from 'react';
import {DateFormat} from 'kr/Utils';
import {
  reduxForm,
  change,
  arrayPush,
  initialize
} from 'redux-form';
import {
	observer
} from 'mobx-react';
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
 import NewBusiness from "./NewBusiness";
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
			openDelEquipment:false,
			id : '',
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
   			name:searchParams.name,
			page: searchParams.page,
			pageSize: searchParams.pageSize,
			date:date
   		},
   		
   	})
   }
   
   //新建商圈
   openNewBusiness = () =>{
   		this.setState({
   			openNewBusiness:true,
   		});
   		Store.dispatch(initialize('NewBusiness',{}));

   }
   //关闭新建商圈
   closeNewBusiness = () =>{

   		this.setState({
   			openNewEquipment:false,
   		})
   }
   // 打开编辑设备
   openEditEquipment = () =>{
		this.setState({
   			openEditEquipment:true,
   		})
   }

   // 打开编辑设备
   closeEditEquipment = () =>{
		this.setState({
   			openEditEquipment:false,
   		})
   }
   //关闭删除
   closeDelEquipment = () =>{
   		this.setState({
   			openDelEquipment:false,
   		})
   }
   //确定删除
   onDelSubmit = () =>{
   		let {id } = this.state;
   		Http.request('equipment-delete',{id:id}).then(function(response) {
			_this.closeDelEquipment();
			_this.refreshList();
		}).catch(function(err) {
			Message.error(err.message);
		});

   }
   //提交新建
	onSubmit = (params) =>{

		let {id} = this.state;
		let _this = this;
		
		params.id = id;

		Http.request('equipment-submit',params).then(function(response) {
			_this.closeNewEquipment();
			_this.refreshList();
		}).catch(function(err) {
			Message.error(err.message);
		});

	}
	//相关操作
	onOperation = (type, itemDetail) =>{

		if(type === "edit"){
			this.setState({
   				openEditEquipment:true,
   				id:itemDetail.id
   			})
   			Store.dispatch(initialize('NewEquipment',{name:itemDetail.name}));

		}
		if(type === "delete"){
			this.setState({
   				openDelEquipment:true,
   				id:itemDetail.id
   			})
		}
	}
	closeAll = () =>{
		this.setState({
			openNewBusiness:false,
		})
	}
	render(){
		let {searchParams,openNewBusiness} = this.state;
		

		return(
			<div className="m-equipment-list" style={{paddingTop:25,minHeight:'910'}}>
				<Title value="商圈列表"/>
      		<Section title="商圈列表"  style={{marginBottom:-5,minHeight:910}}>
	      		
		        <Row style={{marginBottom:21}}>
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

				          <Col  align="right" style={{marginTop:0,float:"right",marginRight:-10}}>
					          <ListGroup>
					            <ListGroupItem><SearchForms placeholder='请输入设备名称' inputName='mr' onSubmit={this.onSearchSubmit}/></ListGroupItem>
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
		            displayCheckbox={true}
		            ajaxParams={searchParams}
		            ajaxUrlName='business-list'
		            ajaxFieldListName="items"
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
			                <TableRowColumn name="createDate"></TableRowColumn>
			                <TableRowColumn name="enable"></TableRowColumn>
			                
			                <TableRowColumn type="operation">
			                    <Button label="编辑"  type="operation"  operation="edit" />
			                </TableRowColumn>
				          </TableRow>
				        </TableBody>
				        <TableFooter></TableFooter>
	           </Table>
	           </Section>
	       	   
	           <Drawer
					title="新建商圈"
					modal={true}
					width={750}
					onClose={this.closeAll}
					open={openNewBusiness}
					containerStyle={{minHeight:"100%",top:60,paddingBottom:228,zIndex:20}}
					>
						<NewBusiness />
				</Drawer>
				
	        </div>
				
		);
	}
}

export default BusinessList;



