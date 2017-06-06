import React, {
	PropTypes
} from 'react';

import {
	reduxForm,
} from 'redux-form';
import {DateFormat} from 'kr/Utils';

import {
	KrField,
	ListGroup,
	ListGroupItem,
} from 'kr-ui';
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
	
	onSubmit=()=>{

	}

	changeCommunity=(item)=>{
		
		if(!item || !item.id){
			State.communityId = '';
		}else{
			State.communityId = item.id;
		}
		State.getCollectList();

	}

	onTimeChange=(endDate)=>{

		State.endDate = endDate;
		State.getCollectList();
	}

	render() {
		let {handleSubmit} = this.props;
		let {timeDefaultValue}=this.state;
		return (
			<div className="search-form-aging-account" >
				<form onSubmit={handleSubmit(this.onSubmit)} >
					<img className="title-img" src={require('../images/staticNotOpen.svg')}/>
					<p className="title">
						<span className="black">账龄数据统计--</span>
						<span>实时更新</span>
					</p>
					
					<div className="right-cont">
						<ListGroup style={{height:50,lineHeight: 50}}>
							<ListGroupItem style={{padding:0,color:'#333',verticalAlign:"top",display:"inline-block",margin:0,marginTop:15}}>
								
								<span style={{height:58,fontSize:14}}>统计截止日期:</span>
							
							</ListGroupItem>
							<ListGroupItem style={{padding:0,mrginright:10}}>
								
								<KrField name="endDate"  component="date" onChange={this.onTimeChange} style={{width:252,marginTop: 7}} placeholder={timeDefaultValue} />
							
							</ListGroupItem>
							<ListGroupItem style={{textAlign:'center',padding:0,verticalAlign:"top",margin:"13px 0 0px 10px"}}>
								
								<span style={{display:'inline-block',height:58,fontSize:14}}>社区:</span>
							
							</ListGroupItem>
							<ListGroupItem style={{padding:0}}>

								
								<KrField  name="collectCommunityId" component="searchCommunityList"  inline={false} onChange={this.changeCommunity} requireLabel={false}  style={{width:252,marginTop: 7,marginRight:7}}/>
								
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
