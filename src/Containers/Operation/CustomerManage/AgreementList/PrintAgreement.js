import React, {
	 
	PropTypes
} from 'react';

import {
	Actions,
	Store
} from 'kr/Redux';

import {
	Row,
	Col,
	Button,
	Notify,
	ListGroup,
	ListGroupItem
} from 'kr-ui';
import noCachet from './images/noCachet.png';
import Cachet from './images/cachet.png'


export default class DelAgreementNotify extends React.Component {



	constructor(props, context) {
		super(props, context);
		this.state = {
			print:'false'
		}

	}
	cachetClick=()=>{
		this.setState({
			print:'true'
		})
	}
	noClick=()=>{
		this.setState({
			print:'false'
		})
	}
	onSubmitCachet=()=>{
		let {onSubmit} = this.props;
		onSubmit && onSubmit(this.state.print);
	}

	render() {

		let {
			onCancel
		} = this.props;

		return (

			<div className="print-dialog">
				<div style={{textAlign:'center',marginTop:20,marginBottom:20,fontWeight:600,fontSize:'16px',color:'#333'}}>请选择您打印的合同是否需要盖公章？</div>
				<Row >
					<Col md={12} align="center">
						<ListGroup>
							<ListGroupItem style={{marginRight:30}}> 
								<div className="agreement-pic no-cachet" onClick={this.noClick}>
									{this.state.print =='false'?<span className="checked-logo"></span>:<span className="check-logo"></span>}
								</div>
								<p  style={{color:'#999',fontSize:'14px'}}>示例一：未加盖公章的合同</p>
							</ListGroupItem>
							<ListGroupItem style={{marginLeft:30}}> 
								<div className="agreement-pic cachet" onClick={this.cachetClick}>
									{this.state.print =='true'?<span className="checked-logo"></span>:<span className="check-logo"></span>}
								</div>
								<p style={{color:'#999',fontSize:'14px'}}>示例二：加盖公章的合同</p>
							</ListGroupItem>
						</ListGroup>
					</Col>
				</Row>


				<Row style={{marginTop:40,marginBottom:10}}>
					<Col md={12} align="center">
						<ListGroup>
							<ListGroupItem style={{marginRight:20}}> <Button  label="预览" type="button"  height={34} onTouchTap={this.onSubmitCachet}/></ListGroupItem>
							<ListGroupItem style={{marginLeft:20}}> <Button  label="取消" type="button" height={32} cancle={true} onTouchTap={onCancel}/></ListGroupItem>
						</ListGroup>
					</Col>
					</Row>

		 </div>);
	}
}