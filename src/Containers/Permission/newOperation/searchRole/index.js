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
	Dialog
} from 'kr-ui';
import './index.less';
import Deletedialog from './Deletedialog';

class searchRole extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			groupList:[],
			openDeleteDialog:false,
			id:'',
		}
	}

	componentDidMount(){
		let {id} = this.props.detail;
		Http.request('BusinessRoleList', {businessCodeId:id}).then( (response) =>{
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
	handleRole = (id) => {
			window.open(`./#/permission/userlist/${id}/1`,'_blank');
	}
	renderGroppList = (list) => {
	return	list.map((v,i)=>{
			return (<div className='flex-role' key={i}>
				<span className='flex-name'>{v.groupName}</span>
				<Button label={v.roleName}  type="operation" onTouchTap={()=>{this.handleRole(v.roleId)}} />	
				{/* <a href='' className='flex-desc'>{v.roleName}</a> */}
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
			<div className="g-roleSearch">
				<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:10}}  >
					{groupList.length && this.renderGroppList(groupList)}
					<Row style={{marginTop:10,marginBottom:15}}>
					<Col md={12} align="center"> 
						<ButtonGroup>
							<div  className='ui-btn-center'><Button  label="确定" type="button"  type="submit"  height={34} width={90}/></div>
							<Button  label="取消" type="button"  onTouchTap={this.onCancel} cancle={true} height={33} width={90}/>
						</ButtonGroup>
						
					 </Col>
					 </Row>
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
	return errors
}
export default searchRole = reduxForm({
	form: 'searchRole',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(searchRole);
