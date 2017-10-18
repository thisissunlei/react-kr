import React from 'react';
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
	SearchForms,
	Dialog,
	Tooltip,
	Drawer,
	CheckPermission
} from 'kr-ui';
import {DateFormat} from 'kr/Utils';
import {
	observer
} from 'mobx-react';
import HightSearchForm from './HightSearchForm';
import EditNewList from './EditNewList';
import ViewNewList from './ViewNewList';
import CreateNewList from './CreateNewList';
import State from './State';
import './index.less';


@observer
export default class News extends React.Component {
	
	constructor(props, context) {
		super(props, context);
		this.state={
			itemDetail:{},

		}
		
	}
	 //操作相关
  	onOperation = (type, itemDetail) => {

      this.setState({
        itemDetail
      });

      if (type == 'view') {
        this.openViewDialog();
      } else if (type == 'edit') {
        this.openEditDialog();
      }else if(type == 'toMain'){
				window.open(`http://krspace.cn/news/${itemDetail.id}/detail`);
			}
    }
    openNewCreateDialog=()=>{
    	State.openNewCreateDialog()
    	
    }
    openViewDialog=()=>{
    	State.openViewDialog();
		
    }
    openEditDialog=()=>{
    	State.openEditDialog();
		
    }
    openSearchDialog=()=>{
    	State.openSearchDialog();
		
    }
    //高级查询
    onSearchSubmit=(form)=>{
    	form.page=1;
		// form.pageSize=15;
		// this.setState({
	 //        Params:form
	 //    });
	    let searchParams = Object.assign({},State.searchParams,form);
	    State.searchParams = searchParams;
	    State.openSearchDialog();
    }
    //查询
    onSearch=(form)=>{
    	form.title = form.content;
    	form.page = 1;
    	let searchParams = Object.assign({},State.searchParams,form);
	    State.searchParams = searchParams;
		// this.setState({
	 //        Params:{
	 //        	title:form.content,
	 //        	page:1,
	 //        	pageSize:15
	 //        }
	 //    });
    }
    createSave=(form)=>{
    	State.saveNews(form);

    }
    editSave=(form)=>{
		State.saveEditNews(form);
    }
    onPageChange=(page)=>{
		var searchParams = Object.assign({},State.searchParams);
		searchParams.page = page;
		State.searchParams = searchParams;
	}
	

	render() {
		let {itemDetail}=this.state;

		return (
			    <div className="g-news-list"  >
					<Title value="新闻列表"/>
					<Section title="新闻列表"  >
						<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
								<Button label="新建新闻" operateCode="main_news_add" onTouchTap={this.openNewCreateDialog} />
							{/*高级查询*/}
							<Button   type='search'  searchClick={this.openSearchDialog} searchStyle={{marginLeft:'30',marginTop:'10',display:'inline-block',float:'right'}}/>
							<SearchForms 
									onSubmit={this.onSearch} 
									placeholder="请输入新闻标题"  
									style={{marginTop:5,zIndex:10000}} 
							/>
						</form>
						<Table
		                  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='get-news-list'
		                  ajaxParams={State.searchParams}
		                  onOperation={this.onOperation}
		                  onPageChange={this.onPageChange}
		              >
		              <TableHeader>
		                  <TableHeaderColumn width={160}>新闻标题</TableHeaderColumn>
		                  <TableHeaderColumn width={160}>新闻简介</TableHeaderColumn>
		                  <TableHeaderColumn>发布状态</TableHeaderColumn>
		                  <TableHeaderColumn>置顶状态</TableHeaderColumn>
		                  <TableHeaderColumn>发布时间</TableHeaderColumn>
		                  <TableHeaderColumn>排序号</TableHeaderColumn>
		                  <TableHeaderColumn>创建人</TableHeaderColumn>
		                  <TableHeaderColumn>操作</TableHeaderColumn>
		              </TableHeader>
		              <TableBody>
		              	<TableRow>
		              		 <TableRowColumn 
		              		 		name="title"
		              		 		component={(value,oldValue)=>{
										var TooltipStyle=""
										if(value.length==""){
											TooltipStyle="none"

										}else{
											TooltipStyle="block";
										}
										 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
										 	<Tooltip offsetTop={5} place='top' >{value}</Tooltip></div>)
									 }}
		              		 ></TableRowColumn>
		              		 <TableRowColumn 
		              		 		name="newsDesc"
									component={(value,oldValue)=>{
										var TooltipStyle=""
										if(value.length==""){
											TooltipStyle="none"

										}else{
											TooltipStyle="block";
										}
										 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
										 	<Tooltip offsetTop={5} place='top' >{value}</Tooltip></div>)
									 }}
		              		 ></TableRowColumn>
		              		 <TableRowColumn name="publishedStatusName"></TableRowColumn>
		              		 <TableRowColumn name="stickStatusName"></TableRowColumn>
		              		 <TableRowColumn name="publishedTime" > </TableRowColumn>
		              		 <TableRowColumn name="orderNum"></TableRowColumn>
		              		 <TableRowColumn name="createUser"></TableRowColumn>
		              		 <TableRowColumn>
								<Button label="查看"  type="operation"  operation="view"/>
								<Button label="预览"  type="operation"  operation="toMain"/>
									<Button label="编辑" operateCode="main_news_add"  type="operation"  operation="edit"/>
		              		 </TableRowColumn>
		              	</TableRow>
		              </TableBody>
		               <TableFooter></TableFooter>
		            </Table>
					</Section>
					<Drawer
		             modal={true}
		             width={750}
		             open={State.openNewCreate}
		             onClose={this.openNewCreateDialog}
		             openSecondary={true}
		           >
		             <CreateNewList  
		             		detail={itemDetail} 
		             		onCancel={this.openNewCreateDialog}  
							onSubmit={this.createSave}
		             />
		           </Drawer>
		           <Drawer
		             modal={true}
		             width={750}
		             open={State.openEdit}
		             onClose={this.openEditDialog}
		             openSecondary={true}
		           >
		             <EditNewList  
		             		detail={itemDetail} 
		             		onCancel={this.openEditDialog}  
		             		onSubmit={this.editSave}
		             />
		           </Drawer>
		           <Drawer
		             modal={true}
		             width={750}
		             open={State.openView}
		             onClose={this.openViewDialog}
		             openSecondary={true}
		           >
		             <ViewNewList  detail={itemDetail} onCancel={this.openViewDialog}  />
		           </Drawer>
		            <Dialog
		              title="高级查询"
		              modal={true}
		              open={State.openSearch}
		              onClose={this.openSearchDialog}
		              contentStyle={{width:666,height:330}}
		            >
		              <HightSearchForm   onSubmit={this.onSearchSubmit} onCancel={this.openSearchDialog} />
		            </Dialog>
				</div>
		);

	}

}
