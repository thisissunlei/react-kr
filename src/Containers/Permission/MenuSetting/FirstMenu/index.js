import React from 'react';

import {
	Actions,
	Store
} from 'kr/Redux';
import {
	Http,
	DateFormat
} from "kr/Utils";

import {
	reduxForm,
	formValueSelector,
	change
} from 'redux-form';
import {
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Tooltip,
	Section,
	Grid,
	Row,
	Col,
	Dialog,
	SearchForms,
	KrDate,
	Message,
    Chip
} from 'kr-ui';
import './index.less';
import EditThird from './EditThird';
import EditSecond from './EditSecond';
import EditFirst from './EditFirst';
import DeleteFirst from './DeleteFirst';
import DeleteSecond from './DeleteSecond';
import DeleteThird from './DeleteThird';
import CreateSecond from './CreateSecond';
import CreateThird from './CreateThird';
export default class FirstMenu extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			item:this.props.detail,
			openHighSearch: false,
			editState:false,
			itemDetail:{},
			openThirdEdit:false,
			openSecondEdit:false,
			openFirstEdit:false,
			openThirdCreate:false,
			openSecondCreate:false,
			openDeleteFirst:false,
			openDeleteSecond:false,
			openDeleteThird:false,
			editStyle:{
				'border':'1px solid #e8e9e9',
			},
			editSecondStyle:{
				'background':'#e8e9e9',
			}
		}
	}
    renderSecondItem=(item,index)=>{
		let {editSecondStyle,editState} = this.state;
		return(
			<div className="second-menu" key={index}>
				<div className="second-title-row">
					<div className="second-title"><Chip edit={editState} editStyle={editSecondStyle} onEdit={()=>{
						this.openSecondEdit(item,index)} 
					} onDel={this.openDeleteSecond.bind(this,item,index)}
					 label={item.name}/></div>
					{item.childList && item.childList.map((itemA,indexA)=>{
						return this.renderThirdItem(itemA,indexA)
					})}
					{editState && <Button label="新增" type="button" onClick={this.openThirdCreate.bind(this,item,index)} width={70} height={30} fontSize={14}/>}
				</div>
			</div>
		)
    }
	renderThirdItem=(item,index)=>{
		let {editStyle,editState} = this.state;
		return (
			<div key={index} style={{paddingRight:20}}>
				<Chip edit={editState} editStyle={editStyle} onDel={()=>{
						this.openDeleteThird(item,index)}
					}  onEdit={()=>{
						this.openThirdEdit.bind(this,item,index)} 
					} label={item.name}/>
			</div>
		)
	}
	openThirdEdit=(item,index)=>{
		let openThirdEdit = this.state.openThirdEdit;
		var _this = this;
		this.setState({
			itemDetail:openThirdEdit?'':item,
			openThirdEdit:!openThirdEdit
		})
	}
	openSecondEdit=(item,index)=>{
		let openSecondEdit = this.state.openSecondEdit;
		var _this = this;
		this.setState({
			itemDetail:openSecondEdit?'':item,
			openSecondEdit:!openSecondEdit
		})
	}
	openFirstEdit=(item)=>{
		let openFirstEdit = this.state.openFirstEdit;
		var _this = this;
		this.setState({
			itemDetail:openFirstEdit?'':item,
			openFirstEdit:!openFirstEdit
		})
	}
	openThirdCreate=(item,index)=>{
		let openThirdCreate = this.state.openThirdCreate;
		var _this = this;
		this.setState({
			itemDetail:openThirdCreate?'':item,
			openThirdCreate:!openThirdCreate
		})
	}
	openSecondCreate=(item)=>{
		let openSecondCreate = this.state.openSecondCreate;
		var _this = this;
		this.setState({
			itemDetail:openSecondCreate?'':item,
			openSecondCreate:!openSecondCreate
		})
	}
	onEditFirstSubmit=(form)=>{
		const {
			onSubmit,
		} = this.props;
		var _this = this;
		Http.request('first-level-update', {},form).then(function(response) {
			onSubmit();
		}).catch(function(err) {});
	}
	onEditSecondSubmit=(form)=>{
		const {
			onSubmit,
		} = this.props;
		Http.request('sub-level-update', {},form).then(function(response) {
			onSubmit();
		}).catch(function(err) {});
	}
	onEditThirdSubmit=(form)=>{
		const {
			onSubmit,
		} = this.props;
		Http.request('three-level-update', {},form).then(function(response) {
			onSubmit();
		}).catch(function(err) {});
	}
	onCreateSecondSubmit=(form)=>{
		const {
			onSubmit,
		} = this.props;
		Http.request('sub-level-save', {},form).then(function(response) {
			onSubmit();
		}).catch(function(err) {});
	}
	onCreateThirdSubmit=(form)=>{
		const {
			onSubmit,
		} = this.props;
		Http.request('three-level-save', {},form).then(function(response) {
			onSubmit();
		}).catch(function(err) {});
	}
	openDeleteFirst=(item)=>{
		let openDeleteFirst = this.state.openDeleteFirst;
		var _this = this;
		this.setState({
			itemDetail:openDeleteFirst?'':item,
			openDeleteFirst:!openDeleteFirst
		})
	}
	openDeleteSecond=(item,index)=>{
		let openDeleteSecond = this.state.openDeleteSecond;
		var _this = this;
		this.setState({
			itemDetail:openDeleteSecond?'':item,
			openDeleteSecond:!openDeleteSecond
		})
	}
	openDeleteThird=(item,index)=>{
		let openDeleteThird = this.state.openDeleteThird;
		var _this = this;
		this.setState({
			itemDetail:openDeleteThird?'':item,
			openDeleteThird:!openDeleteThird
		})
	}
	onDel=(item,index)=>{
		const {
			onSubmit,
		} = this.props;
		Http.request('first-second-delete', {},form).then(function(response) {
			onSubmit();
		}).catch(function(err) {});
	}
	onDelThird=(item,index)=>{
		const {
			onSubmit,
		} = this.props;
		Http.request('third-delete', {},form).then(function(response) {
			onSubmit();
		}).catch(function(err) {});
	}
	onEditState=()=>{
		const {
			onSubmit,
		} = this.props;
		let editState = this.state.editState;
		var _this=this;
		this.setState({
			editState:!_this.state.editState
		},function (){
			if(!editState){
				onSubmit();
			}
		})
	}
	
	render() {
        let {item,editStyle,editState,itemDetail} = this.state;
		return (
			<div className="first-menu">
				<div className="first-title-row">
					<div className="first-title"><Chip edit={editState} editStyle={editStyle} label={item.name} onEdit={this.openFirstEdit.bind(this,item)} onDel={this.openDeleteFirst.bind(this,item)}/></div>
					{!editState && <Button label="编辑" type="button" onClick={this.onEditState} width={70} height={30} fontSize={14}/>}
					{editState && <Button label="新增分类" type="button" onClick={this.openSecondCreate.bind(this,item)} width={100} height={30} fontSize={14}/>}
					{editState && <Button label="完成" type="button" onClick={this.onEditState} width={70} height={30} fontSize={14}/>}
					
				</div>
				<div className="main">
					{item.childList && item.childList.map((itemA,index)=>{
						return this.renderSecondItem(itemA,index)
					})}
				</div>
				<Dialog
						title="修改子模块"
						modal={true}
						open={this.state.openThirdEdit}
						onClose={this.openThirdEdit}
						contentStyle={{width:666}}
					>
						<EditThird  detail={itemDetail} onSubmit = {this.onEditThirdSubmit} onCancel={this.openThirdEdit} />
				</Dialog>
				<Dialog
						title="修改分类"
						modal={true}
						open={this.state.openSecondEdit}
						onClose={this.openSecondEdit}
						contentStyle={{width:666}}
					>
						<EditSecond  detail={itemDetail} onSubmit = {this.onEditSecondSubmit} onCancel={this.openSecondEdit} />
				</Dialog>
				<Dialog
						title="修改导航"
						modal={true}
						open={this.state.openFirstEdit}
						onClose={this.openFirstEdit}
						contentStyle={{width:666}}
					>
						<EditFirst  detail={itemDetail} onSubmit = {this.onEditFirstSubmit} onCancel={this.openFirstEdit} />
				</Dialog>
				<Dialog
						title="新增分类"
						modal={true}
						open={this.state.openSecondCreate}
						onClose={this.openSecondCreate}
						contentStyle={{width:666}}
					>
						<CreateSecond  detail={itemDetail} onSubmit = {this.onCreateSecondSubmit} onCancel={this.openSecondCreate} />
				</Dialog>
				<Dialog
						title="新增子模块"
						modal={true}
						open={this.state.openThirdCreate}
						onClose={this.openThirdCreate}
						contentStyle={{width:666}}
					>
						<CreateThird  detail={itemDetail} onSubmit = {this.onCreateThirdSubmit} onCancel={this.openThirdCreate} />
				</Dialog>
				<Dialog
						title="删除导航"
						modal={true}
						onClose={this.openDeleteFirst}
						open={this.state.openDeleteFirst}
						contentStyle={{width:460}}
						>
						<DeleteFirst detail={itemDetail} onCancel={this.openDeleteFirst} onSubmit={this.onDel} />

				</Dialog>
				<Dialog
						title="删除分类"
						modal={true}
						onClose={this.openDeleteSecond}
						open={this.state.openDeleteSecond}
						contentStyle={{width:460}}
						>
						<DeleteSecond detail={itemDetail} onCancel={this.openDeleteSecond} onSubmit={this.onDel} />

				</Dialog>
				<Dialog
						title="删除子模块"
						modal={true}
						onClose={this.openDeleteThird}
						open={this.state.openDeleteThird}
						contentStyle={{width:460}}
						>
						<DeleteThird detail={itemDetail} onCancel={this.openDeleteThird} onSubmit={this.onDelThird} />

				</Dialog>
			</div>
		);
	}

}
