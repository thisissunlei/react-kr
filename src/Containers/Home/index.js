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
            infoList:{},
        }
	}

  componentDidMount() {
    const { NavModel } = this.props;
	NavModel.setSidebar(false);
	var width = (document.getElementsByClassName('g-home-bottom')[0].clientWidth+180)*0.84*0.056;
	console.log(document.getElementsByClassName('g-home-bottom')[0].clientWidth);
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
			loop:true,
			// prevButton:'.oa-one-swiper-prev',
			// nextButton:'.oa-one-swiper-next',
			// scrollbar: '.swiper-scrollbar',
			slidesPerView: 1,
			scrollbarHide: false,
			slidesPerView: 'auto',
			centeredSlides: true,
			autoplay : 560,
		});
	}, 100);
	
		
	
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
									<div className="swiper-slide swiper-slide1">Slide 1
										
									</div>
									<div className="swiper-slide swiper-slide2">Slide 2</div>
									<div className="swiper-slide swiper-slide3">Slide 3</div>
									<div className="swiper-slide swiper-slide4">Slide 4</div>
								</div>
								
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
								<div className="item">
									<span className="circle">

									</span>
									<span className="item-text">
										ddd
									</span>
								</div>
							</div>
						</div>
						<div className="g-home-middle-item">
							<div className="title">
								<div className="circle">
									
								</div>
								<div className="left">
									最近动态
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
								<div className="swiper-slide1 swiper-slide">Slide 1</div>
								<div className="swiper-slide2 swiper-slide">Slide 2</div>
								<div className="swiper-slide3 swiper-slide">Slide 3</div>
								<div className="swiper-slide1 swiper-slide">Slide 1</div>
								<div className="swiper-slide2 swiper-slide">Slide 2</div>
								<div className="swiper-slide3 swiper-slide">Slide 3</div>
								<div className="swiper-slide1 swiper-slide">Slide 1</div>
								<div className="swiper-slide2 swiper-slide">Slide 2</div>
								<div className="swiper-slide3 swiper-slide">Slide 3</div>
								<div className="swiper-slide1 swiper-slide">Slide 1</div>
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
