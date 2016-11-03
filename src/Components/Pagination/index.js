import React, {
	Component,
	PropTypes
} from 'react';

import ReactMixin from "react-mixin";
import LinkedStateMixin from 'react-addons-linked-state-mixin';

import './index.less';

@ReactMixin.decorate(LinkedStateMixin)
export default class Pagination extends Component {

	static propTypes = {
		children: React.PropTypes.node,
		page: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		pageSize: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		totalCount: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		onPageChange: React.PropTypes.func
	};

	constructor(props) {
		super(props);

		this.onPrev = this.onPrev.bind(this);
		this.onNext = this.onNext.bind(this);
		this.onFirst = this.onFirst.bind(this);
		this.onPageChange = this.onPageChange.bind(this);
		this.onJumpPage = this.onJumpPage.bind(this);

		this.renderFirst = this.renderFirst.bind(this);
		this.renderLast = this.renderLast.bind(this);
		this.renderBody = this.renderBody.bind(this);
		this.createOther = this.createOther.bind(this);
		this.renderJump = this.renderJump.bind(this);
		this.onJump = this.onJump.bind(this);

		this.state = {
			jumpPageValue: ''
		}


	}

	onJump() {

		let {
			jumpPageValue
		} = this.state;

		let {
			pageSize,
			totalCount
		} = this.props;
		let pageMax = Math.ceil(totalCount / pageSize);

		if (jumpPageValue > pageMax) {
			jumpPageValue = pageMax;
		}

		if (jumpPageValue < 1) {
			jumpPageValue = 1;
		}

		this.onPageChange(jumpPageValue);
	}

	onPrev() {

		var {
			page
		} = this.props;

		if (page == 1) {
			return;
		}

		if (page > 0) {
			page--;
		}
		this.onPageChange(page);
	}

	onFirst() {
		this.onPageChange(1);
	}

	onNext() {

		let {
			page,
			pageSize,
			totalCount
		} = this.props;

		if (page == Math.ceil(totalCount / pageSize)) {
			return;
		}


		if (page > 0 && page < Math.ceil(totalCount / pageSize)) {
			page++;
		}

		this.onPageChange(page);
	}

	onJumpPage(event) {
		this.onPageChange(event.target.getAttribute('data-page'));
	}

	onPageChange(page) {

		const {
			onPageChange
		} = this.props;
		onPageChange && onPageChange(page);
	}

	renderFirst() {

		let {
			page,
			pageSize,
			totalCount
		} = this.props;

		return (
			<div className="item-prev">
				<a className="item" onClick={this.onPrev}></a>
			</div>
		);

	}

	createOther(i) {

		let props = {
			className: 'item',
			key: i
		};

		const handlers = {
			onClick: this.onJumpPage
		}

		return React.createElement('a', {...props,
			...handlers,
			'data-page': i
		}, '...')

	}

	renderBody() {

		let {
			page,
			pageSize,
			totalCount
		} = this.props;


		let pageBody = [];

		let props = {};

		const handlers = {
			onClick: this.onJumpPage
		}
		let pageMin = 1;
		let pageStart = page;
		let pageJump = 5;
		let pageEnd = pageStart + pageJump;
		let pageMax = Math.ceil(totalCount / pageSize);
		let element = null;

		if (pageEnd > pageMax) {
			pageEnd = pageMax;
		}


		for (var i = pageStart; i < pageEnd; i++) {
			props.key = i;
			props.className = 'item';
			if (page == i) {
				props.className += ' active';
			}

			element = React.createElement('a', {...props,
				...handlers,
				'data-page': i
			}, i);

			pageBody.push(element);
		}


		if (pageEnd < pageMax) {
			element = this.createOther(pageEnd);
			pageBody.push(element);

			for (var j = pageMax;
				(j > (pageMax - pageJump)) && ((pageMax - pageJump) > pageEnd); j--) {
				props.key = j;
				props.className = 'item';
				element = React.createElement('a', {...props,
					...handlers,
					'data-page': j
				}, j);
				pageBody.push(element);
			}
		}


		return (
			<div className="item-body">
					{pageBody}
			</div>
		);
	}

	renderLast() {

		let {
			page,
			pageSize,
			totalCount
		} = this.props;

		return (
			<div className="item-next">
				<a className="item" onClick={this.onNext} page={page+1}></a>
			</div>
		);

	}

	renderJump() {

		let {
			page,
			pageSize,
			totalCount
		} = this.props;

		return (
			<div className="item-jump">
				<span>到</span>
				<input type="text" name="age"  valueLink={this.linkState('jumpPageValue')} />
				<a   onClick={this.onJump}>跳转</a>
			</div>
		);
	}
	render() {

		return (

			<div className="ui-pagination">
					{this.renderFirst()}
					{this.renderBody()}
					{this.renderLast()}
					{this.renderJump()}
		  </div>

		);
	}

}