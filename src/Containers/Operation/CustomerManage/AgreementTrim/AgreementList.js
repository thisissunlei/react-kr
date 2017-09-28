import React from 'react';
import {reduxForm,initialize} from 'redux-form';
import {Store} from 'kr/Redux';
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
	ButtonGroup
} from 'kr-ui';
import {
	observer
} from 'mobx-react';
import './index.less';
import State from './State';
@observer
class CreateNewList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			
		}
		
	}
	componentWillMount() {
	}

	onCancel=()=>{
		let {onCancel}=this.props;
		onCancel && onCancel();
	}
	onSubmit=(form)=>{
		let {onSubmit}=this.props;
		onSubmit && onSubmit(form);
	}
	onChangeSign=(person)=>{
		console.log('onChangeSign',person)

	 	// if(!person || person.length == 0) {
			// State.haveOrder = false;
	 	// 	return ;
	 	// }
		// State.haveOrder = true;

		// this.fetchCustomer({customerId:person.id});
		// allState.companyName=person.company;
		// allState.listId=person.id;
		// this.orderNameInit(person.id);

    }


	render() {
		const { handleSubmit} = this.props;
		
		return (
			<div className="g-agreement-trim-list">
				<div className="u-title-box">
						<img className="u-title-img" src={require('./images/activity.svg')} />
						<span className="u-title-text">合同调整</span>
						<span className="u-close-page" onClick={this.onCancel}>
							<img 
								src={require('./images/closeIMG.svg')} 
								className="u-close-page-img"
							 />
						</span>
					</div>
			   <form onSubmit={handleSubmit(this.onSubmit)}>
					<CircleStyleTwo num="1" info="选择客户">
						<KrField
							style={{width:260,marginRight:25}}
							name="title"
							type="text"
							component="companyName"
							label="客户名称"
							requireLabel={true}
					 	/>
					 	<KrField grid={1/2} label="订单名称" name="staionTypeId" component="select" style={{width:262,marginLeft:28}}
								options={toJS(State.orderList)}
								requireLabel={true}
								onChange={this.orderListChange}
						/>
					 	{/*<KrField
							style={{width:260,marginRight:25}}
							name="publishedTime"
							component="date"
							label="订单名称"
							requireLabel={true}
					 	/>*/}
					</CircleStyleTwo>
					<CircleStyleTwo num="2" info="合同列表" circle="bottom">
						<Grid style={{marginTop:50,width:'81%'}}>
							<Row >
								<Col md={12} align="center">
									<ButtonGroup>
										<Button  label="确定" type="submit"  />
										<Button  label="取消" cancle={true} type="button"  onTouchTap={this.onCancel}/>
									</ButtonGroup>
								  </Col>
							</Row>
						</Grid>
					</CircleStyleTwo>
				</form> 
			</div>


		);
	}
}
const validate = values => {
	const errors = {}
	let numContr =/^[1-9]\d{0,4}$/;
	if(!values.title){
		errors.title = '请输入新闻标题';
	}
	

	return errors
}

export default CreateNewList = reduxForm({
	form: 'createNewList',
	validate,
})(CreateNewList);

