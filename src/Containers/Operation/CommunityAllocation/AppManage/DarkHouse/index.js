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
			itemDetail: '',
			openRelease: false,
			openAdd: false,
			newPage:1,
		}
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
	//打开查看日志
	openRelease = () => {
		this.setState({
			openRelease: !this.state.openRelease
		})
	}
	onReleaseSubmit = () => {
		let {
			itemDetail
		} = this.state;
		var _this = this;
		Store.dispatch(Actions.callAPI('deleteUser', {
			userId: itemDetail.id
		})).then(function(response) {
			Message.success('删除成功');
			_this.changeP();
			_this.openDeleteDialog();
		}).catch(function(err) {
			_this.openDeleteDialog();
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
				<Section title="帖子审核" >
	        		<Table
							style={{marginTop:10}}
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
									<Button label="提前释放"  type="operation" operation="release"/>
									<Button label="加刑"  type="operation" operation="add"/>
							</TableRowColumn>
						 </TableRow>
					</TableBody>
					<TableFooter></TableFooter>
					</Table>
				</Section>

				<Dialog
					title="查看"
					modal={true}
					open={this.state.openRelease}
					onClose={this.openRelease}
					contentStyle={{width:443,height:236}}
					 >
						          <div style={{marginTop:45}}>
						            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>确定要删除吗？</p>
						            <Grid style={{marginTop:60,marginBottom:'4px'}}>
						                  <Row>
						                    <ListGroup>
						                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
						                        <Button  label="确定" type="submit" onClick={this.confirmDelete} />
						                      </ListGroupItem>
						                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
						                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.openDeleteDialog} />
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
