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
    onSearchSubmit = (searchParams) => {
        let obj = {
            mainbillname: searchParams.content,
            pageSize: 15
        }
        this.setState({searchParams: obj});
    }
    openNewCreateFund = () => {
        this.setState({
            openNewCreateFund: !this.state.openNewCreateFund
        })
    }
    render() {

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
                                <ListGroupItem><SearchForm onSubmit={this.onSearchSubmit} onCancel={this.onCancel}/></ListGroupItem>
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

                        <TableBody></TableBody>

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
