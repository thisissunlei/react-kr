import React, {
	PropTypes
} from 'react';
import {
	reduxForm,
} from 'redux-form';

import {
	KrField,
	ListGroup,
	ListGroupItem
} from 'kr-ui';

import './index.less';

class SearchDateForm extends React.Component {

	static defaultProps = {
			todayDate:'2017-1-1'
	}
	static PropTypes = {
		onStartChange: React.PropTypes.func,
		onEndChange:React.PropTypes.func,
		date_2:React.PropTypes.string,
	}

	constructor(props) {
		super(props);



	}
	componentDidMount() {


	}

    onStartChange=(value)=>{
      let values={
      	 startDate:value
      }
      const {
			onStartChange
		} = this.props;
		onStartChange && onStartChange(values);
    }
    onEndChange=(value)=>{
      let values={
      	 endDate:value
      }
      const {
			onEndChange
		} = this.props;
		onEndChange && onEndChange(values);
    }

	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset,
			date_2,
			yesterday,
			today,
			todayEndDate
		} = this.props;



		return (

			<form  style={{marginTop:-9}}>

				<div className='s-date-search'>

					<ListGroup>
							<span className='statis-date-title'>时间：</span>

					<ListGroupItem><div className='statis-date-start'><KrField  style={{marginLeft:-10}} name="startDate" component="date" onChange={this.props.onStartChange}  dateNoSecond='true' placeholder={yesterday}/></div></ListGroupItem>
					<div className='ui-line-down-list'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
					<ListGroupItem><div className='statis-date-end'><KrField  name="endDate" component="date" onChange={this.props.onEndChange} placeholder={yesterday} dateNoSecond='true' /></div></ListGroupItem>
				</ListGroup>

				</div>
			</form>
		);
	}
}


export default reduxForm({
	form: 'SearchDateForm'
})(SearchDateForm);
