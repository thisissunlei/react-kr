import React from 'react';
import {DateFormat} from 'kr/Utils';
import {
  reduxForm,
} from 'redux-form';
import {
  observer
} from 'mobx-react';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
  Dialog,
  Grid,
  Section,
  Row,
  Col,
  Drawer,
  SearchForms,
  Button,
  KrField,
  KrDate,
  Title,
  ListGroup,
  ListGroupItem,
  Message
} from 'kr-ui';

import './index.less'
import State from './State';
import NewAddress from './NewAddress';
import EditAddress from './EditAddress';
import SearchUpperForm from './SearchUpperForm';
import AddGuide from './AddGuide';
import EditGuide from './EditGuide';


//todo:城市组件值不清空，后期补上
import cityDataState from "../../../../Components/KrField/CityComponent/State";
@observer
class CommunityList  extends React.Component{

  constructor(props,context){
    super(props, context);
    this.state={
      id:''
    }

  }

  componentDidMount(){
    
  }

   //新建开关
   openNewCreate=()=>{
      State.switchNewAddress();
   }
   //新建关闭
   cancelAddCommunity=()=>{
      State.switchNewAddress();
   }
  
   //查询
  onSearchSubmit=(params)=>{
      let obj = {
        page:1, 
        pageSize:15,
        communityName:params.content,
      }
    State.setSearchParams(obj);
  }

   //查看或编辑
   onOperation=(type,itemDetail)=>{
      State.editId = itemDetail.id;
      console.log('index---edit--id')
      

      if(type=='edit'){
        State.switchEditAddress();
      }
      if(type=='delete'){
        State.deleteAddcommunityId = itemDetail.communityId;
        State.isOpenDeleteDialog();
      }
   }

   //编辑取消
   switchEditList=()=>{
       State.switchEditAddress();
   }

   openDeleteDialog=()=>{
      State.openDeleteDialog();
   }


  whiteClose=()=>{
    State.closeAllDialog();
  }

  
  


