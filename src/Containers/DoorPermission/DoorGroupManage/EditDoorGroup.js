

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



class EditDoorGroupForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
			communityId : '',
			customerId : '',
			showCompany : false,
			showCommunity : false,
			groupDetail : {},
			groupLevelLabel : ''

		}
	}
	componentDidMount(){
		this.getInitailData();
    }
    
    getInitailData=()=>{
		let {itemDetail} = this.props;
		let param = {id :itemDetail.id }
		let that = this;
        Http.request('getDoorGroupDetailApi',param).then(function(response) {
			
			Store.dispatch(initialize('EditDoorGroupForm', response));
			that.setState({
				groupDetail :  response,
				communityId: response.communityId,
				customerId : response.customerId
			},function(){
				that.changeShowCommunityCompany(response);
				that.explainGroupLevel();
			})
        }).catch(function(err) {
            Message.error(err.message);
        });

	}

	explainGroupLevel=()=>{
		let {groupDetail} = this.state;
		let groupLevelOptions = State.groupLevelOptions;
		console.log("groupDetail",groupDetail);
		for(let i=0;i<groupLevelOptions.length;i++){
			if(groupDetail.groupLevel ==groupLevelOptions[i].value ){
				this.setState({
					groupLevelLabel :groupLevelOptions[i].label
				})
				return;
			}
		}
	}

	changeShowCommunityCompany=(reponse)=>{

		let param = reponse.groupLevel;
		this.initialShowCommunityCompany(param);
	}
	
	initialShowCommunityCompany=(param)=>{

		let {communityId,customerId} = this.state;
		if(param == "ROOT"){

			this.setState({
				showCommunity : false,
				showCompany : false
			})
			Store.dispatch(change('EditDoorGroupForm','communityId',''));
			Store.dispatch(change('EditDoorGroupForm','customerId',''));
			return;
		}
		if(param == "COMMUNITY"){
			
			this.setState({
				showCompany : false,
				showCommunity : true 
			})
			Store.dispatch(change('EditDoorGroupForm','communityId',communityId));
			Store.dispatch(change('EditDoorGroupForm','customerId',''));
			return;
		}
		


		this.setState({
			showCommunity : true,
			showCompany : true
		})
		Store.dispatch(change('EditDoorGroupForm','communityId',communityId));
		Store.dispatch(change('EditDoorGroupForm','customerId', customerId));
	}

	onSubmit=(values)=>{
		

		var param = {
						id:values.id,
						name:values.name,
						memo:values.memo
					}
		let {submitEditDoorGroup} = this.props;
		submitEditDoorGroup && submitEditDoorGroup(param);
		
	}


	closeEditDoorGroup=()=>{
		State.openEditDoorGroup = false;
	}

	

	

	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		let {showCompany,showCommunity,groupDetail,groupLevelLabel} = this.state;
		let groupLevelOptions = State.groupLevelOptions;
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

				<KrField
					style={{width:'252px',margin:'22px 35px 5px 0'}}
					inline={true}
					component="labelText"
					label="组级别："
					value={groupLevelLabel}
				/>

				{showCommunity &&<KrField
					style={{width:'252px',margin:'0 35px 20px 0'}}
					inline={true}
					component="labelText"
					label="社区名称："
					value={groupDetail.communityName}
					
				/>}

				{showCompany &&<KrField
					style={{width:'252px',margin:'0 35px 20px 0'}}
					inline={true}
					component="labelText"
					label="公司："
					value={groupDetail.customerName}
					
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
	if((values.groupLevel=="COMMUNITY"||values.groupLevel=="CUSTOMER") && !values.communityId){
		errors.communityId = "请选择社区";
	}
	if(values.groupLevel=="CUSTOMER" && !values.customerId){
		errors.customerId = "请选择公司";
	}
	return errors
}
export default EditDoorGroupForm = reduxForm({
	form: 'EditDoorGroupForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(EditDoorGroupForm);
