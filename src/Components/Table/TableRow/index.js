import React from 'react';
import Button from '../../Button';
import './index.less';

export default class TableRow extends React.Component {

	static displayName = 'TableRow';

	static propTypes = {
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
		onOperation:React.PropTypes.func
	}

	constructor(props){
		super(props);
	}

	onCellClick = (event) =>{
		this.onRowClick(event);
	}

	onCellHover =()=>{

	}

	onOperation = (event)=>{
		const {onOperation}  = this.props;
		let type = '';

		try{
		   type = event.target.getAttribute('data-operation');
		}catch(err){
		}
		onOperation && onOperation(type,this.props.itemData);
	}

	onCellHoverExit = () =>{

	}

	onRowHover =()=>{

	}

	onRowHoverExit =()=>{

	}

	onRowClick = (event)=>{
		if (this.props.onRowClick) {
			this.props.onRowClick(event, this.props.rowNumber);
		}
	}


	componentWillReceiveProps(nextProps,nextContext){

	}

	componentWillUpdate(nextProps,nextState,nextContext){

	}

	createRowColumn = (basic,columnNumber,rowNumber)=>{

		const {itemData} = this.props;
		let {name,actions} = basic.props;
		let value = '';

		if(name && itemData && itemData.hasOwnProperty(name)){
			value = itemData[name];
			value = value.toString();
		}
		var _this = this;
		let children = React.Children.map(basic.props.children,function(child,index){
			if (React.isValidElement(child)) {
				let {operation} = child.props;
				if(operation){
					return React.cloneElement(child,{
						onClick:_this.onOperation,
						'data-operation':operation,
						'data-row':rowNumber
					});
				}
				
				return React.cloneElement(child);
			}else{
				return child;
			}
		});

		return React.cloneElement(basic, {
			columnNumber: columnNumber,
			hoverable: this.props.hoverable,
			key: `${this.props.rowNumber}-${columnNumber}`,
			onCellClick: this.onCellClick,
			onHover: this.onCellHover,
			onHoverExit: this.onCellHoverExit,
			value,
			itemData,
		},children);
	}

	renderRow = ()=>{

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
				return this.createRowColumn(child,columnNumber,rowNumber);
			}
		});

		return rowColumns;
	}


	render() {

		const {
			className,
			visibility,
			isHover,
			...other,
		} = this.props;

		if(isHover){
          className=className+' hover';
		}

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
