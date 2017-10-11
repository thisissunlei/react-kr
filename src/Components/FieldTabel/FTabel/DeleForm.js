import React from 'react';
import Button from '../../Button';
import './index.less';
export default class DeleForm extends React.Component{

	constructor(props,context){
		super(props, context);
	}

     onSubmit=()=>{
        const {onSubmit}=this.props;
        onSubmit && onSubmit();
    }

    onCancel=()=>{
        const {onCancel}=this.props;
        onCancel && onCancel();
    }


	render(){

		return(

			<div>
                <p style={{textAlign:'center',color:'#333',fontSize:'14px',marginTop:'41px'}}>确定删除所选字段吗？</p>
                 <div className='ftable-dele'><div style={{marginRight:30,display:'inline-block'}}><Button  label="确定" onClick={this.onSubmit}/></div>
                 <Button  label="取消" type="button" cancle={true} onClick={this.onCancel} /></div>                      
			</div>
		);
	}

}
