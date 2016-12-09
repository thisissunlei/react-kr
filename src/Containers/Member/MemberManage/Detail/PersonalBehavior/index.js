import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
// import {
// 	bindActionCreators
// } from 'redux';
// import {
// 	Actions,
// 	Store
// } from 'kr/Redux';
import * as actionCreators from 'kr-ui/../Redux/Actions';
import './index.less';
import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	KrField,
	ListGroup,
	ListGroupItem,
} from 'kr-ui';
export default class PersonalBehavior extends Component {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	static defaultProps = {

	}

	static PropTypes = {
		displayCheckbox: false,
	}

	constructor(props, context) {
		super(props, context);
		this.state = {
		}
	}
	render() {
		return (
			<div>
				<div className='peronal-behavior-header'>
							<span>Krspace轨迹</span>
							<ListGroup>
								<ListGroupItem style={{width:'45%',padding:0,marginLeft:'-10px'}}>
										<KrField name="leaseBegindate"  component="date" onChange={this.onChangeLeaseBeginDate} simple={true}/>
								</ListGroupItem>
								<ListGroupItem style={{width:'9%',textAlign:'center',padding:0,marginLeft:10}}><span style={{display:'inline-block',lineHeight:'58px'}}>至</span></ListGroupItem>
								<ListGroupItem style={{width:'45%',padding:0,}}>
										<KrField name="leaseEnddate" component="date" onChange={this.onChangeLeaseEndDate} simple={true}/>
								</ListGroupItem>
							</ListGroup>
				</div>
				<Table
						displayCheckbox={false}
						ajax={true}
						onProcessData={(state)=>{
							return state;
							}}
						ajaxFieldListName='items'
						ajaxUrlName='getPersonalBehavior'
						ajaxParams={this.state.searchParams}
					>
						<TableHeader>
								<TableHeaderColumn>时间</TableHeaderColumn>
								<TableHeaderColumn>地点</TableHeaderColumn>
								<TableHeaderColumn>行为</TableHeaderColumn>
								<TableHeaderColumn>结果</TableHeaderColumn>
						</TableHeader>

						<TableBody>
							<TableRow>
								<TableRowColumn name="optTime" ></TableRowColumn>
								<TableRowColumn name="address" ></TableRowColumn>
								<TableRowColumn name="action" ></TableRowColumn>
								<TableRowColumn name="result" ></TableRowColumn>
							 </TableRow>
						</TableBody>

						<TableFooter></TableFooter>
				</Table>
			</div>
		)
	}

}
