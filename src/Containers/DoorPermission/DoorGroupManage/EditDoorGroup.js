

import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,change,reset,initialize} from 'redux-form';
import {Http} from 'kr/Utils';

import {
	KrField,
	Grid,
	Row,
	Button,
	ListGroup,
	ListGroupItem,
	Message,
	
} from 'kr-ui';
import './index.less';
import {DateFormat} from 'kr/Utils';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer



class EditDoorGroup extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
			communityId : '',
			customerId : '',
			groupLevelOptions : [{
				label:"普通组",
				value: "NORMAL"
			},{
				label:"父级组",
				value: "PARENT"
			}]

		}
	}
	componentDidMount(){
		
		let {itemDetail} = this.props;
		Store.dispatch(initialize('EditDoorGroup', itemDetail));
	}

	onSubmit=(values)=>{
		// console.log("values",values);
		let {submitEditDoorGroup} = this.props;
		submitEditDoorGroup && submitEditDoorGroup(values);
		
	}


	closeEditDoorGroup=()=>{
		State.openEditDoorGroup = false;
	}

	

	changeCommunityId=(option)=>{
		this.setState({
			communityId:option.id
		})
	}

	changeCustomerId=(option)=>{
		this.setState({
			customerId:option.value
		})
	}


	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		let {groupLevelOptions} = this.state;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} className="new-creat-door-group">
				<KrField grid={1/2} 
					name="name" 
					type="text" 
					label="组名称" 
					requireLabel={true} 
					errors={{requiredValue:'组名称为必填项'}} 
					style={{width:'252px',margin:'0 35px 5px 0'}}
				/>


				<KrField name="groupLevel" 
					component="select" 
					label="组级别："
					options={groupLevelOptions}  
					requireLabel={true} 
					errors={{requiredValue:'组级别为必填项'}} 
					style={{width:'252px',margin:'0 35px 5px 0'}}
				/>

				<KrField name="communityId" 
					component="searchCommunityAll" 
					label="社区名称"  
					style={{width:'252px',margin:'0 35px 5px 0'}}
					inline={false}
					onChange={this.changeCommunityId}
				/>

				<KrField grid={1/2} name="customerId" 
					component="searchSmartHardCompany" 
					label="公司" 
					style={{width:'252px',marginRight:'30px'}}
					onChange={this.changeCustomerId}
					inline={false}
				/>
				
				
					
				<KrField
					label="备注"
					name ="memo"
					component = 'textarea'
					style={{width:538}}
					maxSize = {40}
					
				/>

				<Grid>
						<Row style={{textAlign:'center',marginLeft:'-40px'}}>
							<ListGroup >
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:30}}>
									<Button  label="提交" type="submit"/>
								</ListGroupItem>
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:3}}>
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.closeEditDoorGroup} />
								</ListGroupItem>
							</ListGroup>					
						</Row>
					</Grid>
			</form>
		);
	}
}
const validate = values => {
	const errors = {}
	if (!values.name) {
		errors.name = '请输入组名称';
	}
	if (!values.groupLevel) {
		errors.groupLevel = '请选择组级别';
	}
	return errors
}
export default EditDoorGroup = reduxForm({
	form: 'EditDoorGroup',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(EditDoorGroup);
