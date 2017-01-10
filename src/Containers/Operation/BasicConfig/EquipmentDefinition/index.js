import React, {
  Component
} from 'react';
import {
  Title,
  DatePicker,
  Form,
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
  DotTitle,
  BraceWidth,
  SelfAdaption,
  LineText,
  SplitLine,
  SearchForms,
  Dialog,
  Notify,
  Grid,
  ListGroup,
  ListGroupItem,
  Row
} from 'kr-ui';
import NewCreateDefinitionForm from './NewCreateDefinitionForm';
import EquipmentAdvanceQueryForm from './EquipmentAdvancedQueryForm';
import BatchUploadImageForm from './BatchUploadImageForm';
import EditEquipmentForm from "./EditEquipmentForm";
import FinishUploadImgForm from "./FinishUploadImgForm";
import {Actions,Store} from 'kr/Redux';
import './index.less';
import error2 from "./images/error2.png"
export default class EquipmentDefinition extends Component {
  // static contextTypes = {
  //   router: React.PropTypes.object.isRequired
  // }
  constructor(props, context) {
    super(props, context);
    // this.params = this.context.router.params;
    this.state = {
      openNewCreateDefinition: false,
      openEquipmentAdvancedQuery: false,
      openBatchUpload: false,
      openEditEquipment: false,
      openFinishUpload: true,
      content: '',
      filter: 'doorNum',
      openTipWarn : false,
      tipText:"",
      equipmentParams: {
        filter: "doorNum",
        content: ''
      }
    }
  }

  onLoaded=(response)=>{
    let list = response;
    this.setState({
      list
    })
  }
  //操作相关
  onOperation=(type, itemDetail)=>{
    this.setState({
      itemDetail
    });
    if (type == 'view') {
      window.open(`./#/member/MemberManage/${itemDetail.id}/detail/${itemDetail.companyId}`, itemDetail.id);
    } else if (type == 'edit') {
      this.openEditEquipmentDialog();
    }
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
  // 是否打开编辑
  openEditEquipmentDialog=()=>{
    this.setState({
      openEditEquipment : !this.state.openEditEquipment
    })
  }
  // 是否打开上传图片完成
  openFinishUploadDialog=()=>{
    this.setState({
      openFinishUpload : !this.state.openFinishUpload
    })
  }
  // 搜索
  onSearchSubmit=(value)=>{
    this.setState({
      filter: value.filter,
      content: value.content,
      equipmentParams: {
        filter: value.filter,
        content: value.content
      }
    })
  }
  // 高级查询重置
  onEquipmentAdvanceSearchReset=()=>{
    this.setState({
      filter: 'doorNum',
      content: '',
      equipmentParams: {
        filter: "doorNum",
        content: ''
      }
    })
  }
  // 设备高级查询提交
  onEquipmentAdvanceSearchSubmit=(values)=>{
    // console.log("values",values);
    // Store.dispatch(Actions.callAPI(),function(response){

    // })
    this.openEquipmentAdvancedQueryDialog();
  }
  // 提交---批量上传
  onBatchUpload=(values)=>{
    let _this = this;
    console.log("页面values",values);
    if(!values.communitys){
      _this.setState({
        openTipWarn : true,
        tipText :"请选择社区!"
      });
      return;
      setTimeout(function(){
        _this.setState({
          openTipWarn : false
        })
      },3000)
    }
    Store.dispatch(Actions.callAPI('membersChange',{},values)).then(function(response){});
  }
  // 提交---->新建
  onSubmitNewCreateEquipment=(values)=>{
    let _this = this;
    // Store.dispatch(Actions.callAPI('……',searchParamPosition))
    //   .then(function(response){
    //     _this.setState({
    //       openFinishUpload:!_this.state.openFinishUpload
    //     });
    //   })
  }
  render() {
    let {list,itemDetail,seleced,openTipWarn,tipText} = this.state;
    // if (!list.totalCount) {
    //   list.totalCount = 0;
    // }
    let options=[{
      label:"门编号",
      value:"doorNum"
    },{
      label:"硬件编号",
      value:"hardwareNums"
    }]
    // console.log("openTipWarn",openTipWarn)
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
                  <SearchForms onSubmit={this.onSearchSubmit}  
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
            exportSwitch={true}
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
              <TableRowColumn name="phone"
              component={(value,oldValue)=>{
                if(value==""){
                  value="-"
                }
                return (<span>{value}</span>)}}
              ></TableRowColumn>
              <TableRowColumn name="name"
              component={(value,oldValue)=>{
                if(value==""){
                  value="-"
                }
                return (<span>{value}</span>)}}
               ></TableRowColumn>
              <TableRowColumn name="wechatNick"
              component={(value,oldValue)=>{
                if(value==""){
                  value="-"
                }
                return (<span>{value}</span>)}}
              ></TableRowColumn>
              <TableRowColumn name="email"
              component={(value,oldValue)=>{
                if(value==""){
                  value="-"
                }
                return (<span>{value}</span>)}}
              ></TableRowColumn>
              <TableRowColumn name="jobName"
              component={(value,oldValue)=>{
                if(value==""){
                  value="-"
                }
                return (<span>{value}</span>)}}
              ></TableRowColumn>
              <TableRowColumn name="cityName"
              component={(value,oldValue)=>{
                if(value==""){
                  value="-"
                }
                return (<span>{value}</span>)}}
              ></TableRowColumn>
              <TableRowColumn name="companyName"
              component={(value,oldValue)=>{
                if(value==""){
                  value="-"
                }
                return (<span>{value}</span>)}}
              ></TableRowColumn>
              <TableRowColumn name="registerName"
              component={(value,oldValue)=>{
                if(value==""){
                  value="-"
                }
                return (<span>{value}</span>)}}></TableRowColumn>
              <TableRowColumn name="registerTime" type="date" format="yyyy-mm-dd"></TableRowColumn>
              <TableRowColumn type="operation">
                  <Button label="编辑"  type="operation" operation="edit"/>
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
            detail={itemDetail}
            onSubmitOpenNew= {this.onSubmitOpenNew}
            onSubmit = {this.onSubmitNewCreateEquipment}
          /> 
        </Dialog>
        <Dialog
          title="编辑设备"
          open={this.state.openEditEquipment}
          onClose={this.openEditEquipmentDialog}
          contentStyle={{width:687}}
        >
          <EditEquipmentForm 
            onSubmit={this.onSubmitNewCreateEquipment} 
            params={this.params} 
            onCancel={this.openEditEquipmentDialog} 
            detail={itemDetail}
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
            detail={itemDetail} 
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
            onCancel= {this.openBatchUploadDialog}
            onSubmit= {this.onBatchUpload}
          />
        </Dialog>
        <Dialog
          title="上传图片完成"
          open={this.state.openFinishUpload}
          onClose={this.openFinishUploadDialog}
          contentStyle={{width:687}}
        >
          <FinishUploadImgForm 
            onCancel= {this.openFinishUploadDialog}
          />
        </Dialog>
      </div>
    );

  }

}

