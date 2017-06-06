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
		this.state = {
			onHover: false
		}
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
	onHover = () => {
		this.setState({
			onHover: !this.state.onHover
		})
	}
	render() {
		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;
        let options = [
            {
                label: '社区名称',
                value: 'community'
            }, {
                label: '问题类型',
                value: 'type'
            }
        ];
		return (
			<div>
				<span className="u-high-search" onTouchTap={this.openSearch}></span>
				<SearchForms onSubmit={this.onSubmit} placeholder="请输入关键字" inputName="receviers" searchFilter={options}/>
			</div>
		);
	}
}


export default reduxForm({
	form: 'searchForm1'
})(SearchForm);