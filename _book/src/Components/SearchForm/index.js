import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';

export default class SearchForm extends React.Component{

	static propTypes = {
		searchFilter:React.PropTypes.array,
		style: React.PropTypes.object,
		onSubmit: React.PropTypes.func,
		grid: React.PropTypes.number,
		left: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		right: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
	}
	constructor(props, context) {
		super(props, context);
		this.state = {
			num : 0,
			value:'',
			content:"",
		};
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

	hasClass=(obj, cls)=> {
	    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
	}
	onBlur=(event)=>{
		let {onSubmit,searchFilter,defaultFilter} = this.props;
		let {value} = this.state;
		let type = '';
		if(!value){
		 searchFilter.map((item)=>{
			if(item.value == defaultFilter){
				type = item.value;
			}
		 })
		}else{
		  searchFilter.map((item)=>{
			if(item.label == value){
				type = item.value;
			}
		  })
		}
		this.setState({
			content:event.target.value
		})
		let search =  {
			value:type,
			content:event.target.value
		}

		onSubmit && onSubmit(search);



	}

	removeClass=(obj, cls)=> {
	    if (this.hasClass(obj, cls)) {
	        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
	        obj.className = obj.className.replace(reg, '');
	    }
	}

	toggleClass=(obj,cls)=>{
	    if(hasClass(obj,cls)){
	        removeClass(obj, cls);
	    } else {
	        obj.className += ' '+cls;
	    }
	}

	selectShow=()=>{
		const list = ReactDOM.findDOMNode(this.selectList);
		let ul = list.getElementsByTagName('ul')[0];
		if (!this.hasClass(ul, 'show-li')) {
	        ul.className += ' show-li';
	    }
	}

	selectHidden=()=>{

		const list = ReactDOM.findDOMNode(this.selectList);
		let ul = list.getElementsByTagName('ul')[0];
		this.removeClass(ul,'show-li');

	}

	getValue=(event)=>{

		let {onSubmit,searchFilter}= this.props;
		let {content,value} = this.state;
		const list = ReactDOM.findDOMNode(this.selectList);
		let ul = list.getElementsByTagName('ul')[0];
		let className = event.target.className;

		var aa = document.getElementsByClassName(className)[0].innerHTML;
		document.getElementsByClassName('search-name')[0].innerHTML = aa;

		this.removeClass(ul,'show-li');
		this.setState({
			value:aa
		});

		searchFilter.map((item)=>{
			if(item.label == aa){
				value = item.value;
			}
		})

		let search =  {
			value:value,
			content:content
		}

		onSubmit && onSubmit(search);

	}

	renderFilter=()=>{

		let {searchFilter,defaultFilter} = this.props;
		let {value} = this.state;

		let select ='请选择';

		if(searchFilter && !value){
			select = searchFilter[0].label;
		}

		if(value){
			select = value;
		}

		if(defaultFilter && !value){
			searchFilter.map((item)=>{
				if(item.value == defaultFilter){
					select = item.label;
				}
			})
		}
		console.log(select,"BBBBB")
		if(searchFilter){

			return(
				<div className="search-filter" ref={div=>{this.selectList = div}}>
					<span className="filter-container" onMouseOver={this.selectShow} onMouseOut={this.selectHidden}>
						<span className="search-name" >{select}</span>
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

	onChange = (data) =>{
		const {value,content}=this.state;
		let text="";
		const {onChange,defaultFilter,searchFilter} = this.props;

		if(value){
			for(var i=0;i<searchFilter.length;i++){
				if(value == searchFilter[i].label){
					text = searchFilter[i].value;
					break;
				}
			}
		}
		let all={
			value:text||defaultFilter,
			content:data.target.value||'',
		}
		console.log(value,"LLLLLLL");
		onChange && onChange(all);
	}

	render(){

		let {
			left,
			right,
			grid =1,
			style,
			defaultFilter,
			defaultContent
		}= this.props;

		let WrapStyles = Object.assign({}, {
			width: (grid * 100) + '%',
			paddingLeft: left,
			paddingRight: right
		}, style);

		return (

			<div className='search-form-member' ref={div=>{this.form = div}} name="search-form" style={WrapStyles}>
				<div className="search-status" >
					{this.renderFilter()}
					<div className="search-content">
						<input type="text" defaultValue={defaultContent} onChange = {this.onChange} className="search-val" placeholder="请输入查找内容" onBlur={this.onBlur} name="keywords" id="keywords" autoComplete="off" ref="componentSearchInput"/>
					</div>
				</div>

			</div>
		)
	}
}
