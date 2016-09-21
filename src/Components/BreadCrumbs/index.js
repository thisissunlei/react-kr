
import React, {Component, PropTypes} from 'react';

import './index.less';


import {
	Menu,
	MenuItem,
	DropDownMenu,
	IconMenu,
	IconButton,
	Divider,
} from 'material-ui';

import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


export default class TitleList extends Component {

	static propTypes = {
		children: React.PropTypes.node.isRequired,
		hide:React.PropTypes.boll
	};

	constructor(props){
		super(props);
	}


	  render() {

		  const {hide} = this.props;

		  if(hide){
			  return null;
		  }

		return (

		  <div className="titlelist">
			<span>当前位置：</span>
			{this.props.children.map((item)=>{
				return <span key={item} className="list">{item}</span>
			})}
		  </div>

		);
	  }

}







