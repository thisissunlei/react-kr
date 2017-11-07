import React from 'react';
import {
	Section,
	TableFooter,
	TableHeader,
	Table,
	Tooltip,
	TableBody,
	TableRow,
	TableHeaderColumn,
	TableRowColumn,
	Button,
	Drawer,
} from 'kr-ui';
import mobx, {
	observable,
	action,
	toJS
} from 'mobx';
import { DateFormat, Http} from 'kr/Utils';
import {reduxForm,initialize,reset,change} from 'redux-form';
import {Store} from 'kr/Redux';
import arrow from './images/arrows.png';
import './index.less';
import './detail.less';
import State from './State'
import {
	FromsConfig
} from 'kr/PureComponents';
import {
	configData
} from './data';

import {
	observer
} from 'mobx-react';

@observer
export default class Initialize  extends React.Component{

	constructor(props,context){
		super(props, context);
		
		this.state = {
			isOpenEdit:false,
			detail:[]
		} 
		this.editSubmitData = {};
	}
	componentDidMount() {
		State.requestTree()

	}

	//编辑页打开
	openEdit=(itemData)=>{
		var _this = this;
		Http.request('get-config-template-edit', { wfId: itemData.wfId}).then(function (response) {
			_this.getEditDetail(itemData)
			_this.editSubmitData = {
				wfId: itemData.wfId,
				formId: response.formId,
				id: itemData.id,
			}
			_this.setState({
				detail: response.tables
			})
		}).catch(function (err) { });
		
	}

	getEditDetail = (item) =>{
		var _this = this;
		Http.request('get-config-detail-edit', { requestId: item.id }).then(function (response) {
		
			Store.dispatch(initialize('FromsConfig', response));
		
			
			_this.onOpenEdit();
			
		}).catch(function (err) { });
	}
	openPrint=(itemData)=>{
		var id = itemData.id;
		// http://adminlocal.krspace.cn/new/#/publicPage/81/printOther
		window.location.href = `./#/publicPage/${id}/printOther`;
	}
	chooceType=(type)=>{
		// let type = '';
		let searchParams = {
			page:1,
			pageSize:15,
			typeId:type,
			wfId:'',
			time:+new Date()

		}
		State.searchParams = searchParams;
	}
	chooceAll=()=>{
		let searchParams = {
			page:1,
			pageSize:15,
			typeId:'',
			wfId:'',
			time:+new Date()

		}
		State.searchParams = searchParams;

	}
	chooceWf=(id)=>{
		let searchParams = {
			page:1,
			pageSize:15,
			typeId:'',
			wfId:id,
			time:+new Date()

		}
		State.searchParams = searchParams;
	}
	//编辑页面的开关
	onOpenEdit = () =>{
		let {isOpenEdit} = this.state;
		this.setState({
			isOpenEdit : !isOpenEdit
		})
	}
	//编辑提交
	editSubmit = (values) =>{
		const _this = this;
		var params = Object.assign({}, this.editSubmitData);

		params.dataJson = JSON.stringify(values);
		Http.request('post-config-detail-edit', {}, params).then(function (response) {
			_this.onOpenEdit()
		}).catch(function (err) {
			
		 });
	}

