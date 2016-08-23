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
		leftIcon: PropTypes.node,
		rightMenu: PropTypes.node,
		height:PropTypes.number,
	};

	constructor(props){
		super(props);

		this.renderSectionTitle = this.renderSectionTitle.bind(this);
		this.renderHeaderLeftIcon = this.renderHeaderLeftIcon.bind(this);
		this.renderDescription = this.renderDescription.bind(this);

		this.touchHeaderTitle = this.touchHeaderTitle.bind(this);

		this.state = {
			openBody:true
		}

	}


	renderRightMenu(){

		if(!this.props.rightMenu){
			return null;
		}

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

	renderHeaderLeftIcon(){

		if(!this.props.leftIcon){
			return null;
		}

		return (
				<div className="left-icon">
					{this.props.leftIcon}
				</div>
		);

	}
	touchHeaderTitle(){
		this.setState({
			openBody:!this.state.openBody
		});
		console.log('hh');
	}

	renderSectionTitle(){

		if(!this.props.title){
			return null;
		}

		return (
				<div className="section-title">

					{this.renderHeaderLeftIcon()}

					<div className="title" onTouchTap={this.touchHeaderTitle}>
						{this.props.title}
					</div>

					<div className="right-element">
						{this.renderRightMenu()}
					</div>

				</div>
		);
	}

	renderBody(){


		if(!this.state.openBody){
			return null;
		}
		const {height} = this.props;
		const bodyStyles = {
			height:'auto'
		};

		if(height){
			bodyStyles.height = height+'px';
			bodyStyles.overflowY = 'auto';
		}

		return (

			  <div className="section-body" style={bodyStyles} >
				  {this.props.children}
			  </div>
		);

	}

	renderDescription(){

		return(
			<div className="section-description">
				{this.props.description}
			</div>
		);

	}

	  render() {

		return (

		  <div className="section">

			  <div className="section-header">

				  {this.renderSectionTitle()}
				  {this.renderDescription()}
			  </div>

			  {this.renderBody()}

		  </div>

		);
	  }

}




