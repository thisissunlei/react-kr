import PureRenderMixin from 'react-addons-pure-render-mixin';
import React, {
	Component,
	PropTypes
} from 'react';

import {
	Actions,
	Store
} from 'kr/Redux';
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
import SearchForm from './SearchForm';
import ViewLogs from './ViewLogs';
import HighSearchForm from './HighSearchForm';
export default class OperationsLogs extends Component {

	constructor(props, context) {
		super(props, context);
		var roleId = this.props.params.userId;
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
		}
	}
	//打开查看日志
	openView = () => {
		this.setState({
			openView: !this.state.openView
		})
	}
	onSearchSubmit = (name) => {
		var roleId = this.props.params.userId
		this.setState({
			searchParams: {
				userName: name.searchParam,
				roleId: roleId
			}
		})

	}

  openHighSearch = () => {
    this.setState({
      openHighSearch: !this.state.openHighSearch
    })
  }
	render() {


		return (
			<div className="m-opera-logs">
				<Section title="操作日志" >
					<Grid style={{marginBottom:22,marginTop:2}}>
						<Row>
						<Col md={4} align="left" > </Col>
						<Col md={8} align="right">
							<div className="u-search">
										<SearchForm onSubmit={this.searchParams} openSearch={this.openHighSearch} detail={this.state.infoList}/>
							</div>
						</Col>
					  </Row>
					</Grid>
	        		<Table
							style={{marginTop:10}}
							displayCheckbox={false}
							onLoaded={this.onLoaded}
							ajax={true}
							ajaxUrlName='getOpLogs'
							ajaxParams={this.state.searchParams}
							onOperation={this.onOperation}
							  >
						<TableHeader>
						<TableHeaderColumn>操作批次</TableHeaderColumn>
						<TableHeaderColumn>系统名称</TableHeaderColumn>
						<TableHeaderColumn>业务名称</TableHeaderColumn>
						<TableHeaderColumn>操作日志</TableHeaderColumn>
						<TableHeaderColumn>操作人</TableHeaderColumn>
						<TableHeaderColumn>操作时间</TableHeaderColumn>
					</TableHeader>

					<TableBody>
						<TableRow>
							<TableRowColumn name="batchNum"></TableRowColumn>
							<TableRowColumn name="systemName" ></TableRowColumn>
								<TableRowColumn name="sourceName"></TableRowColumn>
								<TableRowColumn name="operateRecord" ></TableRowColumn>
								<TableRowColumn name="operater" ></TableRowColumn>
							 <TableRowColumn name="operateDate" type="date" component={(value)=>{
 								return (
 									<KrDate value={value} />
 								)
 							}}></TableRowColumn>
							<TableRowColumn>
									<Button label="查看"  type="operation" operation="view"/>
							</TableRowColumn>
						 </TableRow>
					</TableBody>
					<TableFooter></TableFooter>
					</Table>
				</Section>

				<Dialog
					title="高级查询"
					modal={true}
					open={this.state.openHighSearch}
					onClose={this.openHighSearch}
					contentStyle={{width:666}}
				>
					<HighSearchForm
								onSubmit={this.onSearchSubmit}
								onCancel={this.openHighSearch}
					/>
				</Dialog>

				<Dialog
					title="查看"
					modal={true}
					open={this.state.openView}
					onClose={this.openView}
				>
					<ViewLogs
								onCancel={this.openView}
					/>
				</Dialog>
			</div>
		);
	}

}
