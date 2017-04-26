import React from 'react';

import {
	Title,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	SearchForms,
	Dialog,
	KrDate,
	
} from 'kr-ui';
import HightSearchForm from "./HightSearchForm";
import './index.less';

export default class Visitor extends React.Component{

	constructor(props,context){
		super(props, context);

		this.state = {
			searchParams:{
				communityId:'',
				company:'',
				endTime:'',
				name:'',
				startTime:'',
				visitName:''
			},
			openSearchDialog:false,
		}
	}


	componentDidMount() {

	}
	openSearchDialog=()=>{
		this.setState({
			openSearchDialog:!this.state.openSearchDialog
		})
	}
	onHightSubmit=(form)=>{
		this.setState({
			searchParams:form
		})
		this.openSearchDialog();
	}

	onExport=(values)=>{
		let idList = [];
		if (values.length != 0) {
			values.map((item, value) => {
				idList.push(item.id)
			});
		}
		console.log('idList----',idList)
		
		var url = `/api/krspace-finance-web/cmt/visit/export-excel?idList=${idList}`
		window.location.href = url;
	}


	render() {
		
		return (
			 <div style={{minHeight:'910',backgroundColor:"#fff"}}>
								<Title value="访客列表"/>
								<Section title="访客列表" description="" >
									<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
										<Button   type='search'  searchClick={this.openSearchDialog} searchStyle={{marginLeft:'30',marginTop:'10',display:'inline-block',float:'right'}}/>
										<SearchForms onSubmit=""  style={{marginTop:5,zIndex:10000}} />
									</form>
									<Table
											style={{marginTop:10,position:'inherit'}}
											onLoaded={this.onLoaded}
											ajax={true}
											exportSwitch={true}
											onExport={this.onExport}
											ajaxUrlName='get-visit-list'
											ajaxParams={this.state.searchParams}
										>
										<TableHeader>
											<TableHeaderColumn>序号</TableHeaderColumn>
											<TableHeaderColumn>社区名称</TableHeaderColumn>
											<TableHeaderColumn>访客姓名</TableHeaderColumn>
											<TableHeaderColumn>被访公司</TableHeaderColumn>
											<TableHeaderColumn>被访人</TableHeaderColumn>
											<TableHeaderColumn>到访时间</TableHeaderColumn>
									</TableHeader>
									<TableBody style={{position:'inherit'}}>
											<TableRow displayCheckbox={true}>
											<TableRowColumn name="id"></TableRowColumn>
											<TableRowColumn name="communityName"></TableRowColumn>
											<TableRowColumn name="visitName"></TableRowColumn>
											<TableRowColumn name="company"></TableRowColumn>
											<TableRowColumn name="name"></TableRowColumn>
											<TableRowColumn 
													name="visitTime" 
													component={(value) => {
						                          return (<KrDate value={value} format="yyyy-mm-dd"/>)
						                    }}></TableRowColumn>
										 </TableRow>
									</TableBody>
									<TableFooter></TableFooter>
									</Table>
								</Section>
								<Dialog
									title="高级查询"
									modal={true}
									open={this.state.openSearchDialog}
									onClose={this.openSearchDialog}
									contentStyle={{width:687}}
								>
									<HightSearchForm 
											onSubmit={this.onHightSubmit}
											onCancel={this.openSearchDialog}
											detail="" 
											style={{marginTop:37}} 
									/>
							  </Dialog>
				</div>
			
		);
	}
}


