import React from 'react';
import {Actions, Store} from 'kr/Redux';
import {reduxForm, initialize} from 'redux-form';
import {
    Button,
    Grid,
    Row,
    Col,
    KrField,
    Message,
    ButtonGroup
} from 'kr-ui';

class ShiftBtnForm extends React.Component {

    static PropTypes = {
        shiftData: React.PropTypes.arr,
        initialValuesId: React.PropTypes.object
    }

    constructor(props, context) {
        super(props, context);
        this.onCancel = this.onCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {}
    }

    componentDidMount() {
        let initialValues = {
            flowId: this.props.initialValuesId.id,
            preCode: '1'
        }
        Store.dispatch(initialize('shiftBtnForm', initialValues));

    }

    onSubmit(values) {
        const {onSubmit} = this.props;
        onSubmit && onSubmit(values);

    }

    onCancel() {
        const {onCancel} = this.props;
        onCancel && onCancel();
    }

    moneyShiftCheck = (value) => {
        if (value && isNaN(value)) {
            Message.error('金额只能为数字');
            return;
        }
        if (value && value <= 0) {
            Message.error('金额只能为正数');
            return;
        }
    }

    renderShiftData = () => {

        let {shiftData} = this.props;
        return shiftData.map((item, index) => {

            if (index % 2 == 0) {
                return <KrField key={index} style={{
                    marginBottom: 5
                }} grid={1 / 2} right={43} style={{
                    marginLeft: '-14px'
                }} label={item.categoryName} component="input" name={'fix' + item.id} type="text" onBlur={this.moneyShiftCheck}/>
            } else {
                return <KrField key={index} style={{
                    marginBottom: 5
                }} grid={1 / 2} right={43} label={item.categoryName} component="input" name={'fix' + item.id} type="text" onBlur={this.moneyShiftCheck}/>
            }

        })

    }

    render() {

        let heightStyle = {
            width: '546',
            height: '72'
        }

        const {
            error,
            handleSubmit,
            pristine,
            reset,
            initialValuesId,
            shiftData
        } = this.props;

        return (
            <div style={{
                marginTop: '35px'
            }}>

                <form onSubmit={handleSubmit(this.onSubmit)} style={{
                    marginLeft: '30px'
                }}>

                    <KrField name="flowId" type="hidden"/>
                    <KrField grid={1 / 2} label="可操作金额" component="labelText" value={initialValuesId.fiMoney} inline={false} defaultValue="0"/>
                    <KrField name="preCode" grid={1 / 2} left={30} component="group" label="金额正负" style={{
                        marginLeft: '-45px'
                    }} requireLabel={true}>
                        <KrField name="preCode" grid={1 / 2} right={30} label="正" component="radio" type="radio" value="0" style={{
                            marginTop: '4px',
                            width: 'auto',
                            display: 'inline-block'
                        }}/>
                        <KrField label="负" name="preCode" grid={1 / 2} left={30} component="radio" type="radio" value="1"/>
                    </KrField>
                    <KrField type="date" grid={1 / 2} label="转移日期" right={45} name="operatedate" requireLabel={true}/> {this.renderShiftData()}

                    <KrField label="上传附件" grid={1 / 2} name="fileids" style={{
                        marginLeft: -15
                    }} component="file" defaultValue={[]}/>

                    <div style={{
                        marginTop: -15
                    }}><KrField label="备注" grid={1} heightStyle={heightStyle} name="finaflowdesc" component="textarea" type="text" placeholder='请输入备注，输入字数不能超过100字' maxSize={100} lengthClass='ui-length-text'/></div>

                    <Grid style={{
                        marginTop: 0,
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
            </div>

        );

    }

}

const validate = values => {

    const errors = {}
    if (!values.operatedate) {
        errors.operatedate = '请填写转移日期';
    }
    return errors
}

export default reduxForm({form: 'shiftBtnForm', validate, enableReinitialize: true, keepDirtyOnReinitialize: true})(ShiftBtnForm);
