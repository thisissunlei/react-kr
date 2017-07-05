import React from 'react'; 

import {
	reduxForm
} from 'redux-form';

import {
	Actions,
	Store,
} from 'kr/Redux';

import {
	KrField,
} from 'kr-ui';

import "./index.less";
import {Http} from "kr/Utils";

class SearchForm extends React.Component {


	constructor(props) {
		super(props);

		this.state={
		}

	}

	onStartChange=(value)=>{

		const {
			onStartChange
		} = this.props;

		onStartChange && onStartChange(value);
	}

	onEndChange=(value)=>{

		const {
			onEndChange
		} = this.props;

		onEndChange && onEndChange(value);
	}

	//社区选择
	communityChange = (value) =>{
		const {
			communityChange
		} = this.props;
		communityChange && communityChange(value);
	}

	

	render() {

		let {todayDate}=this.props;
		return (

			<form name="searchFormVisit" className="appointment-visit-form" style={{height:50 }}>

				<div className="searchForm-col" style={{marginTop:"0px",}}>
					<KrField grid={1} label="" name="visitCreateDateBegin" style={{width:"220px"}}  component="date" inline={false} onChange={this.onEndChange} placeholder='日期'/>
				</div>
				<div className="searchForm-col" style={{width:0,position:"relative",left:-17,top:18}}>
					<span>至</span>
				</div>

				<div className="searchForm-col" style={{marginTop:"0px",marginRight:30}}>
					<KrField grid={1} label="" name="visitCreateDateEnd" style={{width:"220px"}} component="date"  inline={false} onChange={this.onStartChange} placeholder='日期'/>
				</div>
				<div className='m-message-community'><KrField style={{marginTop:7}} name="visitCommunity" component="searchCommunityAll"  onChange={this.communityChange} /></div>
			</form>
		);
	}
}

export default reduxForm({
	form: 'searchFormVisit'
})(SearchForm);
