
import React, {PropTypes} from 'react';
import {reduxForm,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	KrField,
} from 'kr-ui';
import {DateFormat} from 'kr/Utils';
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
		this.getDetailData();
	}
	getDetailData=()=>{
		let {detail} = this.props;
		let params = {
			id:detail.id
		}
		let _this = this;
		Store.dispatch(Actions.callAPI('memberCardView', params)).then(function(response) {
			_this.setState({
				bindInfo:true,
				infoData:response
			})
		}).catch(function(err) {
			if(err.code == '-1'){
				_this.setState({
					bindInfo:false
				})
			}
		 	// Message.error(err.message);
		});
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
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		let communityText = '';
		let {count,bindInfo,infoData} =this.state;
		if(!bindInfo){
			return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:'45px',marginBottom:25}}>
				<p style={{color:'#333',textAlign:'center'}}>暂无绑定信息哟~</p>
			</form>
			)
		}else{
			return (
				<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:'37px',marginBottom:25}}>
					<KrField name="person"  grid={1/1} component="labelText" label="绑定人：" value={infoData.memberName}/>
					<KrField name="phone"  grid={1/1} component="labelText" label="手机号：" value={infoData.boundTel}/>
					<KrField name="bindTime"  grid={1/1} component="labelText" label="绑定时间：" value={DateFormat(infoData.boundTime, "yyyy-mm-dd HH:MM:ss")}/>
			  </form>
			);
		}
	}
}
export default ImportCard = reduxForm({
	form: 'ImportCardForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(ImportCard);
