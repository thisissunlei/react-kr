import React from 'react';
import {
	KrField,
	Button,
	Section,
	Grid,
	Row,
	Col,
	ListGroupItem,
	ListGroup,
	Dialog,
	SearchForms,
	KrDate,
	Drawer,
	Message
} from 'kr-ui';
import {
	Http,
	DateFormat
} from "kr/Utils";
import initImg from './images/personalhead.png'
import './index.less';
import UpdateLog from '../UpdateLog';
import { observer, inject } from 'mobx-react';

@inject("NavModel")
@observer
export default class Home extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			infoList: {
				resourceList: [],
			},
		}
	}

	componentDidMount() {
		const { NavModel } = this.props;
		NavModel.setSidebar(false);
		var _this = this;
		Http.request('home-index', {}, {}).then(function (response) {
			_this.setState({
				infoList: response,
				dynamicList: response.dynamicList,
			}, function () {
				_this.toLoadSwiper();
			})
		}).catch(function (err) { });
		_this.swiperWidth = (document.getElementsByClassName('g-home-bottom')[0].clientWidth + 180) * 0.15 * 0.7;
		_this.applyItemWidth = (document.getElementsByClassName('g-home-middle-item')[2].clientWidth + 60) * 0.175;
		// document.getElementsByClassName('g-home-middle-item')[2].getElementsByClassName('pic').style.height = _this.applyItemWidth+'px';
	}
	toLoadSwiper = () => {
		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 6,
			paginationClickable: true,
			loop: false,
			prevButton: '.oa-swiper-prev',
			nextButton: '.oa-swiper-next',
			// spaceBetween: width,
			onSlideChangeEnd: function (swiper) {
				//alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
			}

		});
		var swiperone = new Swiper('.swiper-container-one', {
			// loop:true,
			effect: 'fade',
			prevButton: '.oa-one-swiper-prev',
			nextButton: '.oa-one-swiper-next',
			scrollbar: '.swiper-scrollbar',
			scrollbarHide: false,
			// slidesPerView: 'auto',
			// centeredSlides: true,
			autoplay: 2000,
			autoplayDisableOnInteraction: false,
		});
	}

	renderSwiper = (item, index) => {
		if (!item) {
			return;
		}
		var height = this.swiperWidth;
		var styles = {};
		styles.backgroundImage = `url(${item.avatar || initImg})`;
		//styles.backgroundSize = `${page.width}px 520px`;
		styles.backgroundSize = 'cover';
		styles.backgroundPosition = 'center center';
		styles.backgroundRepeat = 'no-repeat';
		styles.height = `${height}px`;

		return (
			<div key={index} className="swiper-slide">
				<div className="swiper-pic" style={styles}>

				</div>
				<div className="name">
					{item.name}
				</div>
				<div className="job">
					{item.job}
				</div>
			</div>
		);
	}
	renderSwiperOne = (item, index) => {
		if (!item) {
			return;
		}

		var styles = {};
		styles.backgroundImage = `url(${item.photoUrl})`;
		//styles.backgroundSize = `${page.width}px 520px`;
		styles.backgroundSize = 'cover';
		styles.backgroundPosition = 'center center';
		styles.backgroundRepeat = 'no-repeat';
		return (
			<div key={index} style={styles} className="swiper-slide" onClick={this.toSlider.bind(this, item)}>

				<div className="swiper-text">
					<span className="word-break">{item.name}</span>
				</div>

			</div>
		);
	}
	renderDynamicList = (item, index) => {
		if (!item) {
			return;
		}
		return (
			<div key={index} className="item">
				<span className={`circle ${item.isRead == "READ" ? 'readcircle' : ''}`}>

				</span>
				<span onClick={this.goDetail.bind(this, item)} className="item-text">
					{item.title}
				</span>
				<span className="item-date">
					{DateFormat(item.dynamicDate, "yyyy-mm-dd")}
				</span>
			</div>
		);
	}
	goDetail = (data) => {
		let id = data.id;
		var _this = this;
		if (data.isRead == 'NOREAD') {
			Http.request('home-click-dynamic', {}, {
				id: data.id
			}).then(function (response) {
				_this.setState({ dynamicList: response.items })
			}).catch(function (err) { });

		}
		if (!data.linkUrl) {
			window.open(`./#/publicPage/${id}/dynamicsDetail`, '_blank');
		} else {
			window.open(`${data.linkUrl}`, '_blank');
		}
	}
	toDynamicsList = () => {
		window.open(`./#/publicPage/dynamicsProfile`, '_blank');
	}
	toSlider = (item) => {
		window.open(`${item.linkUrl}`, '_blank');
	}
	applyRender = () => {
		// 具体的url 在对应的css里面配置 
		var applyArr = [
			{ text: '氪空间官网', href: 'http://krspace.cn/'},
			//	{ text: '氪星小镇', href: 'http://bbs.corp.36kr.com'},
			{ text: 'EHR', href: 'http://www.italent.cn/' },
			// { text: '云快报', href: 'https://baoxiao.corp.36kr.com/' },
			{ text: 'E-learning', href: 'https://elearnplus.com'},
			{ text: 'salesforce', href: 'https://krspace.my.salesforce.com'},
			{ text: 'Udesk', href: 'http://krspace.udesk.cn/users/sign_in'},
			{ text: 'OA', href: 'http://oa.xlzc.com'},
			{ text: '敬请期待', href: ''}
		]
		var elems = applyArr.map((item, index) => {

			return (
				<a className="apply-item" key={index} href={item.href ? item.href : "javascript: void(0);"} target="_blank">
					{item.href && <div className="pic krspace-logo"
						style={{
							height: this.applyItemWidth,

						}}
					></div>}
					{item.href && <div className="text">{item.text}</div>}
				</a>
			)

		})
		return elems
	}
	render() {
		return (
			<div className="g-home">
				<div className="g-home-header">
					<div className="home-date">
						<div className="date">
							<div className="left-date">
								{this.state.infoList.nowDate}
							</div>
							<div className="right-date">
								{this.state.infoList.week}
							</div>
						</div>
					</div>
					<div className="home-right-pic">
						<span className='symbol-left'></span>
						<span className='symbol-right'></span>
						<span className='trumpet-tour'>
							<span className='trumpet'></span>
							<span className='tour'>
								一场说走就走的旅行，回来之后等着你的就是加不完的班和补不完的作业。
                </span>
						</span>
					</div>

				</div>
				<div className="g-home-middle">
					<div className="g-home-middle-item">
						<div className="swiper-container-one">
							<div className="swiper-wrapper">
								{this.state.infoList.sliderList && this.state.infoList.sliderList.map((item, index) => {
									return this.renderSwiperOne(item, index)
								})}
							</div>
							<div className="swiper-scrollbar"></div>
							<div className="oa-one-swiper-prev"></div>
							<div className="oa-one-swiper-next"></div>

						</div>


					</div>
					<div className="g-home-middle-item">
						<div className="title">
							<div className="circle">

							</div>
							<div className="left">
								最新动态
								</div>
							<div onClick={this.toDynamicsList} className="right">
								更多
								</div>
						</div>
						<div className="main">
							{this.state.dynamicList && this.state.dynamicList.slice(0, 10).map((item, index) => {
								return this.renderDynamicList(item, index)
							})}
						</div>
					</div>
					<div className="g-home-middle-item">
						<div className="title">
							<div className="circle">

							</div>
							<div className="left">
								相关应用
								</div>

						</div>

						<div className="apply">

							{this.applyRender()}
						</div>
					</div>
				</div>
				<div className="g-home-bottom">
					<div className="title">
						<div className="circle">

						</div>
						<div className="left">
							最近入职同事
						</div>
					</div>
					<div className="home-swiper">
						<div className="swiper-container">
							<div className="swiper-wrapper">
								{this.state.infoList.resourceList && this.state.infoList.resourceList.map((item, index) => {
									return this.renderSwiper(item, index)
								})}
							</div>

						</div>
						<div className="oa-swiper-prev"></div>
						<div className="oa-swiper-next"></div>

					</div>


				</div>
				<UpdateLog />
			</div>
		);
	}
}
