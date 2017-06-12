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
			},
			itemDetail: '',
			openView: false,
			openHighSearch: false,
		}
	}

	//操作相关
	onOperation = (type, itemDetail) => {
		this.setState({
			itemDetail
		});

		if (type == 'view') {
			this.openView();
		}else if (type == 'operate') {
			this.setState({
				searchParams: {
					batchNum: itemDetail.batchNum,
				}
			})
		}
	}
	//打开查看日志
	openView = () => {
		this.setState({
			openView: !this.state.openView
		})
	}
	onSearchSubmit = (form) => {
		this.setState({
			searchParams:form
		})
		this.openHighSearch();
	}

  openHighSearch = () => {
    this.setState({
      openHighSearch: !this.state.openHighSearch
    })
  }
//普通查询
	searchParams = (form) => {
		var _this = this;
		this.setState({
			searchParams: {
				page: 1,
				pageSize: 15,
				operateRecord: form.content
			}
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
								<TableRowColumn name="name" component={(value,oldValue,itemDetail) => {
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
                                    }}></TableRowColumn>
							 <TableRowColumn name="time" type="date" component={(value)=>{
 								return (
 									<KrDate value={value} format="yyyy-mm-dd HH:MM:ss" />
 								)
 							}}></TableRowColumn>
							<TableRowColumn>
									<Button label="处理"  type="operation" operation="view"/>
							</TableRowColumn>
						 </TableRow>
					</TableBody>
					<TableFooter></TableFooter>
					</Table>
				</Section>

				<Dialog
					title="查看"
					modal={true}
					open={this.state.openView}
					onClose={this.openView}
				>
					<ViewLogs
								onCancel={this.openView} detail={this.state.itemDetail}
					/>
				</Dialog>
			</div>
		);
	}

}
