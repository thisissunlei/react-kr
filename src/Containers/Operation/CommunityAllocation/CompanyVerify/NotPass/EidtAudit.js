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
	Store
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

class EditAudit extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			groupType:[
				
			],
		}
		
	}
	
	componentDidMount() {
		
	}
	
	
	
	onSubmit=(form)=>{
		let {onSubmit} = this.props;
		var _this=this;
		Http.request('edit-activity',{},form).then(function(response) {
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

	render() {
			const {
				error,
				handleSubmit,
				pristine,
				reset
			} = this.props;
			let {
				
				ifCity,
				groupType,
				timeStart,
				timeEnd,
				richText,
				imgUrl
			}=this.state;
		
		return (
			<div className="g-audit-drawer">
				<div className="u-create-title">
						<div className="title-text">编辑审核信息</div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<form ref="form" onSubmit={handleSubmit(this.onSubmit)} >
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
								options={groupType}
								label="公司简称"
								requireLabel={true}
								onChange={this.selectType}
						 	/>
						 	
						 	

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

		if (!values.title) {
			errors.title = '请填写公司名称';
		}
		if (values.title && values.title.length>50) {
			errors.title = '活动标题不能超过50个字符';
		}
        if (!values.title) {
			errors.title = '请填写公司简称';
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
