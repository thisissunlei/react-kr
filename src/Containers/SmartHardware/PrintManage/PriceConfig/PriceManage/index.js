

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
import DetailDialog from './DetailDialog';
import SearchForm from './SearchForm';


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
			listData : {}
		}
	}


	componentDidMount() {
		this.renderPrice();

	}

	freshPageThis=()=>{
		State.freshPageReturn();
	}

	//操作相关
	onOperation=(type, itemDetail)=>{

		console.log("onOperation",itemDetail)
		this.setState({
			itemDetail
		});
		if (type == 'delete') {
			this.openDeleteFun();
			
		}
		if (type == 'edit') {
			
			this.openEditDialogFun();
		}

		if (type == 'detail') {
			
			this.seeDetailFun();
		}

		
		
	}

	seeDetailFun=()=>{
		console.log("this.state.itemDetail",this.state.itemDetail);
	}


	closeAll=()=>{
		State.openHardwareDetail = false;
	}

	onSelcet=(result,selectedListData)=>{
		var ids=[];
		for(var i=0;i<selectedListData.length;i++){
			ids.push(selectedListData[i].id);
		}
		this.setState({
			selectIds:ids
		})
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
		State.deleteEquipmentSingle(this.state.itemDetail.id);

	}


	editList=(value,str)=>{


		let _this = this;
		Http.request('printerDetailInfo',{id:value.id}).then(function(response) {
			
			_this.setState({
				itemDetail:response
			},function(){
				if(str=="edit"){
					_this.openEditDialogFun();
				}if(str=="detail"){
					_this.openDetailDialog();
				}
				
			});

		}).catch(function(err) {
			Message.error(err.message);
		});
		
	}

	deleteList=(thisP,value,itemData)=>{
		this.setState({
			itemDetail:thisP
		});
		this.openDeleteFun();
	}


	openDetailDialog=()=>{
		State.detailDialogOpen = !State.detailDialogOpen;
	}

	

	renderPrice=()=>{

		var priceListDom;
		let _this =this;
		let {getListDataParam} = this.state;
		Http.request('getPriceConfigListUrl',getListDataParam).then(function(response) {
			

			_this.setState({
				listData : response
			})
			priceListDom = response.items.map(function(item,index){
				
				return(

					<div className="list-item-box">	

						<div className="list-left">{item.name}</div>
						<div className="list-middle">
							<div className="middle-item">
								<div className="paper-type ">
									<div>A4</div>
									<div>A3</div>
									<div>A5</div>
									<div>Letter</div>
									<div>Legal</div>
									<div>B4</div>
									<div>B5</div>
								</div>
								<div className="mono-price paper-type">
									<div>{JSON.parse(item.monoPrice).A4}</div>
									<div>{JSON.parse(item.monoPrice).A3}</div>
									<div>{JSON.parse(item.monoPrice).A5}</div>
									<div>{JSON.parse(item.monoPrice).Letter}</div>
									<div>{JSON.parse(item.monoPrice).Legal}</div>
									<div>{JSON.parse(item.monoPrice).B4}</div>
									<div>{JSON.parse(item.monoPrice).B5}</div>
								</div>
								<div  className="color-price paper-type">
									<div>{JSON.parse(item.colorPrice).A4}</div>
									<div>{JSON.parse(item.colorPrice).A3}</div>
									<div>{JSON.parse(item.colorPrice).A5}</div>
									<div>{JSON.parse(item.colorPrice).Letter}</div>
									<div>{JSON.parse(item.colorPrice).Legal}</div>
									<div>{JSON.parse(item.colorPrice).B4}</div>
									<div>{JSON.parse(item.colorPrice).B5}</div>
								</div>
								<div  className="paper-price paper-type">
									<div>{JSON.parse(item.paperPrice).A4}</div>
									<div>{JSON.parse(item.paperPrice).A3}</div>
									<div>{JSON.parse(item.paperPrice).A5}</div>
									<div>{JSON.parse(item.paperPrice).Letter}</div>
									<div>{JSON.parse(item.paperPrice).Legal}</div>
									<div>{JSON.parse(item.paperPrice).B4}</div>
									<div>{JSON.parse(item.paperPrice).B5}</div>
								</div>
								
							</div>
						</div>
						<div className="list-right">
							<div className="scan-price">{item.scanPrice}</div>
							<div className="operate-box">
								<div className="operate-item"><span>编辑</span></div>
								{item.canDelete && <div className="operate-item"><span>删除</span></div>}
							</div>
						</div>
					</div>	
				
				)
			})

			

			_this.setState({
				priceListDom :priceListDom
			})

		}).catch(function(err) {
			
			Message.error(err.message);
		});	
		
		
	}


	returnDom=(param)=>{
		return param
	}



	onPageChange=(page)=>{
		console.log("page",page)
	}



	render(){
		let {itemDetail,priceListDom,getListDataParam,listData}=this.state;
		
		return(
			<div >
				<div>

					<Button label="新增"  onTouchTap={this.openNewCreateDialog} className="button-list"/>
					
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
								this.returnDom(priceListDom)
							}
						</div>
						<Pagination totalCount={listData.totalCount} page={listData.page} pageSize={listData.pageSize} onPageChange={this.onPageChange}/>
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
			            onSubmit = {this.onSubmitNewCreateEquipment}
			            saveAndNewCreate= {this.saveAndNewCreate}
			          />
			        </Dialog>
			        <Dialog
			          title="编辑费用配置"
			          open={State.openEditDialog}
			          onClose={this.openEditDialogFun}
			          contentStyle={{width:687}}
			        >
			          <EditForm
			            detail={itemDetail}
			            onSubmit = {this.onSubmitNewCreateEquipment}
			            closeEditEquipment = {this.openEditDialogFun}
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

			        <Dialog
			          title="费用详情"
			          open={State.detailDialogOpen}
			          onClose={this.openDetailDialog}
			          contentStyle={{width:687}}
			        >
			          <DetailDialog
			            detail={itemDetail}
			            closeEditEquipment = {this.openEditDialogFun}
			          />
			        </Dialog>
			        
			  


				</div>
				
			</div>
		);
	}
}


