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

	 
	render() {
		
		return (
			<div className="data-report">
				<Title value="催款表"/>
					<Section title="催款表">
						<SearchForm/>

							<div onClick={this.detailClick}>button</div>

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

