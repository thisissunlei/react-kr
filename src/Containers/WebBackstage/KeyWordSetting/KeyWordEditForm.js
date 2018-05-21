import React from 'react';

import {
    reduxForm,
    initialize,
} from 'redux-form';

import {
    Actions,
    Store
} from 'kr/Redux';

import {Http} from 'kr/Utils';

import {
    KrField,
    Grid,
    Row,
    Message,
    Notify,
    Button,
    ListGroup,
    ListGroupItem,
} from 'kr-ui';
import './index.less';
import {ShallowEqual} from 'kr/Utils';

export default class keyWordEditForm extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state={
            status:true,
            initializeValues:{},
            open:'false',
            onsubmit:true,
            phoneSame:'true',
            onsubmitCode:true,
            code:'',
            email:'',
            companyInfo:{},
        }
    }

    //首次加载，只执行一次
    componentWillMount() {
        const {detail}=this.props;
        if(detail && detail.id){
            this.getBasicData();
        }
    }

    onSubmit=(values)=>{
        const {onSubmit} = this.props;
        onSubmit && onSubmit(values);
    }

    getBasicData=()=>{
        const {detail}=this.props;
        Http.request('keyword-setting-detail', {id:detail.id}).then(function(response) {
            Store.dispatch(initialize('keyWordEditForm', response));
        }).catch(function(err) {
            Notify.show([{
                message: err.message,
                type: 'danger',
            }]);
        });
    }

    onCancel=()=>{
        const {onCancel} = this.props;
        onCancel && onCancel();
    }

    render() {
        let {detail,handleSubmit} = this.props;
        return (
            <div className="edit-form" style={{paddingBottom:"3"}}>
                <form onSubmit={handleSubmit(this.onSubmit)}>
                    <div className="split-lines"></div>
                    <KrField name="semName"  label="关键词" type="text" right={30}  requireLabel={true}/>
                    <KrField name="semCode" label="代码参数" type="text" right={30}  requireLabel={true}/>
                    <Grid style={{margin:'20px 0',marginBottom:'0'}}>
                        <Row>
                            <ListGroup>
                                <ListGroupItem style={{width:'270px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"   width={90} height={34}/></ListGroupItem>
                                <ListGroupItem style={{width:'240px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} width={90} height={34}/> </ListGroupItem>
                            </ListGroup>
                          </Row>
                    </Grid>
                </form>
            </div>
)
    }
}
const validate = values => {
    const errors = {}

    if (!values.semName) {
        errors.semName = '请输入关键词';
    }

    if (!values.semCode) {
        errors.semCode = '请输入代码参数';
    }

    return errors
}
keyWordEditForm = reduxForm({
    form: 'keyWordEditForm',
    validate,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
})(keyWordEditForm);
