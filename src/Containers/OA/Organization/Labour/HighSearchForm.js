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
	ButtonGroup,
	ListGroup,
	ListGroupItem,
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
		var form = Object.assign({},form);
		const {
			detail,
			onSubmit
		} = this.props;
		form.orgId=detail.orgId;
		form.dimId=detail.dimId;
		form.orgType=detail.orgType;
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
						right={27}
 						left={42}
						component="selecTemployees"
			    		name="hrmResourceType"
			    		style={{marginTop:4}}
			    		label="员工类别"
						otherType="resourceType"
					/>
					<KrField
			    		grid={1/2}
						right={63}
 						left={4}
			    		name="hrmResourceAttributes"
			    		component="selecTemployees"
			    		style={{marginTop:4}}
			    		label="员工状态"
						otherType="resourceStatus"
					/>
					<KrField
							grid={1/1}
							left={42}
							right={18}
							component="group"
							label="入职时间"
							style={{marginTop:6}}
					>
							<div className='ui-listDate' style={{marginTop:-8}}>
								<ListGroup>
									<ListGroupItem><div className='ui-date-start' style={{width:248}} ><KrField  style={{width:248,marginLeft:-10,marginTop:2}} name="startTime" component="date" /></div></ListGroupItem>
										<div className='ui-line-down'  style={{marginTop:25,display:'inline-block'}}><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
									<ListGroupItem><div className='ui-date-end'><KrField name="endTime" style={{width:248,marginTop:2}} component="date" /></div></ListGroupItem>
								</ListGroup>
			                </div>
					</KrField>
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
