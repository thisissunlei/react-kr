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
	ListGroup,
	ListGroupItem,
	SearchForms,
	Message
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
	componentDidMount() {
	}

	chooseCommunity=(item)=>{
		
		if(!item || !item.id){
			State.searchParams.communityId = '';
		}else{
			State.searchParams.communityId = item.id;
		}
	}

	chooseStartTime=(date)=>{
		
		
		if(State.searchParams.endTime && this.getTimeFun(date)>this.getTimeFun(State.searchParams.endTime)){
			Message.error("开始时间不能大于结束时间");
			return;
		}
		State.searchParams.startTime = date;
		

	}

	chooseEndTime=(date)=>{

		if(State.searchParams.startTime && this.getTimeFun(State.searchParams.startTime)>this.getTimeFun(date)){
			Message.error("开始时间不能大于结束时间");
			console.log("DateFormat(State.searchParams.endTime, yyyy-mm-dd)",DateFormat(State.searchParams.endTime, "yyyy-mm-dd"));
			Store.dispatch(change('SearchForm', 'endDate', DateFormat(new Date(), "yyyy-mm-dd")));
			return;
		}
		State.searchParams.endTime = date;

	}

	// 转成时间戳
	getTimeFun=(date)=>{

		var timeDateArr = date.split(" ");
		var timeDate = Date.parse(timeDateArr[0]);
		return timeDate;
	}

	inputCompanyName=(value)=>{
		console.log("State",State);
		State.searchParams.companyName = value.content;
		console.log("State",State);
	}


	render() {

		return (

			<form>

				<div className='search-payment-remind-form'>

					<ListGroup>
						<ListGroupItem>
							<KrField  name="communityId" component="searchCommunityList" label="社区名称：" inline={true} style={{width:244}} onChange={this.chooseCommunity}/>
						</ListGroupItem>

						<ListGroupItem>
							<KrField label="催款日期：" name="startDate" component="date" inline={true} style={{width:244,marginTop:-3}} onChange={this.chooseStartTime} />
						</ListGroupItem>


						<ListGroupItem>
							<div className="search-form-endDate">
								<KrField label="至" name="endDate" component="date" inline={true} style={{width:200,marginTop:-3}} onChange={this.chooseEndTime} />
							</div>
						</ListGroupItem>
						<ListGroupItem>
							<SearchForms placeholder="请输入公司名称" onSubmit={this.inputCompanyName}/>
						</ListGroupItem>
					</ListGroup>

				</div>
			</form>
		);
	}
}


export default reduxForm({
	form: 'SearchForm'
})(SearchForm);
