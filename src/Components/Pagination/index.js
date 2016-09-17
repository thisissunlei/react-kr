import React, {Component, PropTypes} from 'react';

import './index.less';

export default class Pagination extends Component {

	static propTypes = {
		children: PropTypes.node,
		total:React.PropTypes.number,
		size:React.PropTypes.number,
		current:React.PropTypes.number,
	};

	constructor(props){
		super(props);

	}

	  render() {

		return (
		  <div className="pagination">

		  </div>
		);
	  }

}










