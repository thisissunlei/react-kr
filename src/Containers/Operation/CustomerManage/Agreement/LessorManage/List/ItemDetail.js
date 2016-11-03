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
          console.log('detail',detail)
      
         if(detail.enableflag==true){
         	detail.flag="启用"
         }else if(detail.enableflag==false){
         	detail.flag="不启用"
         }
        

		return (

			<div>
      			<KrField name="corporationName" component="labelText"  label="出租方名称" value={detail.corporationName} /> 
        		<KrField name="enableflag" component="labelText"  label="是否启用" value={detail.flag}/> 
        		<KrField name="corporationAddress" component="labelText" type="text" label="详细地址" value={detail.corporationAddress} /> 
        		<KrField name="corporationDesc" component="labelText" label="备注"  placeholder="备注信息" value={detail.corporationDesc} /> 
			</div>
			
		);
	}
}
