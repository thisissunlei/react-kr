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
        this.titleData.communityId = value.id;
        this.getAddressFormwork(value.id);
       
    }
    //模糊查询
    codeChange=(value)=>{
        let {codeChange}=this.props;
        this.titleData.searchKey = value;
       
    }
    //获取模板
    getAddressFormwork = (communityId) =>{
        let _this = this;
        Http.request("get-address-formwork", { communityId: communityId }).then(function (response) {
            _this.titleData.addressId = response.items[0].value;
            _this.titleData.addressFormwork = response.items[0].label;
        }).catch(function (err) {

        });
    } 
    //
    btnClick = () =>{
       
        let { getFormworkNum} = this.props;
        let param = Object.assign({},this.titleData);
        console.log(param,"888888");
        getFormworkNum && getFormworkNum(param)
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
                    label="编号"
                    onChange = {this.codeChange}
                    requireLabel={false}
                    inline={false}
                />
               
                <div style = {{display:"inline-block",marginLeft:40,marginBottom:15}}>
                    <Button label="查询" onClick = {this.btnClick}/>
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