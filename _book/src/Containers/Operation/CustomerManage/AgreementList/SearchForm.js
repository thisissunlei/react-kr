import React from 'react';

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
	KrField,
	SearchForms,
} from 'kr-ui';
import './index.less';
import State from './State';
@observer
class SearchForm extends React.Component {


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
	//合同类型
   contractChange=(value)=>{
		   const {
		   contractChange
	     } = this.props;
	    contractChange && contractChange(value);
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

			<form name="searchForm" className="m-agreementList-searchForm" style={{height:30 }}>

				<div className="searchForm-col" style={{marginTop:"8px"}}>
				    <SearchForms placeholder='请输入关键字' searchFilter={options} onSubmit={this.onSearchSubmit} onFilter={this.onFilter}/>
				</div>
				<div className="searchForm-col" style={{marginTop:"2px",marginRight:20}}>
					<KrField grid={1/2} label="" name="createDateEnd" style={{marginLeft:28,width:"130px"}} component="date"  inline={true} onChange={this.onEndChange} placeholder='日期'/>
				</div>
				<div className="searchForm-col" style={{marginTop:"-40px",position:"relative",left:35,top:53}}>
					<span>至</span>
				</div>
				<div className="searchForm-col" style={{marginTop:"2px"}}>
					<KrField grid={1/2} label="" name="createDateBegin" style={{marginLeft:28,width:"130px"}}  component="date" inline={true} onChange={this.onStartChange} placeholder='日期'/>
				</div>
				<div className="searchForm-col" style={{marginTop:"12px",marginRight:"-38px"}}>
					<span>创建时间:</span>
				</div>
				<div className='m-contract'><KrField grid={1/2}  style={{width:"240px",marginTop:'5px',float:'right',marginRight:5,lineHeight:'25px'}} name="contractType" type="select" label="合同类型：" inline={true}
						options={[{label:'承租意向书',value:'INTENTION'},{label:'入驻协议书',value:'ENTER'},{label:'增租协议书',value:'ADDRENT'},{label:'减租协议书',value:'LESSRENT'},{label:'退租协议书',value:'QUITRENT'},{label:'续租协议书',value:'RENEW'}]}
						onChange={this.contractChange}
				/>
				</div>

			</form>



		);
	}
}

export default reduxForm({
	form: 'SearchForm'
})(SearchForm);
