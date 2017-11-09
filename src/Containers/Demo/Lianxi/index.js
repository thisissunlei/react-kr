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
	Toolbar,
	Drawer
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
	LocationChoice,
	FromsConfig
} from 'kr/PureComponents';
import './index.less';
import { data } from "./data";
import Add from './Add';

export default class EditTable  extends React.Component{

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
	  Store.dispatch(change('EditTable', 'businessBegin', '10:30'));
	  Store.dispatch(change('EditTable', 'address',{laber:"求仙桥",id:22})); 
	  Store.dispatch(change('EditTable', 'df',44)); 
	  Store.dispatch(change('EditTable','codeMore',[{label:'123',value:'1',checked:true},{label:'456',value:'2',checked:false}]));
	}
	
	delSwidth=()=>{
		this.onClick();
	}

	delSubmit=(values)=>{

	}
	
	render(){
		
		console.log(data,"=========")
		return(

			<div>
			    <div onClick={this.onClick}>点击</div>
				{/*开通门禁*/}
				<Drawer
					title="删除职务"
					width={750}
					onClose={this.delSwidth}
					open={this.state.openAdd}
					contentStyle ={{ width: '700px',height:'auto'}}
				>
					{/*<FromsConfig detail={data.data.tables} />*/}
					<Add
						onCancel={this.delSwidth}
						onSubmit={this.delSubmit}
					/>
				</Drawer>
			</div>
		);
	}
}

