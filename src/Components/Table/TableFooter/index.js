import React from 'react';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRowColumn from '../TableRowColumn';

import {Button} from 'kr-ui/Button';


import './index.less';

export default class TableFooter extends React.Component {


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

		return ( <TableRowColumn width={this.props.defaultValue.checkboxWidth}><input type="checkbox" onTouchTap={onSelectAll}/></TableRowColumn>);

	}


	render() {

		let {className,children} = this.props;

		return (
			<tfoot className="tfoot">
				<tr>
                  {this.renderCheckbox()}
				  <TableRowColumn style={{textAlign:'left'}}> <Button label="导出" primary={true}/> </TableRowColumn>
				</tr>
			</tfoot>
		);

	}
}




