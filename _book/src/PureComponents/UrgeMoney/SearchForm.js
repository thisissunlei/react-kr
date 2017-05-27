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
			communityIdList : [],
		}
		this.getcommunity();
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

	 //
	 getcommunity = () => {
		let _this = this;
		let {communityIdList} = this.state;
		Http.request('getCommunity').then(function(response) {

			communityIdList = response.communityInfoList.map(function(item, index) {

				item.value = item.id;
				item.label = item.name;
				return item;
			});
			communityIdList.unshift({
				label: '请选择',
				value: '0'
			});

			_this.setState({
				communityIdList,
			});


		}).catch(function(err) {



		});
	}

	render() {

		let {todayDate}=this.props;
		let {communityIdList} = this.state;
		return (

			<form name="searchFormUrge" className="appointment-visit-form" style={{height:50 }}>

				<div className="searchForm-col" style={{marginTop:"0px",}}>
					<KrField grid={1} label="" name="urgeCreateDateBegin" style={{width:"220px"}}  component="date" inline={false} onChange={this.onEndChange} placeholder='日期'/>
				</div>
				<div className="searchForm-col" style={{width:0,position:"relative",left:-17,top:18}}>
					<span>至</span>
				</div>

				<div className="searchForm-col" style={{marginTop:"0px",marginRight:30}}>
					<KrField grid={1} label="" name="urgeCreateDateEnd" style={{width:"220px"}} component="date"  inline={false} onChange={this.onStartChange} placeholder='日期'/>

				</div>
				<KrField style={{width:222,marginLeft:-44,position:"absolute",marginTop:7}} name="urgeCommunity" component="select" search={true}  options={communityIdList} onChange={this.communityChange} />


			</form>



		);
	}
}

export default reduxForm({
	form: 'searchFormUrge'
})(SearchForm);
