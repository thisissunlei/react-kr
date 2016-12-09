import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux';
import {
	reduxForm,
	submitForm,
	change,
	reset
} from 'redux-form';
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
class SearchDateForm extends Component{
	constructor(props, context) {
		super(props, context);
		this.state = {
		}
	}

	render(){
		return (

						<form style={{display:'inline-block',marginTop:10}}>
						<ListGroup style={{width:'610'}}>
						<ListGroupItem style={{textAlign:'center',padding:0}}><span style={{display:'inline-block',lineHeight:'58px'}}>注册时间:</span></ListGroupItem>
							<ListGroupItem style={{padding:0}}>
									<KrField name="leaseBegindate"  component="date" onChange={this.onChangeLeaseBeginDate} simple={true}/>
							</ListGroupItem>
							<ListGroupItem style={{textAlign:'center',padding:0,marginLeft:'10'}}><span style={{display:'inline-block',lineHeight:'58px'}}>至</span></ListGroupItem>
							<ListGroupItem style={{padding:0}}>
									<KrField name="leaseEnddate" component="date" onChange={this.onChangeLeaseEndDate} simple={true}/>
							</ListGroupItem>
						</ListGroup>
						</form>
		)
	}

}

 SearchDateForm = reduxForm({
	form: 'searchDateForm'
})(SearchDateForm);
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
	onSubmit=(form)=>{

	}
	render() {

		return (
			<div>
				<div style={{width:'100%',height:75}}>
					<span style={{display:'inline-block',verticalAlign:'top',width:'60%',height:75,lineHeight:'75px',color:'#499df1'}}>Krspace轨迹</span>
					<SearchDateForm onSubmit={this.onSubmit} />
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
						style={{marginTop:0}}
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
