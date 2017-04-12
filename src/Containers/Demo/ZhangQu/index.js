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
	Dialog
} from 'kr-ui';

import {
  observer,
  inject
} from 'mobx-react';


import {reduxForm,Field}  from 'kr/Utils/ReduxForm';


 class Demo extends Component{

	constructor(props){
		super(props);

	}

	componentWillMount() {

	}

	componentDidMount(){

		const {FormModel} = this.props;

		var values = {
					username:'yyyy',
					textarea:'bbbb'
		}

		FormModel.changeValues('dForm',values);

	}

	onSubmit = (values)=>{
		Debug.log(values);
	}

	render(){

		const {handleSubmit} = this.props;
		return (
			<div>
				<form onSubmit={handleSubmit(this.onSubmit)}>

						<KrField label="用户名称" type="text" component="input" name="username" mobx={true} />
						<KrField label="用户名称" type="text" component="textarea" name="textarea" mobx={true} />
						<KrField label="uploadImageList" component="uploadImageList" name="file" mobx={true} />
						<KrField label="searchCustomer" component="searchCustomer" name="searchCustomer" mobx={true} />
						<KrField label="select"  component="select" name="select" options={[{label:'ddd',value:'yy'}]} mobx={true} />
						<KrField label="radio"  component="radio" type="radio" name="radio" mobx={true} />
						<KrField label="editor"  component="editor"  name="editor" mobx={true}  />

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
	form:'dForm',
	validate,
})(Demo);
