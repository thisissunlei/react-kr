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
import "./index.less";
class SearchForm extends Component {


	constructor(props) {
		super(props);
	}


   //搜索下拉
	onSearchSubmit=(value)=>{
      const {
			onSearchSubmit
		} = this.props;
		onSearchSubmit && onSearchSubmit(value);
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


	render() {

		let {todayDate}=this.props;

		let options=[
		 {label:'公司名称',value:'company'},
		 {label:'城市',value:'city'},
		 {label:'社区',value:'community'},
		 {label:'销售员',value:'people'},
		 {label:'录入人',value:'write'},
		]

		return (

			<form name="searchForm" className="appointment-visit-form" style={{height:50 }}>

				<div className="searchForm-col" style={{marginTop:"0px"}}>
					<KrField grid={1} label="" name="transferDateBegin" style={{width:"220px"}}  component="date" inline={false} onChange={this.onEndChange} placeholder='日期'/>
				</div>
				<div className="searchForm-col" style={{width:0,position:"relative",left:-17,top:19}}>
					<span>至</span>
				</div>

				<div className="searchForm-col" style={{marginTop:"0px",marginRight:30}}>
					<KrField grid={1} label="" name="transferDateEnd" style={{width:"220px"}} component="date"  inline={false} onChange={this.onStartChange} placeholder='日期'/>

				</div>


			</form>



		);
	}
}

export default reduxForm({
	form: 'SearchForm'
})(SearchForm);
