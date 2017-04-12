import React from 'react';

import Checkbox from '../../Checkbox';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';



export default class TableBody extends React.Component {

	static displayName = 'TableBody';

	static propTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		insertElement: React.PropTypes.node,
		allRowsSelected: React.PropTypes.bool,
		displayCheckbox: React.PropTypes.bool,
		selectedRows: React.PropTypes.array,
		visibilityRows: React.PropTypes.array,
		setRowTotalCount: React.PropTypes.func,
		defaultValue: React.PropTypes.object,
		listData: React.PropTypes.array,
		onOperation: React.PropTypes.func,
	}


	constructor(props, context) {
		super(props, context);

		this.state = {
			showInsertElement: false,
		}

	}

	toggleInsertElement = (event)=> {

		if(event&&!event.hasOwnProperty('target')){
				return ;
		}

		let target = event&&event.target;
		let nodeName =target&&target.nodeName.toLowerCase();

		if (nodeName === 'input') {
			return false;
		}
		this.setState({
			showInsertElement: !this.state.showInsertElement
		});
	}

	renderInsertElement() {

		let {
			insertElement,
			colSpan
		} = this.props;

		if (!insertElement || !this.state.showInsertElement) {
			return null ;
		}
		return (
			<TableRow>
				<TableRowColumn colSpan={colSpan}> {insertElement} </TableRowColumn>
			</TableRow>
		)
	}

	onOperation = (type, itemData) => {
		const {
			onOperation
		} = this.props;
		onOperation && onOperation(type, itemData);
	}

	onCellClick =() =>{

	}

	onCellHover=()=>{

	}

	onCellHoverExit=()=>{

	}

	onRowHover = ()=> {

	}

	onRowHoverExit = () =>{

	}

	onRowClick = (event, rowNumber)=> {

		const {
			onRowClick
		} = this.props;

		onRowClick && onRowClick(event, rowNumber);
		this.toggleInsertElement(event);
	}

	createRowCheckboxColumn = (rowProps)=>{

		if (!this.props.displayCheckbox) {
			return null;
		}

		if (!rowProps.displayCheckbox && this.props.displayCheckbox) {
			return null;
		}
		return (
			<TableRowColumn
			columnNumber={0}
			width={this.props.defaultValue.checkboxWidth}
			{...rowProps}
			>
			<Checkbox checked={rowProps.selected}  onCheck={function(event){ rowProps.onRowClick(event,rowProps.key); }} />
			</TableRowColumn>
		);
	}


	createRowElement =(child, rowNumber)=> {

		let {
			listData,
			displayCheckbox
		} = this.props;

		const handlers = {
			onCellClick: this.onCellClick,
			onCellHover: this.onCellHover,
			onCellHoverExit: this.onCellHoverExit,
			onRowHover: this.onRowHover,
			onRowHoverExit: this.onRowHoverExit,
			onRowClick: this.onRowClick,
			onOperation: this.onOperation,
		};

		/*
		let displayCheckbox = true;
		if(child.props && child.props.hasOwnProperty('displayCheckbox')){
			displayCheckbox = child.props.displayCheckbox;
		}
		*/

		let itemData = listData[rowNumber] || {};

		let props = {
			displayCheckbox: displayCheckbox,
			key: rowNumber,
			rowNumber: rowNumber,
			selected: this.isRowSelected(rowNumber),
			visibility: this.isRowVisibility(rowNumber),
			itemData,
		};

		let children = [
			this.createRowCheckboxColumn(Object.assign({}, props, handlers)),
		];

		if(React.isValidElement(child)) {
			React.Children.forEach(child.props.children, (child) => {
				children.push(child);
			});
			return React.cloneElement(child, {
				...child.props,
				...props,
				...handlers
			}, children);
		}

		return null;
	}


	createAjaxRow = ()=>{

		let {
			listData,
			ajax
		} = this.props;


		let cloneElement;
		React.Children.map(this.props.children, (child) => {
			cloneElement = child;
		});

		let rows = [];

		for (var i = 0; i < listData.length; i++) {
			let element = React.cloneElement(cloneElement, {
				key: i
			});

			if(React.isValidElement(element)){
				rows.push(this.createRowElement(element, i));
			}
		}

		return rows;
	}

	createNormalRow = ()=>{
		let rows = [];
		let numChildren = React.Children.count(this.props.children);
		let {
			displayCheckbox,
			setRowTotalCount
		} = this.props;
		let rowNumber = 0;
		React.Children.map(this.props.children, (child) => {
			rows.push(this.createRowElement(child, rowNumber++));
		});
		return rows;
	}

	renderRows = ()=> {

		let {
			ajax
		} = this.props;

		return ajax ? this.createAjaxRow() : this.createNormalRow();
	}


	isRowVisibility(rowNumber) {


		if (parseInt(this.props.visibilityRows[rowNumber])) {
			return true;
		}

		return false;
	}

	isRowSelected(rowNumber) {
		if (parseInt(this.props.selectedRows[rowNumber])) {
			return true;
		}
		return false;
	}


	render() {

		let {
			className,
			borderBodyStyle
		} = this.props;
        let styleBody={};
		if(borderBodyStyle){
			styleBody={
				borderBottom:'none'
			}
		}else{
			styleBody={
				borderBottom:"solid 1px #eee"
			}
		}

		return (
			<tbody  className={className} style={styleBody}>
			{this.renderRows()}
			{/*this.renderInsertElement()*/}
			</tbody>
		);

	}
}



/*
   <tbody className={className} onTouchTap={this.toggleInsertElement}>

*/
