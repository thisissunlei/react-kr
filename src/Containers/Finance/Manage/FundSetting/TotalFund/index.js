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
    Drawer,
    Tooltip,
    KrDate,
    Row,
    Col,
    Dialog,
    Message
} from 'kr-ui';

import {reduxForm, formValueSelector, change} from 'redux-form';
import './index.less';
import SearchForm from './SearchForm';
import NewCreateFund from './NewCreateFund';
export default class TotalFund extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            searchParams: {
                page: 1,
                pageSize: 15
            },
            openNewCreateFund: false
        }
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }
    onSearchSubmit = (value) => {
        let {searchParams} = this.state;
        if (value.filter == 'company') {
            this.setState({
                searchParams: {
                    page: 1,
                    pageSize: 15,
                    categoryName: value.content
                }
            })
        }
        if (value.filter == 'city') {
            this.setState({
                searchParams: {
                    page: 1,
                    pageSize: 15,
                    position: value.content
                }
            })
        }
        if (value.filter == 'community') {
            this.setState({
                searchParams: {
                    page: 1,
                    pageSize: 15,
                    status: value.content
                }
            })
        }
    }
    openNewCreateFund = () => {
        this.setState({
            openNewCreateFund: !this.state.openNewCreateFund
        })
    }
    getLocalTime = (timer) => {
        return new Date(parseInt(timer) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    }
    render() {
        let {searchParams} = this.state;
        let {itemDetail} = this.state;
        let options = [
            {
                label: '名称',
                value: 'company'
            }, {
                label: '类型',
                value: 'city'
            }, {
                label: '状态',
                value: 'community'
            }
        ];
        return (

            <div>
                <Title value="款项配置_财务管理"/>
                <Section title="款项配置" description="">
                    <Row>
                        <Col md={4} align="left">
                            <Button label="新建款项" type='button' joinEditForm onTouchTap={this.openNewCreateFund}/>
                        </Col>

                        <Col md={8} align="right">
                            <ListGroup>
                                <ListGroupItem><SearchForm onSubmit={this.onSearchSubmit} searchFilter={options} onCancel={this.onCancel}/></ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Table style={{
                        marginTop: 10
                    }} displayCheckbox={true} onLoaded={this.onLoaded} ajax={true} ajaxUrlName='findPage' ajaxParams={this.state.searchParams} onOperation={this.onOperation} exportSwitch={true} onExport={this.onExport}>

                        <TableHeader>
                            <TableHeaderColumn>编码</TableHeaderColumn>
                            <TableHeaderColumn>名称</TableHeaderColumn>
                            <TableHeaderColumn>类型</TableHeaderColumn>
                            <TableHeaderColumn>状态</TableHeaderColumn>
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
                                    }, {
                                        label: '收入',
                                        value: 'INCOME'
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
                                <TableRowColumn name="sortNum"></TableRowColumn>
                                <TableRowColumn name="remark"></TableRowColumn>
                                <TableRowColumn name="createrName"></TableRowColumn>
                                <TableRowColumn name="createTime" component={(value, oldValue) => {
                                    return (<KrDate value={value} format="yyyy-mm-dd HH:MM:ss"/>)
                                }}></TableRowColumn>
                                <TableRowColumn>
                                    <Button label="查看" onTouchTap={this.openEdit} type="operation" operation="edit"/>
                                    <Button label="编辑" type="operation" operation="reset"/>
                                    <Button label="下一级" onTouchTap={this.openDataPermission} type="operation" operation="data"/>
                                </TableRowColumn>
                            </TableRow>
                        </TableBody>

                        <TableFooter></TableFooter>

                    </Table>
                    <Drawer open={this.state.openNewCreateFund} width={750} openSecondary={true} className='m-finance-drawer' containerStyle={{
                        top: 60,
                        paddingBottom: 228,
                        zIndex: 20
                    }}>
                        <NewCreateFund/>
                    </Drawer>
                </Section>
            </div>
        );
    }

}
