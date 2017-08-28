import React from 'react';
import {
	Title,
	KrField,
	Tooltip,
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
	Message,
	DivTitle,
} from 'kr-ui';
import {
	observer
} from 'mobx-react';
import {
	CommonItem
} from 'kr/PureComponents/Agreement';
import {Actions,Store} from 'kr/Redux';
import './index.less';
import ReactMixin from "react-mixin";
import AdvancedQuery from './AdvancedQuery';
import {reduxForm} from 'redux-form';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import State from './State';

@observer
@ReactMixin.decorate(LinkedStateMixin)

class MaChaoYue extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);
		this.state={
			value:'11111'
		}
	}
	onSubmit=(value)=>{
	}
	componentWillMount() {
	}


	render() {
		let {value} = this.state;
		const {handleSubmit}=this.props;
		let communitys = [1,2,3];
		let src = `http://krspace-upload-test.oss-cn-beijing.aliyuncs.com/app_public_upload/201706/I/172847235_696.png`;
		
		return (
			    <div style={{background: '#fff',height:1400}} className="demo-Machaoyue">

			    <div style={{width:200,border:'1px solid red'}}>

			    	{value}
			    	<Tooltip>{value}</Tooltip>
			    </div>
			    <span onClick={this.click}>点击</span>
			    <Table
		                  style={{marginTop:10}}
		                  ajax={true}
		                  ajaxUrlName='sync-list'
		                  ajaxParams={State.searchParams}
		              >
		              <TableHeader>
		                  <TableHeaderColumn width={160}>主体名称</TableHeaderColumn>
		                  <TableHeaderColumn width={160}>编码</TableHeaderColumn>
		                  <TableHeaderColumn>失败数</TableHeaderColumn>
		                  <TableHeaderColumn>最近同步时间</TableHeaderColumn>
		                  <TableHeaderColumn>最近同步系统</TableHeaderColumn>
		                  <TableHeaderColumn width={300}>备注</TableHeaderColumn>
		                  <TableHeaderColumn>操作</TableHeaderColumn>
		              </TableHeader>
		              <TableBody>
		              	<TableRow>
		              		 <TableRowColumn 
		              		 	name="name"
		              		 	component={(value,oldValue)=>{
									var TooltipStyle=""
									if(value.length==""){
										TooltipStyle="none"
									}else{
										TooltipStyle="block";
									}
									 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
									 	<Tooltip offsetTop={5} place='top' >
											<div style={{width:"260px",whiteSpace:"normal",lineHeight:"22px"}}>{value}</div>
									 	</Tooltip></div>)
								 }}
		              		 ></TableRowColumn>
		              		 <TableRowColumn 
		              		 		name="code"
									component={(value,oldValue)=>{
										 return (<div className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
										 			</div>)
									 }}
		              		 ></TableRowColumn>
		              		 <TableRowColumn name="failures" > </TableRowColumn>
		              		 <TableRowColumn name="syncTime"
		              		 	component={(value,oldValue)=>{
		              		 		if(!!!value){
		              		 			return(
											<span className='tableOver' style={{display:"block"}}>-</span>

		              		 			)
		              		 		}else{
									 return (<div className='financeDetail-hover'>
									 	{DateFormat(oldValue.syncTime,'yyyy/mm/dd')}

									 	</div>)
									}
								 }}></TableRowColumn>
		              		 <TableRowColumn name="systemName"
		              		 component={(value,oldValue)=>{
									var TooltipStyle=""
									if(!!!value){
										TooltipStyle="none";
										value='-';
										return(
											<span className='tableOver'>{value}</span>
											)
									}else{
										TooltipStyle="block";

									 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver'>{value}</span>
											 	<Tooltip offsetTop={5} place='top' >
													{value}
											 	</Tooltip>
										 	</div>)
									}
								 }}
		              		 ></TableRowColumn>
		              		 <TableRowColumn name="remark" 
		              		 	component={(value,oldValue)=>{
									var TooltipStyle=""
									if(!!!value){
										TooltipStyle="none";
										value="-";
										return(
										<span className='tableOver' style={{maxWidth:300,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
										)
									}else{
										TooltipStyle="block";
									
									 return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:300,display:"block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
									 	<Tooltip offsetTop={5} place='top' >
											<div style={{width:"260px",whiteSpace:"normal",lineHeight:"22px"}}>{value}</div>
									 	</Tooltip></div>)
									}
								 }}></TableRowColumn>
		              		 <TableRowColumn name="createUser"
								component={(value,oldValue,itemData)=>{
									return(
										<span>
											<Button label="编辑" operateCode="main_news_add" type="operation" />
										</span>
									)	
								}}></TableRowColumn>
		              	</TableRow>
		              </TableBody>
		               <TableFooter></TableFooter>
		            </Table>
				</div>
		);

	}

}
export default MaChaoYue = reduxForm({
	form: 'MaChaoYue',
	// validate,
})(MaChaoYue);
