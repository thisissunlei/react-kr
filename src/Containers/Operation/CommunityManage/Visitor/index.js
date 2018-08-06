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
				visitName:'',
				page:1,
				pageSize:15
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
	onSerchSubmit=(form)=>{
		this.setState({
			searchParams:{
				company:form.content
			}
		})
		
	}
	onPageChange=(page)=>{
		console.log('page',page)
	    var searchParams={
	       page:page
	    }
	    this.setState({
	       searchParams:Object.assign({},this.state.searchParams,searchParams)
	    })
	  }

	onExport=(values)=>{
		let idList = [];
		if (values.length != 0) {
			values.map((item, value) => {
				idList.push(item.id)
			});
		}
		var url = `/api/krspace-finance-web/cmt/visit/export-excel?idList=${idList}`
		window.location.href = url;
	}


	render() {
		
		return (
			 <div style={{minHeight:'910',backgroundColor:"#fff"}}>
								<Title value="访客登记"/>
								<Section title="访客登记" description="" >
									<form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
										<Button   type='search'  searchClick={this.openSearchDialog} searchStyle={{marginLeft:'30',marginTop:'10',display:'inline-block',float:'right'}}/>
										<SearchForms onSubmit={this.onSerchSubmit} placeholder="请输入被访公司名称"  style={{marginTop:5,zIndex:10000}} />
									</form>
									<Table
											style={{marginTop:10,position:'inherit'}}
											onLoaded={this.onLoaded}
											ajax={true}
											exportSwitch={true}
											onPageChange={this.onPageChange}
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
									overflow="auto"
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


