import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector
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
	ButtonGroup,
	ListGroup,
	ListGroupItem
} from 'kr-ui';

import './index.less';

class SearchDateForm extends Component {

	static PropTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

		

	}
	componentDidMount() {

		var _this = this;
		Store.dispatch(Actions.callAPI('getFinaDataCommunityAndMainBillType')).then(function(response) {
        
		}).catch(function(err) {
			Notify.show([{
				message: '报错了',
				type: 'danger',
			}]);
		});


	}
	onSubmit(values) {
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(values);
	}

	onCancel() {
		const {
			onCancel
		} = this.props;

		onCancel && onCancel();

	}

	render() {



		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;

		return (

			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:-9}}>
			   
				<div className='s-date-search'>
				    <ListGroup>
						<ListGroupItem><div className='statis-date-start'><KrField  right={6} style={{marginLeft:-10}} name="startDate" component="date" /></div></ListGroupItem>
						<div className='ui-line-down-list'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
						<ListGroupItem><div className='statis-date-end'><KrField  right={6} name="endDate" component="date" /></div></ListGroupItem>
					</ListGroup>
                  
				</div>
			</form>
		);
	}
}


export default reduxForm({
	form: 'SearchDateForm'
})(SearchDateForm);