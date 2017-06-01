import React, {
	PropTypes
} from 'react';

import {
	reduxForm,
} from 'redux-form';

import {
	KrField,
	ListGroup,
	ListGroupItem,
	Button,
} from 'kr-ui';
import {DateFormat} from 'kr/Utils';
import './index.less';
import State from './State';
import {
	observer
} from 'mobx-react';
@ observer

export default class SearchDetailForm extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state={
			timeDefaultValue:DateFormat(new Date(),"yyyy-mm-dd")
		}
	}

	componentDidMount(){

	}


	openAdvancedQueryDialog=()=>{

		State.advanceQueryDialogOpen = true;
		
	}


	changeTime=(endDate)=>{

		State.endDate = endDate;
		State.getDetailList();

	}

	onSubmit=()=>{
		
	}


	changeCustomer=(item)=>{
		
		if(!item || !item.id){
			State.customerId = '';
		}else{
			State.customerId = item.id;
		}
		State.getDetailList();
	}
	

	render() {
		let {handleSubmit} = this.props;
		let {timeDefaultValue}=this.state;
		return (
			<div className="search-form-aging-account" >
				<form onSubmit={handleSubmit(this.onSubmit)} >
					<img className="title-img" src={require('../images/merchants-icon.svg')}/>
					<p className="title">
						<span className="black">账龄数据统计--</span>
						<span>实时更新</span>
					</p>
					
					<div className="right-cont">
						<ListGroup style={{height:50,lineHeight: 50}}>
							<ListGroupItem style={{padding:0,color:'#333',verticalAlign:"top",display:"inline-block",margin:0,marginTop:10}}>
								
								<span style={{height:58,fontSize:14}}>时间:</span>
							
							</ListGroupItem>
							<ListGroupItem style={{padding:0,mrginright:10}}>
								
								<KrField name="detailEndDate"  component="date" onChange={this.changeTime} style={{width:252,marginTop: 7}}  placeholder={timeDefaultValue}/>
							
							</ListGroupItem>
							<ListGroupItem style={{textAlign:'center',padding:0,verticalAlign:"top",margin:"10px 0 10px 10px"}}>
								
								<span style={{display:'inline-block',height:58,fontSize:14}}>客户:</span>
							
							</ListGroupItem>
							<ListGroupItem style={{padding:0}}>
								
								<KrField  name="customerId" placeholder="请输入客户名称" component="searchCompany"  onChange={this.changeCustomer}  style={{width:252,marginTop: 7,marginRight:7}}/>
								
							</ListGroupItem>
							<ListGroupItem style={{padding:0}}>
								
								<Button type='search'  searchClick={this.openAdvancedQueryDialog} searchStyle={{marginLeft:5,marginTop:16,display:'inline-block'}}/>
							
							</ListGroupItem>
						</ListGroup>
					</div>
				</form>
			</div>
)
	}
}
const validate = values => {

	const errors = {}


	return errors
}
SearchDetailForm = reduxForm({
	form: 'SearchDetailForm',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(SearchDetailForm);
