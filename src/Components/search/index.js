import React,{Component} from 'react';
import './index.less';
import $ from 'jquery';
import {
	FontIcon,
} from 'kr-ui';
import ReactDOM from 'react-dom';
export default class SearchForms extends Component{
	// var aa = document.getElementById("keywords").value;
	static PropTypes = {
		searchFilter:React.PropTypes.array,
		//事件
		onSubmit: React.PropTypes.func,
	}
	constructor(props, context) {
		super(props, context);
		this.click = this.click.bind(this);
		this.selectShow = this.selectShow.bind(this);
		this.state = {
			num : 0
		};
		this.hasClass = this.hasClass.bind(this);
		this.removeClass = this.removeClass.bind(this);
		this.toggleClass = this.toggleClass.bind(this);
		this.selectHidden = this.selectHidden.bind(this);
		this.getValue = this.getValue.bind(this);
		this.renderFilter = this.renderFilter.bind(this);
	}
	componentDidMount() {
	}
	componentWillReceiveProps(nextProps){
	}
	hasClass(obj, cls) {
	    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}
	
	 
	
	 
	removeClass(obj, cls) {
	    if (this.hasClass(obj, cls)) {
	        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	        obj.className = obj.className.replace(reg, ' ');
	    }
	}
	 
	toggleClass(obj,cls){
	    if(hasClass(obj,cls)){
	        removeClass(obj, cls);
	    } else {
	        obj.className += ' '+cls;
	    }
	}

	click(){
		let {num} = this.state;
		const form = ReactDOM.findDOMNode(this.form);
		const searchButton = form.getElementsByClassName('icon-searching')[0];
		const searchForm = form.getElementsByClassName('search-status')[0];
		console.log(num);
		
		if(num === 0){
			if (!this.hasClass(searchButton, 'click')) {
		        searchButton.className += ' click';
		    }
		    if (!this.hasClass(searchForm, 'show-form')) {
		        searchForm.className += " show-form";
		    }
		    this.setState({
		    	num:1
		    })
			
			
		}else if(num === 1){
			let searchName = '';
			const filterDom = document.getElementsByClassName('search-name');
			if(filterDom.length){
				searchName = document.getElementsByClassName('search-name')[0].innerHTML;
			}
			var searchWord = document.getElementById("keywords").value;
			console.log(searchName,searchWord);
			let value = {
				filter:searchName,
				content:searchWord
			};
			let {onSubmit} = this.props;
			onSubmit && onSubmit(value);
		}


	}
	selectShow(){
		const list = ReactDOM.findDOMNode(this.selectList);
		let ul = list.getElementsByTagName('ul')[0];
		if (!this.hasClass(ul, 'show-li')) {
	        ul.className += ' show-li';
	    }
		

	}
	selectHidden(){
		const list = ReactDOM.findDOMNode(this.selectList);
		let ul = list.getElementsByTagName('ul')[0];
		this.removeClass(ul,'show-li');
	}
	getValue(event){
		// const li = ReactDOM.findDOMNode(this.li);
		const list = ReactDOM.findDOMNode(this.selectList);
		let ul = list.getElementsByTagName('ul')[0];
		var aa = document.getElementsByClassName(event.target.className)[0].innerHTML;
		document.getElementsByClassName('search-name')[0].innerHTML = aa;
		this.removeClass(ul,'show-li');
	}
	renderFilter(){
		let {searchFilter} = this.props;
		console.log(searchFilter);
		if(searchFilter){
			return(
				<div className="search-filter" ref={div=>{this.selectList = div}}>
					<span className="search-name" onMouseOver={this.selectShow} onMouseOut={this.selectHidden}>ww</span>
					<ul onMouseOver={this.selectShow} onMouseOut={this.selectHidden} ref={li=>{this.li = li}}>
						{searchFilter && searchFilter.map((item,index)=>{
							return (
								<li className={`"${index}"`} onClick={this.getValue} key={index}>
									{index}
								</li>
							)
						})}
					</ul>
				</div>

			)
		}
	}
	render(){
		
		return (
			<div className="search-form" ref={div=>{this.form = div}}>
				<div className="search-status" >
					{this.renderFilter()}
					
					<div className="search-content">
						<input type="text" className="search-val" placeholder="请输入您要查找的内容"  name="keywords" id="keywords"/>
					</div>
				</div>
				<span className="icon-searching" onClick={this.click}></span>

			</div>
		)
	}
}