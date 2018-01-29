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
		document.body.addEventListener("click",this.onClickOther.bind(this));
	}

	componentWillUnmount(){
		
		document.body.removeEventListener("click",this.onClickOther.bind(this)); 	
	}

	onClickOther = (event)=>{

	  	event = event || window.event;
		var target = event.target;
		
		while (target) {
			if (target && target.className && target.className.indexOf('ui-title-text') !== -1) {
				if(!this.state.showList){
					return;
				}
			}
			target = target.parentNode;
		}
        this.setState({
          	showList:false
        });
        
    }



	renderItemLi=()=>{
		
		let _this = this;
		let {dropItmes,liWidth} = this.props;
<<<<<<< HEAD
				
=======
	
>>>>>>> 1d7cd2578caea5541181dafb479cc5f5fdf0cf63
		var itemsList = dropItmes.map(function(item,index){
			
			return <li style={{width:liWidth}} className="ui-dropdown-li" onClick={_this.onclickItems.bind(_this,item)}>{item.title}</li>
		})
		return itemsList;

	}

	onclickItems=(thisP,item)=>{
		
		this.hideList();
		thisP.onClickFun();
	}

	showListFun=()=>{
		
		let _this =this;
		this.setState({
			showList : !this.state.showList
		},function(){
			if(_this.state.showList){
				let {onMouseOn} = _this.props;
				onMouseOn && onMouseOn();
			}
		})

	}
	hideList=()=>{

		this.setState({
			showList : false
		})

	}



	render() {
		
		let {textTitle,className,wrapStyle,dropItmes,liWidth,titleStyle} = this.props;
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
			>
				<div>
					<span className="ui-title-text" style={titleStyle} onClick={this.showListFun} id={'drop-down-'+(+new Date())}>{textTitle}</span>
				</div>
				<span className="ui-small-square" style={{display:showList?"block":"none"}}></span>
				<ul 
					style={{display:showList?"block":"none",position:"absolute",left:-liWidth-25,top:ulTop}}
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
