import React, {
  Component
} from 'react';
import {
  Title,
  KrField,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
  Button,
  Section,
  SearchForms,
  Dialog,
  Grid,
  ListGroup,
  ListGroupItem,
  Row,
  Message,
  Tooltip
} from 'kr-ui';
import NewCreateDefinitionForm from './NewCreateDefinitionForm';
import EquipmentAdvanceQueryForm from './EquipmentAdvancedQueryForm';
import BatchUploadImageForm from './BatchUploadImageForm';
import EditEquipmentForm from "./EditEquipmentForm";
import FinishUploadImgForm from "./FinishUploadImgForm";
import SingleUploadImgForm from "./SingleUploadImgForm";
import {Actions,Store} from 'kr/Redux';
import './index.less';
import error2 from "./images/error2.png"
export default class EquipmentDefinition extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      openNewCreateDefinition: false,
      openEquipmentAdvancedQuery: false,
      openBatchUpload: false,
      openEditEquipment: false,
      openFinishUpload: false,
      onLineOpen:false,
      openOffline :false,
      openSingleUpload: false,
      
      singleRequestURI :'',
      filter: 'deviceCode',
      content: '',
      openTipWarn : false,
      tipText:"",
      onLined : false,
      timer :'',
      itemDetail : {},
      equipmentParams: {
        filter: "deviceCode",
        content: '',
        page : 1,
        pageSize: 15
      },
      onlineOfflineParams:{}
    }
  }
  onLoaded=(response)=>{
    let list = response;
    this.setState({
      list
    })
  }
  //操作相关
  onOperation=(itemDetail)=>{
    this.setState({
      itemDetail
    });
  }
  // 是否打开上线确认窗口
  openOnLineDialog=()=>{
    this.setState({
      onLineOpen : !this.state.onLineOpen
    })
  }
  // 是否打开下线确认窗口
  openOffLineDialog=()=>{
    this.setState({
      openOffline : !this.state.openOffline
    })
  }
  // 是否打开单张上传图片
  openSingleUploadDialog=(itemDetail)=>{
    this.setState({
      openSingleUpload : !this.state.openSingleUpload,
      itemDetail : itemDetail
    })
  }
  // 是否打开新增设备定义
  openNewCreateDefinitionDialog=()=>{
    this.setState({
      openNewCreateDefinition:!this.state.openNewCreateDefinition
    })
  }
  // 是否打开高级搜索
  openEquipmentAdvancedQueryDialog=()=>{
    this.setState({
    openEquipmentAdvancedQuery : !this.state.openEquipmentAdvancedQuery
    })
  }
  // 是否打开批量上传图片
  openBatchUploadDialog=()=>{
    this.setState({
      openBatchUpload : !this.state.openBatchUpload
    })
  }
  // 关闭批量上传
  closeBatchUpload=()=>{
    this.setState({
      openBatchUpload : false
    })
  }
  // 是否打开编辑
  openEditEquipmentDialog=(item)=>{
    this.setState({
      openEditEquipment : !this.state.openEditEquipment,
      itemDetail : item

    })
  }
  // 是否打开上传图片完成
  openFinishUploadDialog=()=>{
    this.setState({
      openFinishUpload : !this.state.openFinishUpload
    })
  }
  // 最终必须打开成功/失败的Table
  openFinishUploadDialogLast=()=>{
    this.setState({
      openFinishUpload : true
    })
  }
  // 是否打开提示上传图片
  tipOpen=()=>{
    let _this =this;
    _this.setState({
      openTipWarn : true,
      tipText :"请上传图片!"
    });
    setTimeout(function(){
      _this.setState({
        openTipWarn : false
      })
    },3000)
  }
  // 是否打开提示选择社区
  tipCommunityOpen=()=>{
    let _this =this;
    _this.setState({
      openTipWarn : true,
      tipText :"请选择社区!"
    });
    setTimeout(function(){
      _this.setState({
        openTipWarn : false
      })
    },3000)
  }
  // 查询
  onSearchSubmit=(value)=>{
    if(value.filter == "deviceCode"){
      this.setState({
        filter: value.filter,
        content: value.content,
        equipmentParams: {
          deviceCode: value.content,
        }
      })
    }else{
      this.setState({
        filter: value.filter,
        content: value.content,
        equipmentParams: {
          hardwareId: value.content,
        }
      })
    }
  }

  // 高级查询重置
  onEquipmentAdvanceSearchReset=()=>{
    this.refs.inputFilter.refs.realInput.value = "";
    this.setState({
      filter: 'deviceCode',
      content: '',
      equipmentParams: {
        deviceCode: "",
      }
    })
  }
  // 设备高级查询提交
  onEquipmentAdvanceSearchSubmit=(values)=>{
    this.refs.inputFilter.refs.realInput.value = "";
    let _this = this;
    this.openEquipmentAdvancedQueryDialog();
    if(values.type=="hardwareId"){
      _this.setState({
        filter : "deviceCode",
        content : "",
        equipmentParams:{
          communityId :values.communityId || "",
          hardwareId : values.value || "",
          floor : values.floor || "",
          functionId : values.functionId || "",
          propertyId : values.propertyId || "",
          typeId : values.typeId|| ""
        }
      })
    }else{
      _this.setState({
        filter : "deviceCode",
        content : "",
        timer : new Date(),
        equipmentParams:{
          communityId :values.communityId || "",
          deviceCode : values.value || "",
          floor : values.floor || "",
          functionId : values.functionId || "",
          propertyId : values.propertyId || "",
          typeId : values.typeId|| ""
        }
      })
    }
    if(!values.value){

      this.refs.inputFilter.refs.realInput.value = "";
      _this.setState({
        filter:"deviceCode"
      })
    }
  }
  // 提交---批量上传
  onBatchUpload=(values)=>{
    let _this = this;
    if(!values.uploadImage){
      this.tipOpen();
      return;
    }
    if(!values.communitys){
      this.tipCommunityOpen();
      return;
    }
  }
  //校验门编号存在
  isDoorNumHas=()=>{
    let _this = this;
    _this.setState({
      openTipWarn : true,
      tipText :"门编号已经存在!"
    });
    setTimeout(function(){
      _this.setState({
        openTipWarn : false
      })
    },3000)
  }
  // 硬件ID已经存在，则提示窗口显示
  hardwareIdHas=()=>{
    let _this = this;
    _this.setState({
      openTipWarn : true,
      tipText :"硬件ID已经存在!"
    },function(){
    });
    setTimeout(function(){
      _this.setState({
        openTipWarn : false
      })
    },3000)
  }
  //  并没有选择社区 
  seleletZero=()=>{
    let _this = this;
    _this.setState({
      openTipWarn : true,
      tipText :"您选择的设备不存在，请重新选择!"
    });
    setTimeout(function(){
      _this.setState({
        openTipWarn : false
      })
    },3000)
  }
  // 提交---->新建
  onSubmitNewCreateEquipment=(values)=>{
    
    if(!values.locationId){
      values.locationId=0;
    }
    let _this = this;
    Store.dispatch(Actions.callAPI('equipmentNewCreateOrEdit',{},values))
      .then(function(response){
        if(values.id){
          Message.success("编辑设备成功");
        }else{
          Message.success("新增设备成功");
        }
        _this.setState({
          openEditEquipment : false,
          openNewCreateDefinition : false,
          equipmentParams: {
            deviceCode: "",
            page : 1,
            pageSize: 15,
            timer : new Date()
          }
        })
      }).catch(function(err){
        Message.error(err.message);
        _this.setState({
          openEditEquipment : false,
          openNewCreateDefinition : false,
          equipmentParams: {
            deviceCode: "",
            page : 1,
            pageSize: 15,
            timer : new Date()
          }
        })
      });
  }

  // 打开上线
  onlineOrOffline=(itemData)=>{
    this.openOnLineDialog();
    this.setState({
      onlineOfflineParams : {
        deviceId : itemData.id,
        status : "ONLINE"
      }
    })
  }
  // 打开下线
  offlineOrOnline=(itemData)=>{
    this.openOffLineDialog();
    this.setState({
      onlineOfflineParams : {
        deviceId : itemData.id,
        status : "OFFLINE"
      }
    })
  }
  // 最终确定确定上线
  confirmOnline=()=>{
    let onlineOfflineParams = this.state.onlineOfflineParams
    Store.dispatch(Actions.callAPI('onlineOrOffline',{},onlineOfflineParams))
      .then(function(response){
        Message.success("上线成功");
      }).catch(function(err){
        Message.error(err.message);
     });
    this.setState({
      onLineOpen : false,
      openOffline : false,
      equipmentParams: {
        filter: "deviceCode",
        content: '',
        page : 1,
        pageSize: 15,
        timer : new Date()
      },
    })
  }
  // 最终确定下线
  confirmOffline=()=>{
    let onlineOfflineParams = this.state.onlineOfflineParams
    Store.dispatch(Actions.callAPI('onlineOrOffline',{},onlineOfflineParams))
      .then(function(response){
        Message.success("下线成功");
      }).catch(function(err){
        Message.error(err.message);
     });
    this.setState({
      onLineOpen : false,
      openOffline : false,
      equipmentParams: {
        filter: "deviceCode",
        content: '',
        page : 1,
        pageSize: 15,
        timer : new Date()
      },
    })
  }
  render() {
    let {list,itemDetail,seleced,openTipWarn,tipText} = this.state;
    let options=[{
      label:"门编号",
      value:"deviceCode"
    },{
      label:"硬件编号",
      value:"hardwareId"
    }]
    return (
      <div style={{minHeight:'910',backgroundColor:"#fff"}}>
        <div className="uploadWarn" style={{display:openTipWarn?"block":"none"}}><img src={error2} className="tipImg"/>{tipText}</div>
        <Title value="设备定义 "/>
        <Section title={`设备定义`} description="" >
          <form name="searchForm" className="searchForm searchList" style={{marginBottom:10,height:45}}>
            <Grid>
              <Row>
                <ListGroup>
                  <ListGroupItem>
                    <Button label="新增定义"  onTouchTap={this.openNewCreateDefinitionDialog}/>
                  </ListGroupItem>
                  <ListGroupItem style={{marginLeft:10}}>
                    <Button label="批量上传图片"  onTouchTap={this.openBatchUploadDialog} style={{width:100,height:30}}/>
                  </ListGroupItem>
                  <ListGroupItem style={{float:'right'}}>
                    {/*高级查询*/}
                    <Button type='search' searchClick={this.openEquipmentAdvancedQueryDialog} 
                        searchStyle={{marginLeft:'30',marginTop:'10',display:'inline-block',float:'right'}}
                    />
                  <SearchForms onSubmit={this.onSearchSubmit}  ref = "inputFilter" 
                    style={{marginTop:5,zIndex:10000}} 
                    content={this.state.content} 
                    searchFilter={options}
                  />
                  </ListGroupItem>
                </ListGroup>
              </Row>
            </Grid>   
          </form>
          <Table
            className="member-list-table"
            style={{marginTop:10,position:'inherit'}}
            onLoaded={this.onLoaded}
            ajax={true}
            onProcessData={(state)=>{
              return state;
              }}
            onOperation={this.onOperation}
            exportSwitch={false}
            onExport={this.onExport}
            ajaxFieldListName='items'
            ajaxUrlName='equipmentList'
            ajaxParams={this.state.equipmentParams}
          >
            <TableHeader>
              <TableHeaderColumn>社区名称</TableHeaderColumn>
              <TableHeaderColumn>展示标题</TableHeaderColumn>
              <TableHeaderColumn>门编号</TableHeaderColumn>
              <TableHeaderColumn>智能硬件ID</TableHeaderColumn>
              <TableHeaderColumn>类型</TableHeaderColumn>
              <TableHeaderColumn>属性</TableHeaderColumn>
              <TableHeaderColumn>对应功能</TableHeaderColumn>
              <TableHeaderColumn>是否上线</TableHeaderColumn>
              <TableHeaderColumn>连接状态</TableHeaderColumn>
              <TableHeaderColumn>操作</TableHeaderColumn>
          </TableHeader>
          <TableBody style={{position:'inherit'}}>
              <TableRow displayCheckbox={true}>
              <TableRowColumn name="communityName"
              component={(value,oldValue)=>{
                if(value==""){
                  value="-"
                }
                return (<span>{value}</span>)}}
              ></TableRowColumn>
              



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

              


              <TableRowColumn name="deviceCode" style={{overflow:"hidden"}}
              component={(value,oldValue)=>{
                if(value==""){
                  value="-"
                }
                return (<span>{value}</span>)}}
              ></TableRowColumn>




            
              <TableRowColumn style={{width:160,overflow:"visible"}} name="hardwareId" component={(value,oldValue)=>{
                            var TooltipStyle=""
                            if(value.length==""){
                              TooltipStyle="none"

                            }else{
                              TooltipStyle="block";
                            }
                             return (<div style={{display:TooltipStyle,paddingTop:5}} className='financeDetail-hover'><span className='tableOver' style={{maxWidth:160,display:"inline-block",overflowX:"hidden",textOverflow:" ellipsis",whiteSpace:" nowrap"}}>{value}</span>
                              <Tooltip offsetTop={5} place='top'>{value}</Tooltip></div>)
              }} ></TableRowColumn>




            
              <TableRowColumn name="typeName"
              component={(value,oldValue)=>{
                if(value==""){
                  value="-"
                }
                return (<span>{value}</span>)}}
              ></TableRowColumn>
              <TableRowColumn name="propertyName"
              component={(value,oldValue)=>{
                if(value==""){
                  value="-"
                }
                return (<span>{value}</span>)}}
              ></TableRowColumn>
              <TableRowColumn name="functionName"
              component={(value,oldValue)=>{
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
                return (<span style={{color:spanColorOnline}}>{value}</span>)}}></TableRowColumn>
              <TableRowColumn name="activityTypeId"
              component={(value,oldValue)=>{
                var spanColor = "";
                if(value=="UNLINK"){
                  value="未连接";
                  spanColor = "#ff6868";
                }else if(value=="LINK"){
                  value="已连接";
                }
                return (<span style={{color:spanColor}}>{value}</span>)}}></TableRowColumn>
              <TableRowColumn type="operation" name="enable" options={[{label:'已上线',value:'ONLINE'},{label:'未上线',value:'OFFLINE'}]} 
             
              component={(value,oldValue,itemData)=>{
                  if(value=="未上线"){
                    return (
                      <span>
                      <Button label="上线"  type="operation" operation="online" onClick={this.onlineOrOffline.bind(this,itemData)}/>
                      <Button label="编辑"  type="operation" operation="edit" onClick={this.openEditEquipmentDialog.bind(this,itemData)}/>
                      <Button label="上传图片"  type="operation" operation="singleUpload" onClick={this.openSingleUploadDialog.bind(this,itemData)}/>
                      </span>
                    )
                  }
                  if(value=="已上线"){
                    return (
                      <span>
                      <Button label="下线"  type="operation" operation="offline" onClick={this.offlineOrOnline.bind(this,itemData)}/>
                      <Button label="上传图片"  type="operation" operation="singleUpload" onClick={this.openSingleUploadDialog.bind(this,itemData)}/>
                      </span>
                    )
                  }
              }}>    
              </TableRowColumn>
             </TableRow>
          </TableBody>
          <TableFooter></TableFooter>
          </Table>
        </Section>
        <Dialog
          title="新增设备定义"
          open={this.state.openNewCreateDefinition}
          onClose={this.openNewCreateDefinitionDialog}
          contentStyle={{width:687}}
        >
          <NewCreateDefinitionForm  
            onCancel={this.openNewCreateDefinitionDialog} 
            style ={{paddingTop:'35px'}}
            onSubmit = {this.onSubmitNewCreateEquipment}
            isDoorNumHas= {this.isDoorNumHas}
            hardwareIdHas ={this.hardwareIdHas}
            saveAndNewCreate= {this.saveAndNewCreate}
          /> 
        </Dialog>
        <Dialog
          title="编辑设备"
          open={this.state.openEditEquipment}
          onClose={this.openEditEquipmentDialog}
          contentStyle={{width:687}}
        >
          <EditEquipmentForm 
            detail={itemDetail}
            onSubmit = {this.onSubmitNewCreateEquipment}
            isDoorNumHas= {this.isDoorNumHas}
            hardwareIdHas ={this.hardwareIdHas}
            saveAndNewCreate= {this.saveAndNewCreate}
            closeEditEquipment = {this.openEditEquipmentDialog}
          />
        </Dialog>
        <Dialog
          title="高级查询"
          open={this.state.openEquipmentAdvancedQuery}
          onClose={this.openEquipmentAdvancedQueryDialog}
          contentStyle={{width:687}}
        >
          <EquipmentAdvanceQueryForm 
            onSubmit={this.onEquipmentAdvanceSearchSubmit} 
            onReset = {this.onEquipmentAdvanceSearchReset}
            params={this.params} 
            onCancel={this.openEquipmentAdvancedQueryDialog} 
            onFilterState = {this.onFilterState}
            style={{marginTop:37}} 
            content={this.state.content} 
            filter={this.state.filter}
          />
        </Dialog>
        <Dialog
          title="批量上传图片"
          open={this.state.openBatchUpload}
          onClose={this.openBatchUploadDialog}
          contentStyle={{width:687}}
        >
          <BatchUploadImageForm 
            tipCommunityOpen = {this.tipCommunityOpen}
            tipOpen = {this.tipOpen}
            onCancel= {this.openBatchUploadDialog}
            onSubmit= {this.onBatchUpload}
            seleletZero ={this.seleletZero}
            closeBatchUpload = {this.closeBatchUpload}
            openFinishTable = {this.openFinishUploadDialogLast}
            finishUpload = {this.finishUpload}
          />
        </Dialog>
        <Dialog
          title="上传图片"
          open={this.state.openFinishUpload}
          onClose={this.openFinishUploadDialog}
          contentStyle={{width:687}}
        >
          <FinishUploadImgForm 
            closeUploadImg = {this.openFinishUploadDialog}
            onCancel= {this.openFinishUploadDialog}
          />
        </Dialog>
        <Dialog
          title="提示"
          open={this.state.onLineOpen}
          onClose={this.openOnLineDialog}
          contentStyle={{width:443,height:236}}
        >
          <div style={{marginTop:45}}>
            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>确定要上线吗？</p>
            <Grid style={{marginTop:60,marginBottom:'4px'}}>
                  <Row>
                    <ListGroup>
                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
                        <Button  label="确定" type="submit" onClick={this.confirmOnline} />
                      </ListGroupItem>
                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.openOnLineDialog} />
                      </ListGroupItem>
                    </ListGroup>          
                  </Row>
                </Grid>
          </div>
        </Dialog>
        <Dialog
          title="提示"
          open={this.state.openOffline}
          onClose={this.openOffLineDialog}
          contentStyle={{width:443,height:236}}
        >
          <div style={{marginTop:45}}>
            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>确定要下线吗？</p>
            <Grid style={{marginTop:60,marginBottom:'4px'}}>
                  <Row>
                    <ListGroup>
                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
                        <Button  label="确定" type="submit" onClick={this.confirmOffline} />
                      </ListGroupItem>
                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
                        <Button  label="取消" type="button"  cancle={true} onTouchTap={this.openOffLineDialog} />
                      </ListGroupItem>
                    </ListGroup>          
                  </Row>
                </Grid>
          </div>
        </Dialog>
        <Dialog
          title="上传图片"
          open={this.state.openSingleUpload}
          onClose={this.openSingleUploadDialog}
          contentStyle={{width:443}}
        >
          <SingleUploadImgForm 
            tipOpen={this.tipOpen}
            detail={itemDetail} 
            onCancel = {this.openSingleUploadDialog}
            openSingleUploadDialog ={this.openSingleUploadDialog}
          />
        </Dialog>
      </div>
    );

  }

}

