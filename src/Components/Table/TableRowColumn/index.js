import React from 'react';

export default class TableRowColumn extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		columnNumber: React.PropTypes.number,
		hoverable: React.PropTypes.bool,
		onCellClick: React.PropTypes.func,
		onHover: React.PropTypes.func,
		onHoverExit: React.PropTypes.func,
		style: React.PropTypes.object,

	}



	constructor(props){
		super(props);

		this.onClick = this.onClick.bind(this);
		this.onMouseEnter = this.onMouseEnter.bind(this);
		this.onMouseLeave = this.onMouseLeave.bind(this);

	}

	onClick(event){
		if(event.target.nodeName.toLowerCase() != 'td' && event.target.nodeName.toLowerCase() != 'input'){
			return null;
		}
		if (this.props.onCellClick) {
			this.props.onCellClick(event, this.props.columnNumber);
		}
	}

	onMouseEnter(event){
		if (this.props.onHover) {
			this.props.onHover(event, this.props.columnNumber);
		}
	}

	onMouseLeave(event){
		if (this.props.onHoverExit) {
			this.props.onHoverExit(event, this.props.columnNumber);
		}
	}


	render() {

		const {
			children,
			className,
			columnNumber, 
			style,
			...other,
		} = this.props;

		const handlers = {
			onClick: this.onClick,
			onMouseEnter: this.onMouseEnter,
			onMouseLeave: this.onMouseLeave,
		};


		return(
			<td className={className} style={style} {...handlers} {...other}>
			{children}	
			</td>
		);


	}
}




