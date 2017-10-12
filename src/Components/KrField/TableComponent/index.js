import React from 'react';

import './index.less';
import { Field, FieldArray, reduxForm } from 'redux-form'
import WrapComponent from '../WrapComponent';




export default class  TabelEdit extends React.Component {

	static PropTypes = {
		inline:React.PropTypes.bool,
		requireBlue:React.PropTypes.bool,
	}

	constructor(props){
		super(props)
	}

	//------
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
	


	   var brights = fields.map(function(brightsStr, index){

				return (<li key={index} style={{width:600,listStyle:'none'}}>
						
						<KrField
							style={{width:190,marginLeft:18,marginRight:3,}}
							grid={1/3}
							name={`${brightsStr}.name`}
							type="text"
							component={self.renderField}
							label={index?'':'子项名称'}
							placeholder='子项名称'
							onChange = {(data) =>{

								self.nameChange(data,index);
							}}

						/>
						
						
						
						<KrField
							style={{width:225,marginLeft:0,marginRight:3,}}
							grid={1/3}
							name={`${brightsStr}.code`}

							type="text"
							component={self.renderField}
							label={index?'':'子项编码'}
							placeholder='子项编码'
							onChange = {(data) =>{
								self.codeChange(data,index)
							}}

						/>
						
						
						
						/>
						
						
						
					</li>)
	   		})
			return (
			<ul style={{padding:0,margin:0}}>

				{brights}
				<div style = {{marginLeft:20,marginBottom:20}}>
				
				</div>
			</ul>

		)
	}
	

	
	render(){

		let {requireLabel,requireBlue,label,children,style,inline,name} = this.props;
		
			return (
				<div>
					<FieldArray name={name} component={this.renderBrights}/>
				</div>
				);
	}
}
