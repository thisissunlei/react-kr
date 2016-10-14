import React from 'react';

import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';

export default class TableBody extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		insertElement:React.PropTypes.node,
		allRowsSelected:React.PropTypes.bool,
		displayCheckbox:React.PropTypes.bool,
		selectedRows:React.PropTypes.array,
		visibilityRows:React.PropTypes.array,
		setRowTotalCount:React.PropTypes.func,
		defaultValue:React.PropTypes.object,
		listData:React.PropTypes.listData,
	}

	
	constructor(props,context){
		super(props,context);

		this.toggleInsertElement = this.toggleInsertElement.bind(this);
		this.createRowElement = this.createRowElement.bind(this);

		this.renderRows = this.renderRows.bind(this);
		this.onCellClick = this.onCellClick.bind(this); 
		this.onCellHover = this.onCellHover.bind(this);
		this.onCellHoverExit = this.onCellHoverExit.bind(this);
		this.onRowHover = this.onRowHover.bind(this);
		this.onRowHoverExit = this.onRowHoverExit.bind(this);
		this.onRowClick = this.onRowClick.bind(this);

		this.createRowCheckboxColumn = this.createRowCheckboxColumn.bind(this);

		this.createAjaxRow  = this.createAjaxRow.bind(this);
		this.createNormalRow = this.createNormalRow.bind(this);

		this.state = {
			showInsertElement:false,
		}
	}

	toggleInsertElement(event){

		let target = event.target;
		let nodeName = target.nodeName.toLowerCase();

		if(nodeName === 'input'){
			return false;
		}

		this.setState({
			showInsertElement:!this.state.showInsertElement
		});
	}

	renderInsertElement(){
		let {insertElement,colSpan} = this.props;
		if(!insertElement || !this.state.showInsertElement){
			return null;
		}
		return (
			<TableRow>
				<TableRowColumn colSpan={colSpan}> {insertElement} </TableRowColumn>
			</TableRow>
		)
	}

	onCellClick(){

	}

	onCellHover(){

	}

	onCellHoverExit(){

	}

	onRowHover(){

	}

	onRowHoverExit(){

	}

	onRowClick(event,rowNumber){

		if (this.props.onRowClick) {
			this.props.onRowClick(event, rowNumber);
		}

		this.toggleInsertElement(event);
	}

	createRowCheckboxColumn(rowProps) {

		if(!this.props.displayCheckbox){
			return null;
		}

		if (!rowProps.displayCheckbox && this.props.displayCheckbox) {
			return null;
		}

		let key = `${rowProps.rowNumber}-cb`;
		let disabled = !this.props.selectable;
		let checkbox = (
			<input type="checkbox" checked={rowProps.selected} />
		);

		return (

			<TableRowColumn
			key={key}
			columnNumber={0}
			width={this.props.defaultValue.checkboxWidth}
			>
			{checkbox}
			</TableRowColumn>
		);
	}


	createRowElement(child,rowNumber){

		const handlers = {
			onCellClick: this.onCellClick,
			onCellHover: this.onCellHover,
			onCellHoverExit: this.onCellHoverExit,
			onRowHover: this.onRowHover,
			onRowHoverExit: this.onRowHoverExit,
			onRowClick: this.onRowClick,
		};

		let displayCheckbox = false;
		if(child.props && child.props.hasOwnProperty('displayCheckbox')){
			displayCheckbox = child.props.displayCheckbox;
		}

		let itemData = this.props.listData[rowNumber];

		let props = {
			displayCheckbox:(displayCheckbox? true:false),
			key:rowNumber,
			rowNumber: rowNumber,
			selected: this.isRowSelected(rowNumber),
			visibility:this.isRowVisibility(rowNumber),
			itemData,
		};

		let children = [
			this.createRowCheckboxColumn(props),
		];

		if (React.isValidElement(child)) {
			React.Children.forEach(child.props.children, (child) => {
				children.push(child);
			});
			return React.cloneElement(child, {...props, ...handlers},children);
		}

		return null;
	}


	createAjaxRow(){

		let {listData,ajax} = this.props;


		let cloneElement; 

		React.Children.map(this.props.children, (child) => {
			cloneElement = child;
		});

		let rows = [];

		for(var i = 0 ;i<listData.length;i++){
			let element = React.cloneElement(cloneElement, {key:i});
			rows.push(this.createRowElement(element,i)) ;
		}

		return rows;
	}

	createNormalRow(){
		let rows = [];
		let numChildren = React.Children.count(this.props.children);
		let {displayCheckbox,setRowTotalCount} = this.props;
		let rowNumber = 0;
		React.Children.map(this.props.children, (child) => {
			rows.push(this.createRowElement(child,rowNumber++)) ;
		});
		return rows;
	}

	renderRows() {

		let {ajax} = this.props;

		return ajax?this.createAjaxRow():this.createNormalRow();
	}


	isRowVisibility(rowNumber) {

		if(parseInt(this.props.visibilityRows[rowNumber])){
			return true;
		}

		return false;
	}

	isRowSelected(rowNumber) {
		if(parseInt(this.props.selectedRows[rowNumber])){
			return true;
		}
		return false;
	}


	render() {

		let {className} = this.props;

		return (
			<tbody className={className}>
			{this.renderRows()}
			{this.renderInsertElement()}
			</tbody>
		);

	}
}



/*
   <tbody className={className} onTouchTap={this.toggleInsertElement}>

*/






