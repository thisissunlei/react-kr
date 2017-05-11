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
	 					 name="version"
	 					 style={{marginTop:4}}
	 					 label="系统版本"
						 component="input"
	 			 		/>
					<KrField
			    		grid={1/2}
							right={69}
 						 left={4}
			    		name="OsType"
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
							name="enableFlag"
							type="select"
							style={{marginTop:4}}
							label="启用标识"
							options={[
								{label:'启用',value:'ENABLE'},
								{label:'未启用',value:'DISABLE'}
							]}
					/>
					<KrField
							grid={1/2}
							right={69}
 						 left={4}
							name="ForcedStatus"
							type="select"
							style={{marginTop:4}}
							label="是否强制更新"
							options={[
								{label:'强制',value:'FORCED'},
								{label:'不强制',value:'UNFORCED'}
							]}
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
