import React from 'react';
import {
	Title,
	Table,TableBody,TableHeader,TableHeaderColumn,TableRow,TableRowColumn,TableFooter,
	Button,
	Section,
	Dialog,
	Message,
	Grid,Row,
	ListGroup,ListGroupItem,
	Tooltip,
	Drawer ,
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http,DateFormat} from 'kr/Utils';
import './index.less';

import SearchForm from './SearchForm';
import CancleAuthorization from './CancleAuthorization';


import State from './State';
import PropsState from '../State';

import {
	observer,
	inject
} from 'mobx-react';
@observer

export default class CanOperationEquipment extends React.Component {

	constructor(props, context) {
        super(props, context);
        
		this.state = {
            itemDetail : {},
			getMemberAuthorizeEquipmentParams : {
                communityId : '',
                deviceId : '',
                doorCode : '',
                doorType : '',
                floor : '',
                granteeId : '',
                granteeType : 'USER',
                title : '',
                date : ''
            }
		}
	}

	componentDidMount(){
        this.setInitailParams();
    }

    setInitailParams=()=>{

        let {memberDetailInfo} = this.props;
        let {getMemberAuthorizeEquipmentParams} = this.state;
        var obj = {granteeId :memberDetailInfo.id }
        var newObj = Object.assign({},getMemberAuthorizeEquipmentParams,obj)
        this.setState({
            getMemberAuthorizeEquipmentParams  :newObj
        })
    }

    onOperation=(type,itemDetail)=>{
        this.setState({
            itemDetail
        })
        console.log("type",type);
        if(type=="cancleAuthorization"){
            this.cancleAuthorizationFun();
        }
        
    }
    
    
    cancleAuthorizationFun=()=>{

        State.showCancleAuthorization = !State.showCancleAuthorization;
    }

    confirmCancleAuthorization=()=>{

        let {itemDetail} = this.state;
        let that = this;
        Http.request('deleteEquipmentFromGroupApi',{ids : itemDetail.id}).then(function(response) {
            Message.success("取消授权成功");
            that.cancleAuthorizationFun();
            that.refreshPage();
        }).catch(function(err) {
            Message.error(err.message);
        });
    }


    refreshPage=()=>{
        console.log("刷新页面");
        let obj= {date:new Date()};
        let {getMemberAuthorizeEquipmentParams} = this.state;
        let params = Object.assign(getMemberAuthorizeEquipmentParams,obj)
        this.setState({
            getMemberAuthorizeEquipmentParams : params
        })
    }



    


	render() {
        let {memberDetailInfo} = this.props;
        let doorTypeOptions = PropsState.doorTypeOptions;
        var title = "授权给"+memberDetailInfo.name + "的设备";
        let {getMemberAuthorizeEquipmentParams,itemDetail} = this.state;
		return (
		    <div className="can-operate-equipment">
                <Section title={title} description="" >
                    <SearchForm/>
                    <Table
                        className="member-list-table"
                        style={{marginTop:10,position:'inherit'}}
                        onLoaded={this.onLoaded}
                        ajax={true}
                        onProcessData={(state)=>{
                            return state;
                            }}
                        exportSwitch={false}
                        onOperation={this.onOperation}
                        ajaxFieldListName='items'
                        ajaxUrlName='getGroupAuthorizeEquipmentApi'
                        ajaxParams={getMemberAuthorizeEquipmentParams}
                        onPageChange={this.onPageChange}
                        displayCheckbox={false}
                    >
                    <TableHeader>
                        <TableHeaderColumn>社区名称</TableHeaderColumn>
                        <TableHeaderColumn>屏幕显示标题</TableHeaderColumn>
                        <TableHeaderColumn>屏幕显示编号</TableHeaderColumn>
                        <TableHeaderColumn>智能硬件ID</TableHeaderColumn>
                        <TableHeaderColumn>门类型</TableHeaderColumn>
                        <TableHeaderColumn>授权时间</TableHeaderColumn>
                        <TableHeaderColumn>备注</TableHeaderColumn>
                        <TableHeaderColumn>操作</TableHeaderColumn>
                    </TableHeader>
                    <TableBody style={{position:'inherit'}}>
                        <TableRow>
                            
                        <TableRowColumn name="communityName"
                            style={{width:"12%"}}
                            
                        component={(value,oldValue)=>{
                            if(value==""){
                                value="-"
                            }
                            return (<span>{value}</span>)}}
                        ></TableRowColumn>

                        <TableRowColumn 
                            style={{width:"10%"}}
                            name="title" 
                            component={(value,oldValue,itemData)=>{
                            var TooltipStyle=""
                            if(value.length==""){
                                TooltipStyle="none"

                            }else{
                                TooltipStyle="block";
                            }
                                return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}} >{value}</span>
                                <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                        }} ></TableRowColumn>

                       

                        <TableRowColumn 
                            name="doorCode" 
                            style={{width:"10%"}}
                            component={(value,oldValue,itemData)=>{
                            var TooltipStyle=""
                            if(value.length==""){
                                TooltipStyle="none"

                            }else{
                                TooltipStyle="block";
                            }
                                return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}} >{value}</span>
                                <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                        }} ></TableRowColumn>

                        <TableRowColumn 
                            name="deviceId" 
                            style={{width:"16%"}}
                            component={(value,oldValue,itemData)=>{
                            var TooltipStyle=""
                            if(value.length==""){
                                TooltipStyle="none"

                            }else{
                                TooltipStyle="block";
                            }
                                return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}} >{value}</span>
                                <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
                        }} ></TableRowColumn>

                        <TableRowColumn name="doorType"
                        style={{width:"8%"}}
                        options={doorTypeOptions}
                        component={(value,oldValue)=>{
                            if(value==""){
                                value="-"
                            }
                            return (<span>{value}</span>)}}
                        ></TableRowColumn>


                        <TableRowColumn name="startEndTime"
                            style={{width:"32%"}}
                            
                        component={(value,oldValue,item)=>{
                            if(value==""){
                                value="-"
                            }
                            return (<span>{
                                DateFormat(item.startAt,"yyyy-mm-dd HH:MM:ss")+"-"+DateFormat(item.endAt,"yyyy-mm-dd HH:MM:ss")
                            }</span>)}}
                        ></TableRowColumn>

                        <TableRowColumn 
                            name="memo" 
                            component={(value,oldValue,itemData)=>{
                            var TooltipStyle=""
                            if(value.length==""){
                                TooltipStyle="none"

                            }else{
                                TooltipStyle="block";
                            }
                                return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}} >{value}</span>
                                <Tooltip offsetTop={5} place='top'><span  className="start-end">{value}</span></Tooltip></div>)
                        }} ></TableRowColumn>

                        

                        <TableRowColumn type="operation" style={{width:"6%",overflow:"visible"}} >

                            <Button  label="取消授权"  type="operation" operation="cancleAuthorization"/>
                            
                        </TableRowColumn>

                    </TableRow>
                    </TableBody>
					</Table>
                    

                    <Dialog
			          title="取消授权"
			          open={State.showCancleAuthorization}
			          onClose={this.cancleAuthorizationFun}
			          contentStyle={{width:425}}
			        >
			          <CancleAuthorization
			            onCancel={this.cancleAuthorizationFun}
                        confirmCancleAuthorization = {this.confirmCancleAuthorization}
                        itemDetail = {itemDetail}
                        memberDetailInfo={memberDetailInfo}
			          />
			        </Dialog>
                </Section>
			</div>
		);

	}

}
