import React, {Component} from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect, Actions, Store} from 'kr/Redux';
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
    Dialog,
    Message
} from 'kr-ui';
import './index.less';
export default class DetailFund extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {

        return (

            <div>
                <Section title="订单账单列表" description=""></Section>
            </div>
        );
    }

}
