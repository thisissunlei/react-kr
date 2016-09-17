import React from 'react';

import './index.less';

export default class Table extends React.Component {

	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		displayCheckbox: React.PropTypes.bool,
		style:React.PropTypes.object,
		toggleVisibility: React.PropTypes.string,
	}


	constructor(props){
		super(props);


		this.createTableHeader = this.createTableHeader.bind(this);
		this.createTableBody = this.createTableBody.bind(this);
		this.createTableFooter = this.createTableFooter.bind(this);
		this.setRowTotalCount = this.setRowTotalCount.bind(this);
		this.setVisibilityRow = this.setVisibilityRow.bind(this);

		this.onSelectAll = this.onSelectAll.bind(this);
		this.onRowClick = this.onRowClick.bind(this);


		this.totalRowCount = 0;
		this.state = {
			allRowsSelected:false,
			selectedRows:[],
			visibilityRows:[],
			totalRowCount:0
		}

	}

	componentDidMount(){
		var visibilityRows = new Array(this.totalRowCount+1).join(1).split('');

		//默认隐藏children
		let visibilityType = this.props.toggleVisibility; 

		if(visibilityType){
			if(visibilityType === 'odd'){
				visibilityRows.forEach(function(item,index){
					if(index%2 !== 0){
						visibilityRows[index] = 0;
					}
				});
			}else{
				visibilityRows.forEach(function(item,index){
					if(index%2 == 0){
						visibilityRows[index] = 0;
					}
				});
			}
		}

		this.setState({
			visibilityRows
		});
	}

	setVisibilityRow(rowNumber){
		var visibilityRows = this.state.visibilityRows;
			visibilityRows[rowNumber] = new Number(!!!parseInt(visibilityRows[rowNumber]));
			this.setState({
				visibilityRows
			});
	}

	setRowTotalCount(totalRowCount){
		this.totalRowCount = totalRowCount;
	}

	onRowClick(event,rowNumber){
		let {selectedRows} = this.state;
		if(parseInt(selectedRows[rowNumber])){
			selectedRows[rowNumber] = 0;
		}else{
			selectedRows[rowNumber] = 1;
		}

		this.setState({
			selectedRows:selectedRows
		});

		if(event.target.nodeName.toLowerCase() == 'input'){
			return ;
		}
		//显示子元素
		var vitibilityType = this.props.toggleVisibility;
		if(vitibilityType){
			if(vitibilityType === 'odd'){
				if(rowNumber%2 == 0){
					this.setVisibilityRow(rowNumber+1);
				}
			}else{
				if(rowNumber%2 != 0){
					this.setVisibilityRow(rowNumber-1);
				}

			}
		}

	}

	onSelectAll(){

		let {allRowsSelected} = this.state;
			allRowsSelected = !allRowsSelected;
		var tmp = [];
		if(allRowsSelected){
			tmp = new Array(this.totalRowCount+1).join(1).split('');
		}else{
			tmp = new Array(this.totalRowCount+1).join(0).split('');
		}

    	this.setState({
    		allRowsSelected:!this.state.allRowsSelected,
			selectedRows:tmp
    	});

		console.log('---tmp',this.state.selectedRows);
	}

	createTableHeader(base){

		return React.cloneElement(
			base,
			{
				displayCheckbox:this.props.displayCheckbox,
				onSelectAll: this.onSelectAll,
				allRowsSelected: this.state.allRowsSelected,
			}
		);


	}

	createTableBody(base){

		return React.cloneElement(
			base,
			{
				displayCheckbox:this.props.displayCheckbox,
				allRowsSelected: this.state.allRowsSelected,
				selectedRows:this.state.selectedRows,
				visibilityRows:this.state.visibilityRows,
				onRowClick:this.onRowClick,
				setRowTotalCount:this.setRowTotalCount,
			}
		);

	}

	createTableFooter(base){
		return React.cloneElement(
			base,
			{
				displayCheckbox:this.props.displayCheckbox,
				allRowsSelected: this.state.allRowsSelected,
			}
		);
	}

	render() {

		let {className,children,style} = this.props;

		let tHead;
		let tBody = [];
		let tFoot;

		React.Children.forEach(children, (child) => {
			if (!React.isValidElement(child)) return;
			const {muiName,name} = child.type;
			if (name === 'TableBody') {
				tBody = this.createTableBody(child);
			} else if (name === 'TableHeader') {
				tHead = this.createTableHeader(child);
			} else if (name === 'TableFooter') {
				tFoot = this.createTableFooter(child);
			}
		});

		return (
			<table className={"table "+className} style={style}>
				{tHead}
				{tBody}
				{tFoot}
			</table>
		);

	}


}







