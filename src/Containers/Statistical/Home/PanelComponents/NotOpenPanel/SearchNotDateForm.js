import React from 'react';

import { reduxForm } from 'redux-form';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ListGroup,
	ListGroupItem
} from 'kr-ui';

import './index.less';

class SearchNotDateForm extends React.Component {

	static defaultProps = {
			todayDate:'2017-1-1'
	}

	static propTypes = {
		todayDate:React.PropTypes.string,
		onStartNotChange: React.PropTypes.func,
		onEndNotChange:React.PropTypes.func,
		todayDate:React.PropTypes.string,
	}

	constructor(props) {
		super(props);

	}


	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset,
			todayEndDate,
			yesterday,
			today
		} = this.props;



		return (

			<form  style={{marginTop:-9}}>

				<div className='s-date-search'>
				    <ListGroup>
				        <span className='statis-date-title'>时间：</span>
						<ListGroupItem><div className='statis-date-start'><KrField  style={{marginLeft:-10}} name="startDate" component="date" onChange={this.props.onStartNotChange}  dateNoSecond='true' placeholder={yesterday} /></div></ListGroupItem>
						<div className='ui-line-down-list'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
						<ListGroupItem><div className='statis-date-end'><KrField  name="endDate" component="date" onChange={this.props.onEndNotChange} placeholder={yesterday} dateNoSecond='true'  /></div></ListGroupItem>
					</ListGroup>
				</div>
			</form>
		);
	}
}


export default reduxForm({
	form: 'SearchNotDateForm'
})(SearchNotDateForm);
