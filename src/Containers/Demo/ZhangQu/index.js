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

		const {$form} = this.props;

		var values = {
					username:'yyyyaa',
					textarea:'bbbb'
		}
		$form.initialize(values);
	}

	onSubmit = (values)=>{
		Debug.log(values);
	}

	onClick = ()=>{
		const {$form} = this.props;
		$form.submit();
	}

	change=(form)=>{
		const {$form} = this.props;
		$form.change('dForm','editLabelText');
	}

	onReset = ()=>{
		const {$form} = this.props;
		$form.reset();

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
						{/*<KrField label="groupCheckbox" component="groupCheckbox"  name="groupCheckbox"  defaultValue=={[{label:'ddd',value:'yy'}]} />*/}
						<KrField label="editLabelText"  component="editLabelText"  name="editLabelText" save={this.change} mobx={true}/>
						<KrField label="file"  component="file"  name="file" mobx={true}/>
						<KrField label="doorCard"  component="doorCard"  name="doorCard" mobx={true}/>
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
									mobx={true}
								/>



					<Button type="submit" label="提交"/>
					<Button type="button" label="暂存" onClick={this.onClick}/>
					<Button type="button" label="重置" onClick={this.onReset}/>

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
