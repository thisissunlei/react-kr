import React from 'react';
import {
	reduxForm,
} from 'redux-form';
import {
	Http
} from "kr/Utils";
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	ListGroup,
	ListGroupItem,
	SearchForms,
	ButtonGroup
} from 'kr-ui';
import './index.less';

class HighSearchForm extends React.Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
	}
	componentDidMount(){
	}
	onSubmit = (form) => {
		form = Object.assign({},form);
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
	}
	openSearch = () => {
		const {
			openSearch
		} = this.props;
		openSearch && openSearch();
	}

	onCancel = () => {
		const {
			onCancel
		} = this.props;
		onCancel && onCancel();
	}

	render() {

		const {
			error,
			handleSubmit,
			reset
		} = this.props;
		return (
			<div>
			    <form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:30}}>
						<KrField
	 					 grid={1/2}

						 left={42}
						 right={18}
	 					 name="phone"
	 					 style={{marginTop:4}}
	 					 label="手机号"
						 component="input"
	 			 		/>
					<KrField
			    		grid={1/2}
							right={69}
 						 left={4}
			    		name="osType"
			    		type="select"
			    		style={{marginTop:4}}
			    		label="设备类型"
							options={[
					      {label:'android',value:'ANDROID'},
					      {label:'ios',value:'IOS'}
					    ]}
					/>
					<KrField
							grid={1/2}
							left={42}
							right={18}
							name="sendStatus"
							type="select"
							style={{marginTop:4}}
							label="登录结果"
							options={[
								{label:'成功',value:'SUCCESS'},
								{label:'失败',value:'FAILED'}
							]}
					/>
					<KrField
							grid={1/2}
							right={69}
 						 	left={4}
							name="version"
							component="input"
							style={{marginTop:4}}
							label="APP版本"

					/>
					<KrField
							left={42}
							right={66}
							grid={1/1}
							name="remark"
							component="textarea"
							label="备注"
							maxSize={100}
					/>
				<Grid style={{marginTop:15,marginBottom:5}}>
					<Row>
						<Col md={12} align="center">

							<ButtonGroup>
									<Button  label="确定" type="submit" />
									<span style={{display:'inline-block',width:40,height:20}}></span>
								<Button
										label="取消"
										type="button"
										cancle={true}
										onTouchTap={this.onCancel}
								/>
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
				</form>
			</div>


		);
	}
}


export default reduxForm({
	form: 'highSearchForm'
})(HighSearchForm);
