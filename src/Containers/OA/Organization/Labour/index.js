
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
import CancelDialog from './CancelDialog';


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
			data:{},
			itemDetail: '',
			openCreateDialog: false,
			openEditDialog: false,
			openViewDialog:false,
			tabSelect:1,
			openCancelDialog:false,
			newPage:1,
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

		if (type == 'cancle') {
			this.openCancelDialog();
		}
	}
	//搜索
    onSearchSubmit = (value) => {
        let {searchParams} = this.state;
        if (value.filter == 'company') {
            this.setState({
                searchParams: {
                    page: this.state.newPage,
                    pageSize: 15,
                    accountName: value.content
                }
            })
        }
        if (value.filter == 'city') {
            this.setState({
                searchParams: {
                    page: this.state.newPage,
                    pageSize: 15,
                    realName: value.content
                }
            })
        }
    }
	openCancelDialog=()=>{
		this.setState({
			openCancelDialog: !this.state.openCancelDialog
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
		               //params.publishTime=DateFormat(params.publishTime,"yyyy-mm-dd hh:MM:ss")
		Http.request('org-update', {}, params).then(function(response) {
			_this.openEditDialog();
			Message.success('修改成功');
			_this.changeP();
		}).catch(function(err) {
			Message.error(err.message)
		});
	}
	onCancelSubmit=()=>{
		let {
			itemDetail
		} = this.state;
		var _this = this;
		Http.request('org-cancel', {
			orgId: itemDetail.orgId,
			orgType:itemDetail.orgType,
		}).then(function(response) {
			_this.openCancelDialog();
			Message.success('封存成功');
			_this.changeP();
		}).catch(function(err) {
			_this.openCancelDialog();
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
		let {itemDetail,data} = this.state;
		let options = [
            {
                label: '人名',
                value: 'company'
            }, {
                label: '邮箱',
                value: 'city'
            }
        ];
		return (
			<div className="g-oa-labour">
					<div className="left">
						<div className="search"> 
							<input type="text" placeholder="ddd" />
							<span className="searching">

							</span>
						</div>
						<div className="oa-tree">
							
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
      									onTouchTap={this.openEditDialog}
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
      									onTouchTap={this.openViewDialog}
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
									<Button label="封存"  type="operation" operation="cancle"/>
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
									</Col>
									<Col md={8} align="right">
										<div className="u-search">
												<SearchForm onSubmit={this.searchParams} searchFilter={options}/>
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
            title="查看XXX" 
            modal={true} 
            open={this.state.openViewDialog} 
            onClose={this.openViewDialog} 
            contentStyle={{
                width: 374
            }}
        >
                <Viewdialog detail={this.state.data} onCancel={this.openViewDialog} />
        </Dialog>
        <Dialog 
                title="编辑XXX" 
                modal={true} 
                open={this.state.openEditDialog} 
                onClose={this.openEditDialog} 
                contentStyle={{
                    width: 374
                }}
        >
                <EditDialog detail={this.state.itemDetail} onSubmit={this.onNewEditSubmit} onCancel={this.openEditDialog} />
        </Dialog>
				<Dialog 
                title="提示" 
                modal={true} 
                open={this.state.openCancelDialog} 
                onClose={this.openCancelDialog} 
                contentStyle={{
                    width: 374
                }}
        >
                <CancelDialog detail={this.state.itemDetail} onSubmit={this.onCancelSubmit} onCancel={this.openCancelDialog} />
        </Dialog>
</div>
		);
	}

}
