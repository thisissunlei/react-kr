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
	
} from 'kr-ui';
import './index.less';

class PlanMapSerarchForm extends React.Component {


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

        const {data}= this.props;

		return (
            
			<form  className="m-agreementList-searchForm" style={{height:30 }}>



                  <KrField grid={1/2} label="社区名称:" component="labelText" value="3443" inline={true} type="labelText"/>
				  
				   {/* <KrField grid={1/2} label="社区名称:" component="labelText" value={data.communityName} inline={true} />
					<KrField grid={1/2} label="楼层:" component="labelText" value={data.communityName} inline={true} />
				
					<KrField grid={1/2} label="" name="createDateEnd" style={{marginLeft:28,width:"130px"}} component="date"  inline={true} onChange={this.onEndChange} placeholder='日期'/>
			
				
					<KrField grid={1/2} label="" name="createDateBegin" style={{marginLeft:28,width:"130px"}}  component="date" inline={true} onChange={this.onStartChange} placeholder='日期'/>
			*/}
			
				

			</form>



		);
	}
}

export default reduxForm({
	form: 'PlanMapSerarchForm'
})(PlanMapSerarchForm);
