import React, {Component} from 'react';
import {connect, Actions, Store} from 'kr/Redux';
import {bindActionCreators} from 'redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {
    KrField,
    Title,
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter,
    Button,
    ListGroup,
    ListGroupItem,
    SearchForms,
    Section,
    Grid,
    Tooltip,
    KrDate,
    Row,
    Col,
    Dialog,
    Message
} from 'kr-ui';

import {reduxForm, formValueSelector, change} from 'redux-form';
import './index.less';
import NewCreateFund from './NewCreateFund';
import ItemDetail from './ItemDetail';
import EditDetailForm from './EditDetailForm';
export default class TotalFund extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            searchParams: {
                page: 1,
                pageSize: 15,
                parentId: this.props.params.fundId
            },
            openNewCreateFund: false,
            itemDetail: {},
            openView: false,
            openEditDetail: false
        }

    }
    componentDidMount() {
        Store.dispatch(Actions.switchSidebarNav(false));
    }
    onOperation = (type, itemDetail) => {

        this.setState({itemDetail});
        if (type == 'view') {
            this.openViewDialog();
        } else if (type == 'edit') {
            this.openEditDetailDialog();
        }
    }
    onSearchSubmit = (searchParams) => {
        this.setState({

            searchParams: {
                page: 1,
                pageSize: 15,
                searchParam: searchParams.content,
                parentId: this.props.params.fundId
            }

        })

    }
    //查看
    openViewDialog = () => {
        this.setState({
            openView: !this.state.openView
        });
    }

    //编辑
    openEditDetailDialog = () => {
        this.setState({
            openEditDetail: !this.state.openEditDetail
        });
    }
    onEditSubmit = (form) => {

        this.openEditDetailDialog();

        Store.dispatch(Actions.callAPI('editSubCategory', {}, form)).then(function(response) {
            Message.success("编辑成功");
            window.setTimeout(function() {
                window.location.reload();
            }, 0);
        }).catch(function(err) {
            Message.error(err.message);
        });

    }
    openNewCreateFund = () => {
        this.setState({
            openNewCreateFund: !this.state.openNewCreateFund
        })
    }

    onNewCreateSubmit = (values) => {
        Store.dispatch(Actions.callAPI('createSubCategory', {}, values)).then(function(response) {
            Message.success("创建成功");
            window.setTimeout(function() {
                window.location.reload();
            }, 0);

        }).catch(function(err) {
            Message.error(err.message);
        });
    }
    render() {
        let {searchParams} = this.state;
        let {itemDetail} = this.state;
        return (

            <div>
                <Title value="款项配置_财务管理"/>
                <Section title="款项配置" description="">
                    <Row style={{
                        position: 'relative',
                        zIndex: 5
                    }}>
                        <Col md={4} align="left">
                            <Button label="新建子项" type='button' joinEditForm onTouchTap={this.openNewCreateFund}/>
                        </Col>

                        <Col md={8} align="right">
                            <ListGroup>
                                <ListGroupItem><SearchForms placeholder="请输入子项名称" onSubmit={this.onSearchSubmit}/></ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Table style={{
                        marginTop: 10
                    }} displayCheckbox={true} onLoaded={this.onLoaded} ajax={true} ajaxUrlName='findSubCategoryPage' ajaxParams={this.state.searchParams} onOperation={this.onOperation} exportSwitch={true}>

                        <TableHeader>
                            <TableHeaderColumn>编码</TableHeaderColumn>
                            <TableHeaderColumn>名称</TableHeaderColumn>
                            <TableHeaderColumn>类型</TableHeaderColumn>
                            <TableHeaderColumn>状态</TableHeaderColumn>
                            <TableHeaderColumn>生成收入</TableHeaderColumn>
                            <TableHeaderColumn>顺序号</TableHeaderColumn>
                            <TableHeaderColumn>备注</TableHeaderColumn>
                            <TableHeaderColumn>创建人</TableHeaderColumn>
                            <TableHeaderColumn>创建时间</TableHeaderColumn>
                            <TableHeaderColumn>操作</TableHeaderColumn>
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableRowColumn name="categoryCode"></TableRowColumn>
                                <TableRowColumn name="categoryName"></TableRowColumn>
                                <TableRowColumn name="position" options={[
                                    {
                                        label: '全部',
                                        value: 'BOTH'
                                    }, {
                                        label: '回款',
                                        value: 'PAYMENT'
                                    }
                                ]}></TableRowColumn>
                                <TableRowColumn name="status" options={[
                                    {
                                        label: '启用',
                                        value: 'ENABLE'
                                    }, {
                                        label: '未启用',
                                        value: 'DISENABLE'
                                    }
                                ]}></TableRowColumn>
                                <TableRowColumn name="twinsFlag" options={[
                                    {
                                        label: '是',
                                        value: 'CREATINCOME'
                                    }, {
                                        label: '否',
                                        value: 'NOINCOME'
                                    }
                                ]}></TableRowColumn>
                                <TableRowColumn name="sortNum"></TableRowColumn>
                                <TableRowColumn name="remark"></TableRowColumn>
                                <TableRowColumn name="createrName"></TableRowColumn>
                                <TableRowColumn name="createTime" component={(value, oldValue) => {
                                    return (<KrDate value={value} format="yyyy-mm-dd HH:MM:ss"/>)
                                }}></TableRowColumn>
                                <TableRowColumn>
                                    <Button label="查看" type="operation" operation="view"/>
                                    <Button label="编辑" type="operation" operation="edit"/>
                                </TableRowColumn>
                            </TableRow>
                        </TableBody>

                        <TableFooter></TableFooter>

                    </Table>
                    <Dialog title="新建子项" open={this.state.openNewCreateFund} onClose={this.openNewCreateFund} contentStyle ={{
                        width: '688'
                    }}>
                        <NewCreateFund parentId={this.props.params.fundId} onSubmit={this.onNewCreateSubmit} onCancel={this.openNewCreateFund}/>

                    </Dialog>
                    <Dialog title="子项详情" modal={true} open={this.state.openView} onClose={this.openViewDialog}>
                        <ItemDetail parentId={this.props.params.fundId} detail={this.state.itemDetail} onCancel={this.openViewDialog}/>
                    </Dialog>
                    <Dialog title="编辑子项" modal={true} open={this.state.openEditDetail} onClose={this.openEditDetailDialog} contentStyle ={{
                        width: '688'
                    }}>
                        <EditDetailForm detail={this.state.itemDetail} onSubmit={this.onEditSubmit} onCancel={this.openEditDetailDialog}/>
                    </Dialog>
                </Section>
            </div>
        );
    }

}
