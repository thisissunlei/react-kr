import React, {Component, PropTypes} from 'react';
import {
    reduxForm,
    formValueSelector,
    change,
    initialize,
    arrayPush,
    arrayInsert,
    FieldArray,
    reset
} from 'redux-form';
import {Actions, Store, connect} from 'kr/Redux';

import {
    KrField,
    Grid,
    Row,
    Col,
    Button,
    Notify,
    ButtonGroup
} from 'kr-ui';

class NewCreateFund extends Component {

    static PropTypes = {
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func
    }

    constructor(props) {
        super(props);

        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        Store.dispatch(reset('NewCreateFund'));
        Store.dispatch(change('NewCreateFund', 'status', 'ENABLE'));
        Store.dispatch(change('NewCreateFund', 'twinsFlag', 'CREATINCOME'));
        Store.dispatch(change('NewCreateFund', 'parentId', this.props.parentId));
    }

    onSubmit(values) {
        const {onSubmit} = this.props;
        onSubmit && onSubmit(values);
    }

    onCancel() {
        const {onCancel} = this.props;
        onCancel && onCancel();
    }

    render() {
        const {parentId} = this.props;
        let style = {
            marginTop: 3
        }
        let heightStyle = {
            width: '546',
            height: '72',
            marginTop: '-2'
        }
        const {error, handleSubmit, pristine, reset} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)} style={{
                marginTop: 35,
                marginLeft: 35
            }}>
                <KrField grid={1 / 2} name="categoryName" right={41} type="text" label="款项名称" requireLabel={true} maxSize={30}/>
                <KrField grid={1 / 2} name="position" right={41} style={{
                    marginRight: -10,
                    marginTop: 4
                }} type="select" label="显示位置" options={[
                    {
                        value: 'BOTH',
                        label: '全部'
                    }, {
                        value: 'PAYMENT',
                        label: '回款'
                    }
                ]} requireLabel={true}></KrField>
                <KrField grid={1 / 2} name="status" component="group" label="是否启用" requireLabel={true}>
                    <KrField name="status" grid={1 / 2} label="启用" type="radio" value="ENABLE"/>
                    <KrField name="status" grid={1 / 2} label="关闭" type="radio" value="DISENABLE"/>
                </KrField>
                <KrField grid={1 / 2} name="twinsFlag" component="group" label="生成收入" requireLabel={true}>
                    <KrField name="twinsFlag" grid={1 / 2} label="启用" type="radio" value="CREATINCOME"/>
                    <KrField name="twinsFlag" grid={1 / 2} label="关闭" type="radio" value="NOINCOME"/>
                </KrField>

                <KrField label="备注" style={style} name="remark" component="textarea" heightStyle={heightStyle} placeholder='请输入备注,输入字数不能超过100字' maxSize={100} lengthClass='subject-length-textarea'/>

                <Grid style={{
                    marginTop: -2,
                    marginBottom: 5,
                    marginLeft: -30
                }}>
                    <Row>
                        <Col md={12} align="center">
                            <ButtonGroup>
                                <div className='ui-btn-center'><Button label="确定" type="submit" joinEditForm/></div>
                                <Button label="取消" type="button" cancle={true} onTouchTap={this.onCancel}/>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Grid>

            </form>
        );
    }
}
const validate = values => {

    const errors = {}

    if (!values.categoryName) {
        errors.categoryName = '请填写子项名称';
    }
    if (!values.position) {
        errors.position = '请填写显示位置';
    }

    if (!values.status) {
        errors.status = '请填写是否启用';
    }
    if (!values.twinsFlag) {
        errors.twinsFlag = '请填写是否生成收入';
    }
    return errors
}
export default reduxForm({form: 'NewCreateFund', validate, enableReinitialize: true, keepDirtyOnReinitialize: true})(NewCreateFund);
