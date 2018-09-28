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
import CreateActivity from './CreateActivity';
import ViewActivity from './ViewActivity';
import EditActivity from './EditActivity';
import DetailList from './DetailList';
import './index.less';
export default class ActivityList extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams:{
				page:1,
				pageSize:15
			},
			openNewCreat:false,
			openView:false,
			openDelete:false,
			openEdit:false,
			openPublish:false,
			viewRichText:false,
			openDetail:false,
			viewItem:{},
			page:1,
			flag:0,
		}

	}

	
    //删除
	onDeleteData=()=>{
		var _this=this;
		const {itemDetail}=this.state;
		Http.request('delete-activity',{},{id:itemDetail.id}).then(function (response) {
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
		Http.request('publish-activity',{},{id:itemDetail.id}).then(function (response) {
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
	openNewCreat=()=>{
		this.setState({
			openNewCreat:!this.state.openNewCreat
		})

	}
	openDetail=(itemDetail)=>{
		console.log('1111')
		this.setState({
			itemDetail,
			openDetail:!this.state.openDetail,
		})
	}
	openView=(itemDetail)=>{
		
		this.setState({
			itemDetail,
			openView:!this.state.openView
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
	
	
	createSubmit=()=>{
		this.setState({
			searchParams:{
					date:new Date(),
					pageSize:15
				}
		})
		this.openNewCreat();
	}
	editSubmit=()=>{
		this.setState({
			searchParams:{
					date:new Date(),
					pageSize:15,
					page:this.state.page
				}
		})
		this.openEdit();
	}
	
	

	render() {
		let {itemDetail,viewRichText,flag}=this.state;
		return (

			<div className="g-activitys" >
			<Title value="活动-氪空间后台管理系统"/>
				<Section title="活动列表" description="" style={{marginBottom:-5,minHeight:910}}>
					<div className="m-btn">
						<Button
								label="新建"
								type='button'
								onTouchTap={this.openNewCreat}
							/>
					</div>
					<Table
						  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='activity-page'
		                  ajaxParams={this.state.searchParams}
		                  onOperation={this.onOperation}
						  onPageChange = {this.pageChange}
						 
					  >
				            <TableHeader>
				              <TableHeaderColumn>标题</TableHeaderColumn>
				              <TableHeaderColumn>地点</TableHeaderColumn>
				              <TableHeaderColumn>时间</TableHeaderColumn>
				              <TableHeaderColumn>费用</TableHeaderColumn>
				              <TableHeaderColumn>创建人</TableHeaderColumn>
				              <TableHeaderColumn>主办方</TableHeaderColumn>
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
				                             return (<div style={{display:TooltipStyle,paddingTop:5}} ><span style={{maxWidth:140,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
				                            <Tooltip offsetTop={8} place='top'>{value}</Tooltip></div>)
				                      }}></TableRowColumn>
					                <TableRowColumn 
					                		name="site"
					                		component={(value,oldValue)=>{
				                            var TooltipStyle=""
				                            if(value.length==""){
				                              TooltipStyle="none";

				                            }else{
				                              TooltipStyle="block";
				                            }
				                             return (<div style={{display:TooltipStyle,paddingTop:5}} ><span style={{maxWidth:140,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
				                            <Tooltip offsetTop={8} place='top'>{value}</Tooltip></div>)
				                      }} ></TableRowColumn>
					                <TableRowColumn name="during" ></TableRowColumn>
					                <TableRowColumn 
					                	name="cost" 
					                	component={(value) => {
					                		let cost=value==0?'免费':`￥${value}`;
					                        return cost;
					                    }}
					                ></TableRowColumn>
					                <TableRowColumn name="createrName" ></TableRowColumn>
					                <TableRowColumn 
					                	name="sponsor"
					                	component={(value,oldValue)=>{
				                            var TooltipStyle=""
				                            if(value.length==""){
				                              TooltipStyle="none";

				                            }else{
				                              TooltipStyle="block";
				                            }
				                             return (<div style={{display:TooltipStyle,paddingTop:5}} ><span style={{maxWidth:160,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
				                            <Tooltip offsetTop={8} place='top'>{value}</Tooltip></div>)
				                      }} ></TableRowColumn> 

					                	
					                <TableRowColumn 
					                	name="published"
										component={(value,oldValue,itemDetail) => {
											if(value==1){
												return(
													<div style={{display:'inline'}}>
													<Button label="查看" type="operation" onClick={this.openView.bind(this,itemDetail)} />
												  	<Button label="编辑" type="operation" onClick={this.openEdit.bind(this,itemDetail)} />
												  	<Button label="删除" type="operation" onClick={this.openDelete.bind(this,itemDetail)} />
												  	<Button label="报名列表" type="operation" onClick={this.openDetail.bind(this,itemDetail)} />
													</div>
													)
					                         
											}
											if(value==0){
												return(
													<div style={{display:'inline'}}> 
													<Button label="查看" type="operation" onClick={this.openView.bind(this,itemDetail)} />
												  	<Button label="编辑" type="operation" onClick={this.openEdit.bind(this,itemDetail)} />
												  	<Button label="删除" type="operation" onClick={this.openDelete.bind(this,itemDetail)} />
												  	<Button label="发布" type="operation" onClick={this.openPublish.bind(this,itemDetail)} />
												  	<Button label="报名列表" type="operation" onClick={this.openDetail.bind(this,itemDetail)} />
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
            		
				</Section>
				<Drawer
	             modal={true}
	             width={750}
	             open={this.state.openNewCreat}
	             onClose={this.openNewCreat}
	             openSecondary={true}
	             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
	           >
	             	<CreateActivity 
	             			onCancel={this.openNewCreat} 
	             			onSubmit={this.createSubmit} 
	             			viewRichText={this.viewRichText}
	             			flag={flag}
	             	 />
	           </Drawer>
	           <Drawer
	             modal={true}
	             width={750}
	             open={this.state.openEdit}
	             onClose={this.openEdit}
	             openSecondary={true}
	             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
	           >
	             	<EditActivity 
	             			onCancel={this.openEdit}
	             			detail={itemDetail} 
	             			onSubmit={this.editSubmit}
	             			viewRichText={this.viewRichText} 
	             			flag={flag}
	             	 />
	           </Drawer>
	           <Drawer
	             modal={true}
	             width={750}
	             open={this.state.openView}
	             onClose={this.openView}
	             openSecondary={true}
	             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
	           >
	             	<ViewActivity 
	             			onCancel={this.openView} 
	             			detail={itemDetail}
	             	 />
	           </Drawer>
	           <Drawer
	             modal={true}
	             width={750}
	             open={this.state.openDetail}
	             onClose={this.openDetail}
	             openSecondary={true}
	             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
	           >
	             	<DetailList
	             			onCancel={this.openDetail} 
	             			detail={itemDetail}
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
	            <Dialog
	              title="置顶"
	              modal={true}
	              contentStyle ={{ width: '444',overflow:'visible'}}
	              open={this.state.openTop}
	              onClose={this.openTop}
	            >
	            <div className='u-list-delete'>
	              	<p className='u-delete-title' style={{textAlign:'center',color:'#333'}}>确认要置顶该活动吗？</p>
					<div style={{textAlign:'center',marginBottom:10}}>
	                      <div  className='ui-btn-center'>
		                      <Button  label="确定" onClick={this.openTopSub}/></div>
		                      <Button  label="取消" type="button" cancle={true} onClick={this.openTop} />
	                      </div>
	            	</div>
	            </Dialog>
			</div>
		);
	}
}
