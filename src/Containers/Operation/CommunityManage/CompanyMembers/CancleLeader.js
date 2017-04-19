import React, {
	PropTypes
} from 'react';

import {
	reduxForm,
} from 'redux-form';

import {
	Grid,
	Row,
	Button,
	ListGroup,
	ListGroupItem,

} from 'kr-ui';

export default class CancleLeader extends React.Component {
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
			isLeader:false
		}
		const {onSubmit} = this.props;
		onSubmit && onSubmit(values);
	}
	onCancel=()=>{
		const {onCancel} = this.props;
		onCancel && onCancel();
	}





	render() {
		return (
			<div>
				<p style={{marginTop:45,marginBottom:49,textAlign:'center',color:'#666',fontSize:14}}>确定取消Leader吗？ </p>
				<Grid style={{marginBottom:6}}>
					<Row>
						<ListGroup>
							<ListGroupItem style={{width:'180px',textAlign:'right',padding:0,paddingRight:15}}><Button  label="确定" type="button"  onTouchTap={this.onSubmit} width={90} height={34}/></ListGroupItem>
							<ListGroupItem style={{width:'180px',textAlign:'left',padding:0,paddingLeft:15}}><Button  label="取消" type="button" cancle={true} onTouchTap={this.onCancel} width={90} height={34}/> </ListGroupItem>
						</ListGroup>
					  </Row>
				</Grid>
			</div>
)
	}
}
