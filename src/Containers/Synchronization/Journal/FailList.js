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
	Notify,
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
		this.state= {
			searchList:{
				status:'0'
			}
		}
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
		if(!ids.length){
			Notify.show([{
				message: '请先选择同步数据',
				type: 'danger',
			}]);
			return;
		}
		State.reload(ids);

		
	}
	onPageChange=(page)=>{
		let {searchList} = this.props;
		searchList.page = page;
		searchList.pageSize = 15;
		searchList.status = '0';
		State.getJournalList(this.props.searchList);
	}
	

	render() {
		let rowFootStyle = {};
		let rowStyle = {
			display:!!State.itemsList.length?'none':'block'
		}
		return (
			<div style={{marginTop:30,minHeight:'910'}}>
				<div style={{display:!!State.itemsList.length?'block':'none'}}>
				<Button  label="重新同步" type="submit" width={100} height={30} fontSize={16} onTouchTap={this.sendData}/>
				<Table
		                  style={{margin:'30px 0'}}
		                  onSelect={this.onStationSelect}
		              >
		              <TableHeader>
		                  <TableHeaderColumn style={{width:100}}>主体</TableHeaderColumn>
		                  <TableHeaderColumn style={{width:100}}>时间</TableHeaderColumn>
		                  <TableHeaderColumn style={{width:80}}>同步方式</TableHeaderColumn>
		                  <TableHeaderColumn>内容</TableHeaderColumn>
		                  <TableHeaderColumn>同步信息</TableHeaderColumn>

		              </TableHeader>
		              <TableBody>
		              	{!!State.itemsList.length && State.itemsList.map((item,index)=>{
		              		return (
								<TableRow key={index}>
				              		 <TableRowColumn style={{width:100}}>
				              		 	{item.mainName}
				              		 </TableRowColumn >
				              		 <TableRowColumn style={{width:100}}>
				              		 	{DateFormat(item.syncTime,'yyyy/mm/dd')}
				              		 </TableRowColumn>
				              		 <TableRowColumn style={{width:80}}>
				              		 	{item.mode=='TIMING'?'定时':'手动'}
				              		 </TableRowColumn>
				              		 <TableRowColumn >
				              		 	
				              		 	<div style={{paddingTop:5,overflow:'hidden'}} className='financeDetail-hover'>
				              		 		<span className='tableOver' style={{width:'90%',display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{item.content}</span>
									 		
									 	</div>
									 	<Tooltip offsetTop={5} place='top' >
											<div style={{width:"300px",whiteSpace:"normal",lineHeight:"22px",wordBreak:'break-word'}}>{item.content}</div>
									 	</Tooltip>
				              		 </TableRowColumn>
				              		 <TableRowColumn>
				              		 	<div style={{paddingTop:5,overflow:'hidden'}} className='financeDetail-hover'>
				              		 		<span className='tableOver' style={{width:'90%',display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{item.message}</span>
									 		
									 	</div>
									 	<Tooltip offsetTop={5} place='top' >
												<div style={{width:"200px",whiteSpace:"normal",lineHeight:"22px",wordBreak:'break-word'}}>{item.message}</div>
									 		</Tooltip>
				              		 </TableRowColumn>
				              	</TableRow>
		              		)
		              	})}
		              	
		              </TableBody>
           			

		            </Table>

		            
		            {!State.loading && !!State.pageInfo.totalCount && <div className='footPage' style={rowFootStyle}>
           				<Pagination  totalCount={State.pageInfo.totalCount} page={State.pageInfo.page} pageSize={State.pageInfo.pageSize} onPageChange={this.onPageChange}/>
           			</div>}
           		</div>
           		<div style={{display:!!State.itemsList.length?'none':'block'}}>
           			<Table
					     style={{margin:'30px 0',borderBottom:'none'}}
			            displayCheckbox={false}
							  >
				        <TableHeader>
				          <TableHeaderColumn >主体</TableHeaderColumn>
		                  <TableHeaderColumn>时间</TableHeaderColumn>
		                  <TableHeaderColumn>同步方式</TableHeaderColumn>
		                  <TableHeaderColumn>同步状态</TableHeaderColumn>
		                  <TableHeaderColumn>内容</TableHeaderColumn>
		                  <TableHeaderColumn>同步信息</TableHeaderColumn>
				      	</TableHeader>

						<TableBody className='noDataBody' borderBodyStyle style={{borderBottom:'none'}}>
							<TableRow style={{backgroundColor:'#fff'}}>
								<TableRowColumn colSpan={100} >
									<div style={{textAlign:'center',paddingTop:100,paddingBottom:100}}>
										<div className="ui-nothing">
											<div className="icon"></div>
											<p className="tip">暂时还没有数据呦~</p>
										</div>
									</div>
								</TableRowColumn>
							</TableRow>
						</TableBody>
					</Table>
           		</div>
			</div>
		);

	}

}

