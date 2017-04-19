import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';
import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import http from 'kr/Redux/Utils/fetch';


import {
	Dialog,
	Section,
	Grid,
	Notify,
	BreadCrumbs,
} from 'kr-ui';


import BasicTable from './BasicTable';

export default class Schedule extends Component {
	static defaultProps = {
		tab: '',
	}
	constructor(props, context) {
		super(props, context);


	}


	componentDidMount() {

	}

	componentWillReceiveProps(nextProps) {

		if (nextProps.community != this.props.community) {
			this.setState({
				community: nextProps.community
			});
		}

	}

		scrollLoading=()=> {
		var _this = this;
		$(window).bind('scroll', function() {
			var top = $(window).scrollTop() || 0;
			var height = $(window).height() || 0;
			var num = $(document).height() - $(window).height();
			var scrollBottom = top - num;
			var {dataLoading} = _this.state;
			var isOutBoundary = scrollBottom >= -300;
			if (isOutBoundary && !dataLoading) {
				let {
					communityids,
					type,
					page,
					pageSize,
					value,
					Installmentplan,
					isIscroll,
					totalCount,
					totalPages,
					istip,
					currentYear,
					dataLoading
				} = _this.state;

				if (isIscroll) {
					_this.setState({
						isIscroll: !_this.state.isIscroll
					})

					var step = 1;
					var len = page;
					if (totalPages - page == 1) {
						window.setTimeout(function() {
							_this.setState({
								istip: !_this.state.istip
							})
						}, 2000)
					}

					if (totalPages > page) {
						len += step;
						_this.setState({
							page: len,
							isLoading: !_this.state.isLoading
						})
						Store.dispatch(Actions.callAPI('getInstallmentplan', {
							communityids: communityids,
							value: value,
							type: type,
							page: len,
							pageSize: 15,
							year: currentYear
						})).then(function(response) {
							if (response.vo) {
								var list = Installmentplan.concat(response.vo.items);
								// var list = $.extend(Installmentplan,response.vo.items);
							} else {
								var list = [];
							}
							_this.setState({
								Installmentplan: list, //response.vo.items,
								// rate: response.rate,
							});
							if (_this.state.page < _this.state.totalPages) {

								_this.setState({
									isIscroll: !_this.state.isIscroll
								})
							}
							window.setTimeout(function() {
									_this.setState({
										isLoading: !_this.state.isLoading
									})
							}, 10)
						}).catch(function(err) {
							Notify.show([{
								message: err.message,
								type: 'danger',
							}]);
						});
					}
				}
			}
		})
	}



	render() {
		let {
			communityInfoList,
			communityids,
			tab
		} = this.props;

		return (
			<div style={{marginBottom:20,marginTop:0,minHeight:910}}>
				<BasicTable detail={communityInfoList} tab={tab}/>
			</div>
		);

	}

}