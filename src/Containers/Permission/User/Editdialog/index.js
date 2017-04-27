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
} from 'kr-ui';
import './index.less';


class Editdialog extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			ModuleList: [],
			resourceIds: [],
			errorTip: false,
			moduleDetail:[],
		}

	}
	componentDidMount() {
		let {
			detail,
		} = this.props;
		this.getInfo();
		Store.dispatch(initialize('editdialog', detail));
	}
	getInfo=()=>{
		let {detail}=this.props;
		var id=detail.id;
		var _this=this;
		var idList=[];
		Http.request('getRoleData', {
				id: id
			}).then(function(response) {
				response.moduleAndResources.map((item)=>{
					item.check=false;
					if(item.resources.length>0){
						item.resources.map((items)=>{
							if(items.ownFlag==1){
								if(idList.indexOf(items.id)==-1){
									idList.push(items.id)
								}
								
							}
						})
					}
				})
				_this.setState({
					moduleDetail: response.moduleAndResources,
					resourceIds:idList
				})
				

				
			}).catch(function(err) {

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
			resourceIds
		} = this.state;

		if (resourceIds.length > 0) {
			form.resourceIds = resourceIds;
			let {
				onSubmit
			} = this.props;
			onSubmit && onSubmit(form);

		} else {
			this.setState({
				errorTip: true
			})

		}

	}
	

	getValue = (item) => {

		var check = item.ownFlag
		var id = item.id;
		var idList = this.state.resourceIds;
		let {
			moduleDetail
		} = this.state;
		if (check == 1) {
			item.ownFlag = 0;
			var index = idList.indexOf(id);
			if (index > -1) {
				idList.splice(index, 1);
			}
			this.setState({
				resourceIds: idList
			})

		} else {
			item.ownFlag = 1;
			var index = idList.indexOf(id);
			if (index == -1) {
				idList.push(id);
			}
			this.setState({
				resourceIds: idList
			})


		}
		
		if (this.state.resourceIds.length > 0) {
			this.setState({
				errorTip: false
			})
		}
	}
	getAllValue=(value)=>{
		var idList = this.state.resourceIds;
		if(!value.check){
			value.check=true;
			value.resources.map((item)=>{
				item.ownFlag=1;
				if(idList.indexOf(item.id)==-1){
					idList.push(item.id)
				}
			})
		}else{
			value.check=false;
			value.resources.map((item)=>{
				item.ownFlag=0;
				var index = idList.indexOf(item.id);
				if(index>-1){
					idList.splice(index, 1);
				}
			})
		}
		this.setState({
				resourceIds: idList
			})
		
	}
	renderResources=(resources)=>{
		return resources.map((item,index)=>{
			return(
				<div className="u-resources-list" key={index}>
					<input 
						  type="checkbox"  
						  checked={item.ownFlag==1?'checked':''} 
						  value={item.id} 
						  onChange={this.getValue.bind(this,item)}
					/>{item.name}
				</div>
				)
		})
	}
	
	renderOperation = (moduleDetail) => {
		var _this = this;
	return	moduleDetail.map((item,index)=>{
			if(item.resources.length>0){
				return(
				<div className="u-clearfix u-module"  key={index}>
					<div className="u-module-list">{item.name}</div>
						<div className="u-resources-list" key={index}>
							<input 
								  type="checkbox" 
								  onChange={this.getAllValue.bind(this,item)}
							/>全选
						</div>
					{this.renderResources(item.resources)}
				</div>
				)
			}else{
				return(
					<div key={index}>
						{item.name}
					</div>
				)	
			}
			
			
		})

		
		
	}
	render() {
		let {
			error,
			handleSubmit,
			pristine,
			reset,
			submitting,
			initialValues,
			changeValues,
			optionValues,
			
		} = this.props;
		let {
			resourceIds,
			errorTip,
			moduleDetail
		} = this.state;

		return (
			<div className="g-create">
				<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:50}}  >
					<KrField
							style={{width:300,marginLeft:40,marginBottom:16}}
							name="name" type="text"
							component="input" label="姓名："
							requireLabel={true}
							requiredValue={true}
							errors={{requiredValue:'姓名为必填项'}}
							inline={true}
					/>
					<KrField
							style={{width:300,marginLeft:40,marginBottom:16}}
							name="code" type="text"
							component="input" label="编号："
							requireLabel={true}
							requiredValue={true}
							errors={{requiredValue:'编码为必填项'}}
							inline={true}
					/>
					<div className="u-operation">
						<div className="u-operation-label">
							操作项：
						</div>
						<div className="u-operation-content">
							{this.renderOperation(moduleDetail)}
							{errorTip?<div className="u-error-tip">请选择操作项</div>:''}
						</div>

						<KrField
								 type="hidden"
								 name="resourceIds"
								 values={resourceIds}
						/>

					</div>
					<div style={{marginLeft:140,marginTop:30}}><Button  label="确定" type="submit"   height={34} width={90}/></div>
				</form>

			</div>
		);
	}

}
const validate = values => {

	const errors = {}
	if (!values.name) {
		errors.name = '请输入姓名';
	}

	if (!values.code) {
		errors.code = '请输入编号';
	}


	return errors
}
export default Editdialog = reduxForm({
	form: 'editdialog',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(Editdialog);
