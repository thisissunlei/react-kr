import React from 'react';

import {
	reduxForm,
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
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

class NewCreateCustomer extends React.Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);

	}

	onSubmit = (form) => {
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(form);
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
			pristine,
			reset
		} = this.props;

		return (
			<div>
			    <form onSubmit={handleSubmit(this.onSubmit)}>
					<KrField  
							grid={1/2}
				    		left={50}
				    		right={10}
							name="company" 
							type="text" 
							component="input" 
							label="客户名称"
							requireLabel={true}
					 />
					 <KrField  
							grid={1/2}
				    		right={50}
				    		left={10}
							name="name" 
							type="text" 
							component="input" 
							label="联系人" 
					 />
					 <KrField  
							grid={1/2}
				    		left={50}
				    		right={10}
							name="tel" 
							type="text" 
							component="input" 
							label="联系电话" 
					 />
				<Grid style={{marginTop:10,marginBottom:5,marginLeft:-24}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'>
									<Button  label="下一步" type="submit" />
								</div>
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

const validate = values => {

	const errors = {}

	if (!values.company) {
		errors.company = '请输入客户名称';
	}
	return errors;
}
export default reduxForm({
	form: 'newCreateCustomer',
	validate,
	enableReinitialize: true,
	keepDirtyOnReinitialize: true,
})(NewCreateCustomer);