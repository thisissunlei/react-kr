import React from 'react';

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
// import {
// 	observer,
// } from 'mobx-react';
import SearchForm from "./SearchForm";
// @observer
export default class DataReport extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state={
          openReportDetail:false
		}
				
	}

	detailClick=()=>{
		this.setState({
			openReportDetail:true 
		})
	}
	componentDidMount(){
		var winHeight = 0;
		if (window.innerHeight)
		winHeight = window.innerHeight;
		else if ((document.body) && (document.body.clientHeight))
		winHeight = document.body.clientHeight;
		console.log(winHeight,">>>>>>>>>");
        window.addEventListener("scroll",this.domOnscroll,false)
    }
	 
	render() {
		
		return (
			<div className="data-report" style = {{height:''}}>
				<Title value="催款表"/>
				<Section title="催款表">
					<SearchForm/>
					<div onClick={this.detailClick}>button</div>
					<div className = "data-report-table">
						<ReportTable />
					</div>
					{/*详情*/}
					<Dialog
						title="报表明细"
						onClose={this.detailClick}
						open={this.state.openReportDetail}
					>

						<ReportDetail />

					</Dialog>

				</Section>

			</div>

		);
	}
}

