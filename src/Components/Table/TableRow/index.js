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
		itemData:React.PropTypes.object,
	}

	constructor(props){
		super(props);

		this.onCellClick = this.onCellClick.bind(this); 
		this.onCellHover = this.onCellHover.bind(this);
		this.onCellHoverExit = this.onCellHoverExit.bind(this);
		this.onRowHover = this.onRowHover.bind(this);
		this.onRowHoverExit = this.onRowHoverExit.bind(this);
		this.onRowClick = this.onRowClick.bind(this);

		this.renderRow = this.renderRow.bind(this);
		this.createRowColumn = this.createRowColumn.bind(this);
	}

	onCellClick(event){
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

	createRowColumn(basic,columnNumber){

		const {itemData} = this.props; 
		let {name} = basic.props;
		let value = '';

		if(name && itemData && itemData.hasOwnProperty(name)){
			value = itemData[name];
			value = value.toString();
		}

		return React.cloneElement(basic, {
			columnNumber: columnNumber,
			hoverable: this.props.hoverable,
			key: `${this.props.rowNumber}-${columnNumber}`,
			onCellClick: this.onCellClick,
			onHover: this.onCellHover,
			onHoverExit: this.onCellHoverExit,
			value,
		});
	}

	renderRow(){
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
			itemData,
			...other,
		} = this.props;

		let rowColumns = React.Children.map(this.props.children, (child, columnNumber) => {
			if (React.isValidElement(child)) {
				return this.createRowColumn(child,columnNumber);
			}
		});

		return rowColumns;
	}


	render() {

		const {
			className,
			visibility,
			...other,
		} = this.props;

		if(visibility){
			return (
				<tr className={className} {...other}>
					{this.renderRow()}
				</tr>
			);
		}

		return (
			<tr></tr>
		);


	}
}







