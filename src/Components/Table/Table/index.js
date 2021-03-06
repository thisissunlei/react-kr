import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { ShallowEqual,Http,ajax } from 'kr/Utils';

import Loading from '../../Loading';
import TableBody from '../TableBody';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';
import Notify from '../../Notify';

import './index.less';
export default class Table extends React.Component {

	static displayName = 'Table';
	static defaultProps = {
		page: 1,
		pageSize: 15,
		totalCount: 20,
		pagination: true,
		loading: false,
		ajax: false,
		ajaxFieldListName: 'items',
		displayCheckbox: true,
		footer: false,
		exportSwitch: false,
		defaultSelectedRows: [],
		fold: false,
		foldSize: 10,
		foldOpen: false,
		ajaxType:false,
	}

	static propTypes = {
		className: React.PropTypes.string,
		children: React.PropTypes.node,
		displayCheckbox: React.PropTypes.bool,
		style: React.PropTypes.object,
		toggleVisibility: React.PropTypes.string,
		exportSwitch: React.PropTypes.bool,
		page: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		pageSize: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		pagination: React.PropTypes.bool,
		totalCount: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
		loading: React.PropTypes.bool,
		ajax: React.PropTypes.bool,
		ajaxUrlName: React.PropTypes.string,
		ajaxParams: React.PropTypes.object,
		ajaxFieldListName: React.PropTypes.string,
		//tfoot
		footer: React.PropTypes.bool,
		defaultSelectedRows: React.PropTypes.array,

		//事件
		onExport: React.PropTypes.func,
		onSelectAll: React.PropTypes.func,
		onCellClick: React.PropTypes.func,
		onRowClick: React.PropTypes.func,
		onPageChange: React.PropTypes.func,
		onOperation: React.PropTypes.func,
		onLoaded: React.PropTypes.func,
		onSelect: React.PropTypes.func,
		onProcessData: React.PropTypes.func,

		fold: React.PropTypes.bool,
		foldSize: React.PropTypes.any,
		foldOpen: React.PropTypes.bool,
		onFold: React.PropTypes.func,

		//边框
		hasBorder:React.PropTypes.bool
	}

	constructor(props) {

		super(props);


		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);


		this.state = {
			response: {},
			page: this.props.page,
			pageSize: this.props.pageSize,
			totalCount: this.props.totalCount,
			listData: [],
			loading: this.props.loading,
			isLoaded: false,
			allRowsSelected: false,
			selectedRows: [],
			visibilityRows: [],
			fold: false,
			foldOpen: this.props.foldOpen,
			defaultValue: {
				checkboxWidth: 50
			}
		}

		this.maxRows = 1000;
		this.exportRows = [];
		this.exportData = [];

		let {
			initialValues
		} = this.props;


