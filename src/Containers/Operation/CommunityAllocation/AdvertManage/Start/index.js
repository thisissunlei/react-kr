import React from 'react';
import {Http,ReactHtmlParser} from 'kr/Utils';
import {
	Title,
	Section,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Drawer,
	Dialog,
	Tooltip,
	KrDate,
	Message
} from 'kr-ui';

import './../index.less';
import CreateStart from './CreateStart';
import EditStart from './EditStart';

export default class Start extends React.Component{

	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams:{
				page:1,
				pageSize:15
			},
			openCreat:false,
			openDelete:false,
			openEdit:false,
			openPublish:false,
			
			
		}
	}

	 //删除
	onDeleteData=()=>{
		var _this=this;
		const {itemDetail}=this.state;
		Http.request('delete-advert',{},{id:itemDetail.id}).then(function (response) {
			_this.openDelete();
			Message.success('删除成功！');
			_this.setState({
				searchParams:{
					date:new Date(),
					page:_this.state.page
				}
			})

		}).catch(function (err) { 
			Message.error(err.message)
		});

	}
	openPublishDel=()=>{
		var _this=this;
		const {itemDetail}=this.state;
		Http.request('publish-advert',{},{id:itemDetail.id}).then(function (response) {
			_this.openPublish();
			Message.success('发布成功！');
			_this.setState({
				searchParams:{
					date:new Date(),
					page:_this.state.page
				}
			})

		}).catch(function (err) { 
			Message.error(err.message)
		});
	}

	pageChange = (page) =>{
		this.setState({
			page
		})
	}
	openCreat=()=>{
		this.setState({
			openCreat:!this.state.openCreat
		})

	}
	
	
	openEdit=(itemDetail)=>{
		this.setState({
			itemDetail,
			openEdit:!this.state.openEdit
		})
	}
	openDelete=(itemDetail)=>{
		this.setState({
			itemDetail,
			openDelete:!this.state.openDelete
		})
	}
	openPublish=(itemDetail)=>{
		this.setState({
			itemDetail,
			openPublish:!this.state.openPublish
		})
	}
	

	render() {

		return(
			<div className="g-activity">
					<div className="m-btn">
						<Button
								label="新建"
								type='button'
								onTouchTap={this.openCreat}
							/>
					</div>
					<Table
						  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='get-notice-page'
		                  ajaxParams={this.state.searchParams}
		                  onOperation={this.onOperation}
		                  onPageChange = {this.pageChange}
					  >
				            <TableHeader>
				              <TableHeaderColumn>描述</TableHeaderColumn>
				              <TableHeaderColumn>跳转地址</TableHeaderColumn>
				              <TableHeaderColumn>图片地址</TableHeaderColumn>
				              <TableHeaderColumn>创建时间</TableHeaderColumn>
				              <TableHeaderColumn>创建人</TableHeaderColumn>
				              <TableHeaderColumn>操作</TableHeaderColumn>
				          	</TableHeader>

					        <TableBody >
					              <TableRow>
					                <TableRowColumn name="title" 
										component={(value,oldValue)=>{
				                            var TooltipStyle=""
				                            if(value.length==""){
				                              TooltipStyle="none";

				                            }else{
				                              TooltipStyle="block";
				                            }
				                             return (<div style={{display:TooltipStyle,paddingTop:5}} ><span style={{maxWidth:160,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
				                            <Tooltip offsetTop={8} place='top'>{value}</Tooltip></div>)
				                      }}></TableRowColumn>
					                <TableRowColumn name="typeName"></TableRowColumn>
					                <TableRowColumn 
					                	name="publishTime" 
					                	component={(value) => {
					                          return (<KrDate value={value} format="yyyy-mm-dd hh:MM:ss"/>)
					                    }}
					                ></TableRowColumn>
					                <TableRowColumn name="typeName"></TableRowColumn>
					                <TableRowColumn name="creater" ></TableRowColumn>
					                <TableRowColumn 
					                	name="published"
										component={(value,oldValue,itemDetail) => {
											if(value==1){
												return(
													<div style={{display:'inline'}}>
												  	<Button label="编辑" type="operation" onClick={this.openEdit.bind(this,itemDetail)} />
												  	<Button label="删除" type="operation" onClick={this.openDelete.bind(this,itemDetail)} />
													</div>
													)
					                         
											}
											if(value==0){
												return(
													<div style={{display:'inline'}}> 
												  	<Button label="编辑" type="operation" onClick={this.openEdit.bind(this,itemDetail)} />
												  	<Button label="删除" type="operation" onClick={this.openDelete.bind(this,itemDetail)} />
												  	<Button label="发布" type="operation" onClick={this.openPublish.bind(this,itemDetail)} />
													</div>
													)
											}
					                    }}
					                >
					                	
									  	
					              	</TableRowColumn>
					               </TableRow>
					        </TableBody>
			        		<TableFooter></TableFooter>
            		</Table>
            	<Drawer
	             modal={true}
	             width={750}
	             open={this.state.openEdit}
	             onClose={this.openEdit}
	             openSecondary={true}
	             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
	           >
	             	<CreateStart 
	             			onCancel={this.openEdit} 
	             			onSubmit={this.createSubmit} 
	             			
	             	 />
	           </Drawer>
	           <Drawer
	             modal={true}
	             width={750}
	             open={this.state.openCreat}
	             onClose={this.openCreat}
	             openSecondary={true}
	             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
	           >
	             	<EditStart 
	             			onCancel={this.openCreat} 
	             			onSubmit={this.editSubmit} 
	             			
	             	 />
	           </Drawer>
	           
            	<Dialog
	              title="删除"
	              modal={true}
	              contentStyle ={{ width: '444',overflow:'visible'}}
	              open={this.state.openDelete}
	              onClose={this.openDelete}
	            >
	            <div className='u-list-delete'>
	              	<p className='u-delete-title' style={{textAlign:'center',color:'#333'}}>确认要删除该活动吗？</p>
					<div style={{textAlign:'center',marginBottom:10}}>
	                      <div  className='ui-btn-center'>
		                      <Button  label="确定" onClick={this.onDeleteData}/></div>
		                      <Button  label="取消" type="button" cancle={true} onClick={this.openDelete} />
	                      </div>
	            	</div>
	            </Dialog>
	            <Dialog
	              title="发布"
	              modal={true}
	              contentStyle ={{ width: '444',overflow:'visible'}}
	              open={this.state.openPublish}
	              onClose={this.openPublish}
	            >
	            <div className='u-list-delete'>
	              	<p className='u-delete-title' style={{textAlign:'center',color:'#333'}}>确认要发布该活动吗？</p>
					<div style={{textAlign:'center',marginBottom:10}}>
	                      <div  className='ui-btn-center'>
		                      <Button  label="确定" onClick={this.openPublishDel}/></div>
		                      <Button  label="取消" type="button" cancle={true} onClick={this.openPublish} />
	                      </div>
	            	</div>
	            </Dialog>
			</div>
			)

	}


}
