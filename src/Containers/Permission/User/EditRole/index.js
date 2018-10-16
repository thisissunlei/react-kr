import React from 'react';
import {
	Http
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
import './index.less';


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
		Http.request('UserGroupList', {}).then( (response) =>{
			this.setState({groupList:response},()=>{
				response.map((v,i)=>{
					if(v.name === detail.groupName ){
						groupId = v.id;
						descr = v.descr;
					}
				})
				// 修改单独一个form 整体用initialize
				Store.dispatch(change('EditRole', 'groupName', groupId));
				this.setState({
					descr,
					groupId,
					roleId:detail.id
				})
			})
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

	onSubmit = () => {
		let{groupId,roleId} = this.state;
		let params= {groupId,roleId};
		let {
			onSubmit
		} = this.props;
		Http.request('editRoleGroup', params).then( (response) =>{
			Message.success('新建成功');
			onSubmit && onSubmit();
		}).catch((err)=> {
			Message.error(err.message);
		});
			
	}

	onSetGroupList = (item)=>{
		this.setState({
			descr:item.descr,
			groupId:item.id
		})
	}
	renderGroppList = (list) => {
		let{detail} = this.props;
		let{descr} = this.state;
		list.map((item,i)=>{
			item.value = item.id;
	    	item.label = item.name;
			return item
		})
		return (
			<div style={{paddingLeft:40}}>
				<KrField name="groupName"  style={{width:440}}  component="select" label="分组" options={list} inline={true}  onChange={this.onSetGroupList}/>
				<KrField
							style={{width:440,marginBottom:16}}
							name="descr" 
							component="labelText" 
							label="描述"
							value={descr}
							inline={true}
					/>
			</div>
		)
	}

	render() {
		let {
			handleSubmit,
		} = this.props;
		let {
			groupList
		} = this.state;

		return (
			<div className="g-roleEdit">
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
export default EditRole = reduxForm({
	form: 'EditRole',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(EditRole);
