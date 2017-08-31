import React from 'react';
import TableHeaderColumn from '../TableHeaderColumn';
import Checkbox from '../../Checkbox';

export default class TableHeader extends React.Component {

	static displayName = 'TableHeader';

	static propTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
    onSelectAll:React.PropTypes.func,
		displayCheckbox:React.PropTypes.bool,
		defaultValue:React.PropTypes.object,
		onSort:React.PropTypes.func,
		allRowsSelected:React.PropTypes.bool,
		hasBorder:React.PropTypes.bool
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

		let {onSelectAll,displayCheckbox,onCellClick,allRowsSelected,hasBorder} = this.props;

		if(!displayCheckbox){
			return null;
		}

		//return ( <TableHeaderColumn width={this.props.defaultValue.checkboxWidth}></TableHeaderColumn>);
		return ( <TableHeaderColumn width={this.props.defaultValue.checkboxWidth} hasBorder={hasBorder}> <Checkbox onCheck={onSelectAll} checked={allRowsSelected} /></TableHeaderColumn>);

	}


	createTableHeaderColumn(base,index){
		return React.cloneElement(
			base,
			{
				key:index,
				onSort:this.onSort,
				hasBorder:this.props.hasBorder
			}
		);
	}

	render() {

		let {className,children,hasBorder} = this.props;

		let tHeader = [];
		React.Children.forEach(children, (child,index) => {
			if (!React.isValidElement(child)) return;
			const {muiName,name,displayName} = child.type;

			if (displayName === 'TableHeaderColumn') {
				tHeader.push(this.createTableHeaderColumn(child,index)) ;
			}
		});


		var claName='';
		if(hasBorder){
			claName=className+' theadBorder'
		}else{
			claName=className
		}

		return (
			<thead className={claName}>
				<tr>
                  {this.renderCheckbox()}
			      {tHeader}
				</tr>
			</thead>
		);

	}
}
