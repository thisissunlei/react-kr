

import React from 'react';
import {Actions,Store,connect} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	FieldArray,
	change
} from 'redux-form';
import {
	Message,Dialog,Button,Table,TableHeader,TableHeaderColumn,TableBody
	,TableRow,TableRowColumn,TableFooter,Tooltip,Drawer,Grid,Row,
	ListGroup,ListGroupItem,SearchForms,FontIcon,
	Dropdown,Pagination
} from 'kr-ui';
import {Http} from 'kr/Utils';
import $ from 'jquery';

import './index.less';

import State from './State';
import {
	observer,
	inject
} from 'mobx-react';

import NewCreate from './NewCreate';
import EditForm from './EditForm';


@inject("NavModel")
@observer


export default class PrinterManage  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state = {
			selectIds : [],
			openMenu :false,
			itemDetail : {},
			priceListDom : '',
			getListDataParam : {
				name : '',
				page : 1,
				pageSize: 3
			},
			listData : {
				items : []

			},
			EditIntialDate:{}
		}
	}


	componentDidMount() {
	
		this.getPriceConfigListFun(this.state.getListDataParam)

	}

	

	//打开新建
	openNewCreateDialog=()=>{
		State.openNewCreate = !State.openNewCreate;
	}



	onClickDelete=(params)=>{

		this.setState({
			itemDetail :params
		},function(){
			this.openDeleteFun();
		});

	}


	//打开确认删除
	openDeleteFun=()=>{
		State.openConfirmDelete = !State.openConfirmDelete;
	}

	
	//打开编辑
	openEditDialogFun=()=>{
		State.openEditDialog = !State.openEditDialog;
	}


	//确认删除
	confirmDelete=()=>{

		this.openDeleteFun();
		this.deleteEquipmentSingle(this.state.itemDetail.id);

	}


	//单个删除
	deleteEquipmentSingle=(id)=>{

		let _this =this;
		Http.request('deleteConfigListUrl',{id:deleteID}).then(function(response) {
			
			Message.success("删除成功");
			_this.setState({
				getListDataParam:{
					name : '',
					page : 1,
					pageSize: 3
				}
			})
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
		




	editPrice=(value)=>{

		var param = {id : value.id};
		let _this =this;
		Http.request('getDetailPriceUrl',param).then(function(response) {
			console.log("response",response);
			var monoPrice_T = JSON.parse(response.monoPrice),
			colorPrice_T = JSON.parse(response.colorPrice),
			paperPrice_T = JSON.parse(response.paperPrice);

			var EditIntialDate_T = {
				id : response.id,
				name : response.name,
				A4Mono :monoPrice_T.A4,
				A4Color :colorPrice_T.A4,
				A4White :paperPrice_T.A4,

				A3Mono :monoPrice_T.A3,
				A3Color :colorPrice_T.A3,
				A3White :paperPrice_T.A3,

				A5Mono :monoPrice_T.A5,
				A5Color :colorPrice_T.A5,
				A5White :paperPrice_T.A5,

				LetterMono :monoPrice_T.Letter,
				LetterColor :colorPrice_T.Letter,
				LetterWhite :paperPrice_T.Letter,

				LegalMono :monoPrice_T.Legal,
				LegalColor :colorPrice_T.Legal,
				LegalWhite :paperPrice_T.Legal,

				B4Mono :monoPrice_T.B4,
				B4Color :colorPrice_T.B4,
				B4White :paperPrice_T.B4,

				B5Mono :monoPrice_T.B5,
				B5Color :colorPrice_T.B5,
				B5White :paperPrice_T.B5,

				scanPrice : response.scanPrice
				 
			}
			_this.setState({
				EditIntialDate : EditIntialDate_T
			},function(){
				_this.openEditDialogFun();
			})

		}).catch(function(err) {
		
			Message.error(err.message);
		});	
	}

	editPriceSubmit=(values)=>{

		let _this =this;
		Http.request('editPriceUrl',values).then(function(response) {
	
			State.openEditDialog =false;
			Message.success("编辑成功");
			console.log("编辑成功=====>")
			var newParam = Object.assign({},_this.state.getListDataParam);
			_this.setState({
				getListDataParam : newParam
			},function(){
				_this.getPriceConfigListFun(_this.state.getListDataParam);
			})
		

		}).catch(function(err) {
			
			Message.error(err.message);
		});	
	}

	deletePrice=(itemData)=>{
		console.log("itemData",itemData);
		let _this =this;
		Http.request('deleteConfigListUrl',{id :itemData.id }).then(function(response) {
		
			Message.success("删除成功");
			_this.setState({
				getListDataParam:{
					name : '',
					page : _this.state.getListDataParam.page,
					pageSize: 3
				}
			},function(){
				_this.getPriceConfigListFun(_this.state.getListDataParam);
			})

		}).catch(function(err) {
			
			Message.error(err.message);
		});	
	}


	

	getPriceConfigListFun=(param)=>{
		let _this =this;
		Http.request('getPriceConfigListUrl',param).then(function(response) {
			_this.setState({
				listData : response
			})

		}).catch(function(err) {
			
			Message.error(err.message);
		});	

	}

	renderListDataList=(item)=>{

		var objColor = JSON.parse(item.colorPrice);
		var objMono = JSON.parse(item.monoPrice);
		var objPaper = JSON.parse(item.paperPrice);
		
		return (
			<div className="middle-item" >
				<div className="item-list">
					<div>A4</div><div>{objMono.A4}</div><div>{objColor.A4}</div><div>{objPaper.A4}</div>
				</div>
				<div  className="item-list">
					<div>A3</div><div>{objMono.A3}</div><div>{objColor.A3}</div><div>{objPaper.A3}</div>
				</div>
				<div  className="item-list">
					<div>A5</div><div>{objMono.A5}</div><div>{objColor.A5}</div><div>{objPaper.A5}</div>
				</div>
				<div  className="item-list">
					<div>A5</div><div>{objMono.Letter}</div><div>{objColor.Letter}</div><div>{objPaper.Letter}</div>
				</div>
				<div  className="item-list">
					<div>A5</div><div>{objMono.Legal}</div><div>{objColor.Legal}</div><div>{objPaper.Legal}</div>
				</div >
				<div  className="item-list">
					<div>A5</div><div>{objMono.B4}</div><div>{objColor.B4}</div><div>{objPaper.B4}</div>
				</div>
				<div  className="item-list">
					<div>B5</div><div>{objMono.B5}</div><div>{objColor.B5}</div><div>{objPaper.B5}</div>
				</div>
			</div>

		)

	}

	renderListData=(response)=>{
		
		let _this =this;

		var priceListDom = response.map(function(item,index){
				
				return(

					<div className="list-item-box" key={index}>	

						<div className="list-left">{item.name}</div>
						<div className="list-middle">
							
								{
									_this.renderListDataList(item)
								}
							
						</div>
						<div className="list-right">
							<div className="scan-price">{item.scanPrice}</div>
							<div className="operate-box">
								{item.canDelete && <div className="operate-item"><span onClick={_this.editPrice.bind(this,item)}>编辑</span></div>}
								{item.canDelete && <div className="operate-item"><span onClick={_this.deletePrice.bind(this,item)}>删除</span></div>}
							</div>
						</div>
					</div>	
				
				)
			})
		return priceListDom;

	}




	onPageChange=(pageParam)=>{
		
		let {getListDataParam} =this.state;
		var bewObj = {
						name : '',
						page : pageParam,
						pageSize: 3
					};
		this.setState({
				getListDataParam : {
					name : '',
					page : pageParam,
					pageSize: 3
				}
		})

		this.getPriceConfigListFun(bewObj);

	}




	//新增
	newCreatePrice = (values)=>{

		let _this =this;
		Http.request('newCreatePriceUrl',{},values ).then(function(response) {
		
			State.openNewCreate =false;
			_this.setState({
				getListDataParam : {
					name : '',
					page : 1,
					pageSize: 3
				}
			},function(){
				_this.getPriceConfigListFun(_this.state.getListDataParam);
			})
			Message.success("新增成功");

		}).catch(function(err) {

			State.openNewCreate =false;
			Message.error(err.message);

		});	
	}
	


	render(){
		let {itemDetail,priceListDom,getListDataParam,listData,EditIntialDate}=this.state;
		
		return(
			<div >
				<div>

					<Button label="新增"  onTouchTap={this.openNewCreateDialog} className="button-list"/>
					<span style={{color : "red"}}>一个社区只能使用一个费用策略，不可以添加多种</span>
				</div>
				
				
				<div className="price-table-box">
					<div className="price-table">
						<div className="price-table-head">
							<div className="price-table-head-title-name">策略名称</div>
							<div className="price-table-head-title">纸张类型</div>
							<div className="price-table-head-title">黑白单价(元/面)</div>
							<div className="price-table-head-title">彩色单价(元/面)</div>
							<div className="price-table-head-title">纸张单价(元/张)</div>
							<div className="price-table-head-title">扫描价格(元/页)</div>
							<div className="price-table-head-title">操作</div>
						</div>
						<div className="table-body">
							
							
							{
								
								this.renderListData(listData.items)
							}
						</div>
						<div style={{marginTop:20}}>
							<Pagination totalCount={listData.totalCount} page={listData.page} pageSize={3} onPageChange={this.onPageChange}/>
						</div>
					</div>
					
					<Dialog
			          title="新增费用配置"
			          open={State.openNewCreate}
			          onClose={this.openNewCreateDialog}
			          contentStyle={{width:687}}
			        >
			          <NewCreate
			            onCancel={this.openNewCreateDialog}
			            style ={{paddingTop:'35px'}}
			            newCreatePrice= {this.newCreatePrice}
			          />
			        </Dialog>
			        <Dialog
			          title="编辑费用配置"
			          open={State.openEditDialog}
			          onClose={this.openEditDialogFun}
			          contentStyle={{width:687}}
			        >
			          <EditForm
			            detail={EditIntialDate}
			            closeEditEquipment = {this.openEditDialogFun}
			            editPriceSubmit = {this.editPriceSubmit}
			          />
			        </Dialog>
			        <Dialog
			          title="删除提示"
			          open={State.openConfirmDelete}
			          onClose={this.openDeleteFun}
			          contentStyle={{width:443,height:236}}
			        >
			          <div style={{marginTop:45}}>
			            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>确定要删除吗？</p>
			            <Grid style={{marginTop:60,marginBottom:'4px'}}>
			                  <Row>
			                    <ListGroup>
			                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
			                        <Button  label="确定" type="submit" onClick={this.confirmDelete} />
			                      </ListGroupItem>
			                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
			                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.openDeleteFun} />
			                      </ListGroupItem>
			                    </ListGroup>
			                  </Row>
			                </Grid>
			          </div>
			        </Dialog>

				</div>
				
			</div>
		);
	}
}


