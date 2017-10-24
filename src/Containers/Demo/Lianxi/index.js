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
	Checkbox
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
			checked:false
		}
	}

	
	componentDidMount() {
		
	}

	onCheck=()=>{
	   this.setState({
		checked:!this.state.checked
	   })
	}

	render(){

		let {checked}=this.state;
		
		let config=[
			'2-201','2-202','2-203','2-204','2-205','2-206','2-207'
	       ,'2-208'];

		return(

			<div>
			  <div>全选</div>
			  <div>反选</div>	
			  {
				config.map((item,index)=>{
					return <Checkbox label={item} checked={checked} 
					{(event,item,index)=>{
						
					}}
				  />
				})  
			  }

			</div>
		);
	}

}

export default reduxForm({
	form: 'EditTable'
})(EditTable);
