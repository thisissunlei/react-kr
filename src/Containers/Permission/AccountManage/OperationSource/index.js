
import React from 'react';

import {
	Http,
	DateFormat,
} from "kr/Utils";

import {
	KrField,
	Table,
	Drawer,
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
	Dialog,
	KrDate,
	Message,
	SearchForms
} from 'kr-ui';
import './index.less';
import Createdialog from './Createdialog.js';
import Editdialog from './Editdialog.js';

export default class OperationSource extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams: {
				page: 1,
				pageSize: 15,
			},
			itemDetail: '',
			openHighSearch: false,
			openCreateDialog: false,
			openEditDialog: false,
			openViewDialog:false,
			searchData:[]
		}
	}
	 componentDidMount() {
      var _this = this;
	 
      Http.request('source-search-data', {
          }).then(function(response) {
             var searchData= response.systemList.map((item, index) => {
				item.value = item.systemType;
				item.label = item.systemDesc;
				return item;
			})
		_this.setState({
			searchData:searchData
		})
        }).catch(function(err) {});
    }
	//操作相关
	onOperation = (type, itemDetail) => {
		this.setState({
			itemDetail
		});
		if (type == 'edit') {
			this.openEditDialog();
		}
	}

//普通查询
	// searchParams = (value) => {
	// 	 let {searchParams} = this.state;
    //     if (value.filter == 'community') {
    //         this.setState({
    //             searchParams: {
    //                 page: 1,
    //                 pageSize: 15,
    //                 communityName: value.content
    //             }
    //         })
    //     }
    //     if (value.filter == 'type') {
    //         this.setState({
    //             searchParams: {
    //                 page: 1,
    //                 pageSize: 15,
    //                 typeName: value.content
    //             }
    //         })
    //     }
	// }
	
	openCreateDialog = () => {
		this.setState({
			openCreateDialog: !this.state.openCreateDialog
		})
	}
	openEditDialog = () => {
		this.setState({
			openEditDialog: !this.state.openEditDialog
		})
	}
	onCreatSubmit = (params) => {
		var _this = this;
		Http.request('save-version', {}, params).then(function(response) {
			_this.openCreateDialog();
			Message.success('新建成功');
			window.setTimeout(function() {
				window.location.reload();
			}, 800);
		}).catch(function(err) {
			Message.error(err.message)
		});

	}
	onEditSubmit = (params) => {
		var _this = this;
		params.publishTime=DateFormat(params.publishTime,"yyyy-mm-dd hh:MM:ss")
		Http.request('save-version', {}, params).then(function(response) {
			_this.openEditDialog();
			Message.success('修改成功');
			window.setTimeout(function() {
				window.location.reload();
			}, 800);
		}).catch(function(err) {
			Message.error(err.message)
		});
	}
	render() {
		let {itemDetail,searchData} = this.state;
		
		return (
			<div className="g-source-list">
				<Section title="操作来源" >
					<Grid style={{marginBottom:22,marginTop:2}}>
						<Row>
						<Col md={4} align="left" >
							<Button label="新建" type="button" onClick={this.openCreateDialog} width={70} height={26} fontSize={14}/>
						</Col>
						<Col md={8} align="right">
							<div className="u-search">
									{this.state.searchData.length>0?<SearchForms searchFilter={this.state.searchData}  onSubmit={this.searchParams} openSearch={this.openHighSearch} />:''}
							</div>
						</Col>
					  </Row>
					</Grid>
          <Table
          style={{marginTop:10}}
          displayCheckbox={false}
          onLoaded={this.onLoaded}
          ajax={true}
          ajaxUrlName='operation-source-list'
          ajaxParams={this.state.searchParams}
          onOperation={this.onOperation}
            >
        <TableHeader>
        <TableHeaderColumn>来源编码</TableHeaderColumn>
        <TableHeaderColumn>来源名称</TableHeaderColumn>
        <TableHeaderColumn>来源系统</TableHeaderColumn>
		<TableHeaderColumn>操作</TableHeaderColumn>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableRowColumn name="sourceCode" ></TableRowColumn>

          <TableRowColumn name="sourceDesc"></TableRowColumn>
		 <TableRowColumn name="systemType"></TableRowColumn>
		
				<TableRowColumn>
						<Button label="编辑"  type="operation" operation="edit"/>
				</TableRowColumn>
         </TableRow>
      </TableBody>
      <TableFooter></TableFooter>
      </Table>
				</Section>
					
					<Drawer
					 modal={true}
					 width={750}
					 openSecondary={true}
					 onClose={this.openCreateDialog}
					 open={this.state.openCreateDialog}
					 >
					 <Createdialog  onCancel={this.openCreateDialog} onSubmit={this.onCreatSubmit} />

					</Drawer>
					
					<Drawer
					 modal={true}
					 width={750}
					 open={this.state.openEditDialog}
					 onClose={this.openEditDialog}
					 openSecondary={true}
					 >
					 <Editdialog detail={itemDetail} onCancel={this.openEditDialog} onSubmit={this.onEditSubmit} />

					</Drawer>

			</div>
		);
	}

}
