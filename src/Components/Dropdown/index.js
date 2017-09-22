import React from 'react';

import ReactDOM from 'react-dom';

import './index.less';
export default class Tooltip extends React.Component {

	static defaultProps = {
		
	}
	static PropTypes = {
		// className: React.PropTypes.string,
		// children: React.PropTypes.node,
		// /**
		//  * place有四个参数值top,bottom,left,right
		//  */
		// place:React.PropTypes.string,
		// backgroundColor:React.PropTypes.string,
		// /**
		//  * tooltip内容的阴影，box-shadow的参数
		//  */
		// boxShadow:React.PropTypes.string,
		// /**
		//  * 与box-shadow的阴影色相同
		//  */

	}
	constructor(props){
		super(props);
		this.state={
			showList: false
		}
	}

	componentDidMount() {

	}

	renderItemLi=()=>{
		let {dropItmes,liWidth} = this.props;

		var itemsList = dropItmes.map(function(item,index){
			
			return <li style={{width:liWidth}} className="ui-dropdown-li" onClick={item.onClickFun}>{item.title}</li>
		})
		return itemsList;

	}

	showList=()=>{
		this.setState({
			showList : true
		})

		let {onMouseOn} = this.props;
		onMouseOn && onMouseOn();
	}
	hideList=()=>{

		this.setState({
			showList : false
		})

	}



	render() {
		
		let {textTitle,className,wrapStyle,dropItmes,liWidth,titleStyle} = this.props;
		console.log("titleStyle",titleStyle);
		let {showList} = this.state;
		var ulTop = -(dropItmes.length)*30/2;

		let styleOuter={
			display: "inline-block",
			position:"relative",
		}
		if(!wrapStyle){
			var wrapStyleAll = styleOuter;
		}else{
			var wrapStyleAll = Object.assign(wrapStyle,styleOuter);
		}
		var leftP = "-"+"liWidth"+"px"
		return(
			<div className={className}  
				style={wrapStyleAll} 
				onMouseEnter={this.showList} 
				onMouseLeave={this.hideList}
			>
				<div>
					<span className="ui-title-text" style={titleStyle}>{textTitle}</span>
				</div>
				<span className="ui-small-square" style={{display:showList?"block":"none"}}></span>
				<ul 
					style={{display:showList?"block":"none",position:"absolute",left:-liWidth-30,top:ulTop}}
					className = "ui-dropdown-ul"
				>
					
					{
						this.renderItemLi()
					}
				</ul>
			</div>
		);
	}
}
