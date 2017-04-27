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
		this.state = {
			sourceList:[],
			systemList:[]
		}

	}
	componentDidMount(){
		this.getMain();
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
	getMain = () => {
		var sourceList;
		var	systemList;
		var _this = this;
		Http.request('getOpSer').then(function(response) {
			sourceList = response.sourceList.map((item) => {
				item.label = item.sourceDesc;
				item.value = item.id;
				return item;
			})
			systemList = response.systemList.map((item) => {
				item.label = item.systemDesc;
				item.value = item.systemType;
				return item;
			})
			_this.setState({
				sourceList: sourceList,
				systemList: systemList,
			})

		});
	}

	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;
		let {
			sourceList,
			systemList,
		} = this.state;
		return (
			<div>
			    <form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:30}}>
				    <KrField
				    		grid={1/2}
							left={42}
							right={18}
				    		name="sourceId"
								type="select"
				    		style={{marginTop:4}}
				    		label="业务名称"
				  			options={sourceList}
					/>
					<KrField
				    		grid={1/2}
				    		right={56}
				    		left={4}
				    		name="systemType"
				    		type="select"
				    		style={{marginTop:4}}
				    		label="系统名称"
				  			options={systemList}
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
