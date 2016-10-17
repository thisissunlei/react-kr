import React, {Component, PropTypes} from 'react';
import {connect} from 'kr/Redux';

import {reduxForm,formValueSelector} from 'redux-form';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
} from 'kr-ui';


export default  class ItemDetail extends Component{

	 static PropTypes = {
		 detail:React.PropTypes.object,
		 onCancel:React.PropTypes.func,

	 }
    
	constructor(props){
		super(props);
		this.onCancel = this.onCancel.bind(this);
	}

	 onCancel(){
		 const {onCancel} = this.props;
		 onCancel && onCancel();
	 }

	render(){

        let detail=this.props.detail;
         
        
        /*let detail={
            accountcode:"feihuikuan" ,
            accountname:"niaho",
            accounttype:1,
            ordernum:66,
            accountdesc:"ttttt",
            enableflag:1
         }
        */
         if(detail.enableflag=="0"){
         	detail.enableflag="启用"
         }else if(detail.enableflag=="1"){
         	detail.enableflag="不启用"
         }
        
         if(detail.accounttype=="INCOME"){
         	detail.accounttype="收入"
         }else if(detail.accounttype=="PAYMENT"){
         	detail.accounttype="回款"
         }

		return (

			<div>
               <KrField component="labelText" label="科目编码" value={detail.accountcode}/>
               <KrField component="labelText" label="科目名称" value={detail.accountname}/>
               <KrField component="labelText" label="科目类别" value={detail.accounttype}/>
               <KrField component="labelText" label="排序号" value={detail.ordernum}/>
               
               <KrField component="labelText" label="是否启用"  value={detail.enableflag}/>
             
               <KrField component="labelText" label="描述" value={detail.accountdesc}/>

               <Button  label="取消" type="button"  onTouchTap={this.props.onCancel} />
			</div>
			
		);
	}
}
