import React from 'react';
import {
    Button,
    KrField,
} from 'kr-ui';
import {
	Field,
	reduxForm,
     initialize,
} from 'redux-form';

class AgreementTitle  extends React.Component{

	constructor(props,context){
		super(props, context);

	}

    communityChange=(value)=>{
        let {communityChange}=this.props;
        communityChange && communityChange(value);
    }

    codeChange=(value)=>{
        let {codeChange}=this.props;
        codeChange && codeChange(value);
    }

    onSubmit=(values)=>{
        let {onSubmit}=this.props;
        onSubmit && onSubmit(values);
    }

	render(){

        let {floors,type,handleSubmit}=this.props;

		return(
            
            <form onSubmit={handleSubmit(this.onSubmit)}>
				<div className='m-type-post'>
                            <KrField grid={1/2}
                                style={{width:262,marginLeft:32,marginBottom:5}}
                                name="communityId"
                                component="searchRegCommunity"
                                label="社区名称"
                                requireLabel={true}
                                inline={false}
                                onChange = {this.communityChange}
                            />
                            <KrField grid={1/2}
                                style={{width:262,marginLeft:34,marginBottom:5}}
                                name="floor"
                                component="input"
                                label="类型"
                                onChange = {this.codeChange}
                                requireLabel={true}
                                inline={false}
                            />

                            <div style = {{display:"inline-block",marginLeft:40,marginBottom:15}}>
                                <Button  label="查询" type="submit"/>
                            </div>
                    </div>
                 </form>
			
		);
	}

}
const validate = values =>{
    const errors = {};
    
    if(!values.floor && values.floor !== 0){
        errors.floor = "楼层为必选项";
    }
    if(!values.detailType){
        errors.detailType = "类型为必选项";
    }

	return errors
}

export default reduxForm({ form: 'AgreementTitle',validate})(AgreementTitle);