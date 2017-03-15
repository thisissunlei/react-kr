import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector
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


class NewCreateMainbill extends Component {

	static PropTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			communityList: [],

		}

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
			reset,
			detail
		} = this.props;
		console.log('detail----', detail)
		return (
			<div>
			    <form onSubmit={handleSubmit(this.onSubmit)}>
					<KrField  
							grid={1/2}
				    		right={34}
							name="customerName" 
							type="text" 
							component="input" 
							label="客户名称" 
					 />
				<Grid style={{marginTop:10,marginBottom:5,marginLeft:-24}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'>
									<Button  label="确定" type="submit" />
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


export default reduxForm({
	form: 'newCreateMainbill'
})(NewCreateMainbill);