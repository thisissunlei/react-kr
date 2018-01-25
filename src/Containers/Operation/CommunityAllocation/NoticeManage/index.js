import React from 'react';
import {Http,ReactHtmlParser} from 'kr/Utils';
import {
	reduxForm,
	submitForm,
	change,
} from 'redux-form';
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
	Message,
	SearchForms,
	KrField
} from 'kr-ui';
import CreateNotice from './CreateNotice';
import EditNotice from './EditNotice';
import './index.less';
class NoticeManage extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams:{
				page:1,
				pageSize:15
			},
			openNewCreat:false,
			openCancel:false,
			openDelete:false,
			openEdit:false,
			page:1,
			searchText:'',
			cmtId:'',
		}

	}

	
    //删除
	onDeleteData=()=>{
		var _this=this;
		const {itemDetail}=this.state;
		Http.request('delete-notice',{},{noticeId:itemDetail.noticeId}).then(function (response) {
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
	onCancelNotice=()=>{
		var _this=this;
		const {itemDetail}=this.state;
		Http.request('expire-notice',{},{noticeId:itemDetail.noticeId}).then(function (response) {
			_this.openCancel();
			Message.success('修改成功！');
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
	openCancel=(itemDetail)=>{
		
		this.setState({
			itemDetail,
			openCancel:!this.state.openCancel
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

	//搜索
	onSearchSubmit=(params)=>{
		let {cmtId}=this.state;
		if(cmtId){
			this.setState({
				searchParams:{
					searchText:params.content,
					cmtId
				},
				searchText:params.content
			})
		}else{
			this.setState({
				searchParams:{
					searchText:params.content
				},
				searchText:params.content
			})
		}
		
		
	}
	selectCommunity=(params)=>{
		let {searchText}=this.state;
		if(searchText){
			this.setState({
				searchParams:{
					cmtId:params.id,
					searchText
				},
				cmtId:params.id
			})
		}else{
			this.setState({
				searchParams:{
					cmtId:params.id
				},
				cmtId:params.id
			})
		}
		
	}
	

	render() {
		let {itemDetail}=this.state;
		return (

			<div className="g-notice" >
			<Title value="公告管理"/>
				<Section title="公告列表" description="" style={{marginBottom:-5,minHeight:910}}>
					<div className="m-btn">
						<Button
								label="新建公告"
								type='button'
								onTouchTap={this.openNewCreat}
							/>
						<SearchForms 
							placeholder='请输入公告内容' 
							inputName='mr' 
							onSubmit={this.onSearchSubmit}
						/>
						<div className="u-communityName">
							<KrField  
									
									name="cmtId"
									component='searchAllCommunity'  
									label="社区：" 
									inline={true}  
									placeholder='请输入社区名称' 
									onChange={this.selectCommunity}
							/>
						</div>
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
				              <TableHeaderColumn>公告内容</TableHeaderColumn>
				              <TableHeaderColumn>社区名称</TableHeaderColumn>
							  <TableHeaderColumn>发布人</TableHeaderColumn>
				              <TableHeaderColumn>阅读人数</TableHeaderColumn>
				              <TableHeaderColumn>发布时间</TableHeaderColumn>
				              <TableHeaderColumn>过期时间</TableHeaderColumn>
				              <TableHeaderColumn>操作</TableHeaderColumn>
				          	</TableHeader>

					        <TableBody >
					              <TableRow>
					                <TableRowColumn name="text" 
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
									<TableRowColumn name="cmtName" ></TableRowColumn>
					                <TableRowColumn name="creater"></TableRowColumn>
									<TableRowColumn name="readNum" ></TableRowColumn>
					                <TableRowColumn 
					                	name="publishTime" 
					                	component={(value) => {
					                          return (<KrDate value={value} format="yyyy-mm-dd hh:MM:ss"/>)
					                    }}
					                ></TableRowColumn>
					                <TableRowColumn 
					                	name="endTime" 
					                	component={(value) => {
					                          return (<KrDate value={value} format="yyyy-mm-dd hh:MM:ss"/>)
					                    }}
					                ></TableRowColumn>
					               
					                <TableRowColumn 
					                	name="expired"
										component={(value,oldValue,itemDetail) => {
											if(value==0){
												return(
													<div style={{display:'inline'}}>
													<Button label="编辑" type="operation" onClick={this.openEdit.bind(this,itemDetail)} />
													<Button label="过期" type="operation" onClick={this.openCancel.bind(this,itemDetail)} />
												  	<Button label="删除" type="operation" onClick={this.openDelete.bind(this,itemDetail)} />
												  	</div>
													)
					                         
											}
											if(value==1){
												return(
													<div style={{display:'inline'}}> 
														<Button label="编辑" type="operation" onClick={this.openEdit.bind(this,itemDetail)} />
												  		<Button label="删除" type="operation" onClick={this.openDelete.bind(this,itemDetail)} />
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
	             	<CreateNotice 
	             			onCancel={this.openNewCreat} 
	             			onSubmit={this.createSubmit} 
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
	             	<EditNotice 
	             			onCancel={this.openEdit}
	             			detail={itemDetail} 
	             			onSubmit={this.editSubmit}
	             	 />
	           </Drawer>
			   <Dialog
	              title="过期"
	              modal={true}
	              contentStyle ={{ width: '444',overflow:'visible'}}
	              open={this.state.openCancel}
	              onClose={this.openCancel}
	            >
	            <div className='u-list-delete'>
	              	<p className='u-delete-title' style={{textAlign:'center',color:'#333'}}>确定要将此公告设置为“已过期”吗？</p>
					<div style={{textAlign:'center',marginBottom:10}}>
	                      <div  className='ui-btn-center'>
		                      <Button  label="确定" onClick={this.onCancelNotice}/></div>
		                      <Button  label="取消" type="button" cancle={true} onClick={this.openCancel} />
	                      </div>
	            	</div>
	            </Dialog> 
	           
	           <Dialog
	              title="删除"
	              modal={true}
	              contentStyle ={{ width: '444',overflow:'visible'}}
	              open={this.state.openDelete}
	              onClose={this.openDelete}
	            >
	            <div className='u-list-delete'>
	              	<p className='u-delete-title' style={{textAlign:'center',color:'#333'}}>确认要删除公告吗？</p>
					<div style={{textAlign:'center',marginBottom:10}}>
	                      <div  className='ui-btn-center'>
		                      <Button  label="确定" onClick={this.onDeleteData}/></div>
		                      <Button  label="取消" type="button" cancle={true} onClick={this.openDelete} />
	                      </div>
	            	</div>
	            </Dialog>
	           
			</div>
		);
	}
}
export default reduxForm({
	form: 'noticeManage'
	
})(NoticeManage);