import React from 'react';
import {
	observable
} from 'mobx';
import {
	CheckPermission,
	Button,
	Dialog,
	Title,
	Section
} from 'kr-ui';
import './index.less';
import ReportDetail from './ReportDetail';
import ReportTable from './ReportTable';
import State from './State';

import SearchUpper from './SearchUpper.js';
import SearchForm from './SearchForm';
import {
	observer,
} from 'mobx-react';
@observer
export default class DataReport extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state={
          openReportDetail:false,
		  openSearchUpper:false
		}
				
	}
    
	//账单明细关闭
	detailClick=()=>{
		this.setState({
			openReportDetail:!this.state.openReportDetail 
		})
	}
    
	//高级查询关闭
	searchClick=()=>{
       this.setState({
		   openSearchUpper:!this.state.openSearchUpper
	   })
	}

	componentDidMount(){
		
    }

	//高级查询提交
	searchSubmit=(params)=>{
	  this.reportTable.getReportList();
      this.searchClick();
	}


	 
	render() {
		
		return (
			<div className="data-report">
				<Title value="催款表"/>
				<Section title="催款表">
					<SearchForm
					  openSearchUpperDialog={this.searchClick}
					  chooseStartTime = {() =>{
						  {/*this.reportTable.getReportList();*/}
					  }}
					   chooseEndTime = {() =>{
						  {/*this.reportTable.getReportList();*/}
					  }}
					  
					/>
					<div className = "data-report-table">
						<ReportTable 
						 ref={(reportTable) => this.reportTable = reportTable}
						 everyClick = {this.detailClick} 
						 />
						<Button
							label="导出"
							type='button'
							onTouchTap={this.openAddCommunity}
						/>
					</div>
						
					{/*报表明细*/}
					<Dialog
						title="报表明细"
						onClose={this.detailClick}
						open={this.state.openReportDetail}
						contentStyle ={{ width: '85%',height:'650px',overflowY:'scroll'}}
					>
						<ReportDetail 
						/>
					</Dialog>

					{/*高级查询*/}
					<Dialog
						title="高级查询"
						onClose={this.searchClick}
						open={this.state.openSearchUpper}
						contentStyle ={{ width: '665px',height:'234px'}}
					>
					<SearchUpper 
						onSubmit={this.searchSubmit}
						onCancel={this.searchClick}
					/>
					</Dialog>

				</Section>
			</div>

		);
	}
}

