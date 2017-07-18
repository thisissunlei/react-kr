
import React from 'react';

import {
	Http,
	DateFormat,
} from "kr/Utils";
import { observer, inject } from 'mobx-react';
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
import CreateDialog from './Createdialog';
import EditDialog from './Editdialog';
import Viewdialog from './Viewdialog';


@inject("NavModel")
@observer
export default class Labour extends React.Component {

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
			tabSelect:1,
		}
	}
	checkTab=(item)=>{
			this.setState({
				tabSelect:item,
			})
	}
  componentDidMount(){
		const {NavModel} = this.props;
		NavModel.setSidebar(false);
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
			<div className="g-oa-labour">
					<div className="left">
						<div className="search"> 
							<input type="text" placeholder="ddd" />
							<span className="searching">

							</span>
						</div>							
					</div>
					<div className="right">
						<div className="header">
							<span className="title">
								abc
								<span className="title-list">
									<span className="top-square">

									</span>
									<span className="item">
										asdf
									</span>
									<span className="item">
										asdf
									</span>
								</span>
							</span>
							
								<span className="square">

								</span>
							
						</div>
						<div className="center-row">
							<div className="department">
								<div className="department-logo">

								</div>
								<div className="department-name">
									asfsdf
								</div>
								<div className="department-tab-list">
									<div className={`department-tab ${this.state.tabSelect==1?'department-tab-active':''}`} onClick={this.checkTab.bind(this,1)}> 
										fsaf
									</div>
									<div className={`department-tab ${this.state.tabSelect==2?'department-tab-active':''}`} onClick={this.checkTab.bind(this,2)}> 
										fsafda
									</div>
								</div>
								
							</div>
							<div className="button-group">
								<Button
      									label="编辑"
      									type="button"
      									onTouchTap={this.onCancel}
      									height={30}
      									width={80}
												backgroundColor='#fcfcfc'
												labelColor='#666'
												shadow="no"
      					/>
								<div className="btn-center">

								</div>
								<Button
      									label="查看"
      									type="button"
      									onTouchTap={this.onCancel}
      									height={30}
      									width={80}
												backgroundColor='#F5F6FA'
												labelColor='#666'
												shadow="no"
      					/>
							</div>
						</div>
					{this.state.tabSelect==1 &&
							<div>
								<Grid style={{marginBottom:14,marginTop:14}}>
									<Row>
									<Col md={4} align="left" >
											<Button label="新建下级" type="button" onClick={this.openCreateDialog} width={80} height={30} fontSize={14}/>
									</Col>
									<Col md={8} align="right">
										<div className="u-search">
												<SearchForm onSubmit={this.searchParams} />
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
					<TableHeaderColumn>操作</TableHeaderColumn>
						</TableHeader>

						<TableBody>
							<TableRow>
								<TableRowColumn name="version" ></TableRowColumn>

								<TableRowColumn name="osTypeName"></TableRowColumn>
					
					<TableRowColumn name="forcedName"></TableRowColumn>
				
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
				</div>
		}
		{
			this.state.tabSelect==2 &&
			<div>
					<Grid style={{marginBottom:14,marginTop:14}}>
									<Row>
									<Col md={4} align="left" >
											<Button label="新建下级" type="button" onClick={this.openCreateDialog} width={80} height={30} fontSize={14}/>
									</Col>
									<Col md={8} align="right">
										<div className="u-search">
												<SearchForm onSubmit={this.searchParams} />
										</div>
									</Col>
									</Row>
								</Grid>
	        		<Table
							style={{marginTop:10}}
							displayCheckbox={false}
							onLoaded={this.onLoaded}
							ajax={true}
							ajaxUrlName='op-code-list'
							ajaxParams={this.state.searchParams}
							onOperation={this.onOperation}
							onPageChange={this.onPageChange}
						>
						<TableHeader>
						<TableHeaderColumn>名称</TableHeaderColumn>
						<TableHeaderColumn>编码</TableHeaderColumn>
						<TableHeaderColumn>创建人</TableHeaderColumn>
						<TableHeaderColumn>创建时间</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
					</TableHeader>

					<TableBody>
						<TableRow>
							<TableRowColumn name="name"></TableRowColumn>
							<TableRowColumn name="codeName" 
								 component={(value)=>{
                  var styles = {
                    display:'block',
                    paddingTop:5
                  };
                  if(value.length==""){
                    styles.display="none"

                  }else{
                    styles.display="block";
                  }
                   return (<div style={styles} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:220,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{value}</span>
                    <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                 }}
							></TableRowColumn>
							<TableRowColumn name="creater"></TableRowColumn>
							<TableRowColumn type="date" name="createDate" component={(value)=>{
								return (
									<KrDate value={value} format = "yyyy-mm-dd HH:MM:ss" />
								)
							}}> </TableRowColumn>
							<TableRowColumn>
									<Button label="编辑"   type="operation" operateCode="sso_resource_edit" operation="edit"/>
							 </TableRowColumn>
						 </TableRow>
					</TableBody>
					<TableFooter></TableFooter>
					</Table>
			</div>
		}
		</div>
        <Dialog 
            title="新建机构维度" 
            modal={true} 
            open={this.state.openCreate} 
            onClose={this.openCreate} 
            contentStyle={{
                width: 374
            }}
        >
                <CreateDialog onSubmit={this.onNewCreateSubmit} onCancel={this.openCreate} />
        </Dialog>
        <Dialog 
                title="编辑机构维度" 
                modal={true} 
                open={this.state.openEdit} 
                onClose={this.openEdit} 
                contentStyle={{
                    width: 374
                }}
        >
                <EditDialog detail={this.state.itemDetail} onSubmit={this.onNewEditSubmit} onCancel={this.openEdit} />
        </Dialog>
</div>
		);
	}

}
