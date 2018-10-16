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
	Message,
	Notify,
	CheckPermission,
	ListGroup,
	ListGroupItem,
	Drawer,
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import './index.less';

export default class List extends React.Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor(props, context) {
		super(props, context);
		
        this.params = this.context.router.params;
        let {memberId}=this.props;
		this.state = {
			searchParams: {
				page: 1,
                pageSize: 8,
                uid:memberId
			},

		}
	}
	
	onLoaded=(response)=> {
		let list = response;
		this.setState({
			list
		})
	}
	
    onPageChange=(page)=>{
		this.setState({
			realPage : page
		})
	}
	

	

	
   
	
	

	



	render() {
		let {
			list,
			itemDetail,
			seleced
		} = this.state;
		
		
		
		return (
			    <div className="member-list-div" style={{backgroundColor:"#fff"}} >
						<Table
                                className="member-list-table"
                                    style={{marginTop:10,position:'inherit'}}
                                    onLoaded={this.onLoaded}
                                    ajax={true}
                                    onProcessData={(state)=>{
                                        return state;
                                    }}
                                    ajaxFieldListName='items'
                                    ajaxUrlName='get-member-enter-log-page'
                                    ajaxParams={this.state.searchParams}
                                    onPageChange={this.onPageChange}
                                >
								<TableHeader>
											<TableHeaderColumn>入驻时间</TableHeaderColumn>
											<TableHeaderColumn>离场时间</TableHeaderColumn>
											<TableHeaderColumn>所属客户</TableHeaderColumn>、
											<TableHeaderColumn>所属社区</TableHeaderColumn>
								</TableHeader>
								<TableBody style={{position:'inherit'}}>
										<TableRow displayCheckbox={false}>
                                                <TableRowColumn name="createTime" type="date" format="yyyy-mm-dd"></TableRowColumn>
                                                <TableRowColumn name="createTime" type="date" format="yyyy-mm-dd"></TableRowColumn>
                                                <TableRowColumn name="name"
                                                component={(value,oldValue)=>{
                                                    if(value==""){
                                                        value="-"
                                                    }
                                                    return (<span>{value}</span>)}}
                                                ></TableRowColumn>
                                                <TableRowColumn name="phone"
                                                component={(value,oldValue)=>{
                                                    if(value==""){
                                                        value="-"
                                                    }
                                                    return (<span>{value}</span>)}}
                                                ></TableRowColumn>
										 </TableRow>
								</TableBody>
								<TableFooter></TableFooter>
					</Table>
							
		</div>
		);

	}

}
