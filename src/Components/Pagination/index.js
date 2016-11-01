import React, {Component, PropTypes} from 'react';

import './index.less';

export default class Pagination extends Component {

	static propTypes = {
		children: PropTypes.node,
		page: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number]),
		pageSize: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number]),
		totalCount: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number]),
		onPageChange:React.PropTypes.func
	};

	constructor(props){
		super(props);

		this.onPrev =  this.onPrev.bind(this);
		this.onNext = this.onNext.bind(this);
		this.onFirst = this.onFirst.bind(this);
		this.onPageChange = this.onPageChange.bind(this);
		this.onJumpPage = this.onJumpPage.bind(this);

		this.renderFirst = this.renderFirst.bind(this);
		this.renderLast = this.renderLast.bind(this);
		this.renderBody = this.renderBody.bind(this);


	}

	onPrev(){

		var {page} = this.props;

		if(page == 1){
			return ;
		}

		if(page>0){
			page--;
		}
		this.onPageChange(page);
	}

	onFirst(){
		this.onPageChange(1);
	}

	onNext(){

		let {page,pageSize,totalCount} = this.props;

		if(page == Math.ceil(totalCount/pageSize)){
			return ;
		}


		if(page>0 && page<Math.ceil(totalCount/pageSize)){
			page++;
		}
		
		this.onPageChange(page);
	}

	onJumpPage(event){
		this.onPageChange(event.target.innerHTML);
	}

	onPageChange(page){

		const {onPageChange} = this.props;
		onPageChange && onPageChange(page);
	}

	renderFirst(){

		let {page,pageSize,totalCount} = this.props;

		return(
			<div className="item-prev">
				<a className="item" onClick={this.onPrev}>上一页</a>
			</div>
		);

	}

	renderBody(){

		let {page,pageSize,totalCount} = this.props;


		let pageBody = [];

		let props = { };

		const handlers = {
			onClick:this.onJumpPage
		}

		for(var i = 1;i<=Math.ceil(totalCount/pageSize);i++){
			props.key = i;
			props.className = 'item';
			if(page == i){
				props.className+=' active';
			}
			let element = React.createElement('a', {...props,...handlers},i);
			pageBody.push(element);
		}

		return(
				<div className="item-body">
					{pageBody}
				</div>
		);
	}

	renderLast(){

		let {page,pageSize,totalCount} = this.props;

		return(
			<div className="item-next">
				<a className="item" onClick={this.onNext} page={page+1}>下一页</a>
			</div>
		);

	}
	  render() {

		return (

		  <div className="pagination">
					{this.renderFirst()}
					{this.renderBody()}
					{this.renderLast()}
		  </div>

		);
	  }

}








