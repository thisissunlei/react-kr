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


class HightSearchForm extends Component {

	static PropTypes = {
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
			pristine,
			reset
		} = this.props;

		return (
			<div>
			    <form onSubmit={handleSubmit(this.onSubmit)}>
			    	<KrField   
			    			name="verifyStatus" 
			    			type="hidden" 
			    			component="input"
			    			value="UNCHECKED" 
			    	/>
				    <KrField  
				    		grid={1/2}
				    		right={34}
				    		name="communityId"
				    		type="select"
				    		style={{marginTop:4}}
				    		label="社区名称" 
				  			options=""
					/>
					<KrField  
				    		grid={1/2}
				    		right={34}
				    		name="payWay"
				    		type="select"
				    		style={{marginTop:4}}
				    		label="收款方式" 
				  			options=""
					/>
					<KrField  
				    		grid={1/2}
				    		right={34}
				    		name="flowCategoryId"
				    		type="select"
				    		style={{marginTop:4}}
				    		label="收款类型" 
				  			options=""
					/>
					<KrField  
				    		grid={1/2}
				    		right={34}
				    		name="corporationId"
				    		type="select"
				    		style={{marginTop:4}}
				    		label="主体" 
				  			options=""
					/>
					<KrField grid={1/1}  component="group" label="录入时间" style={{marginTop:3}}>
						<div className='ui-listDate'>
							<ListGroup>
								<ListGroupItem><div className='ui-date-start' style={{width:260}} ><KrField  style={{width:260,marginLeft:-10,marginTop:2}} name="createStratTime" component="date" /></div></ListGroupItem>
									<div className='ui-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
								<ListGroupItem><div className='ui-date-end'><KrField name="createEndTime" style={{width:260,marginTop:2}} component="date" /></div></ListGroupItem>
							</ListGroup>
		                </div>
					</KrField>
					<KrField grid={1/1}  component="group" label="收款时间" style={{marginTop:3}}>
						<div className='ui-listDate'>
							<ListGroup>
								<ListGroupItem><div className='ui-date-start' style={{width:260}} ><KrField  style={{width:260,marginLeft:-10,marginTop:2}} name="dealStartTime" component="date" /></div></ListGroupItem>
									<div className='ui-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
								<ListGroupItem><div className='ui-date-end'><KrField name="dealEndTime" style={{width:260,marginTop:2}} component="date" /></div></ListGroupItem>
							</ListGroup>
		                </div>
					</KrField>
					<KrField  
							grid={1/2}
				    		right={34}
							name="customerName" 
							type="text" 
							component="input" 
							label="客户名称" 
					 />
				<Grid style={{marginTop:7,marginBottom:5,marginLeft:-24}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
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