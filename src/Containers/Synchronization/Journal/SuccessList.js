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
	Dialog,
	Tooltip,
	Drawer,
	SearchForms,
	Section,
	KrField,
	Row,
	Col,
	Grid,
	ListGroup,
	ListGroupItem,
	CheckPermission
} from 'kr-ui';
import State from './State';
import {DateFormat} from 'kr/Utils';
import {reduxForm,initialize} from 'redux-form';
import {
	observer
} from 'mobx-react';
import './index.less';

@observer
export default class FailList extends React.Component {

	constructor(props, context) {
		super(props, context);
	}
	

	render() {

		return (
			<div style={{marginTop:30}}>
				<Table
		                  style={{marginTop:20}}
		                  ajax={true}
		                  ajaxUrlName='get-news-list'
		                  ajaxParams={State.searchParams}
		                  onOperation={this.onOperation}
		                  onPageChange={this.onPageChange}
		              >
		              <TableHeader>
		                  <TableHeaderColumn >主体</TableHeaderColumn>
		                  <TableHeaderColumn>时间</TableHeaderColumn>
		                  <TableHeaderColumn>同步方式</TableHeaderColumn>
		                  <TableHeaderColumn>同步状态</TableHeaderColumn>
		                  <TableHeaderColumn>内容</TableHeaderColumn>
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
		              	</TableRow>
		              </TableBody>
		               <TableFooter></TableFooter>
		            </Table>
			</div>
		);

	}

}

