

import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,change,reset} from 'redux-form';
import {Http} from 'kr/Utils';

import {
	KrField,
	Grid,
	Row,
	Button,
	Notify,
	ListGroup,
	ListGroupItem,
	SearchForm,
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



class NewCreateDooGroup extends React.Component{
	constructor(props){
		super(props);
		this.state={
			logTypeOptions : [
				{
					label:"普通组",
					value: "NORMAL"
				},{
					label:"全国通开组",
					value: "COUNTRYWIDE"
				},{
					label:"社区通开组",
					value: "COMMUNITYWIDE"
				}
				
			],
		}
	}
	componentDidMount(){
		
		
	}
	onSubmit=(values)=>{
		
		console.log("values",values);
		
	}


	closeNewCreateDoorGroup=()=>{
		State.openNewCreateDoorGroup = false;
	}

	onClearAll=()=>{
		Store.dispatch(reset('NewCreateDooGroup',''));
		Store.dispatch(change('NewCreateDooGroup','stime',''));
		Store.dispatch(change('NewCreateDooGroup','etime',''));
		var time=this.refs.stime
		State.warnSearchParams={
			page:1,
			pageSize:15,
			stime :  '',
			etime: '',
			deviceId:'',
			logType: ''
		}
	}

	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		let {logTypeOptions} = this.state;
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
					options={logTypeOptions}  
					requireLabel={true} 
					errors={{requiredValue:'组级别为必填项'}} 
					style={{width:'252px',margin:'0 35px 5px 0'}}
				/>

				<KrField name="communityId" 
					component="searchCommunityAll" 
					label="社区名称"  
					style={{width:'252px',margin:'0 35px 5px 0'}}
					inline={false}
				/>

				<KrField grid={1/2} name="csrId" 
					component="searchMemberCompany" 
					label="公司" 
					style={{width:'252px',marginRight:'30px'}}
				/>
				
				
					
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
export default NewCreateDooGroup = reduxForm({
	form: 'NewCreateDooGroup',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(NewCreateDooGroup);
