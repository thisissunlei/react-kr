import React from 'react';
import {
	KrField,
	FdTabel,
	FContent,
	FRow,
	Section,
	IconTip
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
var tableData = [
	{name:'1liu',age:12,other:'1什么鬼',date:1504108800,select:'true'},
	{name:'2liu',age:13,other:'2什么鬼',date:1504108800,select:'true'},
	{name:'3liu',age:14,other:'3什么鬼',date:1504108800,select:'true'},
	{name:'4liu',age:15,other:'4什么鬼',date:1504108800,select:'false'},
	{name:'5liu',age:16,other:'5什么鬼',date:1504108800,select:'true'},
	]
class EditTable  extends React.Component{

	constructor(props,context){
		super(props, context);
	}

	onCancel=()=>{
		const {
		 onCancel
	 } = this.props;
	 onCancel && onCancel();
	}

	 onSubmit=()=>{
	 const {
		 onSubmit
	 } = this.props;
	 onSubmit && onSubmit();
 }
 componentDidMount() {
	 Store.dispatch(change('EditTable','tableData',tableData));
 }


	render(){

	 let {handleSubmit}=this.props;

		return(

			<div>
				{/*<IconTip>
				  <div>1、表单表名最长30个字，限定为字母、数字、下划线、必须以字母开头，不能以下划线结尾；</div>
					<div>2、表单表名可以不填，不填的话保存时候自动生成表名，规则为：wf_ft_主键。</div>
				</IconTip>*/}


				<form onSubmit={handleSubmit(this.onSubmit)} >
					<FdTabel
						name = "tableData"
						isFold = {true}
		 				initFoldNum = "3"
					>
						<FRow name = "age" label = "年龄" />
						<FRow name = "name" label = "姓名" />
						<FRow name = "other" label = "其他" />
						<FRow name = "select" label = "选择" options={[{value:'true',label:'we'},{value:'false',label:'he'}]}/>
						<FRow type='date' name='date' label='日期' format="yyyy-mm-dd" />
						<FRow label = "其他" type='operation' component={(item)=>{
							 return <div>{item.name}</div>
						}}/>
					</FdTabel>

				</form>

			</div>
		);
	}

}

export default reduxForm({
	form: 'EditTable'
})(EditTable);
