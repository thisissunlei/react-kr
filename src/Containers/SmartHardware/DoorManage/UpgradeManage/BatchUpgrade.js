
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
	Message,
} from 'kr-ui';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

class NewCreateUpgradeForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			
		}
	}
	onCancel=()=>{
		State.openBatchUpgradeDialog();
	}

	// 批量升级
	onSubmit=(values)=>{

		let _this = this;
		this.onCancel();


		var params ={
			id : _this.props.detail.id,
			communityId : values.communityId
		}

		Http.request('batchUpgradeUrl',{},params).then(function(response) {
			Message.success("批量升级成功");
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	render(){
		const { error, handleSubmit, reset} = this.props;
		return(
			<div style={{padding:'20px 0 0 55px'}}>
				<form onSubmit={handleSubmit(this.onSubmit)}>
					
					<KrField  
						name="communityId" 
						component="searchCommunityAll" 
						label="社区名称：" 
						inline={false} 
						style={{width:290}}  
						className="community-id"
						requireLabel={true}
					/>
					<Grid>
						<Row style={{textAlign:'center',marginLeft:'-40px',marginTop:35}}>
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
	
	if(!values.communityId){
		errors.communityId = '请选择社区';
	}
	
	return errors;
}
export default NewCreateUpgradeForm= reduxForm({
	form: 'NewCreateUpgradeForm',
	validate,
})(NewCreateUpgradeForm);
