import React, {Component, PropTypes} from 'react';

import './index.less';

export default class Section extends Component {

	static propTypes = {
		children: PropTypes.node,
		title:PropTypes.string.isRequired,
		description: PropTypes.string,
	};

	constructor(props){
		super(props);

	}


  render() {

    return (

      <div className="section">

		  <div className="section-header">
				<div className="section-title">
					{this.props.title}
				</div>
				<div className="section-description">
					{this.props.description}
				</div>
		  </div>

		  <div className="section-body">
			  {this.props.children}
		  </div>

      </div>

    );
  }

}




