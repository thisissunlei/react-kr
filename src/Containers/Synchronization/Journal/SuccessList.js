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
		this.state= {
			searchList:{
				status:'1'
			}
		}
	}
	componentDidMount(){
		let {searchList} = this.props;
		let value = {status:'1'};
		value = Object.assign({},searchList,value);
		this.setState({
			searchList:value
		})
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.searchList != nextProps.searchList){

			let {searchList} = nextProps;
			let value = {status:'1'};
			value = Object.assign({},searchList,value);
			this.setState({
				searchList:value
			})
		}
	}
	

	render() {
		console.log('success',this.state.searchList);
		let {searchList} = this.state;
		return (
			<div style={{marginTop:30}}>
				<Table
		                  style={{marginTop:20}}
		                  ajax={true}
		                  ajaxUrlName='sync-log-list'
		                  ajaxParams={searchList}
		                  onOperation={this.onOperation}
		                  onPageChange={this.onPageChange}
		              >
		              <TableHeader>
		                  <TableHeaderColumn >主体</TableHeaderColumn>
		                  <TableHeaderColumn>时间</TableHeaderColumn>
		                  <TableHeaderColumn>同步方式</TableHeaderColumn>
		                  <TableHeaderColumn>同步状态</TableHeaderColumn>
		                  <TableHeaderColumn style={{width:300}}>内容</TableHeaderColumn>
		              </TableHeader>
		              <TableBody>
		              	<TableRow>
		              		 <TableRowColumn 
		              		 	name="mainName"
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
		              		 	name='syncTime'
		              		 	component={(value,oldValue)=>{
									 return (<div className='financeDetail-hover'>
									 	{DateFormat(oldValue.syncTime,'yyyy/mm/dd')}

									 	</div>)
								 }}
		              		 ></TableRowColumn>
		              		 <TableRowColumn name="mode"
		              		 component={(value,oldValue)=>{	
									 return (<div className='financeDetail-hover'>
									 	{value==='TIMING'?'定时':'手动'}
									 	</div>)
								 }}></TableRowColumn>
		              		 <TableRowColumn name="stickStatusName"
		              		  component={(value,oldValue)=>{
									 return (<div className='financeDetail-hover'>
									 	{'成功'}
									 	</div>)
								 }}></TableRowColumn>
		              		 <TableRowColumn name="content"
		              		 component={(value,oldValue)=>{
									var TooltipStyle=""
									if(value.length==""){
										TooltipStyle="none"
									}else{
										TooltipStyle="block";
									}
									 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:300,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
									 	<Tooltip offsetTop={5} place='top' >
											<div style={{width:"260px",whiteSpace:"normal",lineHeight:"22px",wordBreak:'break-word'}}>{value}</div>
									 	</Tooltip></div>)
								 }} > </TableRowColumn>
		              	</TableRow>
		              </TableBody>
		               <TableFooter></TableFooter>
		            </Table>
			</div>
		);

	}

}

