import React from 'react';
import {
	Http,
	ReactHtmlParser
} from 'kr/Utils';
import {
	reduxForm,
	change
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	ButtonGroup,
	Button,
	Message,
	KrDate,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Tooltip,
	Title,
	Section,
	Dialog,
	Drawer,
} from 'kr-ui';
import './index.less';
import Handle from './Handle';
import ViewOpinion from './ViewOpinion';

export default class AppOpinion extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			itemDetail:'',
			searchParams:{
				page:1,
				pageSize:15,
			},
			openHandle:false,
			openView:false,
		}
		
	}

	//操作相关
	onOperation = (type, itemDetail) => {
		this.setState({
			itemDetail
		});
		if (type == 'handle') {
			this.openHandle();
		}else if (type == 'view') {
			this.openView()
		}
	}
	openHandle=()=>{
		this.setState({
			openHandle:!this.state.openHandle
		})
	}
	openView=()=>{
		this.setState({
			openView:!this.state.openView
		})
	}

	handleSubmit=()=>{
		this.setState({
			searchParams:{
				time:new Date(),
			}
		});
	}


	render() {
		let {itemDetail}=this.state;
		return (
			<div className="g-create-opinion">
				<Title value="App意见反馈"/>
				<Section title="意见反馈列表" description="" style={{marginBottom:-5,minHeight:910}}>
					<Button
								label="新建"
								type='button'
								onTouchTap={this.openView}
							/>
					<Table
							  style={{marginTop:10}}
			                  ajax={true}
			                  ajaxUrlName='opinion-page'
			                  ajaxParams={this.state.searchParams}
			                  onOperation={this.onOperation}
						  >
					            <TableHeader>
					              <TableHeaderColumn>姓名</TableHeaderColumn>
					              <TableHeaderColumn>电话</TableHeaderColumn>
					              <TableHeaderColumn>社区</TableHeaderColumn>
					              <TableHeaderColumn>创建时间</TableHeaderColumn>
					              <TableHeaderColumn>反馈内容</TableHeaderColumn>
					              <TableHeaderColumn>状态</TableHeaderColumn>
					              <TableHeaderColumn>操作</TableHeaderColumn>
					          	</TableHeader>

						        <TableBody >
						              <TableRow>
						              <TableRowColumn name="mbrName"></TableRowColumn>
						              <TableRowColumn name="phone" ></TableRowColumn>
						              <TableRowColumn name="cmtName" ></TableRowColumn>
						              <TableRowColumn 
						                	name="ctime" 
						                	component={(value) => {
						                          return (<KrDate value={value} format="yyyy-mm-dd hh:MM:ss"/>)
						                    }}
						                ></TableRowColumn>
						                <TableRowColumn name="content" 
											component={(value,oldValue)=>{
					                            var TooltipStyle=""
					                            if(value.length==""){
					                              TooltipStyle="none";

					                            }else{
					                              TooltipStyle="block";
					                            }
					                             return (<div style={{display:TooltipStyle,paddingTop:5}} ><span style={{maxWidth:160,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
					                            <Tooltip offsetTop={8} place='top'>{value}</Tooltip></div>)
					                      }}></TableRowColumn>
						                <TableRowColumn 
						                	name="handled" 
						                	component={(value) => {
						                		let status=value==1?'已处理':'未处理';
						                        return status;
						                    }}
						                ></TableRowColumn>
						                <TableRowColumn>
						                	<Button label="查看" type="operation" operation="view" />
						                	<Button label="处理" type="operation" operation="handle" />
						                </TableRowColumn>
						               </TableRow>
						        </TableBody>
				        		<TableFooter></TableFooter>
	            			</Table>
	            	</Section>
	            	<Dialog
		              title="处理"
		              modal={true}
		              contentStyle ={{ width: '662',overflow:'visible'}}
		              open={this.state.openHandle}
		              onClose={this.openHandle}
		            >
		              <Handle 
						  onCancel={this.openHandle}
						  onSubmit={this.handleSubmit}
		              />
		            </Dialog>
		            <Drawer
		             modal={true}
		             width={750}
		             open={this.state.openView}
		             onClose={this.openView}
		             openSecondary={true}
		             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
		           >
	             	<ViewOpinion
	             			onCancel={this.openView} 
	             			detail={itemDetail}
	             	 />
	           </Drawer>
			</div>
		);
	}
}


 
