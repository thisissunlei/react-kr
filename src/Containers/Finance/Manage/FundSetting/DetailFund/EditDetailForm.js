import React, { PropTypes} from 'react';
import {
    reduxForm,
    change,
    initialize,
    reset
} from 'redux-form';
import {Actions, Store} from 'kr/Redux';

import {
    KrField,
    Grid,
    Row,
    Col,
    Button,
    ButtonGroup
} from 'kr-ui';

class NewCreateFund extends React.Component {

    static PropTypes = {
        onSubmit: React.PropTypes.func,
        onCancel: React.PropTypes.func,
        detail: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state={
          stateP:''
        }
    }
    componentDidMount() {

        const {detail} = this.props;
        let initialValues = {};
        initialValues.id = detail.id;
        initialValues.categoryCode = detail.categoryCode;
        initialValues.categoryName = detail.categoryName;
        initialValues.position = detail.position;
        initialValues.remark = detail.remark;
        initialValues.sortNum = detail.sortNum;
        initialValues.status = detail.status;
        initialValues.twinsFlag = detail.twinsFlag;
        Store.dispatch(initialize('NewCreateFund', initialValues));
        // Store.dispatch(change('NewCreateFund', 'status', 'ENABLE'));
        // Store.dispatch(change('NewCreateFund', 'twinsFlag', 'CREATEINCOME'));
        //Store.dispatch(change('NewCreateFund', 'position', 'BOTH'));
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
    changeP=(item)=>{
      this.setState({
        stateP:item.value,
      })
    }
    renderCre=()=>{
      const {detail} = this.props;
      var a = this.state.stateP || detail.position;
      if (a=='PAYMENT') {
        Store.dispatch(change('NewCreateFund', 'twinsFlag', 'NOINCOME'))
        return (
          <KrField name="twinsFlag" grid={1 / 2} label="否" type="radio" value="NOINCOME"/>

        )
      }else {
        return (
          <div>
            <KrField name="twinsFlag" grid={1 / 2} label="是" type="radio" value="CREATEINCOME"/>
            <KrField name="twinsFlag" grid={1 / 2} label="否" type="radio" value="NOINCOME"/>
          </div>

        )
      }
    }
    render() {
        let style = {
            marginTop: 3,
            width: 564,
        }
        const {error, handleSubmit, pristine, reset} = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit)} style={{
                marginTop: 35,
                marginLeft: 35
            }}>
                <KrField grid={1 / 2} name="categoryCode" right={41} type="text" label="子项编码" requireLabel={true} disabled={true}/>
                <KrField grid={1 / 2} name="sortNum" right={41} type="text" label="顺序号" requireLabel={true}/>
                <KrField grid={1 / 2} name="categoryName" right={41} type="text" label="款项名称" requireLabel={true} maxSize={30}/>
                <KrField grid={1 / 2} name="position" right={41} style={{
                    marginRight: -10,
                }} component="select" label="显示位置" options={[
                    {
                        value: 'BOTH',
                        label: '全部'
                    }, {
                        value: 'PAYMENT',
                        label: '回款'
                    }
                ]} onChange={this.changeP} requireLabel={true}></KrField>
                <KrField grid={1 / 2} name="status" component="group" label="是否启用" requireLabel={true}>
                    <KrField name="status" grid={1 / 2} label="启用" type="radio" value="ENABLE"/>
                    <KrField name="status" grid={1 / 2} label="关闭" type="radio" value="DISENABLE"/>
                </KrField>
                <KrField grid={1 / 2} name="twinsFlag" component="group" label="生成收入" requireLabel={true}>
                    {this.renderCre()}
                </KrField>
                <KrField label="备注" style={style} name="remark" component="textarea" placeholder='请输入备注,输入字数不能超过100字' maxSize={100}/>

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
