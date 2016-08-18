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


export default class Section extends Component {

	static propTypes = {
		children: PropTypes.node,
		title:PropTypes.string.isRequired,
		description: PropTypes.string,
		rightMenu: PropTypes.node,
	};

	constructor(props){
		super(props);

	}


	renderRightMenu(){
		return(
			<div className="right-menu">
				<IconMenu
				iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
				anchorOrigin={{horizontal: 'left', vertical: 'top'}}
				targetOrigin={{horizontal: 'left', vertical: 'top'}}
				>
					{this.props.rightMenu}
				</IconMenu>
			</div>
		);
	}
	renderSectionTitle(){

		return (
				<div className="section-title">
					<div className="title">
						{this.props.title}
					</div>
					<div className="right-element">

						{this.props.rightMenu?this.renderRightMenu():null}
					</div>

				</div>
		);
	}

	  render() {

		return (

		  <div className="section">

			  <div className="section-header">

				  { this.props.title?this.renderSectionTitle():null }

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




