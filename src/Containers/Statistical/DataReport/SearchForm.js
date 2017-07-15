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
	componentDidMount() {
		
	}

	componentWillReceiveProps(nextProps){
		
	}

	openSearchUpperDialog=()=>{
	     const {
			openSearchUpperDialog
		} = this.props;
		openSearchUpperDialog && openSearchUpperDialog();		
	}


	chooseCommunity=(item)=>{
		
		if(!item || !item.id){
			State.searchParams.communityId = '';
		}else{
			State.searchParams.communityId = item.id;
		}
		State.searchParams.page = 1;
		$(".table-box").eq(0).scrollTop(0);
		State.getList();
	}

	chooseStartTime=(date)=>{
		
		
		if(State.searchParams.endDate && this.getTimeFun(date)>this.getTimeFun(State.searchParams.endDate)){
			Message.error("开始时间不能大于结束时间");
			return;
		}
		State.searchParams.beginDate = date;
		State.searchParams.page = 1;
		$(".table-box").eq(0).scrollTop(0);
		State.getList();

	}

	chooseEndTime=(date)=>{

		if(State.searchParams.beginDate && this.getTimeFun(State.searchParams.beginDate)>this.getTimeFun(date)){
			Message.error("开始时间不能大于结束时间");
			return;
		}
		State.searchParams.endDate = date;
		State.searchParams.page = 1;
		$(".table-box").eq(0).scrollTop(0);
		State.getList();

	}
	
	inputCompanyName=(value)=>{
		
		State.searchParams.companyName = value.content;
		State.searchParams.page = 1;
		$(".table-box").eq(0).scrollTop(0);
		State.getList();
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
							<KrField label="催款日期：" name="startDate" component="date" inline={true} style={{width:244,marginTop:-3,zIndex:11}} onChange={this.chooseStartTime}/>
						</ListGroupItem>

						<ListGroupItem>
							<div className="search-form-endDate">
								<KrField label="至" name="endDate" component="date" inline={true} style={{width:200,marginTop:-3,zIndex:11}} onChange={this.chooseEndTime} />
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
