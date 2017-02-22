import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector,initialize,change} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
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
@observer
 class NewCustomerList extends Component{



	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
	}
	
	componentDidMount(){
	 	// Store.dispatch(change('NewCustomerList','hasOffice','NOHAS'));
		 // Store.dispatch(change('NewCustomerList','hasOffice','NO'));

	}
	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

	render(){
		const { error, handleSubmit, pristine, reset,dataReady,open} = this.props;

		return (

			<form className="m-newMerchants" style={{paddingLeft:9}} >
				<div className="title" style={{marginBottom:"30px"}}>
						<div><span className="new-icon"></span><label className="title-text">新建客户</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
				
						<KrField grid={1/2} label="客户名称" name="sourceId" style={{width:262,marginLeft:15}} component="select"
								options={[]}
								requireLabel={true}
						/>



						<KrField grid={1/2} label="订单名称" name="staionTypeId" component="select" style={{width:262,marginLeft:28}}
								options={[]}
								requireLabel={true}
						/>

						<Grid style={{marginTop:30}}>
							<Row>
								<Col md={12} align="center" style={{marginLeft:"-27px"}}>
										<div  className='ui-btn-center' style={{marginRight:20,display:"inline-block"}}><Button  label="下一步" type="submit"/></div>
									
										<div style={{marginLeft:15,display:"inline-block"}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} /></div>

								</Col>
							</Row>
						</Grid>
				</form>
		);
	}
}
const validate = values =>{


		
		return errors
	}
export default reduxForm({ form: 'NewCustomerList',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(NewCustomerList);
