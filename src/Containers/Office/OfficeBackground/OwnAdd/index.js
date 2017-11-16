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
	Message
} from 'kr-ui';
import mobx, {
	observable,
	action,
	toJS
} from 'mobx';
import { DateFormat, Http, smalltoBIG} from 'kr/Utils';
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
		this.name = ''; 
	}
	componentDidMount() {
		State.requestTree()

	}

	

	//编辑页打开
	openEdit=(itemData)=>{
		this.name = itemData.wfBaseName;
		var _this = this;
		Http.request('get-config-template-edit', { wfId: itemData.wfId}).then(function (response) {
			_this.getEditDetail(itemData)
			_this.editSubmitData = {
				wfId: itemData.wfId,
				formId: response.formId,
				id: itemData.id,
				printed:response.printed
			}
			_this.setState({
				detail: response.tables
			})
		}).catch(function (err) {
			Message.error(err.message);
		 });
		
	}

	getEditDetail = (item) =>{
		var _this = this;
		Http.request('get-config-detail-edit', { requestId: item.id }).then(function (response) {

			Store.dispatch(initialize('FromsConfig', response));
		    
			_this.onOpenEdit();
			
		}).catch(function (err) {
			Message.error(err.message);
		 });
	}
	openPrint=(itemData)=>{
		var id = itemData.id;
		let url = `./#/publicPage/${id}/printOther`;
		// var newWindow = window.open(url);
		window.location.href = `./#/publicPage/${id}/printOther`
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
			_this.onOpenEdit();
			Message.success('保存成功');
		}).catch(function (err) {
			Message.error(err.message);
		 });
	}

	render(){
		const {isOpenEdit,detail} = this.state;

		return(

			<div className="g-office-own-add">
				<div className="left-tree">
					<Section borderBool={false} title="合同树">
						<div className="tree-list">
							<div className="tree-one">
								<p className="tree-line" onClick={()=>{this.chooceAll()}}>
									<img className="left-style" src={arrow}></img>
									全部合同
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
					 <Section borderBool={false} title="全部合同">
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
					              <TableHeaderColumn className='header-row'>合同类型</TableHeaderColumn>
					              <TableHeaderColumn className='header-row'>合同名称</TableHeaderColumn>
			                      <TableHeaderColumn className='header-row'>合同请求标题</TableHeaderColumn>
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
						                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB',wordWrap:'break-word',whiteSpace:'normal'}} name='title'></TableRowColumn>
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
														{(itemData.printed && itemData.allowPrint) && <Button label="打印"  type='operation'  onClick={this.openPrint.bind(this,itemData)}/>}
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
					<FromsConfig title={`${this.name}-编辑`} detail={detail} onSubmit={this.editSubmit} onCancel={this.onOpenEdit} />
				</Drawer>
			</div>
		);
	}

}
