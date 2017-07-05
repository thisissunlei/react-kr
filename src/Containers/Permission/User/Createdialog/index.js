import React from 'react';
import {
	Http
} from "kr/Utils";
import {
	reduxForm
} from 'redux-form';
import {
	KrField,
	Button,
	Row,
	Col,
	ButtonGroup
} from 'kr-ui';
import './index.less';


class Createdialog extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			moduleDetail: [],
			resourceIds: [],
			errorTip: false
		}
		
	}
	componentDidMount() {
		this.getInfo();
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
	getInfo = () => {
		var _this = this;
		Http.request('getModuleData').then(function(response) {
			_this.setState({
				moduleDetail: response.moduleAndResources
			})
		}).catch(function(err) {

		});
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
						<div className="u-clearfix u-module" key={index} >
							<div className="u-module-list">{item.name}</div>
							<div className="u-resources-list">
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
			handleSubmit
		} = this.props;
		let {
			moduleDetail,
			resourceIds,
			errorTip
		} = this.state;

		return (
			<div className="g-create">
				<div className="u-create-title">
			     	<span className="u-create-icon"></span>
			     	<span>新建角色</span>
			     	<span className="u-create-close"   onTouchTap={this.onCancel}></span>
			     </div>
				<form onSubmit={handleSubmit(this.onSubmit)} >
					<KrField
							style={{width:252,marginLeft:96,marginBottom:16}}
							name="name" type="text"
							component="input" label="名称"
							requireLabel={true}
							requiredValue={true}
							inline={false}
					/>
					<KrField
							style={{width:252,marginLeft:50,marginBottom:16}}
							name="code" type="text"
							component="input" label="编码"
							requireLabel={true}
							requiredValue={true}
							inline={false}
					/>
					<div className="u-operation">
						<div className="u-operation-label">
							<span className="u-require">*</span>操作项：
						</div>
						<div className="u-operation-content">
							{moduleDetail.length>0?this.renderOperation(moduleDetail):''}
							{errorTip?<div className="u-error-tip">请选择操作项</div>:''}
						</div>

						<KrField
								 type="hidden"
								 name="resourceIds"
								 values={resourceIds}
						/>

					</div>
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
		errors.name = '请输入姓名';
	}

	if (!values.code) {
		errors.code = '请输入编号';
	}


	return errors
}
export default Createdialog = reduxForm({
	form: 'createdialog',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(Createdialog);
