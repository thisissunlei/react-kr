import React from 'react';
import {	
	KrField,
    Grid,
    Col,
    Row,
    ButtonGroup,
    Button
} from 'kr-ui';
import {Http} from 'kr/Utils';
import {reduxForm,initialize}  from 'redux-form';
import {Store} from 'kr/Redux';
import './index.less';

export default class  BasicInfo extends React.Component{

	constructor(props,context){
		super(props, context);
        this.state={
           
        }
	}

    componentDidMount(){
      
    }
   
  
    onSubmit=(values)=>{
        const {onSubmit}=this.props;
        onSubmit && onSubmit(values);
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }

	render(){

        let {handleSubmit}=this.props;
       

		return(

			<div className='m-node-basic'>
                       <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="name"
                            component="input"
                            label="机构分权名称"
                            requireLabel={true}
						/>
                        <div className='add-code'><KrField grid={1/2}
                            style={{width:262,marginLeft:32,marginBottom:5}}
                            name="code"
                            component="labelText"
                            label="编码"
                            value={code}
                            requireLabel={true}
                            inline={false}
						/></div>

                        <KrField grid={1/2}
                            style={{width:262,marginBottom:5}}
                            name="dimId"
                            component="labelText"
                            label="所属纬度"
                            value={dimName}
                            requireLabel={true}
                            inline={false}
						/>

                         <div className='m-edit-enable'><KrField style={{width:262,marginLeft:32}} name="enable" component="group" label="是否启用" requireLabel={true}>
 							 <KrField name="enable" label="启用" type="radio" value='1' />
 							 <KrField name="enable" label="不启用" type="radio" value='0' />
 						</KrField></div>

                        <KrField grid={1} label="描述" name="desc" heightStyle={{height:"78px",width:'542px'}} style={{width:552}} component="textarea"  maxSize={30} placeholder='请输入描述'  lengthClass='role-len-textarea'/>

                        
			</div>
		);
	}
}
