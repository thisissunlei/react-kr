import React from 'react';
import TableHeaderColumn from '../TableHeaderColumn';

export default class TableHeader extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
        onSelectAll:React.PropTypes.func,
		displayCheckbox:React.PropTypes.bool,
		defaultValue:React.PropTypes.object,
		onSort:React.PropTypes.func,
	}


	constructor(props){
		super(props);

		this.onSort = this.onSort.bind(this);

		this.renderCheckbox = this.renderCheckbox.bind(this);
		this.createTableHeaderColumn = this.createTableHeaderColumn.bind(this);
	}


	onSort(name){
		const {onSort} = this.props;
		if(!name){
			return ;
		}
		onSort && onSort(name);
	}

	renderCheckbox(){

		let {onSelectAll,displayCheckbox} = this.props;

		if(!displayCheckbox){
			return null;
		}

		//return ( <TableHeaderColumn width={this.props.defaultValue.checkboxWidth}></TableHeaderColumn>);
		return ( <TableHeaderColumn width={this.props.defaultValue.checkboxWidth}><input type="checkbox" onTouchTap={onSelectAll}/> </TableHeaderColumn>);

	}


	createTableHeaderColumn(base,index){
		return React.cloneElement(
			base,
			{
				key:index,
				onSort:this.onSort
			}
		);
	}

	render() {

		let {className,children} = this.props;

		let tHeader = [];
		React.Children.forEach(children, (child,index) => {
			if (!React.isValidElement(child)) return;
			const {muiName,name} = child.type;

			if (name === 'TableHeaderColumn') {
				tHeader.push(this.createTableHeaderColumn(child,index));
			} 
		});

		return (
			<thead className={className}>
				<tr>
                  {this.renderCheckbox()}
			      {tHeader}	
				</tr>
			</thead>
		);

	}
}







