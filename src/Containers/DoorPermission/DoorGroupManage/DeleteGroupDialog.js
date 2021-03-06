

import React from 'react';
import {
	Title,
	Button,
	Section,
	Dialog,
	Message,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Tooltip
} from 'kr-ui';
import warning from "./images/warning.svg";
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';
import './index.less';

import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class DeleteGroup extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			
		}
	}

	componentDidMount(){
		
	}

	confirmDelete=()=>{
		
		let {confirmDelete}= this.props;
		confirmDelete && confirmDelete();
	}
	
	closeDeleteGroup=()=>{
		State.openDeleteGroup = false;
	}

	render() {
		
		return (
		    <div style={{marginTop:20}}>
					<p style={{textAlign:"center",color:"#333333",fontSize:14}}>确认要删除吗？</p>
					<p style={{textAlign:"center",color:"#333333",fontSize:12,color:"#ff6868"}}>
						<img src={warning} style={{width:15,verticalAlign: "top",  marginRight: 4}}/>
						<span>删除组后将会解除组内成员的门禁权限</span>
					</p>
					<Grid style={{marginTop:30,marginBottom:'4px'}}>
						<Row>
							<ListGroup>
								<ListGroupItem style={{width:170,textAlign:'right',padding:0,paddingRight:15}}>
								<Button  label="确定" type="submit" onClick={this.confirmDelete} />
								</ListGroupItem>
								<ListGroupItem style={{width:170,textAlign:'left',padding:0,paddingLeft:15}}>
								<Button  label="取消" type="button"  cancle={true} onTouchTap={this.closeDeleteGroup} />
								</ListGroupItem>
							</ListGroup>
						</Row>
					</Grid>
				</div>
		);

	}

}

