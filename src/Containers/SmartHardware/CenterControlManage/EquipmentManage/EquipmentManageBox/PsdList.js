
import React, {PropTypes} from 'react';
import {connect} from 'kr/Redux';
import {reduxForm,formValueSelector,change,initialize,arrayPush,arrayInsert,FieldArray,reset} from 'redux-form';
import {Actions,Store} from 'kr/Redux';
import {Http} from 'kr/Utils';


import {
	KrField,
	Grid,
	Row,
	ListGroup,
	ListGroupItem,
	Button,
	Notify,
	Table,TableHeader,TableHeaderColumn,TableBody
	,TableRow,TableRowColumn,TableFooter
} from 'kr-ui';
import State from './State';
import {
	observer,
	inject
} from 'mobx-react';
@observer



class PswdListForm extends React.Component{
	constructor(props,context){
		super(props,context);
		this.state={
			getPswListParams :{
				limit : 20,
				serialNo : State.itemDetail.serialNo
			}
		}
	}
	
	componentWillMount(){
		
	}


	openManagePsdFun=()=>{
		State.openManagePsd = !State.openManagePsd;
	}
	
	
	render(){
		
		const { error, handleSubmit, reset} = this.props;
		let {getPswListParams} = this.state;
		
		return(
			<div style={{padding:"45px 30px 0 30px"}}>
				<div  style={{marginBottom:10}}>
					<span style={{fontSize:18,color:"#499df1"}}>管理员密码列表 —— 设备ID:{State.itemDetail.serialNo || ""}，屏幕展示标题：{State.itemDetail.name||""}</span>
				</div>
			  	<Table
				ajax={true}
				onProcessData={(state)=>{
					return state;
					}}
				onOperation={this.onOperation}
				exportSwitch={false}
				ajaxFieldListName='items'
				ajaxUrlName='getManagerPsdUrl'
				ajaxParams={getPswListParams}
				displayCheckbox={false}
				>
					<TableHeader>
						<TableHeaderColumn>密码</TableHeaderColumn>
						<TableHeaderColumn>创建时间</TableHeaderColumn>
					</TableHeader>
					<TableBody >
						<TableRow>
							<TableRowColumn 
								style={{width:"50%"}}
								name="adminPwd">
							</TableRowColumn>
							<TableRowColumn 
								style={{width:"50%"}}
								name="ctime" 
								type="date" 
								format="yyyy-mm-dd HH:MM:ss" 
							>
							</TableRowColumn>
							
						</TableRow>
					</TableBody>
				</Table>
			    <Grid style={{marginTop:30,marginBottom:'4px'}}>
	                <Row>
	                    <ListGroup>
	                      <ListGroupItem style={{width:"100%",textAlign:'center',padding:0}}>
	                        <Button  label="确定" type="button"  cancle={true} onTouchTap={this.openManagePsdFun} />
	                      </ListGroupItem>
	                    </ListGroup>
	                </Row>
	            </Grid>
	        </div>
		);
	}
}
const validate = values=>{
	const errors={};
	// if(!values.communityId){
	// 	errors.communityId = '社区名称为必填项';
	// }
	return errors;
}
export default PswdListForm = reduxForm({
	form: 'PswdListForm',
	validate,
})(PswdListForm);
