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
import './index.less';
import State from './State';
@observer
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
	  let values={
      	 createDateBegin:value
      }
      const {
			onStartChange
		} = this.props;
		onStartChange && onStartChange(values);
    }
    //日期结束
     onEndChange=(value)=>{
      let values={
      	 createDateEnd:value
      }
      const {
			onEndChange
		} = this.props;
		onEndChange && onEndChange(values);
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
			
			<form name="searchForm" className="m-agreementList-searchForm" style={{height:30 }}>
				<div className="searchForm-col" style={{marginTop:"7px"}}>
				    <SearchForms placeholder='请输入关键字' searchFilter={options} onSubmit={this.onSearchSubmit} onFilter={this.onFilter}/>
				</div>
				<div className="searchForm-col" style={{marginTop:"0px",marginRight:10}}>
					<KrField grid={1/2} label="" name="createDateBegin" style={{marginLeft:28,width:"253px"}}  component="date" inline={true} onChange={this.onEndChange} placeholder={todayDate}/>
				</div>
				<div className="searchForm-col" style={{marginTop:"-40px",position:"relative",left:30,top:50}}>
					<span>至</span>
				</div>

				<div className="searchForm-col" style={{marginTop:"0px"}}>
					<KrField grid={1/2} label="" name="createDateEnd" style={{marginLeft:28,width:"253px"}} component="date"  inline={true} onChange={this.onStartChange} placeholder={todayDate}/>

				</div>
				<div className="searchForm-col" style={{marginTop:"8px",marginRight:"-38px"}}>
					<span>时间:</span>
				</div>
			
			</form>



		);
	}
}

export default reduxForm({
	form: 'SearchForm'
})(SearchForm);
