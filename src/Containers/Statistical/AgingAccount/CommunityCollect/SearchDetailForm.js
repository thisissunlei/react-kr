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
} from 'kr-ui';
import './index.less';

export default class SearchDetailForm extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.detail = this.props.detail;

		this.state={

		}
	}

	onSubmit=(values)=>{
	}

	changeCommunity=(item)=>{
		let {onChange} = this.props;
		onChange && onChange(item);
	}

	changeTime=()=>{

	}

	render() {
		let {detail,handleSubmit} = this.props;
		var  yesterday = new Date(new Date().getTime() - 86400000);
		return (
			<div className="search-form-aging-account" >
				<form onSubmit={handleSubmit(this.onSubmit)} >
					<img className="title-img" src={require('../images/staticNotOpen.svg')}/>
					<p className="title">
						<span>账龄数据统计--</span>
						<span>实时更新</span>
					</p>
					
					<div className="right-cont">
						<ListGroup style={{height:50,lineHeight: 50}}>
							<ListGroupItem style={{padding:0,color:'#333',verticalAlign:"top",display:"inline-block",margin:0,marginTop:10}}>
								
								<span style={{height:58,fontSize:14}}>统计截止日期:</span>
							
							</ListGroupItem>
							<ListGroupItem style={{padding:0,mrginright:10}}>
								
								<KrField name="leaseBegindate"  component="date" onChange={this.props.onStartChange} style={{width:252,marginTop: 7}} />
							
							</ListGroupItem>
							<ListGroupItem style={{textAlign:'center',padding:0,verticalAlign:"top",margin:"10px 0 10px 10px"}}>
								
								<span style={{display:'inline-block',height:58,fontSize:14}}>社区:</span>
							
							</ListGroupItem>
							<ListGroupItem style={{padding:0}}>
								
								<KrField  name="communityId" component="searchCommunity"  onChange={this.onChangeSearchCommunity} requireLabel={false}  style={{width:252,marginTop: 7,marginRight:7}}/>
								
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
