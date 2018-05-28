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

import SearchAllEquipment from './SearchAllEquipment';
import AuthoriazationTime from './AuthoriazationTime';

import close from '../../images/close.svg';


import State from './State';
import PropsState from '../../State';
import ListState from '../State';

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
			getAllEquipmentParams : {
                communityId : '',
                deviceId : '',
                doorCode : '',
                doorType : '',
                floor : '',
                page : '',
                pageSize : 25,
                title : '',
                date : null
            }
		}
	}

	componentDidMount(){
        
    }


    onOperation=(type,itemDetail)=>{
        this.setState({
            itemDetail
        })
        if(type=="setAuthorizationTime"){
            this.setAuthorizationTime();
        }
        
    }
    
    
    cancleAuthorizationFun=()=>{

        State.showCancleAuthorization = !State.showCancleAuthorization;
    }

    confirmCancleAuthorization=()=>{

        let {itemDetail} = this.state;
        let that = this;
        Http.request('deleteEquipmentFromGroupApi',{},{ids : itemDetail.id}).then(function(response) {

            that.cancleAuthorizationFun();
            Message.success("取消授权成功");
            that.refreshPage();
        }).catch(function(err) {
            Message.error(err.message);
        });
    }


    refreshPage=()=>{

        var now = new Date().getTime();
        let obj= {date:now};
        let {getAllEquipmentParams} = this.state;
        let params = Object.assign({},getAllEquipmentParams)
        params = Object.assign(params,obj)
        
        this.setState({
            getAllEquipmentParams : params
        })
        
    }

    onOperation=(type,itemDetail)=>{
        this.setState({
            itemDetail
        })
        if(type=="cancleAuthorization"){
            this.cancleAuthorizationFun();
        }
        
    }


    setAuthorizationTime=()=>{
        State.openSetAuthorizationTimeDialog = !State.openSetAuthorizationTimeDialog;
    }

    submitSearch=(values)=>{
        let {getAllEquipmentParams} = this.state;
        let {memberDetailInfo} = this.props;
        var timer = {date : new Date()};
        var param = Object.assign({},values);
        param = Object.assign({},param,timer);
        this.setState({
            getAllEquipmentParams : param
        })
    }

    closeAddAuthoriazation=()=>{
        ListState.openNewCreateAuthoriazation = false;
    }
    



	render() {
        let {memberDetailInfo} = this.props;
        let doorTypeOptions = PropsState.doorTypeOptions;
        let {getAllEquipmentParams,itemDetail} = this.state;
		return (
		    <div className="all-equipment" style={{paddingTop:30}}>
                
                <Section title={`所有设备`} description="" >
                    <SearchAllEquipment submitSearchParams={this.submitSearch}/>
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
                        ajaxUrlName='doorGroupAllEquipmentApi'
                        ajaxParams={getAllEquipmentParams}
                        onPageChange={this.onPageChange}
                        displayCheckbox={false}
                    >
                    <TableHeader>
                        <TableHeaderColumn>社区名称</TableHeaderColumn>
                        <TableHeaderColumn>屏幕显示标题</TableHeaderColumn>
                        <TableHeaderColumn>屏幕显示编号</TableHeaderColumn>
                        <TableHeaderColumn>智能硬件ID</TableHeaderColumn>
                        <TableHeaderColumn>门类型</TableHeaderColumn>
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
                            style={{width:"12%"}}
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


                        <TableRowColumn 
                            name="memo" 
                            style={{width:"26%"}}
                            component={(value,oldValue,itemData)=>{
                            var TooltipStyle=""
                            if(value.length==""){
                                TooltipStyle="none"

                            }else{
                                TooltipStyle="block";
                            }
                                return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}} >{value}</span>
                                <Tooltip offsetTop={5} place='top'>
								<span style={{display: 'inline-block',minWidth: 200,wordWrap: 'break-word',wordBreak: "break-all",whiteSpace: 'normal'}}>
                              
                                    {value}
                                </span>
                                </Tooltip></div>)
                        }} ></TableRowColumn>

                        

                        <TableRowColumn type="operation" style={{width:"6%",overflow:"visible"}} >

                            <Button  label="授权"  type="operation" operation="setAuthorizationTime"/>

                            
                        </TableRowColumn>

                    </TableRow>
                    </TableBody>
					</Table>
                    

                    

                    <Dialog
			          title="新增授权"
			          open={State.openSetAuthorizationTimeDialog}
			          onClose={this.setAuthorizationTime}
			          contentStyle={{width:425}}
			        >
			          <AuthoriazationTime
			            onCancel={this.setAuthorizationTime}
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
