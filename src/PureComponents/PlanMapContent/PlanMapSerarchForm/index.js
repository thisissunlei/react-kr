import React from 'react';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';

import {
	Actions,
	Store,
	connect
} from 'kr/Redux';

import {
	KrField,
	Message
} from 'kr-ui';
import './index.less';

class PlanMapSerarchForm extends React.Component {


	constructor(props) {
		super(props);
		this.state={
			inputStart:"",
			inputEnd:""
		}
	}

	floorsChange = (data) => {
		
		const {floorsChange} = this.props;
		floorsChange && floorsChange(data.value);
	}
	onSubmit = () =>{
		const {inputStart,inputEnd} = this.state;
		if(!inputStart || !inputEnd || isNaN(inputStart)|| isNaN(inputEnd)){
			Message.error("请输入数字");
		}


	}
	inputStart = (value) => {
		this.setState({
			inputStart:value,
		})
	}
	inputEnd = (value) => {
		this.setState({
			inputEnd:value,
		})
	}



	render() {

        const {data,handleSubmit}= this.props;
		return (

			<form  className="m-PlanMap-searchForm"  style = {{position: "relative",top:15}}>

				<div style = {{display:"inline-block",width:180}}>
              		 <KrField  label="社区名称:" component="labelText" value={data.name} inline={true} style = {{display:"inline-block"}}/>
				</div>
				<div style = {{display:"inline-block",width:160}}>
              		 <KrField  label="楼层：" name="roundId" component="select" inline={true}
						options={data.floors}
						requireLabel={false}
						onChange = {this.floorsChange}
					 />
				</div>
				<div className = "plan-map-num" style = {{display:"inline-block"}}>
              		<KrField label="选择工位：" name="numStart" component="input" inline={true} placeholder = "请输入工位编号" onChange = {this.inputStart} />
				</div>
				<div style = {{display:"inline-block",height:40,lineHeight:"40px",marginLeft:10,position:"relative",top:8}} >
              		--
				</div>
				<div className = "plan-map-num"  style = {{display:"inline-block"}}>
              		<KrField  label="" name="numEnd" component="input" inline={true} placeholder = "请输入工位编号" onChange = {this.inputEnd}/>
				</div>
				<botton className = "plan-map-num"
					style = {{
								display:"inline-block",
								height:40,
								lineHeight:"40px",
								top:8,
								marginLeft:10,
								color:"#499df1",
								position:"relative",
								cursor: "pointer"

							}}
					onClick = {this.onSubmit}
				>
              		选择
				</botton>
			</form>



		);
	}
}

export default reduxForm({
	form: 'PlanMapSerarchForm'
})(PlanMapSerarchForm);
