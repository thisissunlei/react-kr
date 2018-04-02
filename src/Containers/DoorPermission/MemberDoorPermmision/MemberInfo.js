

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
	Section
} from 'kr-ui';
import './index.less';
import {DateFormat} from 'kr/Utils';


import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer



class MemberInfoForm extends React.Component{
	constructor(props){
		super(props);
		this.state={

		}
	}
	componentDidMount(){
		
    }

    setMemberInfo=()=>{
            
		let {memberDetailInfo} = this.props;
        Store.dispatch(initialize('MemberInfoForm', memberDetailInfo));
        
    }

    onSubmit=()=>{

    }
    
	

	

	render(){
		const { error, handleSubmit, pristine, reset,content,filter,memberDetailInfo} = this.props;
		console.log("memberDetailInfo",memberDetailInfo);

		return (
			<Section title={`个人信息`} description="" >
			
				<form onSubmit={handleSubmit(this.onSubmit)} className="member-info-top">
					{memberDetailInfo.companyInfo &&<KrField
						style={{width:'252px',marginRight:30}}
						inline={true}
						component="labelText"
						label="姓名："
						value={memberDetailInfo.companyInfo.mbrName}
					/>}

					{memberDetailInfo.accountInfo && <KrField
						style={{width:'252px',marginRight:30}}
						inline={true}
						component="labelText"
						label="联系电话："
						value={memberDetailInfo.accountInfo.phone}
					/>}

					{memberDetailInfo.contacts && <KrField
						style={{width:'252px',marginRight:30}}
						inline={true}
						component="labelText"
						label="邮箱："
						value={memberDetailInfo.contacts.email}
					/>}

					
					{ memberDetailInfo.companyInfo &&<KrField
						style={{width:'252px',marginRight:30}}
						inline={true}
						component="labelText"
						label="社区名称："
						value={memberDetailInfo.companyInfo.cmtName}
					/>}

					{memberDetailInfo.companyInfo && <KrField
						style={{width:300,marginRight:30}}
						inline={true}
						component="labelText"
						label="公司："
						value={memberDetailInfo.companyInfo.companyName}
					/> }


					

				</form>
			</Section>
		);
	}
}

export default MemberInfoForm = reduxForm({
	form: 'MemberInfoForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(MemberInfoForm);
