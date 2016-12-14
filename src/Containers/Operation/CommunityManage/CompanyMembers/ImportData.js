import React, {
	Component,
	PropTypes
} from 'react';

import {
	reduxForm,
	formValueSelector,
	initialize,
	arrayPush,
	arrayInsert,
	FieldArray,
	change
} from 'redux-form';

import {
	Actions,
	Store,
	connect
} from 'kr/Redux';


import {
	Section,
	KrField,
	Grid,
	Row,
	Col,
	Notify,
	Button,
	KrDate,
	DotTitle,
	ButtonGroup,
	Paper,
	ListGroup,
	ListGroupItem
} from 'kr-ui';

export default class CancleLeader extends Component {
	static propTypes = {
		initialValues:React.PropTypes.object,
		communityOptions:React.PropTypes.array,
		orderTypeOptions:React.PropTypes.array,
	}

	constructor(props, context) {
		super(props, context);
	}

	onSubmit=()=>{
		let values = {
			isLeader:true
		}
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}
	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}
	onLoadDemo=()=>{
		const {onLoadDemo} = this.props;
		onLoadDemo && onLoadDemo();
	}



	

	render() {
		
		

		return (
			<div>
				<div>
					<span className='import-logo'></span>
					<span className='import-font'>请选择上传文件</span>
					<span className='load-demo'>下载excel模板</span>
				</div>

				<p style={{marginTop:55,marginBottom:59,textAlign:'center',color:'#333'}}>确定设置为Leader吗？ </p>
				<Grid style={{marginBottom:20}}>
					<Row>
						<ListGroup>
							<ListGroupItem style={{width:'47%',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="button"  onTouchTap={this.onSubmit} width={90} height={34}/></ListGroupItem>
							<ListGroupItem style={{width:'47%',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} width={90} height={34}/> </ListGroupItem>
						</ListGroup>
					  </Row>
				</Grid></div>
)
	}
}

