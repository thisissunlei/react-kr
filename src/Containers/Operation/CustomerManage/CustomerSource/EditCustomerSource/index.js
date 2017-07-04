
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
		let fieldStyle = {width:262,marginLeft:28}
		return (

			<form className="m-newMerchants" onSubmit={handleSubmit(this.onSubmit)} style={{paddingLeft:9}} >
				<div className="title" style={{marginBottom:"30px"}}>
					<div>
						<span className="new-icon"></span>
						<label className="title-text">编辑客户来源</label>
					</div>
					<div className="customer-close" onClick={this.onCancel}></div>
				</div>
					<KrField 
						grid={1/2} 
						name="communityId" 
						style={fieldStyle} 
						component='searchCommunityAll'  
						label="名称" 
						inline={false}
					/>
					<KrField 
						grid={1/2}  
						name="name" 
						style={fieldStyle} 
						component='input'  
						label="编码" 
						inline={false}  
						placeholder='请输入姓名' 
						requireLabel={true}
					/>
					<KrField 
						grid={1/2}  
						name="tel" 
						style={fieldStyle} 
						component='input'  
						label="子项" 
						inline={false}  
						requireLabel={true}
					/>
					<KrField 
						grid={1/2}  
						name="email" 
						style={fieldStyle} 
						component='input'  
						label="佣金" 
						inline={false}   
						requireLabel={true}
					/>
					<KrField 
						grid={1/2}  
						name="vtime" 
						style={fieldStyle} 
						component='date'  
						label="新建编辑时候是否可选" 
						inline={false}  
						requireLabel={true}
					/>
					<KrField 
						grid={1/2}  
						name="vtime" 
						style={fieldStyle} 
						component='date'  
						label="顺序" 
						inline={false}  
						requireLabel={true}
					/>
					<Grid style={{marginTop:30}}>
						<Row>
							<Col md={12} align="center" style={{marginLeft:"-27px"}}>
								<div  className='ui-btn-center' 
									  style={{
										   marginRight:20,
										   display:"inline-block"
										   }}
								>
									<Button  label="确定" type="submit"/>
								</div>
								<div style={{
									marginLeft:15,display:"inline-block"
									}}
								>
									<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
								</div>
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
