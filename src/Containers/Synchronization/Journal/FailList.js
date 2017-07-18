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
	Pagination,
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
import mobx from 'mobx';
import './index.less';

@observer
export default class FailList extends React.Component {

	constructor(props, context) {
		super(props, context);
	}
	componentDidMount(){
		let {searchList} = this.props;
		let value = {status:0}
		value = Object.assign({},searchList,value);
		State.getJournalList(value);
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.searchList != nextProps.searchList){
			let {searchList} = nextProps;
			let value = {status:0}
			value = Object.assign({},searchList,value);
			State.getJournalList(value)
		}
	}
	onStationSelect=(seleced)=>{
		console.log('onStationSelect',seleced);
		State.selecedList = seleced;
	}
	sendData=()=>{
		let selecedList=[];
		let ids = []
		selecedList = State.itemsList.filter(function(item, index) {
			if (State.selecedList.indexOf(index) != -1) {
				return true;
			}else{
				return false
			}
			
		});
		
		ids = selecedList.map((item)=>{
			return item.id
		})
		State.reload(ids);

		
	}
	onPageChange=(page)=>{
		let {searchList} = this.props;
		searchList.page = page;
		searchList.pageSize = 15;
		State.getJournalList(this.props.searchList);
	}
	

	render() {
		let rowFootStyle = {};
		return (
			<div style={{marginTop:30,minHeight:'910'}}>
				<Button  label="重新同步" type="submit" width={100} height={30} fontSize={16} onTouchTap={this.sendData}/>
				<Table
		                  style={{margin:'30px 0'}}
		                  onSelect={this.onStationSelect}
		              >
		              <TableHeader>
		                  <TableHeaderColumn >主体</TableHeaderColumn>
		                  <TableHeaderColumn>时间</TableHeaderColumn>
		                  <TableHeaderColumn>同步方式</TableHeaderColumn>
		                  <TableHeaderColumn>同步状态</TableHeaderColumn>
		                  <TableHeaderColumn>内容</TableHeaderColumn>
		              </TableHeader>
		              <TableBody>
		              	{!!State.itemsList.length && State.itemsList.map((item,index)=>{
		              		return (
								<TableRow key={index}>
				              		 <TableRowColumn style={{width:220,overflow:'hidden'}}>
				              		 	{item.title}
				              		 </TableRowColumn>
				              		 <TableRowColumn  style={{width:220,overflow:'hidden'}}>
				              		 	{item.newsDesc}
				              		 </TableRowColumn>
				              		 <TableRowColumn >
				              		 	{item.publishedStatusName}
				              		 </TableRowColumn>
				              		 <TableRowColumn>
				              		 	{item.stickStatusName}
				              		 </TableRowColumn>
				              		 <TableRowColumn>
				              		 	{item.publishedTime} 
				              		 </TableRowColumn>
				              	</TableRow>
		              		)
		              	})}
		              	
		              </TableBody>
           			

		            </Table>
		            {!State.loading && <div className='footPage' style={rowFootStyle}>
           				<Pagination  totalCount={State.pageInfo.totalCount} page={State.pageInfo.page} pageSize={State.pageInfo.pageSize} onPageChange={this.onPageChange}/>
           			</div>}
			</div>
		);

	}

}

