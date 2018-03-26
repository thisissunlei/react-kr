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
// import NewCreateAuthoriazationToPerson from './NewCreateAuthoriazationToPerson';
import AllEquipmentListBox from './AllEquipmentListBox';


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
			getMemberAuthorizeEquipmentParams : {
                communityId : '',
                deviceId : '',
                doorCode : '',
                doorType : '',
                floor : '',
                granteeId : '',
                granteeType : this.props.granteeType,
                title : '',
                date : null
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
        this.setState({
            getMemberAuthorizeEquipmentParams : objParams
        })
        
    }

    componentWillReceiveProps(nextProps){

        let {memberDetailInfo,granteeId}= this.props;

        let that =this;
        if(granteeId !==nextProps.granteeId){
        
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
        Http.request('deleteEquipmentFromGroupApi',{ids : itemDetail.id}).then(function(response) {
            Message.success("取消授权成功");
            that.cancleAuthorizationFun();
            that.refreshPage();
        }).catch(function(err) {
            Message.error(err.message);
        });
    }


    refreshPage=()=>{

        var now = new Date().getTime();
        let obj= {date:now};
        let {getMemberAuthorizeEquipmentParams} = this.state;
        let params = Object.assign({},getMemberAuthorizeEquipmentParams)
        params = Object.assign(params,obj)
        
        this.setState({
            getMemberAuthorizeEquipmentParams : params
        })
        
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



	render() {
        let {memberDetailInfo,doorTypeOptions,noShowAddNew} = this.props;
        let {getMemberAuthorizeEquipmentParams,itemDetail} = this.state;
		return (
		    <div className="new-create-authoriazation">
                    {
                        (noShowAddNew && noShowAddNew==true)?null:
                        <div className="new-create-authoriazation-box">
                            <Button label="新增授权"  onTouchTap={this.openNewCreateAuthoriazationFun} className="button-list"/>
                        </div>
                    }
                   
                    <SearchForm submitSearchParams={this.submitSearchParams} doorTypeOptions={doorTypeOptions}/>
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

                    <Drawer 
			        	open={State.openNewCreateAuthoriazation}
			        	onClose = {this.openNewCreateAuthoriazationFun}
					    width={"90%"} 
					    openSecondary={true} 
					>
                   
			          <AllEquipmentListBox memberDetailInfo={memberDetailInfo} refreshPage={this.refreshPage}/>
			        </Drawer>

                    {/*  */}
                {/* </Section> */}
			</div>
		);

	}

}
