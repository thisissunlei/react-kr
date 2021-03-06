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
	Message,
	Button
} from 'kr-ui';
import './index.less';

class PlanMapSerarchForm extends React.Component {


	constructor(props) {
		super(props);
		this.state={
			inputStart:"",
			inputEnd:"",
			newFlow:0,
			floors:this.props.data.floors[0]
		}
	}

	floorsChange = (data) => {
		const {floorsChange} = this.props;
		if(!data){
			data = this.props.data.floors[0]
		}
		console.log("-------",data)
		this.setState({
			floors:data.value
		},function(){
			Store.dispatch(change('PlanMapSerarchForm','floor',data.value));
			floorsChange && floorsChange(data.value);
		})
		
	}
	onSubmit = () =>{
		const {inputStart,inputEnd} = this.state;
		const {onSubmit} = this.props;
		if(!inputStart || !inputEnd || isNaN(inputStart)|| isNaN(inputEnd)){
			Message.error("请输入数字");
		}
		onSubmit && onSubmit({inputStart:inputStart,inputEnd:inputEnd});

	}
	allOnSubmit = () =>{
		const {allOnSubmit} = this.props;
		allOnSubmit && allOnSubmit();
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
	componentDidMount() {
		
		
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.data && nextProps.data.floors.length ==0 ){
			return ;
		}
		
        const {data}= nextProps;
        if(nextProps.data != this.props.data){
        	this.setState({
        		floors: data.floors[0]
        	})
        	console.log('componentWillReceiveProps---->')
			Store.dispatch(change('PlanMapSerarchForm','floor', data.floors[0]));

        }
	}
	rangeSelect=(event)=>{
		console.log('======',event);
		var scaleSize = Number(event.target.value);
		var scaleNumber = parseInt(event.target.value * 100);
		let value = {
			scaleSize,
			scaleNumber
		}
		let {rangeSelect} = this.props;
		rangeSelect && rangeSelect(event)
	}

	render() {

        const {data,scaleNumber}= this.props;
		return (

			<form  className="m-PlanMap-searchForm"  style = {{position: "relative",top:15}}>

				<div style = {{display:"inline-block",width:180}}>
              		 <KrField  label="社区名称:" component="labelText" value={data.name} inline={true} style = {{display:"inline-block"}}/>
				</div>
				<div style = {{display:"inline-block",width:160}}>
              		 <KrField  label="楼层：" name="floor" component="select" inline={true}
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
				<div className="num-type">
                        <span className="til">当前比例：</span>
                        <input type="range" value={scaleNumber/100} min="0.1" max="2" step="0.1" onChange={this.rangeSelect} style={{verticalAlign:'middle'}}/>
                        <output>{scaleNumber}</output>%
                    </div>
				<div className = "plan-map-num"  style = {{display:"inline-block",float:"right",marginRight:30,marginTop:13}}>
					<Button  label="保存" onClick = {this.allOnSubmit} />
				</div>
			</form>



		);
	}
}

export default reduxForm({
	form: 'PlanMapSerarchForm'
})(PlanMapSerarchForm);
