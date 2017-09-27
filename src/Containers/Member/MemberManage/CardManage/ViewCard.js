
import React, {PropTypes} from 'react';
import {reduxForm,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {
	KrField,
} from 'kr-ui';
import {DateFormat} from 'kr/Utils';
import "./index.less";

class ImportCard extends React.Component{
	constructor(props){
		super(props);

		this.state={
			beginCard:0,
			endCard:0,
			count:'0',
			infoData:{},
			bindInfo:false,
			communityText:'',
			companyText:'',
			selectSourceOption:[],
			searchForm:false,
			searchParams:{

			},
		}
	}

	
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	 onSubmit=(values)=>{
		 // const {onSubmit} = this.props;
		 // onSubmit && onSubmit(values);
	 }

	render(){
		const { error, handleSubmit, pristine, reset,content,filter,detail} = this.props;
		let communityText = '';
		let {count,bindInfo,infoData} =this.state;
		
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{padding:25}} className="see-detail-form">
				
				<KrField name="active"  grid={1/2} component="labelText" label="是否激活：" value={detail.active?"已激活":"未激活"}/>
				<KrField name="memberName"  grid={1/2} component="labelText" label="持卡人：" value={detail.memberName}/>
				

				<KrField name="communityName"  grid={1/2} component="labelText" label="社区名称：" value={detail.communityName}/>
				<KrField name="customerName"  grid={1/2} component="labelText" label="客户名称：" value={detail.customerName}/>
		  	
				<KrField name="outerCode"  grid={1/2} component="labelText" label="卡外码：" value={detail.outerCode}/>
				<KrField name="innerCode"  grid={1/2} component="labelText" label="卡内码：" value={detail.innerCode}/>
				
				<KrField name="cTime"  grid={1/2} component="labelText" label="入库时间：" value={DateFormat(detail.cTime, "yyyy-mm-dd HH:MM:ss")}/>
				<KrField name="holdAt"  grid={1/2} component="labelText" label="绑定时间："  value={DateFormat(detail.holdAt, "yyyy-mm-dd HH:MM:ss")}/>
				<span className="see-detail-memo-box">
					<KrField name="memo"  grid={1/1} component="labelText" label="备注：" value={detail.memo}/>
				</span>
		  </form>
		);
		
	}
}
export default ImportCard = reduxForm({
	form: 'ImportCardForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(ImportCard);
