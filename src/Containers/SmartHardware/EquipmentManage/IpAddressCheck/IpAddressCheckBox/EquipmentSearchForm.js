
import React from 'react';
import {reduxForm,change,initialize,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	ListGroup,
	ListGroupItem,
	Message
} from 'kr-ui';
import './index.less';
import State from './State';
import {
	observer
} from 'mobx-react';
@observer


class IpAddressCheck extends React.Component{
	constructor(props){
		super(props);
		this.state={
			communityId : '',
			listUrl : ''
		}
	}

	componentDidMount(){

	}
	

	// 提交
	onSubmit=(values)=>{
		// console.log("values",values);
	}

	onChangeCommunity=(value)=>{

		var searchParams = {communityId : value.id }
		let {getRepeatIpListProps} = this.props;
		getRepeatIpListProps && getRepeatIpListProps(searchParams,"checkRepeatIpAddress"); 
	
	}






	render(){
		
		const { error, handleSubmit,content,filter} = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit)} style={{width:"100%",marginTop:20,position:"relative"}} className="son-equipment-search">
					<span className="fir-span">
						<KrField name="communityId"
							component="searchCommunityAll"
							label="社区名称："
							style={{width:'237px'}}
							onChange = {this.onChangeCommunity}
							inline={true}
						/>
					</span>
					{/* <Button label="查看重复IP"  onTouchTap={this.getRepeatIpList} className="button-list"/> */}
		  </form>
		);
	}
}
export default IpAddressCheck = reduxForm({
	form: 'IpAddressCheck',
	// validate,
	// enableReinitialize: true,
	// keepDirtyOnReinitialize: true,
})(IpAddressCheck);
