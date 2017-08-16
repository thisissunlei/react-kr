
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';


import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
	Notify,
	Message,
	err
} from 'kr-ui';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer



class NewCreateDefinitionForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			locationOpen:false,
			floorsOptions:[],
			locationOptions:[],
			communityId :'',
			propertyOption :[{label:"",value:""}],
		}
	}
	onCancel=()=>{
		State.upgradeDialog = false;
	}
	
	
	// 确认升级设备
	onSubmit=(values)=>{
		
		State.upgradeDialog = false;
		var postParams = {
			deviceId :State.itemDetail.deviceId,
			type :values.type,
			url : values.url
		}
		Http.request('upgradeEquipment',{},postParams).then(function(response) {
			State.freshPageReturn();
			Message.success("升级成功");
		}).catch(function(err) {
			Message.error(err.message);
		});
		
	}
	render(){
		let typeOptions=[{
		      label:"C",
		      value:"C"
		    },{
		      label:"APP",
		      value:"APP"
		    },{
		      label:"H5",
		      value:"H5"
		    }]
		const { error, handleSubmit, reset} = this.props;
		return(
			<div style={{padding:'20px 0 0 55px'}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					
					<KrField name="type" 
						component="select" 
						label="类型" 
						options = {typeOptions}
						style={{width:'252px',marginRight:20}}
						onChange = {this.getFloor}
						
					/>
					<KrField grid={1/2} 
						name="url" 
						type="text" 
						label="升级包地址"  
						style={{width:'252px',margin:'0 35px 5px 0'}}
						onBlur = {this.onChangeTitle}
					/>
					
					<Grid>
						<Row style={{textAlign:'center',margin:'20px 0 10px -40px'}}>
							<ListGroup >
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:30}}>
									<Button  label="提交" type="submit"/>
								</ListGroupItem>
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:3}}>
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} />
								</ListGroupItem>
							</ListGroup>					
						</Row>
					</Grid>
				</form>
			</div>
		);
	}
}
const validate = values=>{
	const errors={};
	// if(!values.communityId){
	// 	errors.communityId = '社区名称为必填项';
	// }
	return errors;
}
export default NewCreateDefinitionForm = reduxForm({
	form: 'NewCreateDefinitionForm',
	validate,
})(NewCreateDefinitionForm);
