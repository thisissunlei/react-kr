import React from 'react';
import {
	KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button
} from 'kr-ui';
import {reduxForm}  from 'redux-form';
import './index.less';

class UserImageChange  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	onSubmit=(param)=>{

	}

	clamp=(param)=>{
		const {clamp}=this.props;
    clamp && clamp(param);
	}

	render(){

        let {handleSubmit,personId}=this.props;

		return(

			<div className='detail-user-image'>
				 <form  onSubmit={handleSubmit(this.onSubmit)}>

                       <KrField
                            name="area"
                            component="oaUploadImage"
                            requireLabel={false}
														personId={personId}
														requestUrl='http://optest02.krspace.cn/api/krspace-erp-web/hrm/resource/upload-photo/type/avatar'
						/>
         </form>
			</div>
		);
	}
}

const validate = values =>{
	const errors = {};

	return errors
}

export default reduxForm({ form: 'UserImageChange',validate})(UserImageChange);
