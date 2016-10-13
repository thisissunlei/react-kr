import React, {Component, PropTypes} from 'react';

import './index.less';

export default class Pagination extends Component {

	static propTypes = {
		children: PropTypes.node,
		page:React.PropTypes.number,
		pageSize:React.PropTypes.number,
		totalCount:React.PropTypes.number,
	};

	constructor(props){
		super(props);


		this.renderFirst = this.renderFirst.bind(this);
		this.renderLast = this.renderLast.bind(this);
		this.renderBody = this.renderBody.bind(this);

	}


	renderFirst(){

		let {page,pageSize,totalCount} = this.props;

		return(
			<div className="item-prev">
				<a className="item">上一页</a>
			</div>
		);

	}

	renderBody(){

		let {page,pageSize,totalCount} = this.props;


		let pageBody = [];

		for(var i = 1;i<totalCount/pageSize;i++){
			let element = React.createElement('a', { className:'item' },i);
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
				<a className="item">下一页</a>
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










