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
	DialogInner
} from 'kr-ui';
import './index.less';

class SetClose extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			openSetClose:false,
			roleId:'',
		}
	}

	componentDidMount(){
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
	// 本页面提交
	openSetClose = ()=>{
		this.setState({
			openSetClose: !this.state.openSetClose
		})
	}
	onSubmit = (form) => {
		if(!form.closeDate){
			 Message.error('请选择停业时间');
			 return
		}
		let {roleId} = this.state;
		// 提交 
		let params ={cmtId:roleId,closeDate:form.closeDate};
		
		ajax.get('close-comunity-time',params).then((res)=>{
			
			let {
				onSubmit
			} = this.props;
			onSubmit && onSubmit();
			this.openSetClose();
		}).catch((err)=>{
			
			Message.error(err.msg);
		})
		
	}
	render() {
		let {
			handleSubmit,
		} = this.props;
		return (
			<div className='close'>
				<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:10}}  >
				<div>
					<p>设置停业以后，无法再创建停业时间之后的订单。</p>
					<p>一旦过了停业时间，BI、晨报等数据也不再展示此社区数据。</p>
				</div>
				<KrField inline={true} label="停业时间" name="closeDate" style={{width:'262px'}} component="date" requireLabel={true}/>
					<Row style={{marginTop:10,marginBottom:15}}>
					<Col md={12} align="center"> 
						<ButtonGroup>
							<Button  label="确定" type="button"  type="submit"  height={34} width={90}/>
							<Button  label="取消" type="button"  onTouchTap={this.onCancel} cancle={true} height={33} width={90}/>
						</ButtonGroup>
						
					 </Col>
					 </Row>
				</form>
				<DialogInner
						title="关闭社区（设置停业）"
						modal={true}
						onClose={this.openSetClose}
						open={this.state.openSetClose}
						contentStyle={{width:580}}
						>
						<div>
							<p>设置停业时间成功！</p>
							<div style={{textAlign:'center'}}>
								<Button  label="完成" type="button"  type="submit" onTouchTap={this.openSetClose} height={33} width={90} />
							</div>
						</div>
						
					</DialogInner>
			</div>
		);
	}

}
const validate = values => {

	const errors = {}
	return errors
}
export default SetClose = reduxForm({
	form: 'SetClose',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(SetClose);
