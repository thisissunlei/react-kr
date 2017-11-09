import React from 'react';

import Button from "../Button";
import KrField from "../KrField";
import {
	Field,
	reduxForm,
     initialize,
} from 'redux-form';

class AgreementTitle  extends React.Component{

	constructor(props,context){
        super(props, context);
        this.params = {
            communityId:'',
            floor:''
        }

	}

    communityChange=(value)=>{
        let {communityChange}=this.props;
        // console.log(value, ">>>>>>")
        this.params.communityId = value.value;
        communityChange && communityChange(value);
    }

    codeChange=(value)=>{
        let {codeChange}=this.props;
        this.floor = value;
        // console.log(value, ">>>>>>")
        codeChange && codeChange(value);
    }

    onSubmit=()=>{
        let {onSubmit} = this.props;
        var values = Object.assign({},this.params);
        onSubmit && onSubmit(values);
    }

	render(){

        let {floors,type,handleSubmit}=this.props;

		return(
            <div className='m-type-post'>
                <KrField grid={1/2}
                    style={{width:262,marginLeft:32,marginBottom:5}}
                    name="communityId"
                    component="searchCommunityAll"
                    label="社区名称"
                    requireLabel={false}
                    inline={false}
                    onChange = {this.communityChange}
                />
                <KrField grid={1/2}
                    style={{width:262,marginLeft:34,marginBottom:5}}
                    name="floor"
                    component="input"
                    label="类型"
                    onChange = {this.codeChange}
                    requireLabel={false}
                    inline={false}
                />

                <div style = {{display:"inline-block",marginLeft:40,marginBottom:15}}>
                    <Button  label="查询" onClick = {this.onSubmit}/>
                </div>
            </div>		
		);
	}

}
const validate = values =>{
    const errors = {};

	return errors
}

export default reduxForm({ form: 'AgreementTitle',validate})(AgreementTitle);