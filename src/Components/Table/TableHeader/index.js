import React from 'react';
import TableHeaderColumn from '../TableHeaderColumn';

export default class TableHeader extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
        onSelectAll:React.PropTypes.func,
		displayCheckbox:React.PropTypes.bool
	}


	constructor(props){
		super(props);

		this.renderCheckbox = this.renderCheckbox.bind(this);
	}


	renderCheckbox(){

		let {onSelectAll,displayCheckbox} = this.props;

		if(!displayCheckbox){
			return null;
		}

		return ( <TableHeaderColumn><input type="checkbox" onTouchTap={onSelectAll}/> </TableHeaderColumn>);

	}


	render() {

		let {className,children} = this.props;


		return (
			<thead className={className}>
				<tr>
                  {this.renderCheckbox()}
			      {children}	
				</tr>
			</thead>
		);

	}
}







