import React from 'react';
import {reduxForm} from 'redux-form';
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
} from 'kr-ui';
import  State from "./SignedClient/State";

@observer
 class CustomerNameNext extends React.Component{

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


	//下一步被点击
	onSubmit = (value) => {
		const {onSubmit} = this.props;
		onSubmit && onSubmit(value);
	}

	//下一步取消
	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	};

  //客户名称改变
	searchSignChange=(value)=>{
	  State.companyName=value.label;
	}

	render(){
		const { error, handleSubmit, pristine, reset,dataReady,open} = this.props;
		let {orderList}=this.state;
		return (
          <div>
			<form className="m-newMerchants" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:9}} >
				<div className="title" style={{marginBottom:"30px"}}>
						<div><span className="new-icon"></span><label className="title-text">新建订单</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
						<KrField  grid={1/2}  name="companyId" style={{width:262,display:'block',margin:'0 auto'}} component='searchSignCompany'  label="客户名称" inline={false}  placeholder='请输入客户名称' onChange={this.searchSignChange} requireLabel={true}/>

						<Grid style={{marginTop:30}}>
							<Row>
								<Col md={12} align="center">
										<div  className='ui-btn-center' style={{marginRight:20,display:"inline-block"}}><Button  label="下一步" type="submit"/></div>
										<div style={{marginLeft:15,display:"inline-block"}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} /></div>
								</Col>
							</Row>
						</Grid>
				</form>


			</div>
		);
	}
}
const validate = values =>{
	const errors = {};
	if(!values.companyId){
		errors.companyId = '客户名称不能为空';
	}
	return errors;
}
export default reduxForm({ form: 'CustomerNameNext',validate,enableReinitialize:true,keepDirtyOnReinitialize:true})(CustomerNameNext);
