import React from 'react';
import {
	reduxForm,
	formValueSelector
} from 'redux-form';
import {KrField,Grid,Row,Button,ListGroup,ListGroupItem,Loading,Table,TableHeader,TableHeaderColumn,TableBody
	,TableRow,TableRowColumn,TableFooter,Tooltip} from 'kr-ui';
import './index.less';
import State from './State';
import {
	observer
} from 'mobx-react';
@ observer
export default class EquipmentSearch extends React.Component{
	constructor(props){
		super(props);
		this.state={
			
		}
	}
	componentWillMount() {
	}

	onOperation=()=>{

	}

	componentWillReceiveProps(nextProps){
	}

	componentDidMount(){
	}
	closeDialog=()=>{
		State.openSearchEquipment= false;
	}

	//操作相关
	onOperation=(type, itemDetail)=>{
		this.setState({
			itemDetail
		});
		if (type == 'add') {

			var param_hardware = itemDetail.hardwareId;
			State.addEquipment(param_hardware);
			
		}
		
		
	}
	
	render(){
		
		return (
			<div className="seconde-dialog">

				<img src={require("./images/closeIMG.svg")} className="close-dialog" onClick={this.closeDialog}/>
				<h1>设备搜索</h1>
				<div className="detail-list-equipment search-equipment">
					
					<Table
			            className="member-list-table"
			            ajax={true}
			            onProcessData={(state)=>{
			              return state;
			             }}
			            onOperation={this.onOperation}
			            exportSwitch={false}
			            ajaxFieldListName='items'
			            ajaxUrlName='equipmentList'
			            ajaxParams={State.searchEquipmentParam}
			            onPageChange={this.onPageChangeFun}
			            displayCheckbox={false}
			            onSelect={this.onSelcet}
			          >
			            <TableHeader>
			              	<TableHeaderColumn>社区名称</TableHeaderColumn>
			              	<TableHeaderColumn>展示标题</TableHeaderColumn>
				            <TableHeaderColumn>门编号</TableHeaderColumn>
				            <TableHeaderColumn>智能硬件ID</TableHeaderColumn>
				            <TableHeaderColumn>类型</TableHeaderColumn>
				            <TableHeaderColumn>厂商</TableHeaderColumn>
				            <TableHeaderColumn>属性</TableHeaderColumn>
				            <TableHeaderColumn>是否上线</TableHeaderColumn>
			                <TableHeaderColumn>连接状态</TableHeaderColumn>
			                <TableHeaderColumn>操作</TableHeaderColumn>
			          	</TableHeader>
			          	<TableBody >
				            <TableRow>
				            	<TableRowColumn name="communityName"></TableRowColumn>
								<TableRowColumn style={{width:160,overflow:"visible"}} name="showTitle" component={(value,oldValue)=>{
		                            var TooltipStyle=""
		                            if(value.length==""){
		                              TooltipStyle="none"

		                            }else{
		                              TooltipStyle="block";
		                            }
		                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
		                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
		              			}} ></TableRowColumn>
		              			<TableRowColumn name="deviceCode" component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
				            	<TableRowColumn name="hardwareId" style={{width:300}}></TableRowColumn>
								<TableRowColumn name="typeName" component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="maker" component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="propertyName" component={(value,oldValue)=>{
									if(value==""){
										value="-"
									}
									return (<span>{value}</span>)}}
								></TableRowColumn>
								<TableRowColumn name="enable"
					              component={(value,oldValue)=>{
					                var spanColorOnline="";
					                if(value=="OFFLINE"){
					                  value="未上线";
					                  spanColorOnline = "#ff6868";
					                }else if(value=="ONLINE"){
					                  value="已上线";
					                }
					                return (<span style={{color:spanColorOnline}}>{value}</span>)}}>
					            </TableRowColumn>
					            <TableRowColumn name="activityTypeId"
					              component={(value,oldValue)=>{
					                var spanColor = "";
					                if(value=="UNLINK"){
					                  value="未连接";
					                  spanColor = "#ff6868";
					                }else if(value=="LINK"){
					                  value="已连接";
					                }
					                return (<span style={{color:spanColor}}>{value}</span>)}}>
					            </TableRowColumn>
					            <TableRowColumn type="operation"> 
									<Button  label="添加"  type="operation" operation="add"/>
					            </TableRowColumn>
								
				            </TableRow>
			            </TableBody>
			            <TableFooter></TableFooter>
			        </Table>
				</div>
				<img src={require("./images/selectOne.svg")} className="end-img"/>
				<div className="btn-div">
					<Button label="关闭" onTouchTap={this.closeDialog}/>
				</div>
				
		  	</div>
		);
	}
}











