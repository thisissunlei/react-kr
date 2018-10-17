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
	Message,
	DialogInner,
	Dialog,
	Tooltip
} from 'kr-ui';
import './index.less';
import Deletedialog from '../Deletedialog';

class CreateGroup extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			groupList:[],
			openDeleteDialog:false,
			id:'',
		}
	}

	componentDidMount(){
		Http.request('UserGroupList', {}).then( (response) =>{
			this.setState({groupList:response})
		}).catch((err)=> {
			Message.error(err.message);
		});
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
			onSubmit && onSubmit(form);

	}
	
	renderGroppList = (list) => {
	return	list.map((v,i)=>{
			if(v.name ==='默认'){
				return (<div className='flex-role' key={i}>
					<span  className='flex-name'>{v.name}</span>
					<span className='flex-desc'>{v.descr}</span>
					</div>)
			}
			return (<div className='flex-role' key={i}>
				<span className='flex-name'>{v.name}</span>
				<div className='flex-desc financeDetail-hover'>
						<span className='tableOver' style={{maxWidth:160,display:"inline-block",whiteSpace: "nowrap",textOverflow: "ellipsis",overflow:"hidden"}}>{v.descr}</span> 
						<Tooltip  offsetTop={5} place='top'>{v.descr}</Tooltip>
				</div>
				<span className='flex-dele'>
					<Button label="删除" type="button"  onTouchTap={()=>{this.removeList(v.id)}} cancle={true} height={30} width={80}/>
				</span>
				
				</div>)
		})
	}
	removeList = (id) =>{
		this.setState({id},()=>{

			this.openDeleteDialog()
		})
	}
	onDeleteSubmit = () => {
		let {
			id
		} = this.state;
		Http.request('delRoleList', {
			id: id
		}).then((response) =>{
			Message.success('删除成功')
			this.openDeleteDialog()
			this.onSubmit()
		}).catch(function(err) {
			this.openDeleteDialog()
			Message.error(err.message);
		});
	}
	openDeleteDialog = ()=>{

		this.setState({
			openDeleteDialog: !this.state.openDeleteDialog
		})
	}
	render() {
		let {
			handleSubmit,
		} = this.props;
		let {
			groupList
		} = this.state;

		return (
			<div className="g-roleMange">
				<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:10}}  >
					{groupList.length && this.renderGroppList(groupList)}
				</form>
				<div className='modal-role'>
					<Dialog
							title="提示"
							modal={true}
							onClose={this.openDeleteDialog}
							open={this.state.openDeleteDialog}
							contentStyle={{width:460}}
							>
							<Deletedialog  onCancel={this.openDeleteDialog} onSubmit={this.onDeleteSubmit} />
						</Dialog>
					</div>
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
