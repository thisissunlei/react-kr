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


class Handle extends React.Component {

	static PropTypes = {
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
	}


	componentDidMount() {


	}

  onSubmit = (form) => {
  	let {detail,onSubmit}=this.props
  	form.id=detail.id
    Http.request('opinion-handle', {},form).then(function(response) {
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
                    name="resultDesc"
                    component="textarea"
                    label="备注"
                    maxSize={100}
                    requireLabel={true}
                />
              <div style={{textAlign:'center',marginBottom:10}}>
                <div  className='ui-btn-center'>
                  <Button  label="确定"  type="submit"/>
                  <Button  label="取消" type="button" cancle={true} onClick={this.onCancel} />
                </div>
              </div>
          </form>
      </div>

    );
	}
}

export default reduxForm({
	form: 'handle',
})(Handle);
