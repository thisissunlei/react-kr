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
} from 'kr-ui';
import arrow from './images/arrows.png';
import './index.less';
import './detail.less';
import State from './State.js'
export default class Initialize  extends React.Component{

	constructor(props,context){
		super(props, context);
	}
	openEdit=(itemData)=>{
		console.log('openEdit')
	}
	openPrint=(itemData)=>{
		console.log('openPrint')
	}


	render(){


		return(

			<div className="g-office-own-add">
				<div className="left-tree">
					<Section borderBool={false} title="流程树">
						<div className="tree-list">
							<div className="tree-one">
								<p className="tree-line">
									<img className="left-style" src={arrow}></img>
									全部流程
								</p>
								{State.liucheng.map((item,index)=>{
									return (
										<div className="tree-two" key={index}>
											<p className="tree-line">
												<img className="left-style" src={arrow}></img>
												{item.fullname}
											</p>
											
												{item.list.length && item.list.map((value,i)=>{
													return (
														<div className="tree-three">
														<p className="tree-line" key={i}><span className="left-style">-</span>{value.name}
														{parseInt(value.value)<100?(
															parseInt(value.value)?<span className="num">{value.value}</span>:''
															):<span className="num">99+</span>}
														
														</p>
														</div>
													)
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
								ajaxUrlName='activityList'
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
						                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='dictName' component={(value,oldValue)=>{
					 						return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span></div>)
					 					}} ></TableRowColumn>
			                            <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='dictCode' component={(value,oldValue)=>{
					 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span></div>)
					 					}}></TableRowColumn>
						                <TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='dataTypeStr' component={(value,oldValue)=>{
					 							var maxWidth=6;
					 							if(value.length>maxWidth){
					 							 value = value.substring(0,6)+"...";
					 							}
					 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
					 					}}></TableRowColumn>
					 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='dictItems' component={(value,oldValue)=>{
					 							var maxWidth=6;
					 							if(value.length>maxWidth){
					 							 value = value.substring(0,6)+"...";
					 							}
					 							return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
					 					}}></TableRowColumn>
					 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='descr' component={(value,oldValue)=>{
					 							var maxWidth=6;
					 							if(!value.length){
					 								return (<div>--</div>)
					 							}
					 							if(value.length>maxWidth){
					 							 value = value.substring(0,6)+"...";
					 							}
					 								return (<div style={{paddingTop:'5px'}} className='tooltipParent'><span className='tableOver'>{value}</span><Tooltip offsetTop={8} place='top'>{oldValue}</Tooltip></div>)
					 					}}></TableRowColumn>
					 					<TableRowColumn style={{borderRight:'solid 1px #E1E6EB'}} name='uTime' component={(value,oldValue,itemData)=>{
					 							return (
					 								<div>
							                    <Button label="编辑"  type='operation'  onClick={this.openEdit.bind(this,itemData)}/>
							                    <Button label="打印"  type='operation'  onClick={this.openPrint.bind(this,itemData)}/>
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
			</div>
		);
	}

}
