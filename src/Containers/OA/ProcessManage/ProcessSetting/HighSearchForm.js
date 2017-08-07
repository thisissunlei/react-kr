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
			    		label="流程名称"
						otherType="resourceType"
					/>
					<KrField
			    		grid={1/2}
						right={63}
 						left={4}
			    		name="hrmResourceAttributes"
			    		component="selecTemployees"
			    		style={{marginTop:4}}
			    		label="流程编码"
						otherType="resourceStatus"
					/>
					<KrField style={{width:262,marginTop:6,marginLeft:43}} name="allowRequest" component="group" label="发起流程请求" grid={1} requireLabel={false}>
						<KrField style={{marginTop:10}} name="allowRequest" label="允许" type="radio" value={true} />
						<KrField style={{marginTop:10}} name="allowRequest" label="不允许" type="radio" value={false} />
					</KrField>
					<KrField style={{width:262,marginTop:6,marginLeft:19}} name="newRequestShow" component="group" label="新办是否显示" grid={1} requireLabel={false}>
						<KrField style={{marginTop:10}} name="newRequestShow" label="显示" type="radio" value={true} />
						<KrField style={{marginTop:10}} name="newRequestShow" label="不显示" type="radio" value={false} />
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
