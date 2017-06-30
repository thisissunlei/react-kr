import React, {
	Component,
	PropTypes
} from 'react';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';

import {
	Actions,
	Store,
	connect
} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import {
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Button,
	KrDate,
	DotTitle,
	ButtonGroup,
	Paper,
	ListGroup,
	ListGroupItem,
	SearchDateForm,
	SearchForms,
	Message
} from 'kr-ui';
import {Http} from "kr/Utils";
import "./index.less";
class SearchForm extends Component {


	constructor(props) {
		super(props);
		this.state={
		}
	}
  //日期开始
	onStartChange=(value)=>{
    const {
			onStartChange
		} = this.props;
		onStartChange && onStartChange(value);
  }
  //日期结束
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

			<form name="infoSearchForm" className="appointment-visit-form" style={{height:50 }}>

				<div className="searchForm-col" style={{marginTop:"0px",}}>
					<KrField grid={1} label="" name="infoCreateDateBegin" style={{width:"220px"}}  component="date" inline={false} onChange={this.onEndChange} placeholder='日期'/>
				</div>
				<div className="searchForm-col" style={{width:0,position:"relative",left:-17,top:18}}>
					<span>至</span>
				</div>

				<div className="searchForm-col" style={{marginTop:"0px",marginRight:30}}>
					<KrField grid={1} label="" name="infoCreateDateEnd" style={{width:"220px"}} component="date"  inline={false} onChange={this.onStartChange} placeholder='日期'/>

				</div>
				<div className='m-message-community'><KrField style={{marginTop:7}} name="infoCommunity" component="searchCommunityAll"  onChange={this.communityChange} /></div>


			</form>



		);
	}
}

export default reduxForm({
	form: 'infoSearchForm'
})(SearchForm);
