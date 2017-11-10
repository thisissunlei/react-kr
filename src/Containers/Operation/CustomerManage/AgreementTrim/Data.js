import React from 'react';
import {reduxForm,initialize} from 'redux-form';
import {Store} from 'kr/Redux';
import {DateFormat,Http} from 'kr/Utils';
import {
	KrField,
	Grid,
	Row,
	Col,
	Button,
	Message,
	ListGroup,
	ListGroupItem,
	CircleStyleTwo,
	ButtonGroup,
	Notify,
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableRow,
	TableHeaderColumn,
	TableRowColumn,
	Tooltip
} from 'kr-ui';
import mobx, {
	observable,
	action,
	asMap,
	computed,
	extendObservable,
	toJS
} from 'mobx';
import {
	observer
} from 'mobx-react';
import './index.less';
import State from './State';
@observer
class EditList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}
		
	}

	componentDidMount() {
		// Store.dispatch(initialize('EditList', State.itemDetail));


	}
	componentWillMount() {
	}

	onCancel=()=>{
		let {onCancel} = this.props;
		onCancel && onCancel()
	}
	onSubmit=(form)=>{
		console.log('=====>',form);
		let {onCancel} = this.props;
		// init-report-income
		Http.request('init-report-income', {},{date:form.date}).then(function(response) {
			Message.success("保存成功");
			onCancel && onCancel()
			// window.location.reload();
		}).catch(function(err) {
			Message.error(err.message);
		});
		
	}
	chooseStick=(person)=>{
		console.log('-----',person)
	}
  


	render() {
		const { handleSubmit} = this.props;
		
		return (
			<div>
			   <form onSubmit={handleSubmit(this.onSubmit)} style={{textAlign:'center'}}>
				<div >
                 	<KrField  grid={1} name="date" style={{marginTop:4,width:150}} component='date'  placeholder='请选择' />

							
						<Grid  style={{marginTop:'50px'}}>
						<Row>
						<ListGroup>
							<ListGroupItem style={{width:'45%',textAlign:'right'}}><Button  label="提交"  type="submit"  /></ListGroupItem>
							<ListGroupItem style={{width:'45%',textAlign:'left'}}><Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel} /></ListGroupItem>
						</ListGroup>
						</Row>
						</Grid>
				</div>
				</form> 
			</div>


		);
	}
}
const validate = values => {
	const errors = {}
	if(!values.date){
		errors.date = '请选择日期';
	}
	

	return errors
}

export default EditList = reduxForm({
	form: 'EditList',
	validate,
})(EditList);

