import React from 'react';
import DictionaryConfigs from 'kr/Configs/dictionary';
import {
	KrField,
	CheckTable,
	FdRow,
	Section,
	IconTip,
	TextDic,
	Checkbox,
	AllCheck,
	Button,
	Dialog,
	Toolbars,
	Toolbar
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
import {
	LocationChoice
} from 'kr/PureComponents';
import './index.less';
import Add from './Add';

class EditTable  extends React.Component{

	constructor(props,context){
		super(props, context);
		this.state={
			openAdd:false,
		}
	}

	onClick=()=>{
      this.setState({
		openAdd:!this.state.openAdd
	  })
	  Store.dispatch(change('EditTable','countyId',38));
	  Store.dispatch(change('EditTable','businessBegin','10:30'));
	  Store.dispatch(change('EditTable','codeMore',[{label:'123',value:'1',checked:true},{label:'456',value:'2',checked:false}]));
	}
	
	delSwidth=()=>{
		this.onClick();
	}

	delSubmit=(values)=>{

	}
	
	render(){
		
		
		return(

			<div>
				{/*开通门禁*/}
				<Dialog
					title="删除职务"
					onClose={this.delSwidth}
					open={this.state.openAdd}
					contentStyle ={{ width: '700px',height:'auto'}}
				>
					<Add
						onCancel={this.delSwidth}
						onSubmit={this.delSubmit}
					/>
				</Dialog>
			</div>
		);
	}
}

export default reduxForm({
	form: 'EditTable'
})(EditTable);