		if (initialValues) {
			this.onInitial(initialValues);
		}

	}

	componentWillReceiveProps(nextProps) {
		
		if (!ShallowEqual(this.props.ajaxParams, nextProps.ajaxParams)) {
			this.setState({
				isLoaded: false
			});

			var page = nextProps.ajaxParams.page || 1;

			this.onLoadData(page, nextProps.ajaxParams);
		}

		if (nextProps.page != this.props.page) {

			this.setState({
				page: nextProps.page
			});
		}

		if (nextProps.loading != this.props.loading) {

			this.setState({
				loading: nextProps.loading
			});

		//	this.onLoadData(1, nextProps.ajaxParams);
		}


		if (!ShallowEqual(this.props.initialValues, nextProps.initialValues)) {

			this.onInitial(nextProps.initialValues);
		}

	}

	shouldComponentUpdate(nextProps, nextState) {

		if (!ShallowEqual(this.props.ajaxParams, nextProps.ajaxParams)) {
			return true;
		}
		if (nextProps.page != this.props.page) {
			return true;
		}
		if (nextProps.loading != this.props.loading) {
			return true;
		}
		return false;
	}

	onSort = (name)=> {
		if (!name) {
			return;
		}

		let { listData } = this.state;
		this.setState({
			listData
		});
	}

	onProcessData=(state)=> {
		let {
			onProcessData
		} = this.props;

		if (onProcessData) {
			state = onProcessData(state);
		}

		return state;
	}

	onInitial = (state) => {
			if(!state.response){
				return
			}
			state = Object.assign({},state);

		let {
			defaultSelectedRows
		} = this.props;
		if(state.response.items){
			for(var i=0;i<state.response.items.length;i++){
				state.response.items[i].identifier=i+1;
			}
		}

		state.selectedRows = defaultSelectedRows;

		state = this.onProcessData(state);
		this.setState(state, function() {
			this.onLoaded();
		});

	}

	onLoaded = ()=> {
		const {
			onLoaded
		} = this.props;

		onLoaded && onLoaded(this.state.response);
	}


	onOperation=(type, itemData,event)=> {
		const {
			onOperation
		} = this.props;
		onOperation && onOperation(type, itemData);
		this.tableRowColumnClick(event);

	}


	tableRowColumnClick=(event)=>{

		var targetDom = event.target;
		this.findDomTd(targetDom);

	}

	findDomTd =(targetDom)=>{


		if(targetDom.nodeName.toLowerCase()=="td"){


			var trDom = targetDom.parentNode;
			var otherTr = trDom.nextSibling;
			var preOtherTr = trDom.previousSibling;
			this.resetTrColor(otherTr,"next");
			this.resetTrColor(preOtherTr,"pre");
			trDom.style.background ="#c9e0f6";

		}else{
			var newTargetDom = targetDom.parentNode
			this.findDomTd(newTargetDom);
		}
	}


	resetTrColor=(otherTr,strParam)=>{

		if(!otherTr){
			return;
		}
		otherTr.style.background ="";
		// console.log("otherTr",otherTr,"strParam",strParam)
		if(strParam=="next"){
			var newOtherTr = otherTr.nextSibling;
		}else{
			var newOtherTr = otherTr.previousSibling;
		}
		this.resetTrColor(newOtherTr,strParam);
	}


	onPageChange=(page)=> {


		const {
			onPageChange
		} = this.props;

		onPageChange && onPageChange(page);
		this.onLoadData(page);
	}

	onCellClick=() =>{

	}


	onExport = () =>{

		let {
			selectedRows,
			visibilityRows,
			listData,
		} = this.state;


		let {
			onExport
		} = this.props;

		var exportRows = [];
		var exportData = [];


		listData = listData.filter(function(item, index) {
			return !(typeof item === 'undefined');
		});


		visibilityRows.forEach(function(item, index) {
			if (item && parseInt(selectedRows[index])) {
				exportRows.push(index);
			}
		});


		exportRows.forEach(function(item, index) {
			if (listData[item]) {
				exportData.push(listData[item]);
			}
		});
		this.exportRows = exportRows;
		this.exportData = exportData;
		onExport && onExport(exportData, exportRows);

	}


	onLoadData = (page = 1, ajaxParams = this.props.ajaxParams)=> {
		ajaxParams = Object.assign({}, ajaxParams);

		if (!this.props.ajax) {
			return;
		}

		this.setState({
			loading: true
		});


		var {
			ajaxUrlName,
			ajaxType
		} = this.props;

		ajaxParams.page = page;

		var _this = this;

		if(ajaxType){
			
			ajax.get(ajaxUrlName, ajaxParams).then(function(response) {
				
				_this.onInitial({
					response: response,
					listData: response[_this.props.ajaxFieldListName],
					page: response.page,
					pageSize: response.pageSize,
					totalCount: response.totalCount,
					isLoaded: true,
					loading: false,
					allRowsSelected: false
				});
	
			}).catch(function(err) {
			console.log("请求失败一次",err);
				_this.onInitial({
					isLoaded: true,
					loading: false,
					allRowsSelected: false,
				});
				// Notify.show([{
				// 	message: err.message,
				// 	type: 'error',
				// }]);
			});
		}else{
			Http.request(ajaxUrlName, ajaxParams).then(function(response) {

				_this.onInitial({
					response: response,
					listData: response[_this.props.ajaxFieldListName],
					page: response.page,
					pageSize: response.pageSize,
					totalCount: response.totalCount,
					isLoaded: true,
					loading: false,
					allRowsSelected: false
				});
	
			}).catch(function(err) {
			console.log("请求失败一次2",err);
				_this.onInitial({
					isLoaded: true,
					loading: false,
					allRowsSelected: false
				});
	
				// Notify.show([{
				// 	message: err.message,
				// 	type: 'error',
				// }]);
	
			});
		}
	

	}

	onFold = () => {

		const {
			onFold,
			foldSize
		} = this.props;

		var {
			visibilityRows
		} = this.state;

		var foldOpen = !this.state.foldOpen;
		visibilityRows = visibilityRows.toString().replace(/,/gi, '');

		if (foldOpen) {
			visibilityRows = visibilityRows.substr(0, foldSize) + visibilityRows.substr(foldSize + 1, visibilityRows.length).replace(/0/gi, 1);
		} else {
			visibilityRows = visibilityRows.substr(0, foldSize) + visibilityRows.substr(foldSize + 1, visibilityRows.length).replace(/1/gi, 0);
		}

		visibilityRows = visibilityRows.split('');

		this.setState({
			foldOpen,
			visibilityRows
		}, function() {
			onFold && onFold();
		});
	}

	componentDidMount() {

		this.onLoadData();

		const {
			foldOpen,
			fold,
			foldSize
		} = this.props;


		var visibilityRows = new Array(this.maxRows + 1).join(1);

		if (fold) {
			visibilityRows = (new Array(foldSize + 1)).join(1) + (new Array(Number(this.maxRows) - Number(foldSize + 1))).join(0);
		}

		visibilityRows = visibilityRows.split('');

		//默认隐藏children
		let visibilityType = this.props.toggleVisibility || '';

		switch (visibilityType) {
			case 'odd':
				{
					visibilityRows.forEach(function(item, index) {
						if (index % 2 !== 0) {
							visibilityRows[index] = 0;
						}
					});
					break;
				}

			case 'event':
				{
					visibilityRows.forEach(function(item, index) {
						if (index % 2 == 0) {
							visibilityRows[index] = 0;
						}
					});
					break;
				}

			default:
				{
					/*
					visibilityRows.forEach(function(item, index) {
						visibilityRows[index] = 1;
					});
					break;
					*/
				}
		}

		this.setState({
			visibilityRows
		});

	}

	setVisibilityRow = (rowNumber)=> {
		var visibilityRows = this.state.visibilityRows;
		visibilityRows[rowNumber] = new Number(!!!parseInt(visibilityRows[rowNumber]));
		this.setState({
			visibilityRows
		});
	}


	onRowClick = (event, rowNumber)=> {
		let {
			selectedRows
		} = this.state;

		selectedRows = (new Array()).concat(selectedRows);


		if (parseInt(selectedRows[rowNumber])) {
			selectedRows[rowNumber] = 0;
		} else {
			selectedRows[rowNumber] = 1;
		}

		this.setState({
			selectedRows: selectedRows
		}, function() {
			this.onSelect();
		});

		if (event && event.hasOwnProperty('target') && event.target.nodeName.toLowerCase() == 'input') {
			return;
		}
		//显示子元素
		var vitibilityType = this.props.toggleVisibility;
		if (vitibilityType) {
			if (vitibilityType === 'odd') {
				if (rowNumber % 2 == 0) {
					this.setVisibilityRow(rowNumber + 1);
				}
			} else {
				if (rowNumber % 2 != 0) {
					this.setVisibilityRow(rowNumber - 1);
				}
			}
		}
	}

	onSelect = () =>{

		let {
			selectedRows,
			visibilityRows,
			listData
		} = this.state;

		var allRowsSelected = true;
		var result = [];
		visibilityRows.forEach(function(item, index) {
			if (item && parseInt(selectedRows[index])) {
				result.push(index);
			} else {
				allRowsSelected = false;
			}
		});

		const {
			onSelect
		} = this.props;

		var selectedListData = listData.filter(function(item,index){
					return result.indexOf(index) !== -1;
		});

		onSelect && onSelect(result,selectedListData);

		this.setState({
			allRowsSelected
		});

	}

	onSelectAll = ()=> {

		let {
			allRowsSelected
		} = this.state;
		allRowsSelected = !allRowsSelected;
		var tmp = [];
		if (allRowsSelected) {
			tmp = new Array(this.maxRows + 1).join(1).split('');
		} else {
			tmp = new Array(this.maxRows + 1).join(0).split('');
		}

		this.setState({
			allRowsSelected: !this.state.allRowsSelected,
			selectedRows: tmp,
		});

		var _this = this;
		window.setTimeout(function() {
			_this.onSelect();
		}, 0);
	}

	createTableHeader =(base)=> {

		return React.cloneElement(
			base, {
				displayCheckbox: this.props.displayCheckbox,
				onSelectAll: this.onSelectAll,
				defaultValue: this.state.defaultValue,
				onSort: this.onSort,
				allRowsSelected: this.state.allRowsSelected,
				hasBorder:this.props.hasBorder
			}
		);
	}

	createTableBody = (base)=> {

		return React.cloneElement(
			base, {
				displayCheckbox: this.props.displayCheckbox,
				allRowsSelected: this.state.allRowsSelected,
				selectedRows: this.state.selectedRows,
				visibilityRows: this.state.visibilityRows,
				onRowClick: this.onRowClick,
				onOperation: this.onOperation,
				defaultValue: this.state.defaultValue,
				listData: this.state.listData,
				ajax: this.props.ajax,
				hasBorder:this.props.hasBorder
			}
		);

	}

	createTableFooter = (base)=> {

		let {
			pagination,
			footer
		} = this.props;

		if (pagination || footer) {
			footer = true;
		}

		let props = {
			displayCheckbox: this.props.displayCheckbox,
			allRowsSelected: this.state.allRowsSelected,
			defaultValue: this.state.defaultValue,
			page: this.state.page,
			pageSize: this.state.pageSize,
			pagination: this.props.pagination,
			totalCount: this.state.totalCount,
			onPageChange: this.onPageChange,
			exportSwitch: this.props.exportSwitch,
			footer: footer,
		}

		let handlers = {
			onSelectAll: this.onSelectAll,
			onExport: this.onExport
		}

		return React.cloneElement(
			base, {
				...props,
				...handlers
			}
		);
	}


	renderTableHeader=() =>{
		let {
			className,
			children,
			style
		} = this.props;
		let tHead;
		React.Children.forEach(children, (child) => {
			if (!React.isValidElement(child)) return;
			const {
				muiName,
				name,
				displayName
			} = child.type;
			if (displayName === 'TableHeader') {
				tHead = this.createTableHeader(child);
			}
		});
		return tHead;
	}

	renderNotListData = ()=> {

		let {
			className,
			children,
			style
		} = this.props;
		return (
			<table className={"ui-table "+className} style={style}>
		{
			this.renderTableHeader()
		}
				<tbody>
					<tr style={{backgroundColor:'#fff'}}>
						<TableRowColumn colSpan={100} >
							<div style={{textAlign:'center',paddingTop:90,paddingBottom:90}}>
								<div className="ui-nothing">
									<div className="icon"></div>
									<p className="tip">暂时还没有数据呦~</p>
								</div>
							</div>
						</TableRowColumn>
					</tr>
				</tbody>
			</table>
		);
	}

	renderTableBody=() =>{

		let {
			className,
			children,
			style
		} = this.props;

		let tBody;

		React.Children.forEach(children, (child) => {
			if (!React.isValidElement(child)) return;
			const {
				displayName
			} = child.type;
			if (displayName === 'TableBody') {
				tBody = this.createTableBody(child);
			}
		});

		return tBody;
	}

	renderTableFooter=() =>{

		let {
			className,
			children,
			style
		} = this.props;
		let tFoot;

		React.Children.forEach(children, (child) => {
			if (!React.isValidElement(child)) return;
			const {
				muiName,
				name,
				displayName
			} = child.type;
			if (displayName === 'TableFooter') {
				tFoot = this.createTableFooter(child);
			}
		});

		return tFoot;

	}

	renderLoading = ()=> {
		let {
			className,
			children,
			style
		} = this.props;

		return (
			<table className={"ui-table "+className} style={style}>
				{this.renderTableHeader()}
				<tbody>
					<tr style={{backgroundColor:'#fff'}}>
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

	renderFold = () => {

		const {
			fold
		} = this.props;

		if (!fold) {
			return null;
		}

		return (
			<div>
				<div className="btn-collapse">
				{this.state.foldOpen&&<span className="recordDevelop" onClick={this.onFold}>展开</span>}
			    {!this.state.foldOpen&&<span className="recordClose" onClick={this.onFold}>收起</span>}
			    </div>
		</div>

		);

	}

	tableOnClick=(event)=>{
		this.tableRowColumnClick(event);
	}

	tableRowColumnClick=(event)=>{
		
		var targetDom = event.target;
		this.findDomTd(targetDom);

	}

	findDomTd =(targetDom)=>{
		if(!targetDom){
			return;
		}
		if(targetDom.nodeName.toLowerCase()=="td"){
			
			
			var trDom = targetDom.parentNode;
			if(trDom.parentNode.nodeName.toLowerCase()=="tfoot" || trDom.parentNode.nodeName.toLowerCase()=="thead"){
				return;
			}

			var otherTr = trDom.nextSibling;
			var preOtherTr = trDom.previousSibling;
			this.resetTrColor(otherTr,"next");
			this.resetTrColor(preOtherTr,"pre");
			targetDom.parentNode.style.background ="#c1ddfa";

		}else{
			var newTargetDom = targetDom.parentNode
			this.findDomTd(newTargetDom);
		}
	}


	resetTrColor=(otherTr,strParam)=>{

		if(!otherTr){
			return;
		}

		otherTr.style.background ="";
		if(strParam=="next"){
			var newOtherTr = otherTr.nextSibling;
		}else{
			var newOtherTr = otherTr.previousSibling;
		}
		this.resetTrColor(newOtherTr,strParam);
	}

	render() {

		let {
			className,
			children,
			style,
			ajax,
			fold
		} = this.props;
		let {
			listData,
			loading
		} = this.state;
		fold = fold || this.state.fold;

		if (loading) {
			return this.renderLoading();
		}
		if (ajax && !listData.length) {
			return this.renderNotListData();
		}

		return (
			<div className="ui-table-wrap">
				<table className={"ui-table "+className} style={style} onClick={this.tableOnClick}>
					{this.renderTableHeader()}
					{this.renderTableBody()}
					{this.renderTableFooter()}
				</table>
				{this.renderFold()}
			</div>
		);

	}


}
