

import React from 'react';

import {Actions,Store} from 'kr/Redux';

import {

} from 'kr-ui';
import {Http} from 'kr/Utils';

import './index.less';
import './fixed-data-table.css';

import ReactDOM from 'react-dom';
import {
	Table,
	Column,
	Cell,
	ColumnGroup
} from 'fixed-data-table';

import {
	observer
} from 'mobx-react';

import State from './State';





@observer

export default class TableIndex extends React.Component{

	constructor(props,context){

		super(props, context);
		this.state = {
			
			
		
		}
	}


	componentDidMount() {
		
		
		
	}
	

	render(){
		const rows = [
		  ['a1', 'b1', 'c1'],
		  ['a2', 'b2', 'c2'],
		  ['a3', 'b3', 'c3'],
		  // .... and more
		];
		return(
			<div className="community-collect">
				{/*<Table
				    rowHeight={50}
				    rowsCount={rows.length}
				    width={5000}
				    height={5000}
				    headerHeight={50}
				    {...this.props}
				>
				    <ColumnGroup
			          fixed={true}
			          header={<Cell>Name</Cell>}>
			          <Column
			            fixed={true}
			            header={<Cell>First Name</Cell>}
			            cell={<Cell>First Name 1</Cell>}
			            width={150}
			          />
			          <Column
			            fixed={true}
			            header={<Cell>Last Name</Cell>}
			            cell={<Cell>Last Name 1</Cell>}
			            width={150}
			          />
			        </ColumnGroup>
			        <Column
				      header={<Cell>姓名</Cell>}
				      cell={<Cell>姓名123</Cell>}
				      width={100}
				      fixed={true}

				      
				    />
				    <Column
				      header={<Cell>年龄</Cell>}
				      cell={<Cell>11</Cell>}
				      width={100}
				      fixed = {true}
				      
				    />
				    <Column
				      header={<Cell>性别</Cell>}
				      cell={({rowIndex, ...props}) => (
				        <Cell {...props}>
				          女
				        </Cell>
				      )}
				      width={200}
				      
				    />
				  </Table>*/}

				  <Table
				    rowHeight={50}
				    rowsCount={rows.length}
				    width={5000}
				    height={5000}
				    headerHeight={50}>
				    <Column
				      header={<Cell>Col 1</Cell>}
				      cell={<Cell>Column 1 static content</Cell>}
				      width={500}
				      fixed={true}
				    />
				    <Column
				      header={<Cell>Col 2</Cell>}
				      cell={<Cell>Column 1 static content</Cell>}
				      width={500}
				      
				    />
				    <Column
				      header={<Cell>Col 3</Cell>}
				      cell={({rowIndex, ...props}) => (
				        <Cell {...props}>
				          Data for column 3: {rows[rowIndex][2]}
				        </Cell>
				      )}
				      width={500}
				    />
				  </Table>
			</div>

		);
	}
}




