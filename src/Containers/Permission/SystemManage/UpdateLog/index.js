import React from 'react';

import { connect } from 'react-redux';
import { Http } from 'kr/Utils';

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

import {
    Actions,
    Store
} from 'kr/Redux';

import {
    change,
    initialize,
    arrayPush,
    arrayInsert,
    FieldArray
} from 'redux-form';


import CreateForm from './CreateForm';
import ConfirmForm from './ConfirmForm';


import './index.less';


class UpdateLog extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            searchParams: {
                time: Date.now(),
            },
            itemDetail: '',
            openCreateDialog: false,
            openPublishDialog: false,
            openUpdateDialog: false,
        }
    }

    openCreateDialog = (itemDetail) => {
        this.setState({
            openCreateDialog: true
        });
    }

    closeCreateDialog = () => {
        this.setState({
            openCreateDialog: false
        });
    }

    openUpdateDialog = (itemDetail) => {
        Store.dispatch(change('UpdateLogCreateForm', 'id', itemDetail.id));
        Store.dispatch(change('UpdateLogCreateForm', 'content', itemDetail.content));
        Store.dispatch(change('UpdateLogCreateForm', 'version', itemDetail.version));
        this.setState({
            openUpdateDialog: true
        });
    }

    closeUpdateDialog = () => {
        this.setState({
            openUpdateDialog: false
        });
    }

    openPublishDialog = (itemDetail) => {
        Store.dispatch(change('UpdateLogConfirmForm', 'id', itemDetail.id));
        this.setState({
            openPublishDialog: true
        });
    }

    closePublishDialog = () => {
        this.setState({
            openPublishDialog: false
        });
    }

    onSubmitPublish = (values) => {
        const that = this;
        Http.request('version-log-publish', {}, values).then(function (response) {
            const searchParams = {
                time: Date.now(),
            }
            that.setState({ searchParams, openPublishDialog: false });
        }).catch(function (err) {
            Message.error(err.message);
        });
    }

    onSubmit = (values) => {
        const that = this;
        Http.request('version-log-create-or-edit', {}, values).then(function (response) {
            const searchParams = {
                time: Date.now(),
            }
            that.setState({ searchParams, openCreateDialog: false });
        }).catch(function (err) {
            Message.error(err.message);
        });
    }

    onUpdateSubmit = (values) => {

        const that = this;

        Http.request('version-log-create-or-edit', {}, values).then(function (response) {
            const searchParams = {
                time: Date.now(),
            }
            that.setState({ searchParams, openUpdateDialog: false });
        }).catch(function (err) {
            Message.error(err.message);
        });

    }

    render() {

        return (
            <div className="g-applogin-list">
                <Section title="PC版本管理" >
                    <Grid style={{ marginBottom: 22, marginTop: 2 }}>
                        <Row>
                            <Col md={4} align="left" >
                                <Button label="新建" type="button"  onClick={this.openCreateDialog} width={70} height={26} fontSize={14} />
                            </Col>
                        </Row>
                    </Grid>
                    <Table
                        style={{ marginTop: 10 }}
                        ajaxParams={this.state.searchParams}
                        displayCheckbox={false}
                        ajax={true}
                        ajaxUrlName='version-log-list'
                    >
                        <TableHeader>
                            <TableHeaderColumn>编号</TableHeaderColumn>
                            <TableHeaderColumn>版本号</TableHeaderColumn>
                            <TableHeaderColumn>更新内容</TableHeaderColumn>
                            <TableHeaderColumn>发布状态</TableHeaderColumn>
                            <TableHeaderColumn>发布时间</TableHeaderColumn>
                            <TableHeaderColumn>创建时间</TableHeaderColumn>
                            <TableHeaderColumn>创建人</TableHeaderColumn>
                            <TableHeaderColumn>操作</TableHeaderColumn>
                        </TableHeader>

                        <TableBody>
                            <TableRow>
                                <TableRowColumn name="id" ></TableRowColumn>
                                <TableRowColumn name="version"></TableRowColumn>
                                <TableRowColumn name="content" component={(value) => {
                                    var styles = {
                                        display: 'block',
                                        paddingTop: 5
                                    };
                                    if (value.length == "") {
                                        styles.display = "none"
                                    } else {
                                        styles.display = "block";
                                    }
                                    return (<div style={styles} className='financeDetail-hover'><span className='tableOver' style={{ maxWidth: 100, display: "inline-block", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>{value}</span>
                                        <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                                }}>
                                </TableRowColumn>
                                <TableRowColumn name="publishStatus" component={(value) => {
                                    if(value === 'false'){
                                        value = false;
                                    }
                                    return (
                                        <span>{value ? '已发布' : '未发布'}</span>
                                    )
                                }}> </TableRowColumn>

                                <TableRowColumn name="publishDate" type="date" format="yyyy-mm-dd HH:MM:ss"></TableRowColumn>

                                <TableRowColumn type="date" name="ctime" component={(value) => {
                                    return (
                                        <KrDate value={value} format="yyyy-mm-dd HH:MM:ss" />
                                    )
                                }}> </TableRowColumn>

                                <TableRowColumn name="createName"></TableRowColumn>

                                <TableRowColumn type="operation" component={(item) => {

                                    if(item.publishStatus){
                                        return <span>-</span>;
                                    }

                                    return (
                                        <div>
                                            <Button label="编辑" type="operation" onClick={this.openUpdateDialog.bind(this, item)} />
                                            <Button label="发布" type="operation" operation="publish" onClick={this.openPublishDialog.bind(this,item)} /> 
                                        </div>
                                    )
                                }}>


                                </TableRowColumn>
                            </TableRow>
                        </TableBody>
                        <TableFooter></TableFooter>
                    </Table>
                </Section>

                <Dialog
                    title="创建版本日志"
                    open={this.state.openCreateDialog}
                    onClose={this.closeCreateDialog}
                    contentStyle={{ width: 666 }}>
                    <CreateForm onCancel={this.closeCreateDialog} onSubmit={this.onSubmit} />
                </Dialog>


                <Dialog
                    title="编辑版本日志"
                    open={this.state.openUpdateDialog}
                    onClose={this.closeUpdateDialog}
                    contentStyle={{ width: 666 }}>
                    <CreateForm onCancel={this.closeUpdateDialog} onSubmit={this.onUpdateSubmit} />
                </Dialog>

                <Dialog
                    title="提醒"
                    open={this.state.openPublishDialog}
                    onClose={this.closePublishDialog}
                    contentStyle={{ width: 300 }} >
                    <ConfirmForm onCancel={this.closePublishDialog} onSubmit={this.onSubmitPublish} />
                </Dialog>

            </div>
        );
    }

}


export default connect((state) => ({}))(UpdateLog);
