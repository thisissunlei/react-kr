import {
	PlanMap,
	Dialog,
	Button,
	XTable,
	XTableRow,
	Section,
	SliderTree,
} from 'kr-ui';
import React, { PropTypes } from 'react';
import './index.less';
export default class ZhangChi extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			searchParams:{
				name:'ddsdfs'
			},
			inputValue:'',
			expandedKeys:[],
      		autoExpandParent: true,
			sel: '',
		}

	}
	componentDidMount(){
		var swiper = new Swiper('.swiper-container', {
			slidesPerView: 3,
			paginationClickable: true,
			spaceBetween: 30,
			loop:true,
			autoplay : 560,
		});
		var swiperTwo = new Swiper('.swiper-container2', {
			scrollbar: '.swiper-scrollbar',
			slidesPerView: 1,
			scrollbarHide: false,
			slidesPerView: 'auto',
			centeredSlides: true,
		});
	}
	// onClick = ()=>{
	// 	var searchParams = {
	// 		name:Date.now()
	// 	}

	// 	this.setState({
	// 		searchParams
	// 	});
	// }
	// onChange=(event)=> {
  //   this.filterKeys = [];
  //   this.setState({
  //     inputValue: event.target.value,
  //   });
  // }
  // onVisibleChange=(visible)=> {
  //   this.setState({
  //     visible,
  //   });
  // }
  // onSelect=(selectedKeys, info)=> {
  //   this.setState({
  //     visible: false,
  //     sel: info.node.props.title,
  //   });
  // }
  // onExpand=(expandedKeys)=> {
  //   this.filterKeys = undefined;
  //   // if not set autoExpandParent to false, if children expanded, parent can not collapse.
  //   // or, you can remove all expanded chilren keys.
  //   this.setState({
  //     expandedKeys,
  //     autoExpandParent: false,
  //   });
  // }
  // filterTreeNode=(treeNode)=> {
  //   // 根据 key 进行搜索，可以根据其他数据，如 value
  //   return this.filterFn(treeNode.props.eventKey);
  // }
  // filterFn=(key)=> {
  //   if (this.state.inputValue && key.indexOf(this.state.inputValue) > -1) {
  //     return true;
  //   }
  //   return false;
  // }
	render() {
		// let expandedKeys = this.state.expandedKeys;
		// let autoExpandParent = this.state.autoExpandParent;
		// if (this.filterKeys) {
		// expandedKeys = this.filterKeys;
		// autoExpandParent = true;
		// }
		// const {searchParams} = this.state;

		return (
			<Section title="demo">
				{/*<PlanMap />
					<XTable ajaxUrlName="signCustomers" ajaxParams={this.state.searchParams}>
								<XTableRow label="全选" type="checkbox" name="all" width={30}/>
								<XTableRow label="公司名称" name="signCityName" width={300} tooltip="我的世界"/>
								<XTableRow label="公司" name="company" width={300}/>
								<XTableRow label="时间" name="receiveTimey" type="date" width={100}/>
								<XTableRow label="时间" name="createDate" type="date" width={200}/>
								<XTableRow label="操作" type="operation" component={(scope)=>{
										return <Button onClick={this.onClick} label={scope.signCityName} type="button"/>;
									}} />
					</XTable>*/}

{/*
					<div classNameName="search"> 
						<input type="text" value={this.state.inputValue} placeholder="ddd" onChange={this.onChange} />
						<span classNameName="searching">

						</span>
					</div>

					<SliderTree 
						onExpand={this.onExpand} 
						expandedKeys={expandedKeys}
        				autoExpandParent={autoExpandParent}
        				onSelect={this.onSelect} 
						filterTreeNode={this.filterTreeNode}
						
					/>
*/}
			<div className="swiper-container">
        <div className="swiper-wrapper">
            <div className="swiper-slide1 swiper-slide">Slide 1</div>
            <div className="swiper-slide2 swiper-slide">Slide 2</div>
            <div className="swiper-slide3 swiper-slide">Slide 3</div>
            <div className="swiper-slide4 swiper-slide">Slide 4</div>
            <div className="swiper-slide5 swiper-slide">Slide 5</div>
            <div className="swiper-slide6 swiper-slide">Slide 6</div>
        </div>
    </div>


	<div className="swiper-container2">
        <div className="swiper-wrapper">
            <div className="swiper-slide swiper-slide1">Slide 1</div>
            <div className="swiper-slide swiper-slide2">Slide 2</div>
            <div className="swiper-slide swiper-slide3">Slide 3</div>
            <div className="swiper-slide swiper-slide4">Slide 4</div>
            <div className="swiper-slide swiper-slide5">Slide 5</div>
            <div className="swiper-slide swiper-slide6">Slide 6</div>
        </div>
        <div className="swiper-scrollbar"></div>
    </div>

			</Section>

		);
	}
}
