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
	Drawer ,DialogInner
} from 'kr-ui';
import {Actions,Store} from 'kr/Redux';
import {Http,DateFormat} from 'kr/Utils';
import './index.less';

import SearchForm from './AuthoriazationEquipmentSearch';
import CancleAuthorization from './CancleAuthorization';
import BatchCancleAuthoriazation from './BatchCancleAuthoriazation';
import AllEquipmentListSearch from './AllEquipmentListSearch';


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
            memberDetailInfo :{},
            selectedListData : [],
            ids : '',
			getMemberAuthorizeEquipmentParams : {
                communityId : '',
                deviceId : '',
                doorCode : '',
                doorType : '',
                floor : '',
                granteeId : this.props.granteeId,
                granteeType : this.props.granteeType,
                title : '',
                date : null,
                page :1,
                pageSize:25,
            }
		}
	}

	componentDidMount(){

        
        let {granteeType,granteeId} = this.props;
        let {getMemberAuthorizeEquipmentParams} = this.state;
        
        if( !granteeId){
            return;
        }
        let newobj = {
            granteeId : granteeId
        }

        let objParams = Object.assign({},getMemberAuthorizeEquipmentParams,newobj);
        // this.setState({
        //     getMemberAuthorizeEquipmentParams : objParams
        // })
        
    }

    componentWillReceiveProps(nextProps){

        
        let {memberDetailInfo,granteeId,freshGroupEquipment}= this.props;

        let that =this;
        if(granteeId !==nextProps.granteeId || freshGroupEquipment!==nextProps.freshGroupEquipment){
            let obj = {
                    granteeId : nextProps.granteeId,
                    date:new Date()
                };
            let {getMemberAuthorizeEquipmentParams} = this.state;
            let params = Object.assign({},getMemberAuthorizeEquipmentParams,obj)
            this.setState({
                getMemberAuthorizeEquipmentParams : params
            })
        }
        
        
    }

    setInitailParams=()=>{

        let {granteeId} = this.props;
        let {getMemberAuthorizeEquipmentParams} = this.state;
        var obj = {granteeId :granteeId }
        var newObj = Object.assign({},getMemberAuthorizeEquipmentParams,obj)
        this.setState({
            getMemberAuthorizeEquipmentParams  :newObj
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
    
    
    cancleAuthorizationFun=()=>{

        State.showCancleAuthorization = !State.showCancleAuthorization;
    }

    confirmCancleAuthorization=()=>{

        let {itemDetail} = this.state;
        let that = this;
        let params = {ids : itemDetail.id}
        this.sendRequest(params);
    }


    refreshAuthoriazationEquipmentList=(param)=>{

        var now = new Date().getTime();
        let obj= {date:now};
        let {getMemberAuthorizeEquipmentParams} = this.state;
        let params = Object.assign({},getMemberAuthorizeEquipmentParams)
        params = Object.assign(params,obj)
        
        this.setState({
            getMemberAuthorizeEquipmentParams : params
        })
        if(param && param==true){
            this.openNewCreateAuthoriazationFun();
        }
        
    }

    openNewCreateAuthoriazationFun=()=>{
        State.openNewCreateAuthoriazation = !State.openNewCreateAuthoriazation;

    }

    submitSearchParams=(values)=>{

        let {granteeType,granteeId} = this.props;
        let {getMemberAuthorizeEquipmentParams,memberDetailInfo} = this.state;
        var timer = {date : new Date(),granteeId :granteeId ,granteeType : granteeType};
        var param = Object.assign({},values);
        param = Object.assign({},param,timer);
        this.setState({
            getMemberAuthorizeEquipmentParams : param
        })
    }

    renderBatchCancleAuthoriazation=()=>{
        let {memberDetailInfo} = this.props;
        if(memberDetailInfo.groupLevel=="CUSTOMER"){
            return null
        }
        return (

            <a 
                style={{width:105,height:30,background:'#499df1',color:'#fff',display:'inline-block',borderRadius:'4px',lineHeight:'30px',textAlign:'center',boxShadow:' 0 1px 6px rgba(0, 0, 0, 0.2), 0 1px 4px rgba(0, 0, 0, 0.2)',marginRight:20,cursor: 'pointer'}} 
                onClick={this.batchCancleAuthorization}
            >
                批量取消授权
             </a>

			
		)
    }

    batchCancleAuthorization=()=>{

        let {selectedListData} = this.state;
        let _this =this;
        if(selectedListData.length == 0){
            Message.warntimeout("请选择您要取消的设备","error");
        }else{
            _this.showBatchCancleAuthorizationFun();
        }

        
            
    }

    onSelect=(result,selectedListData)=>{
    
        var idsArr =[];
        for(var i=0;i<selectedListData.length;i++){
            idsArr.push(selectedListData[i].id)
        }

        var idsStr = idsArr.join(",");
        
        this.setState({
            selectedListData:selectedListData ,
            ids : idsStr
        })
    }

    showBatchCancleAuthorizationFun=()=>{
        State.showBatchCancleAuthorization = !State.showBatchCancleAuthorization;
    }

    confirmBatchCancleAuthorization=()=>{

        let {selectedListData,ids} = this.state;
        let params = {ids :ids};
        this.sendRequest(params);
        

    }

    sendRequest=(params)=>{
        
        let that= this;
        Http.request('deleteEquipmentFromGroupApi',{},params).then(function(response) {
            State.showBatchCancleAuthorization = false;
            State.showCancleAuthorization = false;
            Message.success("取消授权成功");
            that.refreshAuthoriazationEquipmentList();
        }).catch(function(err) {
            Message.error(err.message);
        });
    }



	render() {
        let {memberDetailInfo,doorTypeOptions,noShowAddNew,granteeType,granteeId,rootPage,deviceId} = this.props;
        let {getMemberAuthorizeEquipmentParams,itemDetail,selectedListData,ids} = this.state;
        return (
		    <div className="new-create-authoriazation">
                    {
                        (noShowAddNew && noShowAddNew==true)?null:
                        <div className="new-create-authoriazation-box">
                            <Button label="新增授权"  onTouchTap={this.openNewCreateAuthoriazationFun} className="button-list"/>
                        </div>
                    }
                   
                    <SearchForm submitSearchParams={this.submitSearchParams} doorTypeOptions={doorTypeOptions} deviceId={deviceId}/>
                    {
                        granteeId &&
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
                        displayCheckbox={true}
                        onSelect={this.onSelect}
                    >
                    <TableHeader>
                        <TableHeaderColumn>社区名称</TableHeaderColumn>
                        <TableHeaderColumn>屏幕显示标题</TableHeaderColumn>
                        <TableHeaderColumn>屏幕显示编号</TableHeaderColumn>
                        <TableHeaderColumn>智能硬件ID</TableHeaderColumn>
                        <TableHeaderColumn>门类型</TableHeaderColumn>
                        <TableHeaderColumn>授权时间</TableHeaderColumn>
                        <TableHeaderColumn>备注</TableHeaderColumn>
                        {
                            ((rootPage && rootPage=="personal")|| memberDetailInfo.groupLevel=="CUSTOMER")?null:<TableHeaderColumn>操作</TableHeaderColumn>
                        }
                        
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
                            name="serialNo" 
                            style={{width:"12%"}}
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

                        <TableRowColumn name="doorTypeName"
                        style={{width:"8%"}}
                        options={doorTypeOptions}
                        component={(value,oldValue)=>{
                            if(value==""){
                                value="-"
                            }
                            return (<span>{value}</span>)}}
                        ></TableRowColumn>


                        
                        <TableRowColumn 
                            name="startEndTime" 
                            style={{width:300}}
                            component={(value,oldValue,itemData)=>{
                                var timers = DateFormat(itemData.startAt,"yyyy-mm-dd HH:MM:ss")+" —— "+DateFormat(itemData.endAt,"yyyy-mm-dd HH:MM:ss")
                                var TooltipStyle=""
                                if(timers.length==""){
                                    TooltipStyle="none"

                                }else{
                                    TooltipStyle="block";
                                }
                                return (
                                    <div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'>
                                        <span className='tableOver' style={{width:"100%",display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap",fontSize:12}} >
                                            {timers}
                                        </span>
                                        <Tooltip offsetTop={5} place='top'>
                                            <span  className="start-end">{timers}</span>
                                        </Tooltip>
                                    </div>)
                            }} >
                        </TableRowColumn>

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
                                <Tooltip offsetTop={5} place='top'>
								<span style={{display: 'inline-block',minWidth: 200,wordWrap: 'break-word',wordBreak: "break-all",whiteSpace: 'normal'}}>
                                {value}
                                </span>
                                </Tooltip></div>)
                        }} ></TableRowColumn>

                        {
                                ((rootPage && rootPage=="personal")||memberDetailInfo.groupLevel=="CUSTOMER")?null:
                                <TableRowColumn type="operation" style={{width:"6%",overflow:"visible"}} >
                                
                                    <Button  label="取消授权"  type="operation" operation="cancleAuthorization"/>
                                    
                                </TableRowColumn>

                        }
                        

                    </TableRow>
                    
                    </TableBody>
                    
                    <TableFooter renderOther={this.renderBatchCancleAuthoriazation}>
                    </TableFooter>

                    
					</Table>
                    }

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

                    <Dialog
			          title="批量取消授权"
			          open={State.showBatchCancleAuthorization}
			          onClose={this.showBatchCancleAuthorizationFun}
			          contentStyle={{width:425}}
			        >
			          <BatchCancleAuthoriazation
			            onCancel={this.showBatchCancleAuthorizationFun}
                        confirmBatchCancleAuthorization = {this.confirmBatchCancleAuthorization}
                        itemDetail = {itemDetail}
                        memberDetailInfo={memberDetailInfo}
			          />
			        </Dialog>

                    <DialogInner 
                        title="设备列表"
			        	open={State.openNewCreateAuthoriazation}
                        onClose = {this.openNewCreateAuthoriazationFun}
                        noMaxHeight = {true}
                        bodyStyle={{width:962,height:465,overflow:"scroll"}}
                        contentStyle={{width:1016,height:545}}
					>
                    
                        
                    <AllEquipmentListSearch 
                        memberDetailInfo={memberDetailInfo} 
                        refreshAuthoriazationEquipmentList={this.refreshAuthoriazationEquipmentList} 
                        doorTypeOptions={doorTypeOptions} 
                        granteeType={granteeType} 
                        granteeId={granteeId}
                    />
                    
			        </DialogInner>

			</div>
		);

	}

}
