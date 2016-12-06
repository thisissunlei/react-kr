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

class SearchNotDateForm extends Component {

	static PropTypes = {
		onStartNotChange: React.PropTypes.func,
		onEndNotChange:React.PropTypes.func,
		date_2:React.PropTypes.string,
	}

	constructor(props) {
		super(props);

		

	}
	componentDidMount() {
    
	}
	
    onStartNotChange=(value)=>{
      let values={
      	 startDate:value
      }
      const {
			onStartNotChange
		} = this.props;
		onStartNotChange && onStartNotChange(values);
    }
    onEndNotChange=(value)=>{
      let values={
      	 endDate:value
      }
      const {
			onEndNotChange
		} = this.props;
		onEndNotChange && onEndNotChange(values);
    }

	render() {
      
		const {
			error,
			handleSubmit,
			pristine,
			reset,
			date_2
		} = this.props;

		return (

			<form  style={{marginTop:-9}}>
			   
				<div className='s-date-search'>

				    <ListGroup>
				        <span className='statis-date-title'>时间：</span>
						<ListGroupItem><div className='statis-date-start'><KrField  style={{marginLeft:-10}} name="startDate" component="date" onChange={this.onStartNotChange} placeholder={date_2}/></div></ListGroupItem>
						<div className='ui-line-down-list'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
						<ListGroupItem><div className='statis-date-end'><KrField  name="endDate" component="date" onChange={this.onEndNotChange} placeholder={date_2}/></div></ListGroupItem>
					</ListGroup>
                  
				</div>
			</form>
		);
	}
}


export default reduxForm({
	form: 'SearchNotDateForm'
})(SearchNotDateForm);