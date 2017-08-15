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
	Section,
	Dialog,
	Message,
	Notify,
	CheckPermission,
	Tooltip
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import './index.less';
import WarnSearchForm from './WarnSearchForm';

import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class List extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			realPage : 1,
		}
	}

	componentDidMount(){
		State.getListDic();
	}
	
	onLoaded=(response)=>{
		let list = response;
		this.setState({
			list
		})
	}
	
	
	onPageChange=(page)=>{
		this.setState({
			realPage : page 
		})
	}
	render() {
		let {
			list,seleced
		} = this.state;
		
		return (
			    <div className="member-list-div" style={{minHeight:'910',backgroundColor:"#fff"}} >
					<Title value="故障报警"/>
					<Section title={`故障报警`} description="" >
						<div>
							<WarnSearchForm/>
						</div>
						<Table
							className="member-list-table"
							style={{marginTop:10,position:'inherit'}}
							onLoaded={this.onLoaded}
							ajax={true}
							onProcessData={(state)=>{
								return state;
								}}
							exportSwitch={false}
							ajaxFieldListName='items'
							ajaxUrlName='getWarningLog'
							ajaxParams={State.warnSearchParams}
							onPageChange={this.onPageChange}
							displayCheckbox={false}
						>
							<TableHeader>
								<TableHeaderColumn>报警时间</TableHeaderColumn>
								<TableHeaderColumn>硬件编号</TableHeaderColumn>
								<TableHeaderColumn>描述</TableHeaderColumn>
								<TableHeaderColumn>报警类型</TableHeaderColumn>
								
							</TableHeader>
							<TableBody style={{position:'inherit'}}>
								<TableRow>
								<TableRowColumn name="time" type="date" format="yyyy-mm-dd HH:MM:ss"></TableRowColumn>
								<TableRowColumn name="deviceId"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn style={{width:200,overflow:"visible"}} name="content" component={(value,oldValue)=>{
		                            var TooltipStyle=""
		                            if(value.length==""){
		                              TooltipStyle="none"

		                            }else{
		                              TooltipStyle="block";
		                            }
		                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
		              			}} ></TableRowColumn>
								<TableRowColumn name="typeName"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								 ></TableRowColumn>
								
								
								
							 </TableRow>
						</TableBody>
						<TableFooter></TableFooter>
						</Table>
					</Section>
				</div>
		);

	}

}
