import React from 'react';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRowColumn from '../TableRowColumn';

import Pagination from '../../Pagination';

import {Button} from 'kr-ui/Button';


import './index.less';

export default class TableFooter extends React.Component {


	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		page: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number]),
		pageSize: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number]),
		totalCount: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number]),
		displayCheckbox:React.PropTypes.bool,
		pagination:React.PropTypes.bool,

        onSelectAll:React.PropTypes.func,
		onExport:React.PropTypes.func,
		onPageChange:React.PropTypes.func,
	}


	constructor(props){
		super(props);

		this.onExport = this.onExport.bind(this);
		this.onPageChange = this.onPageChange.bind(this);
		this.onSelectAll = this.onSelectAll.bind(this);

		this.renderCheckbox = this.renderCheckbox.bind(this);
		this.renderPagination = this.renderPagination.bind(this);

	}

	onSelectAll(){
		const {onSelectAll} = this.props;
		onSelectAll && onSelectAll();
	}

	onExport(){
		const {onExport} = this.props;
		onExport && onExport();
	}

	onPageChange(page){
		const {onPageChange} = this.props;
		onPageChange && onPageChange(page);
	}


	renderCheckbox(){

		let {displayCheckbox} = this.props;

		if(!displayCheckbox){
			return null;
		}

		return ( <TableRowColumn width={this.props.defaultValue.checkboxWidth}><input type="checkbox" onTouchTap={this.onSelectAll}/></TableRowColumn>);

	}


	renderPagination(){

		let {pagination,totalCount,page,pageSize} = this.props;

		if(!pagination){
			return null;
		}
		return (
			<Pagination totalCount={totalCount} page={page} pageSize={pageSize} onPageChange={this.onPageChange}/>
		);
	}

	render() {

		let {className,children,totalCount,page,pageSize,footer} = this.props;

		if(!footer){
			return null;
		}

		return (
			<tfoot className="tfoot">
				<tr>
				{/*
                  {this.renderCheckbox()}
				*/}
				  <TableRowColumn style={{textAlign:'left'}} colSpan={2}> <Button label="导出" primary={true} type="button" onTouchTap={this.onExport}/> </TableRowColumn>
				<TableRowColumn style={{textAlign:'left'}} colSpan={5}>
						{this.renderPagination()}
					</TableRowColumn>
				</tr>
			</tfoot>
		);

	}
}




