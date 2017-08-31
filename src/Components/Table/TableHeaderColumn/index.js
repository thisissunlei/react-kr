import React from 'react';

export default class TableHeaderColumn extends React.Component {

	static displayName = 'TableHeaderColumn';

	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.string,
		name:React.PropTypes.string,
		onSort:React.PropTypes.func,
		onCellClick:React.PropTypes.func,
		hasBorder:React.PropTypes.bool
	}

	constructor(props){
		super(props);
		this.onSort = this.onSort.bind(this);
		this.onCellClick =  this.onCellClick.bind(this);
	}

	onCellClick(){

		const {onCellClick,name} = this.props;
		onCellClick && onCellClick();
		this.onSort();
	}

	onSort(){

		const {onSort,name} = this.props;

		if(!name){
			return ;
		}

		onSort && onSort(name);
	}

	render() {

		let {className,children,hasBorder,...other} = this.props;

	  var claName='';
		if(hasBorder){
			claName=className+' thBorder'
		}else{
			claName=className
		}

		return (
			<th  className={claName} onClick={this.onCellClick} {...other}>
				{children}
			</th>
		);

	}
}
