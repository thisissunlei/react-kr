

import React from 'react';

import {Actions,Store} from 'kr/Redux';

import {

} from 'kr-ui';
import {Http} from 'kr/Utils';
import $ from "jquery";

import './index.less';
import './fixed-data-table.css';


import ReactDOM from 'react-dom';

import FixedDataTable from 'fixed-data-table';
const {Table, Column, Cell,ColumnGroup} = FixedDataTable;
// import {
// 	Table,
// 	Column,
// 	Cell,
// 	ColumnGroup
// } from 'fixed-data-table';


import {
	observer
} from 'mobx-react';

import State from './State';

@observer

export default class TableIndex extends React.Component{

	constructor(props,context){

		super(props, context);
		this.state = {
			isFixed:false
		
		}
	}


	componentDidMount() {
		// $(document).ready(function(){  
		    

		// });
		 	$('.fixedDataTableCellLayout_main').eq(0).unbind("scroll").bind("scroll", function(e){
				console.log("this.scrrollLeft",this.scrrollLeft);
			
		 	}); 
		
	}

		

	render(){
		const rows = [
		  ['a1', 'b1', 'c1'],
		  ['a2', 'b2', 'c2'],
		  ['a3', 'b3', 'c3'],
		  ['a3', 'b3', 'c3'],
		  ['a3', 'b3', 'c3'],
		  ['a3', 'b3', 'c3'],
		  ['a3', 'b3', 'c3']
		  // .... and more
		];
		let {isFixed} = this.state;
		return(
			<div className="table-box">

				  <Table
				    rowHeight={70}
				    rowsCount={rows.length}
				    width={900}
				    maxHeight={550}
				     groupHeaderHeight={30}
				    headerHeight={50}
				    {...this.props}>

				 
				     <ColumnGroup
			          fixed={true}
			          header={<Cell>Name</Cell>}>
			          <Column
			            fixed={true}
			            header={<Cell>First Name</Cell>}
			            cell={<Cell>Last Name</Cell>}
			            width={150}
			          />
			          <Column
			            fixed={true}
			            header={<Cell>Last Name</Cell>}
			            cell={<Cell>Last Name</Cell>}
			            width={150}
			          />
        			</ColumnGroup>
				     <ColumnGroup
			          
			          header={<Cell>Name</Cell>}>
			          <Column
			            
			            header={<Cell>First Name</Cell>}
			            cell={<Cell>Last Name</Cell>}
			            width={150}
			          />
			          <Column
			            
			            header={<Cell>Last Name</Cell>}
			            cell={<Cell>111</Cell>}
			            width={150}
			          />
        			</ColumnGroup>
        			 {/*<ColumnGroup
        			 			          
        			 			          cell={<Cell>222</Cell>}
        			 			          width={450}
        			 			         >*/}
			          <Column
			            header={<Cell>First 12313Name</Cell>}
			            cell={<Cell>232</Cell>}
			            width={250}
			          />
			          <Column
			            header={<Cell>Last 123123Name</Cell>}
			            cell={<Cell>Last Name</Cell>}
			            width={200}
			          />
        			{/*</ColumnGroup>*/}

				  </Table>


			</div>

		);
	}
}




