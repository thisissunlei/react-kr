

import React from 'react';
import {Actions,Store} from 'kr/Redux';
import {reduxForm,change,reset,initialize} from 'redux-form';

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
import {DateFormat} from 'kr/Utils';

import State from './State';
import {
	observer
} from 'mobx-react';
@ observer

class AdvancedQueryForm extends React.Component{
	

	constructor(props){
		super(props);
		this.state={
			
		}
	}
	componentDidMount(){
		// 主体准备数据
		State.getMainbody();
		Store.dispatch(initialize('AdvancedQueryForm', State));

	}


	onSubmit(values){
		console.log("values",values);
		State.advanceQueryDialogOpen = false;

		State.corporationId = values.corporationId;
		State.communityId = values.communityId;
		State.dayType = values.dayType;
		State.end = values.end;
		State.getDetailList();
		
	}

	onCancel(){
		State.advanceQueryDialogOpen = false;
	}
	
	
	
	render(){
		const { error, handleSubmit, pristine, reset,content,filter} = this.props;
		
		let {selectOption,selectSourceOption} =this.state;
		let endOptions = [{
			label: '未结束',
			value: "false"
		}, {
			label: '已结束',
			value: "true"
		}];
		let daysOptions=[{
			label: '0～5',
			value: "FIVE"
		}, {
			label: '6～30',
			value: "THIRTY"
		}, {
			label: '31～60',
			value: "SIXTY"
		}, {
			label: '61～90',
			value: "NINETY"
		}, {
			label: '90天以上',
			value: "MORE_THAN_NINETY"
		}];

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:'37px',marginLeft:'40px'}}>
				<KrField name="corporationId" 
					component="select" 
					options={State.mainbodyOptions}
					label="主体"
					style={{width:252,marginRight:40}}
				/>
				<KrField name="communityId" 
					component="searchCommunity" 
					label="社区"  
					style={{width:'252px',margin:'0 35px 5px 0'}}
				/>
				<KrField name="dayType" 
					component="select" 
					options={daysOptions}
					label="欠费天数"
					style={{width:252,marginRight:40}}
				/>

				<KrField name="end" 
					component="select" 
					options={endOptions}
					label="是否结束"
					style={{width:'252px'}}
				/>
				<Grid style={{margin:"20px 0 20px -10px"}}>
					<Row>
						<ListGroup>
							<ListGroupItem style={{width:'269px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="submit"/></ListGroupItem>
							<ListGroupItem style={{width:'254px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button"  cancle={true} onTouchTap={this.onCancel} /></ListGroupItem>
						</ListGroup>
					</Row>
				</Grid>
			</form>
		);
	}
}
export default AdvancedQueryForm = reduxForm({
	form: 'AdvancedQueryForm',
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(AdvancedQueryForm);
