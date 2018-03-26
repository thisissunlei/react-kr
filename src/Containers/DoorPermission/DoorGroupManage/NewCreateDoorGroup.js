

import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,change,reset} from 'redux-form';
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



class NewCreateDoorGroup extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
			communityId : '',
			customerId : '',
			showCompany : true,
			showCommunity : true,

		}
	}
	componentDidMount(){
		
	}

	onSubmit=(values)=>{
		
		let {submitNewCreateDoorGoup} = this.props;
		submitNewCreateDoorGoup && submitNewCreateDoorGoup(values);
		
	}


	closeNewCreateDoorGroup=()=>{
		State.openNewCreateDoorGroup = false;
	}

	changGroupLevel=(option)=>{

		let {communityId,customerId} = this.state;
		console.log("option.value",option);
		if(option.value == "ROOT"){

			this.setState({
				showCommunity : false,
				showCompany : false
			})
			Store.dispatch(change('NewCreateDoorGroup','communityId',''));
			Store.dispatch(change('NewCreateDoorGroup','customerId',''));
			return;
		}
		if(option.value == "COMMUNITY"){
			
			this.setState({
				showCompany : false,
				showCommunity : true 
			})
			Store.dispatch(change('NewCreateDoorGroup','communityId',communityId));
			Store.dispatch(change('NewCreateDoorGroup','customerId',''));
			return;
		}
		


		this.setState({
			showCommunity : true,
			showCompany : true
		})
		Store.dispatch(change('NewCreateDoorGroup','communityId',communityId));
		Store.dispatch(change('NewCreateDoorGroup','customerId', customerId));
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
		let {showCompany,showCommunity} = this.state;
		let groupLevelOptions = State.groupLevelOptions;
		console.log("showCompany",showCompany);
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
					onChange={this.changGroupLevel}
				/>

				{showCommunity && <KrField name="communityId" 
					component="searchCommunityAll" 
					label="社区名称"  
					style={{width:'252px',margin:'0 35px 5px 0'}}
					inline={false}
					onChange={this.changeCommunityId}
				/>}

				{showCompany && <KrField grid={1/2} name="customerId" 
					component="searchMemberCompany" 
					label="公司" 
					style={{width:'252px',marginRight:'30px'}}
					onChange={this.changeCustomerId}
				/>}
				
				
					
				<KrField
					label="备注"
					name ="memo"
					component = 'textarea'
					style={{width:538}}
				/>

				<Grid>
						<Row style={{textAlign:'center',marginLeft:'-40px'}}>
							<ListGroup >
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:30}}>
									<Button  label="提交" type="submit"/>
								</ListGroupItem>
								<ListGroupItem style={{padding:0,display:'inline-block',marginRight:3}}>
									<Button  label="取消" type="button"  cancle={true} onTouchTap={this.closeNewCreateDoorGroup} />
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
	if((values.groupLevel=="COMMUNITY"||values.groupLevel=="CUSTOMER") && !values.communityId){
		errors.communityId = "请选择社区";
	}
	if(values.groupLevel=="CUSTOMER" && !values.customerId){
		errors.customerId = "请选择公司";
	}
	return errors
}
export default NewCreateDoorGroup = reduxForm({
	form: 'NewCreateDoorGroup',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(NewCreateDoorGroup);
