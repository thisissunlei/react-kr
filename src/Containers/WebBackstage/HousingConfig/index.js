
import React from 'react';

import {Http,DateFormat} from 'kr/Utils';
import {
	Title,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
    TableRowColumn,
    TableFooter,
	Button,
	Section,
	Dialog,
	Message,
	Notify,
	CheckPermission,
	Tooltip,
	Grid,
	Row,
	ListGroup,
	ListGroupItem

} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';

import OpenSearchForm from './OpenSearchForm';
import NewCreate from './NewCreate';
import EditForm from './EditForm';



import './index.less';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class List extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			itemDetail : {}
		}
	}
	componentDidMount(){
		State.getPrintPriceNameList();
	}
	onLoaded=(response)=>{
		let list = response;
		this.setState({
			list
		})
	}
	openNewCreateDialog=()=>{
		State.openNewCreate = !State.openNewCreate;
	}
	editList=(value)=>{
		this.setState({
			itemDetail : value
		},function(){
			State.openEditDialog = true;
		})
    }

    onPageChange=(page)=>{
		this.setState({
			realPage : page 
		})
		State.page  = page
	}
    
	openEditDialogFun=()=>{
		State.openEditDialog = !State.openEditDialog;
	}
	onClickDelete=(value)=>{
		this.setState({
			itemDetail : value
		},function(){
			State.openConfirmDelete = true;
		})
	}
	confirmDelete=()=>{
		let {itemDetail} = this.state;
		State.deletePrinterConfig(itemDetail.id)
	}
	openDeleteFun=()=>{
		State.openConfirmDelete = !State.openConfirmDelete;
	}
	render() {
		let {itemDetail} = this.state;
		return (
			    <div className='house-config-box'>
					<Title value="好租房源配置"/>
					<Section title={`好租房源配置`} description="" >
						<div>
							<Button label="新增"  onTouchTap={this.openNewCreateDialog}/>
							<OpenSearchForm/>
						</div>
						<Table
							className="member-list-table"
							style={{marginTop:10,position:'inherit'}}
							onLoaded={this.onLoaded}
							ajax={true}
							onProcessData={(state)=>{
								return state;
							}}
							exportSwitch={false}
							ajaxFieldListName='items'
                            ajaxUrlName='house-get-list'
                            ajaxParams={State.houseConifigListParams}
                            onPageChange={this.onPageChange}
							displayCheckbox={false}
						>
							<TableHeader>
								<TableHeaderColumn>城市</TableHeaderColumn>
								<TableHeaderColumn>社区名称</TableHeaderColumn>
								<TableHeaderColumn>房源类型</TableHeaderColumn>
								<TableHeaderColumn>月价格（元）</TableHeaderColumn>
								<TableHeaderColumn>房间类型（人间）</TableHeaderColumn>
								<TableHeaderColumn>最短租期(月)</TableHeaderColumn>
								<TableHeaderColumn>付款方式</TableHeaderColumn>
                                <TableHeaderColumn>佣金比例</TableHeaderColumn>
                                <TableHeaderColumn>操作</TableHeaderColumn>
							</TableHeader>
							<TableBody style={{position:'inherit'}}>
								<TableRow>
		              			<TableRowColumn name="brandType" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="cmtName" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="houseType" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
                                    }else if(value=="INDEPENDENT_OFFICE"){
                                        value="独立办公室"
                                    }else if(value=="OPEN_STATION"){
                                        value="开放工位"
                                    }
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="monthPrice" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
                                <TableRowColumn name="allowNum" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
                                <TableRowColumn name="rentDate" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
                                <TableRowColumn name="payMonth" 
									component={(value,oldValue,allValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{'押'+allValue.depositMonth+'付'+allValue.payMonth}</span>)}}
								></TableRowColumn>
                                <TableRowColumn name="moneyRate" 
									component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn type="operation"
									component={
										(value,oldValue,itemData)=>{
											if(value==""){
												value="-"
											}
											return (
													<div>
														<Button  label="发布"  type="operation" operation="edit" onTouchTap={this.editList.bind(this,value)}/>
                                                        <Button  label="编辑"  type="operation" operation="edit" onTouchTap={this.editList.bind(this,value)}/>
														<Button  label="删除"  type="operation" operation="delete" onTouchTap={this.onClickDelete.bind(this,value,itemData)}/>
													</div>
												)
										}
									}
								> 
								</TableRowColumn>
							 </TableRow>
						</TableBody>
                        <TableFooter></TableFooter>
						</Table>
						<Dialog
				          title="新建"
				          open={State.openNewCreate}
				          onClose={this.openNewCreateDialog}
				          contentStyle={{width:410}}
				        >
					        <NewCreate
					            onCancel={this.openNewCreateDialog}
					            style ={{paddingTop:'35px'}}
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
				          title="编辑打印配置"
				          open={State.openEditDialog}
				          onClose={this.openEditDialogFun}
				          contentStyle={{width:687}}
				        >
				          <EditForm
				            detail={itemDetail}
				            closeEditEquipment = {this.openEditDialogFun}
				          />
				        </Dialog>
					</Section>
				</div>
		);

	}

}
