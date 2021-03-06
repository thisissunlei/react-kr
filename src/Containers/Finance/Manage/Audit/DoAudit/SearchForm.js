import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';

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
	openSearch = () => {
		const {
			openSearch
		} = this.props;
		openSearch && openSearch();

	}
	onHover = () => {
		this.setState({
			onHover: !this.state.onHover
		})
	}

	renderMore = () => {
		let {
			detail
		} = this.props;
		var detailList = detail.slice(3, detail.length);
		return (
			<div className="u-more-list">
				<div className="u-more-s"></div>
				<div className="u-infolist">
				{
					detailList.map((item,index)=>{
						return(
							<div className="u-infos-list" key={index}>
								<span className="u-info-label">{item.categoryName}:</span>
								<span className="u-info-amount"> {item.amount}</span>
							</div>
							)
					})
				}
				</div>
			</div>

		)

	}
	renderInfo = () => {
		let {
			onHover
		} = this.state;
		return (
			<div className="u-more">
			<div className="u-info-more" id="more" onClick={this.onHover} >
					更多<span className="u-info-bottom"></span>
				</div>
				{onHover?this.renderMore():''}
			</div>


		)
	}
	ShowMore = (e) => {
		if (e.target.innerHTML != "更多") {
			this.setState({
				onHover: false
			})
		}

	}
	render() {

		const {
			error,
			handleSubmit,
			pristine,
			reset,
			detail
		} = this.props;
		var detailList = detail.slice(0, 3);
		window.addEventListener("click", this.ShowMore, false);

		return (
			<div  className="u-clearfix">
				<div className="u-audit-info">
					{detailList && detailList.map((item,index)=>{
						return(
							<div className="u-info-list" key={index}>
								<span className="u-info-icon"></span>
								<span className="u-info-label">{item.categoryName}：</span>
								<span className="u-info-amount">{item.amount}</span>
							</div>
							)
					})}
				</div>
				{detail && detail.length>3?this.renderInfo():''}
				<span className="u-high-search" onTouchTap={this.openSearch}></span>
				<SearchForms onSubmit={this.onSubmit} placeholder="请输入客户名称"  inputName="do"/>

			</div>
		);
	}
}


export default reduxForm({
	form: 'searchForm2'
})(SearchForm);
