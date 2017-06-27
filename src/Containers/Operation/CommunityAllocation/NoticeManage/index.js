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
} from 'kr-ui';
import { observer, inject } from 'mobx-react';
import './index.less';
export default class NoticeManage extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams:{
				page:1,
				pageSize:15
			}
		}

	}

	componentDidMount() {
		var _this=this;
		
		
	}

	
	render() {
		return (

			<div className="g-notice" >
			<Title value="公告管理"/>
				<Section title="公告列表" description="" style={{marginBottom:-5,minHeight:910}}>
					<Table
						  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='notice-list'
		                  ajaxParams={this.state.searchParams}
		                  onOperation={this.onOperation}
		                 
					  >
				            <TableHeader>
				              <TableHeaderColumn>群组名称</TableHeaderColumn>
				              <TableHeaderColumn>社区名称</TableHeaderColumn>
				              <TableHeaderColumn>发布时间</TableHeaderColumn>
				              <TableHeaderColumn>发布人</TableHeaderColumn>
				              <TableHeaderColumn>发布内容</TableHeaderColumn>
				              <TableHeaderColumn>操作</TableHeaderColumn>
				          	</TableHeader>

					        <TableBody >
					              <TableRow>
					                <TableRowColumn name="clusterName" ></TableRowColumn>
					                <TableRowColumn name="cmtName"></TableRowColumn>
					                <TableRowColumn name="topicDate" type='date'></TableRowColumn>
					                <TableRowColumn name="authorName" ></TableRowColumn>
					                <TableRowColumn 
					                		name="topicContent" 
					                		component={(value,oldValue)=>{
												var TooltipStyle=""
												if(value.length==""){
													TooltipStyle="none"

												}else{
													TooltipStyle="inline-block";
												}
												return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:130,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap",paddingTop: '6px'}}>{value}</span>
												 	<Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>
												)
											}} 
									></TableRowColumn>
					                <TableRowColumn>
					                	<Button label="查看"  type="operation"  operation="view"/>
									  	<Button label="删除"  type="operation"  operation="delete"/>
					                </TableRowColumn>
					               </TableRow>
					        </TableBody>
			        		<TableFooter></TableFooter>
            		</Table>
				</Section>
			</div>
		);
	}
}
