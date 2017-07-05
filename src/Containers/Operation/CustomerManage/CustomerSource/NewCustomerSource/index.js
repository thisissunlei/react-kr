
import React, {Component, PropTypes} from 'react';
import {Actions,Store,connect} from 'kr/Redux';
import {
	observer
} from 'mobx-react';
import {
	reduxForm,
	formValueSelector,
	initialize,
	change,
	FieldArray
} from 'redux-form';


import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Notify,
	ButtonGroup,
	Message,
} from 'kr-ui';
import './index.less';
 class NewCustomerSource extends Component{
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
	componentDidMount() {
		Store.dispatch(change('newCustomerSource','enabled',0));
	}
	onCancel = () => {
		const {onCancel} = this.props;
		onCancel && onCancel();
	}

    onSubmit = (values) =>{
        let {onSubmit} = this.props;
        onSubmit && onSubmit(values);
    }

	renderField = ({ input, label, placeholder, meta: { touched, error }}) => (
	<div>
		<label>{label}</label>
		<div>
		<input {...input}  placeholder={label||placeholder}/>
		{touched && error && <span>{error}</span>}
		</div>
	</div>
)
	renderBrights = ({ fields, meta: { touched, error }}) => {
		const self = this;
		 var krStyle={};
			krStyle={width:228,marginLeft:18,marginRight:3,}
			return (
					<ul style={{padding:0,margin:0}}>
					<div style = {{marginLeft:20,marginBottom:20}}>
						<Button  label="添加子项" onTouchTap={() => fields.unshift()} />
					</div>	
					{fields.map((brightsStr, index) =>
					<li key={index} style={{width:600,listStyle:'none'}}>
						<KrField
							style={{width:190,marginLeft:18,marginRight:3,}}
							grid={1/3}
							name={`${brightsStr.name}`}
							type="text"
							component={self.renderField}
							label={index?'':'子项名称'}
							placeholder='子项名称'
							
						/>
						
						
						<KrField
							style={{width:225,marginLeft:0,marginRight:3,}}
							grid={1/3}
							name={`${brightsStr.orderNum}`}
							type="text"
							component={self.renderField}
							label={index?'':'子项编码'}
							placeholder='子项编码'
						/>
						<KrField
							style={{width:90,marginLeft:0,marginRight:3,}}
							grid={1/3}
							name={`${brightsStr.code}`}
							type="text"
							component={self.renderField}
							label={index?'':'子项顺序'}
							placeholder='子项顺序'
						/>
						<span
							className='minusBtn'
							style={!index ? {marginTop:32,marginLeft:8}:{marginTop:16,marginLeft:8}}
							onClick={() => fields.remove(index)}/>
					</li>
				)}
				
			</ul>

		)
	}
	render(){
		const { handleSubmit,select} = this.props;
		const {typeValue} = this.state;
		let fieldStyle = {width:262,marginLeft:28}
		return (

			<form className = 'edit-source-from' onSubmit={handleSubmit(this.onSubmit)} style={{padding:" 35px 45px 45px 45px"}}>
				<div className="title">
						<div><span className="new-icon"></span><label className="title-text">新建客户来源</label></div>
						<div className="customer-close" onClick={this.onCancel}></div>
				</div>
				<div className="cheek">
						<div className="titleBar">
							<span className="order-number">1</span>
							<span className="wire"></span>
							<label className="small-title">基本信息</label>
						</div>
						<div className="small-cheek">
							<KrField 
								grid={1/2} label="来源名称"  
								name="name" 
								style={{width:262,marginLeft:15}} 
								component="input" 
								requireLabel={true}
							/>
							<KrField 
								grid={1/2} 
								label="佣金比例" 
								name="brokerage" 
								style={{width:262,marginLeft:15}} 
								component="input" 
								requireLabel={true}
							/>
							<KrField 
								grid={1/2} 
								label="来源顺序" 
								name="orderNum" 
								style={{width:262,marginLeft:15}} 
								component="input" 
								requireLabel={true}
							/>
							<KrField 
								grid={1/2} 
								label="全员开放" 
								name="enabled" 
								style={{width:262,marginLeft:15,marginRight:13}} 
								component="group" 
								requireLabel={true}
							>
								<KrField 
									name="enabled" 
									label="是" 
									type="radio" 
									value="ENABLE" 
									style={{marginTop:5,display:'inline-block',width:84}}
								/>
								<KrField 
									name="enabled" 
									label="否" 
									type="radio" 
									value="DISENABLE"  
									style={{marginTop:5,display:'inline-block',width:53}}
								/>
							</KrField>
							<div className="middle-round"></div>
						</div>

						<div className="titleBar">
							<span className="order-number">2</span>
							<span className="wire"></span>
							<label className="small-title">自来源信息</label>
						</div>
						<div className="small-cheek" style={{paddingBottom:0}}>

							<FieldArray name="subListStr" component={this.renderBrights}/>

						</div>
						
						<div className="end-round"></div>
				</div>
				<Grid style={{marginTop:30}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>

								<div style = {{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit"/></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
			</form>
		);
	}
}
const validate = values =>{

	const errors = {};
	if(!values.name){

	}else if(values.name.length > 20){

	}
	if (!values.bankAccount || !values.bankAccount.length) {
          errors.bankAccount = { _error: 'At least one member must be entered' }
        } else {
          let membersArrayErrors = []
          values.bankAccount.forEach((porTypes, memberIndex) => {

            let memberErrors = '';
			if(porTypes){
				porTypes = porTypes.toString().replace(/[ /d]/g, '');
			}
			if (!porTypes){
              memberErrors = '请填写银行账户'

			}
            if (porTypes&& (isNaN(porTypes.toString().trim()) || porTypes.toString().trim().length >=30)) {
              memberErrors = '银行卡号必须为数字，且最长为30个数字'

            }
			membersArrayErrors[memberIndex] = memberErrors
          })
        if(membersArrayErrors.length) {
          errors.bankAccount = membersArrayErrors
        }
      }
	return errors;
}
export default reduxForm({ form: 'newCustomerSource',validate})(NewCustomerSource);
