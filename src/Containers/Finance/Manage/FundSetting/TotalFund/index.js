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
    Row,
    Col,
    Dialog,
    Message
} from 'kr-ui';

import {reduxForm, formValueSelector, change} from 'redux-form';
import './index.less';
import SearchForm from './SearchForm';
export default class TotalFund extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            searchParams: {}
        }
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
    }
    onSearchSubmit = () => {}

    render() {

        return (

            <div>
                <Title value="款项配置_财务管理"/>
                <Section title="款项配置" description="">
                    <Row>
                        <Col md={4} align="left">
                            <Button label="新建款项" type='button' joinEditForm onTouchTap={this.openNewCreateDialog}/>
                        </Col>

                        <Col md={8} align="right">
                            <ListGroup>
                                <ListGroupItem><SearchForm onSubmit={this.onSearchSubmit} onCancel={this.onCancel}/></ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                    <Table style={{
                        marginTop: 10
                    }} displayCheckbox={true} onLoaded={this.onLoaded} ajax={true} ajaxFieldListName="finaContractMainbillVOList" ajaxUrlName='getFinaDataByList' ajaxParams={this.state.searchParams} onOperation={this.onOperation} exportSwitch={true} onExport={this.onExport}>

                        <TableHeader>
                            <TableHeaderColumn>订单名称</TableHeaderColumn>
                            <TableHeaderColumn>订单类型</TableHeaderColumn>
                            <TableHeaderColumn>所在社区</TableHeaderColumn>
                            <TableHeaderColumn>工位</TableHeaderColumn>
                            <TableHeaderColumn>起始日期</TableHeaderColumn>
                            <TableHeaderColumn>结束日期</TableHeaderColumn>
                            <TableHeaderColumn>收入总额</TableHeaderColumn>
                            <TableHeaderColumn>回款总额</TableHeaderColumn>
                            <TableHeaderColumn>余额</TableHeaderColumn>
                            <TableHeaderColumn>定金/押金</TableHeaderColumn>
                            <TableHeaderColumn>操作</TableHeaderColumn>
                        </TableHeader>

                        <TableBody></TableBody>

                        <TableFooter></TableFooter>

                    </Table>
                </Section>
            </div>
        );
    }

}
