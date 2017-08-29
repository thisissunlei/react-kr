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
	getRole=(roleId)=>{
		let roleName ;
		let role = {CUSTOMER:'客户',
					MEMBER:'会员',
					FINANCE:'合同',
					RECEIVABLES:'应收账款',
					DEPOSIT_RECEIVED:'预收账款',
					DEPARTMENT:'部门',
					SUBCOMPANY:'分部',
					RESOURCE:'人员',
					HRM_ROLE:'人员角色',
					HRM_ROLE_RESOURCE:'人员角色关系'};
		if(role.hasOwnProperty(roleId)){
			roleName = role[roleId]
		}
		console.log(roleId,role.hasOwnProperty(roleId),role[roleId])
		return roleName;
	
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
		                  <TableHeaderColumn style={{width:80}}>同步方式</TableHeaderColumn>
		                  <TableHeaderColumn style={{width:300}}>内容</TableHeaderColumn>
		                  <TableHeaderColumn  style={{width:200}}>同步信息</TableHeaderColumn>
		              </TableHeader>
		              <TableBody>
		              	<TableRow>
		              		 <TableRowColumn 
		              		 	name="mainId"
		              		 	component={(value,oldValue)=>{
									var TooltipStyle=""
									if(value.length==""){
										TooltipStyle="none"
									}else{
										TooltipStyle="block";
									}
									console.log(this.getRole(oldValue));
									 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{this.getRole(oldValue)}</span>
									 	<Tooltip offsetTop={5} place='top' >{this.getRole(oldValue)}</Tooltip></div>)
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
								 }} style={{width:80}}></TableRowColumn>
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
											<div style={{width:"300px",whiteSpace:"normal",lineHeight:"22px",wordBreak:'break-word'}}>{value}</div>
									 	</Tooltip></div>)
								 }} > </TableRowColumn>
							<TableRowColumn name="message"
		              		 component={(value,oldValue)=>{
									var TooltipStyle=""
									if(value.length==""){
										TooltipStyle="none"
									}else{
										TooltipStyle="block";
									}
									 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:200,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
									 	<Tooltip offsetTop={5} place='top' >
											<div style={{width:"200px",whiteSpace:"normal",lineHeight:"22px",wordBreak:'break-word'}}>{value}</div>
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