  render(){

    
    

    return(

      <div className='my-address-list'>
        <Title value="我的地点"/>
        <Section title="我的地点" description="" style={{marginBottom:-5,minHeight:910}}>
        <Row style={{marginBottom:21,position:'relative',zIndex:5}}>

                <Col
               style={{float:'left'}}
             >
                  <Button
                      label="新建地点"
                      type='button'
                      onTouchTap={this.openNewCreate}
                  />
            </Col>

                      <Col  style={{marginTop:0,float:"right",marginRight:-10}}>
                  <ListGroup>
                    <ListGroupItem><SearchForms placeholder='请输入社区名称'  onSubmit={this.onSearchSubmit}/></ListGroupItem>
                  </ListGroup>
                </Col>

            </Row>

           <Table
              style={{marginTop:8}}
              ajax={true}
              onOperation={this.onOperation}
              displayCheckbox={true}
              exportSwitch={false}
              ajaxParams={State.searchParams}
              ajaxUrlName='myAddressList'
              ajaxFieldListName="items"
            >
                <TableHeader>
                  
                  <TableHeaderColumn>社区名称</TableHeaderColumn>
                  <TableHeaderColumn>Wifi帐号</TableHeaderColumn>
                  <TableHeaderColumn>Wifi密码</TableHeaderColumn>
                  <TableHeaderColumn>社区负责人</TableHeaderColumn>
                  <TableHeaderColumn>电话</TableHeaderColumn>
                  <TableHeaderColumn>操作</TableHeaderColumn>
                </TableHeader>

              <TableBody >
                    <TableRow>
                      <TableRowColumn name="communityName" 
                      component={(value,oldValue)=>{
                        if(value==""){
                          value="-"
                        }
                        return (<span>{value}</span>)}}
                      ></TableRowColumn>
                      <TableRowColumn name="wifiName"
                      component={(value,oldValue)=>{
                        if(value==""){
                          value="-"
                        }
                        return (<span>{value}</span>)}}
                      ></TableRowColumn>
                      <TableRowColumn name="wifiPwd"
                      component={(value,oldValue)=>{
                        if(value==""){
                          value="-"
                        }
                        return (<span>{value}</span>)}}
                      ></TableRowColumn>
                      <TableRowColumn name="managerName"
                      component={(value,oldValue)=>{
                        if(value==""){
                          value="-"
                        }
                        return (<span>{value}</span>)}}
                      ></TableRowColumn>
                      <TableRowColumn name="managerPhone" component={(value,oldValue)=>{
                        if(value==""){
                          value="-"
                        }
                        return (<span>{value}</span>)}}
                      ></TableRowColumn>
                      <TableRowColumn type="operation">
                          <Button label="编辑"  type="operation"  operation="edit" />
                          <Button label="删除"  type="operation"  operation="delete" />
                      </TableRowColumn>
                     </TableRow>
              </TableBody>
              <TableFooter></TableFooter>
            </Table>

          {/*新建*/}
          <Drawer
                open={State.openNewAddress}
                width={750}
                openSecondary={true}
                containerStyle={{top:60,paddingBottom:48,zIndex:20}}
                onClose={this.whiteClose}
              >
            <NewAddress
                onSubmit={this.onNewCommunitySubmit}
                onCancel={this.cancelAddCommunity}
                open={State.openNewAddress}
            />

          </Drawer>

          {/*编辑*/}
          <Drawer
                open={State.openEditAddress}
                width={750}
                openSecondary={true}
                onClose={this.whiteClose}
                containerStyle={{top:60,paddingBottom:48,zIndex:21}}
              >
            <EditAddress
                // onSubmit={this.onNewCommunitySubmit}
                // onCancel={this.switchEditList}
                // open={State.openEditAddress}
                // details={State.detailData}
            />

          </Drawer>
          {/*添加指南*/}
          <Drawer
                open={State.openAddGuide}
                width={750}
                // openSecondary={true}
                onClose={this.whiteClose}
                // containerStyle={{top:60,paddingBottom:48,zIndex:21}}
              >
            <AddGuide
                // onSubmit={this.onNewCommunitySubmit}
                // onCancel={this.switchEditList}
                // open={State.openEditAddress}
                // id={this.state.id}
            />
        </Drawer>
        {/*添加指南*/}
          <Drawer
                open={State.openEditGuide}
                width={750}
                // openSecondary={true}
                onClose={this.whiteClose}
                // containerStyle={{top:60,paddingBottom:48,zIndex:21}}
              >
            <EditGuide
                // onSubmit={this.onNewCommunitySubmit}
                // onCancel={this.switchEditList}
                // open={State.openEditAddress}
                // id={this.state.id}
            />
        </Drawer>

        {/*删除整条地点*/}
          <Dialog
          title="提示"
          open={State.openDeleteDialog}
          onClose={State.isOpenDeleteDialog}
          contentStyle={{width:443,height:236}}
          >
          <div style={{marginTop:45}}>
            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>确定删除吗？</p>
            <Grid style={{marginTop:60,marginBottom:'4px'}}>
                  <Row>
                    <ListGroup>
                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
                        <Button  label="确定" type="submit" onClick={State.confirmDelete} />
                      </ListGroupItem>
                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
                        <Button  label="取消" type="button"  cancle={true} onTouchTap={State.isOpenDeleteDialog} />
                      </ListGroupItem>
                    </ListGroup>
                  </Row>
                </Grid>
          </div>
        </Dialog>
        {/*删除单条社区指南数据*/}
        <Dialog
          title="提示"
          open={State.openDeleteGuideItemDialog}
          onClose={State.openDeleteGuideItemDialogFun}
          contentStyle={{width:443,height:236}}
          >
          <div style={{marginTop:45}}>
            <p style={{textAlign:"center",color:"#333333",fontSize:14}}>确定删除吗？</p>
            <Grid style={{marginTop:60,marginBottom:'4px'}}>
                  <Row>
                    <ListGroup>
                      <ListGroupItem style={{width:175,textAlign:'right',padding:0,paddingRight:15}}>
                        <Button  label="确定" type="button" onTouchTap={State.confirmDeleteGuideItem} />
                      </ListGroupItem>
                      <ListGroupItem style={{width:175,textAlign:'left',padding:0,paddingLeft:15}}>
                        <Button  label="取消" type="button"  cancle={true} onTouchTap={State.openDeleteGuideItemDialogFun} />
                      </ListGroupItem>
                    </ListGroup>
                  </Row>
                </Grid>
          </div>
        </Dialog>


       </Section>

   </div>
   );
  }
}

export default CommunityList