	render(){
		const {isOpenEdit,detail} = this.state;

		return(

			<div className="g-office-own-add">
				<div className="left-tree">
					<Section borderBool={false} title="流程树">
						<div className="tree-list">
							<div className="tree-one">
								<p className="tree-line" onClick={()=>{this.chooceAll()}}>
									<img className="left-style" src={arrow}></img>
									全部流程
								</p>
								{!!State.request.length && State.request.map((item,index)=>{
									return (
										<div className="tree-two" key={index}>
											<p className="tree-line"  onClick={()=>{this.chooceType(item.orgId)}}>
												<img className="left-style" src={arrow}></img>
												{item.orgName}
											</p>
											
												{!!item.msgChildren.length && item.msgChildren.map((value,i)=>{
													if(value.orgName.length>6){
														return (
															<div className="tree-three">
																<div className="tree-line" key={i} style={{padding:'10px 0',color:'#333'}} onClick={()=>{this.chooceWf(value.orgId)}}>
																	<span className="left-style">-</span>
																	{value.orgName.substring(0,5)+'...'}
																	<Tooltip offsetTop={1} place='top'>{value.orgName}</Tooltip>
																	
																	{value.count<100?(
																	value.count?<span className="num">{value.count}</span>:''
																	):<span className="num">99+</span>}
																
																</div>
															</div>
														)
													}else{
													return (
														<div className="tree-three">
														<p className="tree-line" key={i}  onClick={()=>{this.chooceWf(value.orgId)}}>
															<span className="left-style">-</span>
															{value.orgName}
															{value.count<100?(
															value.count?<span className="num">{value.count}</span>:''
															):<span className="num">99+</span>}
														
														</p>
														</div>
													)}
												})}

											
										</div>

									)
								})}
								
							</div>
						</div>

					</Section>
				</div>
				<div className="right-content">
					 <Section borderBool={false} title="全部流程">
			            <div  className='detail-table'>
							<Table
			                    ajax={true}
			                    onOperation={this.onOperation}
			                    displayCheckbox={false}
			                    exportSwitch={false}
			                    ajaxParams={State.searchParams}
			                    ajaxFieldListName="items"
								ajaxUrlName='my-request-list'
								  >
					            <TableHeader className='detail-header'>
					              <TableHeaderColumn className='header-row'>流程类型</TableHeaderColumn>
					              <TableHeaderColumn className='header-row'>流程名称</TableHeaderColumn>
			                      <TableHeaderColumn className='header-row'>流程请求标题</TableHeaderColumn>
					              <TableHeaderColumn className='header-row'>创建人</TableHeaderColumn>
								  <TableHeaderColumn className='header-row'>创建时间</TableHeaderColumn>
								  <TableHeaderColumn className='header-row'>操作</TableHeaderColumn>
					          	</TableHeader>

						        <TableBody >
						              <TableRow className='detail-row'>
						                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='typeName' component={(value,oldValue)=>{
					 						return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span></div>)
					 					}} ></TableRowColumn>
			                            <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='wfBaseName' component={(value,oldValue)=>{
					 							var maxWidth=6;
					 							if(value.length>maxWidth){
					 							 value = value.substring(0,6)+"...";
					 							}
					 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
					 					}}></TableRowColumn>
						                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='title' component={(value,oldValue)=>{
					 							var maxWidth=6;
					 							if(value.length>maxWidth){
					 							 value = value.substring(0,6)+"...";
					 							}
					 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
					 					}}></TableRowColumn>
					 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='creatorName' component={(value,oldValue)=>{
					 							var maxWidth=6;
					 							if(value.length>maxWidth){
					 							 value = value.substring(0,6)+"...";
					 							}
					 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
					 					}}></TableRowColumn>
					 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='cTime' component={(value,oldValue,itemData)=>{
					 								return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{DateFormat(itemData.cTime,'yyyy-mm-dd HH:MM:ss')}</span></div>)
					 					}}></TableRowColumn>
					 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='uTime' component={(value,oldValue,itemData)=>{
					 							return (
					 								<div>

														<Button label="编辑"  type='operation'  onClick={this.openEdit.bind(this,itemData)}/>
														{itemData.printed && <Button label="打印"  type='operation'  onClick={this.openPrint.bind(this,itemData)}/>}
													</div>
					 							)
					 					}}>
					 					</TableRowColumn>
						               </TableRow>
						        </TableBody>
						        <TableFooter></TableFooter>
			            </Table>
						</div>
			        </Section>
				</div>
				<Drawer
                    open={isOpenEdit}
                    width={750}
                    openSecondary={true}
                    containerStyle={{top:60,paddingBottom:228,zIndex:20}}
                    onClose={this.onOpenEdit}
				>
					<FromsConfig title = "新建" detail={detail} onSubmit={this.editSubmit} onCancel={this.onOpenEdit} />
				</Drawer>
			</div>
		);
	}

}
