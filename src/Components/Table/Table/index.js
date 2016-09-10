import React from 'react';

import './index.less';

export default class Table extends React.Component {

	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		displayCheckbox: React.PropTypes.bool
	}

	 static childContextTypes = {
         displayCheckbox: React.PropTypes.bool,
         selectAllSelected: React.PropTypes.bool,
         selectAll:React.PropTypes.func
    }

	constructor(props){
		super(props);

		this.selectAll = this.selectAll.bind(this);


		this.state = {
			selectAllSelected:false,
		}

	}

	  getChildContext() {

	 	let {displayCheckbox} = this.props;
	 	let {selectAllSelected} = this.state;
	 	let selectAll = this.selectAll;

         return {
             displayCheckbox: !!displayCheckbox,
             selectAllSelected:!!selectAllSelected,
             selectAll:selectAll
         }

    }


	
    selectAll(){
    	console.log('----->>>');
    	this.setState({
    		selectAllSelected:!!!this.state.selectAllSelected
    	});
    }

   


	render() {

		let {className,children} = this.props;

		return (
			<table className={"table-bordered "+className}>
				{children}	
			</table>
		);

	}


}







