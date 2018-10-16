import React from 'react';
import {
	Http
} from "kr/Utils";
import {
	Store
} from 'kr/Redux';
import {
	reduxForm,
	initialize
} from 'redux-form';
import {
	KrField,
	Button,
	Row,
	Col,
	DrawerTitle,
	ButtonGroup,
} from 'kr-ui';
import './index.less';


class CreateGroup extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {

		}

	}

	onCancel = () => {
		let {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}
	onSubmit = (form) => {
			let {
				onSubmit
			} = this.props;
			onSubmit && onSubmit(form)
	}
	
	render() {
		let {
			handleSubmit,
		} = this.props;

		return (
			<div className="g-createGroup">
				<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:50}}  >
					<KrField
							style={{width:800,marginLeft:60,marginBottom:16,display:'block'}}
							name="name" 
							type="text"
							component="input" 
							label="分组名称"
							requireLabel={true}
							inline={true}
					/>
					<KrField
							style={{marginLeft:60,marginBottom:16}}
							name="descr" 
							type="text"
							component="input" 
							label="分组描述"
							requireLabel={true}
							inline={true}
					/>
					<Row style={{marginTop:10,marginBottom:15}}>
					<Col md={12} align="center"> 
						<ButtonGroup>
							<div  className='ui-btn-center'><Button  label="创建" type="button"  type="submit"  height={34} width={90}/></div>
							<Button  label="取消" type="button"  onTouchTap={this.onCancel} cancle={true} height={33} width={90}/>
						</ButtonGroup>
						
					 </Col>
					 </Row>
				</form>

			</div>
		);
	}

}
const validate = values => {

	const errors = {}
	if (!values.name) {
		errors.group = '请输入名称';
	}
	if (!values.descr) {
		errors.desc = '请输入描述';
	}
	return errors
}
export default CreateGroup = reduxForm({
	form: 'CreateGroup',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(CreateGroup);
