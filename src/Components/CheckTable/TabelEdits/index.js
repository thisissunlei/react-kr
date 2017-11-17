import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form'

import KrField from '../../KrField';
import Checkbox from '../../Checkbox'
import {
	arrReverse
} from 'kr/Utils';
import './index.less'
import Nothing from '../../Nothing';
var tabelLength = 0;
var titleChecked = false;
export default class  TabelEdit extends React.Component {

	
	constructor(props){
		super(props)
		this.state = {
			checkedArr:[],
			other:0,
			rowDetail:this.rowDetail()
		}
		
	}
	rowDetail = () =>{
		let {children} = this.props;
		var rowDetail = [];
		children.map((item,index)=>{
			rowDetail.push(item.props);
		})
		return rowDetail;
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
		var checkedArr = [];
		if(handeCheck){
			this.clearCheckBox(false);
			this.allChecked();
		}else{
			this.clearCheckBox(true);
			
		}
		
		titleChecked = handeCheck;
	
		
		
	}
	allChecked = () =>{
		var checkedArr = [];
		for(let i=0;i<tabelLength;i++){
			checkedArr.push(i);
		}
		this.setState({
			checkedArr,
		})
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
				checkedArr.splice(key,1);
				
			}
		}
		
		if(checkedArr.length === tabelLength){
			titleChecked = true;
			this.titleCheckbox.checked = true;
		}else{
			
			this.titleCheckbox.checked = false;
		}
		this.setState({
			checkedArr,
		})

	}
	titleRender = () =>{
		const {rowDetail} = this.state;
		const {checkbox} = this.props;
		var titleText = rowDetail.map((item,index)=>{
			return<td key = {index}><div><span>{item.label}</span></div></td> 
		})
		return(
			<tr className="hander">
				{checkbox && <td>
					<input onChange ={this.handeOnCheck} 
						ref = {(ref)=>{
							this.titleCheckbox = ref;
						}}
						name="mm"
						type="checkbox" 
					/>
				</td>}
				{
					titleText
				}
			</tr>
		)
	}
	addRow = (fields) =>{
		fields.push();
		
		setTimeout(()=>{

			if(titleChecked){
				this.allChecked();
				this.clearCheckBox(false);
			}
		},50)
	}
	subRow = (fields) =>{
		let {checkedArr} = this.state;
		var newArr = arrReverse(checkedArr);
		if(newArr.length){
			this.clearCheckBox(true);
		}
		newArr.map((item,index)=>{
			fields.remove(item);
		})
		if(tabelLength == newArr.length){
			this.titleCheckbox.checked = false;
			titleChecked = false;
		}
		this.setState({
			checkedArr:[]
		})

	}

	

	renderBrights = ({ fields, meta: { touched, error }}) => {
		const self = this;
		const {rowDetail} = this.state;
		const {toolbar,checkbox} = this.props;
	
		tabelLength = fields.length;
		
		
	 
	   var brights = fields.map(function(brightsStr, index){
		
		   var rowDoms =[];
		    for(let i=0;i<rowDetail.length;i++){
				const {
					name,
					type,
					label,
					disabled,
					...other
				} = rowDetail[i];
			
			var surplus = {...other};
			if(disabled && (disabled===true||disabled==="disabled")){
				surplus = {
					disabled,
					...other
				}
			}
				
				var detail =  (
					 <td key = {i}>
						<KrField
							style={{marginRight:3,}}
							name={brightsStr+'.'+name}
							component={type}
					
							{...surplus}
						/>
					</td>
				);
				rowDoms.push(detail);
			}
				
		   
				
				return (<tr key={index} >
						
						{checkbox && <td>
							<input 
							   type="checkbox"
								onChange = {(event)=>{
									self.rowCheck(event,index)
								}}
								ref = {(ref)=>{
									self["checkbox"+index] = ref;
								}}
								
							
							/>
						
						</td>}
						
						{rowDoms}
					</tr>)
	   		})
			return(
				<div>
					{toolbar && this.toolbarRender(fields)}
					<table>
						<thead>
							{this.titleRender()}
						</thead>
						<tbody>
							{brights}
						</tbody>
						
					</table>
					{!tabelLength && <Nothing style={{textAlign:"center"}} iconStyle = {{height:150,marginLeft:-20}} fontSize="14px"/>}
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
		
		let {name} = this.props;
	
		
        return (
            <div className = "ui-tabel-edit"> 
			
				
				<FieldArray name={name} component={this.renderBrights}/>
				
                 
            </div>
        );
	}
}
