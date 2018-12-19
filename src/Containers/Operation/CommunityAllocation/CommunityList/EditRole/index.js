import React from 'react';
import {
	Http,
	ajax
} from "kr/Utils";
import {
	Store
} from 'kr/Redux';
import {
	reduxForm,
	initialize,
	change
} from 'redux-form';
import {
	KrField,
	Button,
	Row,
	Col,
	DrawerTitle,
	ButtonGroup,
	Message,
	Dialog,
} from 'kr-ui';
// import './index.less';


class EditRole extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			groupList:[],
			roleId:'',
			groupId:'',
		}
	}

	componentDidMount(){
		let groupId;
		let descr;
		let{detail} = this.props;
					this.setState({
					roleId:detail.id
				})
	}
	onCancel = () => {
		let {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	onSubmit = (form) => {
		if(!form.type){
			 Message.error('请选择一项分组值');
			 return
		}
		let {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form.type);
			
	}

	render() {
		let {
			handleSubmit,
		} = this.props;
		return (
			<div>
				<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:10}}  >
				<KrField
							style={{width:500,marginLeft:40,marginBottom:16,marginRight:200}}
							name="type"
							component="group"
					>
	                	<KrField
	                			name="type"
	                			label="设置停业（过了停业时间在BI、晨报、库存不再展示此社区的数据）"
	                			type="radio"
	                			value="closeDown"
	                			checked={true}
	                			style={{display:'block'}}
	                	/>
	               		<KrField
	               				name="type"
	               				label="系统关闭 （在OP中不再展示此社区的数据）"
	               				type="radio"
	               				value="system"
												style={{display:'block',marginTop:'10px'}}
	               		/>
										 	<KrField
	               				name="type"
	               				label="官网关闭  (不再对外展示）"
	               				type="radio"
	               				value="website"
												style={{display:'block',marginTop:'10px'}}
	               		/>
										 	 	<KrField
	               				name="type"
	               				label="APP与小程序关闭 (不再对外展示）"
	               				type="radio"
	               				value="program"
												style={{display:'block',marginTop:'10px'}}
	               		/>
	              	</KrField>
					<Row style={{marginTop:10,marginBottom:15}}>
					<Col md={12} align="center"> 
						<ButtonGroup>
							<Button  label="确定" type="button"  type="submit"  height={34} width={90}/>
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
	return errors
}
export default EditRole = reduxForm({
	form: 'EditRole',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(EditRole);
