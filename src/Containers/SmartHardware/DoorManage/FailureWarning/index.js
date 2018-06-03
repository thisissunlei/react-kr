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
	Section,
	Dialog,
	Message,
	Tooltip,
	Drawer 
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import './index.less';
import WarnSearchForm from './WarnSearchForm';
import WarnContent from './WarnContent';
import './index.less';
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
			itemDetail:{},
			warnSearchParams:{
				page:1,
				pageSize:15,
				stime :  '',
				etime: '',
				deviceId:this.props.params.deviceId || '',
				logType: ''
			}
		}
	}

	componentDidMount(){

		let {deviceId} = this.props.params;
		this.setState({
			initailDeviceId :deviceId
		})
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



	seeContent=(param,params)=>{
		this.setState({
			itemDetail : param
		})
		this.openContentFun();
	}

	openContentFun=()=>{
		State.openContent =!State.openContent
	}

	submitDate=(data)=>{
		this.setState({
			warnSearchParams : data
		})
	}


	render() {
		let {
			list,seleced,itemDetail,initailDeviceId,warnSearchParams
		} = this.state;
		return (
			    <div className="second-door-warn-table" style={{minHeight:'910',backgroundColor:"#fff"}} >
					<Title value="故障报警"/>
					<Section title={`故障报警`} description="" >
						<div>
							<WarnSearchForm initailDeviceId={initailDeviceId} submitDate={this.submitDate}/>
						</div>
						<Table
							className="door-warning-table"
							style={{marginTop:10,position:'inherit'}}
							onLoaded={this.onLoaded}
							ajax={true}
							onProcessData={(state)=>{
								return state;
								}}
							exportSwitch={false}
							ajaxFieldListName='items'
							ajaxUrlName='getWarningLog'
							ajaxParams={warnSearchParams}
							onPageChange={this.onPageChange}
							displayCheckbox={false}
							onOperation={this.onOperation}
						>
							<TableHeader>
								<TableHeaderColumn>报警类型</TableHeaderColumn>
								<TableHeaderColumn>报警时间</TableHeaderColumn>
								<TableHeaderColumn>智能硬件ID</TableHeaderColumn>
								<TableHeaderColumn>描述</TableHeaderColumn>
								
							</TableHeader>
							<TableBody style={{position:'inherit'}}>
								<TableRow>
								<TableRowColumn name="typeName"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								 ></TableRowColumn>
								<TableRowColumn name="time" type="date" format="yyyy-mm-dd HH:MM:ss"></TableRowColumn>
								<TableRowColumn name="deviceId"
								component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								

								<TableRowColumn type ='operation' name="content" style={{width:400,overflow:"hidden"}}
									component={
										(value,oldValue,itemData)=>{
											if(value==""){
												value="-"
											}
											return (
													<div onClick={this.seeContent.bind(this,itemData)} style={{width:400,color:"#499df1",cursor:"pointer",whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden",cursor:"pointer"}}>
														{itemData.content}
													</div>
												)
										}
									}
								> 
								</TableRowColumn>
								
							 </TableRow>
						</TableBody>
						<TableFooter></TableFooter>
						</Table>
					</Section>
					<Drawer 
			          title="报警描述"
			          open={State.openContent}
			          onClose={this.openContentFun}
			          width={"90%"}
			        >
			          	<WarnContent detail={itemDetail} onCancle={this.openContentFun}/>
			        </Drawer>
				</div>
		);

	}

}
