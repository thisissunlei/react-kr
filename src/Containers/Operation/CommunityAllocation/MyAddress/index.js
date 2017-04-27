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
import NewCommunityList from './NewCommunityList';
import EditCommunityList from './EditCommunityList';
import SearchUpperForm from './SearchUpperForm';
import WatchCommunityList from './WatchCommunityList';
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
    State.searchDataHere();

  }

   //新建社区开关
   openAddCommunity=()=>{
      cityDataState.setCity("请选择");
      State.searchDataHere();
      State.switchNewCommunityList();
   }
   //新建社区关闭
   cancelAddCommunity=()=>{
      State.switchNewCommunityList();
   }
   //新建社区提交
   onNewCommunitySubmit=(value)=>{
        value = Object.assign({},value);
        //亮点开始
        var brightsStr=[];
        if(value.bright_basic){
         value.bright_basic.map((item)=>{
              if(!item){
                return ;
            }
             let {type,brightPoints} = item;
             let bright = Object.assign({},{type,brightPoints})
             brightsStr.push(bright);
         });
       }

        if(value.bright_service){
           value.bright_service.map((item)=>{
          if(!item){
             return ;
          }
          let {type,brightPoints} = item;
             let bright = Object.assign({},{type,brightPoints})
             brightsStr.push(bright)
         })
        }

        if(value.bright_special){
          value.bright_special.map((item,index)=>{
         if(!item){
            return ;
          }
          let {type,brightPoints} = item;
             let bright = Object.assign({},{type,brightPoints})
             brightsStr.push(bright)
         })
        }

        if(value.bright_bright){
          value.bright_bright.map((item,index)=>{
          if(!item){
             return ;
           }
             let {type,brightPoints} = item;
             let bright = Object.assign({},{type,brightPoints})
             brightsStr.push(bright)
         })
        }

        if(value.brightPorts){
          brightsStr.push({type:'TRANSPORTATION',brightPoints:value.brightPorts.brightPoints});
        }
        if(value.brightRound){
          brightsStr.push({type:'PERIMETER',brightPoints:value.brightRound.brightPoints});
        }
        if(brightsStr.length){
           value.brightsStr=JSON.stringify(brightsStr);
        }
        //亮点结束



        //楼层开始
        value.wherefloorsStr=JSON.stringify(value.wherefloors);
        //楼层结束



        //工位开始
        if(value.porTypes){
           value.porTypesStr=JSON.stringify(value.porTypes);
        }
        //工位结束


       //图片开始
       var photosStr=[];
       if(value.photosStr_first){
          value.photosStr_first.map((item,index)=>{
            let images = Object.assign({},{type:'THEFIRST',photoId:item.photoId,first:(index?false:true)})
            photosStr.push(images)
          })
        }

        if(value.photosStr_list){
          value.photosStr_list.map((item,index)=>{
            let images = Object.assign({},{type:'LIST',photoId:item.photoId,first:(index?false:true)})
             photosStr.push(images)
          })
         }

         if(value.photosStr_detail){
            value.photosStr_detail.map((item,index)=>{
            let images = Object.assign({},{type:'DETAILS',photoId:item.photoId,first:(index?false:true)})
            photosStr.push(images)
          })
         }

         value.photosStr=JSON.stringify(photosStr);

         delete value.photosStr_first;
         delete value.photosStr_list;
         delete value.photosStr_detail;
         delete value.bright_basic;
         delete value.bright_service;
         delete value.bright_special;
         delete value.bright_bright;
         delete value.brightPorts;
         delete value.brightRound;
         delete value.brights;
         delete value.wherefloors;
         delete value.porTypes;
         delete value.photoVOs;

         //图片结束


         State.onNewCommunitySubmit(value);

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
      if(type=='watch'){
         State.getEditList(id)
         State.switchWatchList();
         return ;
      }
       if(type=='edit'){
         this.setState({
          id
         });
          State.searchDataHere();
          State.switchEditList();
      }
   }

   //查看取消
   onSwitchCancelWatchList=()=>{
     State.switchWatchList();
   }
   //编辑取消
   switchEditList=()=>{
       State.switchEditList();
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
                      onTouchTap={this.openAddCommunity}
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
                          <Button label="查看"  type="operation"  operation="watch" />
                      </TableRowColumn>
                     </TableRow>
              </TableBody>
              <TableFooter></TableFooter>
            </Table>

                   {/*新建*/}
          <Drawer
                open={State.openNewCommunity}
                width={750}
                openSecondary={true}
                containerStyle={{top:60,paddingBottom:48,zIndex:20}}
                onClose={this.whiteClose}
              >
            <NewCommunityList
                onSubmit={this.onNewCommunitySubmit}
                onCancel={this.cancelAddCommunity}
                open={State.openNewCommunity}
            />

                </Drawer>

                 {/*编辑*/}
          <Drawer
                open={State.openEditCommunity}
                width={750}
                openSecondary={true}
                onClose={this.whiteClose}
                containerStyle={{top:60,paddingBottom:48,zIndex:21}}
              >
            <EditCommunityList
                onSubmit={this.onNewCommunitySubmit}
                onCancel={this.switchEditList}
                open={State.openEditCommunity}
                id={this.state.id}
            />

                </Drawer>

                    {/*高级查询*/}
                    <Dialog
            title="高级查询"
            onClose={this.openSearchUpperDialog}
            open={State.openSearchUpper}
            contentStyle ={{ width: '666px',height:'458px'}}
          >
            <SearchUpperForm
                onCancel={this.openSearchUpperDialog}
                onSubmit={this.onSearchUpperSubmit}
                open={State.openSearchUpper}
            />
            </Dialog>


                     {/*查看*/}
          <Drawer
                open={State.openWatchCommunity}
                width={750}
                onClose={this.whiteClose}
                openSecondary={true}
                containerStyle={{top:60,paddingBottom:48,zIndex:20}}
              >
            <WatchCommunityList
                onCancel={this.onSwitchCancelWatchList}
            />

                </Drawer>

       </Section>

   </div>
   );
  }
}

export default CommunityList
