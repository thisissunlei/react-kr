import React from 'react';

import {reduxForm} from 'redux-form';

import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ButtonGroup
} from 'kr-ui';



 class SearchUpperForm extends React.Component{

	 static propTypes = {
		 onSubmit:React.PropTypes.func,
		 onCancel:React.PropTypes.func,
		 detail:React.PropTypes.object,
	 }

	constructor(props){
		super(props);
	}


	 onSubmit = (values)=>{
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	 }

	 onCancel = ()=>{
		 const {onCancel} = this.props;
		onCancel && onCancel();
	 }

	render(){

		const { handleSubmit} = this.props;

		return (
			<form onSubmit={handleSubmit(this.onSubmit)}>

				<KrField name="id" type="hidden" label="id"/>
				<KrField grid={1/2} right={25} style={{marginTop:25}} name="groupName" type="text" label="分组名称"  />
				<KrField grid={1/2} right={25} style={{marginTop:25}} name="enable" type="select" label="启用状态" options={[{value:'',label:'全部'},{value:'ENABLE',label:'启用'}, {value:'DISABLE',label:'禁用'} ]}  />

				<Grid style={{marginTop:15,marginBottom:5}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  style={{display:"inline-block",marginRight:30}}><Button  label="确定" type="submit"  /></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
		</form>
		);
	}
}

export default reduxForm({ form: 'SearchUpperForm', enableReinitialize:true, keepDirtyOnReinitialize:true })(SearchUpperForm);
