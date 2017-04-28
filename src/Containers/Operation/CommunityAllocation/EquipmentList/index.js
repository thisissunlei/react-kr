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
  Tooltip,
	Message
} from 'kr-ui';
import {Http} from "kr/Utils";

import  "./index.less";
import NewEquipment from "./NewEquipment";
import EditEquipment from "./EditEquipment";
import DelEquipment from "./DelEquipment";
class EquipmentList  extends React.Component{

	constructor(props,context){
		super(props, context);
		let date = new Date();
		this.state={
			searchParams:{
				name:'',
				page: 1,
     			pageSize: 15,
     			date:date
			},
			openNewEquipment:false,
			openEditEquipment:false,
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
   		name:value.content,
			page: searchParams.page,
			pageSize: searchParams.pageSize,
			date:date
   		},

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
     			date:date
      	},

    	})
   }

   //新建设备
   openNewEquipment = () =>{
   		this.setState({
   			openNewEquipment:true,
   		});

   }
   //关闭新建设备
   closeNewEquipment = () =>{

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

   // 关闭编辑设备
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
      let _this = this;
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
			_this.closeEditEquipment();
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
	render(){
		let {searchParams,openNewEquipment,openEditEquipment,openDelEquipment} = this.state;


		return(
			<div className="m-equipment-list" style={{minHeight:'910'}}>
				<Title value="设备列表"/>
      		<Section title="设备列表"  style={{marginBottom:-5,minHeight:910}}>

		        <Row style={{marginBottom:21}}>
				          <Col
						     align="left"
						     style={{float:'left'}}
						   >
								<Button
									label="新建设备"
									type='button'
									onTouchTap={this.openNewEquipment}
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
		            displayCheckbox={false}
		            ajaxParams={searchParams}
		            ajaxUrlName='equipment-list'
		            ajaxFieldListName="items"
				>
			            <TableHeader>
			              <TableHeaderColumn>ID</TableHeaderColumn>
			              <TableHeaderColumn>设备名称</TableHeaderColumn>
			              <TableHeaderColumn>创建人</TableHeaderColumn>
			              <TableHeaderColumn>创建时间</TableHeaderColumn>
			              <TableHeaderColumn>最后操作人</TableHeaderColumn>
			              <TableHeaderColumn>最后操作时间</TableHeaderColumn>
			              <TableHeaderColumn>操作</TableHeaderColumn>

			          	</TableHeader>

				        <TableBody >
				          <TableRow>
			                <TableRowColumn name="id" ></TableRowColumn>
			                <TableRowColumn name="name" component={(value,oldValue) =>{
                          console.log(value,">>>>>>>")
														var TooltipStyle=""
														if(value.length==""){
															TooltipStyle="none"

														}else{
															TooltipStyle="inline-block";
														}
														 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
														 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
													 }}></TableRowColumn>
			                <TableRowColumn name="createName" ></TableRowColumn>
			                <TableRowColumn name="createDate"
                          component={(value,oldValue)=>{
                             return (<KrDate value={value} format="yyyy-mm-dd"/>)
                          }}
											>
                      </TableRowColumn>
			                <TableRowColumn name="updateName"></TableRowColumn>
			                <TableRowColumn name="updateDate"
                          component={(value,oldValue)=>{
														 return (<KrDate value={value} format="yyyy-mm-dd"/>)
                          }}
                      >
                      </TableRowColumn>

			                <TableRowColumn type="operation">
			                    <Button label="编辑"  type="operation"  operation="edit" />
			                    <Button label="删除"  type="operation"  operation="delete" />
			                </TableRowColumn>
				          </TableRow>
				        </TableBody>
				        <TableFooter></TableFooter>
	           </Table>
	           </Section>
	       	   {/*新建设备*/}
	           <Dialog
						title="新建设备"
						modal={true}
						open={openNewEquipment}
						onClose={this.closeNewEquipment}
						bodyStyle={{paddingTop:34}}
						contentStyle={{width:400}}
					>
						<NewEquipment  onClose={this.closeNewEquipment} onSubmit = {this.onSubmit} />

				</Dialog>

				<Dialog
						title="编辑设备"
						modal={true}
						open={openEditEquipment}
						onClose={this.closeEditEquipment}
						bodyStyle={{paddingTop:34}}
						contentStyle={{width:400}}
					>
						<NewEquipment  onClose={this.closeEditEquipment} onSubmit = {this.onSubmit} />

				</Dialog>

				<Dialog
						title="提示"
						modal={true}
						open={openDelEquipment}
						onClose={this.closeDelEquipment}
						bodyStyle={{paddingTop:34}}
						contentStyle={{width:400}}
					>
						<DelEquipment  onClose={this.closeDelEquipment} onSubmit = {this.onDelSubmit} />

				</Dialog>
	        </div>

		);
	}
}

export default EquipmentList;
