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
		this.state={
			requestURI:'/api/krspace-finance-web/community/sysDeviceDefinition/upload-pic',
		}
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

	change=(form)=>{
		const {FormModel} = this.props;

		Debug.log("form",form);
		FormModel.change('dForm','editLabelText',form);
	}

	render(){

		const {handleSubmit} = this.props;
		return (
			<div>
				<form onSubmit={handleSubmit(this.onSubmit)}>

						<KrField label="用户名称" type="text" component="input" name="username" />
						<KrField label="用户名称" type="text" component="textarea" name="textarea" />
						<KrField label="uploadImageList" component="uploadImageList" name="file" />
						<KrField label="searchCustomer" component="searchCustomer" name="searchCustomer" />
						<KrField label="select"  component="select" name="select" options={[{label:'ddd',value:'yy'}]}/>
						<KrField label="radio"  component="radio" type="radio" name="radio" />
						<KrField label="editor"  component="editor"  name="editor" />
						{/*<KrField label="groupCheckbox" component="groupCheckbox"  name="groupCheckbox"  defaultValue=={[{label:'ddd',value:'yy'}]} />*/}
						<KrField label="editLabelText"  component="editLabelText"  name="editLabelText" save={this.change}/>
						<KrField label="file"  component="file"  name="file" />
						<KrField label="doorCard"  component="doorCard"  name="doorCard" />
					{/*上传图片有问题*/}
						<KrField
				              		label="电脑端轮播图newuploadImage"
				              		name="newuploadImage"
									component="newuploadImage"
									innerstyle={{width:524,height:159,padding:10}}
									photoSize={'1920*520'}
									pictureFormat={'JPG,PNG,GIF'}
									pictureMemory={'500'}
									requestURI = {this.state.requestURI}
									inline={false}
								/>
						

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
