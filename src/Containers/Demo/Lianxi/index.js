import React from 'react';
import DictionaryConfigs from 'kr/Configs/dictionary';
import {
	KrField,
	FdTabel,
	FContent,
	FRow,
	Section,
	IconTip,
	TextDic,
	Checkbox,
	AllCheck
} from 'kr-ui';
import {
	Actions,
	Store,
	connect
} from 'kr/Redux';
import {
	reduxForm,
	change
} from 'redux-form';
import './index.less';

class EditTable  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			
		}
		this.config=[
			{label:'2-102',checked:false},
			{label:'2-103',checked:false},
			{label:'2-104',checked:true},
			{label:'2-105',checked:false},
			{label:'2-106',checked:true},
			{label:'2-107',checked:false},
		];
	}
  
	
	componentDidMount() {
		
	}
	 
	onChange=(params)=>{
    console.log('onChange',params);
	}

	allCheck=(params)=>{
    console.log('allCheck',params);
	}

	noSameCheck=(params)=>{
    console.log('noSameCheck',params);
	}
	
    
	render(){
		
		var codes='444      ,    455555     ,898989889，        ';
	    var code=codes.replace(/\s+/g,"");
		var codeEnd=code.replace('，',',');
		console.log('codeEnd',codeEnd);
        
		return(

			<div>
			  <AllCheck  
				 config={this.config} 
				 onChange={this.onChange}
				 allCheck={this.allCheck}
				 noSameCheck={this.noSameCheck}
				/>
			</div>
		);
	}
}

export default reduxForm({
	form: 'EditTable'
})(EditTable);
