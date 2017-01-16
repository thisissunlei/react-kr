import React, {
	Component,
	PropTypes
} from 'react';
import {
	connect
} from 'kr/Redux';

import {
	reduxForm,
	formValueSelector,
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
	Button,
	ButtonGroup,
	ListGroup,
	ListGroupItem
} from 'kr-ui';

import './index.less';

class SearchUpperForm extends Component {

	static propTypes = {
		onSubmit: React.PropTypes.func,
		onCancel: React.PropTypes.func,
	}

	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);

	}
	

	onSubmit(values) {
		const {
			onSubmit
		} = this.props;
		onSubmit && onSubmit(values);
	}

	onCancel() {
		const {
			onCancel
		} = this.props;

		onCancel && onCancel();

	}

	renderSigned=()=>{
		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;
		return (

			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:34,marginLeft:36}}>

			    <KrField grid={1/2} right={39}  name="mainbillname" type="text" label="公司名称"/>
				<KrField right={39} grid={1/2}  name="communityid" type="select" label="意向城市"/>
				<KrField  grid={1/2} right={39} name="mainbilltype" type="select"  label="意向社区" ></KrField>
				<KrField  grid={1/2} right={39} name="mainbilltype" type="select"  label="客户分类" ></KrField>
				<KrField  grid={1/2} right={39} name="mainbilltype" type="select"  label="客户来源" ></KrField>
				<KrField grid={1/1}  component="group" label="创建时间" style={{marginTop:3}}>
				<div className='ui-listDate'><ListGroup>
					<ListGroupItem><div className='ui-date-start'><KrField  right={6} style={{marginLeft:-10}} name="startDate" component="date" /></div></ListGroupItem>
						<div className='ui-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
						<ListGroupItem><div className='ui-date-end'><KrField  right={6} name="endDate" component="date" /></div></ListGroupItem>
					</ListGroup>
                </div>
				</KrField>

				<Grid style={{marginTop:7,marginBottom:5,marginLeft:-24}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
			</form>
		);
	}

	renderOther=()=>{
		const {
			error,
			handleSubmit,
			pristine,
			reset
		} = this.props;
		return (

			<form onSubmit={handleSubmit(this.onSubmit)} style={{marginTop:34,marginLeft:36}}>

			    <KrField grid={1/2} right={39}  name="mainbillname" type="text" label="公司名称"/>
				<KrField right={39} grid={1/2}  name="communityid" type="select" label="所在城市"/>
				<KrField  grid={1/2} right={39} name="mainbilltype" type="select"  label="所属社区" ></KrField>
				<KrField grid={1/1}  component="group" label="创建时间" style={{marginTop:3}}>
				<div className='ui-listDate'><ListGroup>
					<ListGroupItem><div className='ui-date-start'><KrField  right={6} style={{marginLeft:-10}} name="startDate" component="date" /></div></ListGroupItem>
						<div className='ui-line-down'><span style={{display:'inline-block',color:'#666',fontSize:'14'}}>至</span></div>
						<ListGroupItem><div className='ui-date-end'><KrField  right={6} name="endDate" component="date" /></div></ListGroupItem>
					</ListGroup>
                </div>
				</KrField>

				<Grid style={{marginTop:7,marginBottom:5,marginLeft:-24}}>
					<Row>
						<Col md={12} align="center">
							<ButtonGroup>
								<div  className='ui-btn-center'><Button  label="确定" type="submit" joinEditForm /></div>
								<Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} />
							</ButtonGroup>
						</Col>
					</Row>
				</Grid>
			</form>
		);
	}

	

	render() {

	   let {flag}=this.props;

       if(flag=='签约'){
			return this.renderSigned();
		}

		return(
			<div>
				  {this.renderOther()}
			</div>
		);
	}
}

