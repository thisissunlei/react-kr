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
			name:''
		}
	}

	componentDidMount(){
		let{detail} = this.props;
					this.setState({
					roleId:detail.id,
					name:detail.name,
					closed: detail.closed,
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
	onSubmit = () => {
		let {closed} = this.state;
		if(!closed){
			 Message.error('停业时间晚于今天，只有停业以后的社区才能关闭！');
			 return
		}
		let {roleId} = this.state;
		// 提交 
		let params ={cmtId:roleId};
		ajax.get('close-comunity-system',params).then((res)=>{
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
		let {
			name,
			id
		} = this.state;
		return (
			<div className='close'>
				<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:10}}  >
				<div>
					<p>关闭社区后，社区运营、线上运营、产品商品中都不再展示此社区</p>
					<p>请确认{<span style={{color:'red'}}>{name}</span>}已确定停止营业</p>
					<p style={{color:'red'}}>一旦关闭不能撤销，请谨慎操作</p>
				</div>
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
						title="关闭社区（系统关闭）"
						modal={true}
						onClose={this.openSetClose}
						open={this.state.openSetClose}
						contentStyle={{width:580}}
						>
						<div>
							<p>关闭成功！</p>
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
