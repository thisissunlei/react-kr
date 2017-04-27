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
	SearchForms
} from 'kr-ui';
import './index.less';


class SearchForm extends React.Component {

	static PropTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.state={
			verify_add_money:false,
			verify_pass:false,
		}
	}
	componentDidMount() {
		var _this = this;
		Http.request('getSelfMenuInfo').then(function(response) {
			var someBtn = response.navcodes.finance;
			for(var i = 0;i<someBtn.length;i++){
				if(someBtn[i]=="verify_add_money"){
					_this.setState({
						verify_add_money:true,
					})
				}
				if(someBtn[i]=="verify_pass"){
					_this.setState({
						verify_pass:true,
					})
				}
			}
		});

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
			pristine,
			reset
		} = this.props;

		return (
			<div>
				<span className="u-high-search" onTouchTap={this.openSearch}></span>
				<SearchForms onSubmit={this.onSubmit} placeholder="请输入日志名称" inputName="todo"/>
			</div>
		);
	}
}


export default reduxForm({
	form: 'searchForm1'
})(SearchForm);
