
import React, {Component, PropTypes} from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import {reduxForm,formValueSelector,initialize,change} from 'redux-form';

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
 class EditCustomerSource extends Component{
	static PropTypes = {
		onSubmit:React.PropTypes.func,
		onCancel:React.PropTypes.func,
	}

	constructor(props){
		super(props);
		this.state={
			typeValue:this.props.typeValue,
		}
	}

	componentDidMount(){
	}

	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

    onSubmit = (values) =>{
        let {onSubmit} = this.props;
        onSubmit && onSubmit(values);
    }
	render(){
		const { handleSubmit,select} = this.props;
		const {typeValue} = this.state;
		return (

			<form className="m-newMerchants" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:9}} >
				<div className="title" style={{marginBottom:"30px"}}>
						<div><span className="new-icon"></span><label className="title-text">编辑访客</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
						<KrField grid={1/2} name="communityId" style={{width:262,marginLeft:28}} component='searchCommunityAll'  label="社区" inline={false}/>
            			<KrField grid={1/2}  name="name" style={{width:262,marginLeft:28}} component='input'  label="姓名" inline={false}  placeholder='请输入姓名' requireLabel={true}/>
						<KrField grid={1/2}  name="tel" style={{width:262,marginLeft:28}} component='input'  label="联系方式" inline={false}  placeholder='请输入联系方式' requireLabel={true}/>
            			<KrField grid={1/2}  name="email" style={{width:262,marginLeft:28}} component='input'  label="邮箱" inline={false}  placeholder='请输入邮箱' requireLabel={true}/>
						<KrField grid={1/2}  name="vtime" style={{width:262,marginLeft:28}} component='date'  label="拜访日期" inline={false}  placeholder='请选择拜访时间' requireLabel={true}/>
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

	return errors;
}
export default reduxForm({ form: 'editCustomerSource',validate})(EditCustomerSource);
