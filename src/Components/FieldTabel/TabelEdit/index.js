import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form'

import KrField from '../../KrField';
import Checkbox from '../../Checkbox'
import {
	arrReverse
} from 'kr/Utils';
import './index.less'
var tabelLength = 0;
var titleChecked = false;
export default class  TabelEdit extends React.Component {

	static PropTypes = {
		inline:React.PropTypes.bool,
		requireBlue:React.PropTypes.bool,
	}

	constructor(props){
		super(props)
		this.state = {
			checkedArr:[],
			other:0,
		}
		
	}
	clearCheckBox = (type) =>{
		for(let i = 0;i<tabelLength;i++){
			if(type){
				if(this["checkbox"+i]){
					this["checkbox"+i].checked = false;
				} 
			}else{
				this["checkbox"+i].checked = true;
			}
			
			
		}
	}
	handeOnCheck = (event) =>{
		var handeCheck=event.target.checked;
		if(handeCheck){
			this.clearCheckBox(false);
		}else{
			this.clearCheckBox(true);
		}
		console.log("pppp",handeCheck);
		titleChecked = handeCheck;
		
		
		
	}
	rowCheck = (event,index) =>{
		
		var checkedArr = [].concat(this.state.checkedArr);
		var key = checkedArr.indexOf(index);
		
		if(event.target.checked){
			if(key===-1){
				checkedArr.push(index);
			}
		}else{
			if(key!==-1){
				checkedArr.splice(index,1);
			}
		}
		if(checkedArr.length === tabelLength){
			this.titleCheckbox.checked = true;
		}else{
			titleChecked = true;
			this.titleCheckbox.checked = false;
		}
		this.setState({
			checkedArr,
		})

	}
	titleRender = () =>{
		
		return(
			<tr className="hander">
				<td>
					<input onChange ={this.handeOnCheck} 
						ref = {(ref)=>{
							this.titleCheckbox = ref;
						}}
						name="mm"
						type="checkbox" 
					/>


				</td>
				<td>选项文字</td>
				<td>选项值</td>
				<td>排序号</td>
				<td>是否默认</td>
			</tr>
		)
	}
	addRow = (fields) =>{
		fields.push();
		console.log(titleChecked,">>>>")
		setTimeout(()=>{

			if(titleChecked){
				this.clearCheckBox(false);
			}
		},50)
		
		
		
		
		

	}
	subRow = (fields) =>{
		console.log("PPPP")

		let {checkedArr} = this.state;

		var newArr = arrReverse(checkedArr);
		if(newArr.length){
			this.clearCheckBox(true);
		}
		newArr.map((item,index)=>{
			fields.remove(item);
		})

		this.setState({
			checkedArr:[]
		})

	}

	renderField = ({ input, label, placeholder, meta: { touched, error }}) => (
		<div>
			<label>{label}</label>
			<div>
			<input {...input}  placeholder={label||placeholder}/>
			{touched && error && <span>{error}</span>}
			</div>
		</div>
	)
	
	

	renderBrights = ({ fields, meta: { touched, error }}) => {
		const self = this;
	
		tabelLength = fields.length;
		
	 
	   var brights = fields.map(function(brightsStr, index){
				// var key = checkedArr.indexOf(index);
				return (<tr key={index} >
						
						<td>
							<input 
							   type="checkbox"
								onChange = {(event)=>{
									self.rowCheck(event,index)
								}}
								ref = {(ref)=>{
									self["checkbox"+index] = ref;
								}}
								
							
							/>
						
						</td>
						<td>
							<KrField
								style={{marginRight:3,}}
								name={`${brightsStr}.name`}
								type="tableEdit"
								component={self.renderField}
								placeholder='子项名称'
							/>
						</td>
						<td>
							<KrField
								style={{marginRight:3,}}
								name={`${brightsStr}.code`}
								type="tableEdit"
								component={self.renderField}
								
							/>
						</td>
						<td>
							<KrField
								style={{marginRight:3,}}
								name={`${brightsStr}.checked`}
								type="tableEdit"
								component={self.renderField}
								
							/>
						</td>
						<td>
							<KrField
								style={{marginRight:3,}}
								name={`${brightsStr}.checked`}
								type="checkBox"
								component={self.renderField}
								placeholder='子项名称'
							/>
						</td>
					</tr>)
	   		})
			return(
				<div>
					{this.toolbarRender(fields)}
					<table>
						{this.titleRender()}
						{brights}
					</table>
				</div>	
			) 
	}
	toolbarRender = (fields) => {
		return (
			<div>
				<span className = "add" onClick = {()=>{
						this.addRow(fields)
					}}></span>
				<span className = "sub" onClick = {()=>{
						this.subRow(fields)
					}}>
				</span>
			</div>
			)
	}
	
	
	
	

	
	render(){
		console.log("render")
		let {requireLabel,requireBlue,label,children,style,inline,name} = this.props;
		
        return (
            <div className = "ui-tabel-edit"> 
			
				
				<FieldArray name={name} component={this.renderBrights}/>
				
                
            </div>
        );
	}
}
