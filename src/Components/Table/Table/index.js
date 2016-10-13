import React from 'react';

import './index.less';

export default class Table extends React.Component {

	static defaultProps = {
		page:1,
		pageSize:10,
		totalCount:100,
	}

	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		displayCheckbox: React.PropTypes.bool,
		style:React.PropTypes.object,
		toggleVisibility: React.PropTypes.string,
		page:React.PropTypes.number,
		pageSize:React.PropTypes.number,
		totalCount:React.PropTypes.number,

		//事件
		onExport:React.PropTypes.func,
		onSelectAll:React.PropTypes.func,
		onCellClick:React.PropTypes.func,
		onRowClick:React.PropTypes.func,
	}

	constructor(props){

		super(props);

		this.createTableHeader = this.createTableHeader.bind(this);
		this.createTableBody = this.createTableBody.bind(this);
		this.createTableFooter = this.createTableFooter.bind(this);
		this.setVisibilityRow = this.setVisibilityRow.bind(this);

		this.onSelectAll = this.onSelectAll.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.onExport = this.onExport.bind(this);
		this.onCellClick = this.onCellClick.bind(this);

		this.state = {
			allRowsSelected:false,
			selectedRows:[],
			visibilityRows:[],
			defaultValue:{
				checkboxWidth:40
			}
		}

	}

	onCellClick(){

	}

	onExport(){

		let {selectedRows,visibilityRows}  = this.state;

		//console.log('selectedRows',this.state.selectedRows,'visibilityRows',this.state.visibilityRows);
		var result = [];

		visibilityRows.forEach(function(item,index){
			if(item && selectedRows[index]){
				result.push(index);
			}
		});

		console.log(result);

	}

	componentDidMount(){

		var visibilityRows = new Array(this.props.pageSize+1).join(1).split('');

		//默认隐藏children
		let visibilityType = this.props.toggleVisibility||''; 

		switch(visibilityType){
			case 'odd':{
				visibilityRows.forEach(function(item,index){
					if(index%2 !== 0){
						visibilityRows[index] = 0;
					}
				});
				break;
			}

			case 'event':{
				visibilityRows.forEach(function(item,index){
					if(index%2 == 0){
						visibilityRows[index] = 0;
					}
				});
				break;
			}

			default:{
				visibilityRows.forEach(function(item,index){
					visibilityRows[index] = 1;
				});
				break;
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
			tmp = new Array(this.props.pageSize+1).join(1).split('');
		}else{
			tmp = new Array(this.props.pageSize+1).join(0).split('');
		}

    	this.setState({
    		allRowsSelected:!this.state.allRowsSelected,
			selectedRows:tmp
    	});

	}

	createTableHeader(base){

		return React.cloneElement(
			base,
			{
				displayCheckbox:this.props.displayCheckbox,
				onSelectAll: this.onSelectAll,
				defaultValue:this.state.defaultValue
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
				defaultValue:this.state.defaultValue
			}
		);

	}

	createTableFooter(base){

		let props = {
				displayCheckbox:this.props.displayCheckbox,
				allRowsSelected: this.state.allRowsSelected,
				defaultValue:this.state.defaultValue,
				page:this.props.page,
				pageSize:this.props.pageSize,
				totalCount:this.props.totalCount,
		}

		let handlers = {
				onSelectAll: this.onSelectAll,
				onExport:this.onExport
		}

		return React.cloneElement(
			base,
			{
				...props,
				...handlers
			}
		);
	}

	render() {

		let {className,children,style} = this.props;

		let tHead;
		let tBody;
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

		let numChildren = React.Children.count(tBody);

		return (
			<table className={"table "+className} style={style}>
				{tHead}
				{tBody}
				{tFoot}
			</table>
		);

	}


}





