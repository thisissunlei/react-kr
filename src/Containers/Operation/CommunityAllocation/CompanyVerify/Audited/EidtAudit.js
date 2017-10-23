import React from 'react';
import {
	Http,
	DateFormat
} from 'kr/Utils';
import {
	reduxForm,
	change,
	initialize
} from 'redux-form';
import {
	Actions,
	Store,
	dispatch
} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	ButtonGroup,
	Button,
	Message,
	KrDate,
} from 'kr-ui';
import './index.less';
import HeaderUpload from './../HeaderUpload';


class EditAudit extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			imgUrl:'',
			IfUrl:false,
		}
		
	}
	
	componentDidMount() {
		let {detail}=this.props;
		this.setState({
			imgUrl:detail.logo
		})
		Store.dispatch(initialize('editAudit', detail));

	}
	
	
	
	onSubmit=(form)=>{
		let {onSubmit} = this.props;
		let {imgUrl} = this.state;
		var _this=this;
		form.logo=imgUrl;
		Http.request('verification-edit',{},form).then(function(response) {
			Message.success('修改成功')
			onSubmit && onSubmit();
		}).catch(function(err) {
			Message.error(err.message);
		});
    }
    
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	addHeaderLeaderUrl=(result,index)=>{
		this.setState({
			imgUrl:result
		})
	}

	render() {
			const {
				error,
				handleSubmit,
				pristine,
				reset,
				detail
			} = this.props;
			let {
				imgUrl,
				IfUrl
			}=this.state;
		
		return (
			<div className="g-audit-drawer">
				<div className="u-create-title">
						<div className="title-text">编辑审核信息</div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<form className="g-audit-edit" ref="form" onSubmit={handleSubmit(this.onSubmit)} >
							<KrField
                                style={{width:260,marginRight:25}}
								name="compnayName"
								type="text"
								component="input"
								label="公司名称"
								requireLabel={true}
						 	/>
						 	<KrField
								style={{width:260,marginRight:25}}
								name="shortName"
                                component="input"
								label="公司简称"
								requireLabel={true}
								onChange={this.selectType}
						 	/>
							 <div className="u-photo-box">
								<span className="u-photo-title"><span className="u-photo-symbol">*</span>公司Logo</span>
								<HeaderUpload 
							 		defaultUrl={imgUrl} 
									onChange={this.addHeaderLeaderUrl} 
									index={0}
								/>
								{IfUrl?<span className="u-photo-error">请选择公司Logo</span>:""}
							</div>
						 	

						<Grid style={{marginTop:50,width:'81%'}}>
						<Row >
						<Col md={12} align="center">
							<ButtonGroup>
								<Button  label="确定" type="submit" />
								<Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/>
							</ButtonGroup>
						  </Col>
						</Row>
						</Grid>
						
				</form>
			</div>
		);
	}
}
const validate = values => {

		const errors = {};

		if (!values.compnayName) {
			errors.compnayName = '请填写公司名称';
		}
		if (values.compnayName && values.compnayName.length>50) {
			errors.compnayName = '公司名称不能超过50个字符';
		}
        if (!values.shortName) {
			errors.shortName = '请填写公司简称';
		}
		if (!values.cost) {
			errors.cost = '请输入费用';
		}

		return errors
}

export default reduxForm({
		form: 'editAudit',
		 validate,
		
	})(EditAudit);
