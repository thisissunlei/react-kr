import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
	initialize,
	change
} from 'redux-form';

import {
	Actions,
	Store
} from 'kr/Redux';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ListGroup,
	ListGroupItem,
	SearchForms,
	ButtonGroup,
	CircleStyleTwo,
	KrDate
} from 'kr-ui';

import './index.less';


class GoAudit extends Component {

	static PropTypes = {
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
	}


	componentDidMount() {


	}

  onSubmit = (form) => {
    console.log(123);
    form.type = this.type;
    console.log("123123",form.type);
  //   Store.dispatch(Actions.callAPI('edit-verify-status', {}, {
  //   finaVerifyId:this.props.detail.id,
  //   operateRemark:form.operateRemark,
  //   type:form.type
  // })).then(function(response) {
  //
  // }).catch(function(err) {});
  }

	onCancel = () => {
		let {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
  retreat = ()=>{
    this.type = 0;
    this.refs.auditForm.submit();
    console.log(this.type);
  }
  audit = ()=>{
    this.type = 1;
    this.refs.auditForm.submit();
  }
	render() {
    const {
      handleSubmit,
    } = this.props;

		return (
      <div className='list-audit'>
          <form onSubmit={handleSubmit(this.onSubmit)} ref="auditForm">
                <KrField
                    style={{width:545}}
                    name="operateRemark"
                    component="textarea"
                    label="备注"
                    maxSize={100}
                />
                <KrField
                  style={{width:548}}
                  name="uploadFileIds"
                  component="file"
                  label="上传附件"
                />
              <div style={{textAlign:'center'}}>
                <div  className='ui-btn-center'><Button  label="同意" onClick={this.audit}/></div>
                <div  className='ui-btn-center'><Button  label="退回" backgroundColor='#ff6868' onClick={this.retreat}/></div>
                <div  className='ui-btn-center'><Button  label="取消" type="button" cancle={true}  /></div>
            </div>
          </form>
      </div>

    );
	}
}

export default reduxForm({
	form: 'GoAudit',
})(GoAudit);
