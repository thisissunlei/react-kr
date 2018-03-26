

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

		return (
			<form onSubmit={handleSubmit(this.onSubmit)} className="member-info-top">
				<KrField
					style={{width:'252px',marginRight:30}}
					inline={true}
					component="labelText"
					label="姓名："
					value={memberDetailInfo.name}
				/>

                <KrField
					style={{width:'252px',marginRight:30}}
					inline={true}
					component="labelText"
					label="联系电话："
					value={memberDetailInfo.phone}
				/>

                <KrField
					style={{width:'252px',marginRight:30}}
					inline={true}
					component="labelText"
					label="邮箱："
					value={memberDetailInfo.email}
				/>

                
                <KrField
					style={{width:'252px',marginRight:30}}
					inline={true}
					component="labelText"
					label="社区名称："
					value={memberDetailInfo.communityName}
				/>

                <KrField
					style={{width:300,marginRight:30}}
					inline={true}
					component="labelText"
					label="公司："
					value={memberDetailInfo.companyName}
				/>


                

			</form>
		);
	}
}

export default MemberInfoForm = reduxForm({
	form: 'MemberInfoForm',
	// validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(MemberInfoForm);
