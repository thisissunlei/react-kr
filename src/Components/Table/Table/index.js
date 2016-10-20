import React from 'react';
import Loading from '../../Loading';
import http from  'kr/Redux/Utils/fetch';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import _ from 'lodash';

import TableBody from '../TableBody';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';
import Notify from '../../Notify';

import './index.less';

export default class Table extends React.Component {

	static defaultProps = {
		page:1,
		pageSize:10,
		totalCount:20,
		pagination:true,
		loading:false,
		ajax:false,
		ajaxFieldListName:'items',
		displayCheckbox:true,
		footer:false,
	}

	static PropTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		displayCheckbox: React.PropTypes.bool,
		style:React.PropTypes.object,
		toggleVisibility: React.PropTypes.string,
		page: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number]),
		pageSize: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number]),
		pagination:React.PropTypes.bool,
		totalCount: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number]),
		loading:React.PropTypes.bool,
		ajax:React.PropTypes.bool,
		ajaxUrlName:React.PropTypes.string,
		ajaxParams:React.PropTypes.object,
		ajaxFieldListName:React.PropTypes.string,
		//tfoot
		footer:React.PropTypes.bool,

		//事件
		onExport:React.PropTypes.func,
		onSelectAll:React.PropTypes.func,
		onCellClick:React.PropTypes.func,
		onRowClick:React.PropTypes.func,
		onPageChange:React.PropTypes.func,
		onOperation:React.PropTypes.func,
		onLoaded:React.PropTypes.func,
	}

	constructor(props){

		super(props);

	   this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);

		this.createTableHeader = this.createTableHeader.bind(this);
		this.createTableBody = this.createTableBody.bind(this);
		this.createTableFooter = this.createTableFooter.bind(this);
		this.setVisibilityRow = this.setVisibilityRow.bind(this);

		this.onSort = this.onSort.bind(this);
		this.onSelectAll = this.onSelectAll.bind(this);
		this.onRowClick = this.onRowClick.bind(this);
		this.onExport = this.onExport.bind(this);
		this.onCellClick = this.onCellClick.bind(this);
		this.onPageChange = this.onPageChange.bind(this);
		this.onOperation = this.onOperation.bind(this);
		this.onLoaded = this.onLoaded.bind(this);

		this.onLoadData  = this.onLoadData.bind(this);


		this.renderTableHeader = this.renderTableHeader.bind(this);
		this.renderTableBody = this.renderTableBody.bind(this);
		this.renderTableFooter = this.renderTableFooter.bind(this);
		this.renderLoading = this.renderLoading.bind(this);
		this.renderNotListData = this.renderNotListData.bind(this);

		this.state = {
			response:{},
			page:this.props.page,
			pageSize:this.props.pageSize,
			totalCount:this.props.totalCount,
			listData:[],
			loading:this.props.loading,
			isLoaded:false,
			allRowsSelected:false,
			selectedRows:[],
			visibilityRows:[],
			defaultValue:{
				checkboxWidth:40
			}
		}
	}

	componentDidMount(){

	}


	componentWillReceiveProps(nextProps){

		if(!_.isEqual(this.props.ajaxParams,nextProps.ajaxParams)){
			this.setState({
				isLoaded:false
			});
			this.onLoadData(1,nextProps.ajaxParams);
		}

		if(nextProps.page != this.props.page){
			this.setState({
				page:nextProps.page
			});
		}

		if(nextProps.loading != this.props.loading){
			this.setState({
				loading:nextProps.loading
			});
		}

	}

	shouldComponentUpdate(nextProps,nextState){

		if(!_.isEqual(this.props.ajaxParams,nextProps.ajaxParams)){
			return true;
		}
		if(nextProps.page != this.props.page){
			return true;
		}
		if(nextProps.loading != this.props.loading){
			return true;
		}
		return false;
	}

	onSort(name){


		if(!name){
			return ;
		}

		let {listData} = this.state;

		//console.log("---->>>",listData);


		//listData = listData.splice(1,3);

		this.setState({
			listData
		});

		/*
		listData.sort(function(a,b){
			return a>b;
		});
		*/

	}

	onLoaded(){
		const {onLoaded} = this.props;
		onLoaded && onLoaded(this.state.response);
	}



	onOperation(type,itemData){
		const {onOperation}  = this.props;
		onOperation && onOperation(type,itemData);
	}

	onPageChange(page){

		const {onPageChange} = this.props;

		onPageChange && onPageChange(page);
		this.onLoadData(page);
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


	onLoadData(page=1,ajaxParams=this.props.ajaxParams){

		if(!this.props.ajax){
			return ;
		}

		this.setState({
			loading:true
		});


		var {ajaxUrlName} = this.props;

		ajaxParams.page = page;

		var _this = this;

		http.request(ajaxUrlName,ajaxParams).then(function(response){
			_this.setState({
				response:response,
				listData:response[_this.props.ajaxFieldListName],
				page:response.page,
				pageSize:response.pageSize,
				totalCount:response.totalCount,
				isLoaded:true,
			});
			_this.onLoaded();
		}).catch(function(err){
			_this.onLoaded();
			_this.setState({
				isLoaded:true
			});
			Notify.show([{
				message:err.message,
				type: 'error',
			}]);
		});

		window.setTimeout(function(){
			_this.setState({
				loading:false
			});
		},2000);

	}

	componentDidMount(){

		this.onLoadData();

		var visibilityRows = new Array(this.state.pageSize+1).join(1).split('');

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
			tmp = new Array(this.state.pageSize+1).join(1).split('');
		}else{
			tmp = new Array(this.state.pageSize+1).join(0).split('');
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
				defaultValue:this.state.defaultValue,
				onSort:this.onSort
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
				onOperation:this.onOperation,
				defaultValue:this.state.defaultValue,
				listData:this.state.listData,
				ajax:this.props.ajax,
			}
		);

	}

	createTableFooter(base){

		let {pagination,footer} = this.props;

		if(pagination || footer){
			footer = true;
		}

		let props = {
				displayCheckbox:this.props.displayCheckbox,
				allRowsSelected: this.state.allRowsSelected,
				defaultValue:this.state.defaultValue,
				page:this.state.page,
				pageSize:this.state.pageSize,
				pagination:this.props.pagination,
				totalCount:this.state.totalCount,
				onPageChange:this.onPageChange,
				footer:footer
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


	renderTableHeader(){
		let {className,children,style} = this.props;
		let tHead;
		React.Children.forEach(children, (child) => {
			if (!React.isValidElement(child)) return;
			const {muiName,name} = child.type;
			if (name === 'TableHeader') {
				tHead = this.createTableHeader(child);
			} 
		});

		return tHead;
	}


	renderNotListData(){

		let {className,children,style} = this.props;

		return(
			<table className={"table "+className} style={style}>
				{this.renderTableHeader()}
				<tbody>
					<tr>
						<TableRowColumn colSpan={100} >
							<div style={{textAlign:'center',paddingTop:100,paddingBottom:100}}>
								暂无数据
							</div>
						</TableRowColumn>
					</tr>
				</tbody>
			</table>
		);

	}

	renderTableBody(){

		let {className,children,style} = this.props;

		let tBody;

		React.Children.forEach(children, (child) => {
			if (!React.isValidElement(child)) return;
			const {muiName,name} = child.type;
			if (name === 'TableBody') {
				tBody = this.createTableBody(child);
			} 
		});

		return tBody;
	}

	renderTableFooter(){

		let {className,children,style} = this.props;
		let tFoot;

		React.Children.forEach(children, (child) => {
			if (!React.isValidElement(child)) return;
			const {muiName,name} = child.type;
			if (name === 'TableFooter') {
				tFoot = this.createTableFooter(child);
			}
		});

		return tFoot;

	}

	renderLoading(){
		let {className,children,style} = this.props;

		return(
			<table className={"table "+className} style={style}>
				{this.renderTableHeader()}
				<tbody>
					<tr>
						<TableRowColumn colSpan={100} >
							<div style={{textAlign:'center',paddingTop:50,paddingBottom:50}}>
									<Loading />
							</div>
						</TableRowColumn>
					</tr>
				</tbody>
				{/*
				{this.renderTableFooter()}
				*/}
			</table>
		);
	}

	render() {

		let {className,children,style,ajax} = this.props;
		let {listData,loading} = this.state;

		if(loading){
			return this.renderLoading();
		}

		if(ajax && !listData.length){
			return this.renderNotListData();
		}



		return (
			<table className={"table "+className} style={style}>
				{this.renderTableHeader()}
				{this.renderTableBody()}
				{this.renderTableFooter()}
			</table>
		);

	}


}





