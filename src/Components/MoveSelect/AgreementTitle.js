import React from 'react';

import Button from "../Button";
import KrField from "../KrField";
import {
	Field,
	reduxForm,
     initialize,
} from 'redux-form';
import {
    Http
} from 'kr/Utils';

class AgreementTitle  extends React.Component{

	constructor(props,context){
        super(props, context);
        this.state = {
            other:'',
        }
        this.titleData = {
            communityId:'',
            addressId:'',
            searchKey:'',
            allWhenNull:true,
            addressFormwork:'',
        }

	}
    //社区下拉
    communityChange=(value)=>{
        let {communityChange}=this.props;
        this.titleData.addressId = value.value||'';
        this.titleData.addressFormwork = value.addressTemp||'';
        this.setState({
            other:new Date(),
        })
       
    }
    //模糊查询
    codeChange=(value)=>{
        let {codeChange}=this.props;
        this.titleData.searchKey = value;
       
    }
    btnClick = () =>{
       
        let { getFormworkNum} = this.props;
        let param = Object.assign({},this.titleData);
        
        getFormworkNum && getFormworkNum(param)
    }

	render(){

        let {floors,type,handleSubmit}=this.props;
		return(
            <div className='m-type-post'>
                <KrField grid={1/2}
                    style={{width:262,marginLeft:32,marginBottom:5}}
                    name="communityId"
                    component="searchSelect"
                    label="社区名称"
                    requireLabel={false}
                    inline={false}
                    selectUrl = "get-address-formwork"
                    onChange = {this.communityChange}
                />
                <KrField grid={1/2}
                    style={{width:262,marginLeft:34,marginBottom:5}}
                    name="floor"
                    component="input"
                    label="编号"
                    onChange = {this.codeChange}
                    requireLabel={false}
                    inline={false}
                />
               
                <div style = {{display:"inline-block",marginLeft:40,marginBottom:15}}>
                    <Button label="查询" onClick = {this.btnClick}/>
                </div>
                {this.titleData.addressFormwork && <div style = {{marginLeft:40,padding:'10px 0px'}}>
                    {this.titleData.addressFormwork}
                </div>}
            </div>		
		);
	}

}
const validate = values =>{
    const errors = {};

	return errors
}

export default reduxForm({ form: 'AgreementTitle',validate})(AgreementTitle);