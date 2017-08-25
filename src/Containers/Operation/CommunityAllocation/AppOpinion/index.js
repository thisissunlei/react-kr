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
	Tooltip,
	Title,
	Section
} from 'kr-ui';
import './index.less';


export default class AppOpinion extends React.Component {


	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams:{
				page:1,
				pageSize:15,
			}
		}
		
	}
	
	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel();
	}
	
	
	render() {
			
			
			
		return (
			<div className="g-create-opinion">
				<Title value="App意见反馈"/>
				<Section title="意见反馈列表" description="" style={{marginBottom:-5,minHeight:910}}>
					<Table
							  style={{marginTop:10}}
			                  ajax={true}
			                  ajaxUrlName='actor-page'
			                  ajaxParams={this.state.searchParams}
			                  
						  >
					            <TableHeader>
					              <TableHeaderColumn>姓名</TableHeaderColumn>
					              <TableHeaderColumn>电话</TableHeaderColumn>
					              <TableHeaderColumn>社区</TableHeaderColumn>
					              <TableHeaderColumn>创建时间</TableHeaderColumn>
					              <TableHeaderColumn>反馈内容</TableHeaderColumn>
					          	</TableHeader>

						        <TableBody >
						              <TableRow>
						              <TableRowColumn name="userName"></TableRowColumn>
						              <TableRowColumn name="phone" ></TableRowColumn>
						              <TableRowColumn name="phone" ></TableRowColumn>
						                <TableRowColumn name="company" 
											component={(value,oldValue)=>{
					                            var TooltipStyle=""
					                            if(value.length==""){
					                              TooltipStyle="none";

					                            }else{
					                              TooltipStyle="block";
					                            }
					                             return (<div style={{display:TooltipStyle,paddingTop:5}} ><span style={{maxWidth:160,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
					                            <Tooltip offsetTop={8} place='top'>{value}</Tooltip></div>)
					                      }}></TableRowColumn>
						                <TableRowColumn 
						                	name="ctime" 
						                	component={(value) => {
						                          return (<KrDate value={value} format="yyyy-mm-dd hh:MM:ss"/>)
						                    }}
						                ></TableRowColumn>
						               
						                
						               </TableRow>
						        </TableBody>
				        		<TableFooter></TableFooter>
	            			</Table>
	            	</Section>
            			
						
			</div>
		);
	}
}


 
