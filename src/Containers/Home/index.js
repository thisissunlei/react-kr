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
	Http
} from "kr/Utils";
import './index.less';
import { observer, inject } from 'mobx-react';

@inject("NavModel")
@observer
export default class Home extends React.Component {

	constructor(props,context){
		super(props, context);
        this.state={
            infoList:{
				resourceList:[],
			},
        }
	}

  componentDidMount() {
    const { NavModel } = this.props;
	NavModel.setSidebar(false);
	var _this = this;
	Http.request('home-index', {},{}).then(function(response) {
			_this.setState({infoList: response})
		}).catch(function(err) {});
	var width = (document.getElementsByClassName('g-home-bottom')[0].clientWidth+180)*0.84*0.056;
	_this.swiperWidth = (document.getElementsByClassName('g-home-bottom')[0].clientWidth+180)*0.84*0.12;
	window.setTimeout(function() {
		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 6,
			paginationClickable: true,
			loop:false,
			prevButton:'.oa-swiper-prev',
			nextButton:'.oa-swiper-next',
			spaceBetween: width,
		});
		var swiperone = new Swiper('.swiper-container-one', {
			// loop:true,
			effect : 'fade',
			prevButton:'.oa-one-swiper-prev',
			nextButton:'.oa-one-swiper-next',
			scrollbar: '.swiper-scrollbar',
			scrollbarHide: false,
			// slidesPerView: 'auto',
			// centeredSlides: true,
			autoplay : 2000,
			autoplayDisableOnInteraction:false,
		});
	}, 400);
	
		
	
  }
  renderSwiper = (item,index) =>{
      if(!item){
        return ;
      }
	  var height = this.swiperWidth;
      var styles = {};
      		styles.backgroundImage = `url(${item.avatar})`;
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
  renderSwiperOne = (item,index) =>{
      if(!item){
        return ;
      }
	  
      var styles = {};
      		styles.backgroundImage = `url(${item.photoUrl})`;
			//styles.backgroundSize = `${page.width}px 520px`;
			styles.backgroundSize = 'cover';
			styles.backgroundPosition = 'center center';
			styles.backgroundRepeat = 'no-repeat';
      return (
			<div key={index} style={styles} className="swiper-slide">
				
				<div className="swiper-text">
					{item.name}
				</div>
				
		</div>
      );
  }
  renderDynamicList = (item,index) =>{
      if(!item){
        return ;
      }
      return (
			<div key={index} className="item">
				<span className={`circle ${item.isRead==1?'readcircle':''}`}>

				</span>
				<span className="item-text">
					{item.title}
				</span>
			</div>
      );
  }
  render() {
    return (
      <div className="g-home">
        <div className="g-home-header">
            <div className="home-date">
							<div className="date">
								<div className="left-date">
								8月2日
								</div>
								<div className="right-date">
									周三
								</div>
							</div>
						</div>
            <div className="home-common">
							<div className="left itemOne">

							</div>
							<div className="right">
								<span className="top">
										8
								</span>
								<span className="bottom">
									待办事宜
								</span>
							</div>
						</div>
            <div className="home-common">
							<div className="left itemTwo">

							</div>
							<div className="right">
								<span className="top">
									2
								</span>
								<span className="bottom">
									已办事宜
								</span>
							</div>
						</div>
            <div className="home-common">
							<div className="left itemThird">

							</div>
							<div className="right">
								<span className="top">
									7
								</span>
								<span className="bottom">
									我的请求
								</span>
							</div>
						</div>
						<div className="home-common">
							<div className="left itemFourth">
								
							</div>
							<div className="right">
								<span className="top">
											3
								</span>	
								<span className="bottom">
									发起流程
								</span>
							</div>
						</div>
        </div>
				<div className="g-home-middle">
						<div className="g-home-middle-item">
							<div className="swiper-container-one">
								<div className="swiper-wrapper">
									{this.state.infoList.sliderList && this.state.infoList.sliderList.map((item,index)=>{
										return this.renderSwiperOne(item,index)
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
									最近动态
								</div>
								<div className="right">
									更多
								</div>
							</div>
							<div className="main">
								{this.state.infoList.dynamicList && this.state.infoList.dynamicList.map((item,index)=>{
										return this.renderDynamicList(item,index)
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
								<div className="apply-item">
									<div className="pic">

									</div>
									<div className="text">
										云快报
									</div>
								</div>
								<div className="apply-item">
									<div className="pic">

									</div>
									<div className="text">
										云快报
									</div>
								</div>
								<div className="apply-item">
									<div className="pic">

									</div>
									<div className="text">
										云快报
									</div>
								</div>
								<div className="apply-item">
									<div className="pic">

									</div>
									<div className="text">
										云快报
									</div>
								</div>
							</div>
						</div>
				</div>
				<div className="g-home-bottom">
					<div className="title">
						<div className="circle">
							
						</div>
						<div className="left">
							最近动态
						</div>
					</div>
					<div className="home-swiper">
						<div className="swiper-container">
							<div className="swiper-wrapper">
								{this.state.infoList.resourceList && this.state.infoList.resourceList.map((item,index)=>{
									return this.renderSwiper(item,index)
								})}
							</div>
							
						</div>
						<div className="oa-swiper-prev"></div>
    					<div className="oa-swiper-next"></div>
						
					</div>
					
					
				</div>
      </div>
    );
  }
}
