import React from 'react';
import {
	reduxForm
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


class HightSearchForm extends React.Component {

	static PropTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state = {
			communityList: [],
			payType: [],
			mainList: []
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
			reset
		} = this.props;
		let {
			communityList,
			payment,
			payType,
			mainList
		} = this.state;
		return (
			<div>
			    <form onSubmit={handleSubmit(this.onSubmit)}  style={{marginTop:30}}>
				   	<KrField
							grid={1/2}
							left={50}
							right={10}
							name="createUser"
							type="text"
							component="input"
							label="创建人"
					 />
					<KrField
							grid={1/2}
							left={10}
							right={50}
							name="title"
							type="text"
							component="input"
							label="新闻标题"
					 />
					 <KrField 
					 		grid={1 / 2} 
					 		left={50}
							right={10}
							style={{marginTop:10}}
					 		name="publishedStatus" 
					 		component="group" 
					 		label="发布状态" 
					 		>
	                    <KrField 
	                    		name="publishedStatus" 
	                    		grid={1 / 2} 
	                    		label="发布" 
	                    		type="radio" 
	                    		value="PUBLISHED"
	                    />
	                    <KrField 
	                    		name="publishedStatus" 
	                    		grid={1 / 2} 
	                    		label="未发布" 
	                    		type="radio" 
	                    		value="UNPUBLISHED"
	                    />
	                </KrField>
	                <KrField 
	                		grid={1 / 2} 
	                		style={{marginTop:10}}
	                		name="stickStatus" 
	                		component="group" 
	                		label="置顶状态"
	                		left={10}
							right={50} 
	                		>
	                    <KrField 
	                    		name="stickStatus" 
	                    		grid={1 / 2} 
	                    		label="置顶" 
	                    		type="radio" 
	                    		value="STICKED"
	                    />
	                    <KrField 
	                    		name="stickStatus" 
	                    		grid={1 / 2} 
	                    		label="未置顶" 
	                    		type="radio" 
	                    		value="UNSTICKED"
	                    />
	                </KrField>
				<Grid style={{marginTop:30,marginBottom:30,marginLeft:-24}}>
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
	form: 'hightSearchForm'
})(HightSearchForm);
