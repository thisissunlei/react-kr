import React from 'react';
import {Actions, Store} from 'kr/Redux';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {Http} from 'kr/Utils';
import {reduxForm, formValueSelector, change,initialize} from 'redux-form';
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

class EditAccount extends React.Component {

    static PropTypes = {
        detail: React.PropTypes.object,
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
    }
    constructor(props, context) {
        super(props, context);

        this.onCancel = this.onCancel.bind(this);
    }
    componentDidMount() {
        let {detail} = this.props;
        let initialValues = {};
        initialValues = detail;
        Store.dispatch(initialize('EditAccount', initialValues));
    }
    onCancel = () => {
        const {onCancel} = this.props;
        onCancel && onCancel()
    }
    onSubmit = (form) => {
        var _this = this;
        const {onSubmit} = this.props;
        console.log("form", form);
        let {detail} = this.props;
        Http.request('editSsoUser', {}, {
            id: detail.id,
            accountName: form.accountName,
            email: form.email,
            realName: form.realName,
            mobilePhone: form.mobilePhone
        }).then(function(response) {
            Message.success('修改成功');
            onSubmit();
            // window.setTimeout(function(){
    		// 			window.location.reload();
    		// 		},800)
        }).catch(function(err) {
            Message.error(err.message);
        });
    }
    render() {

        let {detail} = this.props;
        console.log(detail,"detail");
        const {handleSubmit} = this.props;
        return (
            <div>
                <form style={{width:480}} onSubmit={handleSubmit(this.onSubmit)} onCancel={this.onCancel}>
                    <KrField label="登录名：" style={{
                        marginLeft:88
                    }} requireLabel={true} heightStyle={{
                        height: 42,
                        marginLeft: '17px',
                    }} name="accountName" component="input" inline={true} placeholder="请输入登录名" />
                    <KrField label="姓名：" style={{
                        marginTop: 20,
                        marginLeft:88
                    }} requireLabel={true} heightStyle={{
                        height: 42,
                        marginLeft: 30,
                        width:188
                    }} name="realName" component="input" inline={true} placeholder="请输入姓名"/>
                    <KrField label="手机号：" style={{
                        marginLeft:88,
                        marginTop: 20
                    }} requireLabel={true} heightStyle={{
                        height: 42,
                        marginLeft: '17px',
                    }} name="mobilePhone" component="input" inline={true} placeholder="请输入手机号"/>
                    <KrField label="邮箱：" style={{
                        marginTop: 20,
                        marginBottom: 20,
                        marginLeft:88
                    }} requireLabel={true} heightStyle={{
                        height: 42,
                        marginLeft: 30,
                        width:188
                    }} name="email" component="input" inline={true} placeholder="请输入电子邮箱"/>
                    <ListGroup>
                        <ListGroupItem style={{
                            paddingLeft: 116,
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
EditAccount = reduxForm({form: 'EditAccount'})(EditAccount);

export default EditAccount;
