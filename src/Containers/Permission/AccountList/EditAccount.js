import React, {Component} from 'react';
import {connect, Actions, Store} from 'kr/Redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {reduxForm, formValueSelector, change} from 'redux-form';
import {
    KrField,
    Table,
    TableBody,
    TableHeader,
    CheckboxGroup,
    Checkbox,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
    TableFooter,
    Button,
    Section,
    Grid,
    Row,
    Message,
    Col,
    Dialog,
    ListGroup,
    ListGroupItem
} from 'kr-ui';
import './DataPermission.less';

class EditAccount extends Component {

    static PropTypes = {
        detail: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        detailFuc: React.PropTypes.func
    }
    constructor(props, context) {
        super(props, context);

        this.onCancel = this.onCancel.bind(this);
    }
    componentDidMount() {
        let {detail} = this.props;
        //console.log(detail);
    }
    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel()
    }
    onSubmit = (form) => {
        const {detailFuc} = this.props;
        var _this = this;
        console.log("form", form);
        let {detail} = this.props;
        Store.dispatch(Actions.callAPI('editSsoUser', {}, {
            id: detail.id,
            accountName: form.accountName,
            email: form.email,
            realName: form.realName,
            mobilePhone: form.mobilePhone
        })).then(function(response) {
            Message.success('修改成功')
            detailFuc();
            //  _this.onCancel();
        }).catch(function(err) {
            Message.error(err.message);
        });
        console.log("adfasdfsd");
    }
    render() {

        let {detail} = this.props;
        const {handleSubmit} = this.props;
        return (

            <div>
                <form style={{
                    width: '100%',
                    textAlign: 'center'
                }} onSubmit={handleSubmit(this.onSubmit)} onCancel={this.onCancel}>
                    <KrField label="登录名：" style={{
                        textAlign: 'center'
                    }} requireLabel={true} heightStyle={{
                        height: 42,
                        marginLeft: '17px',
                        width: 222
                    }} name="accountName" component="input" type="text" inline={true} placeholder="请输入登录名"/>
                    <KrField label="姓名：" style={{
                        width: 320,
                        marginTop: 20
                    }} requireLabel={true} heightStyle={{
                        height: 42,
                        marginLeft: 16,
                        width: 222
                    }} name="realName" component="input" inline={true} type="text" placeholder="请输入姓名"/>
                    <KrField label="手机号：" style={{
                        textAlign: 'center',
                        marginTop: 20
                    }} heightStyle={{
                        height: 42,
                        marginLeft: '17px',
                        width: 222
                    }} name="mobilePhone" component="input" inline={true} type="text" placeholder="请输入手机号"/>
                    <KrField label="邮箱：" style={{
                        width: 320,
                        marginTop: 20,
                        marginBottom: 20
                    }} heightStyle={{
                        height: 42,
                        marginLeft: 16,
                        width: 222
                    }} name="email" component="input" inline={true} type="text" placeholder="请输入电子邮箱"/>
                    <ListGroup>
                        <ListGroupItem style={{
                            paddingLeft: 17,
                            paddingRight: 40,
                            paddingTop: 20,
                            paddingBottom: 6
                        }}>
                            <Button label="确定" type="submit" width={90} height={36} fontSize={14}/>
                        </ListGroupItem>
                        <ListGroupItem style={{
                            paddingTop: 20,
                            paddingBottom: 6
                        }}>
                            <Button label="取消" cancle={true} type="button" onTouchTap={this.onCancel} width={90} height={34} fontSize={14}/>
                        </ListGroupItem>
                    </ListGroup>

                </form>
            </div>
        );
    }

}
EditAccount = reduxForm({form: 'updatePasswordForm'})(EditAccount);

export default EditAccount;
