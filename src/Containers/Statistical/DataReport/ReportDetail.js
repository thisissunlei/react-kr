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
				<Section description="" style={{marginBottom:-5}}>
	         <Table
                    style={{marginTop:8}}
                    ajax={true}
                    onOperation={this.onOperation}
                    displayCheckbox={false}
                    exportSwitch={true}
                    onExport={this.onExport}
                    onPageChange={this.onPageChange}
                    //ajaxParams={this.props.CommunityStationModel.searchParams}
                    ajaxUrlName='station-list'
                    ajaxFieldListName="items"
					  >
		            <TableHeader>
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
			                <TableRowColumn name="code"></TableRowColumn>
                            <TableRowColumn name="floor"></TableRowColumn>
			                <TableRowColumn name="stationType" options={[{label:'开放',value:'OPEN'},{label:'半开放',value:'HALF_OPEN'},{label:'封闭',value:'CLOSED'}]}></TableRowColumn>
                            <TableRowColumn name="belongSpace"  options={[{label:'属于',value:'true'},{label:'不属于',value:'false'}]}></TableRowColumn>
			                <TableRowColumn name="spaceName"></TableRowColumn>
			                <TableRowColumn name="quotedPrice"></TableRowColumn>
			                <TableRowColumn name="enable" options={[{label:'启用',value:'true'},{label:'未启用',value:'false'}]}></TableRowColumn>
			                <TableRowColumn type="operation"></TableRowColumn>
			               </TableRow>
			        </TableBody>
			        <TableFooter></TableFooter>
            </Table>
       </Section>
	 </div>
	 );
  }
}
