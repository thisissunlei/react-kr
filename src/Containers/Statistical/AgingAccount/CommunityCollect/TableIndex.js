

import React from 'react';


import {Actions,Store} from 'kr/Redux';

import {
	Message,
	KrField,

} from 'kr-ui';
import {Http} from 'kr/Utils';

import './index.less';

import ReactDOM from 'react-dom';
import {Table, Column, Cell,ColumnGroup} from 'fixed-data-table';

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
				<Table
				    rowHeight={50}
				    rowsCount={rows.length}
				    width={5000}
				    height={5000}
				    headerHeight={50}>
				    <Column
				      header={<Cell>姓名</Cell>}
				      cell={<Cell>谭琳琳</Cell>}
				      width={2000}
				    />
				    <Column
				      header={<Cell>年龄</Cell>}
				      cell={<Cell>11</Cell>}
				      width={1000}
				    />
				    <Column
				      header={<Cell>性别</Cell>}
				      cell={({rowIndex, ...props}) => (
				        <Cell {...props}>
				          女
				        </Cell>
				      )}
				      width={2000}
				    />
				  </Table>
			</div>

		);
	}
}




