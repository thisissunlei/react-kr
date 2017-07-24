import React, {
	PropTypes
} from 'react';
import {
	reduxForm,
	initialize,
	change
} from 'redux-form';

import {Actions,Store} from 'kr/Redux';

import {
	KrField,
	ListGroup,
	ListGroupItem,
	SearchForms,
	Message,
	Button
} from 'kr-ui';
import "./index.less";
import {DateFormat} from 'kr/Utils';

import State from './State';
import {
	observer
} from 'mobx-react';
@observer

class SearchForm extends React.Component {

	constructor(props) {
		super(props);

	}

	openSearchUpperDialog=()=>{
	     const {
			openSearchUpperDialog
		} = this.props;
		openSearchUpperDialog && openSearchUpperDialog();		
	}

	chooseStartTime=(date)=>{
		
		let {chooseStartTime} = this.props;
		if(State.searchEndDate && this.getTimeFun(date)>this.getTimeFun(State.searchEndDate)){
			Message.error("开始时间不能大于结束时间");
			return;
		}
		State.searchStartDate=date;		
		chooseStartTime && chooseStartTime()

	}

	chooseEndTime=(date)=>{
		let {chooseEndTime} = this.props;
		
		if(State.searchStartDate && this.getTimeFun(State.searchStartDate)>this.getTimeFun(date)){
			Message.error("开始时间不能大于结束时间");
			return;
		}
		 State.searchEndDate= date;		
		chooseEndTime && chooseEndTime();
	}

	// 转成时间戳
	getTimeFun=(date)=>{
		
		var timeDateArr = date.split(" ");
		var timeDate = Date.parse(timeDateArr[0]);
		return timeDate;
	}

	render() {

		return (

			<form>

				<div className='search-data-report-form'>
					<ListGroup>

						<ListGroupItem>
							<KrField label="时间：" name="startDate" component="date" inline={true} style={{width:244,marginTop:-3,zIndex:11}} onChange={this.chooseStartTime} placeholder={DateFormat(new Date() ,"yyyy-mm-dd")}/>
						</ListGroupItem>

						<ListGroupItem>
							<div className="search-form-endDate">
								<KrField label="至" name="endDate" component="date" inline={true} style={{width:200,marginTop:-3,zIndex:11}} onChange={this.chooseEndTime} placeholder={DateFormat(new Date() ,"yyyy-mm-dd")}/>
							</div>
						</ListGroupItem>
						<ListGroupItem><Button searchClick={this.openSearchUpperDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'3'}}/></ListGroupItem>

					</ListGroup>

				</div>
			</form>
		);
	}
}


export default reduxForm({
	form: 'SearchForm'
})(SearchForm);
