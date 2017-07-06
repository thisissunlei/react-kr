import React, { PropTypes } from 'react'; 

import {
	Http
} from "kr/Utils";

import {
	reduxForm,
	formValueSelector,
	change
} from 'redux-form';
import {
	KrField,
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Tooltip,
	Section,
	Grid,
	Row,
	Col,
	ListGroupItem,
	ListGroup,
	Dialog,
	SearchForms,
	KrDate,
	Message
} from 'kr-ui';
import './index.less';
import ViewLogs from './ViewLogs';
export default class DarkHouse extends React.Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			searchParams: {
				page: 1,
				pageSize: 15,
				timer:0,
			},
			itemDetail: {},
			openRelease: false,
			openAdd: false,
			newPage:1,
		}
	}
	componentWillReceiveProps(){
		var timer = new Date();
		this.setState({
            searchParams: {
				page: 1,
				pageSize: 15,
                timer: timer,
            }
        })
	}
	//操作相关
	onOperation = (type, itemDetail) => {
		this.setState({
			itemDetail
		});

		if (type == 'release') {
			this.openRelease();
		}else if (type == 'add') {
			this.openAdd();
		}
	}
	//打开提前释放
	openRelease = () => {
		this.setState({
			openRelease: !this.state.openRelease
		})
	}
	onReleaseSubmit = () => {
		let {
			itemDetail
		} = this.state;
		console.log(itemDetail);
		var _this = this;
		Http.request('punish-release', {},{
			id: itemDetail.id
		}).then(function(response) {
			Message.success('已提前释放');
			_this.changeP();
			_this.openRelease();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	//打开加刑
	openAdd = () => {
		this.setState({
			openAdd: !this.state.openAdd
		})
	}
	onAddSubmit = () => {
		let {
			itemDetail
		} = this.state;
		var _this = this;
		Http.request('punish-add', {},{
			id: itemDetail.id,
			time:_this.refs.addTimer.value,
		}).then(function(response) {
			Message.success('已加刑');
			_this.changeP();
			_this.openAdd();
		}).catch(function(err) {
			Message.error(err.message);
		});
	}
	//改变页码
    changeP=()=>{
        var timer = new Date();
        this.setState({
            searchParams: {
                    page: this.state.newPage,
                    timer: timer,
            }
        })
    }
    onPageChange=(page)=>{
        this.setState({
            newPage:page,
        })
    }
  

	render() {
	var logFlag = true;

		return (
			<div className="m-opera-logs">
	        		<Table
							style={{marginTop:50}}
							displayCheckbox={false}
							onLoaded={this.onLoaded}
							ajax={true}
							ajaxUrlName='punish-list'
							ajaxParams={this.state.searchParams}
							onOperation={this.onOperation}
							onPageChange={this.onPageChange}
							  >
						<TableHeader>
						<TableHeaderColumn>被处罚人</TableHeaderColumn>
						<TableHeaderColumn>举报类型</TableHeaderColumn>
						<TableHeaderColumn>处罚</TableHeaderColumn>
						<TableHeaderColumn>处罚时间</TableHeaderColumn>
						<TableHeaderColumn>操作</TableHeaderColumn>
					</TableHeader>

					<TableBody>
						<TableRow>
							<TableRowColumn name="punishedName" ></TableRowColumn>
								<TableRowColumn name="type"></TableRowColumn>
								<TableRowColumn name="intro"></TableRowColumn>
							 <TableRowColumn name="time" type="date" component={(value)=>{
 								return (
 									<KrDate value={value} format="yyyy-mm-dd HH:MM:ss" />
 								)
 							}}></TableRowColumn>
							<TableRowColumn>
								<Button label="提前释放" operateCode="cluster_punish_release" type="operation" operation="release"/>
								<Button label="加刑"  operateCode="cluster_punish_inflict" type="operation" operation="add"/>
							</TableRowColumn>
						 </TableRow>
					</TableBody>
					<TableFooter></TableFooter>
					</Table>
				<Dialog
					title="提前释放"
					modal={true}
					open={this.state.openRelease}
					onClose={this.openRelease}
					contentStyle={{width:443,height:236}}
					 >
						          <div style={{marginTop:45}}>
						            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>确定要提前释放吗？</p>
						            <Grid style={{marginTop:60,marginBottom:'4px'}}>
						                  <Row>
						                    <ListGroup>
						                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
						                        <Button  label="确定" type="submit" onClick={this.onReleaseSubmit} />
						                      </ListGroupItem>
						                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
						                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.openRelease} />
						                      </ListGroupItem>
						                    </ListGroup>
						                  </Row>
						                </Grid>
						          </div>
					</Dialog>
					<Dialog
					title="加刑"
					modal={true}
					open={this.state.openAdd}
					onClose={this.openAdd}
					contentStyle={{width:443,height:236}}
					 >
						          <div style={{marginTop:45}}>
						            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>加刑时间
										<input ref="addTimer" type="text" className="add-timer" />小时
									</p>
						            <Grid style={{marginTop:40,marginBottom:'4px'}}>
						                  <Row>
						                    <ListGroup>
						                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
						                        <Button  label="确定" type="submit" onClick={this.onAddSubmit} />
						                      </ListGroupItem>
						                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
						                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.openAdd} />
						                      </ListGroupItem>
						                    </ListGroup>
						                  </Row>
						                </Grid>
						          </div>
					</Dialog>
			</div>
		);
	}

}
