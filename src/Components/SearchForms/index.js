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
		style: React.PropTypes.object,
		//事件
		onSubmit: React.PropTypes.func,
		onFilter: React.PropTypes.func,

	}
	constructor(props, context) {
		super(props, context);
		this.click = this.click.bind(this);
		this.selectShow = this.selectShow.bind(this);
		this.state = {
			num : 0,
			value:'',
			otherName:'',
		};
		this.hasClass = this.hasClass.bind(this);
		this.removeClass = this.removeClass.bind(this);
		this.toggleClass = this.toggleClass.bind(this);
		this.selectHidden = this.selectHidden.bind(this);
		this.getValue = this.getValue.bind(this);
		this.renderFilter = this.renderFilter.bind(this);
		this.bodyEvent = this.bodyEvent.bind(this);
		// this.bodyEvent()
	}
	componentDidMount() {
		let _this = this;
		 $('.search-val').bind('keypress',function(event){

            if(event.keyCode == "13")

            {
            	event.preventDefault ? event.preventDefault() : event.returnValue = false;
  				_this.click();
                // alert('你输入的内容为：' + $('.search-val').val());

            }

        });
	}
	componentWillReceiveProps(nextProps){
		if (!this.isInit && nextProps.value) {
			let value = nextProps.value;
			this.setState({
				value
			});
			this.isInit = true;
		}

	}
	hasClass(obj, cls) {
	    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}




	removeClass(obj, cls) {
	    if (this.hasClass(obj, cls)) {
	        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	        obj.className = obj.className.replace(reg, '');
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
		let {searchFilter} = this.props;
		let _this = this;
		let otherName="";
		const form = ReactDOM.findDOMNode(this.form);
		const searchButton = form.getElementsByClassName('icon-searching')[0];
		const searchForm = form.getElementsByClassName('search-status')[0];

		if(!num){
			if(!this.hasClass(searchButton, 'click')){
				searchButton.className = searchButton.className + ' click';

				if(searchFilter){
					otherName="renderFilter";
					searchForm.className = searchForm.className+" filter-show-form";
				}else{
		       		searchForm.className = searchForm.className+" show-form";
				}




			}
			_this.setState({
					num:1,
					otherName:otherName
				})



		} else {
			let searchName = '';
			let {searchFilter,inputName} = this.props;
			let filterValue = '';

			const filterDom = document.getElementsByClassName('search-name');
			if(filterDom.length){
				searchName = document.getElementsByClassName('search-name')[0].innerHTML;
				searchFilter.forEach((item)=>{
					if(item.label === searchName ){
						filterValue = item.value
					}
				})
			}
			if(!inputName){
				inputName='keywords';
			}
			var searchWord = document.getElementById(inputName).value;
				let value = {
					filter:filterValue || '',
					content:searchWord || ''
				};
				let {onSubmit} = this.props;
				onSubmit && onSubmit(value);
			// if(this.hasClass(searchForm, 'show-form')){
		 //        this.removeClass(searchForm,'show-form');
			// 	this.removeClass(searchButton,'click');
			// }
			// _this.setState({
			// 		num:0
			// 	})

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
		let {searchFilter} = this.props;
		let filterValue ='';
		const list = ReactDOM.findDOMNode(this.selectList);
		let ul = list.getElementsByTagName('ul')[0];
		let className = event.target.className;
		var aa = document.getElementsByClassName(className)[0].innerHTML;
		document.getElementsByClassName('search-name')[0].innerHTML = aa;
		this.removeClass(ul,'show-li');
		searchFilter.forEach((item)=>{
			if(item.label === aa ){
				filterValue = item.value
			}
		})
		let {onFilter} = this.props;
		onFilter && onFilter(filterValue);
	}
	bodyEvent(event){
		let _this = this;
		let targetName = event.target.className;
		if(targetName == icon-searching){
			_this.click();
		}
		let targetList = ['icon-searching', 'search-val', 'search-name','filter-container','icon-searching click'];
		$('.icon-searching').click(function(event){
			// const form = ReactDOM.findDOMNode(_this.form);

			// let searchName = '';
			// let {searchFilter} = _this.props;
			// let filterValue = '';

			// const filterDom = document.getElementsByClassName('search-name');
			// if(filterDom.length){
			// 	searchName = document.getElementsByClassName('search-name')[0].innerHTML;
			// 	searchFilter.forEach((item)=>{
			// 		if(item.label === searchName ){
			// 			filterValue = item.value
			// 		}
			// 	})
			// }
			// var searchWord = document.getElementById("keywords").value;

			// if(form){
			// 	const searchButton = form.getElementsByClassName('icon-searching')[0];
			// 	const searchForm = form.getElementsByClassName('search-status')[0];
			// 	let name = event.target.className;
			// 	let close = true;
			// 	if(parseInt(name)+1){return;}
			// 	targetList.forEach((item)=>{
			// 		if(item === name){
			// 			close = false;
			// 		}
			// 	})
			// 	if(name == 'icon-searching click' || name == 'icon-searching'){
			// 		_this.click();
			// 	}
			// 	if(filterValue || searchWord){return;}
			// 	// if(close){
			// 	// 	_this.removeClass(searchForm,'show-form');
			// 	// 	_this.removeClass(searchButton,'click');
			// 	// 	_this.setState({num:0})
			// 	// }
			// }


		})
	}
	renderFilter(){
		let {searchFilter} = this.props;
		let {value} = this.state;
		let select ='请选择';


		if(searchFilter){

			return(
				<div className="search-filter" ref={div=>{this.selectList = div}}>
					<span className="filter-container" onMouseOver={this.selectShow} onMouseOut={this.selectHidden}>
						<span className="search-name" >{searchFilter[0].label}</span>
						<em className="icon-return"></em>
					</span>

					<ul onMouseOver={this.selectShow} onMouseOut={this.selectHidden} ref={li=>{this.li = li}}>
						{searchFilter && searchFilter.map((item,index)=>{

								return (
									<li className={`${index}`} onClick={this.getValue} key={index}>
										{item.label}
									</li>
								)

						})}
					</ul>
				</div>

			)
		}
	}
	render(){
		var placeholder=this.props.placeholder||"请输入查找内容"

		let {style,inputName,searchFilter} = this.props;
		let {otherName}=this.state;

		if(!inputName){
			inputName='keywords';
		}

		return (
			<div className={`search-form ${otherName}`} ref={div=>{this.form = div}} name="search-form" style={style}>
				<div className="search-status" >
					{this.renderFilter()}

					<div className="search-content">
						<input type="text" autoComplete="off" className="search-val" placeholder={placeholder}  name={inputName} id={inputName} ref="realInput"/>
					</div>
				</div>
				<span className="icon-searching" onClick={this.click}></span>

			</div>
		)
	}
}
