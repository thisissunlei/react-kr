import React, { PropTypes } from 'react'; 

import {
	Http
} from "kr/Utils";

import {
	reduxForm,
	formValueSelector,
	change
} from 'redux-form';
import {
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Tooltip,
	Section,
	Grid,
	Row,
	Col,
	ListGroupItem,
	ListGroup,
	Dialog,
	Drawer,
	SearchForms,
	KrDate,
	Message
} from 'kr-ui';
import './index.less';
import ViewLogs from './ViewLogs';
export default class PostVoucher extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams: {
				page: 1,
				pageSize: 15,
				timer:0,
			},
			
			itemDetail: '',
			openHandle: false,
			newPage:1,
		}
	}

	//操作相关
	onOperation = (type, itemDetail) => {
		this.setState({
			itemDetail
		});

		if (type == 'handle') {
			this.openHandle();
		}else if (type == 'operate') {
			this.setState({
				searchParams: {
					batchNum: itemDetail.batchNum,
				}
			})
		}
	}
	//打开处理
	openHandle = () => {
		this.setState({
			openHandle: !this.state.openHandle
		})
	}
	//处理提交
	handleSubmit=()=>{
			_this.changeP();
			_this.openHandle();
	}
	//改变页码
    changeP=()=>{
        var timer = new Date();
        this.setState({
            searchParams: {
                    page: this.state.newPage,
                    timer: timer,
            }
        })
    }
    onPageChange=(page)=>{
        this.setState({
            newPage:page,
        })
    }
  

	render() {
		var logFlag = true;

		return (
			<div className="m-opera-logs">
				<Section title="帖子审核" >
	        		<Table
							style={{marginTop:10}}
							displayCheckbox={false}
							onLoaded={this.onLoaded}
							ajax={true}
							ajaxUrlName='topic-list'
							ajaxParams={this.state.searchParams}
							onOperation={this.onOperation}
							onPageChange={this.onPageChange}
							  >
						<TableHeader>
						<TableHeaderColumn>被举报人</TableHeaderColumn>
						<TableHeaderColumn>举报类型</TableHeaderColumn>
						<TableHeaderColumn>举报人</TableHeaderColumn>
						<TableHeaderColumn>操作时间</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
					</TableHeader>

					<TableBody>
						<TableRow>
							<TableRowColumn name="punishedName" ></TableRowColumn>
								<TableRowColumn name="type"></TableRowColumn>
								{/*<TableRowColumn name="name" component={(value,oldValue,itemDetail) => {
                                        if (value.length>2) {
                                            logFlag = false;
                                        }else{
											logFlag = true;
										}
                                        return (
                                            <div>
                                                {
                                                    logFlag
                                                    ? <div>{value[0]}、{value[1]}</div>
                                                    : <div></div>
                                                }
                                            </div>
                                                )
                                    }}></TableRowColumn>*/}
							 <TableRowColumn name="name"></TableRowColumn>
							 <TableRowColumn name="time" type="date" component={(value)=>{
 								return (
 									<KrDate value={value} format="yyyy-mm-dd HH:MM:ss" />
 								)
 							}}></TableRowColumn>
							<TableRowColumn>
									<Button label="处理"  type="operation" operation="handle"/>
							</TableRowColumn>
						 </TableRow>
					</TableBody>
					<TableFooter></TableFooter>
					</Table>
				</Section>

			<Drawer
             modal={true}
             width={750}
             open={this.state.openHandle}
			 onClose={this.openHandle}
             openSecondary={true}
             containerStyle={{paddingRight:43,paddingTop:40,paddingLeft:48,paddingBottom:48,zIndex:20}}
           >
             	<ViewLogs
						onCancel={this.openHandle} detail={this.state.itemDetail} onSubmit={this.handleSubmit}
					/>
           </Drawer>
			</div>
		);
	}

}
