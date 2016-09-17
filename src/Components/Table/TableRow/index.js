import React from 'react';

export default class TableRow extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		onCellClick: React.PropTypes.func,
		onCellHover:React.PropTypes.func,
		onCellHoverExit: React.PropTypes.func,
		onRowClick:React.PropTypes.func,
		onRowHover:React.PropTypes.func,
		onRowHoverExit: React.PropTypes.func,
		rowNumber: React.PropTypes.number,
		selected: React.PropTypes.bool,
		visibility: React.PropTypes.bool,
	}

	constructor(props){
		super(props);

		this.onCellClick = this.onCellClick.bind(this); 
		this.onCellHover = this.onCellHover.bind(this);
		this.onCellHoverExit = this.onCellHoverExit.bind(this);
		this.onRowHover = this.onRowHover.bind(this);
		this.onRowHoverExit = this.onRowHoverExit.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
	}

	onCellClick(event){
		console.log('---->>>>');
		this.onRowClick(event);
	}

	onCellHover(){

	}

	onCellHoverExit(){

	}

	onRowHover(){

	}

	onRowHoverExit(){

	}

	onRowClick(event){
		if (this.props.onRowClick) {
			this.props.onRowClick(event, this.props.rowNumber);
		}
	}


	componentWillReceiveProps(nextProps,nextContext){

	}

	componentWillUpdate(nextProps,nextState,nextContext){

	}


	render() {

		const {
			className,
			hovered, 
			onCellClick,
			onCellHover,
			onCellHoverExit, 
			onRowClick, 
			onRowHover, 
			onRowHoverExit, 
			rowNumber,
			selectable,
			selected,
			visibility,
			style,
			...other,
		} = this.props;

		const rowColumns = React.Children.map(this.props.children, (child, columnNumber) => {
			if (React.isValidElement(child)) {
				return React.cloneElement(child, {
					columnNumber: columnNumber,
					hoverable: this.props.hoverable,
					key: `${this.props.rowNumber}-${columnNumber}`,
					onCellClick: this.onCellClick,
					onHover: this.onCellHover,
					onHoverExit: this.onCellHoverExit,
				});
			}
		});

		if(visibility){

			return (
				<tr className={className} {...other}>
				{rowColumns}
				</tr>

			);
		}

		return (
				<tr> </tr>
		);


	}
}







