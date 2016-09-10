import React from 'react';
import TableHeaderColumn from '../TableHeaderColumn';

export default class TableHeader extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
	}

	 static contextTypes = {
         displayCheckbox: React.PropTypes.bool,
         selectAll:React.PropTypes.func
     }
	

	constructor(props){
		super(props);

		this.renderCheckbox = this.renderCheckbox.bind(this);
		this.selectAllStart = this.selectAllStart.bind(this);

	}

	selectAllStart(){

       this.context.selectAll();

	}

	renderCheckbox(){

		let {displayCheckbox} = this.context;

		if(!displayCheckbox){
			return null;
		}

		return (
				<TableHeaderColumn><input type="checkbox" onTouchTap={this.selectAllStart}/> </TableHeaderColumn>
			);

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







