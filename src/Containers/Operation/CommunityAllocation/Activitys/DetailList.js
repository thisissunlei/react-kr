import React from 'react';
import {
	Http,
	ReactHtmlParser
} from 'kr/Utils';
import {
	reduxForm,
	change
} from 'redux-form';
import {
	Actions,
	Store
} from 'kr/Redux';
import {
	KrField,
	Grid,
	Row,
	Col,
	ButtonGroup,
	Button,
	Message,
	KrDate,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Tooltip
} from 'kr-ui';
import './index.less';


export default class DetailList extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams:{
				id:this.props.detail.id,
				page:1,
				pageSize:15,
			}
		}
		
	}
	
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	
	onExport=(values)=>{
		let id=this.props.detail.id;
		var url = `/api/krspace-finance-web/activity/management/export-actor?id=${id}`;
		window.location.href = url;
	}
	
	render() {
			
			
			
		return (
			<div className="g-create-activity">
				<div className="u-create-title">
						<div className="title-text">报名列表</div>
						<div className="u-create-close" onClick={this.onCancel}></div>
				</div>
				<div className="m-activity-list" > 
					<Table
							  style={{marginTop:10}}
			                  ajax={true}
			                  ajaxUrlName='actor-page'
			                  ajaxParams={this.state.searchParams}
							  onExport={this.onExport}
							  exportSwitch={true}
						  >
					            <TableHeader>
					              <TableHeaderColumn>姓名</TableHeaderColumn>
					              <TableHeaderColumn>电话</TableHeaderColumn>
					              <TableHeaderColumn>公司</TableHeaderColumn>
					              <TableHeaderColumn>社区</TableHeaderColumn>
					              <TableHeaderColumn>职位</TableHeaderColumn>
					              <TableHeaderColumn>报名时间</TableHeaderColumn>
					          	</TableHeader>

						        <TableBody >
						              <TableRow>
						              <TableRowColumn name="userName"></TableRowColumn>
						              <TableRowColumn name="phone" ></TableRowColumn>
						                <TableRowColumn name="company" 
											component={(value,oldValue)=>{
					                            var TooltipStyle=""
					                            if(value.length==""){
					                              TooltipStyle="none";

					                            }else{
					                              TooltipStyle="block";
					                            }
					                             return (<div style={{display:TooltipStyle,paddingTop:5}} ><span style={{maxWidth:80,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
					                            <Tooltip offsetTop={8} place='top'>{value}</Tooltip></div>)
					                      }}></TableRowColumn>
						              	<TableRowColumn name="communityName" ></TableRowColumn>
										  <TableRowColumn name="job" 
												component={(value,oldValue)=>{
													var TooltipStyle=""
													if(value.length==""){
													TooltipStyle="none";

													}else{
													TooltipStyle="block";
													}
													return (<div style={{display:TooltipStyle,paddingTop:5}} ><span style={{maxWidth:80,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
													<Tooltip offsetTop={8} place='top'>{value}</Tooltip></div>)
											}} ></TableRowColumn>
						                <TableRowColumn 
						                	name="ctime" 
						                	component={(value) => {
												var TooltipStyle=""
					                            if(value.length==""){
					                              TooltipStyle="none";
					                            }else{
					                              TooltipStyle="block";
					                            }
						                          return (
													<div style={{display:TooltipStyle,paddingTop:5}} ><span style={{maxWidth:80,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}> <KrDate value={value} format="yyyy-mm-dd hh:MM:ss"/></span>
													<Tooltip offsetTop={8} place='top'> <KrDate value={value} format="yyyy-mm-dd hh:MM:ss"/></Tooltip></div>
												 
												)
						                    }}
						                ></TableRowColumn>
						               
						                
						               </TableRow>
						        </TableBody>
				        		<TableFooter></TableFooter>
	            			</Table>
            			</div>
						
			</div>
		);
	}
}


 
