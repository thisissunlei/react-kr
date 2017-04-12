import React, {Component, PropTypes} from 'react';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup,
	Message,
	SnackTip,
	ListGroup,
	ListGroupItem,
} from 'kr-ui';


import {reduxForm,Field}  from 'kr/Utils/ReduxForm';

 class Demo extends Component{

	constructor(props){
		super(props);

	}

	componentWillMount() {
	}

	componentDidMount(){

	}

	onSubmit = (values)=>{
		Debug.log(values);
	}

	render(){

		const {handleSubmit} = this.props;
		return (
			<div>
				<form onSubmit={handleSubmit(this.onSubmit)}>

						<KrField label="用户名称" type="text" component="input" name="username" />
						<KrField label="用户名称" type="text" component="textarea" name="desc" />
						<KrField label="uploadImageList" component="uploadImageList" name="file" />
						<KrField label="searchCustomer" component="searchCustomer" name="searchCustomer" />
						<KrField label="select"  component="select" name="select" options={[{label:'ddd',value:'yy'}]}/>
						<KrField label="radio"  component="radio" type="radio" name="radio" />
						<KrField label="editor"  component="editor"  name="editor" />

					<Button type="submit" label="提交"/>
				</form>
		</div>
	 );

		}

}


const validate = (values)=>{

	const errors = {};


	if(!values.username){
		errors.username = '请输入用户名称'
	}

	return errors;

}

export default reduxForm({
	form:'deddmoForm',
	validate,
})(Demo);
