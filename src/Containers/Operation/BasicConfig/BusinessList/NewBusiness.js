
import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable,
	toJS
} from 'mobx';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
	Message
} from 'kr-ui';
import './index.less';

 class NewBusiness extends Component{



	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		this.state={
			orderList:[],
		}
	}
	
	componentDidMount(){
	 	 // Store.dispatch(change('NewCustomerList','hasOffice','NOHAS'));
		 // Store.dispatch(change('NewCustomerList','hasOffice','NO'));

	}
	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

    //确定按钮
    onSubmit = () =>{
    	let {onSubmit} = this.props;
    	onSubmit && onSubmit();
    }

	render(){
		const { error, handleSubmit, pristine, reset,dataReady,open,title} = this.props;
		let {orderList}=this.state;
		return (

			<form className="m-newMerchants" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:9}} >
				<div className="title" style={{marginBottom:"30px"}}>
						<div><span className="new-icon"></span><label className="title-text">新建商圈</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>


						
						<KrField grid={1/2}  name="no" style={{width:262,marginLeft:28}} component='input'  label="商圈代码" inline={false}  placeholder='请输入代码名称' requireLabel={true}/>
						<KrField grid={1/2}  name="name" style={{width:262,marginLeft:28}} component='input'  label="商圈名称" inline={false}  placeholder='请输入商圈名称' requireLabel={true}/>

						<KrField grid={1/2} label="区县" name="distinctId"  style={{width:262,marginLeft:28}} component="city"  requireLabel={false} />

						<KrField grid={1/2}  name="companyId" style={{width:262,marginLeft:28}} component='input'  label="客户名称" inline={false}  placeholder='请输入客户名称' requireLabel={true}/>
						<KrField grid={1/2}  name="enable" style={{width:262,marginLeft:28}} component="group" label="启用状态" requireLabel={false}>
							 <KrField name="enable" label="是" type="radio" value="ENABLE" checked={true}/>
							 <KrField name="enable" label="否" type="radio" value="DISABLE" />
						</KrField>

						<Grid style={{marginTop:30}}>
							<Row>
								<Col md={12} align="center" style={{marginLeft:"-27px"}}>
										<div  className='ui-btn-center' style={{marginRight:20,display:"inline-block"}}><Button  label="确定" type="submit"/></div>
									
										<div style={{marginLeft:15,display:"inline-block"}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} /></div>

								</Col>
							</Row>
						</Grid>
				</form>
		);
	}
}
const validate = values =>{
	const errors = {};
	if(!values.companyId){
		errors.companyId = '客户名称不能为空';
	}
	if(!values.staionTypeId){
		errors.staionTypeId = '订单名称不能为空';
	}
	return errors;
}
export default reduxForm({ form: 'NewBusiness',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(NewBusiness);
