import React from 'react';

import {
	reduxForm,
} from 'redux-form';
import {
	Http
} from "kr/Utils";
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
  	Message,
	ButtonGroup,
	CircleStyleTwo,
	KrDate
} from 'kr-ui';

import './index.less';


class AuditDialog extends React.Component {

	static PropTypes = {
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
	}


	componentDidMount() {


	}

  onSubmit = (form) => {
		const {detail,onSubmit}=this.props;
		form.companyId = detail.companyId;
    Http.request('verification-failed', {},form ).then(function(response) {
      Message.success("操作成功");
      onSubmit && onSubmit();
    }).catch(function(err) {
			Message.error(err.message);
		});
  }

	onCancel = () => {
		let {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
  
	render() {
    const {
      handleSubmit,
    } = this.props;

		return (
      <div className='list-audit'>
          <form onSubmit={handleSubmit(this.onSubmit)}>
                <KrField
                    style={{width:600,marginTop:18}}
                    name="remark"
                    component="textarea"
                    label="备注"
                    maxSize={100}
                />
              <div style={{textAlign:'center'}}>
                <div style={{display:'inline-block',marginRight:16}} className='btn-center'><Button  label="确定" type="submit" onClick={this.audit}/></div>
                <div style={{display:'inline-block',marginRight:16}} className='btn-center'><Button  label="取消" type="button" cancle={true}  onTouchTap={this.onCancel}/></div>
            </div>
          </form>
      </div>

    );
	}
}

export default reduxForm({
	form: 'AuditDialog',
})(AuditDialog);
