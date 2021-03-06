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


class GoAudit extends React.Component {

	static PropTypes = {
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
	}


	componentDidMount() {


	}

  onSubmit = (form) => {
  	form = Object.assign({},form);
    form.type = this.type;
    Http.request('edit-verify-status', {}, {
    finaVerifyId:this.props.detail.id,
    operateRemark:form.operateRemark || " ",
    type:form.type
    }).then(function(response) {
      Message.success("操作成功");
      window.setTimeout(function() {
          window.location.reload();
      }, 800);
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
  retreat = ()=>{
    this.type = 0;
  }
  audit = ()=>{
    this.type = 1;
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
                    name="operateRemark"
                    component="textarea"
                    label="备注"
                    maxSize={100}
                />
              <div style={{textAlign:'center'}}>
                <div style={{display:'inline-block',marginRight:16}} className='btn-center'><Button  label="同意" type="submit" onClick={this.audit}/></div>
                <div style={{display:'inline-block',marginRight:16}} className='btn-center'><Button  label="退回" type="submit" backgroundColor='#ff6868' onClick={this.retreat}/></div>
                <div style={{display:'inline-block',marginRight:16}} className='btn-center'><Button  label="取消" type="button" cancle={true}  onTouchTap={this.onCancel}/></div>
            </div>
          </form>
      </div>

    );
	}
}

export default reduxForm({
	form: 'GoAudit',
})(GoAudit);
