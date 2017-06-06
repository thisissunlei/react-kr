import React, {
	PropTypes
} from 'react';
import {
	reduxForm,
	change
} from 'redux-form';

import {
	Actions,
	Store
} from 'kr/Redux';
import {
	KrField,
	SearchForms,
	Message,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
} from 'kr-ui';
import "./index.less";
import {DateFormat} from 'kr/Utils';

import State from './State';
import {
	observer
} from 'mobx-react';
@observer

class IntroduceForm extends React.Component {

	constructor(props) {
		super(props);

	}
	componentDidMount() {
	}

	render() {

		return (

			<form>

				<div className='introduce-form'>

					<KrField component="textarea" label="备注" name="introduce" onChange={this.changeIntroduce}/>
					<div className="tip">注：确定此缴款已开票，点击“确定”后，无法修改发票状态</div>
					<Grid style={{marginTop:18,marginBottom:'4px'}}>
						<Row>
							<ListGroup>
								<ListGroupItem style={{width:'269px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"/></ListGroupItem>
								<ListGroupItem style={{width:'254px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} /></ListGroupItem>
							</ListGroup>					
						</Row>
					</Grid>
				</div>
			</form>
		);
	}
}


export default reduxForm({
	form: 'IntroduceForm'
})(IntroduceForm);
