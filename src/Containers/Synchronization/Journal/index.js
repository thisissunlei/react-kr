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
	CheckPermission
} from 'kr-ui';
import State from './State';
import {DateFormat} from 'kr/Utils';
import {reduxForm,initialize} from 'redux-form';
// import NewCreateSystem from './NewCreateSystem';
// import EditSystem from './EditSystem';
// import Synchro from './Synchro';
import {
	observer
} from 'mobx-react';
import './index.less';

@observer
export default class Journal extends React.Component {

	constructor(props, context) {
		super(props, context);
	}

	openNewCreat=()=>{
		State.createSystem = true;
	}
	NewCreateCancle=()=>{
		State.createSystem = false;
	}
	openEditSystem=()=>{
		State.openEditSystem = true;
	}
	closeEditSystem=()=>{
		State.openEditSystem = false;
	}
	editSystemSubmit=()=>{
		console.log('submit')
	}
	openSynchro=()=>{
		State.openSynchro = true;
	}
	closeSynchro=()=>{
		State.openSynchro = false;
	}
	onSubmit=()=>{
		console.log('0000')
	}
	

	render() {
		let options = [{label:'a',value:'1'},{label:'a',value:'2'},{label:'a',value:'3'},{label:'a',value:'4'},]
		let {handleSubmit} = this.props;
		return (
			    <div>
					<Title value="日志列表"/>
					<Section title="日志列表"  >
						<Table
		                  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='get-news-list'
		                  ajaxParams={State.searchParams}
		                  onOperation={this.onOperation}
		                  onPageChange={this.onPageChange}
		              >
		              <TableHeader>
		                  <TableHeaderColumn width={160}>主体名称</TableHeaderColumn>
		                  <TableHeaderColumn width={160}>编码</TableHeaderColumn>
		                  <TableHeaderColumn>同步系统</TableHeaderColumn>
		                  <TableHeaderColumn>接口地址</TableHeaderColumn>
		                  <TableHeaderColumn>失败数</TableHeaderColumn>
		                  <TableHeaderColumn>最近同步时间</TableHeaderColumn>
		                  <TableHeaderColumn>备注</TableHeaderColumn>
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
									<Button label="编辑" operateCode="main_news_add" type="operation" onTouchTap={this.openEditSystem} />
									<Button label="同步" operateCode="main_news_add" type="operation" onTouchTap={this.openSynchro} />
									<Button label="日志" operateCode="main_news_add" type="operation" onTouchTap={this.openEditSystem} />
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
Journal = reduxForm({
    form: 'Journal'
})(Journal);
