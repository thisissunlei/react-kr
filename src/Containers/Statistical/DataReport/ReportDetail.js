import React from 'react';
import {	
	Section,
    Table,
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn,
    TableFooter
} from 'kr-ui';

export default class ReportDetail extends React.Component{

	constructor(props,context){
		super(props, context);
	}



	render(){
        
		return(
			<div className='detail-report'>
	         <Table
                    //style={{}}
                    //ajax={true}
                    onOperation={this.onOperation}
                    displayCheckbox={false}
                    exportSwitch={true}
                    onExport={this.onExport}
                    onPageChange={this.onPageChange}
                    //ajaxParams={this.props.CommunityStationModel.searchParams}
                    //ajaxUrlName='station-list'
                    //ajaxFieldListName="items"
					  >
		            <TableHeader className='detail-header'>
		              <TableHeaderColumn>社区名称</TableHeaderColumn>
		              <TableHeaderColumn>客户来源</TableHeaderColumn>
                      <TableHeaderColumn>客户名称</TableHeaderColumn>
		              <TableHeaderColumn>意向工位</TableHeaderColumn>
		              <TableHeaderColumn>联系人</TableHeaderColumn>
		              <TableHeaderColumn>联系电话</TableHeaderColumn>
		              <TableHeaderColumn>创建日期</TableHeaderColumn>
		              <TableHeaderColumn>领取人</TableHeaderColumn>
		          	</TableHeader>

			        <TableBody >
			              <TableRow>
			                <TableRowColumn>12</TableRowColumn>
                            <TableRowColumn>34</TableRowColumn>
			                <TableRowColumn>34</TableRowColumn>
                            <TableRowColumn>45</TableRowColumn>
			                <TableRowColumn>56</TableRowColumn>
			                <TableRowColumn>tu</TableRowColumn>
			                <TableRowColumn>dfg</TableRowColumn>
			                <TableRowColumn>cv</TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
            </Table>
	 </div>
	 );
  }
}
