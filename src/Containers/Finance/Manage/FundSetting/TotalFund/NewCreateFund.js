import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm, formValueSelector} from 'redux-form';
import {Actions, Store} from 'kr/Redux';

import {
    KrField,
    Grid,
    Row,
    Col,
    Button,
    ListGroup,
    ListGroupItem
} from 'kr-ui';

class NewCreateFund extends Component {

    static PropTypes = {
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func
    }

    constructor(props) {
        super(props);

        this.onCancel = this.onCancel.bind(this);
    }

    onSubmit(form) {

        form.pageSize = 15;
        form.page = 1;

        const {onSubmit} = this.props;
        onSubmit && onSubmit(form);
    }

    onCancel() {
        const {onCancel} = this.props;
        onCancel && onCancel();
    }

    render() {

        const {error, handleSubmit, pristine, reset} = this.props;

        return (
            <form>dasfsda</form>
        );
    }
}

export default reduxForm({form: 'NewCreateFund'})(NewCreateFund);
