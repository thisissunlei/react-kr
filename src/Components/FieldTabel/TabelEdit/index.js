import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form'

import KrField from '../../KrField';
import Checkbox from '../../Checkbox'
import {
	arrReverse
} from 'kr/Utils';
import './index.less'
var tabelLength = 0;
export default class  TabelEdit extends React.Component {

	static PropTypes = {
		inline:React.PropTypes.bool,
		requireBlue:React.PropTypes.bool,
	}

	constructor(props){
		super(props)
		this.state = {
			checkedArr:[],
			handeCheck:false,
		}
		
	}
	handeOnCheck = (event) =>{
		var handeCheck=event.target.checked;
		this.setState({
			handeCheck,
		})
		
	}
	rowCheck = (checked,index) =>{
		
		var checkedArr = [].concat(this.state.checkedArr);
		var key = checkedArr.indexOf(index);
		
		if(checked){
			if(key===-1){
				checkedArr.push(index);
			}
		}else{
			if(key!==-1){
				checkedArr.splice(index,1);
			}
		}
		console.log(checkedArr,">>>")
		this.setState({
			checkedArr,
		})

	}
	titleRender = () =>{
		const {handeCheck} = this.state;
		return(
			<tr className="hander">
				<td>
					{/*<input type="checkbox" onChange={this.onCheck} checked={checked}/>*/}
					<input onChange ={this.handeOnCheck} 
						name="mm"
						type="checkbox" 
						checked={handeCheck}
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
	}
	subRow = (fields) =>{

		let {checkedArr} = this.state;

		var newArr = arrReverse(checkedArr);
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
							<KrField
								style={{marginRight:3,}}
								name={`${brightsStr}.checkedff`}
								type="checkBox"
								onCheck = {(checked)=>{
									self.rowCheck(checked,index)
								}}
								component={self.renderField}
							
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
	
		let {requireLabel,requireBlue,label,children,style,inline,name} = this.props;
		
        return (
            <div className = "ui-tabel-edit"> 
			
				
			<FieldArray name={name} component={this.renderBrights}/>
				
                
            </div>
        );
	}
}
