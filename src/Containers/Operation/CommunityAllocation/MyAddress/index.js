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
      searchKey: params.content,
      searchType:params.filter,
      pageSize:15
    }
    if(!obj.searchType){
       Message.error('请选择搜索类型');
       return ;
    }
    State.setSearchParams(obj);
  }

   //查看或编辑
   onOperation=(type,itemDetail)=>{
      var id=itemDetail.id;
      if(type=='edit'){
        State.switchEditAddress();
      }
      if(type=='delete'){
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

    let searchFilter=[
      {
        label:'社区名称',
        value:'NAME'
      },
    ]
    

    return(

      <div className='community-list'>
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
                    <ListGroupItem><SearchForms placeholder='请输入关键字' searchFilter={searchFilter} onSubmit={this.onSearchSubmit}/></ListGroupItem>
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
              ajaxUrlName='communitySearch'
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
                      <TableRowColumn name="code"></TableRowColumn>
                      <TableRowColumn name="name"></TableRowColumn>
                      <TableRowColumn name="cityName"></TableRowColumn>
                      <TableRowColumn name="area"></TableRowColumn>
                      <TableRowColumn name="portalShow" options={[{label:'显示',value:'true'},{label:'不显示',value:'false'}]}></TableRowColumn>
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
                // id={this.state.id}
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

        {/*高级查询*/}
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


       </Section>

   </div>
   );
  }
}

export default CommunityList
