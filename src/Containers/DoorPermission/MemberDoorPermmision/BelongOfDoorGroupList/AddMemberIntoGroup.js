

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
import warning from "../images/warning.svg";
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

	confirmAddMemberToGroup=()=>{
		
		let {confirmAddMemberToGroup}= this.props;
		confirmAddMemberToGroup && confirmAddMemberToGroup();
	}
	
	closeAddMemberToGroup=()=>{
		State.openAddTipDialog = false;
	}

	render() {
        let {memberDetailInfo,groupDetail} =this.props;
        
		return (
		    <div style={{marginTop:20}}>
					<p style={{textAlign:"center",color:"#333333",fontSize:14}}>确认要将{memberDetailInfo.companyInfo && memberDetailInfo.companyInfo.mbrName}加入{groupDetail.name}吗？</p>
					<p style={{textAlign:"center",color:"#333333",fontSize:12,color:"#ff6868"}}>
						<img src={warning} style={{width:15,verticalAlign: "top",  marginRight: 4}}/>
						<span>将会员加入该组后,该会员将拥有该组的门禁权限</span>
					</p>
					<Grid style={{marginTop:30,marginBottom:'4px'}}>
						<Row>
							<ListGroup>
								<ListGroupItem style={{width:170,textAlign:'right',padding:0,paddingRight:15}}>
								<Button  label="确定" type="submit" onClick={this.confirmAddMemberToGroup} />
								</ListGroupItem>
								<ListGroupItem style={{width:170,textAlign:'left',padding:0,paddingLeft:15}}>
								<Button  label="取消" type="button"  cancle={true} onTouchTap={this.closeAddMemberToGroup} />
								</ListGroupItem>
							</ListGroup>
						</Row>
					</Grid>
				</div>
		);

	}

}

