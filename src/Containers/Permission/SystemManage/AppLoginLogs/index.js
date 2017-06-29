
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
	Message
} from 'kr-ui';
import './index.less';
import SearchForm from './SearchForm';
import HighSearchForm from './HighSearchForm';
import Createdialog from './Createdialog.js';
import Editdialog from './Editdialog.js';
import Viewdialog from './Viewdialog.js';


export default class AppLoginLogs extends React.Component {

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
		}
	}
	//操作相关
	onOperation = (type, itemDetail) => {
		this.setState({
			itemDetail
		});

		if (type == 'view') {
			this.openViewDialog();
		}else if (type == 'edit') {
			this.openEditDialog();
		}
	}
//高级查询
openHighSearch = () => {
    this.setState({
      openHighSearch: !this.state.openHighSearch
    })
  }

	onSearchSubmit = (form) => {
		this.setState({
			searchParams:form
		})
		this.openHighSearch();
	}
//普通查询
	searchParams = (form) => {
		var _this = this;
		this.setState({
			searchParams: {
				page: 1,
				pageSize: 15,
				version: form.content
			}
		})
	}
	openViewDialog = () => {
		this.setState({
			openViewDialog: !this.state.openViewDialog
		})
	}
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
			_this.changeP();
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
			_this.changeP();
		}).catch(function(err) {
			Message.error(err.message)
		});
	}
	//改变页码
    changeP=()=>{
        var timer = new Date();
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.timer=timer;
		this.setState({
            searchParams:searchParams,
        })
    }
	onPageChange=(page)=>{
		var searchParams = Object.assign({},this.state.searchParams);
		searchParams.page=page;
		this.setState({
            searchParams:searchParams,
        })
    }
	render() {
		let {itemDetail} = this.state;

		return (
			<div className="g-applogin-list">
				<Section title="版本管理" >
					<Grid style={{marginBottom:22,marginTop:2}}>
						<Row>
						<Col md={4} align="left" >
								<Button label="新建" type="button" operateCode="sso_appVersion_new" onClick={this.openCreateDialog} width={70} height={26} fontSize={14}/>
						</Col>
						<Col md={8} align="right">
							<div className="u-search">
									<SearchForm onSubmit={this.searchParams} openSearch={this.openHighSearch} />
							</div>
						</Col>
					  </Row>
					</Grid>
          <Table
          style={{marginTop:10}}
          displayCheckbox={false}
          onLoaded={this.onLoaded}
          ajax={true}
          ajaxUrlName='get-version-list'
          ajaxParams={this.state.searchParams}
          onOperation={this.onOperation}
		  onPageChange={this.onPageChange}
            >
        <TableHeader>
        <TableHeaderColumn>系统版本</TableHeaderColumn>
        <TableHeaderColumn>设备类型</TableHeaderColumn>
        <TableHeaderColumn>下载地址</TableHeaderColumn>
        <TableHeaderColumn>是否强制更新</TableHeaderColumn>
		<TableHeaderColumn>启用标识</TableHeaderColumn>
		<TableHeaderColumn>APP类型</TableHeaderColumn>
		<TableHeaderColumn>版本升级内容</TableHeaderColumn>
		<TableHeaderColumn>发布时间</TableHeaderColumn>
		<TableHeaderColumn>操作</TableHeaderColumn>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableRowColumn name="version" ></TableRowColumn>

          <TableRowColumn name="osTypeName"></TableRowColumn>
		  <TableRowColumn name="downUrl" component={(value)=>{
                  var styles = {
                    display:'block',
                    paddingTop:5
                  };
                  if(value.length==""){
                    styles.display="none"

                  }else{
                    styles.display="block";
                  }
                   return (<div style={styles} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                    <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                 }}>
        </TableRowColumn>
		 <TableRowColumn name="forcedName"></TableRowColumn>
		<TableRowColumn name="enableName"></TableRowColumn>
          <TableRowColumn name="appTypeName"></TableRowColumn>
		<TableRowColumn name="updateInfo" component={(value)=>{
                  var styles = {
                    display:'block',
                    paddingTop:5
                  };
                  if(value.length==""){
                    styles.display="none"

                  }else{
                    styles.display="block";
                  }
                   return (<div style={styles} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:100,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                    <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                 }}>
        </TableRowColumn>
		<TableRowColumn type="date" name="publishTime" component={(value)=>{
            return (
              <KrDate value={value} format="yyyy-mm-dd HH:MM:ss"/>
            )
          }}> </TableRowColumn>
				<TableRowColumn>
						<Button label="查看"  type="operation" operation="view"/>
						<Button label="编辑"  type="operation" operation="edit"/>
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
					 openSecondary={true}
					 onClose={this.openViewDialog}
					 open={this.state.openViewDialog}
					 >
					 <Viewdialog detail={itemDetail} onCancel={this.openViewDialog}  />

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
