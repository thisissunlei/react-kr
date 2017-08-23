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

import './index.less';


export default class AdvertManage extends React.Component{

	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams:{
				page:1,
				pageSize:15
			},
			openCreat:false,
			openView:false,
			openDelete:false,
			openEdit:false,
			openPublish:false,
			
			
		}
	}



	render() {

		return(
			<div className="g-activity">
				<Title value="广告管理"/>
				<Section title="广告列表" description="" style={{marginBottom:-5,minHeight:910}}>
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
				              <TableHeaderColumn>标题</TableHeaderColumn>
				              <TableHeaderColumn>链接地址</TableHeaderColumn>
				              <TableHeaderColumn>开始时间</TableHeaderColumn>
				              <TableHeaderColumn>结束时间</TableHeaderColumn>
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
					                <TableRowColumn name="creater" ></TableRowColumn>
					                <TableRowColumn 
					                	name="published"
										component={(value,oldValue,itemDetail) => {
											if(value==1){
												return(
													<div style={{display:'inline'}}>
													<Button label="查看" type="operation" onClick={this.openView.bind(this,itemDetail)} />
												  	<Button label="删除" type="operation" onClick={this.openDelete.bind(this,itemDetail)} />
												  	<Button label="编辑" type="operation" onClick={this.openEdit.bind(this,itemDetail)} />
													</div>
													)
					                         
											}
											if(value==0){
												return(
													<div style={{display:'inline'}}> 
													<Button label="查看" type="operation" onClick={this.openView.bind(this,itemDetail)} />
												  	<Button label="删除" type="operation" onClick={this.openDelete.bind(this,itemDetail)} />
												  	<Button label="编辑" type="operation" onClick={this.openEdit.bind(this,itemDetail)} />
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
            		
				</Section>
			</div>
			)

	}


}
