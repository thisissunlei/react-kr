import React from 'react';
import {Http} from 'kr/Utils';
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
import CreateNotice from './CreateNotice';
import ViewNotice from './ViewNotice';
import EditNotice from './EditNotice';
import './index.less';
export default class NoticeManage extends React.Component {


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
		}

	}

	componentDidMount() {
		
		
		
	}
	//操作相关
  	onOperation = (type, itemDetail) => {
      this.setState({
        itemDetail
      });
      switch (type){
        case  'view':{
         this.openView();
          break;
        }
        case  'edit':{
         this.openEdit(itemDetail);
          break;
        }
        case  'delete':{
         this.openDelete();
          break;
        }
        case  'publish':{
         this.openPublish();
          break;
        }
        
      }
    }
    //删除
	onDeleteData=()=>{
		var _this=this;
		const {itemDetail}=this.state;
		Http.request('delete-notice',{},{id:itemDetail.id}).then(function (response) {
			_this.openDelete();
			Message.success('删除成功！');
			_this.setState({
				searchParams:{
					date:new Date()
				}
			})

		}).catch(function (err) { 
			Message.error(err.message)
		});

	}
	openPublishDel=()=>{
		var _this=this;
		const {itemDetail}=this.state;
		Http.request('publish-notice',{},{id:itemDetail.id}).then(function (response) {
			_this.openPublish();
			Message.success('发布成功！');
			_this.setState({
				searchParams:{
					date:new Date()
				}
			})

		}).catch(function (err) { 
			Message.error(err.message)
		});
	}
	openNewCreat=()=>{
		this.setState({
			openNewCreat:!this.state.openNewCreat
		})

	}
	openView=()=>{
		this.setState({
			openView:!this.state.openView
		})
	}
	openEdit=()=>{
		this.setState({
			openEdit:!this.state.openEdit
		})
	}
	openDelete=()=>{
		this.setState({
			openDelete:!this.state.openDelete
		})
	}
	openPublish=()=>{
		this.setState({
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
					pageSize:15
				}
		})
		this.openEdit();
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
					</div>
					<Table
						  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='get-notice-page'
		                  ajaxParams={this.state.searchParams}
		                  onOperation={this.onOperation}
					  >
				            <TableHeader>
				              <TableHeaderColumn>公告标题</TableHeaderColumn>
				              <TableHeaderColumn>公告类型</TableHeaderColumn>
				              <TableHeaderColumn>社区名称</TableHeaderColumn>
				              <TableHeaderColumn>发布时间</TableHeaderColumn>
				              <TableHeaderColumn>发布人</TableHeaderColumn>
				              <TableHeaderColumn>发布状态</TableHeaderColumn>
				              <TableHeaderColumn>操作</TableHeaderColumn>
				          	</TableHeader>

					        <TableBody >
					              <TableRow>
					                <TableRowColumn name="title" ></TableRowColumn>
					                <TableRowColumn name="typeName"></TableRowColumn>
					                <TableRowColumn name="cmtName" ></TableRowColumn>
					                <TableRowColumn 
					                	name="publishTime" 
					                	component={(value) => {
					                          return (<KrDate value={value} format="yyyy-mm-dd hh:MM:ss"/>)
					                    }}
					                ></TableRowColumn>
					                <TableRowColumn name="creater" ></TableRowColumn>
					                <TableRowColumn 
					                	name="published" 
										options={[{label:'已发布',value:'1'},{label:'未发布',value:'0'}]}
					                ></TableRowColumn>
					                <TableRowColumn>
					                	<Button label="查看"  type="operation"  operation="view"/>
									  	<Button label="删除"  type="operation"  operation="delete"/>
									  	<Button label="编辑"  type="operation"  operation="edit"/>
									  	<Button label="发布"  type="operation"  operation="publish"/>
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
	           <Drawer
	             modal={true}
	             width={750}
	             open={this.state.openView}
	             onClose={this.openView}
	             openSecondary={true}
	             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
	           >
	             	<ViewNotice 
	             			onCancel={this.openView} 
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
	              	<p className='u-delete-title' style={{textAlign:'center',color:'#333'}}>确认要删除公告吗？</p>
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
	              	<p className='u-delete-title' style={{textAlign:'center',color:'#333'}}>确认要发布公告吗？</p>
					<div style={{textAlign:'center',marginBottom:10}}>
	                      <div  className='ui-btn-center'>
		                      <Button  label="确定" onClick={this.openPublishDel}/></div>
		                      <Button  label="取消" type="button" cancle={true} onClick={this.openPublish} />
	                      </div>
	            	</div>
	            </Dialog>
			</div>
		);
	}
}
