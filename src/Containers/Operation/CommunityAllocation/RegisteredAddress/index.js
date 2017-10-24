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
export default class RegisteredAddress extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
            searchParams:{

            },
            isOpenNew:false,
            isOpenEdit:false,
            isOpenDel:false
		}

	}

	render() {
		return (
			<div className="g-notice" >
			<Title value="注册地址列表"/>
				<Section title="注册地址列表" description="" style={{marginBottom:-5,minHeight:910}}>
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
		                  ajaxUrlName='get-notice-page'
		                  ajaxParams={this.state.searchParams}
		                  onOperation={this.onOperation}
		                  onPageChange = {this.pageChange}
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
					                <TableRowColumn name="title"></TableRowColumn>
					                <TableRowColumn name="typeName"></TableRowColumn>
					                <TableRowColumn name="cmtName" ></TableRowColumn>
					                <TableRowColumn name="publishTime" ></TableRowColumn>
					                <TableRowColumn name="creater" ></TableRowColumn>
					                <TableRowColumn 
					                	name="published" 
										options={[{label:'已发布',value:'1'},{label:'未发布',value:'0'}]}
					                ></TableRowColumn>
					               </TableRow>
					        </TableBody>
			        		<TableFooter></TableFooter>
            		</Table>
            		
				</Section>
			
	            <Dialog
	              title="发布"
	              modal={true}
	              contentStyle ={{ width: '444',overflow:'visible'}}
	              open={false}
	              onClose={this.isOpenNew}
	            >
	            <div className='u-list-delete'>
	              	<p className='u-delete-title' style={{textAlign:'center',color:'#333'}}>确认要发布公告吗？</p>
					<div style={{textAlign:'center',marginBottom:10}}>
	                      <div  className='ui-btn-center'>
		                      <Button  label="确定" /></div>
		                      <Button  label="取消" type="button" cancle={true} />
	                      </div>
	            	</div>
	            </Dialog>
			</div>
		);
	}
}
