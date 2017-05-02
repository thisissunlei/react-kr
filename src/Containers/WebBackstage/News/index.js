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
} from 'kr-ui';
import {DateFormat} from 'kr/Utils';
import {
	observer
} from 'mobx-react';
import HightSearchForm from './HightSearchForm';
import EditNewList from './EditNewList';
import ViewNewList from './ViewNewList';
import CreateNewList from './CreateNewList';
import './index.less';


@observer
export default class News extends React.Component {
	
	constructor(props, context) {
		super(props, context);
		this.state={
			openNewCreateDialog:false,
			openHightDialog:false,
			openView:false,
			openEdit:false,
			Params:{}
		}
		
	}
	 //操作相关
  	onOperation = (type, itemDetail) => {

      this.setState({
        itemDetail
      });

      if (type == 'view') {
        this.openView();
      } else if (type == 'edit') {
        this.openEdit();
      }
    }
    openNewCreateDialog=()=>{
    	this.setState({
	        openNewCreateDialog:!this.state.openNewCreateDialog
	      });
    }
    openView=()=>{
		this.setState({
	        openView:!this.state.openView
	      });
    }
    openEdit=()=>{
		this.setState({
	        openEdit:!this.state.openEdit
	      });
    }
	

	render() {
		let {itemDetail}=this.state;
		return (
			    <div style={{minHeight:'910',backgroundColor:"#fff"}} className="g-news-list">
					<Title value="新闻列表"/>
					<Section title="新闻列表"  >
						<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
							<Button label="新建新闻"  onTouchTap={this.openNewCreateDialog} />
							{/*高级查询*/}
							<Button   type='search'  searchClick={this.openHightDialog} searchStyle={{marginLeft:'30',marginTop:'10',display:'inline-block',float:'right'}}/>
							<SearchForms onSubmit={this.onSearchSubmit} style={{marginTop:5,zIndex:10000}} />
						</form>
						<Table
		                  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='get-news-list'
		                  ajaxParams={this.state.Params}
		                  onOperation={this.onOperation}
		              >
		              <TableHeader>
		                  <TableHeaderColumn>新闻标题</TableHeaderColumn>
		                  <TableHeaderColumn>新闻简介</TableHeaderColumn>
		                  <TableHeaderColumn>发布状态</TableHeaderColumn>
		                  <TableHeaderColumn>置顶状态</TableHeaderColumn>
		                  <TableHeaderColumn>发布时间</TableHeaderColumn>
		                  <TableHeaderColumn>排序号</TableHeaderColumn>
		                  <TableHeaderColumn>创建人</TableHeaderColumn>
		                  <TableHeaderColumn>操作</TableHeaderColumn>
		              </TableHeader>
		              <TableBody>
		              	<TableRow>
		              		 <TableRowColumn name="payWayName"></TableRowColumn>
		              		 <TableRowColumn name="payWayName"></TableRowColumn>
		              		 <TableRowColumn name="payWayName"></TableRowColumn>
		              		 <TableRowColumn name="payWayName"></TableRowColumn>
		              		 <TableRowColumn 
		              		 		name=""  
			              		 	component={(value, oldValue) => {
				                          return (<KrDate value={value} format="yyyy-mm-dd"/>)
				                    }}>
		              		 </TableRowColumn>
		              		 <TableRowColumn name="payWayName"></TableRowColumn>
		              		 <TableRowColumn name="payWayName"></TableRowColumn>
		              		 <TableRowColumn>
								<Button label="查看"  type="operation"  operation="view"/>
								<Button label="编辑"  type="operation"  operation="edit"/>
		              		 </TableRowColumn>
		              	</TableRow>
		              </TableBody>
		               <TableFooter></TableFooter>
		            </Table>
					</Section>
					<Drawer
		             modal={true}
		             width={750}
		             open={this.state.openNewCreateDialog}
		             onClose={this.openNewCreateDialog}
		             openSecondary={true}
		           >
		             <CreateNewList  detail={itemDetail} onCancel={this.openNewCreateDialog}  />
		           </Drawer>
		           <Drawer
		             modal={true}
		             width={750}
		             open={this.state.openEdit}
		             onClose={this.openEdit}
		             openSecondary={true}
		           >
		             <EditNewList  detail={itemDetail} onCancel={this.openEdit}  />
		           </Drawer>
		           <Drawer
		             modal={true}
		             width={750}
		             open={this.state.openView}
		             onClose={this.openView}
		             openSecondary={true}
		           >
		             <ViewNewList  detail={itemDetail} onCancel={this.openView}  />
		           </Drawer>
				</div>
		);

	}

}
