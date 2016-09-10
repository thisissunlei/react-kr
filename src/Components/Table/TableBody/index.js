import React from 'react';

import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';

export default class TableBody extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		insertElement:React.PropTypes.node,
	}

	static contextTypes = {
         displayCheckbox: React.PropTypes.bool,
     }

	
	constructor(props,context){
		super(props,context);

		this.toggleInsertElement = this.toggleInsertElement.bind(this);
		this.state = {
			showInsertElement:false
		}
	}

	toggleInsertElement(){
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


	render() {

		let {className,children} = this.props;


		return (
			<tbody className={className} onTouchTap={this.toggleInsertElement}>
				{children}	
				{this.renderInsertElement()}
			</tbody>

		);

	}
}







