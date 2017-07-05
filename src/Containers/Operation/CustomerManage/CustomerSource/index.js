import React,{Component} from 'react';
import {
    reduxForm,
    formValueSelector,
    initialize,
    change
} from 'redux-form';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
	TableFooter,
	Button,
	Section,
	Grid,
	Row,
	Col,
	Drawer,
	SearchForms,
	ListGroup,
	ListGroupItem,
	Tooltip,
	Message,
	Title,
} from 'kr-ui';

import './index.less';
import EditCustomerSource from './EditCustomerSource'
import NewCustomerSource from './NewCustomerSource'
export default class CustomerSource  extends Component{

	constructor(props,context){
		super(props, context);
		this.state = {
			isEdit : false,
			isNew : false,
			isLook : false,
			isDel : false,
			searchParams:{
				page:1,
				pageSize:15,
			}
		}
		
	}

	//新建提交数据和编辑数据的提交
	onCreateSubmit=(params)=> {

	}


	//导出事件
	onExport(values) {

		let idList = [];
		if (values.length != 0) {
			values.map((item, value) => {
				idList.push(item.id)
			})
		}
		var url = `/api/krspace-finance-web/finaccount/property/exportDatas?ids=${idList}`
		window.location.href = url;

	}

	//操作相关
	onOperation = (type,itemDetail) => {
		if(type == "edit"){
			this.editSwitch();
		}else if(type == "delete"){
			this.delSwitch();
		}
		// else if(type == 'look'){
		// 	this.lookSwitch();
		// }
           
    }
	//打开新建按钮
	openNew = () =>{
		this.newSwitch();
	}

	//编辑开关
	editSwitch = () => {
	
		let {isEdit} = this.state;
		this.setState({
			isEdit : !isEdit,
		})
		
	}
	//新建开关
	newSwitch = () => {
		let {isNew} = this.state;
		this.setState({
			isNew : !isNew,
		})
	}
	//查看开关
	lookSwitch = () => {
		let {isLook} = this.state;
		this.setState({
			isLook : !isLook
		})
	}
	//删除确定的开关
	delSwitch = () =>{
		let {isDel} = this.state;
		this.setState({
			isDel : !isDel
		})
	}
	//搜索功能
	onSearchSubmit(searchParams) {

	}
	//高级搜索功能点击确定
	onSearchUpperForm=(searchParams)=>{

	}
	//新建
	openNewCreateDialog=()=> {
		
	}
    //高级搜索
	openSearchUpperFormDialog=()=> {
		
	}
	allClose = () =>{
		this.setState({
			isEdit : false,
			isNew : false,
			isDel : false,
			// isLook : false,
		})
	}


	render(){
		const {isEdit,isNew} = this.state;

		return(
			<div className="customer-source">
			    <Title value="客户来源配置"/>

					<Section title="客户来源配置" description="" style={{minHeight:"900px"}}>
							<Grid style={{marginBottom:22,marginTop:2}}>
								<Row >
									<Col md={4} align="left"> <Button label="新建" type='button' joinEditForm onTouchTap={this.openNew}  /> </Col>
									<Col md={8} align="right" style={{marginTop:0}}>
										<ListGroup>
											<ListGroupItem> <SearchForms onSubmit={this.onSearchSubmit} onCancel={this.onSearchCancel}/></ListGroupItem>
											{/*<ListGroupItem> <Button searchClick={this.openSearchUpperFormDialog}  type='search' searchStyle={{marginLeft:'20',marginTop:'5'}}/></ListGroupItem>*/}
										</ListGroup>
									</Col>
								</Row>
							</Grid>

                            <Table  style={{marginTop:10}}
                                    ajax={true}
                                    onOperation={this.onOperation}
                                    onProcessData={(state)=>{
                                            return state;
                                        }
                                    }
                                    displayCheckbox={false}
                                    onExport={this.onExport}
                                    ajaxParams={this.state.searchParams}

                                    ajaxFieldListName="items"
                                    ajaxUrlName='MouldGroupList'
                            >
                                <TableHeader>
                                    <TableHeaderColumn>来源编码</TableHeaderColumn>
                                    <TableHeaderColumn>来源名称</TableHeaderColumn>
                                    <TableHeaderColumn>子项</TableHeaderColumn>
                                    <TableHeaderColumn>佣金</TableHeaderColumn>
                                    <TableHeaderColumn>顺序</TableHeaderColumn>
                                    <TableHeaderColumn>是否全员开发</TableHeaderColumn>
                                    <TableHeaderColumn>创建人</TableHeaderColumn>
                                    <TableHeaderColumn>创建时间</TableHeaderColumn>
                                    <TableHeaderColumn>操作</TableHeaderColumn>

                                </TableHeader>

                                <TableBody >
                                    <TableRow >

                                        <TableRowColumn name="sort" ></TableRowColumn>
                                        <TableRowColumn name="templateNum"></TableRowColumn>
                                        <TableRowColumn name="creator"></TableRowColumn>
                                        <TableRowColumn name="creator"></TableRowColumn>
                                        <TableRowColumn name="creator"></TableRowColumn>
                                        <TableRowColumn name="creator"></TableRowColumn>
                                        <TableRowColumn name="creator"></TableRowColumn>
                                        <TableRowColumn name="creator"></TableRowColumn>
                                        <TableRowColumn>
                                            {/*<Button label="查看"  type="operation" operation="look"/>*/}											
                                            <Button label="编辑"  type="operation" operation="edit"/>
                                            <Button label="删除"  type="operation" operation="delete"/>
                                        </TableRowColumn>
                                                        
                                    </TableRow>
                                </TableBody>

                                <TableFooter></TableFooter>

                        </Table>
				</Section>
				{/*编辑*/}
				<Drawer
					open={isEdit}
					width={750}
					openSecondary={true}
					onClose={this.allClose}
					containerStyle={{top:60,paddingBottom:228,zIndex:20}}
				>
					<EditCustomerSource onSubmit = {this.editSubmit} onCancel = {this.editSwitch}/>
				</Drawer>

				{/*新建*/}
				<Drawer
					open={isNew}
					width={750}
					openSecondary={true}
					onClose={this.allClose}
					containerStyle={{top:60,paddingBottom:228,zIndex:20}}
				>
					<NewCustomerSource onSubmit = {this.newSubmit} onCancel = {this.newSwitch}/>
				</Drawer>
			</div>
		);
	}

}
