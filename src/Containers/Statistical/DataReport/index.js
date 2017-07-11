import React from 'react';

import {
	CheckPermission,
	Button,
	Dialog
} from 'kr-ui';
import './index.less';
import ReportDetail from './ReportDetail';
import State from './State';
import {
	observer,
} from 'mobx-react';
@observer
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
                <div onClick={this.detailClick}>button</div>
                {/*高级查询*/}
                <Dialog
                    title="报表明细"
                    onClose={this.detailClick}
                    open={this.state.openReportDetail}
                >
                    <ReportDetail />
                </Dialog>
			</div>

		);
	}
}

